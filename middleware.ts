// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(req: NextRequest) {
//   const token = req.cookies.get("token")?.value || req.cookies.get("next-auth.session-token")?.value;
//   const { pathname } = req.nextUrl;

//   const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/signup");

//   const isProtectedPage = pathname.startsWith("/chat") || pathname.startsWith("/welcome");

//   if (!token && isProtectedPage) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   if (token && isAuthPage) {
//     return NextResponse.redirect(new URL("/chat", req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/chat/:path*",
//     "/welcome/:path*",
//     "/login",
//     "/signup"
//   ],
// };



import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  
  const manualToken = req.cookies.get("token")?.value;

  const nextAuthToken = req.cookies.get("next-auth.session-token")?.value ||
    req.cookies.get("__Secure-next-auth.session-token")?.value;

  const token = manualToken || nextAuthToken;
  const { pathname } = req.nextUrl;

  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/signup");
  const isProtectedPage = pathname.startsWith("/chat") || pathname.startsWith("/welcome");

  if (!token && isProtectedPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/chat", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/chat/:path*", "/welcome/:path*", "/login", "/signup"],
};