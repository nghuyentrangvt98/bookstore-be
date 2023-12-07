import express from "express";

import { saveFile, getFiles } from "../controllers/files";
import { authorizeAdmin } from "../middleware/authentication";
import multer from "multer";
import { catchErrors } from "../middleware/exceptionHandler";
const upload = multer({
  storage: multer.memoryStorage(),
});

export default (router: express.Router) => {
  router.get("/files", authorizeAdmin, catchErrors(getFiles));
  router.post(
    "/files",
    authorizeAdmin,
    upload.single("file"),
    catchErrors(saveFile)
  );
};
