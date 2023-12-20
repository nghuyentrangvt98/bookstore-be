import express from "express";

import { getAllWish, createWish, removeWish } from "../controllers/wishlist";
import { authorizeUser } from "../middleware/authentication";
import { catchErrors } from "../middleware/exceptionHandler";

export default (router: express.Router) => {
  router.get("/wishlist", authorizeUser, catchErrors(getAllWish));
  router.post("/wishlist", authorizeUser, catchErrors(createWish));
  router.delete("/wishlist/:id", authorizeUser, catchErrors(removeWish));
};
