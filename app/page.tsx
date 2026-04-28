import Link from "next/link";
import SkillCard from "@/components/SkillCard";
import SectionHeader from "@/components/SectionHeader";
import { TRENDING_SKILLS, TOP_RATED_SKILLS, RECENTLY_UPDATED_SKILLS, SKILLS } from "@/lib/skills";

const totalInstalls = SKILLS.reduce((sum, s) => sum + s.installs, 0);

const ROLES = [
  {
    label: "Account Executives",
    description: "Qualify faster, prep smarter, close more.",
    slugs: ["meddpicc-discovery-prep", "account-prep-brief", "roi-business-case-builder"],
  },
  {
    label: "All Reps",
    description: "Handle objections and follow up without the grind.",
    slugs: ["objection-reframe-engine", "call-followup-generator", "meddpicc-discovery-prep"],
  },
  {
    label: "Customer Success",
    description: "Run better QBRs and get ahead of churn.",
    slugs: ["account-prep-brief", "roi-business-case-builder", "call-followup-generator"],
  },
];

const SOCIAL_PROOF = [
  {
    quote: "Changed how I prep for every enterprise call. Closed my last two deals faster because I stopped missing the Economic Buyer early.",
    author: "@jenna.torres",
    skill: "MEDDPICC Discovery Prep",
    rating: 5,
  },
  {
    quote: "I run this before every QBR and exec visit. The brief it produces is genuinely better than what I used to put together manually in an hour.",
    author: "@marcus.webb",
    skill: "Account Prep Brief",
    rating: 5,
  },
  {
    quote: "This is my most-used skill by a mile. I send a follow-up within 5 minutes of every call now. My response rate from prospects went up noticeably.",
    author: "@nina.patel",
    skill: "Call Follow-Up Generator",
    rating: 5,
  },
];

export default function HomePage() {
  return (
    <div>

      {/* ── Hero ── */}
      <section className="bg-white border-b border-surface-200">
        <div className="max-w-5xl mx-auto px-6 pt-20 pb-20">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-brand-600 uppercase tracking-widest mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-600 inline-block" />
              AI Skills for Revenue Teams
            </span>
            <h1 className="text-5xl font-bold text-navy-900 mb-5 leading-[1.1] tracking-tight">
              Close more deals.<br />
              <span className="text-brand-600">Powered by AI.</span>
            </h1>
            <p className="text-lg text-ink-500 leading-relaxed mb-8 max-w-xl">
              RevenueSkills gives your team instant access to battle-tested Claude AI skills —
              from MEDDPICC discovery to ROI modeling. Install in seconds. Win more often.
            </p>
            <div className="flex items-center gap-3">
              <Link href="/marketplace" className="btn-primary px-6 py-3 text-base">
                Browse Skills
              </Link>
              <Link href="/categories" className="btn-secondary px-6 py-3 text-base">
                Explore by Category
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="bg-navy-900 border-b border-navy-800">
        <div className="max-w-5xl mx-auto px-6 py-5">
          <div className="flex flex-wrap items-center gap-8 sm:gap-16">
            {[
              { value: SKILLS.length.toString(), label: "Skills Available" },
              { value: totalInstalls.toLocaleString() + "+", label: "Total Installs" },
              { value: "6", label: "Categories" },
              { value: "Free", label: "Always" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-xl font-bold text-white tabular-nums">{value}</p>
                <p className="text-xs text-blue-300 font-medium mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="page pt-14">

        {/* ── Trending ── */}
        <section className="section">
          <SectionHeader
            title="Trending This Month"
            description="Most-installed skills across revenue teams"
            href="/marketplace"
            hrefLabel="See all"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TRENDING_SKILLS.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        </section>

        {/* ── Skills by role ── */}
        <section className="section">
          <SectionHeader
            title="Skills by Role"
            description="Find what's right for your position"
            href="/marketplace"
            hrefLabel="See all skills"
          />
          <div className="space-y-10">
            {ROLES.map((role) => {
              const roleSkills = role.slugs
                .map((slug) => SKILLS.find((s) => s.slug === slug))
                .filter(Boolean) as typeof SKILLS;
              return (
                <div key={role.label}>
                  <div className="flex items-baseline gap-3 mb-4">
                    <h3 className="text-sm font-bold text-navy-900">{role.label}</h3>
                    <span className="text-xs text-ink-400">{role.description}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {roleSkills.map((skill) => (
                      <SkillCard key={skill.id} skill={skill} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Social proof ── */}
        <section className="section">
          <SectionHeader
            title="What Reps Are Saying"
            description="Real results from real revenue professionals"
            href="/marketplace"
            hrefLabel="See all skills"
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {SOCIAL_PROOF.map(({ quote, author, skill, rating }) => (
              <div key={author} className="bg-white border border-surface-200 rounded-2xl p-5 shadow-card flex flex-col gap-4">
                <div className="flex gap-0.5">
                  {Array.from({ length: rating }).map((_, i) => (
                    <svg key={i} className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 20 20" aria-hidden>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-ink-700 leading-relaxed flex-1">&ldquo;{quote}&rdquo;</p>
                <div>
                  <p className="text-xs font-semibold text-ink-900">{author}</p>
                  <p className="text-xs text-ink-400">{skill}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Top Rated ── */}
        <section className="section">
          <SectionHeader
            title="Top Rated"
            description="Highest-rated by the community"
            href="/marketplace"
            hrefLabel="See all"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TOP_RATED_SKILLS.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        </section>

        {/* ── Recently Updated ── */}
        <section className="section">
          <SectionHeader
            title="Recently Updated"
            description="Latest releases and improvements"
            href="/marketplace"
            hrefLabel="See all"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {RECENTLY_UPDATED_SKILLS.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        </section>

        {/* ── CTA banner ── */}
        <section className="mb-16 rounded-2xl bg-navy-900 px-8 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">Built a skill your team loves?</h2>
            <p className="text-sm text-blue-200">Share it with the community and help other reps win.</p>
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
