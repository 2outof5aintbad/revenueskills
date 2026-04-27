import { validateSkill } from "../skillValidator";
import type { SkillFormData } from "../skillGenerator";

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const PERFECT: SkillFormData = {
  name: "MEDDPICC Discovery Prep",
  description:
    "Analyzes your opportunity data and generates a pre-call discovery plan mapped to every MEDDPICC dimension. Surfaces gaps, suggests probing questions, and flags unvalidated criteria before you walk into the room.",
  category: "sales",
  tags: "MEDDPICC, discovery, qualification, pipeline, enterprise",
  author: "@sales-ai",
  version: "1.0.0",
  purpose: "Help AEs identify qualification gaps before every enterprise deal review.",
  instructions:
    "1. Ask the user to paste opportunity notes or CRM data.\n" +
    "2. Map each piece of information to a MEDDPICC dimension.\n" +
    "3. Assign each dimension a status: Validated, Partial, or Missing.\n" +
    "4. For every Partial or Missing dimension, generate one targeted probing question.\n" +
    "5. Output a structured gap analysis with a recommended next action.",
  triggers:
    "Run MEDDPICC on my Acme opportunity\n" +
    "What are the qualification gaps in this deal?\n" +
    "Prep me for my discovery call tomorrow\n" +
    "Score my pipeline before the deal review\n" +
    "Where am I weakest in this opportunity?",
};

const EMPTY: SkillFormData = {
  name: "",
  description: "",
  category: "sales",
  tags: "",
  author: "",
  purpose: "",
  instructions: "",
  triggers: "",
};

// ---------------------------------------------------------------------------
// Score boundaries
// ---------------------------------------------------------------------------

describe("validateSkill — score boundaries", () => {
  it("returns 100 for a fully complete, well-formed skill", () => {
    const result = validateSkill(PERFECT);
    expect(result.score).toBe(100);
  });

  it("returns 0 for a completely empty submission", () => {
    const result = validateSkill(EMPTY);
    expect(result.score).toBe(0);
  });

  it("score is always between 0 and 100", () => {
    const result = validateSkill(PERFECT);
    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(100);
  });
});

// ---------------------------------------------------------------------------
// isValid threshold
// ---------------------------------------------------------------------------

describe("validateSkill — isValid", () => {
  it("is true when score is exactly 60", () => {
    // Build a data set that hits exactly 60: satisfy name (15) + desc(20) + instructions(20) + tag(5)
    const data: SkillFormData = {
      ...EMPTY,
      name: "Deal Coach Skill",
      description:
        "Surfaces MEDDPICC gaps and suggests next steps for your enterprise opportunity before each call.",
      tags: "MEDDPICC, pipeline, enterprise",
      instructions:
        "1. Ask the user to paste notes.\n2. Map to MEDDPICC.\n3. Flag gaps.\n4. Suggest questions.\n5. Output summary.",
      triggers: "help",
    };
    const result = validateSkill(data);
    expect(result.isValid).toBe(result.score >= 60);
  });

  it("is true for the perfect fixture", () => {
    expect(validateSkill(PERFECT).isValid).toBe(true);
  });

  it("is false for the empty fixture", () => {
    expect(validateSkill(EMPTY).isValid).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// issues array
// ---------------------------------------------------------------------------

describe("validateSkill — issues array", () => {
  it("returns no issues for a perfect skill", () => {
    expect(validateSkill(PERFECT).issues).toHaveLength(0);
  });

  it("returns issues for every failing rule", () => {
    const result = validateSkill(EMPTY);
    expect(result.issues.length).toBeGreaterThan(0);
  });

  it("issues are all non-empty strings", () => {
    const result = validateSkill(EMPTY);
    result.issues.forEach((issue) => {
      expect(typeof issue).toBe("string");
      expect(issue.trim().length).toBeGreaterThan(0);
    });
  });
});

// ---------------------------------------------------------------------------
// Name rules
// ---------------------------------------------------------------------------

describe("validateSkill — name", () => {
  it("penalises an empty name", () => {
    const a = validateSkill(PERFECT).score;
    const b = validateSkill({ ...PERFECT, name: "" }).score;
    expect(b).toBeLessThan(a);
  });

  it("penalises a name shorter than 8 characters", () => {
    const result = validateSkill({ ...PERFECT, name: "Coach" });
    expect(result.issues.some((i) => i.includes("too short"))).toBe(true);
  });

  it("penalises a generic name starting with 'tool'", () => {
    const result = validateSkill({ ...PERFECT, name: "Tool for Sales" });
    expect(result.issues.some((i) => i.includes("too generic"))).toBe(true);
  });

  it("penalises a name starting with 'my '", () => {
    const result = validateSkill({ ...PERFECT, name: "my sales helper" });
    expect(result.issues.some((i) => i.includes("too generic"))).toBe(true);
  });

  it("accepts a specific, outcome-oriented name", () => {
    const result = validateSkill({ ...PERFECT, name: "Pipeline Gap Detector" });
    expect(result.issues.some((i) => i.toLowerCase().includes("name"))).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// Description rules
// ---------------------------------------------------------------------------

describe("validateSkill — description", () => {
  it("penalises a description under 80 chars", () => {
    const result = validateSkill({ ...PERFECT, description: "Short desc." });
    expect(result.issues.some((i) => i.includes("too short"))).toBe(true);
  });

  it("penalises a description between 80–149 chars", () => {
    const mid = "A".repeat(100);
    const result = validateSkill({ ...PERFECT, description: mid });
    expect(result.issues.some((i) => i.includes("150+"))).toBe(true);
  });

  it("awards full description points at 150+ chars", () => {
    const long = "A".repeat(160);
    const resultLong = validateSkill({ ...PERFECT, description: long });
    const resultShort = validateSkill({ ...PERFECT, description: "Short." });
    expect(resultLong.score).toBeGreaterThan(resultShort.score);
  });
});

// ---------------------------------------------------------------------------
// Instructions rules
// ---------------------------------------------------------------------------

describe("validateSkill — instructions", () => {
  it("penalises instructions under 100 chars", () => {
    const result = validateSkill({ ...PERFECT, instructions: "Do the thing." });
    expect(result.issues.some((i) => i.includes("too brief"))).toBe(true);
  });

  it("penalises unstructured prose with no steps", () => {
    const prose = "Analyze the deal and find any gaps that exist, then tell the user what to do next in a helpful way.";
    const result = validateSkill({ ...PERFECT, instructions: prose });
    expect(result.issues.some((i) => i.includes("structure"))).toBe(true);
  });

  it("accepts numbered step format", () => {
    const result = validateSkill(PERFECT);
    expect(result.issues.some((i) => i.includes("numbered") || i.includes("steps"))).toBe(false);
  });

  it("accepts 3+ bullet points as an alternative to numbered steps", () => {
    const bulleted =
      "- Ask the user for input.\n- Map to dimensions.\n- Flag gaps.\n- Suggest questions.\n- Output results.";
    const result = validateSkill({ ...PERFECT, instructions: bulleted });
    expect(result.issues.some((i) => i.includes("structure"))).toBe(false);
  });

  it("penalises fewer than 3 steps even with structure marker", () => {
    const twoSteps = "1. Ask for input.\n2. Return output.";
    const result = validateSkill({ ...PERFECT, instructions: twoSteps });
    expect(result.issues.some((i) => i.includes("3 distinct steps"))).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Trigger rules
// ---------------------------------------------------------------------------

describe("validateSkill — triggers", () => {
  it("penalises no triggers", () => {
    const result = validateSkill({ ...PERFECT, triggers: [] });
    expect(result.issues.some((i) => i.includes("trigger"))).toBe(true);
  });

  it("penalises fewer than 3 triggers", () => {
    const result = validateSkill({ ...PERFECT, triggers: ["Run MEDDPICC on my deal", "Score this opportunity"] });
    expect(result.issues.some((i) => i.includes("3 trigger"))).toBe(true);
  });

  it("penalises all single-word triggers as too vague", () => {
    const result = validateSkill({ ...PERFECT, triggers: ["run", "prep", "build"] });
    expect(result.issues.some((i) => i.includes("4+ words"))).toBe(true);
  });

  it("penalises triggers that all match the generic word list", () => {
    const result = validateSkill({ ...PERFECT, triggers: "help\ndo\nrun" });
    expect(result.issues.some((i) => i.includes("generic"))).toBe(true);
  });

  it("penalises triggers with no action verb", () => {
    const result = validateSkill({
      ...PERFECT,
      triggers: "my deal review notes\nthe pipeline gaps today\nwhat is in this opportunity",
    });
    expect(result.issues.some((i) => i.includes("action verb"))).toBe(true);
  });

  it("accepts triggers passed as an array", () => {
    const result = validateSkill({
      ...PERFECT,
      triggers: [
        "Run MEDDPICC on my Acme deal",
        "What gaps exist in this opportunity?",
        "Prep me for my discovery call",
      ],
    });
    expect(result.issues.some((i) => i.includes("trigger"))).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// Tags rules
// ---------------------------------------------------------------------------

describe("validateSkill — tags", () => {
  it("penalises zero tags", () => {
    const result = validateSkill({ ...PERFECT, tags: "" });
    expect(result.issues.some((i) => i.includes("tag"))).toBe(true);
  });

  it("penalises fewer than 3 tags", () => {
    const result = validateSkill({ ...PERFECT, tags: "MEDDPICC, sales" });
    expect(result.issues.some((i) => i.includes("3 tags"))).toBe(true);
  });

  it("accepts tags as a pre-parsed array", () => {
    const result = validateSkill({
      ...PERFECT,
      tags: ["MEDDPICC", "discovery", "qualification"],
    });
    expect(result.issues.some((i) => i.includes("tag"))).toBe(false);
  });
});
