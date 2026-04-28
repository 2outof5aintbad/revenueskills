"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const STORAGE_KEY = "rs_welcome_dismissed";

export default function WelcomeBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="bg-brand-600 text-white">
      <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-blue-200 shrink-0">👋</span>
          <p className="text-sm font-medium truncate">
            New to RevenueSkills?{" "}
            <Link
              href="/getting-started"
              className="underline underline-offset-2 hover:text-blue-100 transition-colors"
              onClick={dismiss}
            >
              Learn how to install your first skill in 5 minutes →
            </Link>
          </p>
        </div>
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="shrink-0 text-blue-200 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
