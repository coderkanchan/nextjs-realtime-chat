
import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema({
  roomId: String,
  senderId: String,
  receiverId: String,
  message: String,
  readStatus: { type: Boolean, default: false }
}, { timestamps: true });

export const Message =
  mongoose.models.Message || mongoose.model("Message", messageSchema);
