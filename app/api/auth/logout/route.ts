import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ message: "Logged out successfully" });

  res.cookies.set("token", "", {
    path: "/",
    maxAge: 0,
  });

  res.cookies.set("next-auth.session-token", "", {
    path: "/",
    maxAge: 0,
  });

  res.cookies.set("__Secure-next-auth.session-token", "", {
    path: "/",
    maxAge: 0,
  });

  res.cookies.set("next-auth.csrf-token", "", { path: "/", maxAge: 0 });
  res.cookies.set("__Host-next-auth.csrf-token", "", { path: "/", maxAge: 0 });

  return res;
}