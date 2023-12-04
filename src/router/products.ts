import express from "express";

import {
  getAllProducts,
  getOneProduct,
  createProduct,
} from "../controllers/products";
import { auth } from "../middleware/authentication";
// import { isAuthenticated, isOwner } from '../middlewares';

export default (router: express.Router) => {
  router.get("/products", getAllProducts);
  router.get("/products/:id", getOneProduct);
  router.post("/products", createProduct);
};
