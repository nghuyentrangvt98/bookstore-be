import express from "express";
import admin from "firebase-admin";

import { fileRepo } from "../repo";

export const getFiles = async (req: express.Request, res: express.Response) => {
  const filter = (req.query.filter as string) || "{}";
  const files = await fileRepo.find(JSON.parse(filter));
  return res.status(200).json(files);
};

export const saveFile = async (req: express.Request, res: express.Response) => {
  const category = req.body.category;
  const bucket = admin.storage().bucket();
  const blob = bucket.file(`${category}/${req.file.originalname}`);
  const blobWriter = blob.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
  });
  blobWriter.end(req.file.buffer);
  const file = await fileRepo.create({
    path: `${category}/${req.file.originalname}`,
  });
  return res.status(200).json(file);
};
