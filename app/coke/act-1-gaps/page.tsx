import Link from "next/link";
import type { Metadata } from "next";
import { COKE } from "@/data/coke";
import CokeHero from "@/components/coke/CokeHero";
import CokeSection from "@/components/coke/CokeSection";
import QuoteBlock from "@/components/coke/QuoteBlock";
import FlowStep from "@/components/coke/FlowStep";
import FadeIn from "@/components/coke/FadeIn";

export const metadata: Metadata = {
  title: COKE.act1.meta.title,
};

export default function Act1Page() {
  const { hero, narrative, scenario, closing, next } = COKE.act1;

  return (
    <div>
      <CokeHero
        eyebrow={hero.eyebrow}
        headline={hero.headline}
        subheadline={hero.subheadline}
      />

      {/* ── Narrative ── */}
      <CokeSection divide>
        <div className="grid sm:grid-cols-2 gap-8">
          {narrative.map((block, i) => (
            <FadeIn key={block.title} delay={i * 120}>
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-7 h-full">
                <h3 className="text-lg font-bold text-white mb-3 leading-snug">{block.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{block.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </CokeSection>

      {/* ── Scenario ── */}
      <CokeSection
        divide
        eyebrow={scenario.eyebrow}
        title={scenario.title}
        subtitle={scenario.subtitle}
      >
        <div className="mt-2">
          {scenario.steps.map((step, i) => (
            <FadeIn key={step.time} delay={i * 80}>
              <FlowStep
                index={i}
                total={scenario.steps.length}
                time={step.time}
                actor={step.actor}
                action={step.action}
                system={step.system}
                friction={step.friction}
              />
            </FadeIn>
          ))}
        </div>
      </CokeSection>

      {/* ── Closing quote ── */}
      <CokeSection divide>
        <FadeIn>
          <QuoteBlock text={closing.quote} variant="accent" />
        </FadeIn>
      </CokeSection>

      {/* ── Next act CTA ── */}
      <section className="border-t border-white/6">
        <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <FadeIn>
            <div>
              <p className="text-xs font-bold tracking-[0.18em] uppercase text-white/25 mb-2">
                Up Next
              </p>
              <p className="text-2xl font-bold text-white">Act 2: The Work OS</p>
              <p className="text-sm text-white/40 mt-1">
                What if the problem wasn&apos;t the tools — but the lack of a connective layer?
              </p>
            </div>
          </FadeIn>
          <Link
            href={next.href}
            className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#E61E2B] hover:bg-[#C41920] text-white font-semibold text-sm transition-all duration-200 hover:shadow-lg hover:shadow-[#E61E2B]/20 hover:-translate-y-px"
          >
            {next.label}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
