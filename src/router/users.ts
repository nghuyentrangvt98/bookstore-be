import express from "express";

import {
  getAllUsers,
  deleteUser,
  updateUser,
  createUser,
  updateMe,
} from "../controllers/users";
import { authorizeAdmin, authorizeGuess } from "../middleware/authentication";
import { catchErrors } from "../middleware/exceptionHandler";
// import { isAuthenticated, isOwner } from '../middlewares';

export default (router: express.Router) => {
  router.get("/users", authorizeAdmin, catchErrors(getAllUsers));
  router.post("/users", authorizeGuess, catchErrors(createUser));
  router.delete("/users/:id", authorizeAdmin, catchErrors(deleteUser));
  router.patch("/users/me", authorizeAdmin, catchErrors(updateMe));
  router.patch("/users/:id", authorizeAdmin, catchErrors(updateUser));
};
