import express from "express";

import {
  getAllProducts,
  getOneProduct,
  createProduct,
  getBuyedProducts,
} from "../controllers/products";
import {
  authorizeAdmin,
  authorizeGuess,
  authorizeUser,
} from "../middleware/authentication";
import { catchErrors } from "../middleware/exceptionHandler";

export default (router: express.Router) => {
  router.get("/products", authorizeGuess, catchErrors(getAllProducts));
  router.get("/products/buyed", authorizeUser, catchErrors(getBuyedProducts));
  router.get("/products/:id", authorizeGuess, catchErrors(getOneProduct));
  router.post("/products", authorizeAdmin, catchErrors(createProduct));
};
