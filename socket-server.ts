import dotenv from "dotenv";
dotenv.config();
import { Server } from "socket.io";
import mongoose from "mongoose";
import { Message } from "./models/Message";
import { User } from "./models/User";

const MONGO_URI = process.env.MONGO_URI!;
const FRONTEND_URL = process.env.FRONTEND_URL || "https://nextjs-realtime-chat-murex-one.vercel.app";
const PORT = process.env.PORT || 3001;

mongoose.connect(MONGO_URI).then(() => console.log("✅ MongoDB Connected"));

const io = new Server({ cors: { origin: FRONTEND_URL, credentials: true } });
const onlineUsers = new Map<string, string>();

io.on("connection", (socket) => {
  socket.on("init", async ({ username }) => {
    if (!username) return;

    onlineUsers.set(username, socket.id);

    const [users, chats] = await Promise.all([
      User.find({}, "username").lean(),
      Message.find({
        $or:
          [
            { senderId: username },
            { receiverId: username }
          ]
      }).sort({ createdAt: -1 }).lean()
    ]);

    io.emit("update-online-users", Array.from(onlineUsers.keys()));

    socket.emit("init", {
      users: users.map((u: any) => u.username),
      chats,
      onlineList: Array.from(onlineUsers.keys())
    });
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