import express from "express";

import { cartRepo } from "../repo";
import { AlreadyExist } from "../exc/others";

export const getAllCarts = async (
  req: express.Request,
  res: express.Response
) => {
  const carts = await cartRepo.find({
    userId: req.body.user._id,
    orderId: null,
  });
  return res.status(200).json(carts);
};

export const addToCart = async (
  req: express.Request,
  res: express.Response
) => {
  req.body.userId = req.body.user._id;
  const carts = await cartRepo.find({
    userId: req.body.userId,
    product: req.body.product,
    orderId: null,
  });
  if (carts.length > 0) {
    throw new AlreadyExist("cart with product", req.body.product);
  }
  const cart = await cartRepo.create(req.body);
  return res.status(201).json(cart).end();
};

export const removeCart = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.params;
  const cart = await cartRepo.deleteByUser(id, req.body.user._id);
  return res.status(201).json(cart).end();
};
