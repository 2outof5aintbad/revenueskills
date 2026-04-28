import Link from "next/link";
import SkillCard from "@/components/SkillCard";
import SectionHeader from "@/components/SectionHeader";
import { TRENDING_SKILLS, TOP_RATED_SKILLS, RECENTLY_UPDATED_SKILLS, SKILLS } from "@/lib/skills";

const totalInstalls = SKILLS.reduce((sum, s) => sum + s.installs, 0);

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

      {/* ── Skill sections ── */}
      <div className="page pt-14">

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
