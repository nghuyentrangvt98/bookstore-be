import mongoose, { Schema } from "mongoose";
import { IProduct } from "./products";

export interface ICart extends mongoose.Document {
  userId: string;
  orderId: string;
  sessionId: string;
  product: IProduct;
}

export const CartSchema = new mongoose.Schema<ICart>({
  userId: { type: String, required: false, default: null },
  product: { type: Schema.ObjectId, ref: "Product", require: true },
  orderId: { type: String, required: false, default: null },
  sessionId: { type: String, required: false, default: null },
});

export const CartModel = mongoose.model("Cart", CartSchema);
