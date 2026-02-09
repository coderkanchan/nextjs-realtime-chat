// "use client";
// import { useState, useMemo, useEffect } from "react";

// interface SidebarProps {
//   currentUser: string;
//   otherUser: string | null;
//   setOtherUser: (user: string) => void;
//   chatList: any[];
//   allUsers: any[];
//   onlineUsers: string[];
//   onLogout: () => void;
//   socket: any;
// }

// export default function Sidebar({
//   currentUser, otherUser, setOtherUser, chatList, allUsers, onlineUsers, onLogout, socket
// }: SidebarProps) {
//   const [localChatList, setLocalChatList] = useState(chatList);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => { setLocalChatList(chatList); }, [chatList]);

//   useEffect(() => {
//     if (!socket) return;
//     const handleNewMessageSidebar = (msg: any) => {
//       setLocalChatList((prev) => {
//         const filtered = prev.filter(m => {
//           const p1 = m.senderId === currentUser ? m.receiverId : m.senderId;
//           const p2 = msg.senderId === currentUser ? msg.receiverId : msg.senderId;
//           return p1 !== p2;
//         });
//         return [msg, ...filtered];
//       });
//     };
//     socket.on("receive-message", handleNewMessageSidebar);
//     return () => { socket.off("receive-message", handleNewMessageSidebar); };
//   }, [socket, currentUser]);

//   const isImageUrl = (msg: any) => {
//     return msg.messageType === 'image' || (msg.message && (msg.message.includes("cloudinary.com") || msg.message.match(/\.(jpeg|jpg|gif|png|webp)/i)));
//   };

//   const { recentChats, discoverUsers, unreadCounts } = useMemo(() => {
//     const counts: Record<string, number> = {};
//     const lastMsgs: Record<string, any> = {};
//     (localChatList || []).forEach((msg) => {
//       if (!msg) return;
//       const partner = msg.senderId === currentUser ? msg.receiverId : msg.senderId;
//       if (!lastMsgs[partner] || new Date(lastMsgs[partner].createdAt) < new Date(msg.createdAt)) {
//         lastMsgs[partner] = msg;
//       }
//       if (msg.receiverId === currentUser && msg.readStatus === false && partner !== otherUser) {
//         counts[partner] = (counts[partner] || 0) + 1;
//       }
//     });

//     const sortedRecent = Object.values(lastMsgs)
//       .filter((chat: any) => {
//         const partner = chat.senderId === currentUser ? chat.receiverId : chat.senderId;
//         return partner.toLowerCase().includes(searchTerm.toLowerCase());
//       })
//       .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

//     // const discover = allUsers.filter(u => u !== currentUser && !lastMsgs[u] && u.toLowerCase().includes(searchTerm.toLowerCase()));

//     // const discover = allUsers.filter((u: any) => {
//     //   // 1. Check karein ki 'u' null toh nahi hai
//     //   if (!u) return false;

//     //   // 2. Ab user ek object hai {username, lastSeen}, toh 'u.username' use karein
//     //   const username = typeof u === 'string' ? u : u.username;

//     //   return (
//     //     username !== currentUser &&
//     //     !lastMsgs[username] &&
//     //     username.toLowerCase().includes(searchTerm.toLowerCase())
//     //   );
//     // });

//     // const discover = allUsers.filter((u: any) => {
//     //   if (!u) return false;
//     //   const username = typeof u === 'string' ? u : u.username;
//     //   // Discover mein wahi dikhega jo currentUser nahi hai aur jiski koi chat history nahi hai
//     //   return (
//     //     username !== currentUser &&
//     //     !lastMsgs[username] &&
//     //     username.toLowerCase().includes(searchTerm.toLowerCase())
//     //   );
//     // });

//     // const discover = allUsers.filter((u: any) => {
//     //   if (!u) return false;

//     //   // Username extract karne ka sabse safe tarika
//     //   const username = typeof u === 'string' ? u : u?.username;

//     //   if (!username) return false;

//     //   const isMe = username === currentUser;
//     //   const hasChatted = lastMsgs[username] !== undefined;
//     //   const matchesSearch = username.toLowerCase().includes(searchTerm.toLowerCase());

//     //   // Filter: Main nahi hona chahiye, pehle koi chat nahi honi chahiye, aur search match hona chahiye
//     //   return !isMe && !hasChatted && matchesSearch;
//     // });

//     // const discover = allUsers.filter((u: any) => {
//     //   // 1. Check karein ki user object exist karta hai
//     //   if (!u) return false;

//     //   // 2. Username nikaalein (Object se ya String se)
//     //   const name = typeof u === 'string' ? u : u.username;

//     //   if (!name || name === currentUser) return false;

//     //   // 3. Check karein agar pehle chat hui hai
//     //   const hasChatted = lastMsgs[name] !== undefined;

//     //   // 4. Search term match
//     //   const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase());

//     //   return !hasChatted && matchesSearch;
//     // });


//     // const discover = allUsers.filter((u: any) => {
//     //   if (!u) return false;

//     //   // Extract username safely
//     //   const name = typeof u === 'string' ? u : u.username;

//     //   if (!name || name === currentUser) return false;

//     //   // Check in lastMsgs keys
//     //   const hasChatted = !!lastMsgs[name];

//     //   const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase());

//     //   // Agar baat nahi hui aur search match hai, toh dikhao
//     //   return !hasChatted && matchesSearch;
//     // });


//     // Sidebar.tsx ke useMemo ke andar discover filter:

//     const discover = useMemo(() => {
//       if (!allUsers || allUsers.length === 0) return [];

//       return allUsers.filter((u: any) => {
//         if (!u) return false;
//         const name = typeof u === 'string' ? u : u.username;

//         if (!name || name === currentUser) return false;

//         // Check if we have ANY chat history with this user
//         // .some check zyada reliable hai object keys se
//         const hasChatted = recentChats.some(chat =>
//           chat.senderId === name || chat.receiverId === name
//         );

//         const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase());

//         return !hasChatted && matchesSearch;
//       });
//     }, [allUsers, recentChats, currentUser, searchTerm]);

//     console.log("All Users from Server:", allUsers);
//     console.log("Recent Chats Partners:", Object.keys(lastMsgs));

//     return { recentChats: sortedRecent, discoverUsers: discover, unreadCounts: counts };
//   }, [localChatList, allUsers, currentUser, searchTerm, otherUser]);

//   // const formatLastSeen = (date: string) => {
//   //   return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   // };

//   const formatLastSeen = (date: any) => {
//     if (!date) return "Offline";
//     return new Date(date).toLocaleTimeString('en-US', {
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true
//     }).toLowerCase();
//   };


//   return (
//     <div className="w-1/4 bg-blue-50 border-r flex flex-col h-full p-4 shadow-inner">
//       <div className="mb-4 flex justify-between items-start">
//         <div>
//           <h2 className="text-2xl font-black text-blue-700">Chats</h2>
//           <p className="text-[10px] font-bold text-gray-500 uppercase">User: {currentUser}</p>
//         </div>
//         <button onClick={onLogout} className="text-[10px] font-bold text-red-500 hover:bg-red-50 px-2 py-1 rounded-md border border-red-100 uppercase transition-all">Logout</button>
//       </div>
//       <input
//         type="text"
//         placeholder="Search..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         className="w-full p-2.5 bg-white border-2 border-blue-100 rounded-xl text-xs outline-none focus:border-blue-400 mb-4"
//       />
//       <div className="flex-1 overflow-y-auto space-y-6">
//         <div>
//           <h4 className="text-[11px] font-extrabold text-gray-400 uppercase mb-3">Recent</h4>

//           {recentChats.map((chat: any) => {
//             const partner = chat.senderId === currentUser ? chat.receiverId : chat.senderId;

//             // 1. Safe way to find partner data from allUsers
//             const partnerObj = allUsers.find(u => u && (typeof u === 'string' ? u : u.username) === partner);
//             const isOnline = onlineUsers.includes(partner);

//             // 2. Format the message time (Created at)
//             // const messageTime = chat.createdAt
//             //   ? new Date(chat.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//             //   : "";

//             const messageTime = chat.createdAt
//               ? new Date(chat.createdAt).toLocaleTimeString('en-US', {
//                 hour: '2-digit',
//                 minute: '2-digit',
//                 hour12: true
//               }).toLowerCase()
//               : "";

//             return (
//               <div key={partner} onClick={() => setOtherUser(partner)} className={`p-3 rounded-2xl cursor-pointer mb-2 border-2 transition-all ${otherUser === partner ? "bg-white border-blue-500 shadow-sm" : "bg-transparent border-gray-200"}`}>
//                 <div className="flex justify-between items-center">
//                   <span className="font-bold text-gray-700 flex items-center gap-1">
//                     {partner}
//                     {/* 3. Dot Color Logic: Green if Online, Gray if Offline */}
//                     <span className={`${isOnline ? "text-green-500" : "text-gray-400"} text-[14px]`}>●</span>
//                   </span>
//                   {unreadCounts[partner] > 0 && <span className="bg-red-500 text-white text-[10px] px-1.5 rounded-full">{unreadCounts[partner]}</span>}
//                 </div>

//                 <div className="flex justify-between items-center mt-1">
//                   <p className="text-[11px] truncate text-gray-400 w-2/3">
//                     {isImageUrl(chat) ? "📷 Photo" : chat.message}
//                   </p>
//                   {/* 4. Display Message Time instead of Online/Offline status */}
//                   <p className="text-[9px] text-gray-400 font-medium italic">
//                     {messageTime}
//                   </p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         <div className="mt-8">
//           <h4 className="text-[11px] font-extrabold text-gray-400 uppercase mb-3">Discover People</h4>
//           <div className="space-y-2">

//             {/* {discoverUsers.map((user: any) => (
//               <div
//                 key={user}
//                 onClick={() => setOtherUser(user)}
//                 className="flex items-center gap-3 p-2.5 rounded-xl cursor-pointer hover:bg-white border-2 border-transparent hover:border-blue-100 transition-all"
//               >
//                 <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">
//                   {user[0].toUpperCase()}
//                 </div>
//                 <div className="flex-1">
//                   <div className="text-sm font-bold text-gray-700">{user}</div>
//                   <div className="text-[10px] text-gray-400 uppercase font-bold">
//                     {onlineUsers.includes(user) ? "Online" : "Offline"}
//                   </div>

//                 </div>

//               </div>
//             ))} */}

//             {/* {discoverUsers.map((user: any) => {
//               // User string bhi ho sakta hai ya object bhi (backend se jo data aaye)
//               const username = typeof user === 'string' ? user : user.username;
//               const lastSeen = user.lastSeen;

//               return (
//                 <div key={username} onClick={() => setOtherUser(username)} >

//                   <div className="text-sm font-bold text-gray-700">{username}</div>

//                   <div className="text-[10px] text-gray-400 uppercase font-bold">
//                     {onlineUsers.includes(username) ? (
//                       <span className="text-green-500">Online</span>
//                     ) : (
//                       lastSeen ? `Last seen: ${formatLastSeen(lastSeen)}` : "Offline"
//                     )}
//                   </div>
//                 </div>
//               );
//             })} */}

//             {discoverUsers.map((user: any) => {
//               const username = typeof user === 'string' ? user : user.username;
//               const lastSeen = user.lastSeen;

//               return (
//                 <div
//                   key={username}
//                   onClick={() => setOtherUser(username)}
//                   className="flex items-center gap-3 p-2.5 rounded-xl cursor-pointer hover:bg-white border-2 border-transparent hover:border-blue-100 transition-all"
//                 >
//                   <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">
//                     {username[0].toUpperCase()}
//                   </div>
//                   <div className="flex-1">
//                     <div className="text-sm font-bold text-gray-700">{username}</div>
//                     <div className="text-[10px] text-gray-400 uppercase font-bold">
//                       {onlineUsers.includes(username) ? (
//                         <span className="text-green-500">Online</span>
//                       ) : (
//                         `Last seen: ${formatLastSeen(lastSeen)}`
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}

//             {discoverUsers.length === 0 && <p className="text-[10px] text-gray-400 italic">No new users found</p>}
//           </div>
//         </div>
//       </div>
//     </div >
//   );
// }

"use client";
import { useState, useMemo, useEffect } from "react";

interface SidebarProps {
  currentUser: string;
  otherUser: string | null;
  setOtherUser: (user: string) => void;
  chatList: any[];
  allUsers: any[];
  onlineUsers: string[];
  onLogout: () => void;
  socket: any;
}

export default function Sidebar({
  currentUser, otherUser, setOtherUser, chatList, allUsers, onlineUsers, onLogout, socket
}: SidebarProps) {
  const [localChatList, setLocalChatList] = useState(chatList);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => { setLocalChatList(chatList); }, [chatList]);

  useEffect(() => {
    if (!socket) return;
    const handleNewMessageSidebar = (msg: any) => {
      setLocalChatList((prev) => {
        const filtered = prev.filter(m => {
          const p1 = m.senderId === currentUser ? m.receiverId : m.senderId;
          const p2 = msg.senderId === currentUser ? msg.receiverId : msg.senderId;
          return p1 !== p2;
        });
        return [msg, ...filtered];
      });
    };
    socket.on("receive-message", handleNewMessageSidebar);
    return () => { socket.off("receive-message", handleNewMessageSidebar); };
  }, [socket, currentUser]);

  const isImageUrl = (msg: any) => {
    return msg.messageType === 'image' || (msg.message && (msg.message.includes("cloudinary.com") || msg.message.match(/\.(jpeg|jpg|gif|png|webp)/i)));
  };

  const { recentChats, discoverUsers, unreadCounts } = useMemo(() => {
    const counts: Record<string, number> = {};
    const lastMsgs: Record<string, any> = {};

    (localChatList || []).forEach((msg) => {
      if (!msg) return;
      const partner = msg.senderId === currentUser ? msg.receiverId : msg.senderId;
      if (!lastMsgs[partner] || new Date(lastMsgs[partner].createdAt) < new Date(msg.createdAt)) {
        lastMsgs[partner] = msg;
      }
      if (msg.receiverId === currentUser && msg.readStatus === false && partner !== otherUser) {
        counts[partner] = (counts[partner] || 0) + 1;
      }
    });

    const sortedRecent = Object.values(lastMsgs)
      .filter((chat: any) => {
        const partner = chat.senderId === currentUser ? chat.receiverId : chat.senderId;
        return partner?.toLowerCase().includes(searchTerm.toLowerCase());
      })
      .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // --- FIX: Logic for Discover People ---
    const discover = (allUsers || []).filter((u: any) => {
      if (!u) return false; // Prevents null error
      const name = typeof u === 'string' ? u : u.username;
      if (!name || name === currentUser) return false;

      const hasChatted = !!lastMsgs[name];
      const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase());

      return !hasChatted && matchesSearch;
    });

    // Logs inside useMemo scope
    console.log("All Users from Server:", allUsers);
    console.log("Recent Chats Partners:", Object.keys(lastMsgs));

    return { recentChats: sortedRecent, discoverUsers: discover, unreadCounts: counts };
  }, [localChatList, allUsers, currentUser, searchTerm, otherUser]);

  const formatLastSeen = (date: any) => {
    if (!date) return "Offline";
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).toLowerCase();
  };

  return (
    <div className="w-1/4 bg-blue-50 border-r flex flex-col h-full p-4 shadow-inner">
      <div className="mb-4 flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-black text-blue-700">Chats</h2>
          <p className="text-[10px] font-bold text-gray-500 uppercase">User: {currentUser}</p>
        </div>
        <button onClick={onLogout} className="text-[10px] font-bold text-red-500 hover:bg-red-50 px-2 py-1 rounded-md border border-red-100 uppercase transition-all">Logout</button>
      </div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2.5 bg-white border-2 border-blue-100 rounded-xl text-xs outline-none focus:border-blue-400 mb-4"
      />
      <div className="flex-1 overflow-y-auto space-y-6">
        <div>
          <h4 className="text-[11px] font-extrabold text-gray-400 uppercase mb-3">Recent</h4>
          {recentChats.map((chat: any) => {
            const partner = chat.senderId === currentUser ? chat.receiverId : chat.senderId;
            const isOnline = onlineUsers.includes(partner);
            const messageTime = chat.createdAt
              ? new Date(chat.createdAt).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
              }).toLowerCase()
              : "";

            return (
              <div
                key={partner} onClick={() =>
                  setOtherUser(partner)}
                className={`px-2 py-1.5 rounded-2xl cursor-pointer mb-2 border-2 transition-all 
              ${otherUser === partner ? "bg-white border-blue-500 shadow-sm" : "bg-transparent border-gray-200"}`
                }>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-700 flex items-center gap-1">
                    {partner}
                    <span className={`${isOnline ? "text-green-500" : "text-gray-400"} text-[14px]`}>●</span>
                  </span>
                  {unreadCounts[partner] > 0 && <span className="bg-red-500 text-white text-[10px] px-1.5 rounded-full">{unreadCounts[partner]}</span>}
                </div>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-[11px] truncate text-gray-400 w-2/3">
                    {isImageUrl(chat) ? "📷 Photo" : chat.message}
                  </p>
                  <p className="text-[9px] text-gray-400 font-medium">
                    {messageTime}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8">
          <h4 className="text-[11px] font-extrabold text-gray-400 uppercase mb-3">Discover People</h4>
          <div className="space-y-2">
            {discoverUsers.map((user: any) => {
              const username = typeof user === 'string' ? user : user.username;
              const lastSeen = user.lastSeen;

              return (
                <div
                  key={username}
                  onClick={() => setOtherUser(username)}
                  className="flex items-center gap-3 p-2.5 rounded-xl cursor-pointer hover:bg-white border-2 border-transparent hover:border-blue-100 transition-all"
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">
                    {username[0].toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-gray-700">{username}</div>
                    <div className="text-[10px] text-gray-400 uppercase font-bold">
                      {onlineUsers.includes(username) ? (
                        <span className="text-green-500">Online</span>
                      ) : (
                        `Last seen: ${formatLastSeen(lastSeen)}`
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            {discoverUsers.length === 0 && <p className="text-[10px] text-gray-400 italic">No new users found</p>}
          </div>
        </div>
      </div>
    </div>
  );
}