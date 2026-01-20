import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";

export async function GET(req: Request) {
  try {
    // 1️⃣ Get token from cookies
    const cookieHeader = req.headers.get("cookie");
    const token = cookieHeader
      ?.split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    // 2️⃣ Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    ) as {
      userId: string;
      username: string;
    };

    await connectDB();

    // 3️⃣ Find user
    const user = await User.findById(decoded.userId)
      .select("-password")
      .lean();

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // 4️⃣ Return user data
    return NextResponse.json(
      {
        user,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("AUTH ME ERROR 👉", err);

    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
}
