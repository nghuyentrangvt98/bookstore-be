import express from "express";

import {
  getAllProducts,
  getOneProduct,
  createProduct,
} from "../controllers/products";
import { authorizeAdmin, authorizeGuess } from "../middleware/authentication";
import { catchErrors } from "../middleware/exceptionHandler";

export default (router: express.Router) => {
  router.get("/products", authorizeGuess, catchErrors(getAllProducts));
  router.get("/products/:id", authorizeGuess, catchErrors(getOneProduct));
  router.post("/products", authorizeAdmin, catchErrors(createProduct));
};
