import { AuthorModel } from "../schemas/authors";

export const getAuthorById = (id: string) => AuthorModel.findById(id);

export const getAuthorByIds = (ids: string[]) =>
  AuthorModel.find({ _id: { $in: ids } });

export const getAuthors = (filter: any = {}) => AuthorModel.find(filter);

export const createOneAuthor = (values: Record<string, any>) =>
  new AuthorModel(values).save().then((author: any) => author.toObject());

export const deleteAuthorById = (id: string) =>
  AuthorModel.findOneAndDelete({ _id: id });

export const updateAuthorById = (id: string, values: Record<string, any>) =>
  AuthorModel.findByIdAndUpdate(id, values);
