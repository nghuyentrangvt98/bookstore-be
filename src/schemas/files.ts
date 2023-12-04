import mongoose from "mongoose";

export const FileSchema = new mongoose.Schema({
  path: { type: String, required: true },
});

export const FileModel = mongoose.model("File", FileSchema);
