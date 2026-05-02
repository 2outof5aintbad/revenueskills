import Link from "next/link";
import Image from "next/image";
import SkillCard from "@/components/SkillCard";
import SectionHeader from "@/components/SectionHeader";
import { SKILLS } from "@/lib/skills";
import { FEATURED_BUNDLES } from "@/lib/bundles";

// ── Customer moment cards ────────────────────────────────────────────────────

const CUSTOMER_MOMENTS = [
  {
    icon: "🔍",
    title: "Prep for discovery",
    description: "Map your MEDDPICC gaps and build probing questions before the call.",
    href: "/skill/meddpicc-discovery-prep",
  },
  {
    icon: "🎯",
    title: "Build a demo story",
    description: "Turn account context into a narrative that speaks to your buyer's pain.",
    href: "/skill/account-prep-brief",
  },
  {
    icon: "📋",
    title: "Generate a demo flow",
    description: "Structure your demo around outcomes, not features.",
    href: "/marketplace?category=sales",
  },
  {
    icon: "✉️",
    title: "Write a follow-up email",
    description: "Convert call notes into a polished follow-up in under 60 seconds.",
    href: "/skill/call-followup-generator",
  },
  {
    icon: "💰",
    title: "Build a business case",
    description: "Generate a CFO-ready ROI model from your opportunity data.",
    href: "/skill/roi-business-case-builder",
  },
  {
    icon: "🤝",
    title: "Prep for exec alignment",
    description: "Brief your champion and arm them to sell internally on your behalf.",
    href: "/skill/champion-letter-generator",
  },
];

// ── Role cards ───────────────────────────────────────────────────────────────

const ROLES = [
  {
    icon: "⚙️",
    role: "Sales Engineer",
    useCases: ["Build technical discovery plans", "Generate demo flows from account context", "Prep for competitive technical objections"],
    href: "/marketplace?category=sales",
  },
  {
    icon: "🏢",
    role: "Account Executive",
    useCases: ["Run MEDDPICC gap analysis", "Build ROI business cases", "Generate champion letters for internal selling"],
    href: "/bundles/enterprise-deal-kit",
  },
  {
    icon: "🤝",
    role: "Customer Success Manager",
    useCases: ["Score renewal risk early", "Build QBR outlines in minutes", "Identify expansion opportunities before renewal"],
    href: "/bundles/customer-success-playbook",
  },
];

// ── Featured skills (Salesforce-specific copy) ───────────────────────────────

const FEATURED_SKILL_SLUGS = [
  "meddpicc-discovery-prep",
  "account-prep-brief",
  "roi-business-case-builder",
];

export default function HomePage() {
  const featuredSkills = FEATURED_SKILL_SLUGS
    .map((slug) => SKILLS.find((s) => s.slug === slug))
    .filter(Boolean) as typeof SKILLS;

  return (
    <div>

      {/* ── 1. Hero ── */}
      <section className="bg-white border-b border-surface-200 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 pt-20 pb-0 flex items-end gap-10">
          <div className="max-w-2xl pb-20 shrink-0">
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-brand-600 uppercase tracking-widest mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-600 inline-block" />
              Peer-built · Free · Salesforce revenue teams
            </span>
            <h1 className="text-5xl font-bold text-navy-900 mb-5 leading-[1.1] tracking-tight">
              AI Skills for Salesforce<br />
              <span className="text-brand-600">Revenue Teams.</span>
            </h1>
            <p className="text-lg text-ink-500 leading-relaxed mb-8 max-w-xl">
              Battle-tested prompts and workflows for SEs, AEs, and CSMs preparing for real customer moments — discovery, demos, follow-ups, and deal strategy.
            </p>
            <div className="flex items-center gap-3">
              <Link href="#moments" className="btn-primary px-6 py-3 text-base">
                Start with your next customer moment
              </Link>
              <Link href="/marketplace" className="btn-secondary px-6 py-3 text-base">
                Browse all skills
              </Link>
            </div>
          </div>
          <div className="hidden md:block relative shrink-0 ml-auto">
            <Image
              src="/hero-codey.png"
              alt="Codey holding a bag of money"
              width={320}
              height={480}
              className="object-contain drop-shadow-xl"
              priority
            />
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="bg-navy-900">
        <div className="max-w-5xl mx-auto px-6 py-5">
          <div className="flex flex-wrap items-center gap-8 sm:gap-16">
            {[
              { value: SKILLS.length.toString(), label: "Skills" },
              { value: "6", label: "Categories" },
              { value: "Free", label: "For Salesforce peers" },
              { value: "Real", label: "Field workflows" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-xl font-bold text-white tabular-nums">{value}</p>
                <p className="text-xs text-blue-300 font-medium mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. Why I built this ── */}
      <section className="bg-surface-100 border-y border-surface-200">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <div className="max-w-2xl mx-auto text-center">
            <p className="label mb-4">Why I built this</p>
            <p className="text-base text-ink-600 leading-relaxed mb-2">
              I built RevenueSkills to give Salesforce sellers and solution engineers a practical library of AI workflows they can use before customer calls, demos, follow-ups, and internal deal reviews.
            </p>
            <p className="text-sm text-ink-400 leading-relaxed">
              This is not an official Salesforce product — it&apos;s a peer-built resource to help us move faster and share what works.
            </p>
          </div>
        </div>
      </section>

      <div className="page pt-14">

        {/* ── 3. Customer moments ── */}
        <section className="section" id="moments">
          <SectionHeader
            title="Start with your next customer moment"
            description="Pick the situation you're preparing for"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CUSTOMER_MOMENTS.map(({ icon, title, description, href }) => (
              <Link
                key={title}
                href={href}
                className="group flex items-start gap-4 p-5 bg-white border border-surface-200 rounded-2xl shadow-card hover:shadow-card-hover hover:border-brand-200 hover:-translate-y-px transition-all duration-200"
              >
                <span className="text-2xl leading-none shrink-0 mt-0.5">{icon}</span>
                <div>
                  <p className="text-sm font-bold text-navy-900 group-hover:text-brand-600 transition-colors mb-1">
                    {title}
                  </p>
                  <p className="text-xs text-ink-400 leading-relaxed">{description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── 4. Featured skills ── */}
        <section className="section">
          <SectionHeader
            title="Featured Skills"
            description="Most-used across Salesforce revenue teams"
            href="/marketplace"
            hrefLabel="See all"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredSkills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        </section>

        {/* ── 5. Built for your role ── */}
        <section className="section">
          <SectionHeader
            title="Built for your role"
            description="Find skills matched to how you work"
            href="/bundles"
            hrefLabel="See all bundles"
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {ROLES.map(({ icon, role, useCases, href }) => (
              <div key={role} className="bg-white border border-surface-200 rounded-2xl p-5 shadow-card flex flex-col">
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="text-xl leading-none">{icon}</span>
                  <h3 className="text-sm font-bold text-navy-900">{role}</h3>
                </div>
                <ul className="space-y-2 flex-1 mb-5">
                  {useCases.map((uc) => (
                    <li key={uc} className="flex gap-2 text-xs text-ink-500">
                      <span className="text-brand-600 font-bold shrink-0">→</span>
                      {uc}
                    </li>
                  ))}
                </ul>
                <Link
                  href={href}
                  className="text-xs font-semibold text-brand-600 hover:text-brand-700 transition-colors"
                >
                  View skills →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* ── 6. How it works ── */}
        <section className="section">
          <SectionHeader
            title="How it works"
            description="Three steps from skill to output"
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                title: "Pick the customer moment",
                body: "Find the skill that matches your situation — discovery, demo, follow-up, or deal strategy.",
              },
              {
                step: "2",
                title: "Copy the skill into Claude",
                body: "Click \"Copy SKILL.md\" and paste it into a Claude Project or the start of any Claude conversation.",
              },
              {
                step: "3",
                title: "Add your account context",
                body: "Drop in your account notes, opportunity data, or meeting goals. Claude does the rest.",
              },
            ].map(({ step, title, body }) => (
              <div key={step} className="flex gap-4">
                <div className="w-9 h-9 rounded-full bg-navy-900 text-white text-sm font-bold flex items-center justify-center shrink-0">
                  {step}
                </div>
                <div>
                  <p className="text-sm font-bold text-navy-900 mb-1">{title}</p>
                  <p className="text-sm text-ink-500 leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 7. Submit a skill ── */}
        <section className="mb-16 rounded-2xl bg-navy-900 px-8 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">Have a workflow that works?</h2>
            <p className="text-sm text-blue-200">Share it with the team. If it&apos;s useful in the field, it belongs here.</p>
          </div>
          <Link
            href="/submit"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold transition-colors"
          >
            Submit a Skill
          </Link>
        </section>

      </div>
    </div>
  );
}
