import mongoose from "mongoose";
import { UserRole } from "./enum";

export const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  hashed_password: { type: String, required: true },
  display_name: { type: String, required: true },
  role: { type: String, enum: UserRole, default: UserRole.USER },
});

export const UserModel = mongoose.model("User", UserSchema);
