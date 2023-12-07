import mongoose from "mongoose";

export interface IOrder extends mongoose.Document {
  userId: string;
  payment: string;
  total: number;
}

export const OrderSchema = new mongoose.Schema<IOrder>({
  userId: { type: String, required: false, default: null },
  payment: { type: String, required: true },
  total: { type: Number, required: true },
});

export const OrderModel = mongoose.model("Order", OrderSchema);
