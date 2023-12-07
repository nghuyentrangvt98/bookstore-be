import mongoose from "mongoose";
import { UserRole } from "./enum";

export interface IUser extends mongoose.Document {
  username: string;
  email: string;
  hashedPassword: string;
  displayName: string;
  role: UserRole;
}

export const UserSchema = new mongoose.Schema<IUser>({
  email: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  hashedPassword: { type: String, required: true },
  displayName: { type: String, required: true },
  role: { type: String, enum: UserRole, default: UserRole.USER },
});

export const UserModel = mongoose.model("User", UserSchema);
