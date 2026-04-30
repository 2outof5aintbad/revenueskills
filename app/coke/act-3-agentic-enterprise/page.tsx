import Link from "next/link";
import type { Metadata } from "next";
import { COKE } from "@/data/coke";
import CokeHero from "@/components/coke/CokeHero";
import CokeSection from "@/components/coke/CokeSection";
import QuoteBlock from "@/components/coke/QuoteBlock";
import FlowStep from "@/components/coke/FlowStep";
import FadeIn from "@/components/coke/FadeIn";

export const metadata: Metadata = {
  title: COKE.act3.meta.title,
};

export default function Act3Page() {
  const { hero, narrative, scenario, outcomes, quote, vision, next } = COKE.act3;

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

      {/* ── Agentic Flow ── */}
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
                agent={step.agent}
                title={step.title}
                description={step.description}
                autonomous={step.autonomous}
                note={step.note}
              />
            </FadeIn>
          ))}
        </div>
      </CokeSection>

      {/* ── Outcomes ── */}
      <CokeSection
        divide
        eyebrow="What Changes"
        title="The measurable outcome."
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {outcomes.map((o, i) => (
            <FadeIn key={o.label} delay={i * 80}>
              <div className="rounded-2xl border border-[#E61E2B]/15 bg-[#E61E2B]/5 px-6 py-7 text-center">
                <p className="text-4xl font-black text-white mb-2 tabular-nums">{o.metric}</p>
                <p className="text-xs text-white/40 leading-snug">{o.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </CokeSection>

      {/* ── Quote ── */}
      <CokeSection divide>
        <FadeIn>
          <QuoteBlock text={quote.text} variant="accent" />
        </FadeIn>
      </CokeSection>

      {/* ── Vision ── */}
      <CokeSection
        divide
        eyebrow="The Path Forward"
        title="This is reachable from where you stand."
      >
        <FadeIn>
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-8 max-w-3xl">
            <p className="text-base text-white/60 leading-relaxed">{vision}</p>
          </div>
        </FadeIn>

        <div className="mt-10 flex flex-wrap gap-3">
          {["Sales Cloud", "Service Cloud", "Data Cloud", "Agentforce", "Slack", "MuleSoft"].map((platform, i) => (
            <FadeIn key={platform} delay={i * 60}>
              <div
                className={`px-4 py-2 rounded-lg border text-xs font-semibold transition-all ${
                  platform === "Slack" || platform === "Agentforce"
                    ? "border-[#E61E2B]/30 bg-[#E61E2B]/8 text-[#E61E2B]/80"
                    : "border-white/10 bg-white/[0.04] text-white/40"
                }`}
              >
                {platform}
              </div>
            </FadeIn>
          ))}
          <FadeIn delay={380}>
            <div className="px-4 py-2 rounded-lg border border-white/8 bg-white/[0.02] text-xs font-semibold text-white/20">
              + your existing stack
            </div>
          </FadeIn>
        </div>
      </CokeSection>

      {/* ── Return CTA ── */}
      <section className="border-t border-white/6">
        <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <FadeIn>
            <div>
              <p className="text-2xl font-bold text-white">You&apos;ve seen all three acts.</p>
              <p className="text-sm text-white/40 mt-2 max-w-lg">
                The transformation from fragmented operation to autonomous enterprise is a design challenge, not a procurement one. The platform exists. The question is orchestration.
              </p>
            </div>
          </FadeIn>
          <Link
            href={next.href}
            className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/12 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-semibold text-sm transition-all duration-200"
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
