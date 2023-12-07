import { IWishlist, WishlistModel } from "../schemas/wishlist";
import { RepositoryBaseWithPopulate } from "./base";

export class WishlistRepository extends RepositoryBaseWithPopulate<IWishlist> {
  constructor() {
    super(WishlistModel, ["product"]);
  }
}
