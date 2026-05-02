import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import { Resend } from "resend";

export async function POST(req: Request) {
  const { email } = await req.json().catch(() => ({}));

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Email required." }, { status: 400 });
  }

  if (!email.toLowerCase().endsWith("@salesforce.com")) {
    return NextResponse.json({ error: "not-salesforce" }, { status: 403 });
  }

  const secret = process.env.SESSION_SECRET;
  const resendKey = process.env.RESEND_API_KEY;
  if (!secret || !resendKey) {
    return NextResponse.json({ error: "Server misconfigured." }, { status: 500 });
  }
  const resend = new Resend(resendKey);

  const token = await new SignJWT({ email: email.toLowerCase() })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("15m")
    .setIssuedAt()
    .sign(new TextEncoder().encode(secret));

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  const link = `${baseUrl}/api/auth/verify?token=${encodeURIComponent(token)}`;

  await resend.emails.send({
    from: "RevenueSkills <onboarding@resend.dev>",
    to: email,
    replyTo: "mike.emery.95@gmail.com",
    subject: "Your RevenueSkills login link",
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;">
        <h2 style="font-size:20px;font-weight:700;color:#0f1729;margin:0 0 8px">Sign in to RevenueSkills</h2>
        <p style="font-size:14px;color:#6b7280;margin:0 0 24px">Click the button below to sign in. This link expires in 15 minutes.</p>
        <a href="${link}" style="display:inline-block;background:#0f1729;color:#fff;font-size:14px;font-weight:600;padding:12px 24px;border-radius:8px;text-decoration:none;">Sign in to RevenueSkills</a>
        <p style="font-size:12px;color:#9ca3af;margin:24px 0 0">If you didn't request this, you can ignore this email.</p>
      </div>
    `,
  });

  return NextResponse.json({ ok: true });
}
