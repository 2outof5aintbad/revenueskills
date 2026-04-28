import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { BUNDLES } from "@/lib/bundles";
import { SKILLS } from "@/lib/skills";

export const metadata = { title: "Skill Bundles — RevenueSkills" };

export default function BundlesPage() {
  return (
    <div className="page">
      <PageHeader
        title="Skill Bundles"
        description="Curated collections built for every role on your revenue team."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-16">
        {BUNDLES.map((bundle) => {
          const skills = bundle.skillSlugs
            .map((slug) => SKILLS.find((s) => s.slug === slug))
            .filter(Boolean) as typeof SKILLS;
          const totalInstalls = skills.reduce((sum, s) => sum + s.installs, 0);
          const avgRating = skills.reduce((sum, s) => sum + s.rating, 0) / skills.length;

          return (
            <Link
              key={bundle.slug}
              href={`/bundles/${bundle.slug}`}
              className="group flex flex-col bg-white border border-surface-200 rounded-2xl p-6 shadow-card hover:shadow-card-hover hover:-translate-y-px transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-3xl leading-none">{bundle.icon}</span>
                {bundle.featured && (
                  <span className="label px-2 py-0.5 rounded-full bg-brand-50 text-brand-600 border border-brand-100">
                    Featured
                  </span>
                )}
              </div>

              <div className="mb-1">
                <span className="label text-ink-400">{bundle.role}</span>
              </div>
              <h2 className="text-base font-bold text-navy-900 mb-1.5 group-hover:text-brand-600 transition-colors">
                {bundle.name}
              </h2>
              <p className="text-sm text-ink-500 leading-relaxed mb-5 flex-1">
                {bundle.tagline}
              </p>

              {/* Skill pill list */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {skills.slice(0, 4).map((s) => (
                  <span key={s.slug} className="label px-2 py-0.5 rounded-md bg-surface-100 border border-surface-200 text-ink-400">
                    {s.name}
                  </span>
                ))}
                {skills.length > 4 && (
                  <span className="label px-2 py-0.5 rounded-md text-ink-300">
                    +{skills.length - 4} more
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-surface-100 text-xs text-ink-400">
                <span>{skills.length} skills</span>
                <div className="flex items-center gap-3">
                  <span>{totalInstalls.toLocaleString()} installs</span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3 text-amber-400 fill-current" viewBox="0 0 20 20" aria-hidden>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    {avgRating.toFixed(1)}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
