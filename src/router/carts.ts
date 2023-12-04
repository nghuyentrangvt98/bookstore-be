import express from "express";

import { getAllCarts, addToCart } from "../controllers/carts";
// import { auth } from "../middleware/authentication";

export default (router: express.Router) => {
  router.get("/carts", getAllCarts);
  router.post("/carts", addToCart);
};
