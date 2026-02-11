"use client";
import { useRef, useState, useEffect } from "react";

export default function CameraModal({ onCapture, onClose }: { onCapture: (blob: Blob) => void, onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    async function startCamera() {
      try {
        const s = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" }, 
          audio: false
        });
        setStream(s);
        if (videoRef.current) videoRef.current.srcObject = s;
      } catch (err) {
        console.error("Camera access denied", err);
        onClose();
      }
    }
    startCamera();

    return () => stream?.getTracks().forEach(track => track.stop());
  }, []);

  const takePhoto = () => {
    const canvas = document.createElement("canvas");
    if (videoRef.current) {
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(videoRef.current, 0, 0);

      canvas.toBlob((blob) => {
        if (blob) onCapture(blob);
      }, "image/jpeg", 0.8);
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
      <video ref={videoRef} autoPlay playsInline className="w-full max-h-[80vh] object-cover" />

      <div className="absolute bottom-10 flex gap-10 items-center">
        <button onClick={onClose} className="text-white bg-red-500 p-4 rounded-full">Cancel</button>
        <button onClick={takePhoto} className="w-20 h-20 bg-white border-8 border-gray-300 rounded-full" />
        <div className="w-10" /> {/* Spacer */}
      </div>
    </div>
  );
}