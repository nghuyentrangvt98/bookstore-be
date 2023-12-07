import mongoose from "mongoose";

export interface IFile extends mongoose.Document {
  path: string;
}

export const FileSchema = new mongoose.Schema<IFile>({
  path: { type: String, required: true, unique: true },
});

export const FileModel = mongoose.model("File", FileSchema);
