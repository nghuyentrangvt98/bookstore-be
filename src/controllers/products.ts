import express from "express";

import { authorRepo, cartRepo, productRepo } from "../repo";
import { getSignedUrl } from "../service/storage";
import { UserRoleWithGuess } from "../schemas/enum";
import { NotFound } from "../exc/others";

export const getAllProducts = async (
  req: express.Request,
  res: express.Response
) => {
  const filter = (req.query.filter as string) || "{}";
  const products = await productRepo.find(JSON.parse(filter));
  return res.status(200).json(products);
};

export const getOneProduct = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.params;
  const product = await productRepo.findById(id);
  if (!product) {
    throw new NotFound("product", id);
  }
  let productRes: any = { ...product, isDownloadable: false };
  if (req.body.user.role != UserRoleWithGuess.GUESS) {
    const carts = await cartRepo.find({
      orderId: { $ne: null },
      userId: req.body.user._id,
      product: product._id,
    });
    if (carts.length > 0) {
      productRes.isDownloadable = true;
      let file = product.file as any;
      productRes.url = await getSignedUrl(file.path, 60);
    }
  }
  const authors = await authorRepo.findByIds(product.author);
  productRes.author = authors;
  return res.status(200).json(productRes);
};

export const createProduct = async (
  req: express.Request,
  res: express.Response
) => {
  let products: any;
  if (req.body instanceof Array) {
    products = await productRepo.createMany(req.body);
  } else {
    products = await productRepo.create(req.body);
  }
  return res.status(201).json(products).end();
};
