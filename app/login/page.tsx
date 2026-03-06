"use client";
import { signIn } from "next-auth/react";
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

    toast.success("Login successful", { duration: 800 });

    setTimeout(() => {
      router.push("/welcome");
    }, 800);
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
            className={`w-full text-lg  p-3 py-4 rounded-lg font-bold  
              ${loading ? "text-gray-500 disabled:bg-gray-300 cursor-not-allowed"
                : "text-white bg-blue-600 hover:bg-blue-700 cursor-pointer"}`}
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
        <div className="mt-4 flex items-center justify-between">
          <hr className="w-full border-gray-300" />
          <span className="px-2 text-gray-400 text-sm">OR</span>
          <hr className="w-full border-gray-300" />
        </div>

        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/welcome" })}
          className="mt-4 w-full flex items-center justify-center gap-2 border p-3 rounded-lg hover:bg-gray-50 transition font-semibold text-gray-700"
        >
          <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-5 h-5" alt="Google" />
          Continue with Google
        </button>
      </div>
    </div>
  );
}