
// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { connectDB } from "@/lib/db";
// import { User } from "@/models/User";

// export async function POST(req: Request) {
//   try {
//     const { username, email, password } = await req.json();

//     if (!username || !email || !password) {
//       return NextResponse.json(
//         { error: "All fields are required" },
//         { status: 400 }
//       );
//     }

//     await connectDB();

//     const exists = await User.findOne({
//       $or: [{ username }, { email }],
//     });

//     if (exists) {
//       return NextResponse.json(
//         { error: "Username or email already exists" },
//         { status: 400 }
//       );
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       username,
//       email,
//       password: hashedPassword,
//     });

//     if (!process.env.JWT_SECRET) {
//       throw new Error("JWT_SECRET is not defined");
//     }

//     const token = jwt.sign(
//       { username: user.username },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     const res = NextResponse.json(
//       {
//         username: user.username,
//         message: "Signup successful",
//       },
//       { status: 201 }
//     );

//     res.cookies.set("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "lax",
//       path: "/",
//     });

//     return res;
//   } catch (err: any) {
//     console.error("SIGNUP ERROR 👉", err);

//     return NextResponse.json(
//       { error: err.message || "Signup failed" },
//       { status: 500 }
//     );
//   }
// }






// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { connectDB } from "@/lib/db";
// import { User } from "@/models/User";

// export async function POST(req: Request) {
//   try {
//     const { username, email, password } = await req.json();

//     if (!username || !email || !password) {
//       return NextResponse.json(
//         { error: "All fields are required" },
//         { status: 400 }
//       );
//     }

//     await connectDB();

//     const exists = await User.findOne({
//       $or: [{ username }, { email }],
//     });

//     if (exists) {
//       return NextResponse.json(
//         { error: "Username or email already exists" },
//         { status: 409 }
//       );
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       username,
//       email,
//       password: hashedPassword,
//     });

//     if (!process.env.JWT_SECRET) {
//       throw new Error("JWT_SECRET is not defined");
//     }

//     const token = jwt.sign(
//       { username: user.username },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     const res = NextResponse.json(
//       { username: user.username, message: "Signup successful" },
//       { status: 201 }
//     );

//     res.cookies.set("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "lax",
//       path: "/",
//     });

//     return res;

//   } catch (err: any) {
//     console.error("SIGNUP ERROR 👉", err);

//     // ⭐ PROFESSIONAL DUPLICATE KEY HANDLING
//     if (err.code === 11000) {
//       return NextResponse.json(
//         { error: "Username or email already exists" },
//         { status: 409 }
//       );
//     }

//     return NextResponse.json(
//       { error: "Signup failed" },
//       { status: 500 }
//     );
//   }
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

    const exists = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (exists) {
      return NextResponse.json(
        { error: "Username or email already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    // ✅ FIX: token me userId add
    const token = jwt.sign(
      { userId: user._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const res = NextResponse.json(
      {
        username: user.username,
        message: "Signup successful",
      },
      { status: 201 }
    );

    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return res;
  } catch (err: any) {
    console.error("SIGNUP ERROR 👉", err);

    return NextResponse.json(
      { error: err.message || "Signup failed" },
      { status: 500 }
    );
  }
}
