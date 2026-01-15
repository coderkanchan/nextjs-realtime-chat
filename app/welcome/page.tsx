
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WelcomePage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/chat");
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-center
      bg-linear-to-br from-blue-600 to-purple-700 text-white">

      <h1 className="text-4xl font-extrabold animate-fade">
        Welcome 👋
      </h1>

      <p className="mt-2 opacity-80">
        Setting things up for you...
      </p>

      <div className="w-64 h-1 bg-white/30 rounded mt-6 overflow-hidden">
        <div className="h-full bg-white animate-loading" />
      </div>
    </div>
  );
}
