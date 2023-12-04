import mongoose from "mongoose";
import { Category } from "./enum";

export const AuthorSchema = new mongoose.Schema({
  name: { type: String, require: true },
  category: { type: String, require: true },
  biography: { type: String, require: true },
  author_of: { type: String, require: true },
  image_url: { type: String, require: true },
});

export const AuthorModel = mongoose.model("Author", AuthorSchema);
