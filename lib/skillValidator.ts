import type { SkillFormData } from "./skillGenerator";

// ---------------------------------------------------------------------------
// Return type
// ---------------------------------------------------------------------------

export interface ValidationResult {
  isValid: boolean; // true when score >= 60
  score: number;    // 0–100
  issues: string[];
}

// ---------------------------------------------------------------------------
// Internal rule shape
// ---------------------------------------------------------------------------

interface Rule {
  points: number;
  check: (data: SkillFormData) => boolean;
  issue: string;
}

// ---------------------------------------------------------------------------
// Parsing helpers (local — no dependency on skillGenerator internals)
// ---------------------------------------------------------------------------

function parseTriggerList(raw: string | string[]): string[] {
  if (Array.isArray(raw)) return raw.map((t) => t.trim()).filter(Boolean);
  const sep = raw.includes("\n") ? "\n" : ",";
  return raw.split(sep).map((t) => t.trim()).filter(Boolean);
}

function parseTagList(raw: string | string[]): string[] {
  const list = Array.isArray(raw) ? raw : raw.split(",");
return Array.from(new Set(list.map((t) => t.trim()).filter(Boolean)));}

// ---------------------------------------------------------------------------
// Instruction structure helpers
// ---------------------------------------------------------------------------

const NUMBERED_STEP_RE = /^\s*\d+[.)]\s+\S/m;
const BULLET_RE = /^\s*[-*•]\s+\S/gm;

function hasNumberedSteps(text: string): boolean {
  return NUMBERED_STEP_RE.test(text);
}

function countBullets(text: string): number {
  return (text.match(BULLET_RE) ?? []).length;
}

function countSteps(text: string): number {
  const numbered = (text.match(/^\s*\d+[.)]\s+\S/gm) ?? []).length;
  const bullets = countBullets(text);
  // Prefer numbered count; fall back to bullets if no numbered steps found
  return numbered > 0 ? numbered : bullets;
}

// ---------------------------------------------------------------------------
// Trigger quality helpers
// ---------------------------------------------------------------------------

const TRIGGER_VERB_RE =
  /^(run|prep|prepare|build|draft|generate|create|analyze|analyse|summarize|summarise|review|check|write|find|identify|show|give|pull|get|help|turn|convert)\b/i;

const GENERIC_TRIGGER_RE = /^(help|do|run|go|ok|yes|start|use|make|get|go ahead)\.?$/i;

// ---------------------------------------------------------------------------
// Name quality helpers
// ---------------------------------------------------------------------------

const GENERIC_NAME_PREFIXES = ["skill", "tool", "helper", "assistant", "bot", "my ", "a ", "the "];

function nameIsTooGeneric(name: string): boolean {
  const lower = name.toLowerCase().trim();
  return GENERIC_NAME_PREFIXES.some((prefix) => lower.startsWith(prefix));
}

// ---------------------------------------------------------------------------
// Rule table — total: 100 points
//
// Name        : 15 pts  (5 + 5 + 5)
// Description : 20 pts  (5 + 5 + 10)
// Instructions: 30 pts  (5 + 5 + 10 + 10)
// Triggers    : 25 pts  (5 + 5 + 5 + 5 + 5)
// Tags        : 10 pts  (5 + 5)
// ---------------------------------------------------------------------------

const RULES: Rule[] = [
  // ── Name (15 pts) ──────────────────────────────────────────────────────────
  {
    points: 5,
    check: (d) => d.name.trim().length > 0,
    issue: "Name is required.",
  },
  {
    points: 5,
    check: (d) => d.name.trim().length >= 8,
    issue: "Name is too short — describe what the skill does, not just a category.",
  },
  {
    points: 5,
    check: (d) => !nameIsTooGeneric(d.name),
    issue: "Name is too generic — lead with the outcome, not the type (e.g. 'Deal Coach' not 'Sales Tool').",
  },

  // ── Description (20 pts) ──────────────────────────────────────────────────
  {
    points: 5,
    check: (d) => d.description.trim().length > 0,
    issue: "Description is required.",
  },
  {
    points: 5,
    check: (d) => d.description.trim().length >= 80,
    issue: "Description is too short — aim for 80+ characters to explain what this skill does.",
  },
  {
    points: 10,
    check: (d) => d.description.trim().length >= 150,
    issue: "Strengthen the description — 150+ characters lets it cover the what, who, and why.",
  },

  // ── Instructions (30 pts) ─────────────────────────────────────────────────
  {
    points: 5,
    check: (d) => d.instructions.trim().length > 0,
    issue: "Instructions are required.",
  },
  {
    points: 5,
    check: (d) => d.instructions.trim().length >= 100,
    issue: "Instructions are too brief — 100+ characters needed to describe real behavior.",
  },
  {
    points: 10,
    check: (d) =>
      hasNumberedSteps(d.instructions) || countBullets(d.instructions) >= 3,
    issue:
      "Instructions lack structure — use numbered steps (1. 2. 3.) or at least 3 bullet points.",
  },
  {
    points: 10,
    check: (d) => countSteps(d.instructions) >= 3,
    issue: "Instructions should have at least 3 distinct steps.",
  },

  // ── Triggers (25 pts) ─────────────────────────────────────────────────────
  {
    points: 5,
    check: (d) => parseTriggerList(d.triggers).length >= 1,
    issue: "At least one trigger phrase is required.",
  },
  {
    points: 5,
    check: (d) => parseTriggerList(d.triggers).length >= 3,
    issue: "Add at least 3 trigger phrases to improve skill discoverability.",
  },
  {
    points: 5,
    check: (d) => parseTriggerList(d.triggers).some((t) => t.split(" ").length >= 4),
    issue:
      "Triggers are too vague — at least one should be 4+ words (e.g. 'Prep me for my discovery call').",
  },
  {
    points: 5,
    check: (d) =>
      !parseTriggerList(d.triggers).every((t) => GENERIC_TRIGGER_RE.test(t)),
    issue:
      "All triggers are generic single-word phrases — specific triggers reduce false activations.",
  },
  {
    points: 5,
    check: (d) => parseTriggerList(d.triggers).some((t) => TRIGGER_VERB_RE.test(t)),
    issue:
      "Add at least one trigger that starts with an action verb (e.g. 'Run', 'Draft', 'Summarize').",
  },

  // ── Tags (10 pts) ─────────────────────────────────────────────────────────
  {
    points: 5,
    check: (d) => parseTagList(d.tags).length >= 1,
    issue: "At least one tag is required.",
  },
  {
    points: 5,
    check: (d) => parseTagList(d.tags).length >= 3,
    issue: "Add at least 3 tags to improve marketplace search and filtering.",
  },
];

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export function validateSkill(formData: SkillFormData): ValidationResult {
  let score = 0;
  const issues: string[] = [];

  for (const rule of RULES) {
    if (rule.check(formData)) {
      score += rule.points;
    } else {
      issues.push(rule.issue);
    }
  }

  return {
    isValid: score >= 60,
    score,
    issues,
  };
}
