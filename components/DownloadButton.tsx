"use client";

import { useState } from "react";
import { generateSkillZip, triggerDownload } from "@/lib/zipGenerator";
import { slugify } from "@/lib/skillGenerator";

interface Props {
  skillMarkdown: string;
  skillName: string;
}

type State = "idle" | "generating" | "error";

export default function DownloadButton({ skillMarkdown, skillName }: Props) {
  const [state, setState] = useState<State>("idle");

  async function handleDownload() {
    if (state === "generating") return;
    setState("generating");
    try {
      const blob = await generateSkillZip(skillMarkdown, skillName);
      triggerDownload(blob, `${slugify(skillName)}.zip`);
      setState("idle");
    } catch {
      setState("error");
    }
  }

  return (
    <button
      onClick={handleDownload}
      disabled={state === "generating"}
      aria-label={`Download ${skillName} as a ZIP file`}
      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold shadow-sm transition-colors"
    >
      {state === "generating" ? (
        <>
          <svg
            className="w-4 h-4 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
          Preparing…
        </>
      ) : state === "error" ? (
        <>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
          Try Again
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download Skill (.zip)
        </>
      )}
    </button>
  );
}
