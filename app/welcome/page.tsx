// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// export default function WelcomePage() {
//   const router = useRouter();
//   const [username, setUsername] = useState("");

//   useEffect(() => {
//     const user = localStorage.getItem("user");
//     if (!user) return router.push("/login");

//     setUsername(JSON.parse(user).username);

//     const timer = setTimeout(() => {
//       router.push("/chat");
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 text-white">
//       <h1 className="text-4xl font-extrabold animate-fade">
//         Welcome, {username} 👋
//       </h1>

//       <p className="opacity-80 mt-2">
//         Preparing your workspace...
//       </p>

//       {/* 🔥 Animated loading */}
//       <div className="w-64 h-1 bg-white/30 rounded mt-6 overflow-hidden">
//         <div className="h-full bg-white animate-loading" />
//       </div>
//     </div>
//   );
// }





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
