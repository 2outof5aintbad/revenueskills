import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COKE_COOKIE = "coke_access";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Admin gate ────────────────────────────────────────────────────────────
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

  // ── Coke gate ─────────────────────────────────────────────────────────────
  if (pathname.startsWith("/coke")) {
    const secret = process.env.COKE_ACCESS_TOKEN;

    // No token configured — open access (safe for local dev)
    if (!secret) return NextResponse.next();

    // Valid cookie already set — let them through
    const cookie = request.cookies.get(COKE_COOKIE)?.value;
    if (cookie === secret) return NextResponse.next();

    // Token in query param — set cookie and redirect to clean URL
    const param = request.nextUrl.searchParams.get("token");
    if (param === secret) {
      const cleanUrl = request.nextUrl.clone();
      cleanUrl.searchParams.delete("token");
      const response = NextResponse.redirect(cleanUrl);
      response.cookies.set(COKE_COOKIE, secret, {
        httpOnly: true,
        sameSite: "lax",
        path: "/coke",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
      return response;
    }

    // No valid token — show gate page
    const gateUrl = request.nextUrl.clone();
    gateUrl.pathname = "/coke/gate";
    return NextResponse.rewrite(gateUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/coke/:path*", "/coke"],
};
