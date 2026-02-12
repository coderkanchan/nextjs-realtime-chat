"use client";
import { useRef, useState, useEffect } from "react";

export default function CameraModal({ onCapture, onClose }: { onCapture: (blob: Blob) => void, onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    let activeStream: MediaStream | null = null; 

    async function startCamera() {
      try {
        const s = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "user",
            width: { ideal: 1280 },
            height: { ideal: 720 }
          },
          audio: false
        });
        activeStream = s; 
        setStream(s);
        if (videoRef.current) videoRef.current.srcObject = s;
      } catch (err) {
        console.error("Camera access denied", err);
        onClose();
      }
    }
    startCamera();

    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const takePhoto = () => {
    if (videoRef.current && stream) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(videoRef.current, 0, 0);

      canvas.toBlob((blob) => {
        if (blob) {
          stream.getTracks().forEach(track => track.stop());
          onCapture(blob);
        }
      }, "image/jpeg", 0.9); 
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-100 flex flex-col items-center justify-center backdrop-blur-sm">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl shadow-2xl border-4 border-white/10">
        <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover scale-x-[-1]" />

        <div className="absolute bottom-6 left-0 right-0 flex justify-around items-center px-10">
          <button onClick={onClose} className="bg-white/20 hover:bg-red-500 text-white p-4 rounded-full transition-all backdrop-blur-md">
            Cancel
          </button>

          <button onClick={takePhoto} className="w-20 h-20 bg-white rounded-full border-[6px] border-blue-500 shadow-xl active:scale-90 transition-all flex items-center justify-center">
            <div className="w-14 h-14 bg-white border-2 border-gray-200 rounded-full" />
          </button>

          <div className="w-14" />
        </div>
      </div>
    </div>
  );
}