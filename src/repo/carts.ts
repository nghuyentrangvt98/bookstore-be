import { ICart, CartModel } from "../schemas/carts";
import { RepositoryBaseWithPopulate } from "./base";

export class CartRepository extends RepositoryBaseWithPopulate<ICart> {
  constructor() {
    super(CartModel, ["product"]);
  }
  async updateByIds(
    ids: string[],
    values: Record<string, any>
  ): Promise<boolean> {
    let p = await CartModel.updateMany({ _id: { $in: ids } }, { $set: values });
    return p.modifiedCount > 0;
  }
  async deleteByUser(_id: string, userId: string): Promise<ICart> {
    let p = await CartModel.findOneAndDelete({ _id, userId });
    return p.toObject();
  }
}
