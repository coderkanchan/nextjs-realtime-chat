// "use client";
// import { useRef, useState, useEffect } from "react";

// export default function CameraModal({ onCapture, onClose }: { onCapture: (blob: Blob) => void, onClose: () => void }) {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const [stream, setStream] = useState<MediaStream | null>(null);

//   useEffect(() => {
//     async function startCamera() {
//       try {
//         const s = await navigator.mediaDevices.getUserMedia({
//           video: { facingMode: "user" }, 
//           audio: false
//         });
//         setStream(s);
//         if (videoRef.current) videoRef.current.srcObject = s;
//       } catch (err) {
//         console.error("Camera access denied", err);
//         onClose();
//       }
//     }
//     startCamera();

//     return () => stream?.getTracks().forEach(track => track.stop());
//   }, []);

//   const takePhoto = () => {
//     const canvas = document.createElement("canvas");
//     if (videoRef.current) {
//       canvas.width = videoRef.current.videoWidth;
//       canvas.height = videoRef.current.videoHeight;
//       const ctx = canvas.getContext("2d");
//       ctx?.drawImage(videoRef.current, 0, 0);

//       canvas.toBlob((blob) => {
//         if (blob) onCapture(blob);
//       }, "image/jpeg", 0.8);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
//       <video ref={videoRef} autoPlay playsInline className="w-full max-h-[80vh] object-cover" />

//       <div className="absolute bottom-10 flex gap-10 items-center">
//         <button onClick={onClose} className="text-white bg-red-500 p-4 rounded-full">Cancel</button>
//         <button onClick={takePhoto} className="w-20 h-20 bg-white border-8 border-gray-300 rounded-full" />
//         <div className="w-10" /> {/* Spacer */}
//       </div>
//     </div>
//   );
// }





"use client";
import { useRef, useState, useEffect } from "react";

export default function CameraModal({ onCapture, onClose }: { onCapture: (blob: Blob) => void, onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    async function startCamera() {
      try {
        const s = await navigator.mediaDevices.getUserMedia({
          // ✅ HD Quality Settings
          video: {
            facingMode: "user",
            width: { ideal: 1280 },
            height: { ideal: 720 }
          },
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

    // ✅ Cleanup: Camera band karne ke liye
    return () => {
      if (s) s.getTracks().forEach(track => track.stop());
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
          // ✅ Photo khinchte hi stream stop karo
          stream.getTracks().forEach(track => track.stop());
          onCapture(blob);
        }
      }, "image/jpeg", 0.9); // Quality 0.9 (90%)
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-[100] flex flex-col items-center justify-center backdrop-blur-sm">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl shadow-2xl border-4 border-white/10">
        <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover scale-x-[-1]" />

        {/* Mirror effect fix: scale-x-[-1] helps it feel like a real mirror */}

        <div className="absolute bottom-6 left-0 right-0 flex justify-around items-center px-10">
          <button onClick={onClose} className="bg-white/20 hover:bg-red-500 text-white p-4 rounded-full transition-all backdrop-blur-md">
            Cancel
          </button>

          <button onClick={takePhoto} className="w-20 h-20 bg-white rounded-full border-[6px] border-blue-500 shadow-xl active:scale-90 transition-all flex items-center justify-center">
            <div className="w-14 h-14 bg-white border-2 border-gray-200 rounded-full" />
          </button>

          <div className="w-14" /> {/* Spacer */}
        </div>
      </div>
    </div>
  );
}