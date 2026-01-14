// socket-server.ts

// import dotenv from "dotenv";
// dotenv.config({ path: ".env" });

// import { Server } from "socket.io";
// import mongoose from "mongoose";
// import { Message } from "./models/Message";

// // Track online users: Key = userId, Value = socketId
// const onlineUsers = new Map<string, string>();

// // MongoDB कनेक्शन
// mongoose
//   .connect(process.env.MONGO_URI as string, {
//     writeConcern: { w: 'majority' }
//   } as mongoose.ConnectOptions)
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// // Socket.IO सर्वर Port 3001 पर शुरू
// const io = new Server(3001, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });

// const getRoomId = (id1: string, id2: string): string => {
//   return [id1, id2].sort().join("_");
// };

// io.on("connection", (socket) => {

//   // socket.on("user-connected", (userId: string) => {
//   //   if (!userId) return;

//   //   onlineUsers.set(userId, socket.id);
//   //   io.emit("user-status-update", userId, true);
//   //   // जब यूज़र कनेक्ट होता है, तो यूज़र लिस्ट को भी फेच करने के लिए कहें
//   //   socket.emit('fetch-all-users');
//   // });





//   // socket-server.ts में इसे ढूँढें और ठीक करें:

//   socket.on("user-connected", (userId: string) => {
//     if (!userId) return;

//     onlineUsers.set(userId, socket.id);
//     io.emit("user-status-update", userId, true);

//     // ❌ इस लाइन को हटा दें (Delete this line):
//     // socket.emit('fetch-all-users'); 

//     // ✅ इसकी जगह आप चाहें तो सीधे सर्वर से ही डेटा भेज सकते हैं (Optional)
//   });





//   // socket.on("fetch-all-users", async () => {
//   //   try {
//   //     console.log("👥 Server: Fetching all unique user IDs...");

//   //     // 🔑 FIX: Message मॉडल पर .distinct() का उपयोग करके सभी यूनीक senderId और receiverId को निकालें।
//   //     // यह Aggregation Pipeline से बहुत आसान और अधिक विश्वसनीय तरीका है।

//   //     const senderIds = await Message.distinct("senderId");
//   //     const receiverIds = await Message.distinct("receiverId");

//   //     // दोनों Arrays को एक साथ मिलाएं और Set का उपयोग करके डुप्लीकेट IDs को हटा दें
//   //     const uniqueIdsSet = new Set([...senderIds, ...receiverIds]);

//   //     // Set को Array में बदलें और किसी भी null, undefined, या empty string ID को हटा दें
//   //     const uniqueUserIds: string[] = Array.from(uniqueIdsSet).filter(id => id);

//   //     console.log(`✅ Server: Found ${uniqueUserIds.length} unique user IDs.`);
//   //     socket.emit("all-users-loaded", uniqueUserIds);

//   //   } catch (err) {
//   //     console.error("❌ Fetch All Users Error:", err);
//   //   }
//   // });


//   // socket.on("user-connected" के बाद इसे जोड़ें/बदलें

//   // 👥 FINAL FIX: सभी यूनीक यूज़र्स को फेच करने का हैंडलर




//   //  👥 UPDATED: Sabhi unique users ko fetch karne ka logic (Safe Version)
//   socket.on("fetch-all-users", async () => {
//     try {
//       console.log("--- DEBUG START: Fetching Users ---");

//       // Database se unique IDs mangwana
//       const senderIds = await Message.distinct("senderId");
//       const receiverIds = await Message.distinct("receiverId");

//       console.log("Sender IDs in DB:", senderIds);
//       console.log("Receiver IDs in DB:", receiverIds);

//       // Dono list ko ek saath milana
//       const allIds = [...senderIds, ...receiverIds];

//       // Duplicates hatana aur sirf valid string IDs rakhna
//       const uniqueUserIds = Array.from(new Set(allIds)).filter(id => id && typeof id === 'string');

//       console.log("Final Unique User List:", uniqueUserIds);
//       console.log("--- DEBUG END ---");

//       // Client ko data bhejna
//       socket.emit("all-users-loaded", uniqueUserIds);

//     } catch (err) {
//       console.error("❌ ERROR fetching users from DB:", err);
//     }
//   });



//   socket.on("user-ready", (currentUserId: string, otherUserId: string) => {
//     if (!currentUserId || !otherUserId) return;
//     const roomId = getRoomId(currentUserId, otherUserId);
//     socket.join(roomId);
//   });

//   // 📚 मैसेज हिस्ट्री फेच करने का हैंडलर
//   socket.on("fetch-history", async (currentUserId: string, otherUserId: string) => {
//     // ... (यह कोड अपरिवर्तित है)
//     if (!currentUserId || !otherUserId) return;
//     const roomId = getRoomId(currentUserId, otherUserId);

//     try {
//       const history = await Message.find({ roomId: roomId })
//         .sort({ createdAt: 1 })
//         .lean();

//       socket.emit("history-loaded", history);
//     } catch (err) {
//       console.error("❌ History Fetch Error:", err);
//     }
//   });

//   // 🚨 UPDATED: चैट लिस्ट फेच करने का हैंडलर
//   socket.on("fetch-chat-list", async (currentUserId: string) => {
//     if (!currentUserId) return;

//     try {
//       const recentChats = await Message.aggregate([
//         {
//           $match: {
//             $or: [
//               { senderId: currentUserId },
//               { receiverId: currentUserId }
//             ]
//           }
//         },
//         {
//           $sort: { createdAt: -1 }
//         },
//         {
//           $group: {
//             _id: {
//               $cond: {
//                 if: { $eq: ["$senderId", currentUserId] },
//                 then: "$receiverId",
//                 else: "$senderId"
//               }
//             },
//             lastMessage: { $first: "$message" },
//             lastMessageTime: { $first: "$createdAt" },

//             unreadCount: {
//               $sum: {
//                 $cond: [{
//                   $and: [
//                     { $eq: ["$receiverId", currentUserId] },
//                     { $eq: [{ $ifNull: ["$readStatus", false] }, false] }
//                   ]
//                 }, 1, 0]
//               }
//             }
//           }
//         },
//         {
//           $sort: { lastMessageTime: -1 }
//         },
//         {
//           $project: {
//             _id: 0,
//             id: "$_id",
//             lastMessageTime: 1,
//             lastMessage: 1,
//             unreadCount: 1
//           }
//         }
//       ]);

//       const sortedPartners = recentChats.map(chat => ({
//         id: chat.id,
//         isOnline: onlineUsers.has(chat.id),
//         unreadCount: chat.unreadCount,
//         lastMessage: chat.lastMessage
//       }));

//       socket.emit("chat-list-loaded", sortedPartners);

//     } catch (err) {
//       console.error("❌ Chat List Fetch/Sort/Unread Error:", err);
//     }
//   });


//   // 🚨 Mark Messages Read Handler
//   socket.on("mark-messages-read", async (data: { currentUserId: string, otherUserId: string }) => {
//     // ... (यह कोड अपरिवर्तित है)
//     console.log(`🔑 Mark as Read Request for Room: ${data.currentUserId} with ${data.otherUserId}`);
//     const roomId = getRoomId(data.currentUserId, data.otherUserId);

//     try {
//       const result = await Message.updateMany(
//         {
//           roomId: roomId,
//           receiverId: data.currentUserId,
//           $or: [
//             { readStatus: false },
//             { readStatus: { $exists: false } }
//           ]
//         },
//         {
//           $set: { readStatus: true }
//         }
//       );

//       console.log(`✅ ${result.modifiedCount} messages marked as read in DB.`);

//       const receiverSocketId = onlineUsers.get(data.currentUserId);
//       if (receiverSocketId) {
//         io.to(receiverSocketId).emit('refresh-chat-list');
//       }

//     } catch (err) {
//       console.error("❌ Mark as Read Error:", err);
//     }
//   });


//   socket.on('typing-start', (data: { roomId: string, senderId: string }) => {
//     socket.to(data.roomId).emit('typing-start-to-client', data.senderId);
//   });

//   socket.on('typing-stop', (data: { roomId: string, senderId: string }) => {
//     socket.to(data.roomId).emit('typing-stop-to-client', data.senderId);
//   });


//   socket.on("send-message", async (data: { roomId: string, senderId: string, receiverId: string, message: string }) => {
//     // ... (यह कोड अपरिवर्तित है)
//     console.log("Received Message Data:", data);

//     try {
//       const newMessageInstance = new Message(data);
//       const newMsg = await newMessageInstance.save();
//       console.log("✅ Message Saved to DB:", newMsg._id);

//       io.to(data.roomId).emit("receive-message", newMsg);

//       const senderSocketId = onlineUsers.get(data.senderId);
//       const receiverSocketId = onlineUsers.get(data.receiverId);

//       if (senderSocketId) io.to(senderSocketId).emit('refresh-chat-list');
//       if (receiverSocketId) io.to(receiverSocketId).emit('refresh-chat-list');

//       // 🔑 NEW: नया मैसेज भेजने के बाद ऑल यूज़र लिस्ट को भी रीफ्रेश करें ताकि नए यूज़र जुड़ें
//       io.emit('fetch-all-users');

//     } catch (err) {
//       console.error("❌ DB Save or Broadcast ERROR:", err);
//     }
//   });


//   socket.on("disconnect", () => {
//     // ... (यह कोड अपरिवर्तित है)
//     let disconnectedUserId = '';

//     for (const [userId, socketId] of onlineUsers.entries()) {
//       if (socketId === socket.id) {
//         disconnectedUserId = userId;
//         break;
//       }
//     }

//     if (disconnectedUserId) {
//       onlineUsers.delete(disconnectedUserId);
//       io.emit("user-status-update", disconnectedUserId, false);
//     }
//   });
// });





// import dotenv from "dotenv";
// dotenv.config({ path: ".env" });
// import { Server } from "socket.io";
// import mongoose from "mongoose";
// import { Message } from "./models/Message";
// import { User } from "./models/User";

// const onlineUsers = new Map<string, string>();

// mongoose
//   .connect(process.env.MONGO_URI as string)
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// const io = new Server(3001, {
//   cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
// });

// const getRoomId = (id1: string, id2: string): string => [id1, id2].sort().join("_");

// // Helper function to fetch and broadcast users to everyone
// const broadcastAllUsers = async () => {
//   try {
//     const senderIds = await Message.distinct("senderId");
//     const receiverIds = await Message.distinct("receiverId");
//     const uniqueUserIds = Array.from(new Set([...senderIds, ...receiverIds])).filter(id => id && typeof id === 'string');
//     io.emit("all-users-loaded", uniqueUserIds); // Sabhi clients ko list bhejo
//   } catch (err) {
//     console.error("Error broadcasting users:", err);
//   }
// };

// io.on("connection", (socket) => {
//   socket.on("user-connected", (userId: string) => {
//     if (!userId) return;
//     onlineUsers.set(userId, socket.id);
//     io.emit("user-status-update", userId, true);
//     broadcastAllUsers(); // Naya user aate hi list refresh karo
//   });

//   socket.on("fetch-all-users", async () => {
//     await broadcastAllUsers();
//   });

//   socket.on("user-ready", (currentUserId: string, otherUserId: string) => {
//     if (!currentUserId || !otherUserId) return;
//     socket.join(getRoomId(currentUserId, otherUserId));
//   });

//   socket.on("fetch-history", async (currentUserId: string, otherUserId: string) => {
//     const roomId = getRoomId(currentUserId, otherUserId);
//     try {
//       const history = await Message.find({ roomId }).sort({ createdAt: 1 }).lean();
//       socket.emit("history-loaded", history);
//     } catch (err) { console.error(err); }
//   });

//   socket.on("send-message", async (data) => {
//     try {
//       // 1. Database mein save karein
//       const newMessage = new Message(data);
//       const savedMsg = await newMessage.save();
//       console.log("✅ Message Saved:", savedMsg._id);

//       // 2. Room mein message bhejein
//       io.to(data.roomId).emit("receive-message", savedMsg);

//       // 3. Dono users ki chat list refresh karein
//       const senderSocket = onlineUsers.get(data.senderId);
//       const receiverSocket = onlineUsers.get(data.receiverId);
//       if (senderSocket) io.to(senderSocket).emit('refresh-chat-list');
//       if (receiverSocket) io.to(receiverSocket).emit('refresh-chat-list');

//       // 4. Sabko updated user list bhejein (agar naya user ho toh)
//       await broadcastAllUsers();

//     } catch (err) {
//       console.error("❌ Save Error:", err);
//     }
//   });

//   // ... (Baaki typing aur disconnect events same raheinge)
//   socket.on('typing-start', (data) => socket.to(data.roomId).emit('typing-start-to-client', data.senderId));
//   socket.on('typing-stop', (data) => socket.to(data.roomId).emit('typing-stop-to-client', data.senderId));

//   socket.on("disconnect", () => {
//     for (const [userId, socketId] of onlineUsers.entries()) {
//       if (socketId === socket.id) {
//         onlineUsers.delete(userId);
//         io.emit("user-status-update", userId, false);
//         break;
//       }
//     }
//   });
// });







// import dotenv from "dotenv";
// dotenv.config({ path: ".env" });

// import { Server } from "socket.io";
// import mongoose from "mongoose";
// import { Message } from "./models/Message";
// import { User } from "./models/User"; // ✅ Naya Import

// const onlineUsers = new Map<string, string>();

// mongoose
//   .connect(process.env.MONGO_URI as string)
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// const io = new Server(3001, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });

// const getRoomId = (id1: string, id2: string): string => {
//   return [id1, id2].sort().join("_");
// };

// // 👥 UPDATED: Sabhi users ko User Collection se fetch karne ka logic
// const broadcastAllUsers = async () => {
//   try {
//     // Message ki jagah User table se saare users nikalein
//     const usersInDb = await User.find({}, "userId").lean();
//     const uniqueUserIds = usersInDb.map(u => u.userId);

//     console.log("👥 Broadcasting All Users:", uniqueUserIds);
//     io.emit("all-users-loaded", uniqueUserIds);
//   } catch (err) {
//     console.error("❌ Error fetching users:", err);
//   }
// };

// io.on("connection", (socket) => {

//   // socket-server.ts ke andar naye handlers:

//   // 1. SIGNUP HANDLER
//   socket.on("signup", async (data: { username: string; password: string }) => {
//     try {
//       const existingUser = await User.findOne({ username: data.username });
//       if (existingUser) {
//         return socket.emit("signup-error", "Username already exists!");
//       }
//       const newUser = new User({ userId: data.username, username: data.username, password: data.password });
//       await newUser.save();
//       socket.emit("signup-success", "Account created! Please login.");
//     } catch (err) { socket.emit("signup-error", "Signup failed!"); }
//   });

//   // 2. LOGIN HANDLER
//   socket.on("login", async (data: { username: string; password: string }) => {
//     try {
//       const user = await User.findOne({ username: data.username, password: data.password });
//       if (user) {
//         socket.emit("login-success", { username: user.username });
//       } else {
//         socket.emit("login-error", "Invalid username or password!");
//       }
//     } catch (err) { socket.emit("login-error", "Login failed!"); }
//   });

//   // ✅ FIXED: Naya user aate hi database mein save hoga
//   socket.on("user-connected", async (userId: string) => {
//     if (!userId) return;

//     // User ko DB mein save ya update karein (Incognito support)
//     await User.findOneAndUpdate(
//       { userId: userId },
//       { isOnline: true },
//       { upsert: true, new: true }
//     );

//     onlineUsers.set(userId, socket.id);
//     io.emit("user-status-update", userId, true);

//     // Sabko updated list bhejein taaki naya user sabko dikhe
//     await broadcastAllUsers();
//   });

//   socket.on("fetch-all-users", async () => {
//     await broadcastAllUsers();
//   });

//   socket.on("user-ready", (currentUserId: string, otherUserId: string) => {
//     if (!currentUserId || !otherUserId) return;
//     const roomId = getRoomId(currentUserId, otherUserId);
//     socket.join(roomId);
//   });

//   socket.on("fetch-history", async (currentUserId: string, otherUserId: string) => {
//     if (!currentUserId || !otherUserId) return;
//     const roomId = getRoomId(currentUserId, otherUserId);
//     try {
//       const history = await Message.find({ roomId: roomId }).sort({ createdAt: 1 }).lean();
//       socket.emit("history-loaded", history);
//     } catch (err) {
//       console.error("❌ History Error:", err);
//     }
//   });

//   socket.on("fetch-chat-list", async (currentUserId: string) => {
//     if (!currentUserId) return;
//     try {
//       const recentChats = await Message.aggregate([
//         { $match: { $or: [{ senderId: currentUserId }, { receiverId: currentUserId }] } },
//         { $sort: { createdAt: -1 } },
//         {
//           $group: {
//             _id: { $cond: [{ $eq: ["$senderId", currentUserId] }, "$receiverId", "$senderId"] },
//             lastMessage: { $first: "$message" },
//             lastMessageTime: { $first: "$createdAt" },
//             unreadCount: {
//               $sum: {
//                 $cond: [{ $and: [{ $eq: ["$receiverId", currentUserId] }, { $eq: [{ $ifNull: ["$readStatus", false] }, false] }] }, 1, 0]
//               }
//             }
//           }
//         },
//         { $sort: { lastMessageTime: -1 } },
//         { $project: { _id: 0, id: "$_id", lastMessage: 1, unreadCount: 1 } }
//       ]);

//       const sortedPartners = recentChats.map(chat => ({
//         id: chat.id,
//         isOnline: onlineUsers.has(chat.id),
//         unreadCount: chat.unreadCount,
//         lastMessage: chat.lastMessage
//       }));
//       socket.emit("chat-list-loaded", sortedPartners);
//     } catch (err) { console.error(err); }
//   });

//   socket.on("send-message", async (data) => {
//     try {
//       const newMessageInstance = new Message(data);
//       const savedMsg = await newMessageInstance.save();

//       io.to(data.roomId).emit("receive-message", savedMsg);

//       const sId = onlineUsers.get(data.senderId);
//       const rId = onlineUsers.get(data.receiverId);
//       if (sId) io.to(sId).emit('refresh-chat-list');
//       if (rId) io.to(rId).emit('refresh-chat-list');

//     } catch (err) { console.error("❌ Save Error:", err); }
//   });

//   socket.on('typing-start', (data) => socket.to(data.roomId).emit('typing-start-to-client', data.senderId));
//   socket.on('typing-stop', (data) => socket.to(data.roomId).emit('typing-stop-to-client', data.senderId));

//   socket.on("disconnect", () => {
//     let disconnectedUserId = '';
//     for (const [userId, socketId] of onlineUsers.entries()) {
//       if (socketId === socket.id) {
//         disconnectedUserId = userId;
//         break;
//       }
//     }
//     if (disconnectedUserId) {
//       onlineUsers.delete(disconnectedUserId);
//       io.emit("user-status-update", disconnectedUserId, false);
//     }
//   });
// });









// import dotenv from "dotenv";
// dotenv.config({ path: ".env" });
// import { Server } from "socket.io";
// import mongoose from "mongoose";
// import { Message } from "./models/Message";
// import { User } from "./models/User";

// const onlineUsers = new Map<string, string>();

// mongoose.connect(process.env.MONGO_URI as string)
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.log("❌ MongoDB Error:", err));

// const io = new Server(3001, {
//   cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
// });

// const broadcastAllUsers = async () => {
//   const users = await User.find({}, "username").lean();
//   io.emit("all-users-loaded", users.map(u => u.username));
// };

// io.on("connection", (socket) => {
//   // --- AUTH LOGIC ---
//   // socket.on("signup", async ({ username, password }) => {
//   //   try {
//   //     const exists = await User.findOne({ username });
//   //     if (exists) return socket.emit("auth-error", "Username already taken");
//   //     const newUser = new User({ username, password });
//   //     await newUser.save();
//   //     socket.emit("auth-success", { username, message: "Signup successful! Please login." });
//   //   } catch (err) { socket.emit("auth-error", "Signup failed"); }
//   // });

//   // socket.on("login", async ({ username, password }) => {
//   //   const user = await User.findOne({ username, password });
//   //   if (!user) return socket.emit("auth-error", "Invalid credentials");
//   //   socket.emit("login-success", { username });
//   // });

//   // --- CHAT LOGIC ---
//   socket.on("user-connected", async (username: string) => {
//     onlineUsers.set(username, socket.id);
//     await User.findOneAndUpdate({ username }, { isOnline: true });
//     io.emit("user-status-update", username, true);
//     broadcastAllUsers();
//   });

//   socket.on("send-message", async (data) => {
//     const newMessage = new Message(data);
//     const savedMsg = await newMessage.save();
//     io.to(data.roomId).emit("receive-message", savedMsg);

//     const s = onlineUsers.get(data.senderId);
//     const r = onlineUsers.get(data.receiverId);
//     if (s) io.to(s).emit('refresh-chat-list');
//     if (r) io.to(r).emit('refresh-chat-list');
//   });

//   // (History, Typing status, Disconnect events remains the same as before...)
//   socket.on("user-ready", (u1, u2) => socket.join([u1, u2].sort().join("_")));
//   socket.on("fetch-history", async (u1, u2) => {
//     const history = await Message.find({ roomId: [u1, u2].sort().join("_") }).sort({ createdAt: 1 });
//     socket.emit("history-loaded", history);
//   });
// });








// import { Server } from "socket.io";
// import mongoose from "mongoose";
// import { User } from "./models/User";
// import { Message } from "./models/Message";

// const io = new Server(3001, { cors: { origin: "http://localhost:3000" } });
// const onlineUsers = new Map<string, string>();

// mongoose.connect(process.env.MONGO_URI as string).then(() => console.log("✅ DB Connected"));

// const broadcastAllUsers = async () => {
//   const users = await User.find({}, "username").lean();
//   io.emit("all-users-loaded", users.map(u => u.username));
// };

// io.on("connection", (socket) => {
//   socket.on("user-connected", async (username) => {
//     onlineUsers.set(username, socket.id);
//     await User.findOneAndUpdate({ username }, { isOnline: true });
//     await broadcastAllUsers(); // Naye user ko turant sabko dikhao
//   });

//   socket.on("fetch-all-users", broadcastAllUsers);

//   socket.on("send-message", async (data) => {
//     const savedMsg = await new Message(data).save();
//     io.to(data.roomId).emit("receive-message", savedMsg);

//     const rId = onlineUsers.get(data.receiverId);
//     if (rId) io.to(rId).emit('refresh-chat-list');
//     socket.emit('refresh-chat-list');
//   });

//   // History & Typing events (Existing logic remains same)
//   socket.on("user-ready", (u1, u2) => socket.join([u1, u2].sort().join("_")));
// });








import { Server } from "socket.io";
import mongoose from "mongoose";
import { Message } from "./models/Message";

mongoose.connect(process.env.MONGO_URI!);

const io = new Server({
  cors: { origin: process.env.FRONTEND_URL }
});

io.on("connection", socket => {
  socket.on("join-room", roomId => socket.join(roomId));

  socket.on("send-message", async data => {
    const msg = await Message.create(data);
    io.to(data.roomId).emit("receive-message", msg);
  });

  socket.on("typing-start", ({ roomId }) =>
    socket.to(roomId).emit("typing-start-to-client")
  );

  socket.on("typing-stop", ({ roomId }) =>
    socket.to(roomId).emit("typing-stop-to-client")
  );
});

io.listen(3001);
