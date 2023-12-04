import { FileModel } from "../schemas/files";

export const getFilebyID = (id: string) => FileModel.findById(id);

export const getFilebyIds = (ids: string[]) =>
  FileModel.find({ _id: { $in: ids } });

export const getAllFiles = () => FileModel.find();

export const createOneFile = (values: Record<string, any>) =>
  new FileModel(values).save().then((file: any) => file.toObject());
