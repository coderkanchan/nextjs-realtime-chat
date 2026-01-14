// // models/Message.ts

// import mongoose, { Schema } from "mongoose";

// const messageSchema = new Schema(
//   {
//     // दो यूज़र्स के बीच यूनिक रूम ID
//     roomId: {
//       type: String,
//       required: true,
//     },
//     // मैसेज भेजने वाले की ID
//     senderId: {
//       type: String,
//       required: true,
//     },
//     // मैसेज प्राप्त करने वाले की ID
//     receiverId: {
//       type: String,
//       required: true,
//     },
//     // मैसेज का content
//     message: {
//       type: String,
//       required: true,
//     },
//     // 🔑 NEW FIELD: मैसेज पढ़ा गया है या नहीं (जिसके लिए मैसेज भेजा गया है)
//     readStatus: {
//       type: Boolean,
//       default: false, // डिफ़ॉल्ट रूप से, जब मैसेज भेजा जाता है तो वह अनरीड होता है
//     }
//   },
//   { timestamps: true } // createdAt और updatedAt फ़ील्ड्स को जोड़ता है
// );

// // Mongoose मॉडल
// export const Message =
//   mongoose.models.Message || mongoose.model("Message", messageSchema);








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
