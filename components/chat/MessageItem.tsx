"use client";
import { useState } from "react";
import { BiCheckDouble } from "react-icons/bi";
import { FaCheck } from "react-icons/fa6";

export default function MessageItem({
  m,
  currentUser,
  onDeleteMe,
  onDeleteEveryone
}: {
  m: any;
  currentUser: string;
  onDeleteMe: (id: string) => void;
  onDeleteEveryone: (id: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const isMe = m.senderId === currentUser;

  if (m.deletedFor?.includes(currentUser)) return null;

  const isImage =
    m.messageType === 'image' ||
    (typeof m.message === 'string' && (
      m.message.includes("cloudinary.com") ||
      m.message.match(/\.(jpeg|jpg|gif|png|webp|jfif)/i)
    ));

  const formatTime = (time: string) => {
    if (!time) return "";
    return new Date(time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).toLowerCase();
  };

  const handleDownload = async (url: string) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `chat_image_${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className={`flex flex-col ${isMe ? "items-end" : "items-start"} mb-3 w-full group relative`}>
        <div className="relative flex items-center gap-2 max-w-[80%]">

          <button
            onClick={() => setShowOptions(!showOptions)}
            className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all order-first"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>

          {showOptions && (
            <div className={`absolute bottom-full z-50 mb-2 w-40 bg-white border rounded-lg shadow-xl p-1 flex flex-col ${isMe ? 'right-0' : 'left-8'}`}>
              <button
                onClick={() => { onDeleteMe(m._id); setShowOptions(false); }}
                className="text-left px-3 py-2 text-xs font-bold hover:bg-gray-100 text-gray-700 rounded"
              >
                Delete for me
              </button>
              {isMe && !m.isDeleted && (
                <button
                  onClick={() => { onDeleteEveryone(m._id); setShowOptions(false); }}
                  className="text-left px-3 py-2 text-xs font-bold hover:bg-gray-100 text-red-600 border-t rounded"
                >
                  Delete for everyone
                </button>
              )}
            </div>
          )}

          <div className={`relative shadow-md overflow-hidden transition-all duration-200 p-1 ${isMe ? "bg-[#06389c] text-white rounded-2xl rounded-tr-none" : "bg-gray-300 text-gray-800 border border-gray-400 rounded-2xl rounded-tl-none"}`}>
            {m.isDeleted ? (
              <div className="px-4 py-2 text-[12px] italic flex items-center gap-2 opacity-70">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                {m.senderId === currentUser ? "You deleted this message" : "This message was deleted"}
              </div>
            ) : (
              <>
                {isImage ? (
                  <div className="flex flex-col relative">
                    <button
                      onClick={() => handleDownload(m.message)}
                      className="absolute top-2 right-2 z-10 p-1.5 bg-black/30 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    </button>
                    <div className="p-1">
                      <img
                        src={m.message}
                        className="max-w-full rounded-xl cursor-zoom-in max-h-[400px] object-cover block bg-gray-50"
                        onClick={() => setIsOpen(true)}
                      />
                    </div>
                    {m.caption && (
                      <div className="px-3 py-2 text-[13px] border-t border-white/10 font-medium leading-tight">
                        {m.caption}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="px-4 py-2 text-lg wrap-break-words whitespace-pre-wrap font-medium">
                    {m.message}
                  </div>
                )}
              </>
            )}

            {!m.isDeleted && (
              <div className="flex justify-end items-center gap-3 px-2">
                <span className={`text-xs ${isMe ? " text-gray-300" : "text-gray-400"}`}>{formatTime(m.createdAt)}</span>
                {isMe && (
                  <span className={`text-2xl font-bold ${m.readStatus ? "text-blue-400" : " text-gray-100"}`}>
                    {m.readStatus ? <BiCheckDouble /> : m.deliveryStatus === 'delivered' ? <BiCheckDouble /> : <FaCheck />}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/95 p-4" onClick={() => setIsOpen(false)}>
          <div className="relative max-w-5xl w-full flex flex-col items-center">
            <img src={m.message} className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl transition-transform duration-300" onClick={(e) => e.stopPropagation()} />
            {m.caption && <p className="text-white mt-4 bg-black/50 px-6 py-2 rounded-full font-medium">{m.caption}</p>}
          </div>
        </div>
      )}
    </>
  );
}