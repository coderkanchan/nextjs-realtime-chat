// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/db";
// import { Message } from "@/models/Message";

// export async function GET(req: Request) {
//   await connectDB();

//   const { searchParams } = new URL(req.url);
//   const username = searchParams.get("user");

//   if (!username) {
//     return NextResponse.json([], { status: 200 });
//   }

//   const messages = await Message.find({
//     $or: [{ senderId: username }, { receiverId: username }]
//   })
//     .sort({ createdAt: -1 })
//     .lean();

//   return NextResponse.json(messages);
// }



// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/db";
// import { Message } from "@/models/Message";

// export async function GET(req: Request) {
//   try {
//     await connectDB();

//     const { searchParams } = new URL(req.url);
//     const username = searchParams.get("user");

//     if (!username) {
//       return NextResponse.json([], { status: 200 });
//     }

//     const messages = await Message.find({
//       $or: [
//         { senderId: username },
//         { receiverId: username }
//       ]
//     })
//       .sort({ createdAt: -1 })
//       .lean();

//     return NextResponse.json(messages);
//   } catch (error) {
//     console.error("RECENT CHAT ERROR", error);
//     return NextResponse.json([], { status: 500 });
//   }
// }
