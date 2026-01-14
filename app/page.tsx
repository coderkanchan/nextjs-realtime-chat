// // page.tsx file
// "use client";

// import { useEffect, useState, useRef, useCallback } from "react";
// import io, { Socket } from "socket.io-client";

// // Socket.IO सर्वर से कनेक्ट करें (Port 3001)
// const socket: Socket = io("http://localhost:3001", {
//   transports: ["websocket"],
// });

// // Room ID बनाने का फ़ंक्शन
// const getRoomId = (id1: string, id2: string): string => {
//   return [id1, id2].sort().join("_");
// };

// // मैसेज/हिस्ट्री के लिए इंटरफेस
// interface MessageData {
//   sender: string;
//   text: string;
// }

// interface ReceivedMessageData {
//   roomId: string;
//   senderId: string;
//   receiverId: string;
//   message: string;
//   _id: string;
//   createdAt: Date;
// }

// // Interface for Chat List 
// interface PartnerStatus {
//   id: string;
//   isOnline: boolean;
//   unreadCount: number;
//   lastMessage: string;
// }

// const generateUniqueId = (): string => {
//   return "user_" + Math.random().toString(36).substring(2, 10);
// };

// export default function HomePage() {
//   const [currentUserId, setCurrentUserId] = useState<string>("");
//   const [otherUserId, setOtherUserId] = useState<string>("");
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState<MessageData[]>([]);
//   const [isConnected, setIsConnected] = useState(false);
//   const [isPartnerTyping, setIsPartnerTyping] = useState(false);

//   const [chatList, setChatList] = useState<PartnerStatus[]>([]);
//   const [onlineStatuses, setOnlineStatuses] = useState<Map<string, boolean>>(new Map());

//   // 👥 NEW: सभी यूज़र्स के लिए स्टेट
//   const [allUsers, setAllUsers] = useState<string[]>([]);


//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   // 🚨 FIXED 1: ID Setup Logic - Added empty dependency array [] to prevent infinite loop
//   useEffect(() => {
//     const storedId = localStorage.getItem("chat_user_id");
//     let idToUse: string;

//     if (!storedId) {
//       idToUse = generateUniqueId();
//       localStorage.setItem("chat_user_id", idToUse);
//     } else {
//       idToUse = storedId;
//     }

//     setCurrentUserId(idToUse);
//     setOtherUserId(localStorage.getItem('chat_other_id') || '');
//   }, []); // 🔑 FIX: [E05B4CF8] Infinite Loop को रोकने के लिए [] जोड़ा


//   const handleReceiveMessage = useCallback((data: ReceivedMessageData) => {
//     if (!currentUserId || !otherUserId) return;
//     const currentRoom = getRoomId(currentUserId, otherUserId);
//     if (currentRoom === data.roomId) {
//       setMessages((prev) => [...prev, { sender: data.senderId, text: data.message }]);
//     }
//   }, [currentUserId, otherUserId]);


//   const handleHistoryLoaded = useCallback((history: ReceivedMessageData[]) => {
//     const formattedMessages: MessageData[] = history.map(msg => ({
//       sender: msg.senderId,
//       text: msg.message,
//     }));
//     setMessages(formattedMessages);
//   }, []);

//   const handleTypingStart = useCallback((senderId: string) => {
//     if (senderId === otherUserId) {
//       setIsPartnerTyping(true);
//       scrollToBottom();
//     }
//   }, [otherUserId]);

//   const handleTypingStop = useCallback((senderId: string) => {
//     if (senderId === otherUserId) {
//       setIsPartnerTyping(false);
//     }
//   }, [otherUserId]);

//   // handleChatListLoaded (सर्वर से लिस्ट मिलने पर)
//   const handleChatListLoaded = useCallback((partners: PartnerStatus[]) => {
//     console.log("🔄 Client: Chat List Loaded from Server:", partners.length, "partners.");
//     setChatList(partners);

//     // ऑनलाइन स्टेटस मैप को अपडेट करें
//     setOnlineStatuses(prev => {
//       const newMap = new Map(prev);
//       partners.forEach(p => {
//         newMap.set(p.id, p.isOnline);
//       });
//       return newMap;
//     });

//     // यदि कोई पार्टनर चुना नहीं गया है, और लिस्ट में पार्टनर है, तो पहला पार्टनर चुनें
//     if (!otherUserId && partners.length > 0) {
//       setOtherUserId(partners[0].id);
//     }
//   }, [otherUserId]);

//   // handleRefreshChatList
//   const handleRefreshChatList = useCallback(() => {
//     if (currentUserId) {
//       console.log("🔄 Client: Requesting Chat List Refresh (triggered by Server)");
//       socket.emit('fetch-chat-list', currentUserId);
//     }
//   }, [currentUserId]);

//   // 👥 NEW: handleAllUsersLoaded (सर्वर से सभी यूज़र ID मिलने पर)
//   // const handleAllUsersLoaded = useCallback((ids: string[]) => {
//   //   console.log("👥 Client: All Users Loaded from Server:", ids.length, "users.");
//   //   // वर्तमान यूज़र ID को लिस्ट से हटा दें
//   //   const filteredIds = ids.filter(id => id !== currentUserId);
//   //   setAllUsers(filteredIds);
//   // }, [currentUserId]);



//   const handleAllUsersLoaded = useCallback((ids: string[]) => {
//     console.log("👥 Client: All Users Loaded:", ids.length);

//     // Apni ID hatane ke baad state update karein
//     const filteredIds = ids.filter(id => id !== currentUserId);
//     setAllUsers(filteredIds); // Ab ye header mein sahi count dikhayega
//   }, [currentUserId]);




//   const handleUserStatusUpdate = useCallback((userId: string, isOnline: boolean) => {
//     // ऑनलाइन स्टेटस मैप को अपडेट करें
//     setOnlineStatuses(prev => {
//       const newMap = new Map(prev);
//       newMap.set(userId, isOnline);
//       return newMap;
//     });

//   }, []);

//   // 🔑 मार्क एज़ रीड फ़ंक्शन
//   const markAsRead = useCallback(() => {
//     if (currentUserId && otherUserId && isConnected) {
//       console.log("🔑 Client: Emitting mark-messages-read for:", otherUserId);
//       socket.emit("mark-messages-read", {
//         currentUserId,
//         otherUserId
//       });
//     }
//   }, [currentUserId, otherUserId, isConnected]);

//   // 🚨 FIXED 3: All Users को फ़ेच करने के लिए एक फ़ंक्शन
//   const fetchAllUsers = useCallback(() => {
//     if (currentUserId && isConnected) {
//       console.log("👥 Client: Requesting All Users List.");
//       socket.emit('fetch-all-users');
//     }
//   }, [currentUserId, isConnected]);


//   // 🔑 Socket Listener Setup useEffect
//   useEffect(() => {
//     if (!currentUserId) return;

//     // B. Socket Connection Listeners
//     // const onConnect = () => {
//     //   setIsConnected(true);

//     //   // कनेक्ट होने के बाद अपनी ID सर्वर को भेजें
//     //   socket.emit("user-connected", currentUserId);

//     //   socket.emit('fetch-chat-list', currentUserId);
//     //   // 🔑 FIX: All Users लिस्ट को भी फेच करें
//     //   fetchAllUsers();
//     //   console.log("🟢 Socket Connected!");
//     // }



//     // page.tsx के अंदर onConnect फंक्शन को ऐसे बदलें:

//     const onConnect = () => {
//       setIsConnected(true);
//       console.log("🟢 Socket Connected!");

//       // अपनी ID सर्वर को भेजें
//       socket.emit("user-connected", currentUserId);

//       // 🔑 FIX: यहाँ Conditions का इंतज़ार न करें, सीधे Emit करें
//       console.log("👥 Client: Requesting initial data...");
//       socket.emit('fetch-chat-list', currentUserId);
//       socket.emit('fetch-all-users'); // सीधे emit करें
//     };



//     const onDisconnect = () => {
//       setIsConnected(false);
//       console.log("🔴 Socket Disconnected!");
//     }

//     socket.on('connect', onConnect);
//     socket.on('disconnect', onDisconnect);

//     // C. Event Listeners
//     socket.on("receive-message", handleReceiveMessage);
//     socket.on("history-loaded", handleHistoryLoaded);
//     socket.on('typing-start-to-client', handleTypingStart);
//     socket.on('typing-stop-to-client', handleTypingStop);

//     socket.on('chat-list-loaded', handleChatListLoaded);
//     socket.on('refresh-chat-list', handleRefreshChatList);

//     // 👥 NEW: All Users Listener
//     socket.on('all-users-loaded', handleAllUsersLoaded);

//     socket.on('user-status-update', handleUserStatusUpdate);

//     return () => {
//       // Cleanup
//       socket.off("receive-message", handleReceiveMessage);
//       socket.off("history-loaded", handleHistoryLoaded);
//       socket.off('typing-start-to-client', handleTypingStart);
//       socket.off('typing-stop-to-client', handleTypingStop);
//       socket.off('chat-list-loaded', handleChatListLoaded);
//       socket.off('refresh-chat-list', handleRefreshChatList);
//       socket.off('all-users-loaded', handleAllUsersLoaded);
//       socket.off('user-status-update', handleUserStatusUpdate);
//       socket.off('connect', onConnect);
//       socket.off('disconnect', onDisconnect);
//     };
//   }, [currentUserId, handleReceiveMessage, handleHistoryLoaded, handleTypingStart, handleTypingStop, handleChatListLoaded, handleRefreshChatList, handleUserStatusUpdate, handleAllUsersLoaded, fetchAllUsers]); // 🔑 fetchAllUsers को dependency में जोड़ा

//   // 🔑 Room Join/Switch & History Fetch Logic (जब otherUserId बदलता है)
//   useEffect(() => {
//     if (currentUserId && otherUserId && isConnected) {
//       const roomId = getRoomId(currentUserId, otherUserId);

//       setMessages([]); // रूम स्विच होने पर मैसेज क्लियर करें

//       socket.emit("user-ready", currentUserId, otherUserId);
//       socket.emit("fetch-history", currentUserId, otherUserId);
//       localStorage.setItem('chat_other_id', otherUserId);
//       console.log(`Switched to partner: ${otherUserId}`);

//       // जैसे ही चैट खुलती है, मैसेज को 'पढ़ा हुआ' मार्क करें
//       markAsRead();
//     }
//   }, [currentUserId, otherUserId, isConnected, markAsRead]);

//   // 🔑 Auto Scroll 
//   useEffect(() => {
//     scrollToBottom();
//   }, [messages, isPartnerTyping]);

//   // 🔑 Typing Handler Utility 
//   const emitTyping = (isTyping: boolean) => {
//     // ... (यह कोड अपरिवर्तित है)
//     if (!currentUserId || !otherUserId || !isConnected) return;
//     const roomId = getRoomId(currentUserId, otherUserId);
//     const data = { roomId: roomId, senderId: currentUserId };
//     if (isTyping) {
//       socket.emit('typing-start', data);
//     } else {
//       socket.emit('typing-stop', data);
//     }
//   };

//   // 🔑 Message Change Logic 
//   const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     // ... (यह कोड अपरिवर्तित है)
//     const newMessage = e.target.value;
//     if (!currentUserId || !otherUserId || !isConnected) {
//       setMessage(newMessage);
//       return;
//     }
//     const isCurrentlyEmpty = message.trim() === '';
//     const isNewEmpty = newMessage.trim() === '';
//     setMessage(newMessage);
//     if (isCurrentlyEmpty && !isNewEmpty) {
//       emitTyping(true);
//     }
//     else if (!isCurrentlyEmpty && isNewEmpty) {
//       emitTyping(false);
//     }
//   };

//   // 🔑 sendMessage 
//   const sendMessage = () => {
//     // ... (यह कोड अपरिवर्तित है)
//     if (!message.trim() || !currentUserId || !otherUserId || !isConnected) {
//       console.error("❌ Send Fail: Check connection, message text, or IDs.");
//       return;
//     }
//     emitTyping(false);
//     const roomId = getRoomId(currentUserId, otherUserId);
//     const msgData = {
//       roomId: roomId,
//       senderId: currentUserId,
//       receiverId: otherUserId,
//       message: message
//     };
//     socket.emit("send-message", msgData);
//     setMessage("");
//   };

//   const newUsersOnly = allUsers.filter(id => !chatList.some(p => p.id === id));

//   return (
//     <div className="max-w-7xl mx-auto p-6 bg-gray-50 flex">

//       {/* Chat List Sidebar */}
//       <div className="w-1/4 bg-white border-r border-gray-200 shadow-md rounded-l-xl p-4 mr-4 flex flex-col">
//         <h3 className="text-2xl font-extrabold mb-4 text-blue-700">Conversations</h3>

//         <p className="text-sm font-semibold text-gray-800 mb-4">Your ID: <span className="text-blue-600 font-mono text-xs">{currentUserId || "loading..."}</span></p>

//         <div className="space-y-2 flex-1 flex flex-col overflow-hidden">

//           {/* Recent Chats Section */}
//           <h4 className="text-sm font-semibold text-gray-600 uppercase pt-2 border-t">Recent Chats ({chatList.length})</h4>

//           <div className="overflow-y-auto max-h-56 pb-2">
//             {chatList.map((partner) => (
//               <div
//                 key={partner.id}
//                 onClick={() => {
//                   if (partner.id !== otherUserId) {
//                     setOtherUserId(partner.id);
//                   }
//                 }}
//                 className={`p-3 rounded-lg text-black cursor-pointer transition-all flex justify-between items-center ${partner.id === otherUserId
//                   ? 'bg-blue-100 border-l-4 border-blue-500 font-semibold'
//                   : 'hover:bg-gray-100'
//                   }`}
//               >
//                 <span className='flex flex-col'>
//                   <span className="font-semibold">{partner.id}</span>
//                   <span className="text-sm text-gray-500 truncate w-32">
//                     {partner.lastMessage || 'Start a conversation.'}
//                   </span>
//                 </span>

//                 <span className='flex items-center'>
//                   {partner.unreadCount > 0 && (
//                     <span className="mr-2 px-2 py-0.5 text-xs font-bold text-white bg-red-500 rounded-full">
//                       {partner.unreadCount}
//                     </span>
//                   )}
//                   <span className={`inline-block w-2 h-2 rounded-full ${onlineStatuses.get(partner.id) ? 'bg-green-500' : 'bg-gray-400'}`}></span>
//                 </span>
//               </div>
//             ))}

//             {chatList.length === 0 && (
//               <p className="text-sm text-gray-500 italic pt-2">No recent chats.</p>
//             )}
//           </div>

//           {/* 👥 NEW: All Users Section  */}


//           <h4 className="text-sm font-semibold text-gray-600 uppercase mt-4 pt-2 border-t">
//             All Users ({newUsersOnly.length})
//           </h4>

//           <div className="overflow-y-auto flex-1">
//             {newUsersOnly.length === 0 && (
//               <p className="text-sm text-gray-500 italic pt-2">No other users found in database.</p>
//             )}
//             {newUsersOnly.map((id) => {
//               // यदि यूज़र पहले से Recent Chats में है, तो उसे यहाँ न दिखाएँ
//               //if (chatList.some(p => p.id === id)) return null;

//               return (
//                 <div
//                   key={id}
//                   onClick={() => setOtherUserId(id)}
//                   className={`p-3 rounded-lg text-black cursor-pointer transition-all flex justify-between items-center ${id === otherUserId
//                     ? 'bg-blue-100 border-l-4 border-blue-500 font-semibold'
//                     : 'hover:bg-gray-100'
//                     }`}
//                 >
//                   <span className="font-semibold">{id}</span>
//                   <span className={`inline-block w-2 h-2 rounded-full ${onlineStatuses.get(id) ? 'bg-green-500' : 'bg-gray-400'}`}></span>
//                 </div>
//               )
//             })}
//           </div>

//         </div>
//       </div>

//       {/* Chat Window Area */}
//       <div className="w-3/4 flex flex-col bg-white rounded-r-xl shadow-lg h-[700px]">
//         <header className="p-4 border-b bg-blue-50 rounded-tr-xl">
//           {/* ... (यह कोड अपरिवर्तित है) */}
//           <h3 className="text-xl font-bold text-gray-800 flex items-center">
//             Chatting with: <span className="text-blue-600 mr-2">{otherUserId || 'Select a Partner'}</span>

//             {otherUserId && (
//               <span className={`inline-block w-3 h-3 rounded-full ${onlineStatuses.get(otherUserId) ? 'bg-green-500' : 'bg-gray-400'}`}></span>
//             )}
//           </h3>
//           <p className={`text-sm font-medium ${isConnected ? 'text-green-600' : 'text-red-500'}`}>
//             Socket Status: {isConnected ? '✅ Connected' : '❌ Disconnected'}
//           </p>
//         </header>

//         {/* Message Display Area */}
//         <div className="flex-1 p-4 overflow-y-auto space-y-3 h-[300px]">
//           {messages.length === 0 && (
//             <div className="text-center text-gray-500 mt-20">
//               {currentUserId && otherUserId ? "Loading chat history..." : "Select or Enter a Partner's ID to begin."}
//             </div>
//           )}

//           {messages.map((msg, index) => {
//             // ... (मैसेज डिस्प्ले कोड अपरिवर्तित है)
//             const isMe = msg.sender === currentUserId;
//             return (
//               <div key={index} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
//                 <div className="max-w-xs md:max-w-md">
//                   <div className={`text-xs mb-1 ${isMe ? 'text-right text-gray-600' : 'text-left text-gray-600'}`}>
//                     {isMe ? 'You' : msg.sender}
//                   </div>
//                   <div
//                     className={`px-4 py-2 rounded-xl text-white ${isMe
//                       ? "bg-blue-600 rounded-br-none shadow-md"
//                       : "bg-gray-700 rounded-tl-none shadow-md"
//                       }`}
//                   >
//                     {msg.text}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}

//           {isPartnerTyping && (
//             <div className="flex justify-start mt-2">
//               <div className="px-3 py-2 text-sm text-gray-700 bg-gray-200 rounded-xl rounded-tl-none animate-pulse">
//                 {otherUserId} is typing...
//               </div>
//             </div>
//           )}
//           <div ref={messagesEndRef} />
//         </div>

//         {/* Message Input Area */}
//         <div className="flex p-4 border-t">
//           {/* ... (इनपुट फील्ड और बटन कोड अपरिवर्तित है) */}
//           <input
//             type="text"
//             className="flex-1 border p-3 rounded-l-xl text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//             placeholder="Type message..."
//             value={message}
//             onChange={handleMessageChange}
//             onKeyPress={(e) => {
//               if (e.key === 'Enter') {
//                 sendMessage();
//               }
//             }}
//             disabled={!otherUserId || !isConnected}
//           />
//           <button
//             onClick={sendMessage}
//             className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-r-xl hover:bg-blue-700 transition-colors disabled:bg-gray-400"
//             disabled={!message.trim() || !otherUserId || !isConnected}
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div >
//   );
// }







// "use client";
// import { useEffect, useState, useRef, useCallback } from "react";
// import io, { Socket } from "socket.io-client";

// const socket: Socket = io("http://localhost:3001", { transports: ["websocket"] });
// const getRoomId = (id1: string, id2: string): string => [id1, id2].sort().join("_");
// const generateUniqueId = () => "user_" + Math.random().toString(36).substring(2, 10);

// export default function HomePage() {
//   const [currentUserId, setCurrentUserId] = useState("");
//   const [otherUserId, setOtherUserId] = useState("");
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState<any[]>([]);
//   const [isConnected, setIsConnected] = useState(false);
//   const [allUsers, setAllUsers] = useState<string[]>([]);
//   const [chatList, setChatList] = useState<any[]>([]);
//   const [onlineStatuses, setOnlineStatuses] = useState<Map<string, boolean>>(new Map());
//   const [isPartnerTyping, setIsPartnerTyping] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

//   useEffect(() => {
//     const id = localStorage.getItem("chat_user_id") || generateUniqueId();
//     localStorage.setItem("chat_user_id", id);
//     setCurrentUserId(id);
//     setOtherUserId(localStorage.getItem('chat_other_id') || '');
//   }, []);

//   const handleAllUsersLoaded = useCallback((ids: string[]) => {
//     setAllUsers(ids.filter(id => id !== currentUserId));
//   }, [currentUserId]);

//   useEffect(() => {
//     if (!currentUserId) return;

//     socket.on('connect', () => {
//       setIsConnected(true);
//       socket.emit("user-connected", currentUserId);
//       socket.emit('fetch-chat-list', currentUserId);
//       socket.emit('fetch-all-users');
//     });

//     socket.on('all-users-loaded', handleAllUsersLoaded);
//     socket.on("receive-message", (data) => {
//       const currentRoom = getRoomId(currentUserId, otherUserId);
//       if (data.roomId === currentRoom) {
//         setMessages((prev) => [...prev, { sender: data.senderId, text: data.message }]);
//       }
//     });

//     socket.on('chat-list-loaded', (partners) => setChatList(partners));
//     socket.on('history-loaded', (history) => setMessages(history.map((m: any) => ({ sender: m.senderId, text: m.message }))));
//     socket.on('refresh-chat-list', () => socket.emit('fetch-chat-list', currentUserId));

//     return () => { socket.off(); };
//   }, [currentUserId, otherUserId, handleAllUsersLoaded]);

//   useEffect(() => {
//     if (currentUserId && otherUserId && isConnected) {
//       socket.emit("user-ready", currentUserId, otherUserId);
//       socket.emit("fetch-history", currentUserId, otherUserId);
//       localStorage.setItem('chat_other_id', otherUserId);
//     }
//   }, [currentUserId, otherUserId, isConnected]);

//   const sendMessage = () => {
//     if (!message.trim() || !otherUserId || !isConnected) return;
//     const msgData = {
//       roomId: getRoomId(currentUserId, otherUserId),
//       senderId: currentUserId,
//       receiverId: otherUserId,
//       message: message
//     };
//     socket.emit("send-message", msgData);
//     setMessage("");
//   };

//   const newUsersOnly = allUsers.filter(id => !chatList.some(p => p.id === id));

//   return (
//     <div className="max-w-7xl mx-auto p-6 flex bg-gray-50 h-screen">
//       {/* Sidebar */}
//       <div className="w-1/4 bg-white p-4 border-r overflow-y-auto">
//         <h3 className="font-bold text-xl mb-4">Conversations</h3>
//         <p className="text-xs mb-4 text-gray-400">ID: {currentUserId}</p>

//         <h4 className="text-xs font-bold uppercase text-gray-500 mt-4">Recent</h4>
//         {chatList.map(p => (
//           <div key={p.id} onClick={() => setOtherUserId(p.id)} className={`p-2 cursor-pointer ${otherUserId === p.id ? 'bg-blue-100' : ''}`}>
//             {p.id} <span className="text-xs text-gray-400">({p.lastMessage})</span>
//           </div>
//         ))}

//         <h4 className="text-xs font-bold uppercase text-gray-500 mt-6">All Users</h4>
//         {newUsersOnly.map(id => (
//           <div key={id} onClick={() => setOtherUserId(id)} className="p-2 hover:bg-gray-100 cursor-pointer text-blue-600">
//             {id}
//           </div>
//         ))}
//       </div>

//       {/* Chat Area */}
//       <div className="w-3/4 flex flex-col bg-white shadow-lg">
//         <header className="p-4 border-b font-bold">Chatting with: {otherUserId || '...'}</header>
//         <div className="flex-1 p-4 overflow-y-auto">
//           {messages.map((m, i) => (
//             <div key={i} className={`flex ${m.sender === currentUserId ? 'justify-end' : 'justify-start'} mb-2`}>
//               <span className={`p-2 rounded-lg ${m.sender === currentUserId ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'}`}>
//                 {m.text}
//               </span>
//             </div>
//           ))}
//           <div ref={messagesEndRef} />
//         </div>
//         <div className="p-4 border-t flex">
//           <input
//             className="flex-1 border p-2 rounded-l"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
//           />
//           <button onClick={sendMessage} className="bg-blue-600 text-white px-4 rounded-r">Send</button>
//         </div>
//       </div>
//     </div>
//   );
// }








// "use client";

// import { useEffect, useState, useRef, useCallback } from "react";
// import io, { Socket } from "socket.io-client";

// const socket: Socket = io("http://localhost:3001", {
//   transports: ["websocket"],
// });

// const getRoomId = (id1: string, id2: string): string => {
//   return [id1, id2].sort().join("_");
// };

// interface MessageData {
//   sender: string;
//   text: string;
// }

// interface ReceivedMessageData {
//   roomId: string;
//   senderId: string;
//   receiverId: string;
//   message: string;
//   _id: string;
//   createdAt: Date;
// }

// interface PartnerStatus {
//   id: string;
//   isOnline: boolean;
//   unreadCount: number;
//   lastMessage: string;
// }

// const generateUniqueId = (): string => {
//   return "user_" + Math.random().toString(36).substring(2, 10);
// };

// export default function HomePage() {
//   const [currentUserId, setCurrentUserId] = useState<string>("");
//   const [otherUserId, setOtherUserId] = useState<string>("");
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState<MessageData[]>([]);
//   const [isConnected, setIsConnected] = useState(false);
//   const [isPartnerTyping, setIsPartnerTyping] = useState(false);
//   const [chatList, setChatList] = useState<PartnerStatus[]>([]);
//   const [onlineStatuses, setOnlineStatuses] = useState<Map<string, boolean>>(new Map());
//   const [allUsers, setAllUsers] = useState<string[]>([]);

//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     const storedId = localStorage.getItem("chat_user_id");
//     let idToUse: string;
//     if (!storedId) {
//       idToUse = generateUniqueId();
//       localStorage.setItem("chat_user_id", idToUse);
//     } else {
//       idToUse = storedId;
//     }
//     setCurrentUserId(idToUse);
//     setOtherUserId(localStorage.getItem('chat_other_id') || '');
//   }, []);

//   const handleReceiveMessage = useCallback((data: ReceivedMessageData) => {
//     if (!currentUserId || !otherUserId) return;
//     const currentRoom = getRoomId(currentUserId, otherUserId);
//     if (currentRoom === data.roomId) {
//       setMessages((prev) => [...prev, { sender: data.senderId, text: data.message }]);
//     }
//   }, [currentUserId, otherUserId]);

//   const handleHistoryLoaded = useCallback((history: ReceivedMessageData[]) => {
//     const formattedMessages: MessageData[] = history.map(msg => ({
//       sender: msg.senderId,
//       text: msg.message,
//     }));
//     setMessages(formattedMessages);
//   }, []);

//   const handleChatListLoaded = useCallback((partners: PartnerStatus[]) => {
//     setChatList(partners);
//     setOnlineStatuses(prev => {
//       const newMap = new Map(prev);
//       partners.forEach(p => newMap.set(p.id, p.isOnline));
//       return newMap;
//     });
//   }, []);

//   const handleAllUsersLoaded = useCallback((ids: string[]) => {
//     const filteredIds = ids.filter(id => id !== currentUserId);
//     setAllUsers(filteredIds);
//   }, [currentUserId]);

//   useEffect(() => {
//     if (!currentUserId) return;

//     const onConnect = () => {
//       setIsConnected(true);
//       socket.emit("user-connected", currentUserId);
//       socket.emit('fetch-chat-list', currentUserId);
//       socket.emit('fetch-all-users');
//     };

//     socket.on('connect', onConnect);
//     socket.on("receive-message", handleReceiveMessage);
//     socket.on("history-loaded", handleHistoryLoaded);
//     socket.on('chat-list-loaded', handleChatListLoaded);
//     socket.on('all-users-loaded', handleAllUsersLoaded);
//     socket.on('refresh-chat-list', () => socket.emit('fetch-chat-list', currentUserId));

//     return () => {
//       socket.off();
//     };
//   }, [currentUserId, handleReceiveMessage, handleHistoryLoaded, handleChatListLoaded, handleAllUsersLoaded]);

//   useEffect(() => {
//     if (currentUserId && otherUserId && isConnected) {
//       socket.emit("user-ready", currentUserId, otherUserId);
//       socket.emit("fetch-history", currentUserId, otherUserId);
//       localStorage.setItem('chat_other_id', otherUserId);
//     }
//   }, [currentUserId, otherUserId, isConnected]);

//   const sendMessage = () => {
//     if (!message.trim() || !otherUserId || !isConnected) return;
//     const msgData = {
//       roomId: getRoomId(currentUserId, otherUserId),
//       senderId: currentUserId,
//       receiverId: otherUserId,
//       message: message
//     };
//     socket.emit("send-message", msgData);
//     setMessage("");
//   };

//   const newUsersOnly = allUsers.filter(id => !chatList.some(p => p.id === id));

//   return (
//     <div className="max-w-7xl mx-auto p-6 bg-gray-50 flex">
//       {/* Sidebar - EXACT ORIGINAL UI */}
//       <div className="w-1/4 bg-white border-r border-gray-200 shadow-md rounded-l-xl p-4 mr-4 flex flex-col h-[700px]">
//         <h3 className="text-2xl font-extrabold mb-4 text-blue-700">Conversations</h3>
//         <p className="text-sm font-semibold text-gray-800 mb-4">Your ID: <span className="text-blue-600 font-mono text-xs">{currentUserId || "loading..."}</span></p>

//         <div className="space-y-2 flex-1 flex flex-col overflow-hidden">
//           <h4 className="text-sm font-semibold text-gray-600 uppercase pt-2 border-t">Recent Chats ({chatList.length})</h4>
//           <div className="overflow-y-auto max-h-56 pb-2">
//             {chatList.map((partner) => (
//               <div key={partner.id} onClick={() => setOtherUserId(partner.id)}
//                 className={`p-3 rounded-lg text-black cursor-pointer transition-all flex justify-between items-center ${partner.id === otherUserId ? 'bg-blue-100 border-l-4 border-blue-500 font-semibold' : 'hover:bg-gray-100'}`}>
//                 <span className='flex flex-col'>
//                   <span className="font-semibold">{partner.id}</span>
//                   <span className="text-sm text-gray-500 truncate w-32">{partner.lastMessage || 'Start a conversation.'}</span>
//                 </span>
//                 <span className={`inline-block w-2 h-2 rounded-full ${onlineStatuses.get(partner.id) ? 'bg-green-500' : 'bg-gray-400'}`}></span>
//               </div>
//             ))}
//           </div>

//           <h4 className="text-sm font-semibold text-gray-600 uppercase mt-4 pt-2 border-t">All Users ({newUsersOnly.length})</h4>
//           <div className="overflow-y-auto flex-1">
//             {newUsersOnly.map((id) => (
//               <div key={id} onClick={() => setOtherUserId(id)}
//                 className={`p-3 rounded-lg text-black cursor-pointer transition-all flex justify-between items-center ${id === otherUserId ? 'bg-blue-100 border-l-4 border-blue-500 font-semibold' : 'hover:bg-gray-100'}`}>
//                 <span className="font-semibold">{id}</span>
//                 <span className={`inline-block w-2 h-2 rounded-full ${onlineStatuses.get(id) ? 'bg-green-500' : 'bg-gray-400'}`}></span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Chat Window - EXACT ORIGINAL UI */}
//       <div className="w-3/4 flex flex-col bg-white rounded-r-xl shadow-lg h-[700px]">
//         <header className="p-4 border-b bg-blue-50 rounded-tr-xl">
//           <h3 className="text-xl font-bold text-gray-800 flex items-center">
//             Chatting with: <span className="text-blue-600 mr-2">{otherUserId || 'Select a Partner'}</span>
//           </h3>
//           <p className={`text-sm font-medium ${isConnected ? 'text-green-600' : 'text-red-500'}`}>
//             Socket Status: {isConnected ? '✅ Connected' : '❌ Disconnected'}
//           </p>
//         </header>

//         <div className="flex-1 p-4 overflow-y-auto space-y-3">
//           {messages.map((msg, index) => (
//             <div key={index} className={`flex ${msg.sender === currentUserId ? "justify-end" : "justify-start"}`}>
//               <div className={`px-4 py-2 rounded-xl text-white ${msg.sender === currentUserId ? "bg-blue-600 rounded-br-none" : "bg-gray-700 rounded-tl-none"}`}>
//                 {msg.text}
//               </div>
//             </div>
//           ))}
//           <div ref={messagesEndRef} />
//         </div>

//         <div className="flex p-4 border-t">
//           <input type="text" className="flex-1 border p-3 rounded-l-xl text-black" placeholder="Type message..." value={message} onChange={(e) => setMessage(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && sendMessage()} />
//           <button onClick={sendMessage} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-r-xl">Send</button>
//         </div>
//       </div>
//     </div>
//   );
// }







// "use client";
// import { useEffect, useState } from "react";
// import io from "socket.io-client";
// import Auth from "@/components/Auth";
// import Sidebar from "@/components/Sidebar";
// import ChatWindow from "@/components/ChatWindow";

// const socket = io("http://localhost:3001", { transports: ["websocket"] });

// export default function HomePage() {
//   const [currentUser, setCurrentUser] = useState<string | null>(null);
//   const [otherUser, setOtherUser] = useState<string>("");
//   const [messages, setMessages] = useState<any[]>([]);
//   const [chatList, setChatList] = useState<any[]>([]);
//   const [allUsers, setAllUsers] = useState<string[]>([]);

//   useEffect(() => {
//     const saved = localStorage.getItem("chat_username");
//     if (saved) {
//       setCurrentUser(saved);
//       socket.emit("user-connected", saved);
//     }

//     socket.on("login-success", (data) => {
//       localStorage.setItem("chat_username", data.username);
//       setCurrentUser(data.username);
//       socket.emit("user-connected", data.username);
//     });

//     socket.on("all-users-loaded", (users) => setAllUsers(users));
//     socket.on("receive-message", (msg) => {
//       setMessages((prev) => [...prev, { sender: msg.senderId, text: msg.message }]);
//     });
//     // Add other socket listeners here...
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("chat_username");
//     setCurrentUser(null);
//     window.location.reload();
//   };

//   if (!currentUser) return <Auth socket={socket} />;

//   return (
//     <div className="max-w-7xl mx-auto p-6 bg-gray-50 flex h-screen">
//       <Sidebar
//         currentUser={currentUser}
//         otherUser={otherUser}
//         setOtherUser={setOtherUser}
//         chatList={chatList}
//         allUsers={allUsers}
//         onLogout={handleLogout}
//         socket={socket}
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
// import io from "socket.io-client";
// import Sidebar from "@/components/Sidebar";
// import ChatWindow from "@/components/ChatWindow";

// const socket = io("http://localhost:3001", { transports: ["websocket"] });

// export default function HomePage() {
//   const [currentUser, setCurrentUser] = useState<string | null>(null);
//   const [otherUser, setOtherUser] = useState<string>("");
//   const router = useRouter();

//   useEffect(() => {
//     const savedUser = localStorage.getItem("chat_username");
//     if (!savedUser) {
//       router.push("/login"); // Agar login nahi hai toh bhej do
//     } else {
//       setCurrentUser(savedUser);
//       socket.emit("user-connected", savedUser);
//     }
//   }, [router]);

//   if (!currentUser) return null; // Loading state

//   return (
//     <div className="max-w-7xl mx-auto p-6 bg-gray-50 flex h-screen">
//       <Sidebar
//         currentUser={currentUser}
//         otherUser={otherUser}
//         setOtherUser={setOtherUser}
//         socket={socket}
//       />
//       <ChatWindow
//         currentUser={currentUser}
//         otherUser={otherUser}
//         socket={socket}
//         messages={messages}
//         setMessages={setMessages}
//       />
//     </div>
//   );
// }






// // "use client";
// // import { useEffect, useState } from "react";
// // import { useRouter } from "next/navigation";
// // import io from "socket.io-client";
// // import Sidebar from "@/components/Sidebar";
// // import ChatWindow from "@/components/ChatWindow";

// // const socket = io("http://localhost:3001", { transports: ["websocket"] });

// // export default function HomePage() {
// //   const [currentUser, setCurrentUser] = useState<string | null>(null);
// //   const [otherUser, setOtherUser] = useState<string>("");

// //   // ✅ 1. Missing States add kar di (Empty array [] dena zaroori hai error rokne ke liye)
// //   const [messages, setMessages] = useState<any[]>([]);
// //   const [chatList, setChatList] = useState<any[]>([]);
// //   const [allUsers, setAllUsers] = useState<string[]>([]);

// //   const router = useRouter();

// //   useEffect(() => {
// //     const savedUser = localStorage.getItem("chat_username");
// //     if (!savedUser) {
// //       router.push("/login");
// //     } else {
// //       setCurrentUser(savedUser);
// //       socket.emit("user-connected", savedUser);
// //       socket.emit("fetch-all-users"); // Sabhi users mangwane ke liye
// //     }

// //     // ✅ 2. Socket Listeners add kar diye taaki data update ho
// //     socket.on("all-users-loaded", (users: string[]) => {
// //       setAllUsers(users);
// //     });

// //     socket.on("receive-message", (msg) => {
// //       // Room check logic ChatWindow handle kar raha hai, yahan bas state update hogi
// //       setMessages((prev) => [...prev, { sender: msg.senderId, text: msg.message }]);
// //     });

// //     // Chat list load hone par update karein
// //     socket.on("chat-list-loaded", (list) => setChatList(list));
// //     socket.on("refresh-chat-list", () => socket.emit('fetch-chat-list', savedUser));

// //     return () => {
// //       socket.off("all-users-loaded");
// //       socket.off("receive-message");
// //       socket.off("chat-list-loaded");
// //       socket.off("refresh-chat-list");
// //     };
// //   }, [router]);

// //   const handleLogout = () => {
// //     localStorage.removeItem("chat_username");
// //     router.push("/login");
// //   };

// //   if (!currentUser) return null;

// //   return (
// //     <div className="max-w-7xl mx-auto p-6 bg-gray-50 flex h-screen">
// //       {/* ✅ 3. Sidebar ko missing props bhej diye */}
// //       <Sidebar
// //         currentUser={currentUser}
// //         otherUser={otherUser}
// //         setOtherUser={setOtherUser}
// //         chatList={chatList}
// //         allUsers={allUsers}
// //         onLogout={handleLogout}
// //         socket={socket}
// //       />

// //       {/* ✅ ChatWindow ko saare props bhej diye */}
// //       <ChatWindow
// //         currentUser={currentUser}
// //         otherUser={otherUser}
// //         socket={socket}
// //         messages={messages}
// //         setMessages={setMessages}
// //       />
// //     </div>
// //   );
// }






// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import io from "socket.io-client";
// import Sidebar from "@/components/Sidebar";
// import ChatWindow from "@/components/ChatWindow";

// const socket = io("http://localhost:3001", { transports: ["websocket"] });

// export default function HomePage() {
//   const [currentUser, setCurrentUser] = useState<string | null>(null);
//   const [otherUser, setOtherUser] = useState<string>("");
//   const [messages, setMessages] = useState<any[]>([]);
//   const [chatList, setChatList] = useState<any[]>([]);
//   const [allUsers, setAllUsers] = useState<string[]>([]);
//   const router = useRouter();

//   useEffect(() => {
//     const saved = localStorage.getItem("chat_username");
//     if (!saved) { router.push("/login"); }
//     else {
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
//     socket.on("refresh-chat-list", () => socket.emit('fetch-chat-list', saved));

//     return () => { socket.off(); };
//   }, [router]);

//   if (!currentUser) return null;

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




"use client";
import Link from "next/link";
import { MessageCircle, Shield, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-800 text-black font-sans">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <MessageCircle className="text-white" />
          </div>
          <span className="text-xl text-white  font-bold tracking-tight">ChatFlow</span>
        </div>
        <div className="space-x-4">
          <Link href="/login" className="text-white font-medium hover:text-blue-600 transition">Login</Link>
          <Link href="/signup" className="bg-black text-white px-5 py-2 rounded-full font-medium hover:bg-blue-600 transition">Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className=" text-white text-6xl md:text-7xl font-bold mb-6 ">
          Connect with anyone, <br />
          <span className="text-blue-600 ">anywhere in real-time.</span>
        </h1>
        <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-10">
          A professional messaging platform built for speed, security, and simplicity.
          No complex setups, just pure conversation.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/signup" className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:shadow-lg hover:shadow-gray-900 transition">
            Start Chatting Now
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="bg-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          <div className="p-8 bg-blue-100 hover:bg-white  hover:shodow-xl  cursor-pointer rounded-2xl border border-gray-100 shadow-sm">
            <Zap className="text-blue-600 mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">Instant Delivery</h3>
            <p className="text-gray-500">Messages travel at the speed of light using our Socket-optimized network.</p>
          </div>
          <div className="p-8 bg-blue-100 hover:bg-white hover:shodow-xl  cursor-pointer rounded-2xl border border-gray-100 shadow-sm">
            <Shield className="text-blue-600 mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">Secure & Private</h3>
            <p className="text-gray-500">Your conversations are protected with database-level security and authentication.</p>
          </div>
          <div className="p-8 bg-blue-100 hover:bg-white hover:shodow-xl cursor-pointer rounded-2xl border border-gray-100 shadow-2xl">
            <MessageCircle className="text-blue-600 mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">Seamless UI</h3>
            <p className="text-gray-500">A clean, distraction-free interface designed for the best chatting experience.</p>
          </div>
        </div>
      </section>
    </div>
  );
}