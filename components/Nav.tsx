"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/marketplace", label: "Marketplace" },
  { href: "/categories", label: "Categories" },
  { href: "/submit", label: "Submit Skill" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="border-b border-surface-200 bg-surface-0/90 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="text-sm font-semibold text-ink-900 tracking-tight">
          SkillMarket
        </Link>
        <nav className="flex items-center gap-0.5">
          {links.map(({ href, label }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  active
                    ? "bg-surface-100 text-ink-900 font-medium"
                    : "text-ink-400 hover:text-ink-900 hover:bg-surface-100"
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
