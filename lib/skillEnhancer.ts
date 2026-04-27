import type { SkillCategory } from "@/types/skill";
import type { SkillFormData } from "./skillGenerator";

// ---------------------------------------------------------------------------
// Return type
// ---------------------------------------------------------------------------

export interface EnhancedSkill {
  instructions: string;
  triggers: string[];
  tags: string[];
  /** Model's brief rationale for each change — useful for UI diff display */
  reasoning: {
    instructions: string;
    triggers: string;
    tags: string;
  };
}

// ---------------------------------------------------------------------------
// Typed error
// ---------------------------------------------------------------------------

export class EnhancementError extends Error {
  constructor(
    message: string,
    public readonly cause?: unknown
  ) {
    super(message);
    this.name = "EnhancementError";
  }
}

// ---------------------------------------------------------------------------
// Prompt construction (pure — no I/O)
// ---------------------------------------------------------------------------

/**
 * Returns the messages array to send to the Claude Messages API.
 * Keeping this pure makes it independently testable and easy to inspect.
 */
export function buildEnhancementPrompt(
  data: SkillFormData
): Array<{ role: "user" | "assistant"; content: string }> {
  const triggerList = Array.isArray(data.triggers)
    ? data.triggers.join("\n")
    : data.triggers;

  const tagList = Array.isArray(data.tags)
    ? data.tags.join(", ")
    : data.tags;

  const system = `You are an expert Claude skill designer. \
Your job is to improve draft skill definitions so they are clear, \
specific, and immediately usable by practitioners. \
You understand enterprise sales workflows, B2B SaaS, and how people \
actually talk to Claude in a work context.

Always return valid JSON. Never include markdown fences or prose outside the JSON object.`;

  const user = `Improve the following Claude skill definition.

## Skill Details
Name: ${data.name}
Category: ${data.category}
Description: ${data.description}

## Current Instructions
${data.instructions}

## Current Trigger Phrases
${triggerList}

## Current Tags
${tagList}

## Your Task
Return a JSON object with exactly these keys:

{
  "instructions": "<improved multi-step instructions string>",
  "triggers": ["<phrase 1>", "<phrase 2>", "<phrase 3>", "<phrase 4>", "<phrase 5>"],
  "tags": ["<tag 1>", "<tag 2>", "<tag 3>", "<tag 4>", "<tag 5>"],
  "reasoning": {
    "instructions": "<one sentence: what you changed and why>",
    "triggers": "<one sentence: what you changed and why>",
    "tags": "<one sentence: what you changed and why>"
  }
}

## Improvement Criteria

Instructions:
- Use numbered steps
- Each step must be a concrete action, not a vague directive
- Call out what input to request from the user before proceeding
- Specify the exact output format Claude should produce
- Remove filler phrases ("make sure to", "try to", "feel free to")

Trigger Phrases:
- Write as a real user would type them mid-workflow
- Mix imperative commands ("Run MEDDPICC on...") with natural questions ("What's missing in my...?")
- At least one trigger should include a named entity placeholder (e.g. "Prep me for my call with [Account]")
- Remove generic phrases that could trigger unrelated skills

Tags:
- 5 tags maximum
- Prefer specific methodology terms over generic nouns
- At least one tag should match a searchable industry term
- No duplicates, no plurals that duplicate singulars`;

  return [
    { role: "user", content: `${system}\n\n${user}` },
  ];
}

// ---------------------------------------------------------------------------
// Response parsing
// ---------------------------------------------------------------------------

function isEnhancedSkillShape(value: unknown): value is EnhancedSkill {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;

  return (
    typeof v.instructions === "string" &&
    Array.isArray(v.triggers) &&
    (v.triggers as unknown[]).every((t) => typeof t === "string") &&
    Array.isArray(v.tags) &&
    (v.tags as unknown[]).every((t) => typeof t === "string") &&
    typeof v.reasoning === "object" &&
    v.reasoning !== null &&
    typeof (v.reasoning as Record<string, unknown>).instructions === "string" &&
    typeof (v.reasoning as Record<string, unknown>).triggers === "string" &&
    typeof (v.reasoning as Record<string, unknown>).tags === "string"
  );
}

export function parseEnhancementResponse(raw: string): EnhancedSkill {
  let parsed: unknown;
  try {
    // Strip markdown code fences if the model adds them despite instructions
    const cleaned = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
    parsed = JSON.parse(cleaned);
  } catch (err) {
    throw new EnhancementError("Claude returned non-JSON output.", err);
  }

  if (!isEnhancedSkillShape(parsed)) {
    throw new EnhancementError(
      "Claude response was valid JSON but did not match the expected shape. " +
        "Expected: { instructions, triggers[], tags[], reasoning: { instructions, triggers, tags } }"
    );
  }

  return parsed;
}

// ---------------------------------------------------------------------------
// Transport layer (stub — swap this for real fetch on integration day)
// ---------------------------------------------------------------------------

/**
 * Replace this function body with a real fetch to the Claude Messages API.
 *
 * Production implementation:
 *
 *   const response = await fetch("https://api.anthropic.com/v1/messages", {
 *     method: "POST",
 *     headers: {
 *       "x-api-key": process.env.ANTHROPIC_API_KEY!,
 *       "anthropic-version": "2023-06-01",
 *       "content-type": "application/json",
 *     },
 *     body: JSON.stringify({
 *       model: "claude-opus-4-7",
 *       max_tokens: 1024,
 *       messages,
 *     }),
 *   });
 *   const data = await response.json();
 *   return data.content[0].text;
 */
async function callClaude(
  messages: Array<{ role: "user" | "assistant"; content: string }>,
  _category: SkillCategory
): Promise<string> {
  // Simulate network latency so the UI loading state is exercised
  await new Promise((resolve) => setTimeout(resolve, 800));
  return buildStubResponse(messages, _category);
}

// ---------------------------------------------------------------------------
// Stub response builder
// ---------------------------------------------------------------------------

const STUB_DATA: Record<
  SkillCategory,
  { instructions: string; triggers: string[]; tags: string[] }
> = {
  sales: {
    instructions: `1. Ask the user to provide the opportunity name, current stage, and any notes from recent interactions.
2. Map each piece of provided information to the relevant MEDDPICC dimension.
3. For each dimension, assign a status: Validated, Partial, or Missing.
4. For every Partial or Missing dimension, generate exactly one targeted probing question.
5. Output a structured gap analysis with the following sections:
   - Dimension Status Table (dimension | status | evidence)
   - Probing Questions (one per gap, framed for the next discovery call)
   - Recommended Next Action (single most important next step)`,
    triggers: [
      "Run MEDDPICC on my [Account] opportunity",
      "What are the gaps in my deal with [Company]?",
      "Prep me for my discovery call tomorrow",
      "Score my qualification for this deal",
      "Where am I weakest before the deal review?",
    ],
    tags: ["MEDDPICC", "discovery", "qualification", "enterprise", "pipeline"],
  },
  research: {
    instructions: `1. Ask the user to specify the company name, competitor name, or research topic.
2. Confirm the output scope: executive summary, deep analysis, or comparison table.
3. Structure findings into: Overview, Key Differentiators, Strengths, Weaknesses, Recent Signals.
4. Flag any findings that are time-sensitive or require human verification.
5. End with a one-paragraph synthesis and a recommended action.`,
    triggers: [
      "Research [Company] before my meeting",
      "What do I need to know about [Competitor]?",
      "Summarize the competitive landscape for [Category]",
      "Give me a market overview for [Industry]",
      "What are the recent signals from [Account]?",
    ],
    tags: ["competitive-intel", "market-research", "account-research", "win-loss", "battlecard"],
  },
  productivity: {
    instructions: `1. Ask the user to paste their raw input (call notes, transcript, or meeting summary).
2. Identify all commitments, action items, and open questions from the input.
3. Assign each action item an owner (self, prospect, or third party) and a due date if mentioned.
4. Draft a follow-up email with: context line, what was covered, commitments with owners, next step.
5. Append a separate internal CRM notes block — not for sending, for logging.`,
    triggers: [
      "Write my follow-up from today's call with [Name]",
      "Turn these notes into a follow-up email",
      "Draft a recap from my meeting transcript",
      "Summarize action items from this call",
      "Send a follow-up for my [Account] meeting",
    ],
    tags: ["follow-up", "call-notes", "next-steps", "email-automation", "crm"],
  },
  writing: {
    instructions: `1. Ask the user for the document type, target audience, and any existing draft or key points.
2. Confirm the desired tone: formal, conversational, or persuasive.
3. Generate a structured draft with clear headings and a logical flow.
4. Highlight sections that need personalisation or data the user should verify.
5. Offer three alternative phrasings for the opening and closing lines.`,
    triggers: [
      "Write a [Document Type] for [Audience]",
      "Draft a proposal for [Account]",
      "Help me write an executive summary",
      "Turn these bullet points into a business narrative",
      "Rewrite this section to be more persuasive",
    ],
    tags: ["proposal", "executive-writing", "business-narrative", "outreach", "content"],
  },
  data: {
    instructions: `1. Ask the user to describe the dataset, metric, or report they are working with.
2. Clarify the decision the data should inform.
3. Identify the most important 3–5 signals in the data and explain each in plain language.
4. Flag anomalies, gaps, or trends that warrant attention before drawing conclusions.
5. Output a structured analysis: Key Signals, Anomalies, Recommended Interpretation, Suggested Next Step.`,
    triggers: [
      "Analyze this dataset and tell me what matters",
      "What are the key signals in this report?",
      "Summarize the trends in [Metric] this quarter",
      "Help me interpret these numbers before my review",
      "What story does this data tell?",
    ],
    tags: ["data-analysis", "reporting", "business-intelligence", "metrics", "trend-analysis"],
  },
  "customer-success": {
    instructions: `1. Ask the user for the customer name, current health score, contract renewal date, and any recent interactions.
2. Identify the top 2–3 risks to renewal based on the provided context.
3. Surface any expansion opportunities visible in the account data.
4. Generate a QBR agenda or renewal conversation outline tailored to the customer's stage.
5. End with a recommended next action and owner.`,
    triggers: [
      "Prep me for my QBR with [Account]",
      "What are the renewal risks for [Customer]?",
      "Summarize [Account]'s health before our check-in",
      "Help me build a success plan for [Customer]",
      "What should I prioritize for my at-risk accounts?",
    ],
    tags: ["qbr", "renewal", "health-scoring", "expansion", "customer-success"],
  },
};

function buildStubResponse(
  messages: Array<{ role: string; content: string }>,
  category: SkillCategory
): string {
  const stub = STUB_DATA[category] ?? STUB_DATA["sales"];

  // Extract the skill name from the prompt for contextual reasoning
  const prompt = messages[0]?.content ?? "";
  const nameMatch = prompt.match(/Name:\s*(.+)/);
  const skillName = nameMatch?.[1]?.trim() ?? "this skill";

  const result: EnhancedSkill = {
    instructions: stub.instructions,
    triggers: stub.triggers,
    tags: stub.tags,
    reasoning: {
      instructions: `Replaced vague directives with numbered concrete steps, added explicit input-gathering step, and specified the exact output format Claude should produce for "${skillName}".`,
      triggers: `Rewritten to match how practitioners actually type mid-workflow: mix of imperatives, questions, and named-entity placeholders. Removed generic phrases that risk false positives.`,
      tags: `Replaced generic nouns with specific methodology terms and industry-searchable keywords. Capped at 5 to avoid dilution.`,
    },
  };

  return JSON.stringify(result, null, 2);
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Sends the skill form data to Claude for enhancement.
 *
 * Returns improved instructions, triggers, and tags along with
 * Claude's reasoning for each change.
 *
 * Throws `EnhancementError` on API failure or unexpected response shape.
 */
export async function enhanceSkill(formData: SkillFormData): Promise<EnhancedSkill> {
  const messages = buildEnhancementPrompt(formData);

  let raw: string;
  try {
    raw = await callClaude(messages, formData.category);
  } catch (err) {
    if (err instanceof EnhancementError) throw err;
    throw new EnhancementError("Failed to reach Claude API.", err);
  }

  return parseEnhancementResponse(raw);
}
