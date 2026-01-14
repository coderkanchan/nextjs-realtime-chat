// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// export default function LoginPage() {
//   const [form, setForm] = useState({ username: "", password: "" });
//   const router = useRouter();

//   const handleLogin = async () => {
//     const res = await fetch("/api/auth/login", {
//       method: "POST",
//       body: JSON.stringify(form),
//     });
//     const data = await res.json();
//     if (res.ok) {
//       localStorage.setItem("chat_username", data.username);
//       router.push("/chat"); // Redirect to Chat
//     } else {
//       alert(data.error);
//     }
//   };

//   return (
//     <div className="h-screen flex items-center justify-center bg-gray-100 font-sans">
//       <div className="bg-white p-8 rounded-xl shadow-xl w-96 border border-gray-200">
//         <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-600">Login</h2>
//         <input
//           className="w-full border p-3 rounded-lg mb-4 text-black focus:ring-2 focus:ring-blue-400 outline-none"
//           placeholder="Username"
//           onChange={(e) => setForm({ ...form, username: e.target.value })}
//         />
//         {/* <input
//           type="password"
//           className="w-full border p-3 rounded-lg mb-6 text-black focus:ring-2 focus:ring-blue-400 outline-none"
//           placeholder="Password"
//           onChange={(e) => setForm({ ...form, password: e.target.value })}
//         /> */}

//         <div className="relative mb-6">
//                   <input
//                     type={showPass ? "text" : "password"}
//                     className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
//                     placeholder="Password"
//                     onChange={(e) => setForm({ ...form, password: e.target.value })}
//                   />
//                   <button onClick={() => setShowPass(!showPass)} className="absolute right-3 top-3 text-gray-400">
//                     {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
//                   </button>
//                 </div>

//         <button onClick={handleLogin} className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition">
//           Enter Chat
//         </button>
//         <p className="mt-6 text-center text-gray-600 text-sm">
//           New here? <Link href="/signup" className="text-blue-600 font-bold ml-1">Create Account</Link>
//         </p>
//       </div>
//     </div>
//   );
// }




// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { Eye, EyeOff } from "lucide-react"; // 👈 Ye import zaroori hai

// export default function LoginPage() {
//   const [form, setForm] = useState({ username: "", password: "" });
//   const [showPass, setShowPass] = useState(false); // 👈 Ye state missing thi
//   const router = useRouter();

//   const handleLogin = async () => {
//     const res = await fetch("/api/auth/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     });
//     const data = await res.json();
//     if (res.ok) {
//       localStorage.setItem("chat_username", data.username);
//       router.push("/chat"); // 👈 Ab hum /chat par jayenge
//     } else {
//       alert(data.error);
//     }
//   };

//   return (
//     <div className="h-screen flex items-center justify-center bg-gray-100 font-sans text-black">
//       <div className="bg-white p-8 rounded-xl shadow-xl w-96 border border-gray-200">
//         <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-600">Login</h2>
//         <input
//           className="w-full border p-3 rounded-lg mb-4 text-black focus:ring-2 focus:ring-blue-400 outline-none"
//           placeholder="Username"
//           onChange={(e) => setForm({ ...form, username: e.target.value })}
//         />

//         <div className="relative mb-6">
//           <input
//             type={showPass ? "text" : "password"}
//             className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 text-black"
//             placeholder="Password"
//             onChange={(e) => setForm({ ...form, password: e.target.value })}
//           />
//           <button onClick={() => setShowPass(!showPass)} className="absolute right-3 top-3 text-gray-400">
//             {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
//           </button>
//         </div>

//         <button onClick={handleLogin} className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition">
//           Enter Chat
//         </button>
//         <p className="mt-6 text-center text-gray-600 text-sm">
//           New here? <Link href="/signup" className="text-blue-600 font-bold ml-1">Create Account</Link>
//         </p>
//       </div>
//     </div>
//   );
// }




// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { Eye, EyeOff } from "lucide-react";

// export default function LoginPage() {
//   const [form, setForm] = useState({ username: "", password: "" });
//   const [showPass, setShowPass] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();


//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     const res = await fetch("/api/auth/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     });

//     const data = await res.json();
//     setLoading(false);

//     if (!res.ok) {
//       setError(data.error || "Login failed");
//       return;
//     }

//     router.push("/chat");
//   };

//   return (
//     <div className="h-screen flex items-center justify-center bg-gray-800">
//       <div className="bg-white p-8 rounded-xl shadow-xl w-96">
//         <form onSubmit={handleSubmit}>
//           <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-600">
//             Login
//           </h2>

//           {error && (
//             <p className="mb-4 text-sm text-red-600 bg-red-50 p-2 rounded">
//               {error}
//             </p>
//           )}

//           <input
//             className="w-full border p-3 rounded-lg mb-4"
//             placeholder="Username"
//             onChange={(e) => setForm({ ...form, username: e.target.value })}
//           />

//           <div className="relative mb-6">
//             <input
//               type={showPass ? "text" : "password"}
//               className="w-full border p-3 rounded-lg"
//               placeholder="Password"
//               onChange={(e) => setForm({ ...form, password: e.target.value })}
//             />
//             <button
//               onClick={() => setShowPass(!showPass)}
//               className="absolute right-3 top-3 text-gray-400"
//             >
//               {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
//             </button>
//           </div>

//           <button
//             disabled={loading}
//             //onClick={handleLogin}
//             className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold disabled:opacity-50"
//           >
//             {loading ? "Signing in..." : "Enter Chat"}
//           </button>

//           <p className="mt-6 text-center text-sm">
//             New here?
//             <Link href="/signup" className="text-blue-600 font-bold ml-1">
//               Create Account
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div >
//   );
// }





// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { Eye, EyeOff } from "lucide-react";
// import { toast } from "sonner";

// export default function LoginPage() {
//   const [form, setForm] = useState({ username: "", password: "" });
//   const [showPass, setShowPass] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (loading) return;

//     if (!form.username || !form.password) {
//       toast.error("Username and password are required");
//       return;
//     }

//     setLoading(true);

//     const res = await fetch("/api/auth/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     });

//     const data = await res.json();
//     setLoading(false);

//     if (!res.ok) {
//       toast.error(data.error || "Login failed");
//       return;
//     }

//     toast.success("Welcome back 👋");
//     router.push("/chat");
//   };

//   return (
//     <div className="h-screen flex items-center justify-center bg-gray-800">
//       <div className="bg-white p-8 rounded-xl shadow-xl w-96">
//         <form onSubmit={handleSubmit}>
//           <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-600">
//             Login
//           </h2>

//           <input
//             required
//             autoComplete="username"
//             className="w-full border-2 outline-none border-gray-800 text-gray-700 p-3 rounded-lg mb-4"
//             placeholder="Username"
//             onChange={(e) => setForm({ ...form, username: e.target.value })}
//           />

//           <div className="relative mb-6">
//             <input
//               required
//               autoComplete="current-password"
//               type={showPass ? "text" : "password"}
//               className="w-full border-2 outline-none border-gray-800 text-gray-700 p-3 rounded-lg"
//               placeholder="Password"
//               onChange={(e) => setForm({ ...form, password: e.target.value })}
//             />
//             <button
//               type="button"
//               onClick={() => setShowPass(!showPass)}
//               className="absolute right-3 top-3 text-gray-400"
//             >
//               {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
//             </button>
//           </div>

//           <button
//             disabled={loading}
//             className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold disabled:opacity-50"
//           >
//             {loading ? "Logging in..." : "Enter Chat"}
//           </button>

//           <p className="mt-6 text-center text-base text-gray-800">
//             New here?
//             <Link href="/signup" className="text-blue-600 font-bold ml-1">
//               Create Account
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }








"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      toast.error(data.error || "Invalid credentials");
      return;
    }

    // toast.success("Welcome back 👋");
    // router.push("/chat");


    toast.success("Login successful", {
      duration: 1200,
    });

    setTimeout(() => {
      router.push("/chat");
    }, 1200); 
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg">
        <form onSubmit={handleSubmit}>
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
            Login
          </h2>

          <input
            className="w-full border p-3 mb-4 rounded-lg text-gray-700 outline-none"
            placeholder="Username"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />

          <div className="relative mb-6">
            <input
              type={showPass ? "text" : "password"}
              className="w-full border p-3 rounded-lg  text-gray-700 outline-none"
              placeholder="Password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-3 text-gray-400"
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Enter Chat"}
          </button>

          <p className="mt-6 text-center text-base text-gray-500">
            New here?
            <Link href="/signup" className="text-blue-600 font-bold ml-1">
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
