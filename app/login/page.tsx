"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "sent">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(
    error === "expired" ? "That link has expired. Request a new one below." :
    error === "invalid" ? "Invalid login link. Request a new one below." : null
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);

    if (!email.toLowerCase().endsWith("@salesforce.com")) {
      router.push("/login/denied");
      return;
    }

    setState("loading");

    const res = await fetch("/api/auth/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      setState("sent");
    } else {
      const data = await res.json().catch(() => ({}));
      if (data.error === "not-salesforce") {
        router.push("/login/denied");
      } else {
        setErrorMsg("Something went wrong. Please try again.");
        setState("idle");
      }
    }
  }

  return (
    <div className="min-h-screen bg-surface-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="w-12 h-12 rounded-xl bg-navy-900 flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-xl">⚡</span>
          </div>
          <h1 className="text-xl font-bold text-navy-900">Sign in to RevenueSkills</h1>
          <p className="text-sm text-ink-400 mt-1">For Salesforce employees only</p>
        </div>

        {state === "sent" ? (
          <div className="text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-green-50 border border-green-100 flex items-center justify-center mx-auto">
              <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-ink-900">Check your email</p>
              <p className="text-sm text-ink-400 mt-1">We sent a login link to <span className="font-medium text-ink-700">{email}</span>. It expires in 15 minutes.</p>
            </div>
            <button
              onClick={() => { setState("idle"); setEmail(""); }}
              className="text-xs text-ink-400 hover:text-ink-700 transition-colors"
            >
              Use a different email
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1.5">
                Salesforce email
              </label>
              <input
                type="email"
                autoFocus
                className="field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@salesforce.com"
              />
            </div>

            {errorMsg && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={state === "loading" || !email}
              className="btn-primary w-full justify-center py-2.5 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {state === "loading" ? "Sending…" : "Send login link"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
