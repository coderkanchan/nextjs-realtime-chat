
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isOnline: { type: Boolean, default: false },
}, { timestamps: true });

export const User =
  mongoose.models.User || mongoose.model("User", userSchema);
