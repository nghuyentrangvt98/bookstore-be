import express from "express";

import { login, verify } from "../controllers/auth";
import { authorizeUser } from "../middleware/authentication";
import { catchErrors } from "../middleware/exceptionHandler";

export default (router: express.Router) => {
  router.post("/auth/login", catchErrors(login));
  router.post("/auth/verify", authorizeUser, catchErrors(verify));
};
