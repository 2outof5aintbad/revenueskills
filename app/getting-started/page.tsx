import Link from "next/link";
import { FEATURED_BUNDLES } from "@/lib/bundles";

export const metadata = {
  title: "Getting Started — RevenueSkills",
  description: "Learn how to install and use Claude AI skills for your sales team in minutes.",
};

const STEPS = [
  {
    step: "1",
    title: "Get Claude",
    body: "RevenueSkills uses Claude, Anthropic's AI assistant. You'll need a free or Pro Claude account at claude.ai. Pro ($20/mo) unlocks Claude Projects — the best way to use these skills.",
    cta: { label: "Get Claude", href: "https://claude.ai" },
    note: "Already have Claude? Skip to step 2.",
  },
  {
    step: "2",
    title: "Create a Claude Project",
    body: "Claude Projects let you give Claude a persistent set of instructions — including skills. Create a new Project in Claude and name it something like \"Sales Skills\" or your team name.",
    cta: null,
    note: "Projects are available on Claude Pro and Team plans.",
    substeps: [
      "Open claude.ai and click Projects in the left sidebar",
      "Click New Project and give it a name",
      "You'll add your skills in the next step",
    ],
  },
  {
    step: "3",
    title: "Pick your bundle",
    body: "Choose the bundle that matches your role. Each bundle includes 4–5 skills designed to work together across your entire workflow.",
    cta: { label: "Browse Bundles", href: "/bundles" },
    note: "Not sure which bundle? Start with the one that matches your title.",
    bundles: true,
  },
  {
    step: "4",
    title: "Copy and install",
    body: "On the bundle page, click \"Copy All SKILL.md\". Then go to your Claude Project, open Project Instructions, and paste. That's it — your skills are live.",
    cta: null,
    note: "You can also copy individual skills from any skill detail page.",
    substeps: [
      "Click \"Copy All SKILL.md\" on the bundle page",
      "In your Claude Project, click the project name to open settings",
      "Paste into the Project Instructions field",
      "Save — your skills are now active in every conversation in this Project",
    ],
  },
  {
    step: "5",
    title: "Use a trigger phrase",
    body: "Start a conversation in your Project and type any trigger phrase — like \"Run MEDDPICC on this opportunity\" or \"Write a cold email to the VP of Sales at Acme\". Claude will activate the right skill automatically.",
    cta: { label: "Browse Skills", href: "/marketplace" },
    note: "Every skill page lists its trigger phrases. You can also just describe what you want — Claude will figure it out.",
  },
];

const FAQS = [
  {
    q: "Do I need a paid Claude plan?",
    a: "You can use individual skills by pasting them into any Claude conversation for free. Claude Projects (the best way to use bundles) require Claude Pro ($20/mo) or a Team plan.",
  },
  {
    q: "Can I use these skills in Claude for Work / Teams?",
    a: "Yes. Claude Team and Enterprise plans support Projects. Just create a shared Project, paste in your bundle, and your whole team has access.",
  },
  {
    q: "How do I share skills with my team?",
    a: "Copy the SKILL.md content and share it via Slack, email, or your team wiki. Anyone with Claude can paste it into a conversation or Project and use it immediately.",
  },
  {
    q: "Can I install multiple bundles?",
    a: "Yes. You can paste multiple bundles into a single Project's instructions, or create separate Projects for different workflows (e.g. one for prospecting, one for deal management).",
  },
  {
    q: "What if I'm not a Claude Pro user yet?",
    a: "You can still use any skill by copying it from the skill detail page and pasting it at the start of a Claude conversation. You won't get persistence between sessions, but the skill will work for that conversation.",
  },
  {
    q: "How do I submit a skill I've built?",
    a: "Head to the Submit page, fill in your skill definition, and we'll review it. If it passes the quality bar, it'll appear in the marketplace for other reps to install.",
  },
];

export default function GettingStartedPage() {
  const featuredBundles = FEATURED_BUNDLES.slice(0, 3);

  return (
    <div>

      {/* Hero */}
      <section className="bg-white border-b border-surface-200">
        <div className="max-w-5xl mx-auto px-6 pt-16 pb-14">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-brand-600 uppercase tracking-widest mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-600 inline-block" />
              Get up and running in minutes
            </span>
            <h1 className="text-4xl font-bold text-navy-900 mb-4 leading-tight tracking-tight">
              From zero to your first<br />AI-powered sales workflow.
            </h1>
            <p className="text-lg text-ink-500 leading-relaxed">
              RevenueSkills works with Claude, Anthropic's AI assistant. This guide walks you through setup in 5 steps — no technical knowledge required.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-14">
        <div className="flex flex-col lg:flex-row gap-16">

          {/* Steps */}
          <div className="flex-1 min-w-0">
            <div className="space-y-12">
              {STEPS.map((s, i) => (
                <div key={s.step} className="flex gap-6">
                  {/* Step indicator */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-9 h-9 rounded-full bg-navy-900 text-white text-sm font-bold flex items-center justify-center shrink-0">
                      {s.step}
                    </div>
                    {i < STEPS.length - 1 && (
                      <div className="w-px flex-1 bg-surface-200 mt-3" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="pb-2 flex-1">
                    <h2 className="text-base font-bold text-navy-900 mb-2">{s.title}</h2>
                    <p className="text-sm text-ink-500 leading-relaxed mb-3">{s.body}</p>

                    {s.substeps && (
                      <ol className="space-y-1.5 mb-3">
                        {s.substeps.map((sub, j) => (
                          <li key={j} className="flex gap-2.5 text-sm text-ink-500">
                            <span className="text-brand-600 font-semibold shrink-0">{j + 1}.</span>
                            {sub}
                          </li>
                        ))}
                      </ol>
                    )}

                    {s.bundles && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
                        {featuredBundles.map((b) => (
                          <Link
                            key={b.slug}
                            href={`/bundles/${b.slug}`}
                            className="group flex items-center gap-3 p-3 rounded-xl border border-surface-200 bg-surface-50 hover:border-brand-200 hover:bg-brand-50 transition-all"
                          >
                            <span className="text-xl leading-none shrink-0">{b.icon}</span>
                            <div>
                              <p className="text-xs font-semibold text-navy-900 group-hover:text-brand-600 transition-colors leading-snug">{b.name}</p>
                              <p className="text-xs text-ink-400">{b.role}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}

                    {s.note && (
                      <p className="text-xs text-ink-400 italic">{s.note}</p>
                    )}

                    {s.cta && (
                      <div className="mt-4">
                        <Link
                          href={s.cta.href}
                          target={s.cta.href.startsWith("http") ? "_blank" : undefined}
                          rel={s.cta.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="btn-primary"
                        >
                          {s.cta.label}
                          {s.cta.href.startsWith("http") && (
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          )}
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* FAQ */}
            <div className="mt-16 pt-12 border-t border-surface-200">
              <h2 className="text-lg font-bold text-navy-900 mb-8">Frequently asked questions</h2>
              <div className="space-y-6">
                {FAQS.map(({ q, a }) => (
                  <div key={q}>
                    <p className="text-sm font-semibold text-ink-900 mb-1">{q}</p>
                    <p className="text-sm text-ink-500 leading-relaxed">{a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky sidebar */}
          <aside className="lg:w-56 shrink-0">
            <div className="sticky top-20 space-y-6">

              {/* Quick links */}
              <div className="rounded-xl border border-surface-200 bg-white p-4">
                <p className="label mb-3">On this page</p>
                <nav className="space-y-1">
                  {STEPS.map((s) => (
                    <p key={s.step} className="text-xs text-ink-500 py-1 flex gap-2">
                      <span className="text-brand-600 font-bold">{s.step}.</span>
                      {s.title}
                    </p>
                  ))}
                  <p className="text-xs text-ink-500 py-1 flex gap-2">
                    <span className="text-brand-600 font-bold">?</span>
                    FAQ
                  </p>
                </nav>
              </div>

              {/* CTA */}
              <div className="rounded-xl bg-navy-900 p-4 space-y-3">
                <p className="text-sm font-bold text-white">Ready to start?</p>
                <p className="text-xs text-blue-200 leading-relaxed">Pick a bundle and install your first skill in under 5 minutes.</p>
                <Link href="/bundles" className="block text-center px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold transition-colors">
                  Browse Bundles
                </Link>
              </div>

              {/* Need help */}
              <div className="rounded-xl border border-surface-200 bg-white p-4">
                <p className="label mb-2">Built a skill?</p>
                <p className="text-xs text-ink-400 leading-relaxed mb-3">Share it with the community and help other reps win.</p>
                <Link href="/submit" className="text-xs font-semibold text-brand-600 hover:text-brand-700 transition-colors">
                  Submit a skill →
                </Link>
              </div>

            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
