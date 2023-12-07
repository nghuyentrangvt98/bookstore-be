import { OrderModel, IOrder } from "../schemas/orders";
import { RepositoryBase } from "./base";

export class OrderRepository extends RepositoryBase<IOrder> {
  constructor() {
    super(OrderModel);
  }
}
