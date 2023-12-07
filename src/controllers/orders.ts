import express from "express";

import { sendMail } from "../service/mail";
import { productRepo, orderRepo, cartRepo } from "../repo";
import { getSignedUrl } from "../service/storage";
import { UserRoleWithGuess } from "../schemas/enum";
import { MissingField } from "../exc/others";

export const getAllOrders = async (
  req: express.Request,
  res: express.Response
) => {
  const carts = await orderRepo.find({ userId: req.body.user._id });
  return res.status(200).json(carts);
};

export const createOrder = async (
  req: express.Request,
  res: express.Response
) => {
  const { carts, email } = req.body;
  if (req.body.user.role == UserRoleWithGuess.GUESS && !email) {
    throw new MissingField("email for guess");
  }
  if (email) {
    const cartObjs = await cartRepo.findByIds(carts);
    const productIds = cartObjs.map((item) => {
      return item.product._id;
    });

    const products = await productRepo.findByIds(productIds);
    let urlMessages = "";
    await Promise.all(
      products.map(async (product) => {
        let file = product.file as any;
        let url = await getSignedUrl(file.path, 60);
        urlMessages += `${product.name}: <a href="${url}">Download Link</a> <br>`;
      })
    );
    sendMail(email, email, urlMessages);
  }
  req.body.userId = req.body.user._id;
  const order = await orderRepo.create(req.body);
  await cartRepo.updateByIds(carts, {
    orderId: order._id,
  });
  return res.status(201).json(order).end();
};
