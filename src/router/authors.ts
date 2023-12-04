import express from "express";

import { getOneAuthor, createAuthor } from "../controllers/authors";
// import { auth } from "../middleware/authentication";

export default (router: express.Router) => {
  router.get("/authors", getOneAuthor);
  router.post("/authors", createAuthor);
};
