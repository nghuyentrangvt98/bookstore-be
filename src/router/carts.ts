import express from "express";

import { getAllCarts, addToCart, removeCart } from "../controllers/carts";
import { catchErrors } from "../middleware/exceptionHandler";
import { authorizeGuess } from "../middleware/authentication";

export default (router: express.Router) => {
  router.get("/carts", authorizeGuess, catchErrors(getAllCarts));
  router.post("/carts", authorizeGuess, catchErrors(addToCart));
  router.delete("/carts/:id", authorizeGuess, catchErrors(removeCart));
};
