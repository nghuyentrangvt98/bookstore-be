import { IAuthor, AuthorModel } from "../schemas/authors";
import { RepositoryBase } from "./base";

export class AuthorRepository extends RepositoryBase<IAuthor> {
  constructor() {
    super(AuthorModel);
  }
}
