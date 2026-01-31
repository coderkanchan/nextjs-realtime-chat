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

    toast.success("Account created successfully", { duration: 800 });

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