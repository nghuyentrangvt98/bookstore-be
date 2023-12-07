import express from "express";

import {
  getOneAuthor,
  createAuthor,
  getAllAuthors,
} from "../controllers/authors";
import { catchErrors } from "../middleware/exceptionHandler";
import { authorizeAdmin, authorizeGuess } from "../middleware/authentication";
// import { auth } from "../middleware/authentication";

export default (router: express.Router) => {
  router.get("/authors", authorizeGuess, catchErrors(getAllAuthors));
  router.get("/authors/:id", authorizeGuess, catchErrors(getOneAuthor));
  router.post("/authors", authorizeAdmin, catchErrors(createAuthor));
};
