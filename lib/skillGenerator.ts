import type { SkillCategory } from "@/types/skill";
// ---------------------------------------------------------------------------
// Input type
// ---------------------------------------------------------------------------

export interface SkillFormData {
  name: string;
  description: string;
  category: SkillCategory;
  /** Comma-separated string or pre-parsed array */
  tags: string | string[];
  /** With or without leading @ */
  author: string;
  /** Semver string — defaults to "1.0.0" if omitted or invalid */
  version?: string;
  /** One paragraph explaining what the skill does and for whom */
  purpose: string;
  /** Step-by-step instructions for Claude to follow */
  instructions: string;
  /** Newline-separated string or pre-parsed array */
  triggers: string | string[];
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

export interface ValidationError {
  field: keyof SkillFormData;
  message: string;
}

const VALID_CATEGORIES: SkillCategory[] = [
  "sales",
  "research",
  "productivity",
  "writing",
  "data",
  "customer-success",
];

const SEMVER_RE = /^\d+\.\d+\.\d+$/;

export function validateSkillFormData(data: SkillFormData): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!data.name.trim()) {
    errors.push({ field: "name", message: "Name is required." });
  }

  if (!data.description.trim()) {
    errors.push({ field: "description", message: "Description is required." });
  }

  if (!VALID_CATEGORIES.includes(data.category)) {
    errors.push({ field: "category", message: "A valid category is required." });
  }

  if (parseTags(data.tags).length === 0) {
    errors.push({ field: "tags", message: "At least one tag is required." });
  }

  if (!data.author.trim()) {
    errors.push({ field: "author", message: "Author is required." });
  }

  if (data.version && !SEMVER_RE.test(data.version.trim())) {
    errors.push({ field: "version", message: "Version must be semver (e.g. 1.0.0)." });
  }

  if (!data.purpose.trim()) {
    errors.push({ field: "purpose", message: "Purpose is required." });
  }

  if (!data.instructions.trim()) {
    errors.push({ field: "instructions", message: "Instructions are required." });
  }

  if (parseTriggers(data.triggers).length === 0) {
    errors.push({ field: "triggers", message: "At least one trigger phrase is required." });
  }

  return errors;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** "Deal Coach" → "deal-coach" */
export function slugify(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Normalise author to always start with @ */
function normaliseAuthor(author: string): string {
  const trimmed = author.trim();
  return trimmed.startsWith("@") ? trimmed : `@${trimmed}`;
}

/** Parse comma-separated or array tags, trim, deduplicate, drop empties */
function parseTags(raw: string | string[]): string[] {
  const list = Array.isArray(raw)
    ? raw
    : raw.split(",").map((t) => t.trim());
  return Array.from(new Set(list.map((t) => t.trim()).filter(Boolean)));
}

/** Parse newline-or-comma-separated triggers, trim, drop empties */
function parseTriggers(raw: string | string[]): string[] {
  if (Array.isArray(raw)) return raw.map((t) => t.trim()).filter(Boolean);
  // Support both newline-separated and comma-separated
  const sep = raw.includes("\n") ? "\n" : ",";
  return raw
    .split(sep)
    .map((t) => t.trim())
    .filter(Boolean);
}

/**
 * Wrap a YAML scalar value in double-quotes when the value contains
 * characters that would break a plain YAML scalar.
 *
 * Rules for plain scalars in a mapping value position:
 *   - Must not start with an indicator: { } [ ] , : # & * ? | > ! " ' % @ `
 *   - Must not contain ": " (colon-space — key separator)
 *   - Must not contain " #" (space-hash — inline comment marker)
 */
function yamlScalar(value: string): string {
  const needsQuoting =
    /^[{}[\],:#&*?|>!"'%@`]/.test(value) ||
    /: /.test(value) ||
    / #/.test(value) ||
    value === "" ||
    value === "true" ||
    value === "false" ||
    value === "null" ||
    SEMVER_RE.test(value); // e.g. "1.0.0" → quoting avoids float ambiguity

  if (!needsQuoting) return value;

  // Escape backslashes then double-quotes, then wrap
  const escaped = value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  return `"${escaped}"`;
}

/** Render a YAML flow sequence: [tag1, "tag with: colon", tag3] */
function yamlFlowSeq(items: string[]): string {
  return `[${items.map(yamlScalar).join(", ")}]`;
}

/** Remove trailing whitespace from every line. */
function stripTrailingSpaces(text: string): string {
  return text
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n");
}

/** Collapse 3+ consecutive blank lines to 2, then trim trailing newlines. */
function normaliseBlankLines(text: string): string {
  return text.replace(/\n{3,}/g, "\n\n").trimEnd();
}

// ---------------------------------------------------------------------------
// Generator
// ---------------------------------------------------------------------------

export function generateSkillMarkdown(data: SkillFormData): string {
  const errors = validateSkillFormData(data);
  if (errors.length > 0) {
    const summary = errors.map((e) => `  ${e.field}: ${e.message}`).join("\n");
    throw new Error(`Cannot generate SKILL.md — validation failed:\n${summary}`);
  }

  const slug = slugify(data.name);
  const author = normaliseAuthor(data.author);
  const version = data.version?.trim() && SEMVER_RE.test(data.version.trim())
    ? data.version.trim()
    : "1.0.0";
  const tags = parseTags(data.tags);
  const triggers = parseTriggers(data.triggers);

  const frontmatter = [
    "---",
    `name: ${slug}`,
    `description: ${yamlScalar(data.description.trim())}`,
    `metadata:`,
    `  author: ${yamlScalar(author)}`,
    `  version: ${yamlScalar(version)}`,
    `  category: ${data.category}`,
    `  tags: ${yamlFlowSeq(tags)}`,
    "---",
  ].join("\n");

  const purposeSection = [
    "## Purpose",
    "",
    data.purpose.trim(),
  ].join("\n");

  const instructionsSection = [
    "## Instructions",
    "",
    data.instructions.trim(),
  ].join("\n");

  const triggerSection = [
    "## Trigger Phrases",
    "",
    triggers.map((t) => `* ${t}`).join("\n"),
  ].join("\n");

  const raw = [
    frontmatter,
    "",
    purposeSection,
    "",
    "---",
    "",
    instructionsSection,
    "",
    "---",
    "",
    triggerSection,
    "",
  ].join("\n");

  return normaliseBlankLines(stripTrailingSpaces(raw));
}
