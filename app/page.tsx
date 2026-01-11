// page.tsx file
"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import io, { Socket } from "socket.io-client";

// Socket.IO सर्वर से कनेक्ट करें (Port 3001)
const socket: Socket = io("http://localhost:3001", {
  transports: ["websocket"],
});

// Room ID बनाने का फ़ंक्शन
const getRoomId = (id1: string, id2: string): string => {
  return [id1, id2].sort().join("_");
};

// मैसेज/हिस्ट्री के लिए इंटरफेस
interface MessageData {
  sender: string;
  text: string;
}

interface ReceivedMessageData {
  roomId: string;
  senderId: string;
  receiverId: string;
  message: string;
  _id: string;
  createdAt: Date;
}

// Interface for Chat List 
interface PartnerStatus {
  id: string;
  isOnline: boolean;
  unreadCount: number;
  lastMessage: string;
}

const generateUniqueId = (): string => {
  return "user_" + Math.random().toString(36).substring(2, 10);
};

export default function HomePage() {
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const [otherUserId, setOtherUserId] = useState<string>("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isPartnerTyping, setIsPartnerTyping] = useState(false);

  const [chatList, setChatList] = useState<PartnerStatus[]>([]);
  const [onlineStatuses, setOnlineStatuses] = useState<Map<string, boolean>>(new Map());

  // 👥 NEW: सभी यूज़र्स के लिए स्टेट
  const [allUsers, setAllUsers] = useState<string[]>([]);


  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 🚨 FIXED 1: ID Setup Logic - Added empty dependency array [] to prevent infinite loop
  useEffect(() => {
    const storedId = localStorage.getItem("chat_user_id");
    let idToUse: string;

    if (!storedId) {
      idToUse = generateUniqueId();
      localStorage.setItem("chat_user_id", idToUse);
    } else {
      idToUse = storedId;
    }

    setCurrentUserId(idToUse);
    setOtherUserId(localStorage.getItem('chat_other_id') || '');
  }, []); // 🔑 FIX: [E05B4CF8] Infinite Loop को रोकने के लिए [] जोड़ा


  const handleReceiveMessage = useCallback((data: ReceivedMessageData) => {
    if (!currentUserId || !otherUserId) return;
    const currentRoom = getRoomId(currentUserId, otherUserId);
    if (currentRoom === data.roomId) {
      setMessages((prev) => [...prev, { sender: data.senderId, text: data.message }]);
    }
  }, [currentUserId, otherUserId]);


  const handleHistoryLoaded = useCallback((history: ReceivedMessageData[]) => {
    const formattedMessages: MessageData[] = history.map(msg => ({
      sender: msg.senderId,
      text: msg.message,
    }));
    setMessages(formattedMessages);
  }, []);

  const handleTypingStart = useCallback((senderId: string) => {
    if (senderId === otherUserId) {
      setIsPartnerTyping(true);
      scrollToBottom();
    }
  }, [otherUserId]);

  const handleTypingStop = useCallback((senderId: string) => {
    if (senderId === otherUserId) {
      setIsPartnerTyping(false);
    }
  }, [otherUserId]);

  // handleChatListLoaded (सर्वर से लिस्ट मिलने पर)
  const handleChatListLoaded = useCallback((partners: PartnerStatus[]) => {
    console.log("🔄 Client: Chat List Loaded from Server:", partners.length, "partners.");
    setChatList(partners);

    // ऑनलाइन स्टेटस मैप को अपडेट करें
    setOnlineStatuses(prev => {
      const newMap = new Map(prev);
      partners.forEach(p => {
        newMap.set(p.id, p.isOnline);
      });
      return newMap;
    });

    // यदि कोई पार्टनर चुना नहीं गया है, और लिस्ट में पार्टनर है, तो पहला पार्टनर चुनें
    if (!otherUserId && partners.length > 0) {
      setOtherUserId(partners[0].id);
    }
  }, [otherUserId]);

  // handleRefreshChatList
  const handleRefreshChatList = useCallback(() => {
    if (currentUserId) {
      console.log("🔄 Client: Requesting Chat List Refresh (triggered by Server)");
      socket.emit('fetch-chat-list', currentUserId);
    }
  }, [currentUserId]);

  // 👥 NEW: handleAllUsersLoaded (सर्वर से सभी यूज़र ID मिलने पर)
  const handleAllUsersLoaded = useCallback((ids: string[]) => {
    console.log("👥 Client: All Users Loaded from Server:", ids.length, "users.");
    // वर्तमान यूज़र ID को लिस्ट से हटा दें
    const filteredIds = ids.filter(id => id !== currentUserId);
    setAllUsers(filteredIds);
  }, [currentUserId]);


  const handleUserStatusUpdate = useCallback((userId: string, isOnline: boolean) => {
    // ऑनलाइन स्टेटस मैप को अपडेट करें
    setOnlineStatuses(prev => {
      const newMap = new Map(prev);
      newMap.set(userId, isOnline);
      return newMap;
    });

  }, []);

  // 🔑 मार्क एज़ रीड फ़ंक्शन
  const markAsRead = useCallback(() => {
    if (currentUserId && otherUserId && isConnected) {
      console.log("🔑 Client: Emitting mark-messages-read for:", otherUserId);
      socket.emit("mark-messages-read", {
        currentUserId,
        otherUserId
      });
    }
  }, [currentUserId, otherUserId, isConnected]);

  // 🚨 FIXED 3: All Users को फ़ेच करने के लिए एक फ़ंक्शन
  const fetchAllUsers = useCallback(() => {
    if (currentUserId && isConnected) {
      console.log("👥 Client: Requesting All Users List.");
      socket.emit('fetch-all-users');
    }
  }, [currentUserId, isConnected]);


  // 🔑 Socket Listener Setup useEffect
  useEffect(() => {
    if (!currentUserId) return;

    // B. Socket Connection Listeners
    const onConnect = () => {
      setIsConnected(true);

      // कनेक्ट होने के बाद अपनी ID सर्वर को भेजें
      socket.emit("user-connected", currentUserId);

      socket.emit('fetch-chat-list', currentUserId);
      // 🔑 FIX: All Users लिस्ट को भी फेच करें
      fetchAllUsers();
      console.log("🟢 Socket Connected!");
    }
    const onDisconnect = () => {
      setIsConnected(false);
      console.log("🔴 Socket Disconnected!");
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    // C. Event Listeners
    socket.on("receive-message", handleReceiveMessage);
    socket.on("history-loaded", handleHistoryLoaded);
    socket.on('typing-start-to-client', handleTypingStart);
    socket.on('typing-stop-to-client', handleTypingStop);

    socket.on('chat-list-loaded', handleChatListLoaded);
    socket.on('refresh-chat-list', handleRefreshChatList);

    // 👥 NEW: All Users Listener
    socket.on('all-users-loaded', handleAllUsersLoaded);

    socket.on('user-status-update', handleUserStatusUpdate);

    return () => {
      // Cleanup
      socket.off("receive-message", handleReceiveMessage);
      socket.off("history-loaded", handleHistoryLoaded);
      socket.off('typing-start-to-client', handleTypingStart);
      socket.off('typing-stop-to-client', handleTypingStop);
      socket.off('chat-list-loaded', handleChatListLoaded);
      socket.off('refresh-chat-list', handleRefreshChatList);
      socket.off('all-users-loaded', handleAllUsersLoaded);
      socket.off('user-status-update', handleUserStatusUpdate);
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, [currentUserId, handleReceiveMessage, handleHistoryLoaded, handleTypingStart, handleTypingStop, handleChatListLoaded, handleRefreshChatList, handleUserStatusUpdate, handleAllUsersLoaded, fetchAllUsers]); // 🔑 fetchAllUsers को dependency में जोड़ा

  // 🔑 Room Join/Switch & History Fetch Logic (जब otherUserId बदलता है)
  useEffect(() => {
    if (currentUserId && otherUserId && isConnected) {
      const roomId = getRoomId(currentUserId, otherUserId);

      setMessages([]); // रूम स्विच होने पर मैसेज क्लियर करें

      socket.emit("user-ready", currentUserId, otherUserId);
      socket.emit("fetch-history", currentUserId, otherUserId);
      localStorage.setItem('chat_other_id', otherUserId);
      console.log(`Switched to partner: ${otherUserId}`);

      // जैसे ही चैट खुलती है, मैसेज को 'पढ़ा हुआ' मार्क करें
      markAsRead();
    }
  }, [currentUserId, otherUserId, isConnected, markAsRead]);

  // 🔑 Auto Scroll 
  useEffect(() => {
    scrollToBottom();
  }, [messages, isPartnerTyping]);

  // 🔑 Typing Handler Utility 
  const emitTyping = (isTyping: boolean) => {
    // ... (यह कोड अपरिवर्तित है)
    if (!currentUserId || !otherUserId || !isConnected) return;
    const roomId = getRoomId(currentUserId, otherUserId);
    const data = { roomId: roomId, senderId: currentUserId };
    if (isTyping) {
      socket.emit('typing-start', data);
    } else {
      socket.emit('typing-stop', data);
    }
  };

  // 🔑 Message Change Logic 
  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // ... (यह कोड अपरिवर्तित है)
    const newMessage = e.target.value;
    if (!currentUserId || !otherUserId || !isConnected) {
      setMessage(newMessage);
      return;
    }
    const isCurrentlyEmpty = message.trim() === '';
    const isNewEmpty = newMessage.trim() === '';
    setMessage(newMessage);
    if (isCurrentlyEmpty && !isNewEmpty) {
      emitTyping(true);
    }
    else if (!isCurrentlyEmpty && isNewEmpty) {
      emitTyping(false);
    }
  };

  // 🔑 sendMessage 
  const sendMessage = () => {
    // ... (यह कोड अपरिवर्तित है)
    if (!message.trim() || !currentUserId || !otherUserId || !isConnected) {
      console.error("❌ Send Fail: Check connection, message text, or IDs.");
      return;
    }
    emitTyping(false);
    const roomId = getRoomId(currentUserId, otherUserId);
    const msgData = {
      roomId: roomId,
      senderId: currentUserId,
      receiverId: otherUserId,
      message: message
    };
    socket.emit("send-message", msgData);
    setMessage("");
  };


  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 flex">

      {/* Chat List Sidebar */}
      <div className="w-1/4 bg-white border-r border-gray-200 shadow-md rounded-l-xl p-4 mr-4 flex flex-col">
        <h3 className="text-2xl font-extrabold mb-4 text-blue-700">Conversations</h3>

        <p className="text-sm font-semibold text-gray-800 mb-4">Your ID: <span className="text-blue-600 font-mono text-xs">{currentUserId || "loading..."}</span></p>

        <div className="space-y-2 flex-1 flex flex-col overflow-hidden">

          {/* Recent Chats Section */}
          <h4 className="text-sm font-semibold text-gray-600 uppercase pt-2 border-t">Recent Chats ({chatList.length})</h4>

          <div className="overflow-y-auto max-h-56 pb-2">
            {chatList.map((partner) => (
              <div
                key={partner.id}  
                onClick={() => {
                  if (partner.id !== otherUserId) {
                    setOtherUserId(partner.id);
                  }
                }}
                className={`p-3 rounded-lg text-black cursor-pointer transition-all flex justify-between items-center ${partner.id === otherUserId
                  ? 'bg-blue-100 border-l-4 border-blue-500 font-semibold'
                  : 'hover:bg-gray-100'
                  }`}
              >
                <span className='flex flex-col'>
                  <span className="font-semibold">{partner.id}</span>
                  <span className="text-sm text-gray-500 truncate w-32">
                    {partner.lastMessage || 'Start a conversation.'}
                  </span>
                </span>

                <span className='flex items-center'>
                  {partner.unreadCount > 0 && (
                    <span className="mr-2 px-2 py-0.5 text-xs font-bold text-white bg-red-500 rounded-full">
                      {partner.unreadCount}
                    </span>
                  )}
                  <span className={`inline-block w-2 h-2 rounded-full ${onlineStatuses.get(partner.id) ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                </span>
              </div>
            ))}

            {chatList.length === 0 && (
              <p className="text-sm text-gray-500 italic pt-2">No recent chats.</p>
            )}
          </div>

          {/* 👥 NEW: All Users Section */}
          <h4 className="text-sm font-semibold text-gray-600 uppercase mt-4 pt-2 border-t">All Users ({allUsers.length})</h4>
          <div className="overflow-y-auto flex-1">
            {allUsers.length === 0 && (
              <p className="text-sm text-gray-500 italic pt-2">No other users found in database.</p>
            )}
            {allUsers.map((id) => {
              // यदि यूज़र पहले से Recent Chats में है, तो उसे यहाँ न दिखाएँ
              if (chatList.some(p => p.id === id)) return null;

              return (
                <div
                  key={id} 
                  onClick={() => setOtherUserId(id)}
                  className={`p-3 rounded-lg text-black cursor-pointer transition-all flex justify-between items-center ${id === otherUserId
                    ? 'bg-blue-100 border-l-4 border-blue-500 font-semibold'
                    : 'hover:bg-gray-100'
                    }`}
                >
                  <span className="font-semibold">{id}</span>
                  <span className={`inline-block w-2 h-2 rounded-full ${onlineStatuses.get(id) ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                </div>
              )
            })}
          </div>

        </div>
      </div>

      {/* Chat Window Area */}
      <div className="w-3/4 flex flex-col bg-white rounded-r-xl shadow-lg h-[700px]">
        <header className="p-4 border-b bg-blue-50 rounded-tr-xl">
          {/* ... (यह कोड अपरिवर्तित है) */}
          <h3 className="text-xl font-bold text-gray-800 flex items-center">
            Chatting with: <span className="text-blue-600 mr-2">{otherUserId || 'Select a Partner'}</span>

            {otherUserId && (
              <span className={`inline-block w-3 h-3 rounded-full ${onlineStatuses.get(otherUserId) ? 'bg-green-500' : 'bg-gray-400'}`}></span>
            )}
          </h3>
          <p className={`text-sm font-medium ${isConnected ? 'text-green-600' : 'text-red-500'}`}>
            Socket Status: {isConnected ? '✅ Connected' : '❌ Disconnected'}
          </p>
        </header>

        {/* Message Display Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 h-[300px]">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 mt-20">
              {currentUserId && otherUserId ? "Loading chat history..." : "Select or Enter a Partner's ID to begin."}
            </div>
          )}

          {messages.map((msg, index) => {
            // ... (मैसेज डिस्प्ले कोड अपरिवर्तित है)
            const isMe = msg.sender === currentUserId;
            return (
              <div key={index} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                <div className="max-w-xs md:max-w-md">
                  <div className={`text-xs mb-1 ${isMe ? 'text-right text-gray-600' : 'text-left text-gray-600'}`}>
                    {isMe ? 'You' : msg.sender}
                  </div>
                  <div
                    className={`px-4 py-2 rounded-xl text-white ${isMe
                      ? "bg-blue-600 rounded-br-none shadow-md"
                      : "bg-gray-700 rounded-tl-none shadow-md"
                      }`}
                  >
                    {msg.text}
                  </div>
                </div>
              </div>
            );
          })}

          {isPartnerTyping && (
            <div className="flex justify-start mt-2">
              <div className="px-3 py-2 text-sm text-gray-700 bg-gray-200 rounded-xl rounded-tl-none animate-pulse">
                {otherUserId} is typing...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input Area */}
        <div className="flex p-4 border-t">
          {/* ... (इनपुट फील्ड और बटन कोड अपरिवर्तित है) */}
          <input
            type="text"
            className="flex-1 border p-3 rounded-l-xl text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="Type message..."
            value={message}
            onChange={handleMessageChange}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                sendMessage();
              }
            }}
            disabled={!otherUserId || !isConnected}
          />
          <button
            onClick={sendMessage}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-r-xl hover:bg-blue-700 transition-colors disabled:bg-gray-400"
            disabled={!message.trim() || !otherUserId || !isConnected}
          >
            Send
          </button>
        </div>
      </div>
    </div >
  );
}