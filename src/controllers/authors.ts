import express from "express";

import { getAuthorById, createOneAuthor } from "../repo/authors";

export const getOneAuthor = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const author = await getAuthorById(id);
    return res.status(200).json(author);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const createAuthor = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const author = await createOneAuthor(req.body);
    return res.status(201).json(author).end();
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: false, error: error.message });
  }
};
