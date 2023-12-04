import express from "express";

import users from "./users";
import auth from "./auth";
import carts from "./carts";
import files from "./files";
import orders from "./orders";
import products from "./products";
import wishlist from "./wishlist";
import authors from "./authors";

const router = express.Router();

export default (): express.Router => {
  users(router);
  auth(router);
  carts(router);
  files(router);
  orders(router);
  products(router);
  wishlist(router);
  authors(router);
  return router;
};
