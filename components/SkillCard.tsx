import Link from "next/link";
import type { Skill } from "@/types/skill";
import { CATEGORY_LABELS } from "@/lib/skills";

const STAR_PATH = "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z";

export default function SkillCard({ skill }: { skill: Skill }) {
  const latestVersion = skill.versions[0]?.version ?? "1.0.0";

  return (
    <Link
      href={`/skill/${skill.slug}`}
      className="group flex flex-col bg-surface-0 border border-surface-200 rounded-2xl p-5 shadow-card hover:shadow-card-hover hover:-translate-y-px transition-all duration-200"
    >
      {/* Category + featured */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <span className="label px-2 py-0.5 rounded-full bg-surface-100 border border-surface-200">
          {CATEGORY_LABELS[skill.category]}
        </span>
        {skill.featured && (
          <span className="label px-2 py-0.5 rounded-full bg-brand-50 text-brand-600 border border-brand-100">
            Featured
          </span>
        )}
      </div>

      {/* Name */}
      <h3 className="text-sm font-semibold text-ink-900 mb-2 group-hover:text-brand-600 transition-colors leading-snug">
        {skill.name}
      </h3>

      {/* Description */}
      <p className="text-sm text-ink-500 leading-relaxed line-clamp-2 mb-4 flex-1">
        {skill.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {skill.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="label px-2 py-0.5 rounded-md bg-surface-100 border border-surface-200 text-ink-400">
            {tag}
          </span>
        ))}
        {skill.tags.length > 3 && (
          <span className="label px-2 py-0.5 rounded-md text-ink-300">
            +{skill.tags.length - 3}
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3.5 border-t border-surface-100">
        <div className="flex items-center gap-1.5">
          <svg className="w-3 h-3 text-amber-400 fill-current" viewBox="0 0 20 20" aria-hidden>
            <path d={STAR_PATH} />
          </svg>
          <span className="text-xs font-medium text-ink-700">{skill.rating.toFixed(1)}</span>
          <span className="text-xs text-ink-200">·</span>
          <span className="text-xs text-ink-400">
            {skill.reviews.length} review{skill.reviews.length !== 1 ? "s" : ""}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-ink-400">
          <span>{skill.installs.toLocaleString()} installs</span>
          <span className="text-ink-200">·</span>
          <span className="font-mono text-label">v{latestVersion}</span>
        </div>
      </div>

      {/* Author */}
      <p className="mt-2 text-label text-ink-300">by {skill.author}</p>
    </Link>
  );
}
