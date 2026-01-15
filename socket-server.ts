
import dotenv from "dotenv";
dotenv.config();

import { Server } from "socket.io";
import mongoose from "mongoose";
import { Message } from "./models/Message";

/* ---------------- ENV SAFETY ---------------- */
const MONGO_URI = process.env.MONGO_URI;
const FRONTEND_URL = process.env.FRONTEND_URL;

if (!MONGO_URI) {
  throw new Error("❌ MONGO_URI missing in .env");
}

/* ---------------- DB CONNECT ---------------- */
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB error:", err);
    process.exit(1);
  });

/* ---------------- SOCKET SERVER ---------------- */
const io = new Server({
  cors: {
    origin: [
      FRONTEND_URL || "http://localhost:3000",
      "https://yourapp.vercel.app"
    ],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
  });

  socket.on("send-message", async (data) => {
    const msg = await Message.create(data);
    io.to(data.roomId).emit("receive-message", msg);
  });

  socket.on("typing-start", ({ roomId }) => {
    socket.to(roomId).emit("typing-start-to-client");
  });

  socket.on("typing-stop", ({ roomId }) => {
    socket.to(roomId).emit("typing-stop-to-client");
  });

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});

/* ---------------- LISTEN ---------------- */
io.listen(3001);
console.log("🚀 Socket server running on port 3001");
