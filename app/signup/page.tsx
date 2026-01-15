// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { Eye, EyeOff } from "lucide-react"; // Icons install karein: npm install lucide-react

// export default function SignupPage() {
//   const [form, setForm] = useState({ username: "", email: "", password: "" });
//   const [showPass, setShowPass] = useState(false);
//   const router = useRouter();

//   const handleSignup = async () => {
//     const res = await fetch("/api/auth/signup", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     });
//     const data = await res.json();
//     if (res.ok) {
//       alert("Account created! Please login.");
//       router.push("/chat");
//     } else {
//       alert(data.error);
//     }
//   };

//   return (
//     <div className="h-screen flex items-center justify-center bg-gray-100 font-sans text-black">
//       <div className="bg-white p-8 rounded-xl shadow-xl w-96 border">
//         <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-600">Join Us</h2>
//         <input
//           className="w-full border p-3 rounded-lg mb-4 outline-none focus:ring-2 focus:ring-blue-400"
//           placeholder="Username"
//           onChange={(e) => setForm({ ...form, username: e.target.value })}
//         />
//         <input
//           className="w-full border p-3 rounded-lg mb-4 outline-none focus:ring-2 focus:ring-blue-400"
//           placeholder="Email Address"
//           type="email"
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//         />
//         <div className="relative mb-6">
//           <input
//             type={showPass ? "text" : "password"}
//             className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
//             placeholder="Password"
//             onChange={(e) => setForm({ ...form, password: e.target.value })}
//           />
//           <button onClick={() => setShowPass(!showPass)} className="absolute right-3 top-3 text-gray-400">
//             {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
//           </button>
//         </div>
//         <button onClick={handleSignup} className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition">
//           Sign Up
//         </button>
//         <p className="mt-6 text-center text-gray-600 text-sm">
//           Already a member? <Link href="/login" className="text-blue-600 font-bold ml-1">Login</Link>
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

// export default function SignupPage() {
//   const [form, setForm] = useState({ username: "", email: "", password: "" });
//   const [showPass, setShowPass] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     const res = await fetch("/api/auth/signup", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     });

//     const data = await res.json();
//     setLoading(false);

//     if (!res.ok) {
//       setError(data.error || "Signup failed");
//       return;
//     }

//     router.push("/chat"); // ✅ auto login
//   };

//   return (
//     <div className="h-screen flex items-center justify-center bg-gray-800">
//       <div className="bg-white p-8 rounded-xl shadow-xl w-96">
//         <form onSubmit={handleSubmit}>
//           <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-600">
//             Join Us
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

//           <input
//             className="w-full border p-3 rounded-lg mb-4"
//             placeholder="Email"
//             type="email"
//             onChange={(e) => setForm({ ...form, email: e.target.value })}
//           />

//           <div className="relative mb-6">
//             <input
//               type={showPass ? "text" : "password"}
//               className="w-full border p-3 rounded-lg"
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
//             // onClick={handleSignup}
//             className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold disabled:opacity-50"
//           >
//             {loading ? "Creating account..." : "Sign Up"}
//           </button>

//           <p className="mt-6 text-center text-sm">
//             Already a member?
//             <Link href="/login" className="text-blue-600 font-bold ml-1">
//               Login
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }






// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { Eye, EyeOff } from "lucide-react";

// export default function SignupPage() {
//   const [form, setForm] = useState({ username: "", email: "", password: "" });
//   const [showPass, setShowPass] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (loading) return;

//     setError("");

//     if (!form.username || !form.email || !form.password) {
//       setError("All fields are required");
//       return;
//     }

//     if (form.password.length < 6) {
//       setError("Password must be at least 6 characters");
//       return;
//     }

//     setLoading(true);

//     const res = await fetch("/api/auth/signup", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     });

//     const data = await res.json();
//     setLoading(false);

//     if (!res.ok) {
//       setError(data.error || "Signup failed");
//       return;
//     }

//     router.push("/chat");
//   };

//   return (
//     <div className="h-screen flex items-center justify-center bg-gray-800">
//       <div className="bg-white p-8 rounded-xl shadow-xl w-96">
//         <form onSubmit={handleSubmit}>
//           <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-600">
//             Join Us
//           </h2>

//           {error && (
//             <p className="mb-4 text-sm text-red-600 bg-red-50 p-2 rounded">
//               {error}
//             </p>
//           )}

//           <input
//             required
//             autoComplete="username"
//             className="w-full border-2 p-3 rounded-lg mb-4 outline-none border-gray-700 text-gray-700 "
//             placeholder="Username"
//             onChange={(e) => setForm({ ...form, username: e.target.value })}
//           />

//           <input
//             required
//             autoComplete="email"
//             type="email"
//             className="w-full border-2 p-3 rounded-lg mb-4 outline-none border-gray-700 text-gray-700 "
//             placeholder="Email"
//             onChange={(e) => setForm({ ...form, email: e.target.value })}
//           />

//           <div className="relative mb-6">
//             <input
//               required
//               autoComplete="new-password"
//               type={showPass ? "text" : "password"}
//               className="w-full border-2 p-3 rounded-lg outline-none border-gray-800 text-gray-700 "
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
//             {loading ? "Creating account..." : "Sign Up"}
//           </button>

//           <p className="mt-6 text-center text-base  text-gray-800">
//             Already a member?
//             <Link href="/login" className="text-blue-600 font-bold ml-1">
//               Login
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
import { getPasswordStrength } from "@/utils/password";

export default function SignupPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const strength = getPasswordStrength(form.password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (strength < 3) {
      toast.error("Password too weak");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      toast.error(data.error || "Signup failed");
      return;
    }

    // toast.success("Account created successfully");
    // router.push("/login");

    toast.success("Account created successfully", { duration: 800,});

    setTimeout(() => {
      router.push("/welcome");
    }, 800);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-2xl">
        <form onSubmit={handleSubmit}>
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
            Create Account
          </h2>

          <input
            className="w-full border p-3 rounded-lg mb-4 text-gray-700 outline-none"
            placeholder="Username"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />

          <input
            type="email"
            className="w-full border p-3 rounded-lg mb-4 text-gray-700 outline-none"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <div className="relative mb-2">
            <input
              type={showPass ? "text" : "password"}
              className="w-full border p-3 rounded-lg text-gray-700 outline-none"
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

          {/* Password strength */}
          <div className="mb-3">
            <div className="flex gap-1">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className={`h-1 flex-1 rounded ${strength >= n ? "bg-green-500" : "bg-gray-200"
                    }`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Use 8+ chars, uppercase, number & symbol
            </p>
          </div>


          <input
            type="password"
            className="w-full border p-3 mb-4 rounded-lg  text-gray-700 outline-none"
            placeholder="Confirm Password"
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
            required
          />

          <button
            disabled={loading}
            className={`w-full text-lg  p-3 py-4 rounded-lg font-bold  
              ${loading ? "text-gray-500 disabled:bg-gray-300 cursor-not-allowed"
                : "text-white bg-blue-600 hover:bg-blue-700 cursor-pointer"}`}
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>

          <p className="mt-6 text-center text-base text-gray-500">
            Already a member?
            <Link href="/login" className="text-blue-600 font-bold ml-1">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
