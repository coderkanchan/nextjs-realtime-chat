





import dotenv from "dotenv";
dotenv.config();
import { Server } from "socket.io";
import { createServer } from "http";
import mongoose from "mongoose";
import { Message } from "./models/Message";
import { User } from "./models/User";

const MONGO_URI = process.env.MONGO_URI!;
const FRONTEND_URL = process.env.FRONTEND_URL || "";
const PORT = Number(process.env.PORT) || 10000;

mongoose.connect(MONGO_URI).then(() => console.log("✅ MongoDB Connected"));

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(",") : ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ["websocket", "polling"]
});

const onlineUsers = new Map<string, string>();

io.on("connection", (socket) => {
  console.log("🟢 New Connection Attempt:", socket.id);

  // socket.on("init", async ({ username }) => {
  //   try {
  //     console.log("📩 Requesting data for:", username);
  //     if (!username) return;

  //     onlineUsers.set(username, socket.id);

  //     // const [users, chats] = await Promise.all([
  //     //   User.find({}, "username ,lastSeen ,isOnline").lean();
  //     // Message.find({
  //     //   $or: [{ senderId: username }, { receiverId: username }],
  //     // }).lean()
  //     // ]);

  //     const [users, chats] = await Promise.all([
  //       User.find({}, "username lastSeen isOnline").lean(),
  //       Message.find({
  //         $or: [{ senderId: username }, { receiverId: username }],
  //       }).lean(),
  //     ]);

  //     socket.emit("init", {
  //       users: users.filter(u => u && u.username),
  //       chats: chats,
  //       onlineList: Array.from(onlineUsers.keys()),
  //     });

  //     io.emit("update-online-users", Array.from(onlineUsers.keys()));
  //     console.log(`✅ Data sent to ${username}. Users: ${users.length}, Chats: ${chats.length}`);
  //   } catch (err) {
  //     console.error("❌ MongoDB/Socket Error:", err);
  //   }
  // });

  // socket-server.ts ke andar init event:
  socket.on("init", async ({ username }) => {
    try {
      if (!username) return;

      onlineUsers.set(username, socket.id);
      // DB mein status update karein
      await User.findOneAndUpdate({ username }, { isOnline: true });

      const [users, chats] = await Promise.all([
        User.find({}, "username lastSeen isOnline").lean(),
        Message.find({
          $or: [{ senderId: username }, { receiverId: username }],
        }).sort({ createdAt: -1 }).lean(), // Sorting zaroori hai
      ]);

      // Sabhi ko updated user list bhejein
      const safeUsers = users.filter(u => u && u.username);

      socket.emit("init", {
        users: safeUsers,
        chats: chats,
        onlineList: Array.from(onlineUsers.keys()),
      });

      // Yeh line zaroori hai taaki dusre users ka discover refresh ho
      io.emit("update-discover", safeUsers);
      io.emit("update-online-users", Array.from(onlineUsers.keys()));

    } catch (err) {
      console.error("❌ MongoDB/Socket Error:", err);
    }
  });

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  // socket.on("send-message", async (data) => {
  //   try {
  //     const msg = await Message.create({ ...data, readStatus: false });
  //     io.to(data.roomId).emit("receive-message", msg);
  //   } catch (err) {
  //     console.error("Error sending message:", err);
  //   }
  // });

  socket.on("send-message", async (data) => {
    try {
      // Check agar receiver online hai
      const isReceiverOnline = onlineUsers.has(data.receiverId);

      const msg = await Message.create({
        ...data,
        readStatus: false,
        deliveryStatus: isReceiverOnline ? 'delivered' : 'sent' // Naya field
      });

      io.to(data.roomId).emit("receive-message", msg);
    } catch (err) {
      console.error("Error sending message:", err);
    }
  });

  socket.on("mark-as-read", async ({ roomId, username }) => {
    try {
      await Message.updateMany(
        { roomId, receiverId: username, readStatus: false },
        { $set: { readStatus: true } }
      );
      // Optional: socket.to(roomId).emit("messages-read", { roomId });
    } catch (err) {
      console.error("Error marking as read:", err);
    }
  });

  socket.on("delete-everyone", async ({ messageId, roomId }) => {
    await Message.findByIdAndUpdate(messageId, { isDeleted: true, message: "This message was deleted", caption: "" });
    io.to(roomId).emit("message-deleted-everyone", { messageId });
  });

  socket.on("delete-for-me", async ({ messageId, username }) => {
    await Message.findByIdAndUpdate(messageId, { $addToSet: { deletedFor: username } });
  });

  // socket.on("typing", ({ roomId, senderId }) => {
  //   socket.to(roomId).emit("display-typing", { senderId });
  // });

  socket.on("typing", ({ roomId, senderId }) => {
    console.log(`User ${senderId} is typing in ${roomId}`);
    socket.to(roomId).emit("display-typing", { senderId });
  });

  socket.on("stop-typing", ({ roomId, senderId }) => {
    socket.to(roomId).emit("hide-typing", { senderId });
  });

  socket.on("disconnect", async () => {
    for (const [user, id] of onlineUsers) {
      if (id === socket.id) {
        onlineUsers.delete(user);
        // Database mein last seen update karein
        await User.findOneAndUpdate({ username: user }, { isOnline: false, lastSeen: new Date() });
        break;
      }
    }
    io.emit("update-online-users", Array.from(onlineUsers.keys()));
  });

});

httpServer.listen(Number(PORT), "0.0.0.0", () => {
  console.log(`🚀 SERVER STARTED ON PORT: ${PORT}`);
});