import mongoose from "mongoose";

export const OrderSchema = new mongoose.Schema({
  user_id: { type: String, required: false, default: null },
  payment: { type: String, required: true },
  total: { type: Number, required: true },
});

export const OrderModel = mongoose.model("Order", OrderSchema);
