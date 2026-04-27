import Link from "next/link";
import SkillCard from "@/components/SkillCard";
import SectionHeader from "@/components/SectionHeader";
import { TRENDING_SKILLS, TOP_RATED_SKILLS, RECENTLY_UPDATED_SKILLS } from "@/lib/skills";

export default function HomePage() {
  return (
    <div className="page">

      {/* Hero */}
      <section className="pt-16 pb-14 max-w-xl">
        <h1 className="text-3xl font-semibold text-ink-900 mb-3 leading-snug tracking-tight">
          Skills for Claude.<br />Built for real work.
        </h1>
        <p className="text-base text-ink-500 leading-relaxed mb-7">
          Discover and install structured skills that turn Claude into a
          specialist — for sales, research, writing, and more.
        </p>
        <div className="flex items-center gap-3">
          <Link href="/marketplace" className="btn-primary">Browse Marketplace</Link>
          <Link href="/submit" className="btn-secondary">Submit a Skill</Link>
        </div>
      </section>

      <div className="border-t border-surface-200 mb-14" />

      {/* Trending */}
      <section className="section">
        <SectionHeader
          title="Trending"
          description="Most installed this month"
          href="/marketplace"
          hrefLabel="See all"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TRENDING_SKILLS.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      </section>

      {/* Top Rated */}
      <section className="section">
        <SectionHeader
          title="Top Rated"
          description="Highest community ratings"
          href="/marketplace"
          hrefLabel="See all"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TOP_RATED_SKILLS.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      </section>

      {/* Recently Updated */}
      <section className="section">
        <SectionHeader
          title="Recently Updated"
          description="Latest version releases"
          href="/marketplace"
          hrefLabel="See all"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {RECENTLY_UPDATED_SKILLS.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      </section>

    </div>
  );
}
