"use client";
import { useState, useRef } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { MdMic } from "react-icons/md";

export default function CustomAudioPlayer({ src, isMe }: { src: string; isMe: boolean }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={`flex items-center gap-3 p-2 min-w-[220px] rounded-xl ${isMe ? 'bg-[#0a4ed1]' : 'bg-gray-200'}`}>
      <audio
        ref={audioRef}
        src={src}
        onEnded={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <button
        onClick={togglePlay}
        className={`w-10 h-10 flex items-center justify-center rounded-full transition-all shadow-sm ${isMe ? 'bg-white text-blue-700' : 'bg-blue-600 text-white'}`}
      >
        {isPlaying ? <FaPause size={12} /> : <FaPlay className="ml-1" size={12} />}
      </button>

      <div className="flex flex-col flex-1 gap-1">
        {/* Bars Animation */}
        <div className="flex gap-[2px] items-end h-5">
          {[...Array(18)].map((_, i) => (
            <div
              key={i}
              className={`w-[2px] rounded-full transition-all duration-300 ${isMe ? 'bg-blue-200' : 'bg-gray-400'} ${isPlaying ? 'animate-bounce' : ''}`}
              style={{
                height: `${20 + Math.random() * 80}%`,
                animationDelay: `${i * 0.05}s`
              }}
            />
          ))}
        </div>
        <div className={`flex items-center gap-1 opacity-70 text-[10px] ${isMe ? 'text-white' : 'text-gray-600'}`}>
          <MdMic size={14} />
          <span>Voice Note</span>
        </div>
      </div>
    </div>
  );
}