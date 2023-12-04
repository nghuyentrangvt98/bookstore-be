import { UserModel } from "../schemas/users";

// User Actions
export const getUsers = () => UserModel.find();

export const getUserByEmail = (email: string) => UserModel.findOne({ email });

export const getUserByUsername = (username: string) =>
  UserModel.findOne({ username });

export const getUserById = (id: string) => UserModel.findById(id);

export const createOneUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user: any) => user.toObject());

export const deleteUserById = (id: string) =>
  UserModel.findOneAndDelete({ _id: id });

export const updateUserById = (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, values);
