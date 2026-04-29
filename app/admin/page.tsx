"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import type { Submission } from "@/app/api/skills/submit/route";

const STATUS_TABS = [
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
  { label: "All", value: "" },
];

function statusBadge(status: Submission["status"]) {
  if (status === "approved")
    return <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-green-100 text-green-700">Approved</span>;
  if (status === "rejected")
    return <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-red-100 text-red-600">Rejected</span>;
  return <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-amber-100 text-amber-700">Pending</span>;
}

function scoreColor(score: number) {
  if (score >= 80) return "text-green-600";
  if (score >= 60) return "text-amber-600";
  return "text-red-500";
}

function AdminContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const statusFilter = searchParams.get("status") ?? "pending";

  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const qs = statusFilter ? `?status=${statusFilter}` : "";
    fetch(`/api/admin/submissions${qs}`)
      .then((r) => r.json())
      .then((d) => {
        setSubmissions(d.submissions ?? []);
        setLoading(false);
      });
  }, [statusFilter]);

  const handleLogout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-surface-50">
      {/* Header */}
      <div className="bg-navy-900 text-white px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold">RevenueSkills Admin</h1>
          <p className="text-xs text-blue-300 mt-0.5">Skill submission review</p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-xs text-blue-300 hover:text-white transition-colors">
            ← Back to site
          </Link>
          <button
            onClick={handleLogout}
            className="text-xs text-blue-300 hover:text-white transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-white border border-surface-200 rounded-xl p-1 w-fit">
          {STATUS_TABS.map(({ label, value }) => (
            <Link
              key={value}
              href={value ? `?status=${value}` : "/admin"}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === value
                  ? "bg-navy-900 text-white"
                  : "text-ink-500 hover:text-ink-800"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {loading ? (
          <p className="text-sm text-ink-400">Loading submissions…</p>
        ) : submissions.length === 0 ? (
          <div className="bg-white border border-surface-200 rounded-2xl p-12 text-center">
            <p className="text-ink-400 text-sm">No {statusFilter || ""} submissions yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {submissions.map((sub) => (
              <Link
                key={sub.id}
                href={`/admin/submissions/${sub.id}`}
                className="block bg-white border border-surface-200 rounded-2xl px-5 py-4 hover:border-brand-300 hover:shadow-card transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-bold text-navy-900 truncate">
                        {sub.formData.name || "Untitled"}
                      </p>
                      {statusBadge(sub.status)}
                    </div>
                    <p className="text-xs text-ink-400 truncate mb-2">
                      {sub.formData.description}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-ink-400">
                      <span className="capitalize bg-surface-100 px-2 py-0.5 rounded-full">
                        {sub.formData.category}
                      </span>
                      <span>{sub.formData.author}</span>
                      <span>{new Date(sub.submittedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className={`text-xl font-bold tabular-nums ${scoreColor(sub.score)}`}>
                      {sub.score}
                    </p>
                    <p className="text-xs text-ink-400">/ 100</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense>
      <AdminContent />
    </Suspense>
  );
}
