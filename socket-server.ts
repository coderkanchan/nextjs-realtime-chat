import dotenv from "dotenv";
dotenv.config();
import { Server } from "socket.io";
import mongoose from "mongoose";
import { Message } from "./models/Message";
import { User } from "./models/User";

const MONGO_URI = process.env.MONGO_URI!;
//const FRONTEND_URL = process.env.FRONTEND_URL || "https://nextjs-realtime-chat-murex-one.vercel.app";
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
const PORT = process.env.PORT || 3001;

// const allowedOrigins = [
//   "https://nextjs-realtime-chat-murex-one.vercel.app",
//   "http://localhost:3000"
// ];

mongoose.connect(MONGO_URI).then(() => console.log("✅ MongoDB Connected"));

// const io = new Server({
//   cors: {
//     origin: (origin, callback) => {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true
//   }
// });

const io = new Server({
  cors: {
    origin: FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ["websocket", "polling"]
});

const onlineUsers = new Map<string, string>();

io.on("connection", (socket) => {

  // socket.on("init", async ({ username }) => {
  //   if (!username) return;

  //   onlineUsers.set(username, socket.id);

  //   const [users, chats] = await Promise.all([
  //     User.find({}, "username").lean(),
  //     Message.find({
  //       $or:
  //         [
  //           { senderId: username },
  //           { receiverId: username }
  //         ]
  //     }).sort({ createdAt: -1 }).lean()
  //   ]);

  //   io.emit("update-online-users", Array.from(onlineUsers.keys()));

  //   console.log("Sending users to client:", users.length);

  //   socket.emit("init", {
  //     users: users.map((u: any) => u.username),
  //     chats,
  //     onlineList: Array.from(onlineUsers.keys())
  //   });
  // });

  socket.on("init", async ({ username }) => {
    try {
      console.log("📩 Received init from:", username); // Ye Render logs mein check karna
      if (!username) return;

      onlineUsers.set(username, socket.id);

      const [users, chats] = await Promise.all([
        User.find({}, "username").lean(),
        Message.find({
          $or: [{ senderId: username }, { receiverId: username }],
        }).lean(),
      ]);

      console.log(`📊 Found ${users.length} users and ${chats.length} chats for ${username}`);

      // socket.emit("init", {
      //   users: users.map((u: any) => u.username),
      //   chats,
      //   onlineList: Array.from(onlineUsers.keys()),
      // });

      io.to(socket.id).emit("init", {
        users: users.map((u: any) => u.username),
        chats,
        onlineList: Array.from(onlineUsers.keys()),
      });

      console.log("✅ Data emitted back to client");
    } catch (err) {
      console.error("❌ Error in init event:", err); // Render logs mein ye laal dikhega agar error hua
    }
  });

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  socket.on("send-message", async (data) => {
    try {
      const msg = await Message.create({ ...data, readStatus: false });
      io.to(data.roomId).emit("receive-message", msg);
    } catch (err) {
      console.error("Error sending message:", err);
    }
  });

  socket.on("delete-everyone", async ({ messageId, roomId }) => {
    await Message.findByIdAndUpdate(messageId, { isDeleted: true, message: "This message was deleted", caption: "" });
    io.to(roomId).emit("message-deleted-everyone", { messageId });
  });

  socket.on("delete-for-me", async ({ messageId, username }) => {
    await Message.findByIdAndUpdate(messageId, { $addToSet: { deletedFor: username } });
  });

  socket.on("typing", ({ roomId, senderId }) => {
    socket.to(roomId).emit("display-typing", { senderId });
  });

  socket.on("stop-typing", ({ roomId, senderId }) => {
    socket.to(roomId).emit("hide-typing", { senderId });
  });

  socket.on("disconnect", () => {
    for (const [user, id] of onlineUsers) {
      if (id === socket.id) {
        onlineUsers.delete(user);
        break;
      }
    }
    io.emit("update-online-users", Array.from(onlineUsers.keys()));
  });

});

io.listen(Number(PORT));
console.log(`🚀 Socket server running on port ${PORT}`);