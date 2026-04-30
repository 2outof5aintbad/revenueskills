import Link from "next/link";
import type { Metadata } from "next";
import { COKE } from "@/data/coke";
import CokeHero from "@/components/coke/CokeHero";
import CokeSection from "@/components/coke/CokeSection";
import QuoteBlock from "@/components/coke/QuoteBlock";
import FlowStep from "@/components/coke/FlowStep";
import FadeIn from "@/components/coke/FadeIn";

export const metadata: Metadata = {
  title: COKE.act2.meta.title,
};

export default function Act2Page() {
  const { hero, narrative, scenario, aiCapabilities, quote, next } = COKE.act2;

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
            <FadeIn key={step.step} delay={i * 80}>
              <FlowStep
                index={i}
                total={scenario.steps.length}
                step={step.step}
                title={step.title}
                description={step.description}
                delta={step.delta}
              />
            </FadeIn>
          ))}
        </div>
      </CokeSection>

      {/* ── AI Capabilities ── */}
      <CokeSection
        divide
        eyebrow="What AI Does in Slack"
        title="Four capabilities. Zero manual steps."
      >
        <div className="grid sm:grid-cols-2 gap-4">
          {aiCapabilities.map((cap, i) => (
            <FadeIn key={cap.title} delay={i * 80}>
              <div className="rounded-xl border border-white/8 bg-white/[0.03] p-6 flex gap-4 h-full">
                <div className="w-8 h-8 rounded-lg bg-[#E61E2B]/10 border border-[#E61E2B]/20 flex items-center justify-center shrink-0 text-xs font-black text-[#E61E2B]">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1.5">{cap.title}</h4>
                  <p className="text-sm text-white/45 leading-relaxed">{cap.body}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </CokeSection>

      {/* ── Quote ── */}
      <CokeSection divide>
        <FadeIn>
          <QuoteBlock text={quote.text} variant="default" />
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
              <p className="text-2xl font-bold text-white">Act 3: The Agentic Enterprise</p>
              <p className="text-sm text-white/40 mt-1">
                What happens when AI doesn&apos;t just assist — but acts autonomously.
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
