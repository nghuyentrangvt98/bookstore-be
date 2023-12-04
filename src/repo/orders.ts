import { OrderModel } from "../schemas/orders";

export const getOrders = (filter: any = {}) => OrderModel.find(filter);

export const createOrder = (values: Record<string, any>) =>
  new OrderModel(values).save().then((order: any) => order.toObject());
