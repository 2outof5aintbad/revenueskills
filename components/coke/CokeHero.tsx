import Link from "next/link";

interface CokeHeroProps {
  eyebrow?: string;
  headline: string;
  subheadline: string;
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  centered?: boolean;
}

export default function CokeHero({
  eyebrow,
  headline,
  subheadline,
  ctaPrimary,
  ctaSecondary,
  centered = false,
}: CokeHeroProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#E61E2B]/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#E61E2B]/3 rounded-full blur-3xl pointer-events-none" />

      <div className={`relative max-w-6xl mx-auto px-6 pt-20 pb-24 ${centered ? "text-center" : ""}`}>
        {eyebrow && (
          <p className="coke-hero-eyebrow text-xs font-bold tracking-[0.18em] uppercase text-[#E61E2B] mb-5">
            {eyebrow}
          </p>
        )}

        <h1
          className={`coke-hero-headline text-6xl sm:text-7xl font-black tracking-tight leading-[0.95] mb-7 ${centered ? "mx-auto max-w-3xl" : "max-w-3xl"}`}
          style={{ whiteSpace: "pre-line" }}
        >
          {headline}
        </h1>

        <p className={`coke-hero-sub text-lg text-white/55 leading-relaxed mb-10 ${centered ? "max-w-2xl mx-auto" : "max-w-2xl"}`}>
          {subheadline}
        </p>

        {(ctaPrimary || ctaSecondary) && (
          <div className={`coke-hero-ctas flex flex-wrap gap-4 ${centered ? "justify-center" : ""}`}>
            {ctaPrimary && (
              <Link
                href={ctaPrimary.href}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#E61E2B] hover:bg-[#C41920] text-white font-semibold text-sm transition-all duration-200 hover:shadow-lg hover:shadow-[#E61E2B]/20 hover:-translate-y-px"
              >
                {ctaPrimary.label}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            )}
            {ctaSecondary && (
              <Link
                href={ctaSecondary.href}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/12 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white font-semibold text-sm transition-all duration-200"
              >
                {ctaSecondary.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
