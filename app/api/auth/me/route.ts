
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";

export async function GET(req: Request) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);

    if (session?.user?.email) {
      const googleUser = await User.findOne({ email: session.user.email })
        .select("-password")
        .lean();

      if (googleUser) {
        return NextResponse.json({ user: googleUser }, { status: 200 });
      }
    }

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

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    ) as {
      userId: string;
      username: string;
    };

    const user = await User.findById(decoded.userId)
      .select("-password")
      .lean();

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ user }, { status: 200 });

  } catch (err) {
    console.error("AUTH ME ERROR 👉", err);

    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
}