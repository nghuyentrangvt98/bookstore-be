import express from "express";

import { getAllWish, createWish } from "../controllers/wishlist";
import { auth } from "../middleware/authentication";

export default (router: express.Router) => {
  router.get("/wishlist", auth, getAllWish);
  router.post("/wishlist", auth, createWish);
};
