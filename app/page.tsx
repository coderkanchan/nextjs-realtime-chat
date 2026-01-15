
"use client";
import Link from "next/link";
import { MessageCircle, Shield, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-800 text-black font-sans">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <MessageCircle className="text-white" />
          </div>
          <span className="text-xl text-white  font-bold tracking-tight">ChatFlow</span>
        </div>
        <div className="space-x-4">
          <Link href="/login" className="text-white font-medium hover:text-blue-600 transition">Login</Link>
          <Link href="/signup" className="bg-black text-white px-5 py-2 rounded-full font-medium hover:bg-blue-600 transition">Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className=" text-white text-6xl md:text-7xl font-bold mb-6 ">
          Connect with anyone, <br />
          <span className="text-blue-600 ">anywhere in real-time.</span>
        </h1>
        <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-10">
          A professional messaging platform built for speed, security, and simplicity.
          No complex setups, just pure conversation.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/signup" className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:shadow-lg hover:shadow-gray-900 transition">
            Start Chatting Now
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="bg-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          <div className="p-8 bg-blue-100 hover:bg-white  hover:shodow-xl  cursor-pointer rounded-2xl border border-gray-100 shadow-sm">
            <Zap className="text-blue-600 mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">Instant Delivery</h3>
            <p className="text-gray-500">Messages travel at the speed of light using our Socket-optimized network.</p>
          </div>
          <div className="p-8 bg-blue-100 hover:bg-white hover:shodow-xl  cursor-pointer rounded-2xl border border-gray-100 shadow-sm">
            <Shield className="text-blue-600 mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">Secure & Private</h3>
            <p className="text-gray-500">Your conversations are protected with database-level security and authentication.</p>
          </div>
          <div className="p-8 bg-blue-100 hover:bg-white hover:shodow-xl cursor-pointer rounded-2xl border border-gray-100 shadow-2xl">
            <MessageCircle className="text-blue-600 mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">Seamless UI</h3>
            <p className="text-gray-500">A clean, distraction-free interface designed for the best chatting experience.</p>
          </div>
        </div>
      </section>
    </div>
  );
}