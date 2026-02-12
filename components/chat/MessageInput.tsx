"use client";
import { useState, useRef, useEffect } from "react";
import { IoIosSend, IoIosCamera, IoMdMic } from "react-icons/io";
import CameraModal from "./CameraModal";

export default function MessageInput(
  {
    onSendMessage,
    isUploading,
    setIsUploading,
    socket,
    roomId,
    currentUser
  }: any) {
  const [input, setInput] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    if (!socket || !roomId) return;
    if (input.trim().length > 0) {
      socket.emit("typing", { roomId, senderId: currentUser });
    } else {
      socket.emit("stop-typing", { roomId, senderId: currentUser });
    }
  }, [input, socket, roomId, currentUser]);

  const handleFocus = () => {
    if (socket && roomId) {
      socket.emit("typing", { roomId, senderId: currentUser });
    }
  };

  const handleBlur = () => {
    if (socket && roomId) {
      socket.emit("stop-typing", { roomId, senderId: currentUser });
    }
  };

  const handleCameraCapture = (blob: Blob) => {
    setIsCameraOpen(false);

    const file = new File([blob], `camera_${Date.now()}.jpg`, { type: "image/jpeg" });

    setSelectedFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleFinalSend = async () => {
    if (!selectedFile) return;
    setIsUploading(true);
    const captionText = input;

    setInput("");
    setImagePreview(null);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "");

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      if (data.secure_url) {
        onSendMessage(data.secure_url, 'image', captionText);
      }
    } catch (err) {
      console.error("Upload failed", err);
      alert("Photo send nahi ho payi, fir se try karein!");
    } finally {
      setIsUploading(false);
      setSelectedFile(null);
      if (socket && roomId) {
        socket.emit("stop-typing", { roomId, senderId: currentUser });
      }
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/mpeg' });
        await uploadAudio(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Mic access denied", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const uploadAudio = async (blob: Blob) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", blob, "voice_note.mp3");
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "");

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`, {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      if (data.secure_url) {
        onSendMessage(data.secure_url, 'audio', "");
      }
    } catch (err) {
      console.error("Audio upload failed", err);
    } finally {
      setIsUploading(false);
      setIsRecording(false);
    }
  };

  return (
    <div className="relative border-t bg-white">

      {isCameraOpen && (
        <CameraModal
          onCapture={handleCameraCapture}
          onClose={() => setIsCameraOpen(false)}
        />
      )}

      {imagePreview && (
        <div className="absolute bottom-full left-0 w-full bg-blue-50 p-4 border-t-2 border-blue-200 shadow-2xl flex flex-col items-center animate-in slide-in-from-bottom-2">
          <div className="relative group mb-3">

            <img src={imagePreview} className="w-32 h-32 object-cover rounded-xl border-4 border-white shadow-md" alt="preview" />

            <button onClick={() => { setImagePreview(null); setSelectedFile(null); }}
              className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors">

              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>

            </button>
          </div>

          <div className="flex w-full gap-2 max-w-xl">

            <input
              className="flex-1 bg-white p-3 rounded-xl text-sm outline-none border-2 border-blue-100 focus:border-blue-400 text-gray-600"
              placeholder="Add a caption..."
              value={input}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleFinalSend()}
            />
            <button onClick={handleFinalSend} className="bg-blue-600 text-white px-6 rounded-xl font-bold transition-all hover:bg-blue-700">Send</button>
          </div>

        </div>
      )}

      {!imagePreview && (
        <div className="p-3 flex gap-2 items-center">

          <button
            type="button"
            onClick={() => setIsCameraOpen(true)}
            disabled={isUploading}
            className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
          >
            <IoIosCamera className="text-2xl" />
          </button>

          <button onClick={() => fileInputRef.current?.click()} className="p-2 text-gray-400 hover:text-blue-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          </button>

          <input type="file" hidden ref={fileInputRef} accept="image/*" onChange={handleFileSelect} />


          {isRecording ? (
            <div className="flex-1  rounded-full animate-pulse text-red-500 border border-red-400">
              <div className="flex p-2.5 px-5 items-center gap-2  bg-red-100 rounded-full">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-xs font-bold">Recording Voice Note...</span>
              </div>
            </div>
          ) : (
            <input
              className="flex-1 bg-gray-100 p-2.5 px-5 rounded-full outline-none text-sm focus:bg-white border focus:border-blue-200 transition-all text-gray-600"
              placeholder="Type a message..."
              value={input}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && input.trim()) {
                  onSendMessage(input, 'text');
                  setInput("");
                }
              }}
            />
          )}

          {input.trim() || imagePreview ? (
            <button
              onClick={() => { if (input.trim()) { onSendMessage(input, 'text'); setInput(""); } }}
              className="bg-blue-600 text-2xl flex items-center justify-center text-white py-2 px-4 rounded-full font-bold hover:bg-blue-100 hover:text-blue-600 hover:scale-110   transition-all duration-300">
              <IoIosSend />
            </button>
          ) : (
            <button
              onMouseDown={startRecording}
              onMouseUp={stopRecording}
              onTouchStart={startRecording}
              onTouchEnd={stopRecording}
              className={`p-3 rounded-full cursor-pointer transition-all ${isRecording ? 'bg-red-500 animate-pulse text-white' : 'bg-blue-600 text-white'}`}
            >
              <IoMdMic size={24} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}