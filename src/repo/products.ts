import mongoose from "mongoose";
import { ProductModel } from "../schemas/products";

export const getProducts = (filter: any = {}) =>
  ProductModel.find(filter).populate("file");

export const getProductById = (id: String) =>
  ProductModel.findById(id).populate("file");

export const getProductByIds = (ids: String[]) =>
  ProductModel.find({ _id: { $in: ids } }).populate("file");

export const createProducts = (values: Record<string, any>[]) => {
  values.forEach((value) => {
    new ProductModel(value).save().then((product: any) => product.toObject());
  });
};

export const createOneProduct = (values: Record<string, any>) =>
  new ProductModel(values).save().then((product: any) => product.toObject());
