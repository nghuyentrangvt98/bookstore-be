import express from "express";

import { login, verify } from "../controllers/auth";
import { auth } from "../middleware/authentication";

export default (router: express.Router) => {
  router.post("/auth/login", login);
  router.post("/auth/verify", auth, verify);
};
