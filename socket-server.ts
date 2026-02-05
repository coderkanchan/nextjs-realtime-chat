// import dotenv from "dotenv";
// dotenv.config();
// import { Server } from "socket.io";
// import mongoose from "mongoose";
// import { Message } from "./models/Message";
// import { User } from "./models/User";

// const MONGO_URI = process.env.MONGO_URI!;
// //const FRONTEND_URL = process.env.FRONTEND_URL || "https://nextjs-realtime-chat-murex-one.vercel.app";
// const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
// const PORT = Number(process.env.PORT) || 10000;

// const allowedOrigins = FRONTEND_URL.split(",")

// // const allowedOrigins = [
// //   "https://nextjs-realtime-chat-murex-one.vercel.app",
// //   "http://localhost:3000"
// // ];

// mongoose.connect(MONGO_URI).then(() => console.log("✅ MongoDB Connected"));

// // const io = new Server({
// //   cors: {
// //     origin: (origin, callback) => {
// //       if (!origin || allowedOrigins.includes(origin)) {
// //         callback(null, true);
// //       } else {
// //         callback(new Error("Not allowed by CORS"));
// //       }
// //     },
// //     credentials: true
// //   }
// // });

// const io = new Server({
//   cors: {
//     origin: allowedOrigins,
//     methods: ["GET", "POST"],
//     credentials: true
//   },
//   transports: ["websocket", "polling"]
// });

// const onlineUsers = new Map<string, string>();

// io.on("connection", (socket) => {

//   // socket.on("init", async ({ username }) => {
//   //   if (!username) return;

//   //   onlineUsers.set(username, socket.id);

//   //   const [users, chats] = await Promise.all([
//   //     User.find({}, "username").lean(),
//   //     Message.find({
//   //       $or:
//   //         [
//   //           { senderId: username },
//   //           { receiverId: username }
//   //         ]
//   //     }).sort({ createdAt: -1 }).lean()
//   //   ]);

//   //   io.emit("update-online-users", Array.from(onlineUsers.keys()));

//   //   console.log("Sending users to client:", users.length);

//   //   socket.emit("init", {
//   //     users: users.map((u: any) => u.username),
//   //     chats,
//   //     onlineList: Array.from(onlineUsers.keys())
//   //   });
//   // });

//   // socket.on("init", async ({ username }) => {
//   //   try {
//   //     console.log("📩 Received init from:", username);
//   //     if (!username) return;

//   //     onlineUsers.set(username, socket.id);

//   //     const [users, chats] = await Promise.all([
//   //       User.find({}, "username").lean(),
//   //       Message.find({
//   //         $or: [{ senderId: username }, { receiverId: username }],
//   //       }).lean(),
//   //     ]);

//   //     console.log(`📊 Found ${users.length} users and ${chats.length} chats for ${username}`);

//   //     // socket.emit("init", {
//   //     //   users: users.map((u: any) => u.username),
//   //     //   chats,
//   //     //   onlineList: Array.from(onlineUsers.keys()),
//   //     // });

//   //     io.to(socket.id).emit("init", {
//   //       users: users.map((u: any) => u.username),
//   //       chats,
//   //       onlineList: Array.from(onlineUsers.keys()),
//   //     });

//   //     console.log("✅ Data emitted back to client");
//   //   } catch (err) {
//   //     console.error("❌ Error in init event:", err);
//   //   }
//   // });


//   socket.on("init", async ({ username }) => {
//     try {
//       console.log("📩 Requesting data for:", username);
//       if (!username) return;

//       onlineUsers.set(username, socket.id);

//       // Pehle bina MongoDB ke test karte hain ki kya socket bhej raha hai
//       const users = await User.find({}, "username").lean();
//       const chats = await Message.find({
//         $or: [{ senderId: username }, { receiverId: username }],
//       }).lean();

//       // Sabse important line - io.to(socket.id) ki jagah direct socket.emit use karo
//       socket.emit("init", {
//         users: users.map((u: any) => u.username),
//         chats: chats,
//         onlineList: Array.from(onlineUsers.keys()),
//       });

//       // Sabko update karo ki naya banda online aaya hai
//       io.emit("update-online-users", Array.from(onlineUsers.keys()));

//       console.log("✅ Data sent to client successfully");
//     } catch (err) {
//       console.error("❌ MongoDB/Socket Error:", err);
//     }
//   });


//   socket.on("join-room", (roomId) => {
//     socket.join(roomId);
//     console.log(`User joined room: ${roomId}`);
//   });

//   socket.on("send-message", async (data) => {
//     try {
//       const msg = await Message.create({ ...data, readStatus: false });
//       io.to(data.roomId).emit("receive-message", msg);
//     } catch (err) {
//       console.error("Error sending message:", err);
//     }
//   });

//   socket.on("mark-as-read", async ({ roomId, username }) => {
//     try {
//       await Message.updateMany(
//         { roomId, receiverId: username, readStatus: false },
//         { $set: { readStatus: true } }
//       );
//       // Optional: socket.to(roomId).emit("messages-read", { roomId });
//     } catch (err) {
//       console.error("Error marking as read:", err);
//     }
//   });

//   socket.on("delete-everyone", async ({ messageId, roomId }) => {
//     await Message.findByIdAndUpdate(messageId, { isDeleted: true, message: "This message was deleted", caption: "" });
//     io.to(roomId).emit("message-deleted-everyone", { messageId });
//   });

//   socket.on("delete-for-me", async ({ messageId, username }) => {
//     await Message.findByIdAndUpdate(messageId, { $addToSet: { deletedFor: username } });
//   });

//   socket.on("typing", ({ roomId, senderId }) => {
//     socket.to(roomId).emit("display-typing", { senderId });
//   });

//   socket.on("stop-typing", ({ roomId, senderId }) => {
//     socket.to(roomId).emit("hide-typing", { senderId });
//   });

//   socket.on("disconnect", () => {
//     for (const [user, id] of onlineUsers) {
//       if (id === socket.id) {
//         onlineUsers.delete(user);
//         break;
//       }
//     }
//     io.emit("update-online-users", Array.from(onlineUsers.keys()));
//   });

// });

// io.listen(Number(PORT));
// console.log(`🚀 Socket server running on port ${PORT}`);









import dotenv from "dotenv";
dotenv.config();
import { Server } from "socket.io";
import { createServer } from "http"; // HTTP server explicitly use karein
import mongoose from "mongoose";
import { Message } from "./models/Message";
import { User } from "./models/User";

const MONGO_URI = process.env.MONGO_URI!;
// Yahan change: Default blank rakho taaki hum origin check kar sakein
const FRONTEND_URL = process.env.FRONTEND_URL || "";
const PORT = Number(process.env.PORT) || 10000;

const allowedOrigins = FRONTEND_URL ? FRONTEND_URL.split(",") : ["http://localhost:3000"];

mongoose.connect(MONGO_URI).then(() => console.log("✅ MongoDB Connected"));

// Explicitly HTTP Server create karein Render ke liye
const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: (origin, callback) => {
      // Agar origin allowed list mein hai ya empty (local dev), toh allow karein
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("❌ Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ["websocket", "polling"]
});

const onlineUsers = new Map<string, string>();

io.on("connection", (socket) => {
  console.log("🟢 New Connection Attempt:", socket.id);

  socket.on("init", async ({ username }) => {
    try {
      console.log("📩 Requesting data for:", username);
      if (!username) return;

      onlineUsers.set(username, socket.id);

      // Data Fetching
      const [users, chats] = await Promise.all([
        User.find({}, "username").lean(),
        Message.find({
          $or: [{ senderId: username }, { receiverId: username }],
        }).lean()
      ]);

      // Direct Socket Emit
      socket.emit("init", {
        users: users.map((u: any) => u.username),
        chats: chats,
        onlineList: Array.from(onlineUsers.keys()),
      });

      io.emit("update-online-users", Array.from(onlineUsers.keys()));
      console.log(`✅ Data sent to ${username}. Users: ${users.length}, Chats: ${chats.length}`);
    } catch (err) {
      console.error("❌ MongoDB/Socket Error:", err);
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

// YAHAN SABSE BADA CHANGE: io.listen ki jagah httpServer.listen
httpServer.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Final Socket server running on port ${PORT}`);
});