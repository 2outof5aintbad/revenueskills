import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import type { Submission } from "@/app/api/skills/submit/route";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status"); // pending | approved | rejected | null (all)

  const all = await kv.lrange<Submission>("submissions", 0, -1);
  const submissions = (all ?? []).filter((s) =>
    status ? s.status === status : true
  );

  // Most recent first
  submissions.sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  );

  return NextResponse.json({ submissions });
}
