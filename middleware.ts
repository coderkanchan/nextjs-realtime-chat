// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(req: NextRequest) {
//   const token = req.cookies.get("token")?.value;

//   const isAuthPage =
//     req.nextUrl.pathname.startsWith("/login") ||
//     req.nextUrl.pathname.startsWith("/signup");

//   if (!token && req.nextUrl.pathname.startsWith("/chat")) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   if (token && isAuthPage) {
//     return NextResponse.redirect(new URL("/chat", req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/chat/:path*", "/login", "/signup"],
// };







import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;

  const isAuthPage =
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup");

  const isProtectedPage =
    pathname.startsWith("/chat") ||
    pathname.startsWith("/welcome");

  // ❌ Not logged in → block protected pages
  if (!token && isProtectedPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // ✅ Logged in → block auth pages
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/chat", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/chat/:path*", "/welcome", "/login", "/signup"],
};
