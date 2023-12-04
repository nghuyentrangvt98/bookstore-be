import express from "express";

import { saveFile, getFiles } from "../controllers/files";
import { auth } from "../middleware/authentication";
import multer from "multer";
// import { isAuthenticated, isOwner } from '../middlewares';
const upload = multer({
  storage: multer.memoryStorage(),
});

export default (router: express.Router) => {
  router.get("/files", auth, getFiles);
  router.post("/files", auth, upload.single("file"), saveFile);
};
