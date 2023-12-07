import mongoose, { Schema } from "mongoose";
import { IProduct } from "./products";

export interface IWishlist extends mongoose.Document {
  userId: string;
  product: IProduct;
}

export const WishlistSchema = new mongoose.Schema<IWishlist>({
  userId: { type: String, required: true },
  product: { type: Schema.ObjectId, ref: "Product", require: true },
});

export const WishlistModel = mongoose.model("Wishlist", WishlistSchema);
