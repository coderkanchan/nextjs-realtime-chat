"use client";
import { useState, useMemo, useEffect } from "react";

interface SidebarProps {
  currentUser: string;
  otherUser: string | null;
  setOtherUser: (user: string) => void;
  chatList: any[];
  allUsers: string[];
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
        return partner.toLowerCase().includes(searchTerm.toLowerCase());
      })
      .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const discover = allUsers.filter(u => u !== currentUser && !lastMsgs[u] && u.toLowerCase().includes(searchTerm.toLowerCase()));
    return { recentChats: sortedRecent, discoverUsers: discover, unreadCounts: counts };
  }, [localChatList, allUsers, currentUser, searchTerm, otherUser]);

  const formatLastSeen = (date: string) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
            return (
              <div key={partner} onClick={() => setOtherUser(partner)} className={`p-3 rounded-2xl cursor-pointer mb-2 border-2 transition-all ${otherUser === partner ? "bg-white border-blue-500" : "bg-transparent border-gray-300"}`}>

                <div className="flex justify-between items-center">

                  <span className="font-bold text-gray-700">{partner} {onlineUsers.includes(partner) && "●"}</span>
                  {unreadCounts[partner] > 0 && <span className="bg-red-500 text-white text-[10px] px-1.5 rounded-full">{unreadCounts[partner]}</span>}
                </div>
                <p className="text-xs truncate text-gray-400">
                  {isImageUrl(chat) ? "📷 Photo" : chat.message}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-8">
          <h4 className="text-[11px] font-extrabold text-gray-400 uppercase mb-3">Discover People</h4>
          <div className="space-y-2">
            {discoverUsers.map((user: any) => (
              <div
                key={user}
                onClick={() => setOtherUser(user)}
                className="flex items-center gap-3 p-2.5 rounded-xl cursor-pointer hover:bg-white border-2 border-transparent hover:border-blue-100 transition-all"
              >
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">
                  {user[0].toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-gray-700">{user}</div>
                  {/* <div className="text-[10px] text-gray-400 uppercase font-bold">
                    {onlineUsers.includes(user) ? "Online" : "Offline"}
                  </div> */}
                  <div key={user.username} >
                    <div className="text-[10px] text-gray-400 uppercase font-bold">
                      {onlineUsers.includes(user.username) ? (
                        <span className="text-green-500">Online</span>
                      ) : (
                        `Last seen: ${new Date(user.lastSeen).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                      )}
                    </div>
                  </div>
                </div>

              </div>
            ))}
            {discoverUsers.length === 0 && <p className="text-[10px] text-gray-400 italic">No new users found</p>}
          </div>
        </div>
      </div>
    </div >
  );
}