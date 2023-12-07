import express from "express";

import { getAllOrders, createOrder } from "../controllers/orders";
import { authorizeGuess, authorizeUser } from "../middleware/authentication";
import { catchErrors } from "../middleware/exceptionHandler";

export default (router: express.Router) => {
  router.get("/orders", authorizeUser, catchErrors(getAllOrders));
  router.post("/orders", authorizeGuess, catchErrors(createOrder));
};
