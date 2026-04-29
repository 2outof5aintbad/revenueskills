"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Submission } from "@/app/api/skills/submit/route";
import { slugify } from "@/lib/skillGenerator";

interface Props {
  params: Promise<{ id: string }>;
}

function scoreColor(score: number) {
  if (score >= 80) return "text-green-600";
  if (score >= 60) return "text-amber-600";
  return "text-red-500";
}

function scoreBg(score: number) {
  if (score >= 80) return "bg-green-50 border-green-200";
  if (score >= 60) return "bg-amber-50 border-amber-200";
  return "bg-red-50 border-red-200";
}

function toStringArray(val: string | string[], sep: string): string[] {
  if (Array.isArray(val)) return val.map((s: string) => s.trim()).filter(Boolean);
  return val.split(sep).map((s: string) => s.trim()).filter(Boolean);
}

function generateSkillCode(sub: Submission): string {
  const { formData } = sub;
  const slug = slugify(formData.name);
  const author = formData.author.startsWith("@") ? formData.author : `@${formData.author}`;
  const tagsArray = toStringArray(formData.tags, ",");
  const triggersArray = toStringArray(formData.triggers, "\n");

  const tagsStr = tagsArray.map((t: string) => `"${t}"`).join(", ");
  const triggersStr = triggersArray.map((t: string) => `    "${t}",`).join("\n");

  return `{
  id: "${slug}",
  slug: "${slug}",
  name: "${formData.name}",
  description: "${formData.description.replace(/"/g, '\\"')}",
  category: "${formData.category}",
  tags: [${tagsStr}],
  author: "${author}",
  authorBio: "Community contributor",
  installs: 0,
  rating: 0,
  featured: false,
  triggers: [
${triggersStr}
  ],
  exampleOutput: "",
  reviews: [],
  versions: [
    {
      version: "${formData.version || "1.0.0"}",
      changeSummary: "Initial release",
      createdAt: "${new Date().toISOString()}",
    },
  ],
},`;
}

function CopyCodeButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-navy-900 text-white hover:bg-navy-800 transition-colors"
    >
      {copied ? "Copied!" : "Copy code"}
    </button>
  );
}

export default function SubmissionDetailPage({ params }: Props) {
  const { id } = use(params);
  const router = useRouter();

  const [submission, setSubmission] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/submissions/${id}`)
      .then((r) => {
        if (r.status === 404) { setNotFound(true); return null; }
        return r.json();
      })
      .then((d) => {
        if (d) setSubmission(d.submission);
        setLoading(false);
      });
  }, [id]);

  const updateStatus = async (status: "approved" | "rejected" | "pending") => {
    if (!submission) return;
    setUpdating(true);
    const res = await fetch(`/api/admin/submissions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      const d = await res.json();
      setSubmission(d.submission);
    }
    setUpdating(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-50 flex items-center justify-center">
        <p className="text-sm text-ink-400">Loading…</p>
      </div>
    );
  }

  if (notFound || !submission) {
    return (
      <div className="min-h-screen bg-surface-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-ink-400 mb-4">Submission not found.</p>
          <Link href="/admin" className="text-sm text-brand-600 hover:underline">← Back to submissions</Link>
        </div>
      </div>
    );
  }

  const { formData, score, status, skillMd, submittedAt } = submission;
  const isApproved = status === "approved";
  const isRejected = status === "rejected";

  return (
    <div className="min-h-screen bg-surface-50">
      {/* Header */}
      <div className="bg-navy-900 text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => router.push("/admin")} className="text-blue-300 hover:text-white text-sm transition-colors">
            ← Submissions
          </button>
          <span className="text-blue-700">/</span>
          <span className="text-sm font-medium truncate max-w-xs">{formData.name}</span>
        </div>
        <Link href="/" className="text-xs text-blue-300 hover:text-white transition-colors">
          Back to site
        </Link>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Left — skill details */}
          <div className="flex-1 min-w-0 space-y-6">

            {/* Meta */}
            <div className="bg-white border border-surface-200 rounded-2xl p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-xl font-bold text-navy-900">{formData.name}</h1>
                  <p className="text-sm text-ink-500 mt-1">{formData.description}</p>
                </div>
                <div className={`shrink-0 rounded-xl border px-4 py-2 text-center ${scoreBg(score)}`}>
                  <p className={`text-2xl font-bold tabular-nums ${scoreColor(score)}`}>{score}</p>
                  <p className="text-xs text-ink-400">/ 100</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="bg-surface-100 px-2 py-1 rounded-full capitalize font-medium text-ink-600">{formData.category}</span>
                {toStringArray(formData.tags, ",").map((tag: string) => (
                  <span key={tag} className="bg-surface-100 px-2 py-1 rounded-full text-ink-400">{tag}</span>
                ))}
              </div>
            </div>

            {/* Purpose */}
            <div className="bg-white border border-surface-200 rounded-2xl p-6">
              <h2 className="text-xs font-semibold text-ink-400 uppercase tracking-widest mb-3">Purpose</h2>
              <p className="text-sm text-ink-700 leading-relaxed whitespace-pre-wrap">{formData.purpose}</p>
            </div>

            {/* Instructions */}
            <div className="bg-white border border-surface-200 rounded-2xl p-6">
              <h2 className="text-xs font-semibold text-ink-400 uppercase tracking-widest mb-3">Instructions</h2>
              <pre className="text-xs text-ink-700 leading-relaxed whitespace-pre-wrap font-mono bg-surface-50 rounded-lg p-4 overflow-x-auto">
                {formData.instructions}
              </pre>
            </div>

            {/* Triggers */}
            <div className="bg-white border border-surface-200 rounded-2xl p-6">
              <h2 className="text-xs font-semibold text-ink-400 uppercase tracking-widest mb-3">Trigger Phrases</h2>
              <ul className="space-y-1.5">
                {toStringArray(formData.triggers, "\n").map((t: string, i: number) => (
                  <li key={i} className="flex gap-2 text-sm text-ink-700">
                    <span className="text-brand-600 font-bold shrink-0">→</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            {/* SKILL.md */}
            <div className="bg-white border border-surface-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs font-semibold text-ink-400 uppercase tracking-widest">Generated SKILL.md</h2>
                <button
                  onClick={() => navigator.clipboard.writeText(skillMd)}
                  className="text-xs text-brand-600 hover:text-brand-700 font-medium"
                >
                  Copy
                </button>
              </div>
              <pre className="text-xs text-ink-600 font-mono bg-surface-50 rounded-lg p-4 overflow-x-auto whitespace-pre-wrap">
                {skillMd}
              </pre>
            </div>

          </div>

          {/* Right sidebar — actions */}
          <div className="lg:w-72 shrink-0 space-y-5">

            {/* Status + actions */}
            <div className="bg-white border border-surface-200 rounded-2xl p-5 space-y-4">
              <div>
                <p className="text-xs font-semibold text-ink-400 uppercase tracking-widest mb-2">Status</p>
                <div className="flex items-center gap-2">
                  {status === "approved" && (
                    <span className="px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-700">Approved</span>
                  )}
                  {status === "rejected" && (
                    <span className="px-3 py-1 text-sm font-semibold rounded-full bg-red-100 text-red-600">Rejected</span>
                  )}
                  {status === "pending" && (
                    <span className="px-3 py-1 text-sm font-semibold rounded-full bg-amber-100 text-amber-700">Pending review</span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {!isApproved && (
                  <button
                    onClick={() => updateStatus("approved")}
                    disabled={updating}
                    className="btn-primary justify-center py-2 text-sm disabled:opacity-50"
                  >
                    {updating ? "Updating…" : "Approve"}
                  </button>
                )}
                {!isRejected && (
                  <button
                    onClick={() => updateStatus("rejected")}
                    disabled={updating}
                    className="w-full px-4 py-2 rounded-xl border border-red-200 text-red-600 text-sm font-semibold hover:bg-red-50 transition-colors disabled:opacity-50"
                  >
                    {updating ? "Updating…" : "Reject"}
                  </button>
                )}
                {(isApproved || isRejected) && (
                  <button
                    onClick={() => updateStatus("pending")}
                    disabled={updating}
                    className="w-full px-4 py-2 rounded-xl border border-surface-200 text-ink-500 text-sm font-medium hover:bg-surface-100 transition-colors disabled:opacity-50"
                  >
                    Reset to pending
                  </button>
                )}
              </div>
            </div>

            {/* Publish code — only shown when approved */}
            {isApproved && (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-green-800 uppercase tracking-widest">Publish to catalog</p>
                  <CopyCodeButton code={generateSkillCode(submission)} />
                </div>
                <p className="text-xs text-green-700 leading-relaxed">
                  Copy this object and paste it into <code className="font-mono bg-green-100 px-1 rounded">lib/skills.ts</code> inside the <code className="font-mono bg-green-100 px-1 rounded">SKILLS</code> array, then push to deploy.
                </p>
                <pre className="text-xs font-mono text-green-900 bg-green-100 rounded-lg p-3 overflow-x-auto whitespace-pre-wrap">
                  {generateSkillCode(submission)}
                </pre>
              </div>
            )}

            {/* Submission metadata */}
            <div className="bg-white border border-surface-200 rounded-2xl p-5 space-y-3">
              <p className="text-xs font-semibold text-ink-400 uppercase tracking-widest">Submission details</p>
              <dl className="space-y-2 text-xs">
                <div className="flex justify-between gap-2">
                  <dt className="text-ink-400">ID</dt>
                  <dd className="font-mono text-ink-700 truncate">{submission.id}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-ink-400">Submitted</dt>
                  <dd className="text-ink-700">{new Date(submittedAt).toLocaleString()}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-ink-400">Author</dt>
                  <dd className="text-ink-700">{formData.author}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-ink-400">Version</dt>
                  <dd className="text-ink-700">{formData.version || "1.0.0"}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-ink-400">Quality score</dt>
                  <dd className={`font-semibold ${scoreColor(score)}`}>{score}/100</dd>
                </div>
              </dl>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
