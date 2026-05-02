import { notFound } from "next/navigation";
import Link from "next/link";
import { BUNDLES } from "@/lib/bundles";
import { SKILLS } from "@/lib/skills";
import SkillCard from "@/components/SkillCard";
import CopyButton from "@/components/CopyButton";
import { generateSkillMarkdown } from "@/lib/skillGenerator";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return BUNDLES.map((b) => ({ slug: b.slug }));
}

export function generateMetadata({ params }: Props) {
  const bundle = BUNDLES.find((b) => b.slug === params.slug);
  if (!bundle) return {};
  return {
    title: `${bundle.name} — RevenueSkills`,
    description: bundle.tagline,
  };
}

export default function BundleDetailPage({ params }: Props) {
  const bundle = BUNDLES.find((b) => b.slug === params.slug);
  if (!bundle) notFound();

  const skills = bundle.skillSlugs
    .map((slug) => SKILLS.find((s) => s.slug === slug))
    .filter(Boolean) as typeof SKILLS;

  const totalInstalls = skills.reduce((sum, s) => sum + s.installs, 0);
  const avgRating = skills.reduce((sum, s) => sum + s.rating, 0) / skills.length;

  const allMarkdown = skills.map((skill) => {
    const latestVersion = skill.versions[0]?.version ?? "1.0.0";
    return generateSkillMarkdown({
      name: skill.name,
      description: skill.description,
      category: skill.category,
      tags: skill.tags,
      author: skill.author,
      version: latestVersion,
      purpose: skill.description,
      instructions: `Follow the skill definition to assist with: ${skill.name.toLowerCase()}.`,
      triggers: skill.triggers,
    });
  }).join("\n\n---\n\n");

  return (
    <div className="page py-10">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-ink-400 mb-8">
        <Link href="/" className="hover:text-ink-700 transition-colors">Home</Link>
        <span className="text-ink-200">/</span>
        <Link href="/bundles" className="hover:text-ink-700 transition-colors">Bundles</Link>
        <span className="text-ink-200">/</span>
        <span className="text-ink-600">{bundle.name}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-16">

        {/* ── Main content ── */}
        <div className="flex-1 min-w-0">

          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl leading-none">{bundle.icon}</span>
              {bundle.featured && (
                <span className="label px-2.5 py-1 rounded-full bg-brand-50 text-brand-600 border border-brand-100">
                  Featured
                </span>
              )}
            </div>
            <div className="label text-ink-400 mb-2">{bundle.role}</div>
            <h1 className="text-2xl font-bold text-navy-900 mb-3 leading-snug">
              {bundle.name}
            </h1>
            <p className="text-base text-ink-500 leading-relaxed mb-5 max-w-2xl">
              {bundle.description}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-ink-400">
              <span>{skills.length} skills</span>
              <span className="text-ink-200">·</span>
              <span>{totalInstalls.toLocaleString()} total installs</span>
              <span className="text-ink-200">·</span>
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 20 20" aria-hidden>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                {avgRating.toFixed(1)} avg rating
              </span>
            </div>
          </header>

          <div className="border-t border-surface-100 my-10" />

          {/* Skills in this bundle */}
          <section className="mb-10">
            <p className="label mb-6">Skills in this bundle</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skills.map((skill) => (
                <SkillCard key={skill.id} skill={skill} />
              ))}
            </div>
          </section>

          <div className="border-t border-surface-100 my-10" />

          {/* How to use */}
          <section className="mb-10">
            <p className="label mb-4">How to use this bundle</p>
            <ol className="space-y-5">
              {[
                {
                  step: "1",
                  title: "Copy all skills",
                  body: 'Click "Copy All as Markdown" in the sidebar to copy all skills in this bundle to your clipboard.',
                },
                {
                  step: "2",
                  title: "Add to a Claude Project",
                  body: "Open Claude, create a new Project, and paste the bundle into the Project instructions. All skills in the bundle will be active in every conversation in that Project.",
                },
                {
                  step: "3",
                  title: "Trigger individual skills",
                  body: "Use any trigger phrase from the individual skill pages to activate a specific skill. Claude will know which skill to run based on your phrase.",
                },
                {
                  step: "4",
                  title: "Use skills one at a time",
                  body: "Prefer to use a single skill? Click any skill card above to view and copy it individually.",
                },
              ].map(({ step, title, body }) => (
                <li key={step} className="flex gap-4">
                  <span className="w-7 h-7 rounded-full bg-navy-900 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {step}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink-900 mb-0.5">{title}</p>
                    <p className="text-sm text-ink-500 leading-relaxed">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

        </div>

        {/* ── Sidebar ── */}
        <aside className="lg:w-64 shrink-0">
          <div className="sticky top-20 space-y-3">

            <CopyButton text={allMarkdown} />

            <Link
              href="/marketplace"
              className="btn-secondary w-full"
            >
              Browse All Skills
            </Link>

            {/* Bundle stats */}
            <div className="rounded-xl border border-surface-200 bg-white divide-y divide-surface-100 overflow-hidden">
              {[
                { label: "Skills",          value: skills.length.toString() },
                { label: "Total Installs",  value: totalInstalls.toLocaleString() },
                { label: "Avg Rating",      value: `${avgRating.toFixed(1)} / 5` },
                { label: "Best For",        value: bundle.role },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between px-4 py-2.5">
                  <span className="text-xs text-ink-400">{label}</span>
                  <span className="text-xs font-semibold text-ink-700 text-right max-w-[60%]">{value}</span>
                </div>
              ))}
            </div>

            {/* Other bundles */}
            <div className="rounded-xl border border-surface-200 bg-white p-4">
              <p className="label mb-3">Other Bundles</p>
              <div className="space-y-2">
                {BUNDLES.filter((b) => b.slug !== bundle.slug).map((b) => (
                  <Link
                    key={b.slug}
                    href={`/bundles/${b.slug}`}
                    className="flex items-center gap-2.5 py-1.5 group"
                  >
                    <span className="text-base leading-none shrink-0">{b.icon}</span>
                    <span className="text-xs text-ink-500 group-hover:text-brand-600 transition-colors leading-snug">
                      {b.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </aside>

      </div>
    </div>
  );
}
