"use client";

import { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import SkillCard from "@/components/SkillCard";
import PageHeader from "@/components/PageHeader";
import { SKILLS, CATEGORY_LABELS } from "@/lib/skills";
import type { SkillCategory } from "@/types/skill";

const CATEGORIES = Object.keys(CATEGORY_LABELS) as SkillCategory[];

export default function MarketplacePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCategory = (searchParams.get("category") ?? "") as SkillCategory | "";

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<SkillCategory | "">(initialCategory);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SKILLS.filter((s) => {
      const matchesCategory = !category || s.category === category;
      const matchesQuery =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q)) ||
        s.author.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  function handleCategory(val: SkillCategory | "") {
    setCategory(val);
    const params = new URLSearchParams(searchParams.toString());
    if (val) {
      params.set("category", val);
    } else {
      params.delete("category");
    }
    router.replace(`/marketplace?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="page">
      <PageHeader
        title="Marketplace"
        description={`${filtered.length} of ${SKILLS.length} skills`}
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="search"
          placeholder="Search skills…"
          className="field flex-1"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          className="field sm:w-52"
          value={category}
          onChange={(e) => handleCategory(e.target.value as SkillCategory | "")}
        >
          <option value="">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-ink-400 text-sm py-12 text-center">
          No skills match your search.{" "}
          <button
            className="underline underline-offset-2"
            onClick={() => { setQuery(""); handleCategory(""); }}
          >
            Clear filters
          </button>
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-16">
          {filtered.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      )}
    </div>
  );
}
