
// import dotenv from "dotenv";
// dotenv.config();

// import { Server } from "socket.io";
// import mongoose from "mongoose";
// import { Message } from "./models/Message";

// /* ---------------- ENV SAFETY ---------------- */
// const MONGO_URI = process.env.MONGO_URI;
// const FRONTEND_URL = process.env.FRONTEND_URL;

// if (!MONGO_URI) {
//   throw new Error("❌ MONGO_URI missing in .env");
// }

// /* ---------------- DB CONNECT ---------------- */
// mongoose
//   .connect(MONGO_URI)
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => {
//     console.error("❌ MongoDB error:", err);
//     process.exit(1);
//   });

// /* ---------------- SOCKET SERVER ---------------- */
// const io = new Server({
//   cors: {
//     origin: [
//       FRONTEND_URL || "http://localhost:3000",
//       "https://yourapp.vercel.app"
//     ],
//     credentials: true,
//   },
// });

// io.on("connection", (socket) => {
//   console.log("🟢 User connected:", socket.id);

//   socket.on("join-room", (roomId) => {
//     socket.join(roomId);
//   });

//   socket.on("send-message", async (data) => {
//     const msg = await Message.create(data);
//     io.to(data.roomId).emit("receive-message", msg);
//   });

//   socket.on("typing-start", ({ roomId }) => {
//     socket.to(roomId).emit("typing-start-to-client");
//   });

//   socket.on("typing-stop", ({ roomId }) => {
//     socket.to(roomId).emit("typing-stop-to-client");
//   });

//   socket.on("disconnect", () => {
//     console.log("🔴 User disconnected:", socket.id);
//   });
// });

// /* ---------------- LISTEN ---------------- */
// io.listen(3001);
// console.log("🚀 Socket server running on port 3001");








// import dotenv from "dotenv";
// dotenv.config();

// import { Server } from "socket.io";
// import mongoose from "mongoose";
// import { Message } from "./models/Message";
// import { User } from "./models/User";

// const MONGO_URI = process.env.MONGO_URI;
// const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

// mongoose.connect(MONGO_URI!);
// console.log("✅ MongoDB connected");

// const io = new Server({
//   cors: {
//     origin: FRONTEND_URL,
//     credentials: true,
//   },
// });

// const onlineUsers = new Map<string, string>(); // username → socketId

// io.on("connection", async (socket) => {
//   console.log("🟢 Connected:", socket.id);

//   /* -------- INIT -------- */
//   socket.on("init", async ({ username }) => {
//     onlineUsers.set(username, socket.id);

//     const users = await User.find({}, "username");
//     const chats = await Message.find({
//       $or: [{ senderId: username }, { receiverId: username }],
//     })
//       .sort({ createdAt: -1 })
//       .limit(20);

//     socket.emit("init", {
//       username,
//       users: users.map(u => u.username),
//       chats,
//       onlineUsers: Array.from(onlineUsers.keys()),
//     });
//   });

//   /* -------- JOIN ROOM -------- */
//   socket.on("join-room", (roomId) => {
//     socket.join(roomId);
//   });

//   /* -------- SEND MESSAGE -------- */
//   socket.on("send-message", async (data) => {
//     const msg = await Message.create({
//       roomId: data.roomId,
//       senderId: data.sender,
//       receiverId: data.receiver,
//       message: data.text,
//     });

//     io.to(data.roomId).emit("receive-message", msg);
//   });

//   /* -------- TYPING -------- */
//   socket.on("typing-start", ({ roomId, senderId }) => {
//     socket.to(roomId).emit("typing-start-to-client", senderId);
//   });

//   socket.on("typing-stop", ({ roomId, senderId }) => {
//     socket.to(roomId).emit("typing-stop-to-client", senderId);
//   });

//   socket.on("disconnect", () => {
//     for (const [user, id] of onlineUsers) {
//       if (id === socket.id) onlineUsers.delete(user);
//     }
//     console.log("🔴 Disconnected:", socket.id);
//   });
// });

// io.listen(3001);
// console.log("🚀 Socket running on 3001");











// import dotenv from "dotenv";
// dotenv.config();

// import { Server } from "socket.io";
// import mongoose from "mongoose";
// import { Message } from "./models/Message";
// import { User } from "./models/User";

// const MONGO_URI = process.env.MONGO_URI!;
// const FRONTEND_URL =
//   process.env.FRONTEND_URL || "http://localhost:3000";

// mongoose.connect(MONGO_URI);
// console.log("✅ MongoDB connected");

// const io = new Server({
//   cors: {
//     origin: FRONTEND_URL,
//     credentials: true,
//   },
// });

// const onlineUsers = new Map<string, string>(); // username → socketId

// io.on("connection", (socket) => {
//   console.log("🟢 Connected:", socket.id);

//   /* -------- INIT -------- */
//   socket.on("init", async ({ username }) => {
//     onlineUsers.set(username, socket.id);

//     const users = await User.find({}, "username");

//     const chats = await Message.find({
//       $or: [{ senderId: username }, { receiverId: username }],
//     }).sort({ createdAt: -1 });

//     socket.emit("init", {
//       users: users.map((u) => u.username),
//       chats,
//     });
//   });

//   /* -------- JOIN ROOM -------- */
//   socket.on("join-room", (roomId) => {
//     socket.join(roomId);
//   });

//   /* -------- SEND MESSAGE (✅ FIXED) -------- */
//   socket.on("send-message", async (data) => {
//     const msg = await Message.create({
//       roomId: data.roomId,
//       senderId: data.senderId,
//       receiverId: data.receiverId,
//       message: data.message,
//     });

//     io.to(data.roomId).emit("receive-message", msg);
//   });

//   /* -------- TYPING -------- */
//   socket.on("typing-start", ({ roomId, senderId }) => {
//     socket.to(roomId).emit("typing-start-to-client", senderId);
//   });

//   socket.on("typing-stop", ({ roomId, senderId }) => {
//     socket.to(roomId).emit("typing-stop-to-client", senderId);
//   });

//   socket.on("disconnect", () => {
//     for (const [user, id] of onlineUsers) {
//       if (id === socket.id) onlineUsers.delete(user);
//     }
//     console.log("🔴 Disconnected:", socket.id);
//   });
// });

// io.listen(3001);
// console.log("🚀 Socket running on 3001");















// import dotenv from "dotenv";
// dotenv.config();

// import { Server } from "socket.io";
// import mongoose from "mongoose";
// import { Message } from "./models/Message";
// import { User } from "./models/User";

// const MONGO_URI = process.env.MONGO_URI!;
// const FRONTEND_URL =
//   process.env.FRONTEND_URL || "http://localhost:3000";

// mongoose.connect(MONGO_URI);
// console.log("✅ MongoDB connected");

// const io = new Server({
//   cors: {
//     origin: FRONTEND_URL,
//     credentials: true,
//   },
// });

// const onlineUsers = new Map<string, string>(); // username → socketId

// io.on("connection", (socket) => {
//   console.log("🟢 Connected:", socket.id);

//   /* -------- INIT -------- */
//   socket.on("init", async ({ username }) => {
//     onlineUsers.set(username, socket.id);

//     const users = await User.find({}, "username");

//     const chats = await Message.find({
//       $or: [{ senderId: username }, { receiverId: username }],
//     }).sort({ createdAt: -1 });

//     socket.emit("init", {
//       users: users.map((u) => u.username),
//       chats,
//     });
//   });

//   /* -------- JOIN ROOM -------- */
//   socket.on("join-room", (roomId) => {
//     socket.join(roomId);
//   });

//   /* -------- SEND MESSAGE (SAFE) -------- */
//   socket.on("send-message", async (data) => {
//     try {
//       const msg = await Message.create({
//         roomId: data.roomId,
//         senderId: data.senderId,
//         receiverId: data.receiverId,
//         message: data.message,
//       });

//       io.to(data.roomId).emit("receive-message", msg);
//     } catch (err) {
//       console.error("❌ SEND MESSAGE ERROR:", err);
//     }
//   });

//   /* -------- TYPING -------- */
//   socket.on("typing-start", ({ roomId, senderId }) => {
//     socket.to(roomId).emit("typing-start-to-client", senderId);
//   });

//   socket.on("typing-stop", ({ roomId, senderId }) => {
//     socket.to(roomId).emit("typing-stop-to-client", senderId);
//   });

//   socket.on("disconnect", () => {
//     for (const [user, id] of onlineUsers) {
//       if (id === socket.id) onlineUsers.delete(user);
//     }
//     console.log("🔴 Disconnected:", socket.id);
//   });
// });

// io.listen(3001);
// console.log("🚀 Socket running on 3001");










// import dotenv from "dotenv";
// dotenv.config();

// import { Server } from "socket.io";
// import mongoose from "mongoose";
// import { Message } from "./models/Message";
// import { User } from "./models/User";

// const MONGO_URI = process.env.MONGO_URI!;
// const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

// mongoose.connect(MONGO_URI);
// console.log("✅ MongoDB connected");

// const io = new Server({
//   cors: {
//     origin: FRONTEND_URL,
//     credentials: true,
//   },
// });

// // Map to track online users: username -> socketId
// const onlineUsers = new Map<string, string>();

// io.on("connection", (socket) => {
//   console.log("🟢 Connected:", socket.id);

//   socket.on("init", async ({ username }) => {
//     onlineUsers.set(username, socket.id);

//     const users = await User.find({}, "username");
//     const chats = await Message.find({
//       $or: [{ senderId: username }, { receiverId: username }],
//     }).sort({ createdAt: -1 });

//     // Inform everyone about online status
//     io.emit("update-online-users", Array.from(onlineUsers.keys()));

//     socket.emit("init", {
//       users: users.map((u) => u.username),
//       chats,
//       onlineList: Array.from(onlineUsers.keys())
//     });
//   });

//   socket.on("join-room", (roomId) => {
//     socket.join(roomId);
//   });

//   socket.on("send-message", async (data) => {
//     try {
//       const msg = await Message.create({
//         roomId: data.roomId,
//         senderId: data.senderId,
//         receiverId: data.receiverId,
//         message: data.message,
//       });

//       io.to(data.roomId).emit("receive-message", msg);
//     } catch (err) {
//       console.error("❌ SEND MESSAGE ERROR:", err);
//     }
//   });

//   // PROFESSIONAL TYPING LOGIC
//   socket.on("typing-start", ({ roomId, senderId }) => {
//     socket.to(roomId).emit("typing-start-to-client", senderId);
//   });

//   socket.on("typing-stop", ({ roomId, senderId }) => {
//     socket.to(roomId).emit("typing-stop-to-client", senderId);
//   });

//   socket.on("disconnect", () => {
//     for (const [user, id] of onlineUsers) {
//       if (id === socket.id) {
//         onlineUsers.delete(user);
//         break;
//       }
//     }
//     io.emit("update-online-users", Array.from(onlineUsers.keys()));
//     console.log("🔴 Disconnected:", socket.id);
//   });
// });

// io.listen(3001);
// console.log("🚀 Socket running on 3001");






// import dotenv from "dotenv";
// dotenv.config();

// import { Server } from "socket.io";
// import mongoose from "mongoose";
// import { Message } from "./models/Message";
// import { User } from "./models/User";

// const MONGO_URI = process.env.MONGO_URI!;
// const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

// mongoose.connect(MONGO_URI);
// console.log("✅ MongoDB connected");

// const io = new Server({
//   cors: {
//     origin: FRONTEND_URL,
//     credentials: true,
//   },
// });

// const onlineUsers = new Map<string, string>();

// io.on("connection", (socket) => {
//   console.log("🟢 Connected:", socket.id);

//   // socket.on("init", async ({ username }) => {
//   //   if (!username) return;
//   //   onlineUsers.set(username, socket.id);

//   //   // Fetch all users for Discover section
//   //   const users = await User.find({}, "username");

//   //   // ✅ REFRESH FIX: Fetch all history for this user to restore Sidebar
//   //   const chats = await Message.find({
//   //     $or: [{ senderId: username }, { receiverId: username }],
//   //   }).sort({ createdAt: -1 });

//   //   io.emit("update-online-users", Array.from(onlineUsers.keys()));

//   //   socket.emit("init", {
//   //     users: users.map((u) => u.username),
//   //     chats,
//   //     onlineList: Array.from(onlineUsers.keys())
//   //   });
//   // });


//   // socket-server.ts (Complete Fixed Logic)
//   socket.on("init", async ({ username }) => {
//     if (!username) return;
//     onlineUsers.set(username, socket.id);

//     try {
//       const users = await User.find({}, "username");

//       // ✅ FIX: Find all messages where you are involved
//       const chats = await Message.find({
//         $or: [{ senderId: username }, { receiverId: username }],
//       }).sort({ createdAt: -1 });

//       // Inform everyone
//       io.emit("update-online-users", Array.from(onlineUsers.keys()));

//       // ✅ Crucial: Send this back to the user who just refreshed
//       socket.emit("init", {
//         users: users.map((u) => u.username),
//         chats: chats, // This restores your sidebar
//         onlineList: Array.from(onlineUsers.keys())
//       });
//     } catch (err) {
//       console.error("Init error:", err);
//     }
//   });

//   socket.on("join-room", (roomId) => {
//     socket.join(roomId);
//   });

//   socket.on("send-message", async (data) => {
//     try {
//       const msg = await Message.create({
//         roomId: data.roomId,
//         senderId: data.senderId,
//         receiverId: data.receiverId,
//         message: data.message,
//       });

//       // Send to both users in the room
//       io.to(data.roomId).emit("receive-message", msg);
//     } catch (err) {
//       console.error("❌ SEND MESSAGE ERROR:", err);
//     }
//   });

//   socket.on("typing-start", ({ roomId, senderId }) => {
//     socket.to(roomId).emit("typing-start-to-client", senderId);
//   });

//   socket.on("typing-stop", ({ roomId, senderId }) => {
//     socket.to(roomId).emit("typing-stop-to-client", senderId);
//   });

//   socket.on("disconnect", () => {
//     for (const [user, id] of onlineUsers) {
//       if (id === socket.id) {
//         onlineUsers.delete(user);
//         break;
//       }
//     }
//     io.emit("update-online-users", Array.from(onlineUsers.keys()));
//     console.log("🔴 Disconnected:", socket.id);
//   });
// });

// io.listen(3001);
// console.log("🚀 Socket running on 3001");








// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
// import { connectDB } from "@/lib/db";
// import { User } from "@/models/User";

// export async function GET(req: Request) {
//   try {
//     // 1️⃣ Get token from cookies
//     const cookieHeader = req.headers.get("cookie");
//     const token = cookieHeader
//       ?.split("; ")
//       .find((row) => row.startsWith("token="))
//       ?.split("=")[1];

//     if (!token) {
//       return NextResponse.json(
//         { error: "Unauthorized" },
//         { status: 401 }
//       );
//     }

//     if (!process.env.JWT_SECRET) {
//       throw new Error("JWT_SECRET is not defined");
//     }

//     // 2️⃣ Verify token
//     const decoded = jwt.verify(
//       token,
//       process.env.JWT_SECRET
//     ) as {
//       userId: string;
//       username: string;
//     };

//     await connectDB();

//     // 3️⃣ Find user
//     const user = await User.findById(decoded.userId)
//       .select("-password")
//       .lean();

//     if (!user) {
//       return NextResponse.json(
//         { error: "User not found" },
//         { status: 404 }
//       );
//     }

//     // 4️⃣ Return user data
//     return NextResponse.json(
//       {
//         user,
//       },
//       { status: 200 }
//     );
//   } catch (err) {
//     console.error("AUTH ME ERROR 👉", err);

//     return NextResponse.json(
//       { error: "Unauthorized" },
//       { status: 401 }
//     );
//   }
// }











import dotenv from "dotenv";
dotenv.config();

import { Server } from "socket.io";
import mongoose from "mongoose";
import { Message } from "./models/Message";
import { User } from "./models/User";

const MONGO_URI = process.env.MONGO_URI!;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch(err => console.log("❌ MongoDB Error:", err));

const io = new Server({
  cors: {
    origin: FRONTEND_URL,
    credentials: true,
  },
});

const onlineUsers = new Map<string, string>();

io.on("connection", (socket) => {
  console.log("🟢 New Connection:", socket.id);

  socket.on("init", async ({ username }) => {
    if (!username) return;
    onlineUsers.set(username, socket.id);

    console.log(`📡 Init received for user: ${username}`);

    try {
      // Fetch users and chats in parallel for speed
      const [users, chats] = await Promise.all([
        User.find({}, "username").lean(),
        Message.find({
          $or: [{ senderId: username }, { receiverId: username }],
        }).sort({ createdAt: -1 }).lean()
      ]);

      console.log(`📊 Found ${users.length} users and ${chats.length} historical messages`);

      io.emit("update-online-users", Array.from(onlineUsers.keys()));

      socket.emit("init", {
        users: users.map((u: any) => u.username),
        chats: chats,
        onlineList: Array.from(onlineUsers.keys())
      });
    } catch (err) {
      console.error("❌ Database Error during Init:", err);
    }
  });

  socket.on("start-typing", ({ roomId, senderId }) => {
    socket.to(roomId).emit("display-typing", { senderId });
  });

  socket.on("stop-typing", ({ roomId, senderId }) => {
    socket.to(roomId).emit("hide-typing", { senderId });
  });

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(`🏠 User joined room: ${roomId}`);
  });

  // socket.on("send-message", async (data) => {
  //   try {
  //     const msg = await Message.create({
  //       roomId: data.roomId,
  //       senderId: data.senderId,
  //       receiverId: data.receiverId,
  //       message: data.message,
  //     });
  //     io.to(data.roomId).emit("receive-message", msg);
  //     console.log(`📩 Message saved and sent to room: ${data.roomId}`);
  //   } catch (err) {
  //     console.error("❌ Send Message Error:", err);
  //   }
  // });

  // socket-server.ts mein send-message event ko aise update karein

  socket.on("send-message", async (data) => {
    try {
      const msg = await Message.create({
        roomId: data.roomId,
        senderId: data.senderId,
        receiverId: data.receiverId,
        message: data.message,
        readStatus: false, // ✅ Default hamesha false rahega (Single Tick)
      });

      io.to(data.roomId).emit("receive-message", msg);
    } catch (err) {
      console.error("❌ Send Message Error:", err);
    }
  });
  
  socket.on("mark-as-read", async ({ roomId, username }) => {
    try {
      await Message.updateMany(
        { roomId, receiverId: username, readStatus: false },
        { $set: { readStatus: true } }
      );
      // Notify the room that messages are read
      io.to(roomId).emit("messages-read-update", { roomId });
    } catch (err) {
      console.error("❌ READ STATUS ERROR:", err);
    }
  });

  socket.on("disconnect", () => {
    for (const [user, id] of onlineUsers) {
      if (id === socket.id) {
        onlineUsers.delete(user);
        console.log(`🔴 User Disconnected: ${user}`);
        break;
      }
    }
    io.emit("update-online-users", Array.from(onlineUsers.keys()));
  });
});

io.listen(3001);
console.log("🚀 Socket server running on http://localhost:3001");