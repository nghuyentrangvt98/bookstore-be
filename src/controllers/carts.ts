import express from "express";

import { getCarts, createCart } from "../repo/carts";
import { verifyJWT } from "../service/authentication";

export const getAllCarts = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    let data = null;
    if (req.headers.authorization) {
      const token: string = req.headers.authorization.split(" ")[1];
      data = await verifyJWT(token);
    }
    let carts = null;
    if (data) {
      carts = await getCarts({ user_id: data.user._id });
      return res.status(200).json(carts);
    }
    if (!req.query.session_id) {
      return res.status(400).json({
        status: "Bad Request!",
        message: "session_id must be provide!",
      });
    }
    carts = await getCarts({ session_id: req.query.session_id as string });
    return res.status(200).json(carts);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const addToCart = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    let data = null;
    if (req.headers.authorization) {
      const token: string = req.headers.authorization.split(" ")[1];
      data = await verifyJWT(token);
    }
    let carts = [];
    if (data) {
      req.body.user_id = data.user._id;
      carts = await getCarts({
        user_id: req.body.user_id,
        product_id: req.body.product_id,
        order_id: null,
      });
    } else {
      carts = await getCarts({
        session_id: req.body.session_id,
        product_id: req.body.product_id,
        order_id: null,
      });
    }
    if (carts.length > 0) {
      return res.status(400).json({
        status: "Bad Request!",
        message: "product already been added to cart!",
      });
    }

    const cart = await createCart(req.body);
    return res.status(201).json(cart).end();
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: false, error: error.message });
  }
};
