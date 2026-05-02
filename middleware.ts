import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const PUBLIC_PATHS = [
  "/login",
  "/api/auth/send",
  "/api/auth/verify",
  "/api/auth/logout",
  "/_next",
  "/favicon.ico",
];

function isPublic(pathname: string) {
  return PUBLIC_PATHS.some((p) => pathname.startsWith(p));
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin section uses its own password gate — keep as-is
  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") return NextResponse.next();
    const token = request.cookies.get("admin_token")?.value;
    const secret = process.env.ADMIN_SECRET;
    if (!secret || token !== secret) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  if (isPublic(pathname)) return NextResponse.next();

  const sessionToken = request.cookies.get("rs_session")?.value;
  const secret = process.env.SESSION_SECRET;

  if (sessionToken && secret) {
    try {
      await jwtVerify(sessionToken, new TextEncoder().encode(secret));
      return NextResponse.next();
    } catch {
      // Token invalid or expired — fall through to redirect
    }
  }

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = "/login";
  loginUrl.searchParams.set("from", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
