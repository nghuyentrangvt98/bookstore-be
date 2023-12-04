import { CartModel } from "../schemas/carts";

export const getCarts = (filter: any = {}) =>
  CartModel.find({ ...filter, order_id: null });
export const getCartsWithFilter = (filter: any) => CartModel.find(filter);

export const createCart = (values: Record<string, any>) =>
  new CartModel(values).save().then((cart: any) => cart.toObject());

export const deleteCartById = (id: string) =>
  CartModel.findOneAndDelete({ _id: id });

export const updateCartByIds = (ids: string[], values: Record<string, any>) =>
  CartModel.updateMany({ _id: { $in: ids } }, { $set: values });

export const getCartsByIds = (ids: string[]) =>
  CartModel.find({ _id: { $in: ids } });
