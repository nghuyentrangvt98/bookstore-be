import mongoose from "mongoose";

export const WishlistSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  product_id: { type: String, required: true },
});

export const WishlistModel = mongoose.model("Wishlist", WishlistSchema);
