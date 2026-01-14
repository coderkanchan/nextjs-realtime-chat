// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import io from "socket.io-client";
// import Sidebar from "@/components/Sidebar";
// import ChatWindow from "@/components/ChatWindow";

// const socket = io("http://localhost:3001", { transports: ["websocket"] });

// export default function ChatPage() {
//   const [currentUser, setCurrentUser] = useState<string | null>(null);
//   const [otherUser, setOtherUser] = useState<string>("");
//   const [messages, setMessages] = useState<any[]>([]);
//   const [chatList, setChatList] = useState<any[]>([]);
//   const [allUsers, setAllUsers] = useState<string[]>([]);
//   const router = useRouter();

//   useEffect(() => {
//     const saved = localStorage.getItem("chat_username");
//     if (!saved) {
//       router.push("/login");
//     } else {
//       setCurrentUser(saved);
//       socket.emit("user-connected", saved);
//       socket.emit("fetch-all-users");
//       socket.emit("fetch-chat-list", saved);
//     }

//     socket.on("all-users-loaded", (users: string[]) => setAllUsers(users));
//     socket.on("chat-list-loaded", (list) => setChatList(list));
//     socket.on("receive-message", (msg) => {
//       setMessages((prev) => [...prev, { sender: msg.senderId, text: msg.message }]);
//     });

//     return () => { socket.off(); };
//   }, [router]);

//   if (!currentUser) return (
//     <div className="h-screen flex items-center justify-center bg-white text-black font-bold">
//       Loading your workspace...
//     </div>
//   );

//   return (
//     <div className="max-w-7xl mx-auto p-6 bg-gray-50 flex h-screen text-black">
//       <Sidebar
//         currentUser={currentUser} otherUser={otherUser} setOtherUser={setOtherUser}
//         chatList={chatList} allUsers={allUsers} socket={socket}
//       />
//       <ChatWindow
//         currentUser={currentUser} otherUser={otherUser} socket={socket}
//         messages={messages} setMessages={setMessages}
//       />
//     </div>
//   );
// }






// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import io from "socket.io-client";
// import Sidebar from "@/components/Sidebar";
// import ChatWindow from "@/components/ChatWindow";

// const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!);

// export default function ChatPage() {
//   const [user, setUser] = useState("");
//   const [otherUser, setOtherUser] = useState("");

//   const router = useRouter();

//   useEffect(() => {
//     fetch("/api/me").then(async res => {
//       if (!res.ok) router.push("/login");
//       else {
//         const data = await res.json();
//         setUser(data.username);
//         socket.emit("user-connected", data.username);
//       }
//     });
//   }, []);

//   if (!user) return <p>Loading...</p>;

//   return (
//     <div className="flex h-screen">
//       <Sidebar
//         currentUser={user}
//         setOtherUser={setOtherUser}
//         socket={socket}
//       />
//       <ChatWindow
//         currentUser={user}
//         otherUser={otherUser}
//         socket={socket}
//       />
//     </div>
//   );
// }





// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { io, Socket } from "socket.io-client";
// import { toast } from "sonner";
// import Sidebar from "@/components/Sidebar";

// let socket: Socket;

// export default function ChatPage() {
//   const router = useRouter();

//   const [currentUser, setCurrentUser] = useState<string>("");
//   const [otherUser, setOtherUser] = useState<string | null>(null);
//   const [chatList, setChatList] = useState<any[]>([]);
//   const [allUsers, setAllUsers] = useState<string[]>([]);
//   const [loggingOut, setLoggingOut] = useState(false); // ⭐ EXTRA PRO TIP

//   /* ------------------ SOCKET SETUP ------------------ */
//   useEffect(() => {
//     socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
//       withCredentials: true,
//     });

//     socket.on("connect", () => {
//       console.log("Socket connected:", socket.id);
//     });

//     socket.on("init", ({ username, users, chats }) => {
//       setCurrentUser(username);
//       setAllUsers(users);
//       setChatList(chats);
//     });

//     socket.on("chatListUpdate", (updatedChats) => {
//       setChatList(updatedChats);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   /* ------------------ LOGOUT HANDLER ------------------ */
//   const handleLogout = async () => {
//     if (loggingOut) return;
//     setLoggingOut(true);

//     try {
//       socket?.disconnect();

//       await fetch("/api/auth/logout", {
//         method: "POST",
//       });

//       toast.success("Logged out successfully");
//       router.replace("/login");
//     } catch (err) {
//       toast.error("Logout failed");
//       setLoggingOut(false);
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Sidebar
//         currentUser={currentUser}
//         otherUser={otherUser}
//         setOtherUser={setOtherUser}
//         chatList={chatList}
//         allUsers={allUsers}
//         socket={socket}
//         onLogout={handleLogout}
//         loggingOut={loggingOut}   // ⭐ PASSING EXTRA PRO TIP
//       />

//       {/* ---------------- CHAT AREA ---------------- */}
//       <div className="flex-1 flex items-center justify-center text-gray-400">
//         {otherUser
//           ? `Chatting with ${otherUser}`
//           : "Select a user to start chatting"}
//       </div>
//     </div>
//   );
// }






"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";
import Sidebar from "@/components/Sidebar";
import ChatWindow from "@/components/ChatWindow";

let socket: Socket;

export default function ChatPage() {
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState<string>("");
  const [otherUser, setOtherUser] = useState<string | null>(null);
  const [chatList, setChatList] = useState<any[]>([]);
  const [allUsers, setAllUsers] = useState<string[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [loggingOut, setLoggingOut] = useState(false);

  /* ---------------- SOCKET INIT ---------------- */
  useEffect(() => {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
      withCredentials: true,
    });

    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });

    socket.on("init", ({ username, users, chats }) => {
      setCurrentUser(username);
      setAllUsers(users);
      setChatList(chats);
    });

    socket.on("receive-message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  /* -------- CLEAR CHAT WHEN USER CHANGES -------- */
  useEffect(() => {
    setMessages([]);
  }, [otherUser]);

  /* ---------------- LOGOUT ---------------- */
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
