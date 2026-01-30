"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Sidebar from "@/components/Sidebar";
import ChatWindow from "@/components/ChatWindow";
import { useRouter } from "next/navigation";

export default function ChatPage() {
  const [socket, setSocket] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<string>("");
  const [otherUser, setOtherUser] = useState<string | null>(null);
  const [chatList, setChatList] = useState<any[]>([]);
  const [allUsers, setAllUsers] = useState<string[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("username");
    if (!user) {
      router.push("/login");
      return;
    }
    setCurrentUser(user);

    // Socket Connection
    const s = io("http://localhost:3001");
    setSocket(s);

    s.emit("init", { username: user });

    s.on("init", ({ users, chats, onlineList }: any) => {
      setAllUsers(users);
      setChatList(chats);
      setOnlineUsers(onlineList);
    });

    s.on("update-online-users", (list: string[]) => {
      setOnlineUsers(list);
    });

    return () => {
      s.disconnect();
    };
  }, [router]);

  const handleSelectUser = (user: string) => {
    setOtherUser(user);
  };

  // const handleLogout = () => {
  //   localStorage.removeItem("username");
  //   router.push("/login");
  // };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      localStorage.removeItem("username");
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  if (!currentUser || !socket) return <div className="h-screen flex items-center justify-center font-bold text-blue-600 animate-pulse">Loading Messenger...</div>;

  return (
    <div className="flex h-[700px] bg-gray-100 p-4">
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
        />
      </div>
    </div>
  );
}