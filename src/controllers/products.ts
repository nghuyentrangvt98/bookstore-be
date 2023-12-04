import express from "express";

import {
  getProducts,
  getProductById,
  createOneProduct,
  createProducts,
} from "../repo/products";
import { getCartsWithFilter } from "../repo/carts";
import { getAuthorByIds } from "../repo/authors";
import { verifyJWT } from "../service/authentication";
import { getSignedUrl } from "../service/storage";

export const getAllProducts = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const filter = req.query.filter as string;
    const products = await getProducts(JSON.parse(filter));
    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getOneProduct = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const product = await getProductById(id).lean();
    let product_res: any = { ...product, is_downloadable: false };
    if (!product) {
      return res.status(400).json({
        status: "Bad Request!",
        message: "Product not found!",
      });
    }
    let data = null;
    if (req.headers.authorization) {
      const token: string = req.headers.authorization.split(" ")[1];
      data = await verifyJWT(token);
    }
    delete product_res.file;
    if (data) {
      const carts = await getCartsWithFilter({
        order_id: { $ne: null },
        user_id: data.user._id,
        product_id: product._id,
      });
      console.log(carts);
      if (carts.length > 0) {
        product_res.is_downloadable = true;
        let file = product.file as any;
        product_res.url = await getSignedUrl(file.path, 60);
      }
    }
    const authors = await getAuthorByIds(product.author);
    product_res.author = authors;
    return res.status(200).json(product_res);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const createProduct = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    let products: any;
    if (req.body instanceof Array) {
      products = await createProducts(req.body);
    } else {
      products = await createOneProduct(req.body);
    }
    return res.status(201).json(products).end();
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: false, error: error.message });
  }
};
