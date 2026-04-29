import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { validateSkill } from "@/lib/skillValidator";
import { generateSkillMarkdown, type SkillFormData } from "@/lib/skillGenerator";
import type { SkillCategory } from "@/types/skill";

const VALID_CATEGORIES: SkillCategory[] = [
  "sales",
  "research",
  "productivity",
  "writing",
  "data",
  "customer-success",
];

export interface Submission {
  id: string;
  submittedAt: string;
  status: "pending" | "approved" | "rejected";
  score: number;
  skillMd: string;
  formData: SkillFormData;
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const formData: SkillFormData = {
    name: String(body.name ?? ""),
    description: String(body.description ?? ""),
    category: String(body.category ?? "") as SkillCategory,
    tags: String(body.tags ?? ""),
    author: String(body.author ?? ""),
    version: body.version ? String(body.version) : undefined,
    purpose: String(body.purpose ?? ""),
    instructions: String(body.instructions ?? ""),
    triggers: String(body.triggers ?? ""),
  };

  if (!VALID_CATEGORIES.includes(formData.category)) {
    return NextResponse.json(
      { error: "Invalid category.", field: "category" },
      { status: 422 }
    );
  }

  const validation = validateSkill(formData);
  if (!validation.isValid) {
    return NextResponse.json(
      { error: "Skill did not meet quality threshold.", score: validation.score, issues: validation.issues },
      { status: 422 }
    );
  }

  let skillMd: string;
  try {
    skillMd = generateSkillMarkdown(formData);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to generate skill." },
      { status: 422 }
    );
  }

  const submission: Submission = {
    id: `sub_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    submittedAt: new Date().toISOString(),
    status: "pending",
    score: validation.score,
    skillMd,
    formData,
  };

  await kv.lpush("submissions", submission);

  return NextResponse.json({ id: submission.id, score: validation.score }, { status: 201 });
}
