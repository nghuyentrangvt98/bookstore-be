import express from "express";
import { wishlistRepo } from "../repo";

export const getAllWish = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const wishes = await wishlistRepo.find({ userId: req.body.user._id });
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
    req.body.userId = req.body.user._id;
    const wishes = await wishlistRepo.find({
      userId: req.body.user._id,
      product: req.body.product,
    });
    if (wishes.length > 0) {
      throw new Error("product already been add to wishlist");
    }
    const wish = await wishlistRepo.create(req.body);
    return res.status(201).json(wish).end();
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: false, error: error.message });
  }
};

export const removeWish = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.params;
  const wish = await wishlistRepo.deleteByUser(id, req.body.user._id);
  return res.status(201).json(wish).end();
};
