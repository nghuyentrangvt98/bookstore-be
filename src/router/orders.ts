import express from "express";

import { getAllOrders, createOrder } from "../controllers/orders";
import { auth } from "../middleware/authentication";

export default (router: express.Router) => {
  router.get("/orders", auth, getAllOrders);
  router.post("/orders", createOrder);
};
