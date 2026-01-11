// socket-server.ts

import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import { Server } from "socket.io";
import mongoose from "mongoose";
import { Message } from "./models/Message";

// Track online users: Key = userId, Value = socketId
const onlineUsers = new Map<string, string>();

// MongoDB कनेक्शन
mongoose
  .connect(process.env.MONGO_URI as string, {
    writeConcern: { w: 'majority' }
  } as mongoose.ConnectOptions)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// Socket.IO सर्वर Port 3001 पर शुरू
const io = new Server(3001, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const getRoomId = (id1: string, id2: string): string => {
  return [id1, id2].sort().join("_");
};

io.on("connection", (socket) => {

  socket.on("user-connected", (userId: string) => {
    if (!userId) return;

    onlineUsers.set(userId, socket.id);
    io.emit("user-status-update", userId, true);
    // जब यूज़र कनेक्ट होता है, तो यूज़र लिस्ट को भी फेच करने के लिए कहें
    socket.emit('fetch-all-users');
  });

  socket.on("fetch-all-users", async () => {
    try {
      console.log("👥 Server: Fetching all unique user IDs...");

      // 🔑 FIX: Message मॉडल पर .distinct() का उपयोग करके सभी यूनीक senderId और receiverId को निकालें।
      // यह Aggregation Pipeline से बहुत आसान और अधिक विश्वसनीय तरीका है।

      const senderIds = await Message.distinct("senderId");
      const receiverIds = await Message.distinct("receiverId");

      // दोनों Arrays को एक साथ मिलाएं और Set का उपयोग करके डुप्लीकेट IDs को हटा दें
      const uniqueIdsSet = new Set([...senderIds, ...receiverIds]);

      // Set को Array में बदलें और किसी भी null, undefined, या empty string ID को हटा दें
      const uniqueUserIds: string[] = Array.from(uniqueIdsSet).filter(id => id);

      console.log(`✅ Server: Found ${uniqueUserIds.length} unique user IDs.`);
      socket.emit("all-users-loaded", uniqueUserIds);

    } catch (err) {
      console.error("❌ Fetch All Users Error:", err);
    }
  });

  socket.on("user-ready", (currentUserId: string, otherUserId: string) => {
    if (!currentUserId || !otherUserId) return;
    const roomId = getRoomId(currentUserId, otherUserId);
    socket.join(roomId);
  });

  // 📚 मैसेज हिस्ट्री फेच करने का हैंडलर
  socket.on("fetch-history", async (currentUserId: string, otherUserId: string) => {
    // ... (यह कोड अपरिवर्तित है)
    if (!currentUserId || !otherUserId) return;
    const roomId = getRoomId(currentUserId, otherUserId);

    try {
      const history = await Message.find({ roomId: roomId })
        .sort({ createdAt: 1 })
        .lean();

      socket.emit("history-loaded", history);
    } catch (err) {
      console.error("❌ History Fetch Error:", err);
    }
  });

  // 🚨 UPDATED: चैट लिस्ट फेच करने का हैंडलर
  socket.on("fetch-chat-list", async (currentUserId: string) => {
    if (!currentUserId) return;

    try {
      const recentChats = await Message.aggregate([
        {
          $match: {
            $or: [
              { senderId: currentUserId },
              { receiverId: currentUserId }
            ]
          }
        },
        {
          $sort: { createdAt: -1 }
        },
        {
          $group: {
            _id: {
              $cond: {
                if: { $eq: ["$senderId", currentUserId] },
                then: "$receiverId",
                else: "$senderId"
              }
            },
            lastMessage: { $first: "$message" },
            lastMessageTime: { $first: "$createdAt" },

            unreadCount: {
              $sum: {
                $cond: [{
                  $and: [
                    { $eq: ["$receiverId", currentUserId] },
                    { $eq: [{ $ifNull: ["$readStatus", false] }, false] }
                  ]
                }, 1, 0]
              }
            }
          }
        },
        {
          $sort: { lastMessageTime: -1 }
        },
        {
          $project: {
            _id: 0,
            id: "$_id",
            lastMessageTime: 1,
            lastMessage: 1,
            unreadCount: 1
          }
        }
      ]);

      const sortedPartners = recentChats.map(chat => ({
        id: chat.id,
        isOnline: onlineUsers.has(chat.id),
        unreadCount: chat.unreadCount,
        lastMessage: chat.lastMessage
      }));

      socket.emit("chat-list-loaded", sortedPartners);

    } catch (err) {
      console.error("❌ Chat List Fetch/Sort/Unread Error:", err);
    }
  });


  // 🚨 Mark Messages Read Handler
  socket.on("mark-messages-read", async (data: { currentUserId: string, otherUserId: string }) => {
    // ... (यह कोड अपरिवर्तित है)
    console.log(`🔑 Mark as Read Request for Room: ${data.currentUserId} with ${data.otherUserId}`);
    const roomId = getRoomId(data.currentUserId, data.otherUserId);

    try {
      const result = await Message.updateMany(
        {
          roomId: roomId,
          receiverId: data.currentUserId,
          $or: [
            { readStatus: false },
            { readStatus: { $exists: false } }
          ]
        },
        {
          $set: { readStatus: true }
        }
      );

      console.log(`✅ ${result.modifiedCount} messages marked as read in DB.`);

      const receiverSocketId = onlineUsers.get(data.currentUserId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('refresh-chat-list');
      }

    } catch (err) {
      console.error("❌ Mark as Read Error:", err);
    }
  });


  socket.on('typing-start', (data: { roomId: string, senderId: string }) => {
    socket.to(data.roomId).emit('typing-start-to-client', data.senderId);
  });

  socket.on('typing-stop', (data: { roomId: string, senderId: string }) => {
    socket.to(data.roomId).emit('typing-stop-to-client', data.senderId);
  });


  socket.on("send-message", async (data: { roomId: string, senderId: string, receiverId: string, message: string }) => {
    // ... (यह कोड अपरिवर्तित है)
    console.log("Received Message Data:", data);

    try {
      const newMessageInstance = new Message(data);
      const newMsg = await newMessageInstance.save();
      console.log("✅ Message Saved to DB:", newMsg._id);

      io.to(data.roomId).emit("receive-message", newMsg);

      const senderSocketId = onlineUsers.get(data.senderId);
      const receiverSocketId = onlineUsers.get(data.receiverId);

      if (senderSocketId) io.to(senderSocketId).emit('refresh-chat-list');
      if (receiverSocketId) io.to(receiverSocketId).emit('refresh-chat-list');

      // 🔑 NEW: नया मैसेज भेजने के बाद ऑल यूज़र लिस्ट को भी रीफ्रेश करें ताकि नए यूज़र जुड़ें
      io.emit('fetch-all-users');

    } catch (err) {
      console.error("❌ DB Save or Broadcast ERROR:", err);
    }
  });


  socket.on("disconnect", () => {
    // ... (यह कोड अपरिवर्तित है)
    let disconnectedUserId = '';

    for (const [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        disconnectedUserId = userId;
        break;
      }
    }

    if (disconnectedUserId) {
      onlineUsers.delete(disconnectedUserId);
      io.emit("user-status-update", disconnectedUserId, false);
    }
  });
});