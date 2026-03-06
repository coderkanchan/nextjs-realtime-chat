"use client";
import { Suspense } from "react";
import ChatContent from "@/app/chat/ChatContent" 

export default function ChatPage() {
  return (
    <Suspense fallback={
      <div className="h-screen flex items-center justify-center bg-gray-900 text-blue-600 font-bold animate-pulse">
        Loading Messenger...
      </div>
    }>
      <ChatContent />
    </Suspense>
  );
}