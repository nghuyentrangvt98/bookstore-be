import express from "express";

import { getAllWish, createWish } from "../controllers/wishlist";
import { authorizeUser } from "../middleware/authentication";
import { catchErrors } from "../middleware/exceptionHandler";

export default (router: express.Router) => {
  router.get("/wishlist", authorizeUser, catchErrors(getAllWish));
  router.post("/wishlist", authorizeUser, catchErrors(createWish));
};
