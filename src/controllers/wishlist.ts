import express from "express";

import { getWishlist, createOneWish } from "../repo/wishlist";

export const getAllWish = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const wishes = await getWishlist({ user_id: req.body.user._id });
    return res.status(200).json(wishes);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const createWish = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    req.body.user_id = req.body.user.id;
    const wish = await createOneWish(req.body);
    return res.status(201).json(wish).end();
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: false, error: error.message });
  }
};
