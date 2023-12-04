import { WishlistModel } from "../schemas/wishlist";

export const getWishlist = (filter: any = {}) => WishlistModel.find(filter);

export const createOneWish = (values: Record<string, any>) =>
  new WishlistModel(values).save().then((wish: any) => wish.toObject());
