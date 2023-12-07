import { IProduct, ProductModel } from "../schemas/products";
import { RepositoryBaseWithPopulate } from "./base";

export class ProductRepository extends RepositoryBaseWithPopulate<IProduct> {
  constructor() {
    super(ProductModel, ["file"]);
  }
  async createMany(items: Record<string, any>[]): Promise<IProduct[]> {
    let list: IProduct[] = [];
    await Promise.all(
      items.map(async (item) => {
        let p = new ProductModel(item);
        await p.save();
        list.push(p.toObject());
      })
    );
    return list;
  }
}
