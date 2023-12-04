import express from "express";

import { getOrders, createOrder as create } from "../repo/orders";
import { getCartsByIds, updateCartByIds } from "../repo/carts";
import { send_mail } from "../service/mail";
import { getProductByIds } from "../repo/products";
import { getSignedUrl } from "../service/storage";
import mongoose from "mongoose";
import { verifyJWT } from "../service/authentication";

export const getAllOrders = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const carts = await getOrders({ user_id: req.body.user._id });
    return res.status(200).json(carts);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const createOrder = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    if (req.headers.authorization) {
      const token: string = req.headers.authorization.split(" ")[1];
      const data = await verifyJWT(token);
      if (data) {
        req.body.user_id = data.user.id;
      }
    }
    const { carts, user_id, email } = req.body;
    if (!(carts instanceof Array)) {
      res
        .status(400)
        .json({ status: "Bad Request!", message: "carts must be a list" });
    }
    if (!email && !user_id) {
      res.status(400).json({
        status: "Bad Request!",
        message: "user_id or email must be provide",
      });
    }
    if (email) {
      const carts_obj = await getCartsByIds(carts);
      const product_ids = carts_obj.map((item) => {
        return item.product_id;
      });

      const products = await getProductByIds(product_ids).lean();
      let url_messages = "";
      await Promise.all(
        products.map(async (product) => {
          let file = product.file as any;
          let url = await getSignedUrl(file.path, 60);
          url_messages += `${product.name}: <a href="${url}">Download Link</a> <br>`;
        })
      );
      send_mail(email, email, url_messages);
    }
    const order = await create(req.body);
    await updateCartByIds(carts, {
      order_id: order._id,
      user_id: order.user_id,
    });

    return res.status(201).json(order).end();
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: false, error: error.message });
  }
};
