"use client";
import { useEffect, useState, useRef } from "react";
import MessageItem from "./chat/MessageItem";
import MessageInput from "./chat/MessageInput";

export default function ChatWindow({ currentUser, otherUser, socket, onlineUsers, allUsers }: any) {
  const [messages, setMessages] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const roomId = otherUser ? [currentUser, otherUser].sort().join("_") : null;

  useEffect(() => {
    if (!currentUser || !otherUser || !socket) return;
    const fetchHistory = async () => {
      const res = await fetch(`/api/messages/${roomId}`);
      const data = await res.json();
      setMessages(data);
      socket.emit("mark-as-read", { roomId, username: currentUser });
    };
    fetchHistory();
    socket.emit("join-room", roomId);

    socket.on("receive-message", (msg: any) => {
      if (msg.roomId === roomId) {
        setMessages(prev => [...prev, msg]);
        if (msg.receiverId === currentUser) socket.emit("mark-as-read", { roomId, username: currentUser });
      }
    });

    socket.on("message-deleted-everyone", ({ messageId }: { messageId: string }) => {
      setMessages(prev => prev.map(m =>
        m._id === messageId ? { ...m, isDeleted: true, message: "This message was deleted", caption: "" } : m
      ));
    });

    socket.on("display-typing", ({ senderId }: any) => {
      if (senderId === otherUser) setIsTyping(true);
    });

    socket.on("hide-typing", ({ senderId }: any) => {
      if (senderId === otherUser) setIsTyping(false);
    });

    return () => {
      socket.off("receive-message");
      socket.off("message-deleted-everyone");
      socket.off("display-typing");
      socket.off("hide-typing");
    };
  }, [currentUser, otherUser, socket, roomId]);

  useEffect(() => { scrollRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isTyping]);

  const handleSendMessage = (content: string, type: 'text' | 'image', caption?: string) => {
    if (!socket || !roomId) return;
    socket.emit("send-message", {
      roomId, senderId: currentUser, receiverId: otherUser,
      message: content, messageType: type, caption: caption || ""
    });
  };

  const deleteForMe = (id: string) => {
    if (!socket) return;
    socket.emit("delete-for-me", { messageId: id, username: currentUser });

    setMessages(prev => prev.map(m =>
      m._id === id ? { ...m, deletedFor: [...(m.deletedFor || []), currentUser] } : m
    ));
  };

  const deleteForEveryone = (id: string) => {
    if (!socket) return;
    socket.emit("delete-everyone", { messageId: id, roomId });
    setMessages(prev => prev.map(m =>
      m._id === id ? { ...m, isDeleted: true } : m
    ));
  };

  if (!otherUser) return <div className="flex-1 flex items-center justify-center bg-gray-50 text-gray-400 font-bold">Select a user to chat</div>;

  const targetUser = allUsers.find((u: any) =>
    (typeof u === 'string' ? u : u.username) === otherUser
  );

  const isOnline = onlineUsers.includes(otherUser);
  const lastSeenTime = targetUser?.lastSeen;

  const formatLastSeen = (date: any) => {
    if (!date) return "Offline";
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).toLowerCase();
  };

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      <header className="p-3 border-b flex items-center gap-3 bg-white shadow-sm">
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
          {otherUser[0].toUpperCase()}
        </div>
        <div>

          <div className="font-bold text-gray-800">{otherUser}</div>

          <p className="text-[11px] font-medium">
            {isOnline ? (
              isTyping ? (
                <span className="text-blue-500 animate-pulse italic">typing...</span>
              ) : (
                <span className="text-green-500">Online</span>
              )
            ) : (
              <span className="text-gray-400">
                {lastSeenTime ? `last seen today at ${formatLastSeen(lastSeenTime)}` : "Offline"}
              </span>
            )}
          </p>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto p-4 space-y-1 bg-[#f0f2f5]">
        {messages.map((m, i) => (
          <MessageItem
            key={m._id || i}
            m={m}
            currentUser={currentUser}
            onDeleteMe={deleteForMe}
            onDeleteEveryone={deleteForEveryone}
          />
        ))}
        {isTyping && (
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-white px-4 py-2 rounded-2xl rounded-tl-none shadow-sm text-xs text-gray-500 italic flex items-center gap-1">
              {otherUser} is typing
              <span className="flex gap-0.5"><span className="animate-bounce">.</span><span className="animate-bounce [animation-delay:0.2s]">.</span><span className="animate-bounce [animation-delay:0.4s]">.</span></span>
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>
      <MessageInput
        onSendMessage={handleSendMessage}
        isUploading={isUploading}
        setIsUploading={setIsUploading}
        socket={socket}
        roomId={roomId}
        currentUser={currentUser}
      />
    </div>
  );
}
