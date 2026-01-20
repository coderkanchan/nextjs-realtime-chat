
// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { io, Socket } from "socket.io-client";
// import { toast } from "sonner";
// import Sidebar from "@/components/Sidebar";
// import ChatWindow from "@/components/ChatWindow";

// export default function ChatPage() {
//   const router = useRouter();

//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [currentUser, setCurrentUser] = useState("");
//   const [otherUser, setOtherUser] = useState<string | null>(null);
//   const [chatList, setChatList] = useState<any[]>([]);
//   const [allUsers, setAllUsers] = useState<string[]>([]);
//   const [messages, setMessages] = useState<any[]>([]);
//   const [loggingOut, setLoggingOut] = useState(false);

//   useEffect(() => {
//     const s = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
//       withCredentials: true,
//     });

//     setSocket(s);

//     s.on("init", ({ username, users, chats }) => {
//       setCurrentUser(username);
//       setAllUsers(users);
//       setChatList(chats);
//     });

//     s.on("receive-message", (msg) => {
//       setMessages((prev) => [...prev, msg]);
//     });

//     return () => {
//       s.disconnect();
//     };
//   }, []);

//   useEffect(() => {
//     setMessages([]);
//   }, [otherUser]);

//   useEffect(() => {
//     if (!socket || !currentUser) return;

//     socket.emit("init", { username: currentUser });
//   }, [socket, currentUser]);


//   const handleLogout = async () => {
//     if (loggingOut) return;
//     setLoggingOut(true);

//     try {
//       socket?.disconnect();
//       await fetch("/api/auth/logout", { method: "POST" });

//       toast.success("Logged out");
//       router.replace("/login");
//     } catch {
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
//         onLogout={handleLogout}
//         loggingOut={loggingOut}
//       />

//       <ChatWindow
//         currentUser={currentUser}
//         otherUser={otherUser}
//         messages={messages}
//         setMessages={setMessages}
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
// import ChatWindow from "@/components/ChatWindow";

// export default function ChatPage() {
//   const router = useRouter();

//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [currentUser, setCurrentUser] = useState("");
//   const [otherUser, setOtherUser] = useState<string | null>(null);
//   const [chatList, setChatList] = useState<any[]>([]);
//   const [allUsers, setAllUsers] = useState<string[]>([]);
//   const [messages, setMessages] = useState<any[]>([]);
//   const [loggingOut, setLoggingOut] = useState(false);

//   useEffect(() => {
//     const s = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
//       withCredentials: true,
//     });

//     setSocket(s);

//     /* ✅ INIT DATA FROM SERVER */
//     s.on("init", ({ username, users, chats }) => {
//       setCurrentUser(username);
//       setAllUsers(users);
//       setChatList(chats);
//     });

//     s.on("receive-message", (msg) => {
//       setMessages((prev) => [...prev, msg]);
//     });

//     return () => {
//       s.disconnect();
//     };
//   }, []);

//   /* ✅ CLEAR MESSAGES ON CHAT SWITCH */
//   useEffect(() => {
//     setMessages([]);
//   }, [otherUser]);

//   const handleLogout = async () => {
//     if (loggingOut) return;
//     setLoggingOut(true);

//     try {
//       socket?.disconnect();
//       await fetch("/api/auth/logout", { method: "POST" });

//       toast.success("Logged out");
//       router.replace("/login");
//     } catch {
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
//         onLogout={handleLogout}
//         loggingOut={loggingOut}
//       />

//       <ChatWindow
//         currentUser={currentUser}
//         otherUser={otherUser}
//         messages={messages}
//         setMessages={setMessages}
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
// import ChatWindow from "@/components/ChatWindow";

// export default function ChatPage() {
//   const router = useRouter();

//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [currentUser, setCurrentUser] = useState("");
//   const [otherUser, setOtherUser] = useState<string | null>(null);
//   const [chatList, setChatList] = useState<any[]>([]);
//   const [allUsers, setAllUsers] = useState<string[]>([]);
//   const [messages, setMessages] = useState<any[]>([]);
//   const [loggingOut, setLoggingOut] = useState(false);

//   useEffect(() => {
//     const s = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
//       withCredentials: true,
//     });

//     setSocket(s);

//     // ✅ PROFESSIONAL INIT HANDSHAKE
//     fetch("/api/auth/me")
//       .then(res => res.json())
//       .then(data => {
//         if (data?.username) {
//           s.emit("init", { username: data.username });
//         }
//       });

//     s.on("init", ({ username, users, chats }) => {
//       setCurrentUser(username);
//       setAllUsers(users);
//       setChatList(chats);
//     });

//     s.on("receive-message", (msg) => {
//       setMessages((prev) => [...prev, msg]);
//     });

//     return () => {
//       s.disconnect();
//     };
//   }, []);

//   // ✅ CLEAR CHAT ON USER SWITCH
//   useEffect(() => {
//     setMessages([]);
//   }, [otherUser]);

//   const handleLogout = async () => {
//     if (loggingOut) return;
//     setLoggingOut(true);

//     try {
//       socket?.disconnect();
//       await fetch("/api/auth/logout", { method: "POST" });

//       toast.success("Logged out");
//       router.replace("/login");
//     } catch {
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
//         onLogout={handleLogout}
//         loggingOut={loggingOut}
//       />

//       <ChatWindow
//         currentUser={currentUser}
//         otherUser={otherUser}
//         messages={messages}
//         setMessages={setMessages}
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
// import ChatWindow from "@/components/ChatWindow";

// export default function ChatPage() {
//   const router = useRouter();

//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [currentUser, setCurrentUser] = useState("");
//   const [otherUser, setOtherUser] = useState<string | null>(null);
//   const [chatList, setChatList] = useState<any[]>([]);
//   const [allUsers, setAllUsers] = useState<string[]>([]);
//   const [messages, setMessages] = useState<any[]>([]);
//   const [loggingOut, setLoggingOut] = useState(false);

//   /* ✅ AUTH CHECK + SOCKET INIT */
//   useEffect(() => {
//     const init = async () => {
//       try {
//         // 🔹 Step 1: get logged-in user
//         const res = await fetch("/api/auth/me", {
//           credentials: "include",
//         });

//         if (!res.ok) {
//           router.replace("/login");
//           return;
//         }

//         const data = await res.json();
//         const username = data.user.username;

//         setCurrentUser(username);

//         // 🔹 Step 2: connect socket
//         const s = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
//           withCredentials: true,
//         });

//         setSocket(s);

//         // 🔹 Step 3: emit init (CRITICAL FIX)
//         s.emit("init", { username });

//         // 🔹 Step 4: listen init response
//         s.on("init", ({ users, chats }) => {
//           setAllUsers(users);
//           setChatList(chats);
//         });

//         // 🔹 Step 5: receive messages
//         s.on("receive-message", (msg) => {
//           setMessages((prev) => [...prev, msg]);
//         });

//         return () => {
//           s.disconnect();
//         };
//       } catch (err) {
//         console.error("INIT ERROR", err);
//         router.replace("/login");
//       }
//     };

//     init();
//   }, [router]);

//   /* ✅ CLEAR MESSAGES ON CHAT SWITCH */
//   useEffect(() => {
//     setMessages([]);
//   }, [otherUser]);

//   const handleLogout = async () => {
//     if (loggingOut) return;
//     setLoggingOut(true);

//     try {
//       socket?.disconnect();
//       await fetch("/api/auth/logout", { method: "POST" });

//       toast.success("Logged out");
//       router.replace("/login");
//     } catch {
//       toast.error("Logout failed");
//       setLoggingOut(false);
//     }
//   };

//   return (
//     <div className="flex h-[800px] bg-gray-100 ">
//       <Sidebar
//         currentUser={currentUser}
//         otherUser={otherUser}
//         setOtherUser={setOtherUser}
//         chatList={chatList}
//         allUsers={allUsers}
//         onLogout={handleLogout}
//         loggingOut={loggingOut}
//       />

//       <ChatWindow
//         currentUser={currentUser}
//         otherUser={otherUser}
//         messages={messages}
//         setMessages={setMessages}
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
// import ChatWindow from "@/components/ChatWindow";

// export default function ChatPage() {
//   const router = useRouter();

//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [currentUser, setCurrentUser] = useState("");
//   const [otherUser, setOtherUser] = useState<string | null>(null);
//   const [chatList, setChatList] = useState<any[]>([]);
//   const [allUsers, setAllUsers] = useState<string[]>([]);
//   const [messages, setMessages] = useState<any[]>([]);
//   const [loggingOut, setLoggingOut] = useState(false);

//   useEffect(() => {
//     const init = async () => {
//       try {
//         const res = await fetch("/api/auth/me", {
//           credentials: "include",
//         });

//         if (!res.ok) {
//           router.replace("/login");
//           return;
//         }

//         const data = await res.json();
//         const username = data.user.username;

//         setCurrentUser(username);

//         const s = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
//           withCredentials: true,
//         });

//         setSocket(s);

//         s.emit("init", { username });

//         s.on("init", ({ users, chats }) => {
//           setAllUsers(users);
//           setChatList(chats);
//         });

//         return () => {
//           s.disconnect();
//         };
//       } catch (err) {
//         console.error("INIT ERROR", err);
//         router.replace("/login");
//       }
//     };

//     init();
//   }, [router]);

//   useEffect(() => {
//     setMessages([]);
//   }, [otherUser]);

//   const handleLogout = async () => {
//     if (loggingOut) return;
//     setLoggingOut(true);

//     try {
//       socket?.disconnect();
//       await fetch("/api/auth/logout", { method: "POST" });

//       toast.success("Logged out");
//       router.replace("/login");
//     } catch {
//       toast.error("Logout failed");
//       setLoggingOut(false);
//     }
//   };

//   return (
//     <div className="flex h-[800px] bg-gray-100 ">
//       <Sidebar
//         currentUser={currentUser}
//         otherUser={otherUser}
//         setOtherUser={setOtherUser}
//         chatList={chatList}
//         allUsers={allUsers}
//         onLogout={handleLogout}
//         loggingOut={loggingOut}
//       />

//       <ChatWindow
//         currentUser={currentUser}
//         otherUser={otherUser}
//         messages={messages}
//         setMessages={setMessages}
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
// import ChatWindow from "@/components/ChatWindow";

// export default function ChatPage() {
//   const router = useRouter();

//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [currentUser, setCurrentUser] = useState("");
//   const [otherUser, setOtherUser] = useState<string | null>(null);
//   const [chatList, setChatList] = useState<any[]>([]);
//   const [allUsers, setAllUsers] = useState<string[]>([]);
//   const [messages, setMessages] = useState<any[]>([]);
//   const [loggingOut, setLoggingOut] = useState(false);

//   /* 🔐 AUTH + USER */
//   useEffect(() => {
//     const fetchUser = async () => {
//       const res = await fetch("/api/auth/me", {
//         credentials: "include",
//       });

//       if (!res.ok) {
//         router.replace("/login");
//         return;
//       }

//       const data = await res.json();
//       setCurrentUser(data.user.username);
//     };

//     fetchUser();
//   }, [router]);

//   /* 🔌 SOCKET INIT (after currentUser) */
//   useEffect(() => {
//     if (!currentUser) return;

//     const s = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
//       withCredentials: true,
//     });

//     setSocket(s);

//     s.emit("init", { username: currentUser });

//     s.on("init", ({ users, chats }) => {
//       setAllUsers(users || []);
//       setChatList(chats || []);
//     });

//     return () => {
//       s.disconnect();
//     };
//   }, [currentUser]);

//   useEffect(() => {
//     setMessages([]);
//   }, [otherUser]);

//   const handleLogout = async () => {
//     if (loggingOut) return;
//     setLoggingOut(true);

//     socket?.disconnect();
//     await fetch("/api/auth/logout", { method: "POST" });

//     toast.success("Logged out");
//     router.replace("/login");
//   };

//   return (
//     <div className="flex h-[800px] bg-gray-100">
//       <Sidebar
//         currentUser={currentUser}
//         otherUser={otherUser}
//         setOtherUser={setOtherUser}
//         chatList={chatList}
//         allUsers={allUsers}
//         onLogout={handleLogout}
//         loggingOut={loggingOut}
//       />

//       <ChatWindow
//         currentUser={currentUser}
//         otherUser={otherUser}
//         messages={messages}
//         setMessages={setMessages}
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
// import ChatWindow from "@/components/ChatWindow";

// export default function ChatPage() {
//   const router = useRouter();

//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [currentUser, setCurrentUser] = useState("");
//   const [otherUser, setOtherUser] = useState<string | null>(null);
//   const [chatList, setChatList] = useState<any[]>([]);
//   const [allUsers, setAllUsers] = useState<string[]>([]);
//   const [messages, setMessages] = useState<any[]>([]);
//   const [loggingOut, setLoggingOut] = useState(false);

//   /* 🔐 AUTH + USER */
//   useEffect(() => {
//     const fetchUser = async () => {
//       const res = await fetch("/api/auth/me", {
//         credentials: "include",
//       });

//       if (!res.ok) {
//         router.replace("/login");
//         return;
//       }

//       const data = await res.json();
//       setCurrentUser(data.user.username);
//     };

//     fetchUser();
//   }, [router]);

//   /* 🔌 SOCKET INIT */
//   useEffect(() => {
//     if (!currentUser) return;

//     const s = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
//       withCredentials: true,
//     });

//     setSocket(s);

//     s.emit("init", { username: currentUser });

//     s.on("init", ({ users, chats }) => {
//       setAllUsers(users || []);
//       setChatList(chats || []);
//     });

//     // 🔥 NEW: update recent chats on new message
//     s.on("receive-message", (msg) => {
//       setChatList((prev) => {
//         const filtered = prev.filter(
//           (m) =>
//             !(
//               m.roomId === msg.roomId &&
//               m.senderId === msg.senderId &&
//               m.receiverId === msg.receiverId
//             )
//         );
//         return [msg, ...filtered];
//       });
//     });

//     return () => {
//       s.off("receive-message");
//       s.disconnect();
//     };
//   }, [currentUser]);

//   useEffect(() => {
//     setMessages([]);
//   }, [otherUser]);

//   const handleLogout = async () => {
//     if (loggingOut) return;
//     setLoggingOut(true);

//     socket?.disconnect();
//     await fetch("/api/auth/logout", { method: "POST" });

//     toast.success("Logged out");
//     router.replace("/login");
//   };

//   return (
//     <div className="flex h-[800px] bg-gray-100">
//       <Sidebar
//         currentUser={currentUser}
//         otherUser={otherUser}
//         setOtherUser={setOtherUser}
//         chatList={chatList}
//         allUsers={allUsers}
//         onLogout={handleLogout}
//         loggingOut={loggingOut}
//       />

//       <ChatWindow
//         currentUser={currentUser}
//         otherUser={otherUser}
//         messages={messages}
//         setMessages={setMessages}
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
// import ChatWindow from "@/components/ChatWindow";

// export default function ChatPage() {
//   const router = useRouter();

//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [currentUser, setCurrentUser] = useState("");
//   const [otherUser, setOtherUser] = useState<string | null>(null);
//   const [chatList, setChatList] = useState<any[]>([]);
//   const [allUsers, setAllUsers] = useState<string[]>([]);
//   const [onlineUsers, setOnlineUsers] = useState<string[]>([]); // New state
//   const [messages, setMessages] = useState<any[]>([]);
//   const [loggingOut, setLoggingOut] = useState(false);

//   useEffect(() => {
//     const fetchUser = async () => {
//       const res = await fetch("/api/auth/me", { credentials: "include" });
//       if (!res.ok) {
//         router.replace("/login");
//         return;
//       }
//       const data = await res.json();
//       setCurrentUser(data.user.username);
//     };
//     fetchUser();
//   }, [router]);

//   useEffect(() => {
//     if (!currentUser) return;

//     const s = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
//       withCredentials: true,
//     });

//     setSocket(s);
//     s.emit("init", { username: currentUser });

//     s.on("init", ({ users, chats, onlineList }) => {
//       setAllUsers(users || []);
//       setChatList(chats || []);
//       setOnlineUsers(onlineList || []);
//     });

//     s.on("update-online-users", (list) => {
//       setOnlineUsers(list);
//     });

//     s.on("receive-message", (msg) => {
//       setChatList((prev) => {
//         const filtered = prev.filter(
//           (m) => !(m.roomId === msg.roomId && m.senderId === msg.senderId && m.receiverId === msg.receiverId)
//         );
//         return [msg, ...filtered];
//       });
//     });

//     return () => {
//       s.off("receive-message");
//       s.off("update-online-users");
//       s.disconnect();
//     };
//   }, [currentUser]);

//   useEffect(() => {
//     setMessages([]);
//   }, [otherUser]);

//   const handleLogout = async () => {
//     if (loggingOut) return;
//     setLoggingOut(true);
//     socket?.disconnect();
//     await fetch("/api/auth/logout", { method: "POST" });
//     toast.success("Logged out");
//     router.replace("/login");
//   };

//   return (
//     <div className="flex h-[800px] bg-gray-100">
//       <Sidebar
//         currentUser={currentUser}
//         otherUser={otherUser}
//         setOtherUser={setOtherUser}
//         chatList={chatList}
//         allUsers={allUsers}
//         onlineUsers={onlineUsers}
//         onLogout={handleLogout}
//         loggingOut={loggingOut}
//       />

//       <ChatWindow
//         currentUser={currentUser}
//         otherUser={otherUser}
//         messages={messages}
//         setMessages={setMessages}
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
// import ChatWindow from "@/components/ChatWindow";

// export default function ChatPage() {
//   const router = useRouter();

//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [currentUser, setCurrentUser] = useState("");
//   const [otherUser, setOtherUser] = useState<string | null>(null);
//   const [chatList, setChatList] = useState<any[]>([]);
//   const [allUsers, setAllUsers] = useState<string[]>([]);
//   const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
//   const [messages, setMessages] = useState<any[]>([]);
//   const [loggingOut, setLoggingOut] = useState(false);

//   /* 🔐 AUTH + USER */
//   useEffect(() => {
//     const fetchUser = async () => {
//       const res = await fetch("/api/auth/me", { credentials: "include" });
//       if (!res.ok) {
//         router.replace("/login");
//         return;
//       }
//       const data = await res.json();
//       setCurrentUser(data.user.username);
//     };
//     fetchUser();
//   }, [router]);

//   /* 🔌 SOCKET INIT */
//   useEffect(() => {
//     if (!currentUser) return;

//     const s = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
//       withCredentials: true,
//     });

//     setSocket(s);

//     s.emit("init", { username: currentUser });

//     s.on("init", ({ users, chats, onlineList }) => {
//       setAllUsers(users || []);
//       setChatList(chats || []); // Isse refresh par history wapas aayegi
//       setOnlineUsers(onlineList || []);
//     });

//     s.on("update-online-users", (list) => {
//       setOnlineUsers(list);
//     });

//     s.on("receive-message", (msg) => {
//       // Jab naya message aaye, chatList ko update karo taaki Sidebar refresh ho
//       setChatList((prev) => {
//         const filtered = prev.filter(
//           (m) => {
//             const partnerPrev = m.senderId === currentUser ? m.receiverId : m.senderId;
//             const partnerNew = msg.senderId === currentUser ? msg.receiverId : msg.senderId;
//             return partnerPrev !== partnerNew;
//           }
//         );
//         return [msg, ...filtered];
//       });

//       // Agar user ussi chat room mein hai, to messages list mein bhi add karo
//       if (msg.roomId === [currentUser, otherUser].sort().join("_")) {
//         setMessages((prev) => [...prev, msg]);
//       }
//     });

//     return () => {
//       s.off("receive-message");
//       s.off("update-online-users");
//       s.off("init");
//       s.disconnect();
//     };
//   }, [currentUser, otherUser]); // otherUser dependancy zaroori hai sync ke liye

//   const handleLogout = async () => {
//     if (loggingOut) return;
//     setLoggingOut(true);
//     socket?.disconnect();
//     await fetch("/api/auth/logout", { method: "POST" });
//     toast.success("Logged out");
//     router.replace("/login");
//   };

//   return (
//     <div className="flex h-[800px] bg-gray-100">
//       <Sidebar
//         currentUser={currentUser}
//         otherUser={otherUser}
//         setOtherUser={setOtherUser}
//         chatList={chatList}
//         allUsers={allUsers}
//         onlineUsers={onlineUsers}
//         onLogout={handleLogout}
//         loggingOut={loggingOut}
//       />

//       <ChatWindow
//         currentUser={currentUser}
//         otherUser={otherUser}
//         messages={messages}
//         setMessages={setMessages}
//         socket={socket}
//       />
//     </div>
//   );
// }




// "use client";

// import { useEffect, useState, useCallback } from "react";
// import { useRouter } from "next/navigation";
// import { io, Socket } from "socket.io-client";
// import { toast } from "sonner";
// import Sidebar from "@/components/Sidebar";
// import ChatWindow from "@/components/ChatWindow";

// export default function ChatPage() {
//   const router = useRouter();
//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [currentUser, setCurrentUser] = useState("");
//   const [otherUser, setOtherUser] = useState<string | null>(null);
//   const [chatList, setChatList] = useState<any[]>([]);
//   const [allUsers, setAllUsers] = useState<string[]>([]);
//   const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
//   const [messages, setMessages] = useState<any[]>([]);
//   const [loggingOut, setLoggingOut] = useState(false);

//   // Auth check
//   useEffect(() => {
//     fetch("/api/auth/me", { credentials: "include" })
//       .then((res) => res.ok ? res.json() : Promise.reject())
//       .then((data) => setCurrentUser(data.user.username))
//       .catch(() => router.replace("/login"));
//   }, [router]);

//   // Socket initialization
//   useEffect(() => {
//     if (!currentUser) return;

//     const s = io(process.env.NEXT_PUBLIC_SOCKET_URL!, { withCredentials: true });
//     setSocket(s);

//     s.emit("init", { username: currentUser });

//     s.on("init", ({ users, chats, onlineList }) => {
//       setAllUsers(users || []);
//       setChatList(chats || []); // Refresh ke baad history yahan se aati hai
//       setOnlineUsers(onlineList || []);
//     });

//     s.on("update-online-users", (list) => setOnlineUsers(list));

//     // Handle incoming messages for Sidebar updates
//     const handleReceiveMessage = (msg: any) => {
//       setChatList((prev) => {
//         const filtered = prev.filter(m => {
//           const pPrev = m.senderId === currentUser ? m.receiverId : m.senderId;
//           const pNew = msg.senderId === currentUser ? msg.receiverId : msg.senderId;
//           return pPrev !== pNew;
//         });
//         return [msg, ...filtered];
//       });
//     };

//     s.on("receive-message", handleReceiveMessage);

//     return () => {
//       s.off("init");
//       s.off("update-online-users");
//       s.off("receive-message");
//       s.disconnect();
//     };
//   }, [currentUser]);

//   const handleLogout = async () => {
//     if (loggingOut) return;
//     setLoggingOut(true);
//     socket?.disconnect();
//     await fetch("/api/auth/logout", { method: "POST" });
//     toast.success("Logged out");
//     router.replace("/login");
//   };

//   return (
//     <div className="flex h-[800px] bg-gray-100 overflow-hidden">
//       <Sidebar
//         currentUser={currentUser}
//         otherUser={otherUser}
//         setOtherUser={setOtherUser}
//         chatList={chatList}
//         allUsers={allUsers}
//         onlineUsers={onlineUsers}
//         onLogout={handleLogout}
//         loggingOut={loggingOut}
//       />
//       <ChatWindow
//         currentUser={currentUser}
//         otherUser={otherUser}
//         messages={messages}
//         setMessages={setMessages}
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
// import ChatWindow from "@/components/ChatWindow";

// export default function ChatPage() {
//   const router = useRouter();
//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [currentUser, setCurrentUser] = useState("");
//   const [otherUser, setOtherUser] = useState<string | null>(null);
//   const [chatList, setChatList] = useState<any[]>([]);
//   const [allUsers, setAllUsers] = useState<string[]>([]);
//   const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
//   const [messages, setMessages] = useState<any[]>([]);
//   const [loggingOut, setLoggingOut] = useState(false);

//   // 1. Auth check and Restore Session
//   useEffect(() => {
//     fetch("/api/auth/me", { credentials: "include" })
//       .then((res) => res.ok ? res.json() : Promise.reject())
//       .then((data) => {
//         setCurrentUser(data.user.username);
//         // Restore last chatted user from localStorage on refresh
//         const savedUser = localStorage.getItem("last_chat_with");
//         if (savedUser) setOtherUser(savedUser);
//       })
//       .catch(() => router.replace("/login"));
//   }, [router]);

//   // Save otherUser to localStorage whenever it changes
//   useEffect(() => {
//     if (otherUser) {
//       localStorage.setItem("last_chat_with", otherUser);
//     }
//   }, [otherUser]);

//   // 2. Socket initialization
//   useEffect(() => {
//     if (!currentUser) return;

//     const s = io(process.env.NEXT_PUBLIC_SOCKET_URL!, { withCredentials: true });
//     setSocket(s);

//     s.emit("init", { username: currentUser });

//     s.on("init", ({ users, chats, onlineList }) => {
//       setAllUsers(users || []);
//       setChatList(chats || []);
//       setOnlineUsers(onlineList || []);
//     });

//     s.on("update-online-users", (list) => setOnlineUsers(list));

//     const handleReceiveMessage = (msg: any) => {
//       setChatList((prev) => {
//         const filtered = prev.filter(m => {
//           const pPrev = m.senderId === currentUser ? m.receiverId : m.senderId;
//           const pNew = msg.senderId === currentUser ? msg.receiverId : msg.senderId;
//           return pPrev !== pNew;
//         });
//         return [msg, ...filtered];
//       });
//     };

//     s.on("receive-message", handleReceiveMessage);

//     return () => {
//       s.off("init");
//       s.off("update-online-users");
//       s.off("receive-message");
//       s.disconnect();
//     };
//   }, [currentUser]);

//   const handleLogout = async () => {
//     if (loggingOut) return;
//     setLoggingOut(true);
//     localStorage.removeItem("last_chat_with"); // Clear session
//     socket?.disconnect();
//     await fetch("/api/auth/logout", { method: "POST" });
//     toast.success("Logged out");
//     router.replace("/login");
//   };

//   return (
//     <div className="flex h-[800px] bg-gray-100 overflow-hidden">
//       <Sidebar
//         currentUser={currentUser}
//         otherUser={otherUser}
//         setOtherUser={setOtherUser}
//         chatList={chatList}
//         allUsers={allUsers}
//         onlineUsers={onlineUsers}
//         onLogout={handleLogout}
//         loggingOut={loggingOut}
//       />
//       <ChatWindow
//         currentUser={currentUser}
//         otherUser={otherUser}
//         messages={messages}
//         setMessages={setMessages}
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
// import ChatWindow from "@/components/ChatWindow";

// export default function ChatPage() {
//   const router = useRouter();
//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [currentUser, setCurrentUser] = useState("");
//   const [otherUser, setOtherUser] = useState<string | null>(null);
//   const [chatList, setChatList] = useState<any[]>([]);
//   const [allUsers, setAllUsers] = useState<string[]>([]);
//   const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
//   const [messages, setMessages] = useState<any[]>([]);
//   const [loggingOut, setLoggingOut] = useState(false);

//   // 1. Auth check and Persistent Session Restore
//   useEffect(() => {
//     fetch("/api/auth/me", { credentials: "include" })
//       .then((res) => res.ok ? res.json() : Promise.reject())
//       .then((data) => {
//         setCurrentUser(data.user.username);
//         // REFRESH FIX: Restore the user you were chatting with
//         const savedUser = localStorage.getItem("active_chat");
//         if (savedUser) setOtherUser(savedUser);
//       })
//       .catch(() => router.replace("/login"));
//   }, [router]);

//   // 2. Socket initialization
//   useEffect(() => {
//     if (!currentUser) return;

//     const s = io(process.env.NEXT_PUBLIC_SOCKET_URL!, { withCredentials: true });
//     setSocket(s);

//     s.emit("init", { username: currentUser });

//     s.on("init", ({ users, chats, onlineList }) => {
//       setAllUsers(users || []);
//       setChatList(chats || []);
//       setOnlineUsers(onlineList || []);
//     });

//     s.on("update-online-users", (list) => setOnlineUsers(list));

//     const handleReceiveMessage = (msg: any) => {
//       // Update sidebar list for real-time preview
//       setChatList((prev) => {
//         const filtered = prev.filter(m => {
//           const pPrev = m.senderId === currentUser ? m.receiverId : m.senderId;
//           const pNew = msg.senderId === currentUser ? msg.receiverId : msg.senderId;
//           return pPrev !== pNew;
//         });
//         return [msg, ...filtered];
//       });
//     };

//     s.on("receive-message", handleReceiveMessage);

//     return () => {
//       s.off("init");
//       s.off("update-online-users");
//       s.off("receive-message");
//       s.disconnect();
//     };
//   }, [currentUser]);

//   // Handle switching users and saving to localStorage
//   const handleSetOtherUser = (user: string) => {
//     setOtherUser(user);
//     localStorage.setItem("active_chat", user);
//   };

//   const handleLogout = async () => {
//     if (loggingOut) return;
//     setLoggingOut(true);
//     localStorage.removeItem("active_chat");
//     socket?.disconnect();
//     await fetch("/api/auth/logout", { method: "POST" });
//     toast.success("Logged out");
//     router.replace("/login");
//   };

//   return (
//     <div className="flex h-[800px] bg-gray-100 overflow-hidden">
//       <Sidebar
//         currentUser={currentUser}
//         otherUser={otherUser}
//         setOtherUser={handleSetOtherUser}
//         chatList={chatList}
//         allUsers={allUsers}
//         onlineUsers={onlineUsers}
//         onLogout={handleLogout}
//         loggingOut={loggingOut}
//       />
//       <ChatWindow
//         currentUser={currentUser}
//         otherUser={otherUser}
//         messages={messages}
//         setMessages={setMessages}
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
// import ChatWindow from "@/components/ChatWindow";

// export default function ChatPage() {
//   const router = useRouter();
//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [currentUser, setCurrentUser] = useState("");
//   const [otherUser, setOtherUser] = useState<string | null>(null);
//   const [chatList, setChatList] = useState<any[]>([]);
//   const [allUsers, setAllUsers] = useState<string[]>([]);
//   const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
//   const [messages, setMessages] = useState<any[]>([]);
//   const [loggingOut, setLoggingOut] = useState(false);

//   // 1. Auth check and Restore Session on Refresh
//   useEffect(() => {
//     fetch("/api/auth/me", { credentials: "include" })
//       .then((res) => res.ok ? res.json() : Promise.reject())
//       .then((data) => {
//         setCurrentUser(data.user.username);

//         // ✅ FIX: Refresh ke baad purana selected user wapas lao
//         const savedUser = localStorage.getItem("selected_chat_partner");
//         if (savedUser) {
//           setOtherUser(savedUser);
//         }
//       })
//       .catch(() => router.replace("/login"));
//   }, [router]);

//   // 2. Socket initialization
//   useEffect(() => {
//     if (!currentUser) return;

//     const s = io(process.env.NEXT_PUBLIC_SOCKET_URL!, { withCredentials: true });
//     setSocket(s);

//     s.emit("init", { username: currentUser });

//     s.on("init", ({ users, chats, onlineList }) => {
//       setAllUsers(users || []);
//       setChatList(chats || []);
//       setOnlineUsers(onlineList || []);
//     });

//     s.on("update-online-users", (list) => setOnlineUsers(list));

//     const handleReceiveMessage = (msg: any) => {
//       setChatList((prev) => {
//         const filtered = prev.filter(m => {
//           const pPrev = m.senderId === currentUser ? m.receiverId : m.senderId;
//           const pNew = msg.senderId === currentUser ? msg.receiverId : msg.senderId;
//           return pPrev !== pNew;
//         });
//         return [msg, ...filtered];
//       });
//     };

//     s.on("receive-message", handleReceiveMessage);

//     return () => {
//       s.off("init");
//       s.off("update-online-users");
//       s.off("receive-message");
//       s.disconnect();
//     };
//   }, [currentUser]);

//   // ✅ Helper function to set user and save to storage
//   const handleSelectUser = (user: string) => {
//     setOtherUser(user);
//     localStorage.setItem("selected_chat_partner", user);
//   };

//   const handleLogout = async () => {
//     if (loggingOut) return;
//     setLoggingOut(true);
//     localStorage.removeItem("selected_chat_partner"); // Clear on logout
//     socket?.disconnect();
//     await fetch("/api/auth/logout", { method: "POST" });
//     toast.success("Logged out");
//     router.replace("/login");
//   };

//   return (
//     <div className="flex h-[800px] bg-gray-100 overflow-hidden">
//       <Sidebar
//         currentUser={currentUser}
//         otherUser={otherUser}
//         setOtherUser={handleSelectUser} // Updated this
//         chatList={chatList}
//         allUsers={allUsers}
//         onlineUsers={onlineUsers}
//         onLogout={handleLogout}
//         loggingOut={loggingOut}
//       />
//       <ChatWindow
//         currentUser={currentUser}
//         otherUser={otherUser}
//         messages={messages}
//         setMessages={setMessages}
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
// import ChatWindow from "@/components/ChatWindow";

// export default function ChatPage() {
//   const router = useRouter();
//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [currentUser, setCurrentUser] = useState("");
//   const [otherUser, setOtherUser] = useState<string | null>(null);
//   const [chatList, setChatList] = useState<any[]>([]);
//   const [allUsers, setAllUsers] = useState<string[]>([]);
//   const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
//   const [messages, setMessages] = useState<any[]>([]);
//   const [loggingOut, setLoggingOut] = useState(false);

//   // 1. Auth check aur session restore
//   useEffect(() => {
//     fetch("/api/auth/me", { credentials: "include" })
//       .then((res) => res.ok ? res.json() : Promise.reject())
//       .then((data) => {
//         setCurrentUser(data.user.username);
//         // Refresh Fix: Restore the active chat user
//         const savedUser = localStorage.getItem("active_chat_user");
//         if (savedUser) setOtherUser(savedUser);
//       })
//       .catch(() => router.replace("/login"));
//   }, [router]);

//   // 2. Socket initialization
//   useEffect(() => {
//     if (!currentUser) return;

//     const s = io(process.env.NEXT_PUBLIC_SOCKET_URL!, { withCredentials: true });
//     setSocket(s);

//     s.emit("init", { username: currentUser });

//     s.on("init", ({ users, chats, onlineList }) => {
//       setAllUsers(users || []);
//       setChatList(chats || []);
//       setOnlineUsers(onlineList || []);
//     });

//     s.on("update-online-users", (list) => setOnlineUsers(list));

//     s.on("receive-message", (msg) => {
//       setChatList((prev) => {
//         const filtered = prev.filter(m => {
//           const pPrev = m.senderId === currentUser ? m.receiverId : m.senderId;
//           const pNew = msg.senderId === currentUser ? msg.receiverId : msg.senderId;
//           return pPrev !== pNew;
//         });
//         return [msg, ...filtered];
//       });
//     });

//     return () => {
//       s.off("init");
//       s.off("update-online-users");
//       s.off("receive-message");
//       s.disconnect();
//     };
//   }, [currentUser]);

//   // Handle user selection correctly
//   const handleUserSelect = (username: string) => {
//     setOtherUser(username);
//     localStorage.setItem("active_chat_user", username);
//   };

//   const handleLogout = async () => {
//     if (loggingOut) return;
//     setLoggingOut(true);
//     localStorage.removeItem("active_chat_user");
//     socket?.disconnect();
//     await fetch("/api/auth/logout", { method: "POST" });
//     toast.success("Logged out");
//     router.replace("/login");
//   };

//   return (
//     <div className="flex h-[800px] bg-gray-100 overflow-hidden">
//       <Sidebar
//         currentUser={currentUser}
//         otherUser={otherUser}
//         setOtherUser={handleUserSelect}
//         chatList={chatList}
//         allUsers={allUsers}
//         onlineUsers={onlineUsers}
//         onLogout={handleLogout}
//         loggingOut={loggingOut}
//       />
//       <ChatWindow
//         currentUser={currentUser}
//         otherUser={otherUser}
//         messages={messages}
//         setMessages={setMessages}
//         socket={socket}
//       />
//     </div>
//   );
// }








// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { io, Socket } from "socket.io-client";
// import Sidebar from "@/components/Sidebar";
// import ChatWindow from "@/components/ChatWindow";

// export default function ChatPage() {
//   const router = useRouter();
//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [currentUser, setCurrentUser] = useState("");
//   const [otherUser, setOtherUser] = useState<string | null>(null);
//   const [chatList, setChatList] = useState<any[]>([]);
//   const [allUsers, setAllUsers] = useState<string[]>([]);
//   const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
//   const [messages, setMessages] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   // 1. Authenticate and Restore Session
//   useEffect(() => {
//     const initAuth = async () => {
//       try {
//         const res = await fetch("/api/auth/me", { credentials: "include" });
//         if (res.ok) {
//           const data = await res.json();
//           setCurrentUser(data.user.username);

//           // Refresh ke baad active chat restore karo
//           const savedChat = localStorage.getItem("last_active_chat");
//           if (savedChat) setOtherUser(savedChat);
//         } else {
//           router.replace("/login");
//         }
//       } catch (err) {
//         router.replace("/login");
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     initAuth();
//   }, [router]);

//   // 2. Socket Connection (Only after Auth)
//   useEffect(() => {
//     if (!currentUser) return;

//     const s = io(process.env.NEXT_PUBLIC_SOCKET_URL!, { withCredentials: true });
//     setSocket(s);

//     s.on("connect", () => {
//       s.emit("init", { username: currentUser });
//     });

//     s.on("init", ({ users, chats, onlineList }) => {
//       // ✅ Sidebar Logic: Khud ko list se bahar rakhne ka logic idhar bhi sync hoga
//       setAllUsers(users || []);
//       setChatList(chats || []);
//       setOnlineUsers(onlineList || []);
//     });

//     // Real-time message receiver for Sidebar Updates
//     s.on("receive-message", (msg) => {
//       setChatList((prev) => {
//         const filtered = prev.filter(m => {
//           const pPrev = m.senderId === currentUser ? m.receiverId : m.senderId;
//           const pNew = msg.senderId === currentUser ? msg.receiverId : msg.senderId;
//           return pPrev !== pNew;
//         });
//         return [msg, ...filtered];
//       });
//     });

//     return () => { s.disconnect(); };
//   }, [currentUser]);

//   const handleSetOtherUser = (user: string) => {
//     setOtherUser(user);
//     localStorage.setItem("last_active_chat", user);
//   };

//   // Jab tak data load ho raha hai, blank page ke bajaye spinner dikhao
//   if (isLoading) return (
//     <div className="h-screen flex items-center justify-center bg-white text-blue-600 font-bold">
//       Loading Chats...
//     </div>
//   );

//   const handleLogout = async () => {
//     if (loggingOut) return;
//     setLoggingOut(true);
//     localStorage.removeItem("active_chat_user");
//     socket?.disconnect();
//     await fetch("/api/auth/logout", { method: "POST" });
//     toast.success("Logged out");
//     router.replace("/login");
//   };

//   return (
//     <div className="flex h-screen bg-gray-100 overflow-hidden">
//       <Sidebar
//         currentUser={currentUser}
//         otherUser={otherUser}
//         setOtherUser={handleSetOtherUser}
//         chatList={chatList}
//         allUsers={allUsers}
//         onlineUsers={onlineUsers}
//       />
//       <ChatWindow
//         currentUser={currentUser}
//         otherUser={otherUser}
//         messages={messages}
//         setMessages={setMessages}
//         socket={socket}
//       />
//     </div>
//   );
// }






// "use client";

// import { useEffect, useState, useCallback } from "react";
// import { useRouter } from "next/navigation";
// import { io, Socket } from "socket.io-client";
// import Sidebar from "@/components/Sidebar";
// import ChatWindow from "@/components/ChatWindow";

// export default function ChatPage() {
//   const router = useRouter();
//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [currentUser, setCurrentUser] = useState("");
//   const [otherUser, setOtherUser] = useState<string | null>(null);
//   const [chatList, setChatList] = useState<any[]>([]);
//   const [allUsers, setAllUsers] = useState<string[]>([]);
//   const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
//   const [messages, setMessages] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   // 1. Authenticate & Restore Session
//   useEffect(() => {
//     const initApp = async () => {
//       try {
//         const res = await fetch("/api/auth/me", { credentials: "include" });
//         if (!res.ok) throw new Error("Unauthorized");
//         const data = await res.json();
//         setCurrentUser(data.user.username);

//         // Memory se last chat restore karein
//         const savedChat = localStorage.getItem("active_chat");
//         if (savedChat) setOtherUser(savedChat);
//       } catch (err) {
//         router.replace("/login");
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     initApp();
//   }, [router]);

//   // 2. Socket Connection Logic
//   useEffect(() => {
//     if (!currentUser) return;

//     const s = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
//       withCredentials: true,
//       reconnection: true
//     });
//     setSocket(s);

//     s.on("connect", () => {
//       s.emit("init", { username: currentUser });
//     });

//     s.on("init", ({ users, chats, onlineList }) => {
//       setAllUsers(users || []);
//       setChatList(chats || []);
//       setOnlineUsers(onlineList || []);
//     });

//     s.on("update-online-users", (list) => setOnlineUsers(list));

//     s.on("receive-message", (msg) => {
//       // Sidebar preview update logic
//       setChatList((prev) => {
//         const partnerId = msg.senderId === currentUser ? msg.receiverId : msg.senderId;
//         const filtered = prev.filter(m => {
//           const mPartner = m.senderId === currentUser ? m.receiverId : m.senderId;
//           return mPartner !== partnerId;
//         });
//         return [msg, ...filtered];
//       });
//     });

//     return () => { s.disconnect(); };
//   }, [currentUser]);

//   const handleSelectUser = (username: string) => {
//     setOtherUser(username);
//     localStorage.setItem("active_chat", username);
//   };

//   if (isLoading) return (
//     <div className="h-screen flex items-center justify-center bg-white font-semibold text-blue-600">
//       Initializing Chat...
//     </div>
//   );

//   return (
//     <div className="flex h-screen bg-gray-50 overflow-hidden">
//       <Sidebar
//         currentUser={currentUser}
//         otherUser={otherUser}
//         setOtherUser={handleSelectUser}
//         chatList={chatList}
//         allUsers={allUsers}
//         onlineUsers={onlineUsers}
//       />
//       <ChatWindow
//         currentUser={currentUser}
//         otherUser={otherUser}
//         messages={messages}
//         setMessages={setMessages}
//         socket={socket}
//       />
//     </div>
//   );
// }






// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { io, Socket } from "socket.io-client";
// import Sidebar from "@/components/Sidebar";
// import ChatWindow from "@/components/ChatWindow";

// export default function ChatPage() {
//   const router = useRouter();
//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [currentUser, setCurrentUser] = useState("");
//   const [otherUser, setOtherUser] = useState<string | null>(null);
//   const [chatList, setChatList] = useState<any[]>([]);
//   const [allUsers, setAllUsers] = useState<string[]>([]);
//   const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
//   const [messages, setMessages] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   // 1. Authenticate & Restore Active Chat
//   useEffect(() => {
//     const initApp = async () => {
//       try {
//         const res = await fetch("/api/auth/me", { credentials: "include" });
//         if (!res.ok) throw new Error("Unauthorized");
//         const data = await res.json();
//         setCurrentUser(data.user.username);

//         // Refresh par purana user yaad rakhega
//         const savedChat = localStorage.getItem("active_chat");
//         if (savedChat) setOtherUser(savedChat);
//       } catch (err) {
//         router.replace("/login");
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     initApp();
//   }, [router]);

//   // 2. Socket Setup
//   useEffect(() => {
//     if (!currentUser) return;

//     const s = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
//       withCredentials: true,
//       reconnection: true
//     });
//     setSocket(s);

//     s.on("connect", () => {
//       s.emit("init", { username: currentUser });
//     });

//     s.on("init", ({ users, chats, onlineList }) => {
//       setAllUsers(users || []);
//       setChatList(chats || []);
//       setOnlineUsers(onlineList || []);
//     });

//     s.on("update-online-users", (list) => setOnlineUsers(list));

//     s.on("receive-message", (msg) => {
//       setChatList((prev) => {
//         const partnerId = msg.senderId === currentUser ? msg.receiverId : msg.senderId;
//         const filtered = prev.filter(m => {
//           const mPartner = m.senderId === currentUser ? m.receiverId : m.senderId;
//           return mPartner !== partnerId;
//         });
//         return [msg, ...filtered];
//       });
//     });

//     return () => { s.disconnect(); };
//   }, [currentUser]);

//   const handleSelectUser = (username: string) => {
//     setOtherUser(username);
//     localStorage.setItem("active_chat", username);
//   };

//   const handleLogout = async () => {
//     localStorage.removeItem("active_chat");
//     if (socket) socket.disconnect();
//     await fetch("/api/auth/logout", { method: "POST" });
//     router.replace("/login");
//   };

//   if (isLoading) return (
//     <div className="h-screen flex items-center justify-center bg-white font-bold text-blue-600">
//       Loading LiveChat...
//     </div>
//   );

//   return (
//     <div className="flex h-screen bg-gray-50 overflow-hidden">
//       <Sidebar
//         currentUser={currentUser}
//         otherUser={otherUser}
//         setOtherUser={handleSelectUser}
//         chatList={chatList}
//         allUsers={allUsers}
//         onlineUsers={onlineUsers}
//         onLogout={handleLogout}
//       />
//       <ChatWindow
//         currentUser={currentUser}
//         otherUser={otherUser}
//         messages={messages}
//         setMessages={setMessages}
//         socket={socket}
//       />
//     </div>
//   );
// }





// "use client";

// import { useEffect, useState, useCallback } from "react";
// import { useRouter } from "next/navigation";
// import { io, Socket } from "socket.io-client";
// import Sidebar from "@/components/Sidebar";
// import ChatWindow from "@/components/ChatWindow";

// export default function ChatPage() {
//   const router = useRouter();
//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [currentUser, setCurrentUser] = useState("");
//   const [otherUser, setOtherUser] = useState<string | null>(null);
//   const [chatList, setChatList] = useState<any[]>([]);
//   const [allUsers, setAllUsers] = useState<string[]>([]);
//   const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
//   const [messages, setMessages] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   // 1. Auth & Session Restore
//   useEffect(() => {
//     const fetchAuth = async () => {
//       try {
//         const res = await fetch("/api/auth/me", { credentials: "include" });
//         if (!res.ok) throw new Error();
//         const data = await res.json();
//         setCurrentUser(data.user.username);

//         // Memory restore
//         const saved = localStorage.getItem("active_chat");
//         if (saved) setOtherUser(saved);
//       } catch {
//         router.replace("/login");
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchAuth();
//   }, [router]);

//   // 2. Socket Connection
//   useEffect(() => {
//     if (!currentUser) return;

//     const s = io(process.env.NEXT_PUBLIC_SOCKET_URL!, { withCredentials: true });
//     setSocket(s);

//     s.on("connect", () => {
//       s.emit("init", { username: currentUser });
//     });

//     s.on("init", ({ users, chats, onlineList }) => {
//       setAllUsers(users || []);
//       setChatList(chats || []);
//       setOnlineUsers(onlineList || []);
//     });

//     s.on("update-online-users", (list) => setOnlineUsers(list));

//     s.on("receive-message", (msg) => {
//       setChatList((prev) => {
//         const partnerId = msg.senderId === currentUser ? msg.receiverId : msg.senderId;
//         return [msg, ...prev.filter(m => (m.senderId === currentUser ? m.receiverId : m.senderId) !== partnerId)];
//       });
//     });

//     return () => { s.disconnect(); };
//   }, [currentUser]);

//   const handleSelect = (user: string) => {
//     setOtherUser(user);
//     localStorage.setItem("active_chat", user);
//   };

//   const handleLogout = async () => {
//     localStorage.removeItem("active_chat");
//     await fetch("/api/auth/logout", { method: "POST" });
//     router.replace("/login");
//   };

//   if (isLoading) return <div className="h-screen flex items-center justify-center bg-white font-black text-blue-600 animate-pulse">LIVECHAT SYSTEM INITIALIZING...</div>;

//   return (
//     <div className="flex h-[700px] bg-gray-100 overflow-hidden font-sans">
//       <Sidebar
//         currentUser={currentUser}
//         otherUser={otherUser}
//         setOtherUser={handleSelect}
//         chatList={chatList}
//         allUsers={allUsers}
//         onlineUsers={onlineUsers}
//         onLogout={handleLogout}
//       />
//       <ChatWindow
//         currentUser={currentUser}
//         otherUser={otherUser}
//         messages={messages}
//         setMessages={setMessages}
//         socket={socket}
//       />
//     </div>
//   );
// }








// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { io, Socket } from "socket.io-client";
// import Sidebar from "@/components/Sidebar";
// import ChatWindow from "@/components/ChatWindow";

// export default function ChatPage() {
//   const router = useRouter();
//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [currentUser, setCurrentUser] = useState("");
//   const [otherUser, setOtherUser] = useState<string | null>(null);
//   const [chatList, setChatList] = useState<any[]>([]);
//   const [allUsers, setAllUsers] = useState<string[]>([]);
//   const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
//   const [messages, setMessages] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const initApp = async () => {
//       try {
//         const res = await fetch("/api/auth/me", { credentials: "include" });
//         if (!res.ok) throw new Error("Unauthorized");
//         const data = await res.json();

//         // 1. Pehle user set karein
//         setCurrentUser(data.user.username);

//         // 2. Turant baad saved chat restore karein
//         const savedChat = localStorage.getItem("active_chat");
//         if (savedChat) {
//           console.log("Restoring chat with:", savedChat);
//           setOtherUser(savedChat);
//         }
//       } catch (err) {
//         router.replace("/login");
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     initApp();
//   }, [router]);

//   useEffect(() => {
//     if (!currentUser) return;

//     const s = io(process.env.NEXT_PUBLIC_SOCKET_URL!, { withCredentials: true });
//     setSocket(s);

//     s.on("connect", () => {
//       s.emit("init", { username: currentUser });
//     });

//     s.on("init", ({ users, chats, onlineList }) => {
//       setAllUsers(users || []);
//       setChatList(chats || []);
//       setOnlineUsers(onlineList || []);
//     });

//     s.on("update-online-users", (list) => setOnlineUsers(list));

//     s.on("receive-message", (msg) => {
//       // Sidebar update logic
//       setChatList((prev) => {
//         const partnerId = msg.senderId === currentUser ? msg.receiverId : msg.senderId;
//         const filtered = prev.filter(m => (m.senderId === currentUser ? m.receiverId : m.senderId) !== partnerId);
//         return [msg, ...filtered];
//       });
//     });

//     return () => { s.disconnect(); };
//   }, [currentUser]);

//   const handleSelectUser = (username: string) => {
//     setOtherUser(username);
//     localStorage.setItem("active_chat", username);
//   };

//   const handleLogout = async () => {
//     localStorage.removeItem("active_chat");
//     if (socket) socket.disconnect();
//     await fetch("/api/auth/logout", { method: "POST" });
//     router.replace("/login");
//   };

//   if (isLoading) return <div className="h-screen flex items-center justify-center font-bold text-blue-600">Syncing Conversations...</div>;

//   return (
//     <div className="flex h-screen bg-white overflow-hidden">
//       <Sidebar
//         currentUser={currentUser}
//         otherUser={otherUser}
//         setOtherUser={handleSelectUser}
//         chatList={chatList}
//         allUsers={allUsers}
//         onlineUsers={onlineUsers}
//         onLogout={handleLogout}
//       />
//       {/* 3. Ensure ChatWindow gets the latest otherUser state */}
//       <ChatWindow
//         currentUser={currentUser}
//         otherUser={otherUser}
//         messages={messages}
//         setMessages={setMessages}
//         socket={socket}
//       />
//     </div>
//   );
// }







// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { io, Socket } from "socket.io-client";
// import Sidebar from "@/components/Sidebar";
// import ChatWindow from "@/components/ChatWindow";

// export default function ChatPage() {
//   const router = useRouter();
//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [currentUser, setCurrentUser] = useState("");
//   const [otherUser, setOtherUser] = useState<string | null>(null);
//   const [chatList, setChatList] = useState<any[]>([]);
//   const [allUsers, setAllUsers] = useState<string[]>([]);
//   const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
//   const [messages, setMessages] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const initApp = async () => {
//       try {
//         // Added cache: 'no-store' to ensure we get fresh data on refresh
//         const res = await fetch("/api/auth/me", {
//           credentials: "include",
//           cache: 'no-store'
//         });
//         if (!res.ok) throw new Error("Unauthorized");
//         const data = await res.json();

//         if (data.user && data.user.username) {
//           setCurrentUser(data.user.username);

//           const savedChat = localStorage.getItem("active_chat");
//           if (savedChat) {
//             setOtherUser(savedChat);
//           }
//         }
//       } catch (err) {
//         router.replace("/login");
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     initApp();
//   }, [router]);

//   useEffect(() => {
//     if (!currentUser) return;

//     const s = io(process.env.NEXT_PUBLIC_SOCKET_URL!, { withCredentials: true });
//     setSocket(s);

//     s.on("connect", () => {
//       s.emit("init", { username: currentUser });
//     });

//     s.on("init", ({ users, chats, onlineList }) => {
//       setAllUsers(users || []);
//       setChatList(chats || []);
//       setOnlineUsers(onlineList || []);
//     });

//     s.on("update-online-users", (list) => setOnlineUsers(list));

//     s.on("receive-message", (msg) => {
//       setChatList((prev) => {
//         const partnerId = msg.senderId === currentUser ? msg.receiverId : msg.senderId;
//         const filtered = prev.filter(m => (m.senderId === currentUser ? m.receiverId : m.senderId) !== partnerId);
//         return [msg, ...filtered];
//       });
//     });

//     return () => { s.disconnect(); };
//   }, [currentUser]);

//   const handleSelectUser = (username: string) => {
//     setOtherUser(username);
//     localStorage.setItem("active_chat", username);
//   };

//   const handleLogout = async () => {
//     localStorage.removeItem("active_chat");
//     if (socket) socket.disconnect();
//     await fetch("/api/auth/logout", { method: "POST" });
//     router.replace("/login");
//   };

//   if (isLoading) return (
//     <div className="h-screen flex items-center justify-center bg-gray-50">
//       <div className="flex flex-col items-center gap-3">
//         <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
//         <p className="font-bold text-blue-600 animate-pulse">Setting up your secure chat...</p>
//       </div>
//     </div>
//   );

//   return (
//     <div className="flex h-[700px] bg-white overflow-hidden">
//       <Sidebar
//         currentUser={currentUser}
//         otherUser={otherUser}
//         setOtherUser={handleSelectUser}
//         chatList={chatList}
//         allUsers={allUsers}
//         onlineUsers={onlineUsers}
//         onLogout={handleLogout}
//       />
//       <ChatWindow
//         currentUser={currentUser}
//         otherUser={otherUser}
//         messages={messages}
//         setMessages={setMessages}
//         socket={socket}
//       />
//     </div>
//   );
// }









// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { io, Socket } from "socket.io-client";
// import Sidebar from "@/components/Sidebar";
// import ChatWindow from "@/components/ChatWindow";

// export default function ChatPage() {
//   const router = useRouter();
//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [currentUser, setCurrentUser] = useState("");
//   const [otherUser, setOtherUser] = useState<string | null>(null);
//   const [chatList, setChatList] = useState<any[]>([]);
//   const [allUsers, setAllUsers] = useState<string[]>([]);
//   const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
//   const [messages, setMessages] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const initApp = async () => {
//       try {
//         const res = await fetch("/api/auth/me", {
//           credentials: "include",
//           cache: 'no-store'
//         });
//         if (!res.ok) throw new Error("Unauthorized");
//         const data = await res.json();

//         if (data.user && data.user.username) {
//           setCurrentUser(data.user.username);

//           const savedChat = localStorage.getItem("active_chat");
//           if (savedChat) {
//             setOtherUser(savedChat);
//           }
//         }
//       } catch (err) {
//         router.replace("/login");
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     initApp();
//   }, [router]);

//   useEffect(() => {
//     if (!currentUser) return;

//     const s = io(process.env.NEXT_PUBLIC_SOCKET_URL!, { withCredentials: true });
//     setSocket(s);

//     s.on("connect", () => {
//       s.emit("init", { username: currentUser });
//     });

//     s.on("init", ({ users, chats, onlineList }) => {
//       setAllUsers(users || []);
//       setChatList(chats || []);
//       setOnlineUsers(onlineList || []);
//     });

//     s.on("update-online-users", (list) => setOnlineUsers(list));

//     s.on("receive-message", (msg) => {
//       // ✅ LOGIC: Update the sidebar chat list in real-time
//       setChatList((prev) => {
//         // Find if we already have a chat item for this partner
//         const partnerId = msg.senderId === currentUser ? msg.receiverId : msg.senderId;
//         // Filter out the old message from this partner and put the new one at the top
//         const filtered = prev.filter(m => {
//           const mPartner = m.senderId === currentUser ? m.receiverId : m.senderId;
//           return mPartner !== partnerId;
//         });
//         return [msg, ...filtered];
//       });
//     });

//     return () => { s.disconnect(); };
//   }, [currentUser]);

//   const handleSelectUser = (username: string) => {
//     setOtherUser(username);
//     localStorage.setItem("active_chat", username);
//   };

//   const handleLogout = async () => {
//     localStorage.removeItem("active_chat");
//     if (socket) socket.disconnect();
//     await fetch("/api/auth/logout", { method: "POST" });
//     router.replace("/login");
//   };

//   if (isLoading) return (
//     <div className="h-screen flex items-center justify-center bg-gray-50">
//       <div className="flex flex-col items-center gap-3">
//         <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
//         <p className="font-bold text-blue-600 animate-pulse">Setting up your secure chat...</p>
//       </div>
//     </div>
//   );

//   return (
//     <div className="flex h-[700px] bg-white overflow-hidden">
//       <Sidebar
//         currentUser={currentUser}
//         otherUser={otherUser}
//         setOtherUser={handleSelectUser}
//         chatList={chatList}
//         allUsers={allUsers}
//         onlineUsers={onlineUsers}
//         onLogout={handleLogout}
//       />
//       <ChatWindow
//         currentUser={currentUser}
//         otherUser={otherUser}
//         messages={messages}
//         setMessages={setMessages}
//         socket={socket}
//       />
//     </div>
//   );
// }








// "use client";

// import { useEffect, useState, useCallback } from "react";
// import { useRouter } from "next/navigation";
// import { io, Socket } from "socket.io-client";
// import Sidebar from "@/components/Sidebar";
// import ChatWindow from "@/components/ChatWindow";

// export default function ChatPage() {
//   const router = useRouter();
//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [currentUser, setCurrentUser] = useState("");
//   const [otherUser, setOtherUser] = useState<string | null>(null);
//   const [chatList, setChatList] = useState<any[]>([]);
//   const [allUsers, setAllUsers] = useState<string[]>([]);
//   const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
//   const [messages, setMessages] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   // 1. Auth & Initial User Setup
//   useEffect(() => {
//     const initApp = async () => {
//       try {
//         const res = await fetch("/api/auth/me", {
//           credentials: "include",
//           cache: 'no-store'
//         });

//         if (!res.ok) throw new Error("Unauthorized");
//         const data = await res.json();

//         if (data.user && data.user.username) {
//           setCurrentUser(data.user.username);

//           // Refresh ke baad purana chat partner wapis set karein
//           const savedChat = localStorage.getItem("active_chat");
//           if (savedChat) {
//             setOtherUser(savedChat);
//           }
//         } else {
//           router.replace("/login");
//         }
//       } catch (err) {
//         console.error("Auth Error:", err);
//         router.replace("/login");
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     initApp();
//   }, [router]);

//   // 2. Socket Connection & Event Listeners
//   useEffect(() => {
//     if (!currentUser) return;

//     // Socket initialize
//     const s = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001", {
//       withCredentials: true
//     });
//     setSocket(s);

//     s.on("connect", () => {
//       console.log("Connected to server");
//       s.emit("init", { username: currentUser });
//     });

//     // Jab server se initial data aaye (Refresh fix point)
//     s.on("init", ({ users, chats, onlineList }) => {
//       setAllUsers(users || []);
//       setChatList(chats || []); // Isse Sidebar ki Recent list banti hai
//       setOnlineUsers(onlineList || []);
//     });

//     s.on("update-online-users", (list) => {
//       setOnlineUsers(list);
//     });

//     s.on("receive-message", (msg) => {
//       // Sidebar update logic
//       setChatList((prev) => {
//         const partnerId = msg.senderId === currentUser ? msg.receiverId : msg.senderId;
//         const filtered = prev.filter(m => {
//           const mPartner = m.senderId === currentUser ? m.receiverId : m.senderId;
//           return mPartner !== partnerId;
//         });
//         return [msg, ...filtered];
//       });
//     });

//     return () => {
//       s.disconnect();
//     };
//   }, [currentUser]);

//   const handleSelectUser = (username: string) => {
//     setOtherUser(username);
//     localStorage.setItem("active_chat", username);
//   };

//   const handleLogout = async () => {
//     localStorage.removeItem("active_chat");
//     if (socket) socket.disconnect();
//     await fetch("/api/auth/logout", { method: "POST" });
//     router.replace("/login");
//   };

//   if (isLoading) return (
//     <div className="h-screen flex items-center justify-center bg-gray-50">
//       <div className="flex flex-col items-center gap-3">
//         <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
//         <p className="font-bold text-blue-600 animate-pulse text-sm uppercase tracking-widest">Initializing...</p>
//       </div>
//     </div>
//   );

//   return (
//     <div className="flex h-screen bg-white overflow-hidden max-w-[1600px] mx-auto shadow-2xl border-x">
//       <Sidebar
//         currentUser={currentUser}
//         otherUser={otherUser}
//         setOtherUser={handleSelectUser}
//         chatList={chatList}
//         allUsers={allUsers}
//         onlineUsers={onlineUsers}
//         onLogout={handleLogout}
//       />
//       <ChatWindow
//         currentUser={currentUser}
//         otherUser={otherUser}
//         messages={messages}
//         setMessages={setMessages}
//         socket={socket}
//       />
//     </div>
//   );
// }









// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { io, Socket } from "socket.io-client";
// import Sidebar from "@/components/Sidebar";
// import ChatWindow from "@/components/ChatWindow";

// export default function ChatPage() {
//   const router = useRouter();
//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [currentUser, setCurrentUser] = useState("");
//   const [otherUser, setOtherUser] = useState<string | null>(null);
//   const [chatList, setChatList] = useState<any[]>([]);
//   const [allUsers, setAllUsers] = useState<string[]>([]);
//   const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
//   const [messages, setMessages] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   // 1. Fetch Current User on Page Load
//   useEffect(() => {
//     const fetchMe = async () => {
//       try {
//         const res = await fetch("/api/auth/me", {
//           credentials: "include",
//           cache: 'no-store'
//         });

//         if (!res.ok) throw new Error("Unauthorized");
//         const data = await res.json();

//         if (data.user && data.user.username) {
//           setCurrentUser(data.user.username);
//           // Restore last chat from local storage
//           const saved = localStorage.getItem("active_chat");
//           if (saved) setOtherUser(saved);
//         }
//       } catch (err) {
//         router.replace("/login");
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchMe();
//   }, [router]);

//   // 2. Initialize Socket and Listen for Events
//   useEffect(() => {
//     if (!currentUser) return;

//     const s = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001", {
//       withCredentials: true
//     });
//     setSocket(s);

//     s.on("connect", () => {
//       console.log("✅ Socket Connected");
//       s.emit("init", { username: currentUser });
//     });

//     s.on("init", ({ users, chats, onlineList }) => {
//       console.log("📊 History Received:", chats.length, "messages");
//       setAllUsers(users || []);
//       setChatList(chats || []); // Restore Sidebar History
//       setOnlineUsers(onlineList || []);
//     });

//     s.on("update-online-users", (list) => {
//       setOnlineUsers(list);
//     });

//     s.on("receive-message", (msg) => {
//       // Sidebar update: Latest message moves to top
//       setChatList((prev) => {
//         const partner = msg.senderId === currentUser ? msg.receiverId : msg.senderId;
//         const filtered = prev.filter(m =>
//           (m.senderId === currentUser ? m.receiverId : m.senderId) !== partner
//         );
//         return [msg, ...filtered];
//       });
//     });

//     return () => {
//       s.disconnect();
//     };
//   }, [currentUser]);

//   const handleSelectUser = (username: string) => {
//     setOtherUser(username);
//     localStorage.setItem("active_chat", username);
//   };

//   const handleLogout = async () => {
//     localStorage.removeItem("active_chat");
//     if (socket) socket.disconnect();
//     await fetch("/api/auth/logout", { method: "POST" });
//     router.replace("/login");
//   };

//   if (isLoading) return (
//     <div className="h-screen flex items-center justify-center bg-gray-50 font-sans">
//       <div className="text-center">
//         <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//         <p className="text-gray-500 font-bold animate-pulse uppercase tracking-widest text-xs">Authenticating...</p>
//       </div>
//     </div>
//   );

//   return (
//     <div className="flex h-[700px] bg-white overflow-hidden shadow-2xl">
//       <Sidebar
//         currentUser={currentUser}
//         otherUser={otherUser}
//         setOtherUser={handleSelectUser}
//         chatList={chatList}
//         allUsers={allUsers}
//         onlineUsers={onlineUsers}
//         onLogout={handleLogout}
//       />
//       <ChatWindow
//         currentUser={currentUser}
//         otherUser={otherUser}
//         messages={messages}
//         setMessages={setMessages}
//         socket={socket}
//       />
//     </div>
//   );
// }







// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { io, Socket } from "socket.io-client";
// import Sidebar from "@/components/Sidebar";
// import ChatWindow from "@/components/ChatWindow";

// export default function ChatPage() {
//   const router = useRouter();

//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [currentUser, setCurrentUser] = useState("");
//   const [otherUser, setOtherUser] = useState<string | null>(null);

//   const [chatList, setChatList] = useState<any[]>([]);
//   const [allUsers, setAllUsers] = useState<string[]>([]);
//   const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
//   const [messages, setMessages] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   // 🔐 AUTH CHECK
//   useEffect(() => {
//     const fetchMe = async () => {
//       try {
//         const res = await fetch("/api/auth/me", {
//           credentials: "include",
//           cache: "no-store",
//         });

//         if (!res.ok) throw new Error("Unauthorized");

//         const data = await res.json();
//         setCurrentUser(data.user.username);

//         const saved = localStorage.getItem("active_chat");
//         if (saved) setOtherUser(saved);
//       } catch {
//         router.replace("/login");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchMe();
//   }, [router]);

//   // 📥 LOAD RECENT CHATS (DB)
//   useEffect(() => {
//     if (!currentUser) return;

//     const loadRecentChats = async () => {
//       const res = await fetch(`/api/chats/recent?user=${currentUser}`);
//       const data = await res.json();
//       setChatList(Array.isArray(data) ? data : []);
//     };

//     loadRecentChats();
//   }, [currentUser]);

//   // 📥 LOAD ALL USERS (DISCOVER)
//   useEffect(() => {
//     const loadUsers = async () => {
//       const res = await fetch("/api/users");
//       const data = await res.json();
//       setAllUsers(data || []);
//     };

//     loadUsers();
//   }, []);

//   // 🔌 SOCKET CONNECTION
//   useEffect(() => {
//     if (!currentUser) return;

//     const s = io(
//       process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001",
//       { withCredentials: true }
//     );

//     setSocket(s);

//     s.on("connect", () => {
//       s.emit("init", { username: currentUser });
//     });

//     s.on("update-online-users", (list) => {
//       setOnlineUsers(list || []);
//     });

//     s.on("receive-message", (msg) => {
//       setChatList((prev) => {
//         const partner =
//           msg.senderId === currentUser ? msg.receiverId : msg.senderId;

//         const filtered = prev.filter((m) => {
//           const p =
//             m.senderId === currentUser ? m.receiverId : m.senderId;
//           return p !== partner;
//         });

//         return [msg, ...filtered];
//       });
//     });

//     return () => {
//       s.disconnect();
//     };
//   }, [currentUser]);

//   const handleSelectUser = (user: string) => {
//     setOtherUser(user);
//     localStorage.setItem("active_chat", user);
//   };

//   const handleLogout = async () => {
//     localStorage.removeItem("active_chat");
//     socket?.disconnect();
//     await fetch("/api/auth/logout", { method: "POST" });
//     router.replace("/login");
//   };

//   if (isLoading) {
//     return (
//       <div className="h-screen flex items-center justify-center">
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <div className="flex h-[700px]">
//       <Sidebar
//         currentUser={currentUser}
//         otherUser={otherUser}
//         setOtherUser={handleSelectUser}
//         chatList={chatList}
//         allUsers={allUsers}
//         onlineUsers={onlineUsers}
//         onLogout={handleLogout}
//       />

//       <ChatWindow
//         currentUser={currentUser}
//         otherUser={otherUser}
//         messages={messages}
//         setMessages={setMessages}
//         socket={socket}
//       />
//     </div>
//   );
// }






"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { io, Socket } from "socket.io-client";
import Sidebar from "@/components/Sidebar";
import ChatWindow from "@/components/ChatWindow";

export default function ChatPage() {
  const router = useRouter();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [currentUser, setCurrentUser] = useState("");
  const [otherUser, setOtherUser] = useState<string | null>(null);
  const [chatList, setChatList] = useState<any[]>([]);
  const [allUsers, setAllUsers] = useState<string[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Authenticate and set user
  useEffect(() => {
    const initApp = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include",
          cache: 'no-store'
        });
        if (!res.ok) throw new Error("Unauthorized");
        const data = await res.json();

        if (data.user && data.user.username) {
          setCurrentUser(data.user.username);
          const savedChat = localStorage.getItem("active_chat");
          if (savedChat) setOtherUser(savedChat);
        }
      } catch (err) {
        router.replace("/login");
      } finally {
        setIsLoading(false);
      }
    };
    initApp();
  }, [router]);

  // 2. Socket Connection
  useEffect(() => {
    if (!currentUser) return;

    const s = io("http://localhost:3001", { withCredentials: true });
    setSocket(s);

    s.on("connect", () => {
      console.log("✅ Frontend Socket Connected");
      s.emit("init", { username: currentUser });
    });

    s.on("init", ({ users, chats, onlineList }) => {
      console.log("📥 Data received from Server");
      setAllUsers(users || []);
      setChatList(chats || []);
      setOnlineUsers(onlineList || []);
    });

    s.on("receive-message", (msg) => {
      // Sidebar update for new messages
      setChatList((prev) => {
        const partner = msg.senderId === currentUser ? msg.receiverId : msg.senderId;
        const filtered = prev.filter(m =>
          (m.senderId === currentUser ? m.receiverId : m.senderId) !== partner
        );
        return [msg, ...filtered];
      });
    });

    s.on("update-online-users", (list) => setOnlineUsers(list));

    return () => { s.disconnect(); };
  }, [currentUser]);

  const handleSelectUser = (username: string) => {
    setOtherUser(username);
    localStorage.setItem("active_chat", username);
  };

  const handleLogout = async () => {
    localStorage.removeItem("active_chat");
    if (socket) socket.disconnect();
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/login");
  };

  if (isLoading) return (
    <div className="h-screen flex items-center justify-center bg-gray-50 font-sans">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="flex h-[700px] bg-white overflow-hidden shadow-2xl">
      <Sidebar
        currentUser={currentUser}
        otherUser={otherUser}
        setOtherUser={handleSelectUser}
        chatList={chatList}
        allUsers={allUsers}
        onlineUsers={onlineUsers}
        onLogout={handleLogout}
      />
      <ChatWindow
        currentUser={currentUser}
        otherUser={otherUser}
        messages={messages}
        setMessages={setMessages}
        socket={socket}
        onlineUsers={onlineUsers}
      />
    </div>
  );
}