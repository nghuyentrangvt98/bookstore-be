import mongoose, { Schema } from "mongoose";
import { Category, Language } from "./enum";
import { IFile } from "./files";

export interface IProduct extends mongoose.Document {
  name: string;
  category: Category;
  description: string;
  author: string[];
  file: IFile;
  imageUrl: string;
  price: number;
  details: Object;
  toc: string;
}

export const ProductSchema = new mongoose.Schema<IProduct>({
  name: { type: String, require: true },
  category: { type: String, enum: Category, require: true },
  description: { type: String, require: true },
  author: [{ type: String, require: true }],
  file: { type: Schema.ObjectId, ref: "File", require: true },
  imageUrl: { type: String, require: true },
  price: { type: Number, require: true },
  details: { type: Object, require: true },
  toc: { type: String, require: true },
});

export const ProductModel = mongoose.model("Product", ProductSchema);
