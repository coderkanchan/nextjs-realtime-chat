
// "use client";
// import { useEffect, useState, useRef } from "react";

// interface ChatWindowProps {
//   currentUser: string;
//   otherUser: string | null;
//   messages: any[];
//   setMessages: React.Dispatch<React.SetStateAction<any[]>>;
//   socket: any;
// }

// const getRoomId = (id1: string, id2: string) =>
//   [id1, id2].sort().join("_");

// export default function ChatWindow({
//   currentUser,
//   otherUser,
//   messages,
//   setMessages,
//   socket,
// }: ChatWindowProps) {
//   const [inputMessage, setInputMessage] = useState("");
//   const [isPartnerTyping, setIsPartnerTyping] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!socket || !otherUser) return;

//     const roomId = getRoomId(currentUser, otherUser);
//     socket.emit("join-room", roomId);
//   }, [socket, otherUser]);


//   /* -------- AUTO SCROLL -------- */
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, isPartnerTyping]);

//   /* -------- TYPING INDICATOR -------- */
//   useEffect(() => {
//     if (!socket || !otherUser) return;

//     socket.on("typing-start-to-client", (userId: string) => {
//       if (userId === otherUser) setIsPartnerTyping(true);
//     });

//     socket.on("typing-stop-to-client", (userId: string) => {
//       if (userId === otherUser) setIsPartnerTyping(false);
//     });

//     return () => {
//       socket.off("typing-start-to-client");
//       socket.off("typing-stop-to-client");
//     };
//   }, [socket, otherUser]);

//   /* -------- SEND MESSAGE -------- */
//   const handleSendMessage = () => {
//     if (!inputMessage.trim() || !otherUser) return;

//     const msg = {
//       roomId: getRoomId(currentUser, otherUser),
//       sender: currentUser,
//       receiver: otherUser,
//       text: inputMessage,
//     };

//     socket.emit("send-message", msg);
//     setMessages((prev) => [...prev, msg]);

//     socket.emit("typing-stop", {
//       roomId: msg.roomId,
//       senderId: currentUser,
//     });

//     setInputMessage("");
//   };

//   /* -------- INPUT CHANGE -------- */
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setInputMessage(e.target.value);

//     if (!otherUser) return;

//     const roomId = getRoomId(currentUser, otherUser);

//     if (e.target.value.length > 0) {
//       socket.emit("typing-start", { roomId, senderId: currentUser });
//     } else {
//       socket.emit("typing-stop", { roomId, senderId: currentUser });
//     }
//   };

//   /* -------- EMPTY STATE -------- */
//   if (!otherUser) {
//     return (
//       <div className="w-3/4 flex items-center justify-center bg-white rounded-r-xl shadow-lg h-full text-gray-400">
//         <p className="text-lg">Select a user to start chatting</p>
//       </div>
//     );
//   }

//   return (
//     <div className="w-3/4 flex flex-col bg-white rounded-r-xl shadow-lg h-full overflow-hidden">
//       {/* Header */}
//       <header className="p-4 border-b bg-blue-50">
//         <h3 className="text-xl font-bold text-gray-800">
//           Chatting with <span className="text-blue-600">{otherUser}</span>
//         </h3>
//         {isPartnerTyping && (
//           <p className="text-xs text-green-500 font-bold animate-pulse">
//             typing...
//           </p>
//         )}
//       </header>

//       {/* Messages */}
//       <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#f0f2f5]">
//         {messages.map((msg, i) => (
//           <div
//             key={i}
//             className={`flex ${msg.sender === currentUser
//               ? "justify-end"
//               : "justify-start"
//               }`}
//           >
//             <div
//               className={`max-w-[70%] px-4 py-2 rounded-xl text-white shadow-sm ${msg.sender === currentUser
//                 ? "bg-blue-600 rounded-br-none"
//                 : "bg-gray-700 rounded-tl-none"
//                 }`}
//             >
//               <p className="text-sm">{msg.text}</p>
//             </div>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input */}
//       <div className="p-4 border-t flex">
//         <input
//           className="flex-1 border p-3 rounded-l-xl"
//           placeholder="Type a message..."
//           value={inputMessage}
//           onChange={handleInputChange}
//           onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
//         />
//         <button
//           onClick={handleSendMessage}
//           className="px-6 bg-blue-600 text-white font-bold rounded-r-xl"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }










// "use client";
// import { useEffect, useState, useRef } from "react";

// interface ChatWindowProps {
//   currentUser: string;
//   otherUser: string | null;
//   messages: any[];
//   setMessages: React.Dispatch<React.SetStateAction<any[]>>;
//   socket: any;
// }

// const getRoomId = (id1: string, id2: string) =>
//   [id1, id2].sort().join("_");

// export default function ChatWindow({
//   currentUser,
//   otherUser,
//   messages,
//   setMessages,
//   socket,
// }: ChatWindowProps) {
//   const [inputMessage, setInputMessage] = useState("");
//   const [isPartnerTyping, setIsPartnerTyping] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   /* ✅ JOIN ROOM – correct & safe */
//   useEffect(() => {
//     if (!socket || !currentUser || !otherUser) return;

//     const roomId = getRoomId(currentUser, otherUser);
//     socket.emit("join-room", roomId);
//   }, [socket, currentUser, otherUser]);

//   /* ✅ AUTO SCROLL */
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, isPartnerTyping]);

//   /* ✅ TYPING INDICATOR */
//   useEffect(() => {
//     if (!socket || !otherUser) return;

//     const handleTypingStart = (userId: string) => {
//       if (userId === otherUser) setIsPartnerTyping(true);
//     };

//     const handleTypingStop = (userId: string) => {
//       if (userId === otherUser) setIsPartnerTyping(false);
//     };

//     socket.on("typing-start-to-client", handleTypingStart);
//     socket.on("typing-stop-to-client", handleTypingStop);

//     return () => {
//       socket.off("typing-start-to-client", handleTypingStart);
//       socket.off("typing-stop-to-client", handleTypingStop);
//     };
//   }, [socket, otherUser]);

//   /* ✅ SEND MESSAGE */
//   const handleSendMessage = () => {
//     if (!inputMessage.trim() || !otherUser) return;

//     const msg = {
//       roomId: getRoomId(currentUser, otherUser),
//       sender: currentUser,
//       receiver: otherUser,
//       text: inputMessage,
//     };

//     socket.emit("send-message", msg);
//     setMessages((prev) => [...prev, msg]);

//     socket.emit("typing-stop", {
//       roomId: msg.roomId,
//       senderId: currentUser,
//     });

//     setInputMessage("");
//   };

//   /* ✅ INPUT CHANGE */
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setInputMessage(e.target.value);
//     if (!otherUser) return;

//     const roomId = getRoomId(currentUser, otherUser);

//     if (e.target.value.length > 0) {
//       socket.emit("typing-start", { roomId, senderId: currentUser });
//     } else {
//       socket.emit("typing-stop", { roomId, senderId: currentUser });
//     }
//   };

//   /* ✅ EMPTY STATE */
//   if (!otherUser) {
//     return (
//       <div className="w-3/4 flex items-center justify-center bg-white rounded-r-xl shadow-lg h-full text-gray-400">
//         <p className="text-lg">Select a user to start chatting</p>
//       </div>
//     );
//   }

//   return (
//     <div className="w-3/4 flex flex-col bg-white rounded-r-xl shadow-lg h-full overflow-hidden">
//       <header className="p-4 border-b bg-blue-50">
//         <h3 className="text-xl font-bold text-gray-800">
//           Chatting with <span className="text-blue-600">{otherUser}</span>
//         </h3>
//         {isPartnerTyping && (
//           <p className="text-xs text-green-500 font-bold animate-pulse">
//             typing...
//           </p>
//         )}
//       </header>

//       <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#f0f2f5]">
//         {messages.map((msg, i) => (
//           <div
//             key={i}
//             className={`flex ${
//               msg.sender === currentUser ? "justify-end" : "justify-start"
//             }`}
//           >
//             <div
//               className={`max-w-[70%] px-4 py-2 rounded-xl text-white shadow-sm ${
//                 msg.sender === currentUser
//                   ? "bg-blue-600 rounded-br-none"
//                   : "bg-gray-700 rounded-tl-none"
//               }`}
//             >
//               <p className="text-sm">{msg.text}</p>
//             </div>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       <div className="p-4 border-t flex">
//         <input
//           className="flex-1 border p-3 rounded-l-xl"
//           placeholder="Type a message..."
//           value={inputMessage}
//           onChange={handleInputChange}
//           onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
//         />
//         <button
//           onClick={handleSendMessage}
//           className="px-6 bg-blue-600 text-white font-bold rounded-r-xl"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }









// "use client";
// import { useEffect, useState, useRef } from "react";

// interface ChatWindowProps {
//   currentUser: string;
//   otherUser: string | null;
//   messages: any[];
//   setMessages: React.Dispatch<React.SetStateAction<any[]>>;
//   socket: any;
// }

// const getRoomId = (id1: string, id2: string) =>
//   [id1, id2].sort().join("_");

// export default function ChatWindow({
//   currentUser,
//   otherUser,
//   messages,
//   setMessages,
//   socket,
// }: ChatWindowProps) {
//   const [inputMessage, setInputMessage] = useState("");
//   const [isPartnerTyping, setIsPartnerTyping] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!socket || !currentUser || !otherUser) return;
//     const roomId = getRoomId(currentUser, otherUser);
//     socket.emit("join-room", roomId);
//   }, [socket, currentUser, otherUser]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, isPartnerTyping]);

//   useEffect(() => {
//     if (!socket || !otherUser) return;

//     const start = (userId: string) => {
//       if (userId === otherUser) setIsPartnerTyping(true);
//     };

//     const stop = (userId: string) => {
//       if (userId === otherUser) setIsPartnerTyping(false);
//     };

//     socket.on("typing-start-to-client", start);
//     socket.on("typing-stop-to-client", stop);

//     return () => {
//       socket.off("typing-start-to-client", start);
//       socket.off("typing-stop-to-client", stop);
//     };
//   }, [socket, otherUser]);

//   const handleSendMessage = () => {
//     if (!inputMessage.trim() || !otherUser) return;

//     const msg = {
//       roomId: getRoomId(currentUser, otherUser),
//       sender: currentUser,
//       receiver: otherUser,
//       text: inputMessage,
//     };

//     socket.emit("send-message", msg);
//     //setMessages((prev) => [...prev, msg]);

//     socket.emit("typing-stop", {
//       roomId: msg.roomId,
//       senderId: currentUser,
//     });

//     setInputMessage("");
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setInputMessage(e.target.value);
//     if (!otherUser) return;

//     const roomId = getRoomId(currentUser, otherUser);

//     if (e.target.value.length > 0) {
//       socket.emit("typing-start", { roomId, senderId: currentUser });
//     } else {
//       socket.emit("typing-stop", { roomId, senderId: currentUser });
//     }
//   };

//   if (!otherUser) {
//     return (
//       <div className="w-3/4 flex items-center justify-center bg-white rounded-r-xl shadow-lg h-full text-gray-400">
//         <p className="text-lg">Select a user to start chatting</p>
//       </div>
//     );
//   }

//   return (
//     <div className="w-3/4 flex flex-col bg-white rounded-r-xl shadow-lg h-full overflow-hidden ">
//       <header className="p-4 border-b bg-blue-100">
//         <h3 className="text-xl font-bold text-gray-800">
//           Chatting with: <span className="text-blue-600">{otherUser}</span>
//         </h3>
//         {isPartnerTyping && (
//           <p className="text-xs text-green-500 font-bold animate-pulse">
//             typing...
//           </p>
//         )}
//       </header>

//       <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#f0f2f5]">
//         {messages.map((msg, i) => (
//           <div
//             key={i}
//             className={`flex ${msg.sender === currentUser ? "justify-end" : "justify-start"
//               }`}
//           >
//             <div
//               className={`max-w-[70%] px-4 py-2 rounded-xl text-white shadow-sm ${msg.sender === currentUser
//                 ? "bg-blue-600 rounded-br-none"
//                 : "bg-gray-700 rounded-tl-none"
//                 }`}
//             >
//               {/* ✅ FIXED */}
//               <p className="text-sm">{msg.message ?? msg.text}</p>
//             </div>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       <div className="p-4 border-t flex bg-blue-100">
//         <input
//           className="flex-1 border-2 border-gray-400 outline-blue-500 bg-white  text-black p-3 rounded-l-xl"
//           placeholder="Type a message..."
//           value={inputMessage}
//           onChange={handleInputChange}
//           onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
//         />
//         <button
//           onClick={handleSendMessage}
//           className="px-6 bg-blue-600 text-white font-bold rounded-r-xl"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }







// "use client";
// import { useEffect, useState, useRef } from "react";

// interface ChatWindowProps {
//   currentUser: string;
//   otherUser: string | null;
//   messages: any[];
//   setMessages: React.Dispatch<React.SetStateAction<any[]>>;
//   socket: any;
// }

// const getRoomId = (id1: string, id2: string) =>
//   [id1, id2].sort().join("_");

// export default function ChatWindow({
//   currentUser,
//   otherUser,
//   messages,
//   setMessages,
//   socket,
// }: ChatWindowProps) {
//   const [inputMessage, setInputMessage] = useState("");
//   const [isPartnerTyping, setIsPartnerTyping] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   /* ✅ JOIN ROOM */
//   useEffect(() => {
//     if (!socket || !currentUser || !otherUser) return;
//     const roomId = getRoomId(currentUser, otherUser);
//     socket.emit("join-room", roomId);
//   }, [socket, currentUser, otherUser]);

//   /* ✅ LOAD OLD MESSAGES WHEN USER CHANGES */
//   useEffect(() => {
//     if (!currentUser || !otherUser) return;

//     const roomId = getRoomId(currentUser, otherUser);

//     fetch(`/api/messages/${roomId}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setMessages(data);
//       })
//       .catch(console.error);
//   }, [currentUser, otherUser, setMessages]);

//   /* ✅ RECEIVE MESSAGE FROM SOCKET (SINGLE SOURCE OF TRUTH) */
//   useEffect(() => {
//     if (!socket) return;

//     const receiveMessage = (msg: any) => {
//       setMessages((prev) => [...prev, msg]);
//     };

//     socket.on("receive-message", receiveMessage);

//     return () => {
//       socket.off("receive-message", receiveMessage);
//     };
//   }, [socket, setMessages]);

//   /* ✅ AUTO SCROLL */
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, isPartnerTyping]);

//   /* ✅ TYPING INDICATOR */
//   useEffect(() => {
//     if (!socket || !otherUser) return;

//     const start = (userId: string) => {
//       if (userId === otherUser) setIsPartnerTyping(true);
//     };

//     const stop = (userId: string) => {
//       if (userId === otherUser) setIsPartnerTyping(false);
//     };

//     socket.on("typing-start-to-client", start);
//     socket.on("typing-stop-to-client", stop);

//     return () => {
//       socket.off("typing-start-to-client", start);
//       socket.off("typing-stop-to-client", stop);
//     };
//   }, [socket, otherUser]);

//   /* ✅ SEND MESSAGE (NO LOCAL PUSH) */
//   const handleSendMessage = () => {
//     if (!inputMessage.trim() || !otherUser) return;

//     const msg = {
//       roomId: getRoomId(currentUser, otherUser),
//       sender: currentUser,
//       receiver: otherUser,
//       message: inputMessage,
//     };

//     socket.emit("send-message", msg);

//     socket.emit("typing-stop", {
//       roomId: msg.roomId,
//       senderId: currentUser,
//     });

//     setInputMessage("");
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setInputMessage(e.target.value);
//     if (!otherUser) return;

//     const roomId = getRoomId(currentUser, otherUser);

//     if (e.target.value.length > 0) {
//       socket.emit("typing-start", { roomId, senderId: currentUser });
//     } else {
//       socket.emit("typing-stop", { roomId, senderId: currentUser });
//     }
//   };

//   if (!otherUser) {
//     return (
//       <div className="w-3/4 flex items-center justify-center bg-white rounded-r-xl shadow-lg h-full text-gray-400">
//         <p className="text-lg">Select a user to start chatting</p>
//       </div>
//     );
//   }

//   return (
//     <div className="w-3/4 flex flex-col bg-white rounded-r-xl shadow-lg h-full overflow-hidden">
//       <header className="p-4 border-b bg-blue-100">
//         <h3 className="text-xl font-bold text-gray-800">
//           Chatting with: <span className="text-blue-600">{otherUser}</span>
//         </h3>
//         {isPartnerTyping && (
//           <p className="text-xs text-green-500 font-bold animate-pulse">
//             typing...
//           </p>
//         )}
//       </header>

//       <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#f0f2f5]">
//         {messages.length === 0 && (
//           <p className="text-center text-gray-400 mt-10">
//             No messages yet
//           </p>
//         )}

//         {messages.map((msg, i) => (
//           <div
//             key={i}
//             className={`flex ${msg.sender === currentUser
//                 ? "justify-end"
//                 : "justify-start"
//               }`}
//           >
//             <div
//               className={`max-w-[70%] px-4 py-2 rounded-xl text-white shadow-sm ${msg.sender === currentUser
//                   ? "bg-blue-600 rounded-br-none"
//                   : "bg-gray-700 rounded-tl-none"
//                 }`}
//             >
//               <p className="text-sm">{msg.message}</p>
//             </div>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       <div className="p-4 border-t flex bg-blue-100">
//         <input
//           className="flex-1 border-2 border-gray-400 outline-blue-500 bg-white text-black p-3 rounded-l-xl"
//           placeholder="Type a message..."
//           value={inputMessage}
//           onChange={handleInputChange}
//           onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
//         />
//         <button
//           onClick={handleSendMessage}
//           className="px-6 bg-blue-600 text-white font-bold rounded-r-xl"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }








// "use client";
// import { useEffect, useState, useRef } from "react";

// interface ChatWindowProps {
//   currentUser: string;
//   otherUser: string | null;
//   messages: any[];
//   setMessages: React.Dispatch<React.SetStateAction<any[]>>;
//   socket: any;
// }

// const getRoomId = (id1: string, id2: string) =>
//   [id1, id2].sort().join("_");

// export default function ChatWindow({
//   currentUser,
//   otherUser,
//   messages,
//   setMessages,
//   socket,
// }: ChatWindowProps) {
//   const [inputMessage, setInputMessage] = useState("");
//   const [isPartnerTyping, setIsPartnerTyping] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!socket || !currentUser || !otherUser) return;
//     const roomId = getRoomId(currentUser, otherUser);
//     socket.emit("join-room", roomId);
//   }, [socket, currentUser, otherUser]);

//   useEffect(() => {
//     if (!currentUser || !otherUser) return;

//     const roomId = getRoomId(currentUser, otherUser);

//     fetch(`/api/messages/${roomId}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setMessages(data);
//       })
//       .catch(console.error);
//   }, [currentUser, otherUser, setMessages]);

//   useEffect(() => {
//     if (!socket) return;

//     const receiveMessage = (msg: any) => {
//       setMessages((prev) => [...prev, msg]);
//     };

//     socket.on("receive-message", receiveMessage);

//     return () => {
//       socket.off("receive-message", receiveMessage);
//     };
//   }, [socket, setMessages]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, isPartnerTyping]);

//   useEffect(() => {
//     if (!socket || !otherUser) return;

//     const start = (userId: string) => {
//       if (userId === otherUser) setIsPartnerTyping(true);
//     };

//     const stop = (userId: string) => {
//       if (userId === otherUser) setIsPartnerTyping(false);
//     };

//     socket.on("typing-start-to-client", start);
//     socket.on("typing-stop-to-client", stop);

//     return () => {
//       socket.off("typing-start-to-client", start);
//       socket.off("typing-stop-to-client", stop);
//     };
//   }, [socket, otherUser]);

//   const handleSendMessage = () => {
//     if (!inputMessage.trim() || !otherUser) return;

//     const msg = {
//       roomId: getRoomId(currentUser, otherUser),
//       senderId: currentUser,
//       receiverId: otherUser,
//       message: inputMessage,
//     };

//     socket.emit("send-message", msg);

//     socket.emit("typing-stop", {
//       roomId: msg.roomId,
//       senderId: currentUser,
//     });

//     setInputMessage("");
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setInputMessage(e.target.value);
//     if (!otherUser) return;

//     const roomId = getRoomId(currentUser, otherUser);

//     if (e.target.value.length > 0) {
//       socket.emit("typing-start", { roomId, senderId: currentUser });
//     } else {
//       socket.emit("typing-stop", { roomId, senderId: currentUser });
//     }
//   };

//   if (!otherUser) {
//     return (
//       <div className="w-3/4 flex items-center justify-center bg-white rounded-r-xl shadow-lg h-full text-gray-400">
//         <p className="text-lg">Select a user to start chatting</p>
//       </div>
//     );
//   }

//   return (
//     <div className="w-3/4 flex flex-col bg-white rounded-r-xl shadow-lg h-full overflow-hidden">
//       <header className="p-4 border-b bg-blue-100">
//         <h3 className="text-xl font-bold text-gray-800">
//           Chatting with: <span className="text-blue-600">{otherUser}</span>
//         </h3>
//         {isPartnerTyping && (
//           <p className="text-xs text-green-500 font-bold animate-pulse">
//             typing...
//           </p>
//         )}
//       </header>

//       <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#f0f2f5]">
//         {messages.length === 0 && (
//           <p className="text-center text-gray-400 mt-10">
//             No messages yet
//           </p>
//         )}

//         {messages.map((msg, i) => (
//           <div
//             key={i}
//             className={`flex ${msg.senderId === currentUser
//                 ? "justify-end"
//                 : "justify-start"
//               }`}
//           >
//             <div
//               className={`max-w-[70%] px-4 py-2 rounded-xl shadow-sm ${msg.senderId === currentUser
//                   ? "bg-blue-600 text-white rounded-br-none"
//                   : "bg-gray-300 text-black rounded-bl-none"
//                 }`}
//             >
//               <p className="text-sm">{msg.message}</p>
//             </div>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       <div className="p-4 border-t flex bg-blue-100">
//         <input
//           className="flex-1 border-2 border-gray-400 outline-blue-500 bg-white text-black p-3 rounded-l-xl"
//           placeholder="Type a message..."
//           value={inputMessage}
//           onChange={handleInputChange}
//           onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
//         />
//         <button
//           onClick={handleSendMessage}
//           className="px-6 bg-blue-600 text-white font-bold rounded-r-xl"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }






// "use client";
// import { useEffect, useState, useRef } from "react";

// interface ChatWindowProps {
//   currentUser: string;
//   otherUser: string | null;
//   messages: any[];
//   setMessages: React.Dispatch<React.SetStateAction<any[]>>;
//   socket: any;
// }

// const getRoomId = (id1: string, id2: string) =>
//   [id1, id2].sort().join("_");

// export default function ChatWindow({
//   currentUser,
//   otherUser,
//   messages,
//   setMessages,
//   socket,
// }: ChatWindowProps) {
//   const [inputMessage, setInputMessage] = useState("");
//   const [isPartnerTyping, setIsPartnerTyping] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   /* JOIN ROOM */
//   useEffect(() => {
//     if (!socket || !currentUser || !otherUser) return;
//     const roomId = getRoomId(currentUser, otherUser);
//     socket.emit("join-room", roomId);
//   }, [socket, currentUser, otherUser]);

//   /* FETCH OLD MESSAGES ✅ */
//   useEffect(() => {
//     if (!currentUser || !otherUser) return;

//     const roomId = getRoomId(currentUser, otherUser);

//     fetch(`/api/messages/${roomId}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setMessages(data || []);
//       })
//       .catch(console.error);
//   }, [currentUser, otherUser, setMessages]);

//   /* RECEIVE MESSAGE */
//   useEffect(() => {
//     if (!socket) return;

//     const receiveMessage = (msg: any) => {
//       setMessages((prev) => [...prev, msg]);
//     };

//     socket.on("receive-message", receiveMessage);
//     return () => socket.off("receive-message", receiveMessage);
//   }, [socket, setMessages]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, isPartnerTyping]);

//   /* SEND MESSAGE */
//   const handleSendMessage = () => {
//     if (!inputMessage.trim() || !otherUser || !socket) return;

//     socket.emit("send-message", {
//       roomId: getRoomId(currentUser, otherUser),
//       senderId: currentUser,
//       receiverId: otherUser,
//       message: inputMessage,
//     });

//     socket.emit("typing-stop", {
//       roomId: getRoomId(currentUser, otherUser),
//       senderId: currentUser,
//     });

//     setInputMessage("");
//   };

//   if (!otherUser) {
//     return (
//       <div className="w-3/4 flex items-center justify-center bg-white h-full text-gray-400">
//         Select a user to start chatting
//       </div>
//     );
//   }

//   return (
//     <div className="w-3/4 flex flex-col bg-white h-full">

//       <header className="p-4 border-b bg-blue-100">
//         <h3 className="text-xl font-bold text-gray-800">
//           Chatting with: <span className="text-blue-600">{otherUser}</span>
//         </h3>
//         {isPartnerTyping && (
//           <p className="text-xs text-green-500 font-bold animate-pulse">
//             typing...
//           </p>
//         )}
//       </header>

//       <div className="flex-1 p-4 overflow-y-auto">
//         {messages.length === 0 && (
//           <p className="text-center text-gray-400 mt-10">
//             No messages yet
//           </p>
//         )}

//         {messages.map((msg, i) => (
//           <div
//             key={i}
//             className={`flex ${msg.senderId === currentUser
//               ? "justify-end"
//               : "justify-start"
//               }`}
//           >
//             <div className={` text-white px-2 py-1 rounded-lg ${msg.senderId === currentUser ? "bg-blue-500" : "bg-gray-400"} `}>
//               {msg.message}
//             </div>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       <div className="p-3  border-t flex bg-blue-100">
//         <input
//           className="flex-1 border-2 border-gray-400 outline-blue-500 bg-white text-black p-3 rounded-l-xl"
//           value={inputMessage}
//           placeholder="Type a message..."
//           onChange={(e) => setInputMessage(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
//         />
//         <button onClick={handleSendMessage}
//           className="px-6 bg-blue-600 text-white font-bold rounded-r-xl"
//         >Send</button>
//       </div>
//     </div>
//   );
// }







// "use client";
// import { useEffect, useState, useRef } from "react";

// interface ChatWindowProps {
//   currentUser: string;
//   otherUser: string | null;
//   messages: any[];
//   setMessages: React.Dispatch<React.SetStateAction<any[]>>;
//   socket: any;
// }

// const getRoomId = (id1: string, id2: string) =>
//   [id1, id2].sort().join("_");

// export default function ChatWindow({
//   currentUser,
//   otherUser,
//   messages,
//   setMessages,
//   socket,
// }: ChatWindowProps) {
//   const [inputMessage, setInputMessage] = useState("");
//   const [isPartnerTyping, setIsPartnerTyping] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   /* JOIN ROOM */
//   useEffect(() => {
//     if (!socket || !currentUser || !otherUser) return;
//     const roomId = getRoomId(currentUser, otherUser);
//     socket.emit("join-room", roomId);
//   }, [socket, currentUser, otherUser]);

//   /* FETCH OLD MESSAGES ✅ FIX */
//   useEffect(() => {
//     if (!currentUser || !otherUser) return;

//     const roomId = getRoomId(currentUser, otherUser);

//     fetch(`/api/messages/${roomId}`)
//       .then((res) => res.json())
//       .then((data) => {
//         if (Array.isArray(data)) {
//           setMessages(data); // ✅ safe overwrite
//         }
//       })
//       .catch(console.error);
//   }, [currentUser, otherUser]);

//   /* RECEIVE MESSAGE */
//   useEffect(() => {
//     if (!socket) return;

//     const receiveMessage = (msg: any) => {
//       setMessages((prev) => [...prev, msg]);
//     };

//     socket.on("receive-message", receiveMessage);
//     return () => socket.off("receive-message", receiveMessage);
//   }, [socket, setMessages]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, isPartnerTyping]);

//   /* SEND MESSAGE */
//   const handleSendMessage = () => {
//     if (!inputMessage.trim() || !otherUser || !socket) return;

//     socket.emit("send-message", {
//       roomId: getRoomId(currentUser, otherUser),
//       senderId: currentUser,
//       receiverId: otherUser,
//       message: inputMessage,
//     });

//     socket.emit("typing-stop", {
//       roomId: getRoomId(currentUser, otherUser),
//       senderId: currentUser,
//     });

//     setInputMessage("");
//   };

//   if (!otherUser) {
//     return (
//       <div className="w-3/4 flex items-center justify-center bg-white h-full text-gray-400">
//         Select a user to start chatting
//       </div>
//     );
//   }

//   return (
//     <div className="w-3/4 flex flex-col bg-white h-full">
//       <header className="p-4 border-b bg-blue-100">
//         <h3 className="text-xl font-bold text-gray-800">
//           Chatting with: <span className="text-blue-600">{otherUser}</span>
//         </h3>
//         {isPartnerTyping && (
//           <p className="text-xs text-green-500 font-bold animate-pulse">
//             typing...
//           </p>
//         )}
//       </header>

//       <div className="flex-1 p-4 overflow-y-auto">
//         {messages.length === 0 && (
//           <p className="text-center text-gray-400 mt-10">
//             No messages yet
//           </p>
//         )}

//         {messages.map((msg, i) => (
//           <div
//             key={i}
//             className={`flex ${msg.senderId === currentUser
//                 ? "justify-end"
//                 : "justify-start"
//               }`}
//           >
//             <div
//               className={`text-white px-2 py-1 rounded-lg ${msg.senderId === currentUser
//                   ? "bg-blue-500"
//                   : "bg-gray-500"
//                 }`}
//             >
//               {msg.message}
//             </div>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       <div className="p-3 border-t flex bg-blue-100">
//         <input
//           className="flex-1 border-2 border-gray-400 outline-blue-500 bg-white text-black p-3 rounded-l-xl"
//           value={inputMessage}
//           placeholder="Type a message..."
//           onChange={(e) => setInputMessage(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
//         />
//         <button
//           onClick={handleSendMessage}
//           className="px-6 bg-blue-600 text-white font-bold rounded-r-xl"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }










// "use client";
// import { useEffect, useState, useRef } from "react";

// interface ChatWindowProps {
//   currentUser: string;
//   otherUser: string | null;
//   messages: any[];
//   setMessages: React.Dispatch<React.SetStateAction<any[]>>;
//   socket: any;
// }

// const getRoomId = (id1: string, id2: string) => [id1, id2].sort().join("_");

// export default function ChatWindow({
//   currentUser,
//   otherUser,
//   messages,
//   setMessages,
//   socket,
// }: ChatWindowProps) {
//   const [inputMessage, setInputMessage] = useState("");
//   const [isPartnerTyping, setIsPartnerTyping] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!socket || !currentUser || !otherUser) return;
//     const roomId = getRoomId(currentUser, otherUser);
//     socket.emit("join-room", roomId);

//     socket.on("typing-start-to-client", (senderId: string) => {
//       if (senderId === otherUser) setIsPartnerTyping(true);
//     });

//     socket.on("typing-stop-to-client", (senderId: string) => {
//       if (senderId === otherUser) setIsPartnerTyping(false);
//     });

//     return () => {
//       socket.off("typing-start-to-client");
//       socket.off("typing-stop-to-client");
//     };
//   }, [socket, currentUser, otherUser]);

//   useEffect(() => {
//     if (!currentUser || !otherUser) return;
//     const roomId = getRoomId(currentUser, otherUser);
//     fetch(`/api/messages/${roomId}`)
//       .then((res) => res.json())
//       .then((data) => {
//         if (Array.isArray(data)) setMessages(data);
//       })
//       .catch(console.error);
//   }, [currentUser, otherUser, setMessages]);

//   useEffect(() => {
//     if (!socket) return;
//     const receiveMessage = (msg: any) => {
//       setMessages((prev) => [...prev, msg]);
//     };
//     socket.on("receive-message", receiveMessage);
//     return () => socket.off("receive-message", receiveMessage);
//   }, [socket, setMessages]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, isPartnerTyping]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setInputMessage(e.target.value);
//     const roomId = getRoomId(currentUser, otherUser!);
//     if (e.target.value.length > 0) {
//       socket.emit("typing-start", { roomId, senderId: currentUser });
//     } else {
//       socket.emit("typing-stop", { roomId, senderId: currentUser });
//     }
//   };

//   const handleSendMessage = () => {
//     if (!inputMessage.trim() || !otherUser || !socket) return;
//     const roomId = getRoomId(currentUser, otherUser);
//     socket.emit("send-message", {
//       roomId,
//       senderId: currentUser,
//       receiverId: otherUser,
//       message: inputMessage,
//     });
//     socket.emit("typing-stop", { roomId, senderId: currentUser });
//     setInputMessage("");
//   };

//   if (!otherUser) {
//     return (
//       <div className="w-3/4 flex items-center justify-center bg-white h-full text-gray-400">
//         Select a user to start chatting
//       </div>
//     );
//   }

//   return (
//     <div className="w-3/4 flex flex-col bg-white h-full">
//       <header className="p-4 border-b bg-blue-100">
//         <h3 className="text-xl font-bold text-gray-800">
//           Chatting with: <span className="text-blue-600">{otherUser}</span>
//         </h3>
//         {isPartnerTyping && (
//           <p className="text-xs text-green-500 font-bold animate-pulse">
//             typing...
//           </p>
//         )}
//       </header>

//       <div className="flex-1 p-4 overflow-y-auto">
//         {messages.map((msg, i) => (
//           <div key={i} className={`flex ${msg.senderId === currentUser ? "justify-end" : "justify-start"}`}>
//             <div className={`text-white px-3 py-1.5 my-1 rounded-lg max-w-xs ${msg.senderId === currentUser ? "bg-blue-500" : "bg-gray-500"}`}>
//               {msg.message}
//             </div>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       <div className="p-3 border-t flex bg-blue-100">
//         <input
//           className="flex-1 border-2 border-gray-400 outline-blue-500 bg-white text-black p-3 rounded-l-xl"
//           value={inputMessage}
//           placeholder="Type a message..."
//           onChange={handleInputChange}
//           onBlur={() => socket.emit("typing-stop", { roomId: getRoomId(currentUser, otherUser), senderId: currentUser })}
//           onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
//         />
//         <button onClick={handleSendMessage} className="px-6 bg-blue-600 text-white font-bold rounded-r-xl">
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }










// "use client";
// import { useEffect, useState, useRef } from "react";

// interface ChatWindowProps {
//   currentUser: string;
//   otherUser: string | null;
//   messages: any[];
//   setMessages: React.Dispatch<React.SetStateAction<any[]>>;
//   socket: any;
// }

// const getRoomId = (id1: string, id2: string) => [id1, id2].sort().join("_");

// export default function ChatWindow({
//   currentUser,
//   otherUser,
//   messages,
//   setMessages,
//   socket,
// }: ChatWindowProps) {
//   const [inputMessage, setInputMessage] = useState("");
//   const [isPartnerTyping, setIsPartnerTyping] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   // Fetch History on User Select
//   useEffect(() => {
//     if (!currentUser || !otherUser) return;
//     const roomId = getRoomId(currentUser, otherUser);

//     setMessages([]); // Clear current view before loading
//     fetch(`/api/messages/${roomId}`)
//       .then((res) => res.json())
//       .then((data) => { if (Array.isArray(data)) setMessages(data); })
//       .catch(console.error);

//     if (socket) socket.emit("join-room", roomId);
//   }, [currentUser, otherUser, socket, setMessages]);

//   // Handle Real-time events
//   useEffect(() => {
//     if (!socket) return;

//     const onMessage = (msg: any) => {
//       const currentRoom = getRoomId(currentUser, otherUser!);
//       if (msg.roomId === currentRoom) {
//         setMessages((prev) => {
//           // Prevent duplicate message in state
//           if (prev.find(m => m._id === msg._id)) return prev;
//           return [...prev, msg];
//         });
//       }
//     };

//     const onTypingStart = (sid: string) => sid === otherUser && setIsPartnerTyping(true);
//     const onTypingStop = (sid: string) => sid === otherUser && setIsPartnerTyping(false);

//     socket.on("receive-message", onMessage);
//     socket.on("typing-start-to-client", onTypingStart);
//     socket.on("typing-stop-to-client", onTypingStop);

//     return () => {
//       socket.off("receive-message", onMessage);
//       socket.off("typing-start-to-client", onTypingStart);
//       socket.off("typing-stop-to-client", onTypingStop);
//     };
//   }, [socket, currentUser, otherUser, setMessages]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, isPartnerTyping]);

//   const handleSendMessage = () => {
//     if (!inputMessage.trim() || !otherUser || !socket) return;
//     const roomId = getRoomId(currentUser, otherUser);
//     socket.emit("send-message", {
//       roomId,
//       senderId: currentUser,
//       receiverId: otherUser,
//       message: inputMessage,
//     });
//     socket.emit("typing-stop", { roomId, senderId: currentUser });
//     setInputMessage("");
//   };

//   if (!otherUser) {
//     return <div className="w-3/4 flex items-center justify-center bg-white text-gray-400">Select a user to chat</div>;
//   }

//   return (
//     <div className="w-3/4 flex flex-col bg-white h-full">
//       <header className="p-4 border-b bg-blue-50">
//         <h3 className="font-bold text-gray-500">Chatting with: <span className="text-blue-600">{otherUser}</span></h3>
//         {isPartnerTyping && <p className="text-xs text-green-500 animate-pulse">typing...</p>}
//       </header>

//       <div className="flex-1 p-4 overflow-y-auto space-y-2">
//         {messages.map((msg, i) => (
//           <div key={msg._id || i} className={`flex ${msg.senderId === currentUser ? "justify-end" : "justify-start"}`}>
//             <div className={`px-4 py-2 rounded-2xl max-w-sm ${msg.senderId === currentUser ? "bg-blue-600 text-white" : "bg-gray-200 text-black"}`}>
//               {msg.message}
//             </div>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       <div className="p-4 border-t flex  ">
//         <input
//           className="flex-1 border-2 border-gray-500 text-gray-500 p-2 rounded-l-lg outline-none focus:border-blue-500"
//           value={inputMessage}
//           onChange={(e) => {
//             setInputMessage(e.target.value);
//             socket.emit(e.target.value ? "typing-start" : "typing-stop", { roomId: getRoomId(currentUser, otherUser), senderId: currentUser });
//           }}
//           onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
//           placeholder="Type a message..."
//         />
//         <button
//           onClick={handleSendMessage}
//           className="bg-blue-600 text-white px-6 py-2 rounded-r-lg font-bold">Send</button>
//       </div>
//     </div>
//   );
// }










// "use client";
// import { useEffect, useState, useRef } from "react";

// interface ChatWindowProps {
//   currentUser: string;
//   otherUser: string | null;
//   messages: any[];
//   setMessages: React.Dispatch<React.SetStateAction<any[]>>;
//   socket: any;
// }

// const getRoomId = (id1: string, id2: string) => [id1, id2].sort().join("_");

// export default function ChatWindow({
//   currentUser,
//   otherUser,
//   messages,
//   setMessages,
//   socket,
// }: ChatWindowProps) {
//   const [inputMessage, setInputMessage] = useState("");
//   const [isPartnerTyping, setIsPartnerTyping] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   // Load History Fix
//   useEffect(() => {
//     if (!currentUser || !otherUser) return;
//     const roomId = getRoomId(currentUser, otherUser);

//     fetch(`/api/messages/${roomId}`)
//       .then((res) => res.json())
//       .then((data) => {
//         if (Array.isArray(data)) setMessages(data);
//       })
//       .catch(console.error);

//     if (socket) socket.emit("join-room", roomId);
//   }, [currentUser, otherUser, socket, setMessages]);

//   // Real-time Event Fix (Prevents Duplicates)
//   useEffect(() => {
//     if (!socket || !otherUser) return;

//     const onMessage = (msg: any) => {
//       const currentRoom = getRoomId(currentUser, otherUser);
//       if (msg.roomId === currentRoom) {
//         setMessages((prev) => {
//           // STRICT CHECK: Don't add if message already exists by ID
//           if (prev.some(m => m._id === msg._id)) return prev;
//           return [...prev, msg];
//         });
//       }
//     };

//     const onTypingStart = (sid: string) => sid === otherUser && setIsPartnerTyping(true);
//     const onTypingStop = (sid: string) => sid === otherUser && setIsPartnerTyping(false);

//     socket.on("receive-message", onMessage);
//     socket.on("typing-start-to-client", onTypingStart);
//     socket.on("typing-stop-to-client", onTypingStop);

//     return () => {
//       socket.off("receive-message", onMessage);
//       socket.off("typing-start-to-client", onTypingStart);
//       socket.off("typing-stop-to-client", onTypingStop);
//     };
//   }, [socket, currentUser, otherUser, setMessages]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, isPartnerTyping]);

//   const handleSendMessage = () => {
//     if (!inputMessage.trim() || !otherUser || !socket) return;
//     const roomId = getRoomId(currentUser, otherUser);
//     socket.emit("send-message", {
//       roomId,
//       senderId: currentUser,
//       receiverId: otherUser,
//       message: inputMessage,
//     });
//     socket.emit("typing-stop", { roomId, senderId: currentUser });
//     setInputMessage("");
//   };

//   if (!otherUser) {
//     return <div className="w-3/4 flex items-center justify-center bg-white text-gray-400">Select a user to chat</div>;
//   }

//   return (
//     <div className="w-3/4 flex flex-col bg-white h-full">
//       <header className="p-4 border-b bg-blue-50">
//         <h3 className="font-bold text-gray-500">Chatting with: <span className="text-blue-600">{otherUser}</span></h3>
//         {isPartnerTyping && <p className="text-xs text-green-500 animate-pulse">typing...</p>}
//       </header>

//       <div className="flex-1 p-4 overflow-y-auto space-y-2">
//         {messages.map((msg, i) => (
//           <div key={msg._id || i} className={`flex ${msg.senderId === currentUser ? "justify-end" : "justify-start"}`}>
//             <div className={`px-4 py-2 rounded-2xl max-w-sm ${msg.senderId === currentUser ? "bg-blue-600 text-white" : "bg-gray-200 text-black"}`}>
//               {msg.message}
//             </div>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       <div className="p-4 border-t flex">
//         <input
//           className="flex-1 border-2 border-gray-500 text-gray-500 p-2 rounded-l-lg outline-none focus:border-blue-500"
//           value={inputMessage}
//           onChange={(e) => {
//             setInputMessage(e.target.value);
//             socket.emit(e.target.value ? "typing-start" : "typing-stop", { roomId: getRoomId(currentUser, otherUser), senderId: currentUser });
//           }}
//           onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
//           placeholder="Type a message..."
//         />
//         <button onClick={handleSendMessage} className="bg-blue-600 text-white px-6 py-2 rounded-r-lg font-bold">Send</button>
//       </div>
//     </div>
//   );
// }









// "use client";
// import { useEffect, useState, useRef } from "react";

// interface ChatWindowProps {
//   currentUser: string;
//   otherUser: string | null;
//   messages: any[];
//   setMessages: React.Dispatch<React.SetStateAction<any[]>>;
//   socket: any;
// }

// const getRoomId = (id1: string, id2: string) => [id1, id2].sort().join("_");

// export default function ChatWindow({
//   currentUser,
//   otherUser,
//   messages,
//   setMessages,
//   socket,
// }: ChatWindowProps) {
//   const [inputMessage, setInputMessage] = useState("");
//   const [isPartnerTyping, setIsPartnerTyping] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   // REFRESH FIX: Fetch messages immediately when otherUser is available
//   useEffect(() => {
//     if (!currentUser || !otherUser) return;
//     const roomId = getRoomId(currentUser, otherUser);

//     fetch(`/api/messages/${roomId}`)
//       .then((res) => res.json())
//       .then((data) => {
//         if (Array.isArray(data)) {
//           setMessages(data);
//         }
//       })
//       .catch(console.error);

//     if (socket) socket.emit("join-room", roomId);
//   }, [currentUser, otherUser, socket, setMessages]);

//   // Real-time Event Handling
//   useEffect(() => {
//     if (!socket || !otherUser) return;

//     const onMessage = (msg: any) => {
//       const currentRoom = getRoomId(currentUser, otherUser);
//       if (msg.roomId === currentRoom) {
//         setMessages((prev) => {
//           // Check to prevent double messages in UI
//           if (prev.some(m => m._id === msg._id)) return prev;
//           return [...prev, msg];
//         });
//       }
//     };

//     const onTypingStart = (sid: string) => sid === otherUser && setIsPartnerTyping(true);
//     const onTypingStop = (sid: string) => sid === otherUser && setIsPartnerTyping(false);

//     socket.on("receive-message", onMessage);
//     socket.on("typing-start-to-client", onTypingStart);
//     socket.on("typing-stop-to-client", onTypingStop);

//     return () => {
//       socket.off("receive-message", onMessage);
//       socket.off("typing-start-to-client", onTypingStart);
//       socket.off("typing-stop-to-client", onTypingStop);
//     };
//   }, [socket, currentUser, otherUser, setMessages]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, isPartnerTyping]);

//   const handleSendMessage = () => {
//     if (!inputMessage.trim() || !otherUser || !socket) return;
//     const roomId = getRoomId(currentUser, otherUser);
//     socket.emit("send-message", {
//       roomId,
//       senderId: currentUser,
//       receiverId: otherUser,
//       message: inputMessage,
//     });
//     socket.emit("typing-stop", { roomId, senderId: currentUser });
//     setInputMessage("");
//   };

//   if (!otherUser) {
//     return <div className="w-3/4 flex items-center justify-center bg-white text-gray-400">Select a user to chat</div>;
//   }

//   return (
//     <div className="w-3/4 flex flex-col bg-white h-full">
//       <header className="p-4 border-b bg-blue-50">
//         <h3 className="font-bold text-gray-500">Chatting with: <span className="text-blue-600">{otherUser}</span></h3>
//         {isPartnerTyping && <p className="text-xs text-green-500 animate-pulse">typing...</p>}
//       </header>

//       <div className="flex-1 p-4 overflow-y-auto space-y-2">
//         {messages.map((msg, i) => (
//           <div key={msg._id || i} className={`flex ${msg.senderId === currentUser ? "justify-end" : "justify-start"}`}>
//             <div className={`px-4 py-2 rounded-2xl max-w-sm ${msg.senderId === currentUser ? "bg-blue-600 text-white" : "bg-gray-200 text-black"}`}>
//               {msg.message}
//             </div>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       <div className="p-4 border-t flex">
//         <input
//           className="flex-1 border-2 border-gray-500 text-gray-500 p-2 rounded-l-lg outline-none focus:border-blue-500"
//           value={inputMessage}
//           onChange={(e) => {
//             setInputMessage(e.target.value);
//             socket.emit(e.target.value ? "typing-start" : "typing-stop", { roomId: getRoomId(currentUser, otherUser), senderId: currentUser });
//           }}
//           onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
//           placeholder="Type a message..."
//         />
//         <button onClick={handleSendMessage} className="bg-blue-600 text-white px-6 py-2 rounded-r-lg font-bold">Send</button>
//       </div>
//     </div>
//   );
// }









// "use client";
// import { useEffect, useState, useRef } from "react";

// interface ChatWindowProps {
//   currentUser: string;
//   otherUser: string | null;
//   messages: any[];
//   setMessages: React.Dispatch<React.SetStateAction<any[]>>;
//   socket: any;
// }

// const getRoomId = (id1: string, id2: string) => [id1, id2].sort().join("_");

// export default function ChatWindow({
//   currentUser,
//   otherUser,
//   messages,
//   setMessages,
//   socket,
// }: ChatWindowProps) {
//   const [inputMessage, setInputMessage] = useState("");
//   const [isPartnerTyping, setIsPartnerTyping] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   // ✅ REFRESH FIX: Load history immediately when otherUser is detected
//   useEffect(() => {
//     if (!currentUser || !otherUser) return;

//     const roomId = getRoomId(currentUser, otherUser);

//     // API Call to fetch history
//     fetch(`/api/messages/${roomId}`)
//       .then((res) => res.json())
//       .then((data) => {
//         if (Array.isArray(data)) {
//           setMessages(data);
//         }
//       })
//       .catch((err) => console.error("History fetch error:", err));

//     if (socket) {
//       socket.emit("join-room", roomId);
//     }
//   }, [currentUser, otherUser, socket, setMessages]);

//   // Real-time events
//   useEffect(() => {
//     if (!socket || !otherUser) return;

//     const onMessage = (msg: any) => {
//       const currentRoom = getRoomId(currentUser, otherUser);
//       if (msg.roomId === currentRoom) {
//         setMessages((prev) => {
//           if (prev.some(m => m._id === msg._id)) return prev;
//           return [...prev, msg];
//         });
//       }
//     };

//     const onTypingStart = (sid: string) => sid === otherUser && setIsPartnerTyping(true);
//     const onTypingStop = (sid: string) => sid === otherUser && setIsPartnerTyping(false);

//     socket.on("receive-message", onMessage);
//     socket.on("typing-start-to-client", onTypingStart);
//     socket.on("typing-stop-to-client", onTypingStop);

//     return () => {
//       socket.off("receive-message", onMessage);
//       socket.off("typing-start-to-client", onTypingStart);
//       socket.off("typing-stop-to-client", onTypingStop);
//     };
//   }, [socket, currentUser, otherUser, setMessages]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, isPartnerTyping]);

//   const handleSendMessage = () => {
//     if (!inputMessage.trim() || !otherUser || !socket) return;
//     const roomId = getRoomId(currentUser, otherUser);
//     socket.emit("send-message", {
//       roomId,
//       senderId: currentUser,
//       receiverId: otherUser,
//       message: inputMessage,
//     });
//     socket.emit("typing-stop", { roomId, senderId: currentUser });
//     setInputMessage("");
//   };

//   if (!otherUser) {
//     return <div className="w-3/4 flex items-center justify-center bg-white text-gray-400">Select a user to chat</div>;
//   }

//   return (
//     <div className="w-3/4 flex flex-col bg-white h-full">
//       <header className="p-4 border-b bg-blue-50">
//         <h3 className="font-bold text-gray-500">Chatting with: <span className="text-blue-600">{otherUser}</span></h3>
//         {isPartnerTyping && <p className="text-xs text-green-500 animate-pulse">typing...</p>}
//       </header>

//       <div className="flex-1 p-4 overflow-y-auto space-y-2">
//         {messages.map((msg, i) => (
//           <div key={msg._id || i} className={`flex ${msg.senderId === currentUser ? "justify-end" : "justify-start"}`}>
//             <div className={`px-4 py-2 rounded-2xl max-w-sm ${msg.senderId === currentUser ? "bg-blue-600 text-white" : "bg-gray-200 text-black"}`}>
//               {msg.message}
//             </div>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       <div className="p-4 border-t flex">
//         <input
//           className="flex-1 border-2 border-gray-500 text-gray-500 p-2 rounded-l-lg outline-none focus:border-blue-500"
//           value={inputMessage}
//           onChange={(e) => {
//             setInputMessage(e.target.value);
//             socket.emit(e.target.value ? "typing-start" : "typing-stop", {
//               roomId: getRoomId(currentUser, otherUser),
//               senderId: currentUser
//             });
//           }}
//           onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
//           placeholder="Type a message..."
//         />
//         <button onClick={handleSendMessage} className="bg-blue-600 text-white px-6 py-2 rounded-r-lg font-bold">Send</button>
//       </div>
//     </div>
//   );
// }




// "use client";
// import { useEffect, useState, useRef } from "react";

// const getRoomId = (id1: string, id2: string) => [id1, id2].sort().join("_");

// export default function ChatWindow({ currentUser, otherUser, messages, setMessages, socket }) {
//   const [input, setInput] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const scrollRef = useRef<HTMLDivElement>(null);

//   // 1. Fetch History on Switch
//   useEffect(() => {
//     if (!currentUser || !otherUser) return;
//     const roomId = getRoomId(currentUser, otherUser);

//     fetch(`/api/messages/${roomId}`)
//       .then(res => res.json())
//       .then(data => setMessages(Array.isArray(data) ? data : []))
//       .catch(() => setMessages([]));

//     if (socket) socket.emit("join-room", roomId);
//   }, [currentUser, otherUser, socket, setMessages]);

//   // 2. Real-time Listeners
//   useEffect(() => {
//     if (!socket || !otherUser) return;

//     const handleMsg = (msg: any) => {
//       const currentRoom = getRoomId(currentUser, otherUser);
//       if (msg.roomId === currentRoom) {
//         setMessages((prev: any) => prev.some((m: any) => m._id === msg._id) ? prev : [...prev, msg]);
//       }
//     };

//     socket.on("receive-message", handleMsg);
//     socket.on("typing-start-to-client", (id: string) => id === otherUser && setIsTyping(true));
//     socket.on("typing-stop-to-client", (id: string) => id === otherUser && setIsTyping(false));

//     return () => {
//       socket.off("receive-message");
//       socket.off("typing-start-to-client");
//       socket.off("typing-stop-to-client");
//     };
//   }, [socket, currentUser, otherUser, setMessages]);

//   useEffect(() => {
//     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, isTyping]);

//   const sendMessage = () => {
//     if (!input.trim() || !otherUser || !socket) return;
//     const roomId = getRoomId(currentUser, otherUser);
//     socket.emit("send-message", { roomId, senderId: currentUser, receiverId: otherUser, message: input });
//     socket.emit("typing-stop", { roomId, senderId: currentUser });
//     setInput("");
//   };

//   if (!otherUser) return (
//     <div className="flex-1 flex items-center justify-center bg-white text-gray-300 italic">
//       Select a conversation to start chatting
//     </div>
//   );

//   return (
//     <div className="flex-1 flex flex-col bg-white">
//       <header className="p-4 border-b flex justify-between items-center bg-white">
//         <div>
//           <h3 className="font-bold text-gray-800">{otherUser}</h3>
//           {isTyping && <span className="text-[10px] text-green-500 font-medium animate-pulse">typing...</span>}
//         </div>
//       </header>

//       <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#f8faff]">
//         {messages.map((m: any, i: number) => (
//           <div key={m._id || i} className={`flex ${m.senderId === currentUser ? "justify-end" : "justify-start"}`}>
//             <div className={`max-w-[70%] p-3 rounded-2xl shadow-sm text-sm ${m.senderId === currentUser ? "bg-blue-600 text-white rounded-tr-none" : "bg-white text-gray-800 rounded-tl-none border"
//               }`}>
//               {m.message}
//             </div>
//           </div>
//         ))}
//         <div ref={scrollRef} />
//       </div>

//       <div className="p-4 bg-white border-t flex items-center gap-2">
//         <input
//           className="flex-1 bg-gray-100 p-3 rounded-full outline-none text-sm text-gray-700 focus:ring-2 ring-blue-100"
//           placeholder="Write a message..."
//           value={input}
//           onChange={(e) => {
//             setInput(e.target.value);
//             const roomId = getRoomId(currentUser, otherUser);
//             socket.emit(e.target.value ? "typing-start" : "typing-stop", { roomId, senderId: currentUser });
//           }}
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//         />
//         <button onClick={sendMessage} className="bg-blue-600 p-3 rounded-full text-white hover:bg-blue-700 transition-colors">
//           <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
//         </button>
//       </div>
//     </div>
//   );
// }







// "use client";
// import { useEffect, useState, useRef } from "react";

// interface ChatWindowProps {
//   currentUser: string;
//   otherUser: string | null;
//   messages: any[];
//   setMessages: React.Dispatch<React.SetStateAction<any[]>>;
//   socket: any;
// }

// const getRoomId = (id1: string, id2: string) => [id1, id2].sort().join("_");

// export default function ChatWindow({
//   currentUser,
//   otherUser,
//   messages,
//   setMessages,
//   socket
// }: ChatWindowProps) {
//   const [input, setInput] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const scrollRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!currentUser || !otherUser) return;
//     const roomId = getRoomId(currentUser, otherUser);

//     fetch(`/api/messages/${roomId}`)
//       .then(res => res.json())
//       .then(data => setMessages(Array.isArray(data) ? data : []))
//       .catch(() => setMessages([]));

//     if (socket) socket.emit("join-room", roomId);
//   }, [currentUser, otherUser, socket, setMessages]);

//   useEffect(() => {
//     if (!socket || !otherUser) return;

//     const handleMsg = (msg: any) => {
//       const currentRoom = getRoomId(currentUser, otherUser);
//       if (msg.roomId === currentRoom) {
//         setMessages((prev) => prev.some((m: any) => m._id === msg._id) ? prev : [...prev, msg]);
//       }
//     };

//     socket.on("receive-message", handleMsg);
//     socket.on("typing-start-to-client", (id: string) => id === otherUser && setIsTyping(true));
//     socket.on("typing-stop-to-client", (id: string) => id === otherUser && setIsTyping(false));

//     return () => {
//       socket.off("receive-message", handleMsg);
//       socket.off("typing-start-to-client");
//       socket.off("typing-stop-to-client");
//     };
//   }, [socket, currentUser, otherUser, setMessages]);

//   useEffect(() => {
//     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, isTyping]);

//   const sendMessage = () => {
//     if (!input.trim() || !otherUser || !socket) return;
//     const roomId = getRoomId(currentUser, otherUser);
//     socket.emit("send-message", {
//       roomId,
//       senderId: currentUser,
//       receiverId: otherUser,
//       message: input
//     });
//     socket.emit("typing-stop", { roomId, senderId: currentUser });
//     setInput("");
//   };

//   if (!otherUser) return (
//     <div className="flex-1 flex items-center justify-center bg-white text-gray-300 italic font-medium">
//       Select a conversation to start chatting
//     </div>
//   );

//   return (
//     <div className="flex-1 flex flex-col bg-white">
//       <header className="p-4 border-b bg-white">
//         <h3 className="font-bold text-gray-800">{otherUser}</h3>
//         {isTyping && <span className="text-[10px] text-green-500 animate-pulse">typing...</span>}
//       </header>

//       <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
//         {messages.map((m, i) => (
//           <div key={m._id || i} className={`flex ${m.senderId === currentUser ? "justify-end" : "justify-start"}`}>
//             <div className={`p-3 rounded-2xl text-sm shadow-sm ${m.senderId === currentUser ? "bg-blue-600 text-white rounded-tr-none" : "bg-white text-gray-800 rounded-tl-none border"
//               }`}>
//               {m.message}
//             </div>
//           </div>
//         ))}
//         <div ref={scrollRef} />
//       </div>

//       <div className="p-4 border-t flex gap-2">
//         <input
//           className="flex-1 bg-gray-100 p-3 rounded-full text-sm outline-none focus:ring-2 ring-blue-100"
//           placeholder="Message..."
//           value={input}
//           onChange={(e) => {
//             setInput(e.target.value);
//             const roomId = getRoomId(currentUser, otherUser);
//             socket.emit(e.target.value ? "typing-start" : "typing-stop", { roomId, senderId: currentUser });
//           }}
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//         />
//         <button onClick={sendMessage} className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700">
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }






// "use client";
// import { useEffect, useState, useRef } from "react";

// interface ChatWindowProps {
//   currentUser: string;
//   otherUser: string | null;
//   messages: any[];
//   setMessages: React.Dispatch<React.SetStateAction<any[]>>;
//   socket: any;
// }

// const getRoomId = (id1: string, id2: string) => [id1, id2].sort().join("_");

// export default function ChatWindow({
//   currentUser, otherUser, messages, setMessages, socket
// }: ChatWindowProps) {
//   const [input, setInput] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const scrollRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!currentUser || !otherUser) return;
//     const roomId = getRoomId(currentUser, otherUser);

//     fetch(`/api/messages/${roomId}`)
//       .then(res => res.json())
//       .then(data => setMessages(Array.isArray(data) ? data : []))
//       .catch(() => setMessages([]));

//     if (socket) socket.emit("join-room", roomId);
//   }, [currentUser, otherUser, socket, setMessages]);

//   useEffect(() => {
//     if (!socket || !otherUser) return;

//     const handleMsg = (msg: any) => {
//       const currentRoom = getRoomId(currentUser, otherUser);
//       if (msg.roomId === currentRoom) {
//         setMessages((prev) => prev.some((m: any) => m._id === msg._id) ? prev : [...prev, msg]);
//       }
//     };

//     socket.on("receive-message", handleMsg);
//     socket.on("typing-start-to-client", (id: string) => id === otherUser && setIsTyping(true));
//     socket.on("typing-stop-to-client", (id: string) => id === otherUser && setIsTyping(false));

//     return () => {
//       socket.off("receive-message", handleMsg);
//       socket.off("typing-start-to-client");
//       socket.off("typing-stop-to-client");
//     };
//   }, [socket, currentUser, otherUser, setMessages]);

//   useEffect(() => {
//     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, isTyping]);

//   const sendMessage = () => {
//     if (!input.trim() || !otherUser || !socket) return;
//     const roomId = getRoomId(currentUser, otherUser);
//     socket.emit("send-message", {
//       roomId, senderId: currentUser, receiverId: otherUser, message: input
//     });
//     socket.emit("typing-stop", { roomId, senderId: currentUser });
//     setInput("");
//   };

//   if (!otherUser) return (
//     <div className="flex-1 flex items-center justify-center bg-white text-gray-300 italic">
//       Select a user to chat
//     </div>
//   );

//   return (
//     <div className="flex-1 flex flex-col bg-white">
//       <header className="p-4 border-b bg-white">
//         <h3 className="font-bold text-gray-800">{otherUser}</h3>
//         {isTyping && <span className="text-[10px] text-green-500 animate-pulse font-medium">typing...</span>}
//       </header>

//       <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
//         {messages.map((m, i) => (
//           <div key={m._id || i} className={`flex ${m.senderId === currentUser ? "justify-end" : "justify-start"}`}>
//             <div className={`p-3 rounded-2xl text-sm shadow-sm ${m.senderId === currentUser ? "bg-blue-600 text-white rounded-tr-none" : "bg-white text-gray-800 rounded-tl-none border"
//               }`}>
//               {m.message}
//             </div>
//           </div>
//         ))}
//         <div ref={scrollRef} />
//       </div>

//       <div className="p-4 border-t flex gap-2">
//         <input className="flex-1 border-2 border-gray-500 text-gray-600 bg-gray-100 p-3 rounded-full text-sm outline-blue-500" placeholder="Message..."
//           value={input} onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//           onChange={(e) => {
//             setInput(e.target.value);
//             socket.emit(e.target.value ? "typing-start" : "typing-stop", {
//               roomId: getRoomId(currentUser, otherUser), senderId: currentUser
//             });
//           }}
//         />
//         <button onClick={sendMessage} className="bg-blue-600 text-white px-5 py-2 rounded-full font-bold">Send</button>
//       </div>
//     </div>
//   );
// }





// "use client";
// import { useEffect, useState, useRef } from "react";

// interface ChatWindowProps {
//   currentUser: string;
//   otherUser: string | null;
//   messages: any[];
//   setMessages: React.Dispatch<React.SetStateAction<any[]>>;
//   socket: any;
// }

// const getRoomId = (id1: string, id2: string) => [id1, id2].sort().join("_");

// export default function ChatWindow({
//   currentUser, otherUser, messages, setMessages, socket
// }: ChatWindowProps) {
//   const [input, setInput] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const scrollRef = useRef<HTMLDivElement>(null);

//   // 1. ✅ REFRESH PERSISTENCE FIX: Fetch history immediately when otherUser is available
//   useEffect(() => {
//     const fetchMessages = async () => {
//       if (!currentUser || !otherUser) return;

//       const roomId = getRoomId(currentUser, otherUser);
//       console.log("Fetching history for room:", roomId); // Debugging line

//       try {
//         const res = await fetch(`/api/messages/${roomId}`);
//         const data = await res.json();

//         if (Array.isArray(data)) {
//           setMessages(data);
//         } else {
//           setMessages([]);
//         }
//       } catch (error) {
//         console.error("Failed to load history:", error);
//         setMessages([]);
//       }

//       if (socket) {
//         socket.emit("join-room", roomId);
//       }
//     };

//     fetchMessages();
//   }, [currentUser, otherUser, socket, setMessages]); // Runs every time user switches or page refreshes

//   // 2. Real-time Listeners
//   useEffect(() => {
//     if (!socket || !otherUser) return;

//     const handleMsg = (msg: any) => {
//       const currentRoom = getRoomId(currentUser, otherUser);
//       if (msg.roomId === currentRoom) {
//         // Prevent duplicate messages
//         setMessages((prev) => {
//           const exists = prev.some((m: any) => m._id === msg._id);
//           return exists ? prev : [...prev, msg];
//         });
//       }
//     };

//     socket.on("receive-message", handleMsg);
//     socket.on("typing-start-to-client", (id: string) => id === otherUser && setIsTyping(true));
//     socket.on("typing-stop-to-client", (id: string) => id === otherUser && setIsTyping(false));

//     return () => {
//       socket.off("receive-message", handleMsg);
//       socket.off("typing-start-to-client");
//       socket.off("typing-stop-to-client");
//     };
//   }, [socket, currentUser, otherUser, setMessages]);

//   // Auto Scroll to bottom
//   useEffect(() => {
//     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, isTyping]);

//   const sendMessage = () => {
//     if (!input.trim() || !otherUser || !socket) return;
//     const roomId = getRoomId(currentUser, otherUser);

//     socket.emit("send-message", {
//       roomId,
//       senderId: currentUser,
//       receiverId: otherUser,
//       message: input
//     });

//     socket.emit("typing-stop", { roomId, senderId: currentUser });
//     setInput("");
//   };

//   if (!otherUser) return (
//     <div className="flex-1 flex flex-col items-center justify-center bg-white text-gray-300">
//       <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
//         <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
//       </div>
//       <p className="italic font-medium">Select a user to start chatting</p>
//     </div>
//   );

//   return (
//     <div className="flex-1 flex flex-col bg-white">
//       <header className="p-4 border-b flex items-center justify-between bg-white shadow-sm">
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
//             {otherUser.charAt(0).toUpperCase()}
//           </div>
//           <div>
//             <h3 className="font-bold text-gray-800 leading-tight">{otherUser}</h3>
//             {isTyping ? (
//               <span className="text-[10px] text-green-500 font-bold animate-pulse">typing...</span>
//             ) : (
//               <span className="text-[10px] text-gray-400 font-medium tracking-wide uppercase">Active Now</span>
//             )}
//           </div>
//         </div>
//       </header>

//       <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#f0f2f5]">
//         {messages.map((m, i) => (
//           <div key={m._id || i} className={`flex ${m.senderId === currentUser ? "justify-end" : "justify-start"}`}>
//             <div className={`max-w-[70%] p-3 rounded-2xl text-sm shadow-sm transition-all ${m.senderId === currentUser
//                 ? "bg-blue-600 text-white rounded-tr-none"
//                 : "bg-white text-gray-800 rounded-tl-none border border-gray-200"
//               }`}>
//               {m.message}
//             </div>
//           </div>
//         ))}
//         <div ref={scrollRef} />
//       </div>

//       <div className="p-4 bg-white border-t flex items-center gap-3">
//         <input
//           className="flex-1 bg-gray-100 p-3 rounded-full outline-none text-sm text-gray-700 focus:ring-2 ring-blue-100 transition-all"
//           placeholder="Type a message..."
//           value={input}
//           onChange={(e) => {
//             setInput(e.target.value);
//             const roomId = getRoomId(currentUser, otherUser);
//             socket.emit(e.target.value ? "typing-start" : "typing-stop", { roomId, senderId: currentUser });
//           }}
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//         />
//         <button
//           onClick={sendMessage}
//           disabled={!input.trim()}
//           className="bg-blue-600 p-3 rounded-full text-white hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
//         >
//           <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
//         </button>
//       </div>
//     </div>
//   );
// }













// "use client";
// import { useEffect, useState, useRef } from "react";

// interface ChatWindowProps {
//   currentUser: string;
//   otherUser: string | null;
//   messages: any[];
//   setMessages: React.Dispatch<React.SetStateAction<any[]>>;
//   socket: any;
// }

// const getRoomId = (id1: string, id2: string) => [id1, id2].sort().join("_");

// export default function ChatWindow({
//   currentUser, otherUser, messages, setMessages, socket
// }: ChatWindowProps) {
//   const [input, setInput] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const scrollRef = useRef<HTMLDivElement>(null);

//   // 1. ✅ HISTORY FETCH LOGIC (Fixes Refresh Issue)
//   useEffect(() => {
//     const loadChatHistory = async () => {
//       if (!otherUser || !currentUser) return;

//       const roomId = getRoomId(currentUser, otherUser);
//       try {
//         const res = await fetch(`/api/messages/${roomId}`);
//         const data = await res.json();
//         setMessages(Array.isArray(data) ? data : []);
//       } catch (err) {
//         console.error("Error loading history:", err);
//       }

//       if (socket) socket.emit("join-room", roomId);
//     };

//     loadChatHistory();
//   }, [otherUser, currentUser, socket, setMessages]); // In charon mein se kuch bhi badlega, history fetch hogi.

//   // 2. Real-time Listeners
//   useEffect(() => {
//     if (!socket || !otherUser) return;

//     const handleMsg = (msg: any) => {
//       const currentRoom = getRoomId(currentUser, otherUser);
//       if (msg.roomId === currentRoom) {
//         setMessages((prev) => {
//           const exists = prev.some((m: any) => m._id === msg._id);
//           return exists ? prev : [...prev, msg];
//         });
//       }
//     };

//     socket.on("receive-message", handleMsg);
//     socket.on("typing-start-to-client", (id: string) => id === otherUser && setIsTyping(true));
//     socket.on("typing-stop-to-client", (id: string) => id === otherUser && setIsTyping(false));

//     return () => {
//       socket.off("receive-message", handleMsg);
//       socket.off("typing-start-to-client");
//       socket.off("typing-stop-to-client");
//     };
//   }, [socket, currentUser, otherUser, setMessages]);

//   useEffect(() => {
//     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, isTyping]);

//   const sendMessage = () => {
//     if (!input.trim() || !otherUser || !socket) return;
//     const roomId = getRoomId(currentUser, otherUser);
//     socket.emit("send-message", {
//       roomId, senderId: currentUser, receiverId: otherUser, message: input
//     });
//     socket.emit("typing-stop", { roomId, senderId: currentUser });
//     setInput("");
//   };

//   // ✅ Helper function to format time
//   const formatTime = (dateStr: string) => {
//     if (!dateStr) return "";
//     const date = new Date(dateStr);
//     return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   };

//   if (!otherUser) return (
//     <div className="flex-1 flex items-center justify-center bg-white text-gray-300 italic font-medium">
//       Select a conversation to start chatting
//     </div>
//   );

//   return (
//     <div className="flex-1 flex flex-col bg-white">
//       <header className="p-4 border-b bg-white flex items-center gap-3">
//         <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm uppercase">
//           {otherUser.charAt(0)}
//         </div>
//         <div>
//           <h3 className="font-bold text-gray-800 leading-none">{otherUser}</h3>
//           {isTyping && <span className="text-[10px] text-green-500 font-bold animate-pulse">typing...</span>}
//         </div>
//       </header>

//       <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
//         {messages.map((m, i) => (
//           <div key={m._id || i} className={`flex flex-col ${m.senderId === currentUser ? "items-end" : "items-start"}`}>
//             <div className={`p-3 rounded-2xl text-sm shadow-sm max-w-[70%] ${m.senderId === currentUser ? "bg-blue-600 text-white rounded-tr-none" : "bg-white text-gray-800 rounded-tl-none border"
//               }`}>
//               {m.message}
//             </div>
//             {/* ✅ TIME ADDED HERE */}
//             <span className="text-[9px] text-gray-400 mt-1 px-1 font-medium">
//               {formatTime(m.createdAt)}
//             </span>
//           </div>
//         ))}
//         <div ref={scrollRef} />
//       </div>

//       <div className="p-4 border-t flex gap-2 bg-white">
//         <input
//           className="flex-1 bg-gray-100 p-3 rounded-full text-sm outline-none focus:ring-2 ring-blue-100 transition-all"
//           placeholder="Type a message..."
//           value={input}
//           onChange={(e) => {
//             setInput(e.target.value);
//             const roomId = getRoomId(currentUser, otherUser);
//             socket.emit(e.target.value ? "typing-start" : "typing-stop", { roomId, senderId: currentUser });
//           }}
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//         />
//         <button onClick={sendMessage} className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 shadow-md">
//           <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
//         </button>
//       </div>
//     </div>
//   );
// }







// "use client";
// import { useEffect, useState, useRef } from "react";

// interface ChatWindowProps {
//   currentUser: string;
//   otherUser: string | null;
//   messages: any[];
//   setMessages: React.Dispatch<React.SetStateAction<any[]>>;
//   socket: any;
// }

// const getRoomId = (id1: string, id2: string) => [id1, id2].sort().join("_");

// export default function ChatWindow({
//   currentUser, otherUser, messages, setMessages, socket
// }: ChatWindowProps) {
//   const [input, setInput] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const [fetching, setFetching] = useState(false); // To prevent empty jumps
//   const scrollRef = useRef<HTMLDivElement>(null);

//   // 1. FORCE FETCH ON REFRESH
//   useEffect(() => {
//     const loadHistory = async () => {
//       if (!currentUser || !otherUser) return;

//       setFetching(true);
//       const roomId = getRoomId(currentUser, otherUser);

//       try {
//         const res = await fetch(`/api/messages/${roomId}`, { cache: 'no-store' });
//         const data = await res.json();
//         setMessages(Array.isArray(data) ? data : []);
//       } catch (err) {
//         console.error("History fetch failed:", err);
//       } finally {
//         setFetching(false);
//       }

//       if (socket) socket.emit("join-room", roomId);
//     };

//     loadHistory();
//   }, [currentUser, otherUser, socket, setMessages]);

//   // 2. Real-time Listeners
//   useEffect(() => {
//     if (!socket || !otherUser) return;

//     const handleMsg = (msg: any) => {
//       const currentRoom = getRoomId(currentUser, otherUser);
//       if (msg.roomId === currentRoom) {
//         setMessages((prev) => {
//           if (prev.find(m => m._id === msg._id)) return prev;
//           return [...prev, msg];
//         });
//       }
//     };

//     socket.on("receive-message", handleMsg);
//     socket.on("typing-start-to-client", (id: string) => id === otherUser && setIsTyping(true));
//     socket.on("typing-stop-to-client", (id: string) => id === otherUser && setIsTyping(false));

//     return () => {
//       socket.off("receive-message", handleMsg);
//       socket.off("typing-start-to-client");
//       socket.off("typing-stop-to-client");
//     };
//   }, [socket, currentUser, otherUser, setMessages]);

//   useEffect(() => {
//     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, isTyping]);

//   const sendMessage = () => {
//     if (!input.trim() || !otherUser || !socket) return;
//     const roomId = getRoomId(currentUser, otherUser);
//     socket.emit("send-message", { roomId, senderId: currentUser, receiverId: otherUser, message: input });
//     socket.emit("typing-stop", { roomId, senderId: currentUser });
//     setInput("");
//   };

//   const formatTime = (dateStr: string) => {
//     if (!dateStr) return "";
//     return new Date(dateStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   };

//   if (!otherUser) return <div className="flex-1 flex items-center justify-center text-gray-400 italic">Select a chat</div>;
//   if (fetching) return <div className="flex-1 flex items-center justify-center text-blue-500 font-bold">Loading messages...</div>;

//   return (
//     <div className="flex-1 flex flex-col bg-white">
//       <header className="p-4 border-b flex items-center justify-between">
//         <div className="flex items-center gap-2">
//           <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold uppercase">{otherUser.charAt(0)}</div>
//           <span className="font-bold text-gray-800">{otherUser}</span>
//         </div>
//         {isTyping && <span className="text-[10px] text-green-500 animate-pulse font-bold uppercase">Typing...</span>}
//       </header>

//       <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
//         {messages.map((m, i) => (
//           <div key={m._id || i} className={`flex flex-col ${m.senderId === currentUser ? "items-end" : "items-start"}`}>
//             <div className={`p-3 rounded-2xl text-sm max-w-[75%] shadow-sm ${m.senderId === currentUser ? "bg-blue-600 text-white rounded-tr-none" : "bg-white text-gray-800 border rounded-tl-none"}`}>
//               {m.message}
//             </div>
//             <span className="text-[9px] text-gray-400 mt-1 uppercase font-bold">{formatTime(m.createdAt)}</span>
//           </div>
//         ))}
//         <div ref={scrollRef} />
//       </div>

//       <div className="p-4 border-t flex gap-2">
//         <input className="flex-1 bg-gray-100 p-3 rounded-full text-sm outline-none focus:ring-2 ring-blue-100" placeholder="Type..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} />
//         <button onClick={sendMessage} className="bg-blue-600 text-white px-5 py-2 rounded-full font-bold">Send</button>
//       </div>
//     </div>
//   );
// }








// "use client";
// import { useEffect, useState, useRef } from "react";

// interface ChatWindowProps {
//   currentUser: string;
//   otherUser: string | null;
//   messages: any[];
//   setMessages: React.Dispatch<React.SetStateAction<any[]>>;
//   socket: any;
// }

// const getRoomId = (id1: string, id2: string) => [id1, id2].sort().join("_");

// export default function ChatWindow({
//   currentUser, otherUser, messages, setMessages, socket
// }: ChatWindowProps) {
//   const [input, setInput] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const scrollRef = useRef<HTMLDivElement>(null);

//   // ✅ HISTORY FIX: Fetch whenever users are available
//   useEffect(() => {
//     if (!currentUser || !otherUser) return;

//     const fetchHistory = async () => {
//       const roomId = getRoomId(currentUser, otherUser);
//       try {
//         const res = await fetch(`/api/messages/${roomId}`);
//         const data = await res.json();
//         setMessages(Array.isArray(data) ? data : []);
//       } catch (err) {
//         console.error("Failed to load history");
//       }
//     };

//     fetchHistory();
//     if (socket) socket.emit("join-room", getRoomId(currentUser, otherUser));
//   }, [currentUser, otherUser, socket, setMessages]);

//   useEffect(() => {
//     if (!socket || !otherUser) return;

//     const handleMsg = (msg: any) => {
//       const currentRoom = getRoomId(currentUser, otherUser);
//       if (msg.roomId === currentRoom) {
//         setMessages((prev) => {
//           if (prev.find(m => m._id === msg._id)) return prev;
//           return [...prev, msg];
//         });
//       }
//     };

//     socket.on("receive-message", handleMsg);
//     socket.on("typing-start-to-client", (id: string) => id === otherUser && setIsTyping(true));
//     socket.on("typing-stop-to-client", (id: string) => id === otherUser && setIsTyping(false));

//     return () => {
//       socket.off("receive-message", handleMsg);
//       socket.off("typing-start-to-client");
//       socket.off("typing-stop-to-client");
//     };
//   }, [socket, currentUser, otherUser, setMessages]);

//   useEffect(() => {
//     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, isTyping]);

//   const sendMessage = () => {
//     if (!input.trim() || !otherUser || !socket) return;
//     const roomId = getRoomId(currentUser, otherUser);
//     socket.emit("send-message", {
//       roomId, senderId: currentUser, receiverId: otherUser, message: input
//     });
//     socket.emit("typing-stop", { roomId, senderId: currentUser });
//     setInput("");
//   };

//   // ✅ Professional Time Formatter
//   const formatTime = (time: string) => {
//     if (!time) return "";
//     return new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   };

//   if (!otherUser) return (
//     <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 text-gray-400 italic">
//       <p className="text-lg">Select a conversation</p>
//     </div>
//   );

//   return (
//     <div className="flex-1 flex flex-col bg-white">
//       <header className="p-4 border-b flex items-center justify-between shadow-sm">
//         <div className="flex items-center gap-3">
//           <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
//             {otherUser.charAt(0).toUpperCase()}
//           </div>
//           <span className="font-bold text-gray-700">{otherUser}</span>
//         </div>
//         {isTyping && <span className="text-[10px] text-green-500 font-bold animate-pulse">TYPING...</span>}
//       </header>

//       <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f8f9fa]">
//         {messages.map((m, i) => (
//           <div key={m._id || i} className={`flex flex-col ${m.senderId === currentUser ? "items-end" : "items-start"}`}>
//             <div className={`p-3 rounded-2xl text-sm shadow-sm max-w-[70%] ${m.senderId === currentUser ? "bg-blue-600 text-white rounded-tr-none" : "bg-white text-gray-800 border rounded-tl-none"
//               }`}>
//               {m.message}
//             </div>
//             {/* ✅ Professional Timestamp added here */}
//             <span className="text-[9px] text-gray-400 mt-1 uppercase font-bold px-1">
//               {formatTime(m.createdAt)}
//             </span>
//           </div>
//         ))}
//         <div ref={scrollRef} />
//       </div>

//       <div className="p-4 bg-white border-t flex gap-2">
//         <input
//           className="flex-1 bg-gray-100 p-3 rounded-full outline-none text-sm"
//           placeholder="Type a message..."
//           value={input}
//           onChange={(e) => {
//             setInput(e.target.value);
//             const roomId = getRoomId(currentUser, otherUser);
//             socket.emit(e.target.value ? "typing-start" : "typing-stop", { roomId, senderId: currentUser });
//           }}
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//         />
//         <button onClick={sendMessage} className="bg-blue-600 text-white px-6 rounded-full font-bold transition-transform active:scale-95">
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }







// "use client";
// import { useEffect, useState, useRef } from "react";

// interface ChatWindowProps {
//   currentUser: string;
//   otherUser: string | null;
//   messages: any[];
//   setMessages: React.Dispatch<React.SetStateAction<any[]>>;
//   socket: any;
// }

// const getRoomId = (id1: string, id2: string) => [id1, id2].sort().join("_");

// export default function ChatWindow({
//   currentUser, otherUser, messages, setMessages, socket
// }: ChatWindowProps) {
//   const [input, setInput] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const scrollRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!currentUser || !otherUser) return;

//     const fetchHistory = async () => {
//       const roomId = getRoomId(currentUser, otherUser);
//       try {
//         const res = await fetch(`/api/messages/${roomId}`);
//         const data = await res.json();
//         setMessages(Array.isArray(data) ? data : []);
//       } catch (err) {
//         console.error("Failed to load history");
//       }
//     };

//     fetchHistory();
//     if (socket) socket.emit("join-room", getRoomId(currentUser, otherUser));
//   }, [currentUser, otherUser, socket, setMessages]);

//   useEffect(() => {
//     if (!socket || !otherUser) return;

//     const handleMsg = (msg: any) => {
//       const currentRoom = getRoomId(currentUser, otherUser);
//       if (msg.roomId === currentRoom) {
//         setMessages((prev) => {
//           if (prev.find(m => m._id === msg._id)) return prev;
//           return [...prev, msg];
//         });
//       }
//     };

//     socket.on("receive-message", handleMsg);
//     socket.on("typing-start-to-client", (id: string) => id === otherUser && setIsTyping(true));
//     socket.on("typing-stop-to-client", (id: string) => id === otherUser && setIsTyping(false));

//     return () => {
//       socket.off("receive-message", handleMsg); // ✅ FIXED: handleMsg reference added
//       socket.off("typing-start-to-client");
//       socket.off("typing-stop-to-client");
//     };
//   }, [socket, currentUser, otherUser, setMessages]);

//   useEffect(() => {
//     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, isTyping]);

//   const sendMessage = () => {
//     if (!input.trim() || !otherUser || !socket) return;
//     const roomId = getRoomId(currentUser, otherUser);
//     socket.emit("send-message", {
//       roomId, senderId: currentUser, receiverId: otherUser, message: input
//     });
//     socket.emit("typing-stop", { roomId, senderId: currentUser });
//     setInput("");
//   };

//   const formatTime = (time: string) => {
//     if (!time) return "";
//     return new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   };

//   if (!otherUser) return (
//     <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 text-gray-400 italic">
//       <p className="text-lg">Select a conversation</p>
//     </div>
//   );

//   return (
//     <div className="flex-1 flex flex-col bg-white">
//       <header className="p-4 border-b flex items-center justify-between shadow-sm">
//         <div className="flex items-center gap-3">
//           <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
//             {otherUser.charAt(0).toUpperCase()}
//           </div>
//           <span className="font-bold text-gray-700">{otherUser}</span>
//         </div>
//         {isTyping && <span className="text-[10px] text-green-500 font-bold animate-pulse">TYPING...</span>}
//       </header>

//       <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f8f9fa]">
//         {messages.map((m, i) => (
//           <div key={m._id || i} className={`flex flex-col ${m.senderId === currentUser ? "items-end" : "items-start"}`}>
//             <div className={`p-3 rounded-2xl text-sm shadow-sm max-w-[70%] ${m.senderId === currentUser ? "bg-blue-600 text-white rounded-tr-none" : "bg-white text-gray-800 border rounded-tl-none"}`}>
//               {m.message}
//             </div>
//             <span className="text-[9px] text-gray-400 mt-1 uppercase font-bold px-1">
//               {formatTime(m.createdAt)}
//             </span>
//           </div>
//         ))}
//         <div ref={scrollRef} />
//       </div>

//       <div className="p-4 bg-white border-t flex gap-2">
//         <input
//           className="flex-1 bg-gray-100 p-3 rounded-full outline-none text-sm"
//           placeholder="Type a message..."
//           value={input}
//           onChange={(e) => {
//             setInput(e.target.value);
//             const roomId = getRoomId(currentUser, otherUser);
//             socket.emit(e.target.value ? "typing-start" : "typing-stop", { roomId, senderId: currentUser });
//           }}
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//         />
//         <button onClick={sendMessage} className="bg-blue-600 text-white px-6 rounded-full font-bold transition-transform active:scale-95">
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }








// "use client";
// import { useEffect, useState, useRef } from "react";
// import { FaCheck } from "react-icons/fa6";
// import { BiCheckDouble } from "react-icons/bi";

// interface ChatWindowProps {
//   currentUser: string;
//   otherUser: string | null;
//   messages: any[];
//   setMessages: React.Dispatch<React.SetStateAction<any[]>>;
//   socket: any;
// }

// const getRoomId = (id1: string, id2: string) => [id1, id2].sort().join("_");

// export default function ChatWindow({
//   currentUser, otherUser, messages, setMessages, socket
// }: ChatWindowProps) {
//   const [input, setInput] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const scrollRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!currentUser || !otherUser) return;

//     const fetchHistory = async () => {
//       const roomId = getRoomId(currentUser, otherUser);
//       try {
//         const res = await fetch(`/api/messages/${roomId}`);
//         const data = await res.json();
//         setMessages(Array.isArray(data) ? data : []);

//         // Mark messages as read when opening chat
//         if (socket) socket.emit("mark-as-read", { roomId, username: currentUser });
//       } catch (err) {
//         console.error("Failed to load history");
//       }
//     };

//     fetchHistory();
//     if (socket) socket.emit("join-room", getRoomId(currentUser, otherUser));
//   }, [currentUser, otherUser, socket, setMessages]);

//   useEffect(() => {
//     if (!socket || !otherUser) return;

//     const handleMsg = (msg: any) => {
//       const currentRoom = getRoomId(currentUser, otherUser);
//       if (msg.roomId === currentRoom) {
//         setMessages((prev) => {
//           if (prev.find(m => m._id === msg._id)) return prev;
//           return [...prev, msg];
//         });
//         // Emit read status if we are currently looking at the chat
//         socket.emit("mark-as-read", { roomId: currentRoom, username: currentUser });
//       }
//     };

//     const handleReadStatus = ({ roomId }: { roomId: string }) => {
//       if (roomId === getRoomId(currentUser, otherUser)) {
//         setMessages(prev => prev.map(m => ({ ...m, readStatus: true })));
//       }
//     };

//     socket.on("receive-message", handleMsg);
//     socket.on("messages-read-update", handleReadStatus);
//     socket.on("typing-start-to-client", (id: string) => id === otherUser && setIsTyping(true));
//     socket.on("typing-stop-to-client", (id: string) => id === otherUser && setIsTyping(false));

//     return () => {
//       socket.off("receive-message", handleMsg);
//       socket.off("messages-read-update");
//       socket.off("typing-start-to-client");
//       socket.off("typing-stop-to-client");
//     };
//   }, [socket, currentUser, otherUser, setMessages]);

//   useEffect(() => {
//     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, isTyping]);

//   const sendMessage = () => {
//     if (!input.trim() || !otherUser || !socket) return;
//     const roomId = getRoomId(currentUser, otherUser);
//     socket.emit("send-message", {
//       roomId, senderId: currentUser, receiverId: otherUser, message: input
//     });
//     socket.emit("typing-stop", { roomId, senderId: currentUser });
//     setInput("");
//   };

//   // const formatTime = (time: string) => {
//   //   if (!time) return "";
//   //   return new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   // };

//   // ChatWindow.tsx mein formatTime function ko aise badal dein:

//   const formatTime = (time: string) => {
//     if (!time) return "";
//     const date = new Date(time);
//     return date.toLocaleTimeString('en-US', {
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true
//     }).toLowerCase(); // Isse "11:20 pm" jaisa dikhega
//   };

//   if (!otherUser) return (
//     <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 text-gray-400 italic">
//       <p className="text-lg">Select a conversation</p>
//     </div>
//   );

//   return (
//     <div className="flex-1 flex flex-col bg-white">
//       <header className="p-4 border-b flex items-center justify-between shadow-sm">
//         <div className="flex items-center gap-3">
//           <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
//             {otherUser.charAt(0).toUpperCase()}
//           </div>
//           <span className="font-bold text-gray-700">{otherUser}</span>
//         </div>
//         {isTyping && <span className="text-[10px] text-green-500 font-bold animate-pulse">TYPING...</span>}
//       </header>

//       <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f8f9fa]">
//         {messages.map((m, i) => (
//           <div key={m._id || i} className={`flex flex-col ${m.senderId === currentUser ? "items-end" : "items-start"}`}>
//             <div className={`px-3 pt-3 rounded-2xl shadow-sm max-w-[70%] ${m.senderId === currentUser ? "bg-blue-600 text-white text-lg rounded-tr-none" : "text-white bg-gray-600  rounded-tl-none text-lg"}`}>
//               {m.message}
//               <div className="flex justify-end items-center gap-1 my-1">
//                 <span className={`text-[9px] uppercase font-bold ${m.senderId === currentUser ? "text-blue-100" : "text-gray-400"}`}>
//                   {formatTime(m.createdAt)}
//                 </span>
//                 {m.senderId === currentUser && (
//                   <span className=" text-blue-100 font-bold text-2xl">
//                     {m.readStatus ? <BiCheckDouble /> : <FaCheck />}
//                   </span>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//         <div ref={scrollRef} />
//       </div>

//       <div className="p-4 bg-white border-t flex gap-2">
//         <input
//           className="flex-1 bg-gray-50 border border-blue-200 p-3 rounded-full outline-blue-300 text-sm text-gray-700"
//           placeholder="Type a message..."
//           value={input}
//           onChange={(e) => {
//             setInput(e.target.value);
//             const roomId = getRoomId(currentUser, otherUser);
//             socket.emit(e.target.value ? "typing-start" : "typing-stop", { roomId, senderId: currentUser });
//           }}
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//         />
//         <button onClick={sendMessage} className="bg-blue-600 text-white px-6 rounded-full font-bold transition-transform active:scale-95">
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }









"use client";
import { useEffect, useState, useRef } from "react";
import { FaCheck } from "react-icons/fa6";
import { BiCheckDouble } from "react-icons/bi";

interface ChatWindowProps {
  currentUser: string;
  otherUser: string | null;
  messages: any[];
  setMessages: React.Dispatch<React.SetStateAction<any[]>>;
  socket: any;
  onlineUsers: string[]; // Ye prop ChatPage.tsx se aayegi
}

const getRoomId = (id1: string, id2: string) => [id1, id2].sort().join("_");

export default function ChatWindow({
  currentUser, otherUser, messages, setMessages, socket, onlineUsers
}: ChatWindowProps) {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 1. Simple Time Format (11:20 pm)
  const formatTime = (time: string) => {
    if (!time) return "";
    return new Date(time).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).toLowerCase();
  };

  useEffect(() => {
    if (!currentUser || !otherUser) return;

    const fetchHistory = async () => {
      const roomId = getRoomId(currentUser, otherUser);
      try {
        const res = await fetch(`/api/messages/${roomId}`);
        const data = await res.json();
        setMessages(Array.isArray(data) ? data : []);
        if (socket) socket.emit("mark-as-read", { roomId, username: currentUser });
      } catch (err) {
        console.error("Failed to load history");
      }
    };

    fetchHistory();
    if (socket) socket.emit("join-room", getRoomId(currentUser, otherUser));
  }, [currentUser, otherUser, socket, setMessages]);

  useEffect(() => {
    if (!socket || !otherUser) return;

    // const handleMsg = (msg: any) => {
    //   const currentRoom = getRoomId(currentUser, otherUser);
    //   if (msg.roomId === currentRoom) {
    //     setMessages((prev) => [...prev, msg]);
    //     socket.emit("mark-as-read", { roomId: currentRoom, username: currentUser });
    //   };

    // };

    const handleMsg = (msg: any) => {
      const currentRoom = getRoomId(currentUser, otherUser);
      if (msg.roomId === currentRoom) {
        setMessages((prev) => [...prev, msg]);

        // ✅ FIX: Agar main receiver hoon aur chat khuli hai, tabhi 'read' mark karo
        if (msg.receiverId === currentUser) {
          socket.emit("mark-as-read", { roomId: currentRoom, username: currentUser });
        }
      }
    };

    const handleReadStatus = ({ roomId }: { roomId: string }) => {
      if (roomId === getRoomId(currentUser, otherUser)) {
        setMessages(prev => prev.map(m => ({ ...m, readStatus: true })));
      }
    };

    // Typing Listeners
    socket.on("receive-message", handleMsg);
    socket.on("messages-read-update", handleReadStatus);
    socket.on("display-typing", ({ senderId }: any) => {
      if (senderId === otherUser) setIsTyping(true);
    });
    socket.on("hide-typing", ({ senderId }: any) => {
      if (senderId === otherUser) setIsTyping(false);
    });

    return () => {
      socket.off("receive-message");
      socket.off("messages-read-update");
      socket.off("display-typing");
      socket.off("hide-typing");
    };
  }, [socket, currentUser, otherUser, setMessages]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = () => {
    if (!input.trim() || !otherUser || !socket) return;
    const roomId = getRoomId(currentUser, otherUser);
    socket.emit("send-message", {
      roomId, senderId: currentUser, receiverId: otherUser, message: input
    });
    socket.emit("stop-typing", { roomId, senderId: currentUser });
    setInput("");
  };

  if (!otherUser) return (
    <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 text-gray-400 italic">
      <p className="text-lg">Select a conversation</p>
    </div>
  );

  const isOtherUserOnline = onlineUsers.includes(otherUser);

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* HEADER WITH ONLINE/OFFLINE STATUS */}
      <header className="p-3 border-b flex items-center gap-3 shadow-sm bg-white">
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
          {otherUser.charAt(0).toUpperCase()}
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-gray-800 leading-tight">{otherUser}</span>
          <span className={`text-[10px] font-bold uppercase mt-1 ${isOtherUserOnline ? "text-green-500" : "text-gray-400"} ${isTyping ? " animate-pulse" : ""}`}>
            {isTyping ? "Typing..." : (isOtherUserOnline ? "Online" : "Offline")}
          </span>
        </div>
      </header>

      {/* MESSAGES AREA */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f0f2f5]">
        {messages.map((m, i) => (
          <div key={m._id || i} className={`flex flex-col ${m.senderId === currentUser ? "items-end" : "items-start"}`}>
            <div className={`p-2.5 px-4 rounded-2xl text-[13px] shadow-sm max-w-[75%] ${m.senderId === currentUser ? "bg-blue-600 text-white rounded-tr-none" : "bg-white text-gray-800 border rounded-tl-none"}`}>
              {m.message}
              <div className="flex justify-end items-center gap-1 mt-1">
                <span className={`text-[9px] font-medium ${m.senderId === currentUser ? "text-blue-100" : "text-gray-400"}`}>
                  {formatTime(m.createdAt)}
                </span>
                {/* {m.senderId === currentUser && (
                  <span className="text-xl text-blue-100 font-bold">
                    {m.readStatus ? <BiCheckDouble /> : <FaCheck />}
                  </span>
                )} */}

                {m.senderId === currentUser && (
                  <span className=" ml-1 font-bold">
                    {/* Agar readStatus true hai toh Double Tick, warna Single Tick */}
                    {m.readStatus === true ? (
                      <span className="text-blue-300 text-2xl "><BiCheckDouble /></span>
                    ) : (
                      <span className="text-gray-300 text-lg "><FaCheck /></span>
                    )}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      {/* INPUT AREA WITH FOCUS TYPING LOGIC */}
      <div className="p-3 bg-white border-t flex gap-2 items-center">
        <input
          className="flex-1 bg-gray-100 p-3 px-5 rounded-full outline-none text-sm transition-all focus:bg-white focus:ring-1 focus:ring-blue-400"
          placeholder="Type a message..."
          value={input}
          onFocus={() => socket.emit("start-typing", { roomId: getRoomId(currentUser, otherUser), senderId: currentUser })}
          onBlur={() => socket.emit("stop-typing", { roomId: getRoomId(currentUser, otherUser), senderId: currentUser })}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} className="bg-blue-600 hover:bg-blue-700 text-white p-3 px-6 rounded-full font-bold text-sm transition-all active:scale-95 shadow-md">
          Send
        </button>
      </div>
    </div>
  );
}