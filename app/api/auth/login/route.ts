// import { NextResponse } from "next/server";
// import mongoose from "mongoose";
// import { User } from "@/models/User";

// export async function POST(req: Request) {
//   try {
//     const { username, password } = await req.json();
//     if (!mongoose.connections[0].readyState) {
//       await mongoose.connect(process.env.MONGO_URI as string);
//     }
//     const user = await User.findOne({ username, password });
//     if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

//     return NextResponse.json({ username: user.username }, { status: 200 });
//   } catch (err) {
//     return NextResponse.json({ error: "Login failed" }, { status: 500 });
//   }
// }




// import { NextResponse } from "next/server";
// import mongoose from "mongoose";
// import { User } from "@/models/User";

// export async function POST(req: Request) {
//   try {
//     const { username, password } = await req.json();

//     if (!mongoose.connections[0].readyState) {
//       await mongoose.connect(process.env.MONGO_URI as string);
//     }

//     // 1. Pehle check karo ki user database mein hai bhi ya nahi
//     const user = await User.findOne({ username });

//     if (!user) {
//       // Agar user nahi mila, toh login rok do
//       return NextResponse.json(
//         { error: "User not found. Please Sign Up first!" },
//         { status: 401 }
//       );
//     }

//     // 2. Agar user mil gaya, ab password match karo
//     if (user.password !== password) {
//       return NextResponse.json(
//         { error: "Incorrect password. Please try again." },
//         { status: 401 }
//       );
//     }

//     // 3. Agar dono sahi hain, tabhi login successful karo
//     return NextResponse.json(
//       { username: user.username, message: "Login successful" },
//       { status: 200 }
//     );

//   } catch (err) {
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }





import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";

export async function POST(req: Request) {
  const { username, password } = await req.json();
  await connectDB();

  const user = await User.findOne({ username });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 401 });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return NextResponse.json({ error: "Wrong password" }, { status: 401 });

  const token = jwt.sign(
    { username: user.username },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  const res = NextResponse.json({ username: user.username });
  res.cookies.set("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  return res;
}
