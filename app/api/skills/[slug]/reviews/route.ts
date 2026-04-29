import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { SKILLS } from "@/lib/skills";
import type { Review } from "@/types/skill";

interface RouteContext {
  params: { slug: string };
}

export async function GET(_req: Request, { params }: RouteContext) {
  const skill = SKILLS.find((s) => s.slug === params.slug);
  if (!skill) return NextResponse.json({ error: "Skill not found." }, { status: 404 });

  const reviews = await kv.lrange<Review>(`reviews:${params.slug}`, 0, -1);
  return NextResponse.json({ reviews: reviews ?? [] });
}

export async function POST(req: Request, { params }: RouteContext) {
  const skill = SKILLS.find((s) => s.slug === params.slug);
  if (!skill) return NextResponse.json({ error: "Skill not found." }, { status: 404 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const rating = Number(body.rating);
  const text = String(body.text ?? "").trim();
  const author = String(body.author ?? "").trim() || "@anonymous";

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Rating must be an integer between 1 and 5." }, { status: 422 });
  }
  if (text.length < 10) {
    return NextResponse.json({ error: "Review text must be at least 10 characters." }, { status: 422 });
  }

  const review: Review = {
    id: `r_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    rating,
    text,
    author: author.startsWith("@") ? author : `@${author}`,
    date: new Date().toISOString(),
  };

  await kv.lpush(`reviews:${params.slug}`, review);

  return NextResponse.json({ review }, { status: 201 });
}
