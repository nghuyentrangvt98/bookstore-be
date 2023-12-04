import express from "express";
import admin from "firebase-admin";

import { createOneFile, getAllFiles } from "../repo/file";

export const getFiles = async (req: express.Request, res: express.Response) => {
  try {
    const files = await getAllFiles();
    return res.status(200).json(files);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const saveFile = async (req: express.Request, res: express.Response) => {
  try {
    const category = req.body.category;
    const bucket = admin.storage().bucket();
    const blob = bucket.file(`${category}/${req.file.originalname}`);
    const blobWriter = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });
    blobWriter.end(req.file.buffer);
    const file = await createOneFile({
      path: `${category}/${req.file.originalname}`,
    });
    return res.status(200).json(file);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: false, error: error.message });
  }
};
