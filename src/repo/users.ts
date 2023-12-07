import { RepositoryBase } from "./base";
import { IUser, UserModel } from "../schemas/users";

export class UserRepository extends RepositoryBase<IUser> {
  constructor() {
    super(UserModel);
  }
  async FindByUsername(username: string): Promise<IUser> {
    return await this.findOne({ username });
  }
}
