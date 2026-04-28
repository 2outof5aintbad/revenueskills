"use client";

import { useState, useCallback } from "react";
import { validateSkill } from "@/lib/skillValidator";
import type { SkillFormData } from "@/lib/skillGenerator";
import type { SkillCategory } from "@/types/skill";

export interface FormState {
  name: string;
  description: string;
  category: SkillCategory | "";
  tags: string;
  author: string;
  version: string;
  purpose: string;
  instructions: string;
  triggers: string;
}

export const EMPTY_FORM: FormState = {
  name: "",
  description: "",
  category: "",
  tags: "",
  author: "",
  version: "",
  purpose: "",
  instructions: "",
  triggers: "",
};

type Status = "idle" | "submitting" | "success" | "error";

function scoreColor(score: number): string {
  if (score >= 80) return "text-green-600";
  if (score >= 60) return "text-amber-600";
  return "text-red-500";
}

function scoreBg(score: number): string {
  if (score >= 80) return "bg-green-50 border-green-200";
  if (score >= 60) return "bg-amber-50 border-amber-200";
  return "bg-red-50 border-red-200";
}

export default function SubmitForm({ onFormChange }: { onFormChange?: (form: FormState) => void }) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [status, setStatus] = useState<Status>("idle");
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const set = useCallback(
    (field: keyof FormState) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm((prev) => {
          const next = { ...prev, [field]: e.target.value };
          onFormChange?.(next);
          return next;
        });
      },
    [onFormChange]
  );

  const asFormData = (): SkillFormData | null => {
    if (!form.category) return null;
    return {
      name: form.name,
      description: form.description,
      category: form.category as SkillCategory,
      tags: form.tags,
      author: form.author,
      version: form.version || undefined,
      purpose: form.purpose,
      instructions: form.instructions,
      triggers: form.triggers,
    };
  };

  const fd = asFormData();
  const validation = fd ? validateSkill(fd) : null;
  const score = validation?.score ?? 0;
  const issues = validation?.issues ?? [];
  const canSubmit = validation?.isValid === true && status !== "submitting";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus("submitting");
    setServerError(null);

    try {
      const res = await fetch("/api/skills/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError(data.error ?? "Submission failed. Please try again.");
        setStatus("error");
        return;
      }

      setSubmissionId(data.id);
      setStatus("success");
      setForm(EMPTY_FORM);
      onFormChange?.(EMPTY_FORM);
    } catch {
      setServerError("Network error — please check your connection and try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center space-y-2">
        <p className="text-lg font-semibold text-green-800">Skill submitted for review</p>
        <p className="text-sm text-green-700">
          Your skill is in the review queue. Submission ID:{" "}
          <code className="font-mono text-xs bg-green-100 px-1 py-0.5 rounded">{submissionId}</code>
        </p>
        <button
          className="mt-4 text-sm text-green-700 underline underline-offset-2"
          onClick={() => { setStatus("idle"); setSubmissionId(null); }}
        >
          Submit another skill
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 pb-16">
      <div>
        <label className="block text-sm font-medium text-ink-700 mb-1.5">Skill Name</label>
        <input
          type="text"
          placeholder="e.g. Deal Coach"
          className="field"
          value={form.name}
          onChange={set("name")}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-ink-700 mb-1.5">Description</label>
        <textarea
          rows={3}
          placeholder="What does this skill do and who is it for?"
          className="field resize-none"
          value={form.description}
          onChange={set("description")}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-ink-700 mb-1.5">Category</label>
          <select className="field" value={form.category} onChange={set("category")}>
            <option value="">Select a category</option>
            <option value="sales">Sales</option>
            <option value="research">Research</option>
            <option value="productivity">Productivity</option>
            <option value="writing">Writing</option>
            <option value="data">Data &amp; Analytics</option>
            <option value="customer-success">Customer Success</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-ink-700 mb-1.5">
            Author <span className="font-normal text-ink-400">(your handle)</span>
          </label>
          <input
            type="text"
            placeholder="@you"
            className="field"
            value={form.author}
            onChange={set("author")}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-ink-700 mb-1.5">
            Tags <span className="font-normal text-ink-400">(comma-separated)</span>
          </label>
          <input
            type="text"
            placeholder="sales, qualification, pipeline"
            className="field"
            value={form.tags}
            onChange={set("tags")}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink-700 mb-1.5">
            Version <span className="font-normal text-ink-400">(optional)</span>
          </label>
          <input
            type="text"
            placeholder="1.0.0"
            className="field"
            value={form.version}
            onChange={set("version")}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-ink-700 mb-1.5">Purpose</label>
        <textarea
          rows={3}
          placeholder="One paragraph explaining what this skill does and who it's for."
          className="field resize-none"
          value={form.purpose}
          onChange={set("purpose")}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-ink-700 mb-1.5">Instructions</label>
        <textarea
          rows={8}
          placeholder={"Step-by-step instructions for Claude to follow:\n\n1. ...\n2. ...\n3. ..."}
          className="field resize-none font-mono text-xs"
          value={form.instructions}
          onChange={set("instructions")}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-ink-700 mb-1.5">
          Trigger Phrases <span className="font-normal text-ink-400">(one per line)</span>
        </label>
        <textarea
          rows={4}
          placeholder={"Run MEDDPICC on this opportunity\nPrep me for my discovery call\nWhat's missing in my deal?"}
          className="field resize-none font-mono text-xs"
          value={form.triggers}
          onChange={set("triggers")}
        />
      </div>

      {/* Quality score */}
      {fd && (
        <div className={`rounded-lg border p-4 space-y-2 ${scoreBg(score)}`}>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-ink-700">Quality Score</span>
            <span className={`text-lg font-bold tabular-nums ${scoreColor(score)}`}>
              {score}<span className="text-sm font-normal">/100</span>
            </span>
          </div>
          {issues.length > 0 ? (
            <ul className="space-y-1">
              {issues.map((issue, i) => (
                <li key={i} className="text-xs text-ink-600 flex gap-1.5">
                  <span className="text-red-400 shrink-0">✕</span>
                  {issue}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-green-700">All quality checks passed.</p>
          )}
          {score < 60 && (
            <p className="text-xs text-ink-500 pt-1">
              Minimum score to submit is 60. Fix the issues above to proceed.
            </p>
          )}
        </div>
      )}

      {serverError && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={!canSubmit}
        className="btn-primary w-full justify-center py-2.5 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Submitting…" : "Submit for Review"}
      </button>
    </form>
  );
}
