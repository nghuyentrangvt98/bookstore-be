import express from "express";

import {
  getOneAuthor,
  createAuthor,
  getAllAuthors,
} from "../controllers/authors";
// import { auth } from "../middleware/authentication";

export default (router: express.Router) => {
  router.get("/authors", getAllAuthors);
  router.get("/authors/:id", getOneAuthor);
  router.post("/authors", createAuthor);
};
