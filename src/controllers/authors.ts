import express from "express";

import { authorRepo } from "../repo";
import { NotFound } from "../exc/others";

export const getAllAuthors = async (
  req: express.Request,
  res: express.Response
) => {
  const filter = (req.query.filter as string) || "{}";
  const authors = await authorRepo.find(JSON.parse(filter));
  return res.status(200).json(authors);
};

export const getOneAuthor = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.params;
  const author = await authorRepo.findById(id);
  if (!author) {
    throw new NotFound("author", id);
  }
  return res.status(200).json(author);
};

export const createAuthor = async (
  req: express.Request,
  res: express.Response
) => {
  const author = await authorRepo.create(req.body);
  return res.status(201).json(author).end();
};
