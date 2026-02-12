"use client";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import Sidebar from "@/components/Sidebar";
import ChatWindow from "@/components/ChatWindow";
import { useSearchParams, useRouter } from "next/navigation";
import { Toaster, toast } from 'react-hot-toast'

export default function ChatPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const userFromURL = searchParams.get("u");
  const [otherUser, setOtherUser] = useState<string | null>(userFromURL);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [currentUser, setCurrentUser] = useState<string>("");
  const [chatList, setChatList] = useState<any[]>([]);
  const [allUsers, setAllUsers] = useState<string[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);


  useEffect(() => {
    const initChat = async () => {
      console.log("Fetching user...");
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        console.log("User Data:", data);

        if (!res.ok || !data.user) {
          console.log("Auth Failed");
          router.push("/login");
          return;
        }

        const username = data.user.username;
        setCurrentUser(username);

        const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || "https://nextjs-realtime-chat.onrender.com";

        const s = io(socketUrl, {
          withCredentials: true,
          transports: ["websocket", "polling"],
          reconnection: true,
          reconnectionAttempts: 10,
        });
        setSocket(s);

        s.on("connect", () => {
          console.log("✅ Socket Connected with ID:", s.id);
          console.log("📤 Emitting init for user:", username);
          s.emit("init", { username });
        });

        s.on("init", ({ users, chats, onlineList }: any) => {
          console.log("RAW INIT DATA:", { users, chats, onlineList });
          setAllUsers(users);
          setChatList(chats);
          setOnlineUsers(onlineList);
        });

        s.on("update-online-users", (list: string[]) => {
          setOnlineUsers(list);
        });

      } catch (err) {
        console.error("Chat Page Init Error:", err);
        router.push("/login");
      }
    };

    initChat();

    return () => {
      if (socket) socket.disconnect();
    };
  }, [router]);

  useEffect(() => {
    if (!socket || !currentUser) return;

    const handleMsg = (msg: any) => {
      setChatList((prev) => {
        const filtered = prev.filter(m => {
          const p1 = m.senderId === currentUser ? m.receiverId : m.senderId;
          const p2 = msg.senderId === currentUser ? msg.receiverId : msg.senderId;
          return p1 !== p2;
        });
        return [msg, ...filtered];
      });

      const isNotMe = msg.senderId !== currentUser;
      const isNotCurrentChat = msg.senderId !== otherUser;

      if (isNotMe && (document.hidden || isNotCurrentChat)) {
        new Audio("/notify.mp3").play().catch(() => { });
        if (document.hidden) {
          new Notification(`New message from ${msg.senderId}`, { body: msg.message });
        } else {
          toast.success(`New message from ${msg.senderId}`);
        }
      }
    };

    const handleReadUpdate = ({ roomId }: { roomId: string }) => {
      setChatList(prev => prev.map(m => m.roomId === roomId ? { ...m, readStatus: true } : m));
    };

    socket.on("receive-message", handleMsg);
    socket.on("messages-read-update", handleReadUpdate);

    return () => {
      socket.off("receive-message", handleMsg);
      socket.off("messages-read-update", handleReadUpdate);
    };

  }, [socket, currentUser, otherUser]);

  useEffect(() => {
    if (userFromURL !== otherUser) {
      setOtherUser(userFromURL);
    }
  }, [userFromURL]);

  const handleSelectUser = (user: string) => {
    router.push(`/chat?u=${user}`);
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      localStorage.removeItem("username");
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  if (!currentUser || !socket) {
    return (
      <div className="h-screen flex items-center justify-center font-bold text-blue-600 animate-pulse bg-gray-900">
        Loading Messenger...
      </div>
    );
  }

  return (
    <div className="flex h-[700px] bg-gray-100 p-4">
      <Toaster />
      <div className="flex w-full max-w-7xl mx-auto bg-white overflow-hidden shadow-2xl rounded-3xl border border-gray-200">
        <Sidebar
          currentUser={currentUser}
          otherUser={otherUser}
          setOtherUser={handleSelectUser}
          chatList={chatList}
          allUsers={allUsers}
          onlineUsers={onlineUsers}
          onLogout={handleLogout}
          socket={socket}
        />
        <ChatWindow
          currentUser={currentUser}
          otherUser={otherUser}
          socket={socket}
          onlineUsers={onlineUsers}
          allUsers={allUsers}
        />
      </div>
    </div>
  );
}