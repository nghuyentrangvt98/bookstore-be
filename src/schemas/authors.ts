import mongoose from "mongoose";

export interface IAuthor extends mongoose.Document {
  name: string;
  category: string;
  biography: string;
  authorOf: string;
  imageUrl: string;
}

export const AuthorSchema = new mongoose.Schema<mongoose.FlattenMaps<IAuthor>>({
  name: { type: String, require: true },
  category: { type: String, require: true },
  biography: { type: String, require: true },
  authorOf: { type: String, require: true },
  imageUrl: { type: String, require: true },
});

export const AuthorModel = mongoose.model("Author", AuthorSchema);
