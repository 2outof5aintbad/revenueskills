import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { SignJWT } from "jose";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  const secret = process.env.SESSION_SECRET;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

  if (!token || !secret) {
    return NextResponse.redirect(`${baseUrl}/login?error=invalid`);
  }

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
    const email = payload.email as string;

    // Issue a longer-lived session token
    const sessionToken = await new SignJWT({ email })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .setIssuedAt()
      .sign(new TextEncoder().encode(secret));

    const res = NextResponse.redirect(`${baseUrl}/`);
    res.cookies.set("rs_session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    return res;
  } catch {
    return NextResponse.redirect(`${baseUrl}/login?error=expired`);
  }
}
