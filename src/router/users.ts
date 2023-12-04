import express from "express";

import {
  getAllUsers,
  deleteUser,
  updateUser,
  createUser,
} from "../controllers/users";
import { auth } from "../middleware/authentication";
// import { isAuthenticated, isOwner } from '../middlewares';

export default (router: express.Router) => {
  router.get("/users", auth, getAllUsers);
  router.post("/users", createUser);
  router.delete("/users/:id", auth, deleteUser);
  router.patch("/users/:id", auth, updateUser);
};
