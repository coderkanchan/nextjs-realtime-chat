
"use client";
import { useEffect, useState, useRef } from "react";

interface ChatWindowProps {
  currentUser: string;
  otherUser: string | null;
  messages: any[];
  setMessages: React.Dispatch<React.SetStateAction<any[]>>;
  socket: any;
}

const getRoomId = (id1: string, id2: string) =>
  [id1, id2].sort().join("_");

export default function ChatWindow({
  currentUser,
  otherUser,
  messages,
  setMessages,
  socket,
}: ChatWindowProps) {
  const [inputMessage, setInputMessage] = useState("");
  const [isPartnerTyping, setIsPartnerTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  /* -------- AUTO SCROLL -------- */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isPartnerTyping]);

  /* -------- TYPING INDICATOR -------- */
  useEffect(() => {
    if (!socket || !otherUser) return;

    socket.on("typing-start-to-client", (userId: string) => {
      if (userId === otherUser) setIsPartnerTyping(true);
    });

    socket.on("typing-stop-to-client", (userId: string) => {
      if (userId === otherUser) setIsPartnerTyping(false);
    });

    return () => {
      socket.off("typing-start-to-client");
      socket.off("typing-stop-to-client");
    };
  }, [socket, otherUser]);

  /* -------- SEND MESSAGE -------- */
  const handleSendMessage = () => {
    if (!inputMessage.trim() || !otherUser) return;

    const msg = {
      roomId: getRoomId(currentUser, otherUser),
      sender: currentUser,
      receiver: otherUser,
      text: inputMessage,
    };

    socket.emit("send-message", msg);
    setMessages((prev) => [...prev, msg]);

    socket.emit("typing-stop", {
      roomId: msg.roomId,
      senderId: currentUser,
    });

    setInputMessage("");
  };

  /* -------- INPUT CHANGE -------- */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);

    if (!otherUser) return;

    const roomId = getRoomId(currentUser, otherUser);

    if (e.target.value.length > 0) {
      socket.emit("typing-start", { roomId, senderId: currentUser });
    } else {
      socket.emit("typing-stop", { roomId, senderId: currentUser });
    }
  };

  /* -------- EMPTY STATE -------- */
  if (!otherUser) {
    return (
      <div className="w-3/4 flex items-center justify-center bg-white rounded-r-xl shadow-lg h-full text-gray-400">
        <p className="text-lg">Select a user to start chatting</p>
      </div>
    );
  }

  return (
    <div className="w-3/4 flex flex-col bg-white rounded-r-xl shadow-lg h-full overflow-hidden">
      {/* Header */}
      <header className="p-4 border-b bg-blue-50">
        <h3 className="text-xl font-bold text-gray-800">
          Chatting with <span className="text-blue-600">{otherUser}</span>
        </h3>
        {isPartnerTyping && (
          <p className="text-xs text-green-500 font-bold animate-pulse">
            typing...
          </p>
        )}
      </header>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#f0f2f5]">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.sender === currentUser
              ? "justify-end"
              : "justify-start"
              }`}
          >
            <div
              className={`max-w-[70%] px-4 py-2 rounded-xl text-white shadow-sm ${msg.sender === currentUser
                ? "bg-blue-600 rounded-br-none"
                : "bg-gray-700 rounded-tl-none"
                }`}
            >
              <p className="text-sm">{msg.text}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t flex">
        <input
          className="flex-1 border p-3 rounded-l-xl"
          placeholder="Type a message..."
          value={inputMessage}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button
          onClick={handleSendMessage}
          className="px-6 bg-blue-600 text-white font-bold rounded-r-xl"
        >
          Send
        </button>
      </div>
    </div>
  );
}
