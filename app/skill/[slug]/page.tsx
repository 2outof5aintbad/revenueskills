import { notFound } from "next/navigation";
import Link from "next/link";
import { SKILLS, CATEGORY_LABELS } from "@/lib/skills";
import { generateSkillMarkdown } from "@/lib/skillGenerator";
import DownloadButton from "@/components/DownloadButton";
import PreviewInClaudeButton from "@/components/PreviewInClaudeButton";
import ReviewSection from "@/components/ReviewSection";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return SKILLS.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: Props) {
  const skill = SKILLS.find((s) => s.slug === params.slug);
  if (!skill) return {};
  return { title: `${skill.name} — SkillMarket`, description: skill.description };
}

const STAR_PATH = "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z";

function Divider() {
  return <div className="border-t border-surface-100 my-10" />;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="label mb-4">{children}</p>;
}

export default function SkillDetailPage({ params }: Props) {
  const skill = SKILLS.find((s) => s.slug === params.slug);
  if (!skill) notFound();

  const latestVersion = skill.versions[0]?.version ?? "1.0.0";
  const latestDate = skill.versions[0]?.createdAt
    ? new Date(skill.versions[0].createdAt).toLocaleDateString("en-US", {
        month: "short", day: "numeric", year: "numeric",
      })
    : "—";

  const skillMarkdown = generateSkillMarkdown({
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

  return (
    <div className="page py-10">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-ink-400 mb-8">
        <Link href="/" className="hover:text-ink-700 transition-colors">Home</Link>
        <span className="text-ink-200">/</span>
        <Link href="/marketplace" className="hover:text-ink-700 transition-colors">Marketplace</Link>
        <span className="text-ink-200">/</span>
        <span className="text-ink-600">{skill.name}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-16">

        {/* ── Content ── */}
        <div className="flex-1 min-w-0">

          <header className="mb-10">
            {/* Pills */}
            <div className="flex items-center gap-2 mb-4">
              <span className="label px-2.5 py-1 rounded-full bg-surface-100 border border-surface-200 text-ink-400">
                {CATEGORY_LABELS[skill.category]}
              </span>
              {skill.featured && (
                <span className="label px-2.5 py-1 rounded-full bg-brand-50 text-brand-600 border border-brand-100">
                  Featured
                </span>
              )}
            </div>

            <h1 className="text-2xl font-semibold text-ink-900 mb-3 leading-snug">
              {skill.name}
            </h1>

            <p className="text-base text-ink-500 leading-relaxed mb-5 max-w-2xl">
              {skill.description}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-ink-400">
              <div className="flex items-center gap-1.5">
                <span className="inline-flex items-center gap-0.5">
                  {[1,2,3,4,5].map((i) => (
                    <svg key={i} className={`w-3 h-3 fill-current ${i <= Math.round(skill.rating) ? "text-amber-400" : "text-surface-200"}`} viewBox="0 0 20 20" aria-hidden>
                      <path d={STAR_PATH} />
                    </svg>
                  ))}
                </span>
                <span className="font-medium text-ink-700">{skill.rating.toFixed(1)}</span>
                <span className="text-ink-200">·</span>
                <span>{skill.reviews.length} reviews</span>
              </div>
              <span className="text-ink-200">·</span>
              <span>{skill.installs.toLocaleString()} installs</span>
              <span className="text-ink-200">·</span>
              <span className="font-mono text-label">v{latestVersion}</span>
              <span className="text-ink-200">·</span>
              <span>Updated {latestDate}</span>
            </div>
          </header>

          <Divider />

          {/* Triggers */}
          <section className="mb-10">
            <SectionLabel>Trigger Phrases</SectionLabel>
            <p className="text-sm text-ink-400 mb-4">This skill activates when you say:</p>
            <ul className="space-y-2.5">
              {skill.triggers.map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="text-ink-200 font-mono text-sm leading-5 shrink-0 mt-0.5">›</span>
                  <span className="text-sm text-ink-700 leading-relaxed">&ldquo;{t}&rdquo;</span>
                </li>
              ))}
            </ul>
          </section>

          <Divider />

          {/* What's Included */}
          <section className="mb-10">
            <SectionLabel>What&apos;s Included</SectionLabel>
            <div className="space-y-2">
              {[
                { name: "SKILL.md",      desc: "Core skill definition — instructions, triggers, and output format", icon: "📄" },
                { name: "references/",   desc: "Supporting context files, frameworks, and prompt libraries",       icon: "📁" },
                { name: "assets/",       desc: "Example outputs, templates, and sample data",                      icon: "🗂️" },
              ].map((file) => (
                <div key={file.name} className="flex items-start gap-3 px-4 py-3 rounded-xl bg-surface-50 border border-surface-100">
                  <span className="text-base leading-5 mt-0.5 shrink-0">{file.icon}</span>
                  <div>
                    <p className="text-sm font-mono font-medium text-ink-700">{file.name}</p>
                    <p className="text-xs text-ink-400 mt-0.5">{file.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <Divider />

          {/* Example Output */}
          <section className="mb-10">
            <SectionLabel>Example Output</SectionLabel>
            <p className="text-sm text-ink-400 mb-4">Preview only — actual output varies based on your input.</p>
            <div className="rounded-xl border border-surface-200 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-surface-200 bg-surface-100">
                <span className="font-mono text-label text-ink-400">example-output.md</span>
                <div className="flex gap-1.5">
                  {[0,1,2].map((i) => <span key={i} className="w-2.5 h-2.5 rounded-full bg-surface-300" />)}
                </div>
              </div>
              <pre className="p-5 text-xs text-ink-600 leading-relaxed overflow-x-auto font-mono whitespace-pre-wrap bg-surface-50">
                {skill.exampleOutput}
              </pre>
            </div>
          </section>

          <Divider />

          <ReviewSection slug={skill.slug} initialReviews={skill.reviews} initialRating={skill.rating} />

          <Divider />

          {/* Version History */}
          <section className="mb-10">
            <SectionLabel>Version History</SectionLabel>
            <div>
              {skill.versions.map((v, i) => (
                <div key={v.version} className="flex gap-4">
                  <div className="flex flex-col items-center pt-1">
                    <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${i === 0 ? "bg-brand-500" : "bg-surface-300"}`} />
                    {i < skill.versions.length - 1 && (
                      <div className="w-px flex-1 bg-surface-200 my-1.5" />
                    )}
                  </div>
                  <div className="pb-6 last:pb-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`font-mono text-sm font-semibold ${i === 0 ? "text-ink-900" : "text-ink-500"}`}>
                        v{v.version}
                      </span>
                      {i === 0 && (
                        <span className="label px-1.5 py-0.5 rounded bg-brand-50 text-brand-600 border border-brand-100">
                          latest
                        </span>
                      )}
                      <span className="text-xs text-ink-300">
                        {new Date(v.createdAt).toLocaleDateString("en-US", {
                          month: "short", day: "numeric", year: "numeric",
                        })}
                      </span>
                    </div>
                    <p className="text-sm text-ink-500 leading-relaxed">{v.changeSummary}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <Divider />

          {/* Builder */}
          <section>
            <SectionLabel>Builder</SectionLabel>
            <div className="flex items-start gap-4 p-5 rounded-xl bg-surface-50 border border-surface-100">
              <div className="w-9 h-9 rounded-full bg-surface-200 flex items-center justify-center shrink-0">
                <span className="text-xs font-semibold text-ink-500">
                  {skill.author.replace("@", "").slice(0, 2).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-ink-900 mb-1">{skill.author}</p>
                <p className="text-sm text-ink-500 leading-relaxed">{skill.authorBio}</p>
                <p className="text-xs text-ink-300 mt-2">
                  {SKILLS.filter((s) => s.author === skill.author).length} skill
                  {SKILLS.filter((s) => s.author === skill.author).length !== 1 ? "s" : ""} published
                </p>
              </div>
            </div>
          </section>

        </div>

        {/* ── Sidebar ── */}
        <aside className="lg:w-64 shrink-0">
          <div className="sticky top-20 space-y-3">

            <DownloadButton skillMarkdown={skillMarkdown} skillName={skill.name} />

            <PreviewInClaudeButton skillMarkdown={skillMarkdown} skillName={skill.name} />

            {/* Stats */}
            <div className="rounded-xl border border-surface-200 bg-surface-0 divide-y divide-surface-100 overflow-hidden">
              {[
                { label: "Version",   value: `v${latestVersion}` },
                { label: "Updated",   value: latestDate },
                { label: "Installs",  value: skill.installs.toLocaleString() },
                { label: "Rating",    value: `${skill.rating.toFixed(1)} / 5` },
                { label: "Category",  value: CATEGORY_LABELS[skill.category] },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between px-4 py-2.5">
                  <span className="text-xs text-ink-400">{label}</span>
                  <span className="text-xs font-medium text-ink-700">{value}</span>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="rounded-xl border border-surface-200 bg-surface-0 p-4">
              <p className="label mb-3">Tags</p>
              <div className="flex flex-wrap gap-1.5">
                {skill.tags.map((tag) => (
                  <span key={tag} className="label px-2 py-0.5 rounded-md bg-surface-100 text-ink-400 border border-surface-200">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <Link
              href="/marketplace"
              className="block text-center text-xs text-ink-400 hover:text-ink-700 transition-colors py-1"
            >
              Back to Marketplace
            </Link>

          </div>
        </aside>

      </div>
    </div>
  );
}
