import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { CATEGORY_LABELS } from "@/lib/skills";
import type { SkillCategory } from "@/types/skill";

export const metadata = { title: "Categories — SkillMarket" };

const CATEGORY_DESCRIPTIONS: Record<SkillCategory, string> = {
  sales: "Pipeline management, deal coaching, prospecting, and follow-up.",
  research: "Competitive intel, market research, and account discovery.",
  productivity: "Meeting prep, summarization, and task automation.",
  writing: "Proposals, outreach, and long-form content.",
  data: "Data analysis, reporting, and visualization.",
  "customer-success": "QBRs, health scoring, and renewal prep.",
};

export default function CategoriesPage() {
  const categories = Object.keys(CATEGORY_LABELS) as SkillCategory[];

  return (
    <div className="page">
      <PageHeader title="Categories" description="Browse skills by use case." />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-16">
        {categories.map((cat) => (
          <Link
            key={cat}
            href={`/marketplace?category=${cat}`}
            className="group rounded-2xl border border-surface-200 bg-surface-0 p-5 shadow-card hover:shadow-card-hover hover:-translate-y-px transition-all duration-200"
          >
            <h2 className="text-sm font-semibold text-ink-900 mb-1.5 group-hover:text-brand-600 transition-colors">
              {CATEGORY_LABELS[cat]}
            </h2>
            <p className="text-sm text-ink-400 leading-relaxed">
              {CATEGORY_DESCRIPTIONS[cat]}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
