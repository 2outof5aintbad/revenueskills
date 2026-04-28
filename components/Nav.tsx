"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/marketplace", label: "Marketplace" },
  { href: "/categories", label: "Categories" },
  { href: "/submit", label: "Submit a Skill" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="border-b border-surface-200 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Wordmark */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          {/* Stacked layers icon — matches logo mark */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
            <rect x="4" y="15" width="16" height="4" rx="1.5" fill="#0F1C45"/>
            <rect x="5" y="9.5" width="14" height="4" rx="1.5" fill="#2563EB" opacity="0.7"/>
            <rect x="7" y="4" width="10" height="4" rx="1.5" fill="#2563EB"/>
          </svg>
          <span className="text-sm font-bold tracking-tight">
            <span className="text-navy-900">Revenue</span><span className="text-brand-600">Skills</span>
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          {links.map(({ href, label }) => {
            const active = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-brand-50 text-brand-700"
                    : "text-ink-500 hover:text-ink-900 hover:bg-surface-100"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
