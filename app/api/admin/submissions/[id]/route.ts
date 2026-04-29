import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import type { Submission } from "@/app/api/skills/submit/route";

interface RouteContext {
  params: { id: string };
}

export async function GET(_req: Request, { params }: RouteContext) {
  const all = await kv.lrange<Submission>("submissions", 0, -1);
  const submission = (all ?? []).find((s) => s.id === params.id);
  if (!submission) {
    return NextResponse.json({ error: "Submission not found." }, { status: 404 });
  }
  return NextResponse.json({ submission });
}

export async function PATCH(req: Request, { params }: RouteContext) {
  const body = await req.json().catch(() => ({}));
  const newStatus = body.status as "approved" | "rejected" | "pending";

  if (!["approved", "rejected", "pending"].includes(newStatus)) {
    return NextResponse.json({ error: "Invalid status." }, { status: 422 });
  }

  const all = await kv.lrange<Submission>("submissions", 0, -1);
  const idx = (all ?? []).findIndex((s) => s.id === params.id);

  if (idx === -1) {
    return NextResponse.json({ error: "Submission not found." }, { status: 404 });
  }

  const updated: Submission = { ...all[idx], status: newStatus };

  // KV lists don't support in-place update — delete the list and rewrite it
  const pipeline = kv.pipeline();
  pipeline.del("submissions");
  const rewritten = [...all];
  rewritten[idx] = updated;
  for (const sub of [...rewritten].reverse()) {
    pipeline.lpush("submissions", sub);
  }
  await pipeline.exec();

  return NextResponse.json({ submission: updated });
}
