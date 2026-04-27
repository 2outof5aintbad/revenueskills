import {
  buildEnhancementPrompt,
  parseEnhancementResponse,
  enhanceSkill,
  EnhancementError,
  type EnhancedSkill,
} from "../skillEnhancer";
import type { SkillFormData } from "../skillGenerator";

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const VALID_FORM: SkillFormData = {
  name: "Deal Coach",
  description: "Surfaces MEDDPICC gaps and suggests next steps.",
  category: "sales",
  tags: "MEDDPICC, pipeline",
  author: "@sales-ai",
  version: "1.0.0",
  purpose: "Help AEs identify qualification gaps before every deal review.",
  instructions: "Look at the deal and find gaps.",
  triggers: "help with my deal\ncheck my pipeline",
};

const VALID_RESPONSE: EnhancedSkill = {
  instructions: "1. Ask for opp name.\n2. Map to MEDDPICC.\n3. Flag gaps.",
  triggers: ["Run MEDDPICC on [Account]", "What's missing in my deal?"],
  tags: ["MEDDPICC", "discovery", "qualification"],
  reasoning: {
    instructions: "Added numbered steps and explicit output format.",
    triggers: "Rewritten to match natural mid-workflow phrasing.",
    tags: "Replaced generic nouns with methodology terms.",
  },
};

// ---------------------------------------------------------------------------
// buildEnhancementPrompt
// ---------------------------------------------------------------------------

describe("buildEnhancementPrompt", () => {
  it("returns an array with a single user message", () => {
    const messages = buildEnhancementPrompt(VALID_FORM);
    expect(messages).toHaveLength(1);
    expect(messages[0].role).toBe("user");
  });

  it("includes the skill name in the prompt", () => {
    const messages = buildEnhancementPrompt(VALID_FORM);
    expect(messages[0].content).toContain("Deal Coach");
  });

  it("includes the category in the prompt", () => {
    const messages = buildEnhancementPrompt(VALID_FORM);
    expect(messages[0].content).toContain("sales");
  });

  it("includes current instructions in the prompt", () => {
    const messages = buildEnhancementPrompt(VALID_FORM);
    expect(messages[0].content).toContain("Look at the deal and find gaps.");
  });

  it("includes current triggers in the prompt", () => {
    const messages = buildEnhancementPrompt(VALID_FORM);
    expect(messages[0].content).toContain("help with my deal");
  });

  it("handles array triggers without joining incorrectly", () => {
    const messages = buildEnhancementPrompt({
      ...VALID_FORM,
      triggers: ["trigger one", "trigger two"],
    });
    expect(messages[0].content).toContain("trigger one");
    expect(messages[0].content).toContain("trigger two");
  });

  it("handles array tags without joining incorrectly", () => {
    const messages = buildEnhancementPrompt({
      ...VALID_FORM,
      tags: ["ROI", "CFO"],
    });
    expect(messages[0].content).toContain("ROI");
    expect(messages[0].content).toContain("CFO");
  });

  it("requests JSON output in the prompt", () => {
    const messages = buildEnhancementPrompt(VALID_FORM);
    expect(messages[0].content).toContain("JSON");
  });
});

// ---------------------------------------------------------------------------
// parseEnhancementResponse
// ---------------------------------------------------------------------------

describe("parseEnhancementResponse", () => {
  it("parses a valid JSON string into EnhancedSkill", () => {
    const result = parseEnhancementResponse(JSON.stringify(VALID_RESPONSE));
    expect(result.instructions).toBe(VALID_RESPONSE.instructions);
    expect(result.triggers).toEqual(VALID_RESPONSE.triggers);
    expect(result.tags).toEqual(VALID_RESPONSE.tags);
    expect(result.reasoning.instructions).toBe(VALID_RESPONSE.reasoning.instructions);
  });

  it("strips markdown code fences before parsing", () => {
    const fenced = "```json\n" + JSON.stringify(VALID_RESPONSE) + "\n```";
    const result = parseEnhancementResponse(fenced);
    expect(result.instructions).toBe(VALID_RESPONSE.instructions);
  });

  it("strips plain code fences (no language tag) before parsing", () => {
    const fenced = "```\n" + JSON.stringify(VALID_RESPONSE) + "\n```";
    const result = parseEnhancementResponse(fenced);
    expect(result.instructions).toBe(VALID_RESPONSE.instructions);
  });

  it("throws EnhancementError on non-JSON input", () => {
    expect(() => parseEnhancementResponse("here is your answer in prose")).toThrow(
      EnhancementError
    );
  });

  it("throws EnhancementError when required keys are missing", () => {
    const partial = JSON.stringify({ instructions: "ok" });
    expect(() => parseEnhancementResponse(partial)).toThrow(EnhancementError);
  });

  it("throws EnhancementError when triggers is not an array", () => {
    const bad = JSON.stringify({ ...VALID_RESPONSE, triggers: "not an array" });
    expect(() => parseEnhancementResponse(bad)).toThrow(EnhancementError);
  });

  it("throws EnhancementError when tags is not an array", () => {
    const bad = JSON.stringify({ ...VALID_RESPONSE, tags: "not an array" });
    expect(() => parseEnhancementResponse(bad)).toThrow(EnhancementError);
  });

  it("throws EnhancementError when reasoning is missing", () => {
    const { reasoning: _, ...withoutReasoning } = VALID_RESPONSE;
    expect(() => parseEnhancementResponse(JSON.stringify(withoutReasoning))).toThrow(
      EnhancementError
    );
  });

  it("throws EnhancementError when a reasoning sub-key is missing", () => {
    const bad = JSON.stringify({
      ...VALID_RESPONSE,
      reasoning: { instructions: "ok" }, // missing triggers and tags
    });
    expect(() => parseEnhancementResponse(bad)).toThrow(EnhancementError);
  });
});

// ---------------------------------------------------------------------------
// enhanceSkill (stub integration)
// ---------------------------------------------------------------------------

describe("enhanceSkill", () => {
  it("returns an EnhancedSkill with all required keys", async () => {
    const result = await enhanceSkill(VALID_FORM);
    expect(typeof result.instructions).toBe("string");
    expect(Array.isArray(result.triggers)).toBe(true);
    expect(Array.isArray(result.tags)).toBe(true);
    expect(typeof result.reasoning).toBe("object");
  });

  it("returns non-empty instructions", async () => {
    const result = await enhanceSkill(VALID_FORM);
    expect(result.instructions.trim().length).toBeGreaterThan(0);
  });

  it("returns at least one trigger", async () => {
    const result = await enhanceSkill(VALID_FORM);
    expect(result.triggers.length).toBeGreaterThan(0);
  });

  it("returns at least one tag", async () => {
    const result = await enhanceSkill(VALID_FORM);
    expect(result.tags.length).toBeGreaterThan(0);
  });

  it("returns reasoning strings for all three fields", async () => {
    const result = await enhanceSkill(VALID_FORM);
    expect(typeof result.reasoning.instructions).toBe("string");
    expect(typeof result.reasoning.triggers).toBe("string");
    expect(typeof result.reasoning.tags).toBe("string");
  });

  it("uses category-appropriate stub output", async () => {
    const result = await enhanceSkill({ ...VALID_FORM, category: "customer-success" });
    const allText = result.tags.join(" ") + result.triggers.join(" ");
    // customer-success stub includes QBR and renewal terms
    expect(allText.toLowerCase()).toMatch(/qbr|renewal|customer/);
  });

  it("returns triggers as strings, not nested arrays", async () => {
    const result = await enhanceSkill(VALID_FORM);
    result.triggers.forEach((t) => expect(typeof t).toBe("string"));
  });

  it("returns tags as strings, not nested arrays", async () => {
    const result = await enhanceSkill(VALID_FORM);
    result.tags.forEach((t) => expect(typeof t).toBe("string"));
  });
});

// ---------------------------------------------------------------------------
// EnhancementError
// ---------------------------------------------------------------------------

describe("EnhancementError", () => {
  it("has the correct name", () => {
    const err = new EnhancementError("test");
    expect(err.name).toBe("EnhancementError");
  });

  it("is an instance of Error", () => {
    const err = new EnhancementError("test");
    expect(err).toBeInstanceOf(Error);
  });

  it("stores the cause", () => {
    const cause = new TypeError("original");
    const err = new EnhancementError("wrapper", cause);
    expect(err.cause).toBe(cause);
  });
});
