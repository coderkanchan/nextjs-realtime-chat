
// export default function Sidebar({
//   currentUser,
//   otherUser,
//   setOtherUser,
//   chatList,
//   allUsers,
//   onLogout,
//   loggingOut, // ⭐ EXTRA PRO TIP
// }: any) {
//   const newUsers = (allUsers || []).filter(
//     (id: string) =>
//       id !== currentUser &&
//       !(chatList || []).some((p: any) => p.id === id)
//   );

//   return (
//     <div className="w-1/4 bg-white border-r shadow-md rounded-l-xl p-4 flex flex-col h-full">
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-xl font-bold text-blue-700">Chats</h3>

//         {/* ✅ PROFESSIONAL LOGOUT */}
//         <button
//           onClick={onLogout}
//           disabled={loggingOut}
//           className="text-xs text-red-500 font-bold hover:underline disabled:opacity-50 cursor-pointer"
//         >
//           {loggingOut ? "Logging out..." : "LOGOUT"}
//         </button>
//       </div>

//       <p className="text-xs mb-4 text-gray-500 font-mono">
//         User: {currentUser}
//       </p>

//       <div className="flex-1 overflow-y-auto">
//         <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">
//           Recent
//         </h4>

//         {chatList?.map((p: any) => (
//           <div
//             key={p.id}
//             onClick={() => setOtherUser(p.id)}
//             className={`p-3 rounded-lg cursor-pointer mb-1 ${otherUser === p.id ? "bg-blue-100" : "hover:bg-gray-50"
//               }`}
//           >
//             <p className="font-semibold text-black">{p.id}</p>
//             <p className="text-xs text-gray-400 truncate">
//               {p.lastMessage}
//             </p>
//           </div>
//         ))}

//         <h4 className="text-xs font-bold text-gray-400 uppercase mt-4 mb-2">
//           All Users
//         </h4>

//         {newUsers.map((id: string) => (
//           <div
//             key={id}
//             onClick={() => setOtherUser(id)}
//             className={`p-3 rounded-lg cursor-pointer mb-1 ${otherUser === id ? "bg-blue-100" : "hover:bg-gray-50"
//               }`}
//           >
//             <p className="font-semibold text-blue-600">{id}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }









// export default function Sidebar({
//   currentUser,
//   otherUser,
//   setOtherUser,
//   chatList,
//   allUsers,
//   onLogout,
//   loggingOut,
// }: any) {
//   const newUsers = (allUsers || []).filter(
//     (id: string) =>
//       id !== currentUser &&
//       !(chatList || []).some(
//         (p: any) =>
//           p.senderId === id || p.receiverId === id
//       )
//   );

//   return (
//     <div className="w-1/4 bg-blue-100 border-r shadow-md rounded-l-xl p-4 flex flex-col h-full">
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-3xl font-bold text-blue-700">Chats</h3>

//         <button
//           onClick={onLogout}
//           disabled={loggingOut}
//           className="text-base bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-lg text-red-500 font-bold hover:underline disabled:opacity-50 cursor-pointer"
//         >
//           {loggingOut ? "Logging out..." : "LOGOUT"}
//         </button>
//       </div>

//       <p className="text-lg mb-4 text-gray-600 font-semibold font-mono bg-gray-200 p-3 rounded-lg border-2 border-gray-400">
//         User: {currentUser}
//       </p>

//       <div className="flex-1 space-y-2 overflow-y-auto bg-gray-200 rounded-lg py-5 px-2">

//         <div className="bg-blue-100 py-3 px-2 border-2 border-blue-300 rounded-lg">
//           <h4 className="text-lg font-bold text-gray-500 uppercase ">
//             Recent Chats
//           </h4>

//           {chatList?.map((p: any) => {
//             const chatPartner =
//               p.senderId === currentUser ? p.receiverId : p.senderId;

//             return (
//               <div
//                 key={p._id}
//                 onClick={() => setOtherUser(chatPartner)}
//                 className={`p-3 rounded-lg cursor-pointer my-1 ${otherUser === chatPartner
//                   ? "bg-blue-100"
//                   : "hover:bg-blue-200"
//                   }`}
//               >
//                 <p className="font-semibold text-black">{chatPartner}</p>
//                 <p className="text-xs text-gray-400 truncate">
//                   {p.message}
//                 </p>
//               </div>
//             );
//           })}
//         </div>

//         <div className="bg-blue-100 py-3 px-2 border-2 border-blue-300 rounded-lg">
//           <h4 className="text-lg font-bold text-gray-500 uppercase  mb-2 broder-2 border-blue-700 bg-blue-100 ">
//             All Users
//           </h4>

//           {newUsers.map((id: string) => (
//             <div
//               key={id}
//               onClick={() => setOtherUser(id)}
//               className={`py-3 px-1 rounded-lg cursor-pointer mb-1 
//                 ${otherUser === id ? "bg-blue-200" : "hover:bg-blue-200"}
//                 `}
//             >
//               <p className="font-bold text-blue-700 text-xl">{id}</p>
//             </div>
//           ))}
//         </div>

//       </div>
//     </div>
//   );
// }
// //  ${otherUser === id ? "bg-blue-300" : "hover:bg-gray-300"}













// export default function Sidebar({
//   currentUser,
//   otherUser,
//   setOtherUser,
//   chatList,
//   allUsers,
//   onLogout,
//   loggingOut,
// }: any) {
//   // ✅ FIX: Recent chats ko user-wise unique banaya (latest message only)
//   const recentChats = Object.values(
//     (chatList || []).reduce((acc: any, msg: any) => {
//       const partner =
//         msg.senderId === currentUser ? msg.receiverId : msg.senderId;

//       if (!acc[partner] || acc[partner].createdAt < msg.createdAt) {
//         acc[partner] = msg;
//       }

//       return acc;
//     }, {})
//   );

//   const newUsers = (allUsers || []).filter(
//     (id: string) =>
//       id !== currentUser &&
//       !(chatList || []).some(
//         (p: any) => p.senderId === id || p.receiverId === id
//       )
//   );

//   return (
//     <div className="w-1/4 bg-blue-100 border-r shadow-md rounded-l-xl p-4 flex flex-col h-full">
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-3xl font-bold text-blue-700">Chats</h3>

//         <button
//           onClick={onLogout}
//           disabled={loggingOut}
//           className="text-base bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-lg text-red-500 font-bold hover:underline disabled:opacity-50 cursor-pointer"
//         >
//           {loggingOut ? "Logging out..." : "LOGOUT"}
//         </button>
//       </div>

//       <p className="text-lg mb-4 text-gray-600 font-semibold font-mono bg-gray-200 p-3 rounded-lg border-2 border-gray-400">
//         User: {currentUser}
//       </p>

//       <div className="flex-1 space-y-2 overflow-y-auto bg-gray-200 rounded-lg py-5 px-2">
//         <div className="bg-blue-100 py-3 px-2 border-2 border-blue-300 rounded-lg">
//           <h4 className="text-lg font-bold text-gray-500 uppercase">
//             Recent Chats
//           </h4>

//           {recentChats.map((p: any) => {
//             const chatPartner =
//               p.senderId === currentUser ? p.receiverId : p.senderId;

//             return (
//               <div
//                 key={p._id}
//                 onClick={() => setOtherUser(chatPartner)}
//                 className={`p-3 rounded-lg cursor-pointer my-1 ${otherUser === chatPartner
//                     ? "bg-blue-200"
//                     : "hover:bg-blue-200"
//                   }`}
//               >
//                 <p className="font-semibold text-black">{chatPartner}</p>
//                 <p className="text-xs text-gray-400 truncate">
//                   {p.message}
//                 </p>
//               </div>
//             );
//           })}
//         </div>

//         <div className="bg-blue-100 py-3 px-2 border-2 border-blue-300 rounded-lg">
//           <h4 className="text-lg font-bold text-gray-500 uppercase mb-2 broder-2 border-blue-700 bg-blue-100">
//             All Users
//           </h4>

//           {newUsers.map((id: string) => (
//             <div
//               key={id}
//               onClick={() => setOtherUser(id)}
//               className={`py-3 px-1 rounded-lg cursor-pointer mb-1 
//                 ${otherUser === id ? "bg-blue-200" : "hover:bg-blue-200"}`}
//             >
//               <p className="font-bold text-blue-700 text-xl">{id}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }







// export default function Sidebar({
//   currentUser,
//   otherUser,
//   setOtherUser,
//   chatList,
//   allUsers,
//   onLogout,
//   loggingOut,
// }: any) {
//   // ✅ FIX: recent chats ko safe & user-wise unique banaya
//   const recentChats = Object.values(
//     (chatList || []).reduce((acc: any, msg: any) => {
//       if (!msg?.senderId || !msg?.receiverId) return acc;

//       const partner =
//         msg.senderId === currentUser ? msg.receiverId : msg.senderId;

//       if (!acc[partner] || acc[partner].createdAt < msg.createdAt) {
//         acc[partner] = msg;
//       }

//       return acc;
//     }, {})
//   );

//   const newUsers = (allUsers || []).filter(
//     (id: string) =>
//       id !== currentUser &&
//       !(chatList || []).some(
//         (p: any) => p.senderId === id || p.receiverId === id
//       )
//   );

//   return (
//     <div className="w-1/4 bg-blue-100 border-r shadow-md rounded-l-xl p-4 flex flex-col h-full">
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-3xl font-bold text-blue-700">Chats</h3>

//         <button
//           onClick={onLogout}
//           disabled={loggingOut}
//           className="text-base bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-lg text-red-500 font-bold hover:underline disabled:opacity-50 cursor-pointer"
//         >
//           {loggingOut ? "Logging out..." : "LOGOUT"}
//         </button>
//       </div>

//       <p className="text-lg mb-4 text-gray-600 font-semibold font-mono bg-gray-200 p-3 rounded-lg border-2 border-gray-400">
//         User: {currentUser}
//       </p>

//       <div className="flex-1 space-y-2 overflow-y-auto bg-gray-200 rounded-lg py-5 px-2">
//         <div className="bg-blue-100 py-3 px-2 border-2 border-blue-300 rounded-lg">
//           <h4 className="text-lg font-bold text-gray-500 uppercase">
//             Recent Chats
//           </h4>

//           {recentChats.map((p: any) => {
//             const chatPartner =
//               p.senderId === currentUser ? p.receiverId : p.senderId;

//             return (
//               <div
//                 key={p._id}
//                 onClick={() => setOtherUser(chatPartner)}
//                 className={`p-3 rounded-lg cursor-pointer my-1 ${otherUser === chatPartner
//                     ? "bg-blue-200"
//                     : "hover:bg-blue-200"
//                   }`}
//               >
//                 <p className="font-semibold text-black">{chatPartner}</p>
//                 <p className="text-xs text-gray-400 truncate">
//                   {p.message}
//                 </p>
//               </div>
//             );
//           })}
//         </div>

//         <div className="bg-blue-100 py-3 px-2 border-2 border-blue-300 rounded-lg">
//           <h4 className="text-lg font-bold text-gray-500 uppercase mb-2">
//             All Users
//           </h4>

//           {newUsers.map((id: string) => (
//             <div
//               key={id}
//               onClick={() => setOtherUser(id)}
//               className={`py-3 px-1 rounded-lg cursor-pointer mb-1 ${otherUser === id ? "bg-blue-200" : "hover:bg-blue-200"
//                 }`}
//             >
//               <p className="font-bold text-blue-700 text-xl">{id}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }








// export default function Sidebar({
//   currentUser,
//   otherUser,
//   setOtherUser,
//   chatList,
//   allUsers,
//   onlineUsers = [],
//   onLogout,
//   loggingOut,
// }: any) {
//   // UNIQUE RECENT CHATS WITH HISTORY PREVIEW
//   const recentChats = Object.values(
//     (chatList || []).reduce((acc: any, msg: any) => {
//       const partner = msg.senderId === currentUser ? msg.receiverId : msg.senderId;
//       if (!acc[partner] || new Date(acc[partner].createdAt) < new Date(msg.createdAt)) {
//         acc[partner] = msg;
//       }
//       return acc;
//     }, {})
//   ).sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

//   // ALL USERS EXCEPT CURRENT
//   const otherUsersList = (allUsers || []).filter((id: string) => id !== currentUser);

//   return (
//     <div className="w-1/4 bg-blue-100 border-r shadow-md rounded-l-xl p-4 flex flex-col h-full">
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-3xl font-bold text-blue-700">Chats</h3>
//         <button
//           onClick={onLogout}
//           disabled={loggingOut}
//           className="text-sm bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-lg text-red-500 font-bold disabled:opacity-50"
//         >
//           {loggingOut ? "..." : "LOGOUT"}
//         </button>
//       </div>

//       <p className="text-sm mb-4 text-gray-600 font-mono bg-gray-200 p-2 rounded border border-gray-400">
//         User: <span className="font-bold">{currentUser}</span>
//       </p>

//       <div className="flex-1 space-y-4 overflow-y-auto">
//         {/* RECENT CHATS SECTION */}
//         <div>
//           <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Recent Chats</h4>
//           {recentChats.map((p: any) => {
//             const chatPartner = p.senderId === currentUser ? p.receiverId : p.senderId;
//             const isOnline = onlineUsers.includes(chatPartner);
//             return (
//               <div
//                 key={p._id}
//                 onClick={() => setOtherUser(chatPartner)}
//                 className={`p-3 rounded-lg cursor-pointer mb-1 relative border border-transparent ${otherUser === chatPartner ? "bg-blue-300 border-blue-400" : "bg-white hover:bg-blue-50"
//                   }`}
//               >
//                 <div className="flex justify-between items-center">
//                   <p className="font-semibold text-black">{chatPartner}</p>
//                   {isOnline && <span className="w-2.5 h-2.5 bg-green-500 rounded-full border border-white"></span>}
//                 </div>
//                 <p className="text-xs text-gray-400 truncate">{p.message}</p>
//               </div>
//             );
//           })}
//         </div>

//         {/* ALL USERS / ONLINE SECTION */}
//         <div>
//           <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">All Users</h4>
//           {otherUsersList.map((id: string) => {
//             const isOnline = onlineUsers.includes(id);
//             return (
//               <div
//                 key={id}
//                 onClick={() => setOtherUser(id)}
//                 className={`p-3 rounded-lg cursor-pointer mb-1 flex items-center gap-2 ${otherUser === id ? "bg-blue-300" : "bg-gray-50 hover:bg-blue-50"
//                   }`}
//               >
//                 <div className={`w-2 h-2 rounded-full ${isOnline ? "bg-green-500" : "bg-gray-300"}`}></div>
//                 <p className="font-bold text-blue-700">{id}</p>
//               </div>
//             )
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }










// export default function Sidebar({
//   currentUser,
//   otherUser,
//   setOtherUser,
//   chatList,
//   allUsers,
//   onlineUsers = [],
//   onLogout,
//   loggingOut,
// }: any) {

//   // 1. Get unique partners from chatList (History)
//   const recentChats = Object.values(
//     (chatList || []).reduce((acc: any, msg: any) => {
//       const partner = msg.senderId === currentUser ? msg.receiverId : msg.senderId;
//       if (!acc[partner] || new Date(acc[partner].createdAt) < new Date(msg.createdAt)) {
//         acc[partner] = msg;
//       }
//       return acc;
//     }, {})
//   ).sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

//   // 2. Identify who we have already chatted with
//   const chattedWithSet = new Set(recentChats.map((c: any) =>
//     c.senderId === currentUser ? c.receiverId : c.senderId
//   ));

//   // 3. Filter "All Users" to ONLY show people we haven't chatted with yet
//   const newPotentialUsers = (allUsers || []).filter(
//     (id: string) => id !== currentUser && !chattedWithSet.has(id)
//   );

//   return (
//     <div className="w-1/4 bg-blue-100 border-r shadow-md rounded-l-xl p-4 flex flex-col h-full">
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-3xl font-bold text-blue-700">Chats</h3>
//         <button
//           onClick={onLogout}
//           disabled={loggingOut}
//           className="cursor-pointer text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded text-red-500 font-bold"
//         >
//           {loggingOut ? "..." : "LOGOUT"}
//         </button>
//       </div>

//       <p className="text-sm mb-4 text-gray-600 font-mono bg-gray-200 p-2 rounded border border-gray-400">
//         User: <span className="font-bold">{currentUser}</span>
//       </p>


//       <div className="flex-1 space-y-4 overflow-y-auto">
//         {/* RECENT CHATS SECTION */}
//         <div>
//           <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Recent Chats</h4>
//           {recentChats.length === 0 && <p className="text-xs text-gray-400 italic px-2">No history</p>}
//           {recentChats.map((p: any) => {
//             const chatPartner = p.senderId === currentUser ? p.receiverId : p.senderId;
//             const isOnline = onlineUsers.includes(chatPartner);
//             return (
//               <div
//                 key={p._id || chatPartner}
//                 onClick={() => setOtherUser(chatPartner)}
//                 className={`p-3 rounded-lg cursor-pointer mb-1 border-2 ${otherUser === chatPartner ? "bg-blue-200 border-blue-400" : "bg-white border-transparent hover:bg-blue-50"
//                   }`}
//               >
//                 <div className="flex justify-between items-center">
//                   <p className="font-semibold text-black">{chatPartner}</p>
//                   {isOnline && <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>}
//                 </div>
//                 <p className="text-xs text-gray-500 truncate">{p.message}</p>
//               </div>
//             );
//           })}
//         </div>

//         {/* ALL USERS (Only New People) */}
//         <div>
//           <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Discover New Users</h4>
//           {newPotentialUsers.length === 0 && <p className="text-xs text-gray-400 italic px-2">No new users</p>}
//           {newPotentialUsers.map((id: string) => {
//             const isOnline = onlineUsers.includes(id);
//             return (
//               <div
//                 key={id}
//                 onClick={() => setOtherUser(id)}
//                 className={`p-3 rounded-lg cursor-pointer mb-1 flex items-center gap-2 border-2 ${otherUser === id ? "bg-blue-200 border-blue-400" : "bg-gray-200 border-transparent hover:bg-blue-300"
//                   }`}
//               >
//                 <div className={`w-2 h-2 rounded-full ${isOnline ? "bg-green-500" : "bg-gray-400"}`}></div>
//                 <p className="font-bold text-blue-700">{id}</p>
//               </div>
//             )
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }





// "use client";

// export default function Sidebar({ currentUser, otherUser, setOtherUser, chatList, allUsers, onlineUsers }) {

//   // 1. History Partners (Unique)
//   const recentChats = Object.values(
//     (chatList || []).reduce((acc: any, msg: any) => {
//       const partner = msg.senderId === currentUser ? msg.receiverId : msg.senderId;
//       if (!acc[partner] || new Date(acc[partner].createdAt) < new Date(msg.createdAt)) {
//         acc[partner] = msg;
//       }
//       return acc;
//     }, {})
//   ).sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

//   const chattedWithSet = new Set(recentChats.map((c: any) =>
//     c.senderId === currentUser ? c.receiverId : c.senderId
//   ));

//   // 2. Discover Users (Excluding Self & Already Chatted)
//   const discoverUsers = (allUsers || []).filter(
//     (uid: string) => uid !== currentUser && !chattedWithSet.has(uid)
//   );

//   return (
//     <div className="w-1/4 bg-blue-50 border-r flex flex-col h-full p-4">
//       <div className="mb-6">
//         <h2 className="text-2xl font-bold text-blue-700">Chats</h2>
//         <p className="text-xs text-gray-500 bg-blue-100 p-1 rounded mt-1">Logged as: <b>{currentUser}</b></p>
//       </div>

//       <div className="flex-1 overflow-y-auto space-y-4">
//         {/* Recent Section */}
//         <div>
//           <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Recent</h4>
//           {recentChats.map((chat: any) => {
//             const partner = chat.senderId === currentUser ? chat.receiverId : chat.senderId;
//             const isOnline = onlineUsers.includes(partner);
//             return (
//               <div
//                 key={partner}
//                 onClick={() => setOtherUser(partner)}
//                 className={`p-3 rounded-xl cursor-pointer mb-2 border-2 transition-all ${otherUser === partner ? "bg-white border-blue-400 shadow-sm" : "bg-transparent border-transparent hover:bg-white"
//                   }`}
//               >
//                 <div className="flex justify-between items-center">
//                   <span className="font-semibold text-gray-800">{partner}</span>
//                   {isOnline && <span className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_5px_green]"></span>}
//                 </div>
//                 <p className="text-xs text-gray-500 truncate mt-1">{chat.message}</p>
//               </div>
//             );
//           })}
//         </div>

//         {/* Discover Section */}
//         <div>
//           <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Discover</h4>
//           {discoverUsers.map((uid: string) => (
//             <div
//               key={uid}
//               onClick={() => setOtherUser(uid)}
//               className="p-3 bg-gray-100 rounded-xl cursor-pointer hover:bg-blue-100 mb-2 flex items-center gap-2"
//             >
//               <div className={`w-2 h-2 rounded-full ${onlineUsers.includes(uid) ? "bg-green-500" : "bg-gray-300"}`}></div>
//               <span className="text-sm font-medium text-gray-700">{uid}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }






// "use client";

// interface SidebarProps {
//   currentUser: string;
//   otherUser: string | null;
//   setOtherUser: (user: string) => void;
//   chatList: any[];
//   allUsers: string[];
//   onlineUsers: string[];
// }

// export default function Sidebar({
//   currentUser,
//   otherUser,
//   setOtherUser,
//   chatList,
//   allUsers,
//   onlineUsers
// }: SidebarProps) {

//   // 1. History Partners Logic
//   const recentChats = Object.values(
//     (chatList || []).reduce((acc: any, msg: any) => {
//       const partner = msg.senderId === currentUser ? msg.receiverId : msg.senderId;
//       if (!acc[partner] || new Date(acc[partner].createdAt) < new Date(msg.createdAt)) {
//         acc[partner] = msg;
//       }
//       return acc;
//     }, {})
//   ).sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

//   const chattedWithSet = new Set(recentChats.map((c: any) =>
//     c.senderId === currentUser ? c.receiverId : c.senderId
//   ));

//   // 2. Discover Users (Self-Filter included)
//   const discoverUsers = (allUsers || []).filter(
//     (uid: string) => uid !== currentUser && !chattedWithSet.has(uid)
//   );

//   return (
//     <div className="w-1/4 bg-blue-50 border-r flex flex-col h-full p-4">
//       <div className="mb-6">
//         <h2 className="text-2xl font-bold text-blue-700">Chats</h2>
//         <p className="text-[10px] text-gray-500 bg-blue-100 p-1 rounded mt-1 inline-block">
//           Logged as: <b>{currentUser}</b>
//         </p>
//       </div>

//       <div className="flex-1 overflow-y-auto space-y-4">
//         <div>
//           <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Recent</h4>
//           {recentChats.map((chat: any) => {
//             const partner = chat.senderId === currentUser ? chat.receiverId : chat.senderId;
//             return (
//               <div
//                 key={partner}
//                 onClick={() => setOtherUser(partner)}
//                 className={`p-3 rounded-xl cursor-pointer mb-2 border-2 transition-all ${otherUser === partner ? "bg-white border-blue-400" : "bg-transparent border-transparent hover:bg-white"
//                   }`}
//               >
//                 <div className="flex justify-between items-center">
//                   <span className="font-semibold text-gray-800">{partner}</span>
//                   {onlineUsers.includes(partner) && <span className="w-2 h-2 bg-green-500 rounded-full"></span>}
//                 </div>
//                 <p className="text-xs text-gray-500 truncate mt-1">{chat.message}</p>
//               </div>
//             );
//           })}
//         </div>

//         <div>
//           <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Discover</h4>
//           {discoverUsers.map((uid: string) => (
//             <div
//               key={uid}
//               onClick={() => setOtherUser(uid)}
//               className="p-3 bg-gray-100 rounded-xl cursor-pointer hover:bg-blue-100 mb-2 flex items-center gap-2"
//             >
//               <div className={`w-2 h-2 rounded-full ${onlineUsers.includes(uid) ? "bg-green-500" : "bg-gray-300"}`}></div>
//               <span className="text-sm font-medium text-gray-700">{uid}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }









// "use client";

// interface SidebarProps {
//   currentUser: string;
//   otherUser: string | null;
//   setOtherUser: (user: string) => void;
//   chatList: any[];
//   allUsers: string[];
//   onlineUsers: string[];
//   onLogout: () => void;
// }

// export default function Sidebar({
//   currentUser, otherUser, setOtherUser, chatList, allUsers, onlineUsers, onLogout
// }: SidebarProps) {

//   // 1. Unique Recent Chats Logic
//   const recentChats = Object.values(
//     (chatList || []).reduce((acc: any, msg: any) => {
//       const partner = msg.senderId === currentUser ? msg.receiverId : msg.senderId;
//       if (!acc[partner] || new Date(acc[partner].createdAt) < new Date(msg.createdAt)) {
//         acc[partner] = msg;
//       }
//       return acc;
//     }, {})
//   ).sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

//   const chattedWithSet = new Set(recentChats.map((c: any) =>
//     c.senderId === currentUser ? c.receiverId : c.senderId
//   ));

//   // 2. Filter: No self-chat, no existing chats in Discover
//   const discoverUsers = (allUsers || []).filter(
//     (uid: string) => uid !== currentUser && !chattedWithSet.has(uid)
//   );

//   return (
//     <div className="w-1/4 bg-blue-50 border-r flex flex-col h-full p-4">
//       <div className="mb-6 flex justify-between items-start">
//         <div>
//           <h2 className="text-2xl font-bold text-blue-700">Chats</h2>
//           <p className="text-[10px] text-gray-500 bg-blue-100 p-1 rounded mt-1 inline-block">
//             User: <b>{currentUser}</b>
//           </p>
//         </div>
//         <button onClick={onLogout} className="text-[10px] font-bold text-red-500 hover:bg-red-50 px-2 py-1 rounded border border-red-200">
//           LOGOUT
//         </button>
//       </div>

//       <div className="flex-1 overflow-y-auto space-y-4">
//         <div>
//           <h4 className="text-[10px] font-bold text-gray-400 uppercase mb-2">Recent</h4>
//           {recentChats.map((chat: any) => {
//             const partner = chat.senderId === currentUser ? chat.receiverId : chat.senderId;
//             return (
//               <div key={partner} onClick={() => setOtherUser(partner)}
//                 className={`p-3 rounded-xl cursor-pointer mb-2 border-2 transition-all ${otherUser === partner ? "bg-white border-blue-400 shadow-sm" : "bg-transparent border-transparent hover:bg-white"
//                   }`}>
//                 <div className="flex justify-between items-center">
//                   <span className="font-semibold text-gray-800">{partner}</span>
//                   {onlineUsers.includes(partner) && <span className="w-2 h-2 bg-green-500 rounded-full"></span>}
//                 </div>
//                 <p className="text-xs text-gray-500 truncate mt-1">{chat.message}</p>
//               </div>
//             );
//           })}
//         </div>

//         <div>
//           <h4 className="text-[10px] font-bold text-gray-400 uppercase mb-2">Discover</h4>
//           {discoverUsers.map((uid: string) => (
//             <div key={uid} onClick={() => setOtherUser(uid)}
//               className="p-3 bg-gray-100 rounded-xl cursor-pointer hover:bg-blue-100 mb-2 flex items-center gap-2">
//               <div className={`w-2 h-2 rounded-full ${onlineUsers.includes(uid) ? "bg-green-500" : "bg-gray-300"}`}></div>
//               <span className="text-sm font-medium text-gray-700">{uid}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }








// "use client";

// interface SidebarProps {
//   currentUser: string;
//   otherUser: string | null;
//   setOtherUser: (user: string) => void;
//   chatList: any[];
//   allUsers: string[];
//   onlineUsers: string[];
//   onLogout: () => void;
// }

// export default function Sidebar({
//   currentUser, otherUser, setOtherUser, chatList, allUsers, onlineUsers, onLogout
// }: SidebarProps) {

//   // 1. Sirf un logo ki list jinse pehle chat ho chuki hai (Recent Chats)
//   const recentChats = Object.values(
//     (chatList || []).reduce((acc: any, msg: any) => {
//       const partner = msg.senderId === currentUser ? msg.receiverId : msg.senderId;
//       if (!acc[partner] || new Date(acc[partner].createdAt) < new Date(msg.createdAt)) {
//         acc[partner] = msg;
//       }
//       return acc;
//     }, {})
//   ).sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

//   const chattedWithSet = new Set(recentChats.map((c: any) =>
//     c.senderId === currentUser ? c.receiverId : c.senderId
//   ));

//   // 2. DISCOVER: Sirf naye users jo database mein hain par jinse chat NAHI hui
//   // Aur isme aapka apna naam (currentUser) filter out kar diya gaya hai
//   const discoverUsers = (allUsers || []).filter(
//     (uid: string) => uid !== currentUser && !chattedWithSet.has(uid)
//   );

//   return (
//     <div className="w-1/4 bg-blue-50 border-r flex flex-col h-full p-4 shadow-inner">
//       <div className="mb-6 flex justify-between items-start">
//         <div>
//           <h2 className="text-2xl font-black text-blue-700 tracking-tight">Chats</h2>
//           <div className="flex items-center gap-1 mt-1">
//             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//             <p className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">
//               {currentUser} (Online)
//             </p>
//           </div>
//         </div>
//         <button onClick={onLogout} className="text-[10px] font-bold text-red-500 hover:bg-red-100 px-3 py-1 rounded-full border border-red-200 transition-all uppercase">
//           Logout
//         </button>
//       </div>

//       <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
//         {/* RECENT CHATS SECTION */}
//         {recentChats.length > 0 && (
//           <div>
//             <h4 className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-3 px-1">Recent Conversations</h4>
//             {recentChats.map((chat: any) => {
//               const partner = chat.senderId === currentUser ? chat.receiverId : chat.senderId;
//               const isOnline = onlineUsers.includes(partner);
//               return (
//                 <div key={partner} onClick={() => setOtherUser(partner)}
//                   className={`group p-3 rounded-2xl cursor-pointer mb-2 border-2 transition-all duration-200 ${otherUser === partner ? "bg-white border-blue-500 shadow-md scale-[1.02]" : "bg-transparent border-transparent hover:bg-white hover:shadow-sm"
//                     }`}>
//                   <div className="flex justify-between items-center">
//                     <span className={`font-bold ${otherUser === partner ? "text-blue-700" : "text-gray-700 group-hover:text-blue-600"}`}>{partner}</span>
//                     {isOnline && <span className="w-2.5 h-2.5 bg-green-500 rounded-full ring-4 ring-blue-50"></span>}
//                   </div>
//                   <p className="text-xs text-gray-400 truncate mt-1 font-medium">{chat.message}</p>
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         {/* DISCOVER SECTION: Professionals mein ye tabhi dikhta hai jab koi naya mile */}
//         {discoverUsers.length > 0 && (
//           <div>
//             <h4 className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-3 px-1">Discover People</h4>
//             {discoverUsers.map((uid: string) => (
//               <div key={uid} onClick={() => setOtherUser(uid)}
//                 className="p-3 bg-gray-100/50 rounded-2xl cursor-pointer hover:bg-blue-100 hover:scale-[1.02] mb-2 flex items-center justify-between transition-all group">
//                 <div className="flex items-center gap-3">
//                   <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 font-bold text-xs uppercase">
//                     {uid.charAt(0)}
//                   </div>
//                   <span className="text-sm font-bold text-gray-600 group-hover:text-blue-700">{uid}</span>
//                 </div>
//                 {onlineUsers.includes(uid) && <div className="w-2 h-2 bg-green-400 rounded-full"></div>}
//               </div>
//             ))}
//           </div>
//         )}

//         {recentChats.length === 0 && discoverUsers.length === 0 && (
//           <div className="text-center py-10">
//             <p className="text-xs text-gray-400 font-bold italic">No users found in database.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }






// "use client";

// interface SidebarProps {
//   currentUser: string;
//   otherUser: string | null;
//   setOtherUser: (user: string) => void;
//   chatList: any[];
//   allUsers: string[];
//   onlineUsers: string[];
//   onLogout: () => void;
// }

// export default function Sidebar({
//   currentUser, otherUser, setOtherUser, chatList, allUsers, onlineUsers, onLogout
// }: SidebarProps) {

//   // 1. Recent Chats: Jinse pehle baat ho chuki hai
//   const recentChats = Object.values(
//     (chatList || []).reduce((acc: any, msg: any) => {
//       const partner = msg.senderId === currentUser ? msg.receiverId : msg.senderId;
//       if (!acc[partner] || new Date(acc[partner].createdAt) < new Date(msg.createdAt)) {
//         acc[partner] = msg;
//       }
//       return acc;
//     }, {})
//   ).sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

//   const chattedWithSet = new Set(recentChats.map((c: any) =>
//     c.senderId === currentUser ? c.receiverId : c.senderId
//   ));

//   // 2. ✅ PROFESSIONAL LOGIC: "Who is Online Now"
//   // Hum un users ko filter kar rahe hain jo:
//   // - Online hain (onlineUsers include them)
//   // - Aap khud nahi ho (uid !== currentUser)
//   // - Jinse abhi tak chat nahi shuru hui (!chattedWithSet.has(uid))
//   const onlineDiscover = (allUsers || []).filter(
//     (uid: string) =>
//       onlineUsers.includes(uid) &&
//       uid !== currentUser &&
//       !chattedWithSet.has(uid)
//   );

//   return (
//     <div className="w-1/4 bg-blue-50 border-r flex flex-col h-full p-4 shadow-inner">
//       <div className="mb-6 flex justify-between items-start">
//         <div>
//           <h2 className="text-2xl font-black text-blue-700 tracking-tight">Chats</h2>
//           <div className="flex items-center gap-1 mt-1">
//             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//             <p className="text-[10px] font-bold text-gray-800 uppercase tracking-tighter">
//               {currentUser}
//             </p>
//           </div>
//         </div>
//         <button onClick={onLogout} className="text-[10px] font-bold text-red-500 hover:bg-red-100 px-3 py-1 rounded-full border border-red-200 transition-all uppercase">
//           Logout
//         </button>
//       </div>

//       <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
//         {/* RECENT CONVERSATIONS */}
//         {recentChats.length > 0 && (
//           <div>
//             <h4 className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-3 px-1">Recent</h4>
//             {recentChats.map((chat: any) => {
//               const partner = chat.senderId === currentUser ? chat.receiverId : chat.senderId;
//               const isOnline = onlineUsers.includes(partner);
//               return (
//                 <div key={partner} onClick={() => setOtherUser(partner)}
//                   className={`group p-3 rounded-2xl cursor-pointer mb-2 border-2 transition-all duration-200 ${otherUser === partner ? "bg-white border-blue-500 shadow-md scale-[1.02]" : "bg-transparent border-transparent hover:bg-white hover:shadow-sm"
//                     }`}>
//                   <div className="flex justify-between items-center">
//                     <span className={`font-bold ${otherUser === partner ? "text-blue-700" : "text-gray-700 group-hover:text-blue-600"}`}>{partner}</span>
//                     {isOnline && <span className="w-2.5 h-2.5 bg-green-500 rounded-full ring-4 ring-blue-50"></span>}
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <p className="text-xs text-gray-400 truncate mt-1 font-medium">{chat.message}</p>

//                     <span className="text-[10px]  text-gray-400 font-bold">
//                       {chat.createdAt ? new Date(chat.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}
//                     </span>
//                   </div>
//                 </div>
//               );
//             })}
//            </div>
//         )}

//         {/* ✅ ONLINE NOW SECTION (Only shows people who are actually logged in) */}
//         <div>
//           <h4 className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-3 px-1">Online Now</h4>
//           {onlineDiscover.length > 0 ? (
//             onlineDiscover.map((uid: string) => (
//               <div key={uid} onClick={() => setOtherUser(uid)}
//                 className="p-3 bg-white/50 rounded-2xl cursor-pointer hover:bg-blue-100 hover:scale-[1.02] mb-2 flex items-center justify-between transition-all group border border-dashed border-blue-200">
//                 <div className="flex items-center gap-3">
//                   <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-xs uppercase border border-green-200">
//                     {uid.charAt(0)}
//                   </div>
//                   <span className="text-sm font-bold text-gray-600 group-hover:text-blue-700">{uid}</span>
//                 </div>
//                 <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_5px_#22c55e]"></div>
//               </div>
//             ))
//           ) : (
//             <p className="text-[10px] text-gray-400 italic px-1">No other users online</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }







// "use client";

// interface SidebarProps {
//   currentUser: string;
//   otherUser: string | null;
//   setOtherUser: (user: string) => void;
//   chatList: any[];
//   allUsers: string[];
//   onlineUsers: string[];
//   onLogout: () => void;
// }

// export default function Sidebar({
//   currentUser, otherUser, setOtherUser, chatList, allUsers, onlineUsers, onLogout
// }: SidebarProps) {

//   const recentChats = Object.values(
//     (chatList || []).reduce((acc: any, msg: any) => {
//       const partner = msg.senderId === currentUser ? msg.receiverId : msg.senderId;
//       if (!acc[partner] || new Date(acc[partner].createdAt) < new Date(msg.createdAt)) {
//         acc[partner] = msg;
//       }
//       return acc;
//     }, {})
//   ).sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

//   const chattedWithSet = new Set(recentChats.map((c: any) =>
//     c.senderId === currentUser ? c.receiverId : c.senderId
//   ));

//   // ✅ ONLINE LOGIC
//   const onlineDiscover = (allUsers || []).filter(
//     (uid: string) => onlineUsers.includes(uid) && uid !== currentUser && !chattedWithSet.has(uid)
//   );

//   // ✅ OFFLINE/ALL USERS LOGIC (Taaki list khali na dikhe)
//   const otherAvailableUsers = (allUsers || []).filter(
//     (uid: string) => uid !== currentUser && !chattedWithSet.has(uid) && !onlineUsers.includes(uid)
//   );

//   return (
//     <div className="w-1/4 bg-blue-50 border-r flex flex-col h-full p-4 shadow-inner">
//       <div className="mb-6 flex justify-between items-start">
//         <div>
//           <h2 className="text-2xl font-black text-blue-700 tracking-tight">Chats</h2>
//           <div className="flex items-center gap-1 mt-1">
//             {/* Green dot tabhi pulse karega jab currentUser backend se aa jayega */}
//             <span className="text-gray-500  text-lg">User:</span>
//             <div className={`w-2 h-2 rounded-full ${currentUser ? "bg-green-500 animate-pulse" : "bg-gray-300"}`}></div>
//             <p className="text-[10px] font-bold text-gray-800 uppercase tracking-tighter">
//               {currentUser || "Loading..."}
//             </p>
//           </div>
//         </div>
//         <button onClick={onLogout} className="text-[10px] font-bold text-red-500 hover:bg-red-100 px-3 py-1 rounded-full border border-red-200 transition-all uppercase">
//           Logout
//         </button>
//       </div>

//       <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
//         {/* RECENT CONVERSATIONS */}
//         {recentChats.length > 0 && (
//           <div>
//             <h4 className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-3 px-1">Recent</h4>
//             {recentChats.map((chat: any) => {
//               const partner = chat.senderId === currentUser ? chat.receiverId : chat.senderId;
//               const isOnline = onlineUsers.includes(partner);
//               return (
//                 <div key={partner} onClick={() => setOtherUser(partner)}
//                   className={`group p-3 rounded-2xl cursor-pointer mb-2 border-2 transition-all duration-200 ${otherUser === partner ? "bg-white border-blue-500 shadow-md scale-[1.02]" : "bg-transparent border-transparent hover:bg-white hover:shadow-sm"}`}>
//                   <div className="flex justify-between items-center">
//                     <span className={`font-bold ${otherUser === partner ? "text-blue-700" : "text-gray-700 group-hover:text-blue-600"}`}>{partner}</span>
//                     {isOnline && <span className="w-2.5 h-2.5 bg-green-500 rounded-full ring-4 ring-blue-50"></span>}
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <p className="text-xs text-gray-400 truncate mt-1 font-medium">{chat.message}</p>
//                     <span className="text-[10px] text-gray-400 font-bold">
//                       {chat.createdAt ? new Date(chat.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}
//                     </span>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         {/* ONLINE NOW */}
//         {onlineDiscover.length > 0 && (
//           <div>
//             <h4 className="text-[11px] font-extrabold  uppercase tracking-widest mb-3 px-1 text-green-600">Online Now</h4>
//             {onlineDiscover.map((uid: string) => (
//               <div key={uid} onClick={() => setOtherUser(uid)}
//                 className="p-3 bg-white/50 rounded-2xl cursor-pointer hover:bg-blue-100 mb-2 flex items-center justify-between transition-all border border-dashed border-blue-200">
//                 <div className="flex items-center gap-3">
//                   <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-xs uppercase">{uid.charAt(0)}</div>
//                   <span className="text-sm font-bold text-gray-600">{uid}</span>
//                 </div>
//                 <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_5px_#22c55e]"></div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* DISCOVER (OFFLINE USERS) */}
//         {otherAvailableUsers.length > 0 && (
//           <div>
//             <h4 className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-3 px-1">Discover</h4>
//             {otherAvailableUsers.map((uid: string) => (
//               <div key={uid} onClick={() => setOtherUser(uid)}
//                 className="p-3 bg-white/30 rounded-2xl cursor-pointer hover:bg-blue-100 mb-2 flex items-center gap-3 transition-all border border-transparent">
//                 <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-xs uppercase">{uid.charAt(0)}</div>
//                 <span className="text-sm font-medium text-gray-500">{uid}</span>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }






// "use client";

// interface SidebarProps {
//   currentUser: string;
//   otherUser: string | null;
//   setOtherUser: (user: string) => void;
//   chatList: any[];
//   allUsers: string[];
//   onlineUsers: string[];
//   onLogout: () => void;
// }

// export default function Sidebar({
//   currentUser, otherUser, setOtherUser, chatList, allUsers, onlineUsers, onLogout
// }: SidebarProps) {

//   // 1. Recent Chats logic (Vahi purana logic, bas safe-checks ke saath)
//   const recentChats = Object.values(
//     (chatList || []).reduce((acc: any, msg: any) => {
//       // Logic check: message aur IDs hone chahiye
//       if (!msg || !msg.senderId || !msg.receiverId) return acc;

//       const partner = msg.senderId === currentUser ? msg.receiverId : msg.senderId;

//       // Agar purana message nahi hai ya ye naya message zyada recent hai
//       if (!acc[partner] || new Date(acc[partner].createdAt) < new Date(msg.createdAt)) {
//         acc[partner] = msg;
//       }
//       return acc;
//     }, {})
//   ).sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

//   const chattedWithSet = new Set(recentChats.map((c: any) =>
//     c.senderId === currentUser ? c.receiverId : c.senderId
//   ));

//   // 2. Discover Logic: Vahi logic
//   const discoverUsers = (allUsers || []).filter(
//     (uid: string) => uid !== currentUser && !chattedWithSet.has(uid)
//   );

//   return (
//     <div className="w-1/4 bg-blue-50 border-r flex flex-col h-full p-4 shadow-inner">
//       <div className="mb-6 flex justify-between items-start">
//         <div>
//           <h2 className="text-2xl font-black text-blue-700">Chats</h2>
//           <div className="flex items-center gap-1 mt-1">
//             <div className={`w-2 h-2 rounded-full ${currentUser ? "bg-green-500 animate-pulse" : "bg-gray-300"}`}></div>
//             <p className="text-[10px] font-bold text-gray-800 uppercase">{currentUser || "Loading..."}</p>
//           </div>
//         </div>
//         <button onClick={onLogout} className="text-[10px] font-bold text-red-500 hover:bg-red-100 px-3 py-1 rounded-full border border-red-200 uppercase">Logout</button>
//       </div>

//       <div className="flex-1 overflow-y-auto space-y-6 pr-2">
//         {/* RECENT SECTION */}
//         <div>
//           <h4 className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-3">Recent</h4>
//           {recentChats.length > 0 ? (
//             recentChats.map((chat: any) => {
//               const partner = chat.senderId === currentUser ? chat.receiverId : chat.senderId;
//               const isOnline = (onlineUsers || []).includes(partner);
//               return (
//                 <div key={partner} onClick={() => setOtherUser(partner)}
//                   className={`p-3 rounded-2xl cursor-pointer mb-2 border-2 transition-all ${otherUser === partner ? "bg-white border-blue-500 shadow-md" : "bg-transparent border-transparent hover:bg-white"}`}>
//                   <div className="flex justify-between items-center">
//                     <span className="font-bold text-gray-700">{partner}</span>
//                     {isOnline && <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>}
//                   </div>
//                   <p className="text-xs text-gray-400 truncate mt-1">{chat.message}</p>
//                 </div>
//               );
//             })
//           ) : (
//             <p className="text-[10px] text-gray-400 italic">No recent chats</p>
//           )}
//         </div>

//         {/* DISCOVER SECTION */}
//         <div>
//           <h4 className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-3">Discover</h4>
//           {discoverUsers.length > 0 ? (
//             discoverUsers.map((uid: string) => (
//               <div key={uid} onClick={() => setOtherUser(uid)}
//                 className="p-3 bg-white/50 rounded-2xl cursor-pointer hover:bg-blue-100 mb-2 flex items-center justify-between transition-all border border-blue-100">
//                 <span className="text-sm font-bold text-gray-600">{uid}</span>
//                 {(onlineUsers || []).includes(uid) && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
//               </div>
//             ))
//           ) : (
//             <p className="text-[10px] text-gray-400 italic">No new users</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }










"use client";
import { useState } from "react";

interface SidebarProps {
  currentUser: string;
  otherUser: string | null;
  setOtherUser: (user: string) => void;
  chatList: any[];
  allUsers: string[];
  onlineUsers: string[];
  onLogout: () => void;
}

export default function Sidebar({
  currentUser, otherUser, setOtherUser, chatList, allUsers, onlineUsers, onLogout
}: SidebarProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // 1. Recent Chats logic (Existing logic kept, added search filter)
  const recentChats = Object.values(
    (chatList || []).reduce((acc: any, msg: any) => {
      if (!msg || !msg.senderId || !msg.receiverId) return acc;
      const partner = msg.senderId === currentUser ? msg.receiverId : msg.senderId;
      if (!acc[partner] || new Date(acc[partner].createdAt) < new Date(msg.createdAt)) {
        acc[partner] = msg;
      }
      return acc;
    }, {})
  )
    .filter((chat: any) => {
      const partner = chat.senderId === currentUser ? chat.receiverId : chat.senderId;
      return partner.toLowerCase().includes(searchTerm.toLowerCase());
    })
    .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const chattedWithSet = new Set(recentChats.map((c: any) =>
    c.senderId === currentUser ? c.receiverId : c.senderId
  ));

  // 2. Discover Logic (Existing logic kept, added search filter)
  const discoverUsers = (allUsers || []).filter(
    (uid: string) =>
      uid !== currentUser &&
      !chattedWithSet.has(uid) &&
      uid.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-1/4 bg-blue-50 border-r flex flex-col h-full p-4 shadow-inner">
      <div className="mb-4 flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-black text-blue-700">Chats</h2>
          <div className="flex items-center gap-1 mt-1">
            <div className={`w-2 h-2 rounded-full ${currentUser ? "bg-green-500 animate-pulse" : "bg-gray-300"}`}></div>
            <p className="text-[10px] font-bold text-gray-800 uppercase">{currentUser || "Loading..."}</p>
          </div>
        </div>
        <button onClick={onLogout} className="text-[10px] font-bold text-red-500 hover:bg-red-100 px-3 py-1 rounded-full border border-red-200 uppercase">Logout</button>
      </div>

      {/* SEARCH BAR */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 bg-white border border-blue-200 rounded-lg text-xs outline-none focus:border-blue-500 transition-all text-gray-600"
        />
      </div>

      <div className="flex-1 overflow-y-auto space-y-6 pr-2">
        <div>
          <h4 className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-3">Recent</h4>
          {recentChats.length > 0 ? (
            recentChats.map((chat: any) => {
              const partner = chat.senderId === currentUser ? chat.receiverId : chat.senderId;
              const isOnline = onlineUsers.includes(partner);
              return (
                <div key={partner} onClick={() => setOtherUser(partner)}
                  className={`p-3 rounded-2xl cursor-pointer mb-2 border-2 transition-all ${otherUser === partner ? "bg-white border-blue-500 shadow-md" : "bg-transparent border-transparent hover:bg-white"}`}>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-700">{partner}</span>
                    {isOnline && <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>}
                  </div>
                  <p className="text-xs text-gray-400 truncate mt-1">{chat.message}</p>
                </div>
              );
            })
          ) : (
            <p className="text-[10px] text-gray-400 italic">No results</p>
          )}
        </div>

        <div>
          <h4 className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-3">Discover</h4>
          {discoverUsers.length > 0 ? (
            discoverUsers.map((uid: string) => (
              <div key={uid} onClick={() => setOtherUser(uid)}
                className="p-3 bg-white/50 rounded-2xl cursor-pointer hover:bg-blue-100 mb-2 flex items-center justify-between transition-all border border-blue-100">
                <span className="text-sm font-bold text-gray-600">{uid}</span>
                {onlineUsers.includes(uid) && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
              </div>
            ))
          ) : (
            <p className="text-[10px] text-gray-400 italic">No new users</p>
          )}
        </div>
      </div>
    </div>
  );
}