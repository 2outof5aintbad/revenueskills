import Link from "next/link";
import type { Metadata } from "next";
import { COKE } from "@/data/coke";
import CokeHero from "@/components/coke/CokeHero";
import ActCard from "@/components/coke/ActCard";
import FadeIn from "@/components/coke/FadeIn";

export const metadata: Metadata = {
  title: "The Agentic Enterprise · Coca-Cola Executive Briefing",
  description: COKE.hero.subheadline,
};

export default function CokePage() {
  const { hero, platformInvestments, gap, acts } = COKE;

  return (
    <div>

      {/* ── Hero ── */}
      <CokeHero
        eyebrow={hero.eyebrow}
        headline={hero.headline}
        subheadline={hero.subheadline}
        ctaPrimary={hero.ctaPrimary}
        ctaSecondary={hero.ctaSecondary}
      />

      {/* ── Platform Reality ── */}
      <section className="border-t border-white/6">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <FadeIn>
            <div className="mb-10">
              <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#E61E2B] mb-3">
                The Platform Footprint
              </p>
              <h2 className="text-4xl font-bold text-white mb-3 tracking-tight">
                Your investment in Salesforce.
              </h2>
              <p className="text-base text-white/45 max-w-xl leading-relaxed">
                What you&apos;ve bought. What it&apos;s worth. And the one tool that cost nothing — and could tie it all together.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {platformInvestments.map((inv, i) => (
              <FadeIn key={inv.product} delay={i * 60}>
                <div
                  className={`rounded-xl p-5 border transition-all h-full ${
                    inv.highlight
                      ? "border-[#E61E2B]/30 bg-[#E61E2B]/8 ring-1 ring-[#E61E2B]/15"
                      : "border-white/8 bg-white/[0.03]"
                  }`}
                >
                  <div className={`text-[10px] font-bold tracking-widest uppercase mb-3 ${inv.highlight ? "text-[#E61E2B]/70" : "text-white/25"}`}>
                    {inv.category}
                  </div>
                  <p className={`text-2xl font-black mb-1 tabular-nums ${inv.highlight ? "text-[#E61E2B]" : "text-white"}`}>
                    {inv.aov}
                  </p>
                  <p className={`text-xs font-semibold ${inv.highlight ? "text-[#E61E2B]/60" : "text-white/40"}`}>
                    {inv.product}
                  </p>
                  {inv.highlight && (
                    <p className="text-[10px] text-[#E61E2B]/50 mt-2 leading-snug font-medium">
                      Currently untapped as an orchestration layer
                    </p>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Gap ── */}
      <section className="border-t border-white/6 bg-gradient-to-b from-[#E61E2B]/3 to-transparent">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#E61E2B] mb-6">
                The Core Problem
              </p>
              <h2 className="text-5xl font-black text-white tracking-tight leading-tight mb-4">
                {gap.headline}
              </h2>
              <h3 className="text-3xl font-black text-[#E61E2B] tracking-tight mb-8">
                {gap.subhead}
              </h3>
              <p className="text-base text-white/50 leading-relaxed mb-14 max-w-2xl mx-auto">
                {gap.body}
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {gap.stats.map((stat, i) => (
                <FadeIn key={stat.label} delay={i * 100}>
                  <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-6 py-7">
                    <p className="text-4xl font-black text-white mb-2 tabular-nums">{stat.value}</p>
                    <p className="text-sm text-white/40 leading-snug">{stat.label}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3-Act Narrative ── */}
      <section className="border-t border-white/6" id="acts">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <FadeIn>
            <div className="mb-12">
              <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#E61E2B] mb-3">
                The Transformation Story
              </p>
              <h2 className="text-4xl font-bold text-white mb-3 tracking-tight">
                Three acts. One outcome.
              </h2>
              <p className="text-base text-white/45 max-w-xl leading-relaxed">
                Follow the narrative from where Coca-Cola is today to where it could operate tomorrow.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {acts.map((act, i) => (
              <FadeIn key={act.number} delay={i * 100}>
                <ActCard
                  number={act.number}
                  href={act.href}
                  title={act.title}
                  tagline={act.tagline}
                  description={act.description}
                />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/6">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20">
            Executive Briefing · The Agentic Enterprise
          </p>
          <div className="flex items-center gap-6">
            <Link href="/coke/act-1-gaps" className="text-xs text-white/30 hover:text-white/60 transition-colors">Act 1</Link>
            <Link href="/coke/act-2-work-os" className="text-xs text-white/30 hover:text-white/60 transition-colors">Act 2</Link>
            <Link href="/coke/act-3-agentic-enterprise" className="text-xs text-white/30 hover:text-white/60 transition-colors">Act 3</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
