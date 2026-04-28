import { NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { SKILLS } from "@/lib/skills";
import type { Review } from "@/types/skill";

const REVIEWS_PATH = join(process.cwd(), "data", "reviews.json");

type ReviewStore = Record<string, Review[]>;

function readStore(): ReviewStore {
  try {
    return JSON.parse(readFileSync(REVIEWS_PATH, "utf-8"));
  } catch {
    return {};
  }
}

function writeStore(store: ReviewStore): void {
  writeFileSync(REVIEWS_PATH, JSON.stringify(store, null, 2));
}

interface RouteContext {
  params: { slug: string };
}

export async function GET(_req: Request, { params }: RouteContext) {
  const skill = SKILLS.find((s) => s.slug === params.slug);
  if (!skill) return NextResponse.json({ error: "Skill not found." }, { status: 404 });

  const store = readStore();
  const persisted = store[params.slug] ?? [];
  return NextResponse.json({ reviews: persisted });
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

  const store = readStore();
  store[params.slug] = [review, ...(store[params.slug] ?? [])];
  writeStore(store);

  return NextResponse.json({ review }, { status: 201 });
}
