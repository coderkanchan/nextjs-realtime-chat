// import { NextResponse } from "next/server";
// import mongoose from "mongoose";
// import { User } from "@/models/User";

// export async function POST(req: Request) {
//   try {
//     const { username, password } = await req.json();
//     if (!mongoose.connections[0].readyState) {
//       await mongoose.connect(process.env.MONGO_URI as string);
//     }
//     const exists = await User.findOne({ username });
//     if (exists) return NextResponse.json({ error: "Username taken" }, { status: 400 });

//     const newUser = new User({ username, password });
//     await newUser.save();
//     return NextResponse.json({ message: "User created" }, { status: 201 });
//   } catch (err) {
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }



// import { NextResponse } from "next/server";
// import mongoose from "mongoose";
// import { User } from "@/models/User";

// export async function POST(req: Request) {
//   try {
//     const { username, email, password } = await req.json();
//     if (!mongoose.connections[0].readyState) await mongoose.connect(process.env.MONGO_URI as string);

//     const exists = await User.findOne({ $or: [{ username }, { email }] });
//     if (exists) return NextResponse.json({ error: "Username or Email already exists" }, { status: 400 });

//     const newUser = new User({ username, email, password });
//     await newUser.save();
//     return NextResponse.json({ message: "User created" }, { status: 201 });
//   } catch (err) { return NextResponse.json({ error: "Signup failed" }, { status: 500 }); }
// }





// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import { connectDB } from "@/lib/db";
// import { User } from "@/models/User";

// export async function POST(req: Request) {
//   const { username, email, password } = await req.json();
//   await connectDB();

//   const exists = await User.findOne({ $or: [{ username }, { email }] });
//   if (exists)
//     return NextResponse.json({ error: "User exists" }, { status: 400 });

//   const hashed = await bcrypt.hash(password, 10);

//   await User.create({
//     username,
//     email,
//     password: hashed,
//   });

//   return NextResponse.json({ message: "Account created" }, { status: 201 });
// }





import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const exists = await User.findOne({ $or: [{ username }, { email }] });
    if (exists) {
      return NextResponse.json(
        { error: "Username or email already exists" },
        { status: 400 }
      );
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashed });

    const token = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    const res = NextResponse.json(
      { username: user.username, message: "Signup successful" },
      { status: 201 }
    );

    res.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return res;
  } catch {
    return NextResponse.json({ error: "Signup failed" }, { status: 500 });
  }
}
