import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  roomId: { type: String, required: true },
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  message: { type: String, required: true },
  messageType: { type: String, enum: ['text', 'image'], default: 'text' },
  caption: { type: String, default: "" },
  readStatus: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false }, // For Delete for Everyone
  deletedFor: [{ type: String }] // For Delete for Me (Stores usernames)
}, { timestamps: true });

export const Message = mongoose.models.Message || mongoose.model("Message", MessageSchema);