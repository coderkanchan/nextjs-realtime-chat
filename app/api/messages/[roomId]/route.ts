// import { NextResponse } from "next/server";
// import {connectDB} from "@/lib/db";
// import {Message} from "@/models/Message";

// export async function GET(
//   req: Request,
//   { params }: { params: { roomId: string } }
// ) {
//   await connectDB();

//   const messages = await Message.find({
//     roomId: params.roomId,
//   }).sort({ createdAt: 1 });

//   return NextResponse.json(messages);
// }




// import { connectDB } from "@/lib/db";
// import { Message } from "@/models/Message";
// import { NextResponse } from "next/server";

// export async function GET(req: Request, { params }: { params: { roomId: string } }) {
//   try {
//     await connectDB();
//     const { roomId } = params;

//     // RoomId ke basis par saare messages fetch karein aur purane messages pehle dikhayein (.sort)
//     const messages = await Message.find({ roomId }).sort({ createdAt: 1 });

//     return NextResponse.json(messages);
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
//   }
// }










import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Message } from "@/models/Message";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ roomId: string }> } // Promise type add kiya
) {
  try {
    await connectDB();

    // ✅ FIX: params ko await karna zaroori hai Next.js 15/16 mein
    const { roomId } = await params;

    const messages = await Message.find({
      roomId: roomId,
    }).sort({ createdAt: 1 }).lean();

    return NextResponse.json(messages);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}