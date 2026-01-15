
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";
import Sidebar from "@/components/Sidebar";
import ChatWindow from "@/components/ChatWindow";

export default function ChatPage() {
  const router = useRouter();

  const [socket, setSocket] = useState<Socket | null>(null);
  const [currentUser, setCurrentUser] = useState("");
  const [otherUser, setOtherUser] = useState<string | null>(null);
  const [chatList, setChatList] = useState<any[]>([]);
  const [allUsers, setAllUsers] = useState<string[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    const s = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
      withCredentials: true,
    });

    setSocket(s);

    s.on("init", ({ username, users, chats }) => {
      setCurrentUser(username);
      setAllUsers(users);
      setChatList(chats);
    });

    s.on("receive-message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    setMessages([]);
  }, [otherUser]);

  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);

    try {
      socket?.disconnect();
      await fetch("/api/auth/logout", { method: "POST" });

      toast.success("Logged out");
      router.replace("/login");
    } catch {
      toast.error("Logout failed");
      setLoggingOut(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        currentUser={currentUser}
        otherUser={otherUser}
        setOtherUser={setOtherUser}
        chatList={chatList}
        allUsers={allUsers}
        onLogout={handleLogout}
        loggingOut={loggingOut}
      />

      <ChatWindow
        currentUser={currentUser}
        otherUser={otherUser}
        messages={messages}
        setMessages={setMessages}
        socket={socket}
      />
    </div>
  );
}
