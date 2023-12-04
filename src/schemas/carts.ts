import mongoose from "mongoose";

export const CartSchema = new mongoose.Schema({
  user_id: { type: String, required: false, default: null },
  product_id: { type: String, required: true },
  order_id: { type: String, required: false, default: null },
  session_id: { type: String, required: false, default: null },
});

export const CartModel = mongoose.model("Cart", CartSchema);
