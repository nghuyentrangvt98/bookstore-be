import mongoose, { Schema } from "mongoose";
import { Category, Language } from "./enum";

export const ProductSchema = new mongoose.Schema({
  name: { type: String, require: true },
  category: { type: String, enum: Category, require: true },
  description: { type: String, require: true },
  author: { type: Array, require: true },
  file: { type: Schema.ObjectId, ref: "File", require: true },
  image_url: { type: String, require: true },
  price: { type: Number, require: true },
  details: { type: Map, of: String, require: true },
  toc: { type: String, require: true },
});

export const ProductModel = mongoose.model("Product", ProductSchema);
