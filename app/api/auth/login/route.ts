

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
