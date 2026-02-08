import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  roomId: { type: String, required: true },
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  message: { type: String, required: true },
  messageType: { type: String, enum: ['text', 'image'], default: 'text' },
  caption: { type: String, default: "" },
  readStatus: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false }, 
  deliveryStatus: { type: String, enum: ['sent', 'delivered'], default: 'sent' },
  deletedFor: [{ type: String }] 
}, { timestamps: true });

export const Message = mongoose.models.Message || mongoose.model("Message", MessageSchema);