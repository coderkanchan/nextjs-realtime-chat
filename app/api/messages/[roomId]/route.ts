import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { Message } from "@/models/Message";

const MONGO_URI = process.env.MONGO_URI!;

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(MONGO_URI);
}

export async function GET(req: Request, { params }: { params: Promise<{ roomId: string }> }) {
  try {
    await connectDB();
    const { roomId } = await params;
    
    const messages = await Message.find({ roomId }).sort({ createdAt: 1 });

    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}