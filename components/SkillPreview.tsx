"use client";

import type { SkillCategory } from "@/types/skill";

interface PreviewData {
  name: string;
  description: string;
  category: SkillCategory | "";
  tags: string;
  author: string;
  version: string;
  purpose: string;
  instructions: string;
  triggers: string;
}

// Builds a SKILL.md string from partial data, using placeholders for empty fields
// so the preview is always populated and useful.
function buildPreviewMarkdown(d: PreviewData): string {
  const slug = d.name.trim()
    ? d.name.trim().toLowerCase().replace(/[^\w\s-]/g, "").replace(/[\s_]+/g, "-").replace(/--+/g, "-").replace(/^-+|-+$/g, "")
    : "your-skill-name";

  const description = d.description.trim() || "A short description of what this skill does.";
  const author = d.author.trim()
    ? (d.author.trim().startsWith("@") ? d.author.trim() : `@${d.author.trim()}`)
    : "@author";
  const version = d.version.trim() || "1.0.0";
  const category = d.category || "productivity";

  const rawTags = d.tags.trim()
    ? d.tags.split(",").map((t) => t.trim()).filter(Boolean)
    : ["tag1", "tag2"];
  const tags = `[${rawTags.join(", ")}]`;

  const purpose = d.purpose.trim() || "Explain the purpose of your skill here — what it does and who it's for.";

  const instructions = d.instructions.trim() ||
    "1. Describe the first step.\n2. Describe the second step.\n3. Describe the third step.";

  const rawTriggers = d.triggers.trim()
    ? d.triggers.split("\n").map((t) => t.trim()).filter(Boolean)
    : ["Trigger phrase one", "Trigger phrase two"];
  const triggerList = rawTriggers.map((t) => `* ${t}`).join("\n");

  return [
    "---",
    `name: ${slug}`,
    `description: ${description}`,
    `metadata:`,
    `  author: ${author}`,
    `  version: ${version}`,
    `  category: ${category}`,
    `  tags: ${tags}`,
    "---",
    "",
    "## Purpose",
    "",
    purpose,
    "",
    "---",
    "",
    "## Instructions",
    "",
    instructions,
    "",
    "---",
    "",
    "## Trigger Phrases",
    "",
    triggerList,
  ].join("\n");
}

// Highlight YAML keys, section headers, and list markers
function tokenize(line: string): React.ReactNode {
  // YAML frontmatter key
  if (/^(name|description|metadata|author|version|category|tags):/.test(line)) {
    const colon = line.indexOf(":");
    return (
      <>
        <span className="text-violet-400">{line.slice(0, colon + 1)}</span>
        <span className="text-emerald-300">{line.slice(colon + 1)}</span>
      </>
    );
  }
  // YAML fence / section divider
  if (line === "---") return <span className="text-ink-500">---</span>;
  // Markdown section header
  if (/^## /.test(line)) return <span className="text-sky-300 font-semibold">{line}</span>;
  // Bullet / trigger
  if (/^\* /.test(line)) {
    return (
      <>
        <span className="text-amber-400">* </span>
        <span className="text-ink-200">{line.slice(2)}</span>
      </>
    );
  }
  // Numbered step
  if (/^\d+\./.test(line)) {
    const dot = line.indexOf(".");
    return (
      <>
        <span className="text-amber-400">{line.slice(0, dot + 1)}</span>
        <span className="text-ink-200">{line.slice(dot + 1)}</span>
      </>
    );
  }
  // Indented YAML (metadata children)
  if (/^ {2}\w/.test(line)) {
    const colon = line.indexOf(":");
    if (colon !== -1) {
      return (
        <>
          <span className="text-violet-300">{line.slice(0, colon + 1)}</span>
          <span className="text-emerald-300">{line.slice(colon + 1)}</span>
        </>
      );
    }
  }
  return <span className="text-ink-300">{line}</span>;
}

export default function SkillPreview({ data }: { data: PreviewData }) {
  const md = buildPreviewMarkdown(data);
  const lines = md.split("\n");
  const isEmpty = !data.name && !data.description && !data.purpose && !data.instructions && !data.triggers;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-surface-700 bg-surface-800 rounded-t-xl shrink-0">
        <span className="font-mono text-xs text-ink-400">SKILL.md</span>
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="w-2.5 h-2.5 rounded-full bg-surface-600" />
          ))}
        </div>
      </div>

      <div className="relative flex-1 overflow-y-auto rounded-b-xl bg-surface-900 p-5">
        {isEmpty && (
          <p className="absolute inset-0 flex items-center justify-center text-xs text-ink-600 pointer-events-none select-none">
            Start filling in the form to see your SKILL.md
          </p>
        )}
        <pre className={`font-mono text-xs leading-relaxed whitespace-pre-wrap transition-opacity ${isEmpty ? "opacity-20" : "opacity-100"}`}>
          {lines.map((line, i) => (
            <div key={i}>{tokenize(line)}{"\n"}</div>
          ))}
        </pre>
      </div>
    </div>
  );
}
