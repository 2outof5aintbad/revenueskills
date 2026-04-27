import SkillCard from "@/components/SkillCard";
import PageHeader from "@/components/PageHeader";
import { SKILLS } from "@/lib/skills";

export const metadata = { title: "Marketplace — SkillMarket" };

export default function MarketplacePage() {
  return (
    <div className="page">
      <PageHeader
        title="Marketplace"
        description={`${SKILLS.length} skills available`}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-16">
        {SKILLS.map((skill) => (
          <SkillCard key={skill.id} skill={skill} />
        ))}
      </div>
    </div>
  );
}
