"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { COKE } from "@/data/coke";

const acts = COKE.acts.map((a) => ({ href: a.href, label: `Act ${a.number}` }));

const navLinks = [
  { href: "/coke", label: "Overview" },
  ...acts,
];

export default function CokeNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-[#0A0A0F]/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        <Link href="/coke" className="flex items-center gap-3 shrink-0">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#E61E2B]/10 border border-[#E61E2B]/20">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <circle cx="8" cy="8" r="6" stroke="#E61E2B" strokeWidth="1.5"/>
              <path d="M8 4v4l3 2" stroke="#E61E2B" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </span>
          <div className="leading-none">
            <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-white/40 mb-0.5">
              Executive Briefing
            </p>
            <p className="text-sm font-bold text-white tracking-tight">
              The Agentic Enterprise
            </p>
          </div>
        </Link>

        <nav className="flex items-center gap-1">
          {navLinks.map(({ href, label }) => {
            const active = href === "/coke" ? pathname === "/coke" : pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-white/10 text-white"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                }`}
              >
                {label}
              </Link>
            );
          })}
          <span className="ml-2 w-px h-4 bg-white/10" />
          <button className="ml-2 px-3.5 py-1.5 text-sm font-medium text-white/30 cursor-default rounded-lg hover:bg-white/5 transition-colors">
            Explore Roles
          </button>
        </nav>

      </div>
    </header>
  );
}
