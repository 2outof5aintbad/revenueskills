import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { CATEGORY_LABELS, SKILLS } from "@/lib/skills";
import type { SkillCategory } from "@/types/skill";

export const metadata = { title: "Categories — RevenueSkills" };

const CATEGORY_META: Record<SkillCategory, { description: string; icon: string }> = {
  sales: {
    description: "Pipeline management, deal coaching, MEDDPICC qualification, and competitive plays.",
    icon: "📈",
  },
  research: {
    description: "Account intelligence, competitive analysis, and prospect research — before you dial.",
    icon: "🔍",
  },
  productivity: {
    description: "Meeting prep, call summaries, follow-ups, and task automation for busy reps.",
    icon: "⚡",
  },
  writing: {
    description: "Proposals, outreach sequences, executive summaries, and business cases.",
    icon: "✍️",
  },
  data: {
    description: "Pipeline analytics, forecast modeling, and data-driven territory insights.",
    icon: "📊",
  },
  "customer-success": {
    description: "QBR prep, health scoring, renewal plays, and expansion opportunity identification.",
    icon: "🤝",
  },
};

export default function CategoriesPage() {
  const categories = Object.keys(CATEGORY_LABELS) as SkillCategory[];

  return (
    <div className="page">
      <PageHeader
        title="Browse by Category"
        description="Find the right skill for every stage of the revenue cycle."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-16">
        {categories.map((cat) => {
          const count = SKILLS.filter((s) => s.category === cat).length;
          const meta = CATEGORY_META[cat];
          return (
            <Link
              key={cat}
              href={`/marketplace?category=${cat}`}
              className="group rounded-2xl border border-surface-200 bg-white p-6 shadow-card hover:shadow-card-hover hover:-translate-y-px transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl leading-none">{meta.icon}</span>
                <span className="label px-2 py-0.5 rounded-full bg-surface-100 border border-surface-200">
                  {count} skill{count !== 1 ? "s" : ""}
                </span>
              </div>
              <h2 className="text-sm font-bold text-navy-900 mb-1.5 group-hover:text-brand-600 transition-colors">
                {CATEGORY_LABELS[cat]}
              </h2>
              <p className="text-sm text-ink-400 leading-relaxed">
                {meta.description}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
