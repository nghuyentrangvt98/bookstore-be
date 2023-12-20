import { IWishlist, WishlistModel } from "../schemas/wishlist";
import { RepositoryBaseWithPopulate } from "./base";

export class WishlistRepository extends RepositoryBaseWithPopulate<IWishlist> {
  constructor() {
    super(WishlistModel, ["product"]);
  }
  async deleteByUser(_id: string, userId: string): Promise<IWishlist> {
    let p = await WishlistModel.findOneAndDelete({ _id, userId });
    return p.toObject();
  }
}
