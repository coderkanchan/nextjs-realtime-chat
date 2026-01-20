// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/db";
// import { User } from "@/models/User";

// export async function GET() {
//   await connectDB();
//   const users = await User.find().select("username -_id").lean();
//   return NextResponse.json(users.map(u => u.username));
// }



// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/db";
// import { User } from "@/models/User";

// export async function GET() {
//   try {
//     await connectDB();

//     const users = await User.find()
//       .select("username -_id")
//       .lean();

//     return NextResponse.json(users.map(u => u.username));
//   } catch (error) {
//     console.error("USERS FETCH ERROR", error);
//     return NextResponse.json([], { status: 500 });
//   }
// }
