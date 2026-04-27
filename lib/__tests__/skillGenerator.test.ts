import {
  generateSkillMarkdown,
  validateSkillFormData,
  slugify,
  type SkillFormData,
} from "../skillGenerator";

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const VALID: SkillFormData = {
  name: "Deal Coach",
  description: "Surfaces MEDDPICC gaps and suggests next steps.",
  category: "sales",
  tags: "MEDDPICC, pipeline, enterprise",
  author: "@sales-ai",
  version: "1.0.0",
  purpose:
    "Help enterprise AEs identify qualification gaps before every deal review.",
  instructions:
    "1. Ask the user to paste their opportunity notes.\n2. Map each piece of information to a MEDDPICC dimension.\n3. Flag Missing or Partial dimensions.\n4. Suggest one probing question per gap.",
  triggers: "Run MEDDPICC on this deal\nPrep me for my deal review\nWhat's missing in my qualification?",
};

// ---------------------------------------------------------------------------
// slugify
// ---------------------------------------------------------------------------

describe("slugify", () => {
  it("lowercases and hyphenates", () => {
    expect(slugify("Deal Coach")).toBe("deal-coach");
  });

  it("strips special characters", () => {
    expect(slugify("ROI & Business Case Builder!")).toBe("roi-business-case-builder");
  });

  it("collapses multiple spaces and hyphens", () => {
    expect(slugify("Account  Prep   Brief")).toBe("account-prep-brief");
  });

  it("trims leading and trailing hyphens", () => {
    expect(slugify("  --Call Follow-Up-- ")).toBe("call-follow-up");
  });
});

// ---------------------------------------------------------------------------
// validateSkillFormData
// ---------------------------------------------------------------------------

describe("validateSkillFormData", () => {
  it("passes a fully valid payload", () => {
    expect(validateSkillFormData(VALID)).toHaveLength(0);
  });

  it("catches empty required fields", () => {
    const errors = validateSkillFormData({
      ...VALID,
      name: "",
      description: "",
      purpose: "",
      instructions: "",
    });
    const fields = errors.map((e) => e.field);
    expect(fields).toContain("name");
    expect(fields).toContain("description");
    expect(fields).toContain("purpose");
    expect(fields).toContain("instructions");
  });

  it("catches an invalid category", () => {
    const errors = validateSkillFormData({
      ...VALID,
      category: "magic" as SkillFormData["category"],
    });
    expect(errors.some((e) => e.field === "category")).toBe(true);
  });

  it("catches a malformed version", () => {
    const errors = validateSkillFormData({ ...VALID, version: "v1.0" });
    expect(errors.some((e) => e.field === "version")).toBe(true);
  });

  it("accepts a missing version (optional)", () => {
    const errors = validateSkillFormData({ ...VALID, version: undefined });
    expect(errors.some((e) => e.field === "version")).toBe(false);
  });

  it("catches empty tags", () => {
    const errors = validateSkillFormData({ ...VALID, tags: "  ,  , " });
    expect(errors.some((e) => e.field === "tags")).toBe(true);
  });

  it("catches empty triggers", () => {
    const errors = validateSkillFormData({ ...VALID, triggers: [] });
    expect(errors.some((e) => e.field === "triggers")).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// generateSkillMarkdown — structure
// ---------------------------------------------------------------------------

describe("generateSkillMarkdown — structure", () => {
  let output: string;

  beforeEach(() => {
    output = generateSkillMarkdown(VALID);
  });

  it("opens and closes with YAML front matter delimiters", () => {
    const lines = output.split("\n");
    expect(lines[0]).toBe("---");
    const secondDelim = lines.indexOf("---", 1);
    expect(secondDelim).toBeGreaterThan(0);
  });

  it("includes all required YAML keys", () => {
    expect(output).toMatch(/^name: /m);
    expect(output).toMatch(/^description: /m);
    expect(output).toMatch(/^metadata:/m);
    expect(output).toMatch(/^  author: /m);
    expect(output).toMatch(/^  version: /m);
    expect(output).toMatch(/^  category: /m);
    expect(output).toMatch(/^  tags: /m);
  });

  it("contains all required markdown sections", () => {
    expect(output).toContain("## Purpose");
    expect(output).toContain("## Instructions");
    expect(output).toContain("## Trigger Phrases");
  });

  it("renders triggers as unordered list items", () => {
    expect(output).toContain("* Run MEDDPICC on this deal");
    expect(output).toContain("* Prep me for my deal review");
    expect(output).toContain("* What's missing in my qualification?");
  });
});

// ---------------------------------------------------------------------------
// generateSkillMarkdown — slug
// ---------------------------------------------------------------------------

describe("generateSkillMarkdown — slug", () => {
  it("converts name to kebab-case for the name field", () => {
    const out = generateSkillMarkdown(VALID);
    expect(out).toContain("name: deal-coach");
  });
});

// ---------------------------------------------------------------------------
// generateSkillMarkdown — author normalisation
// ---------------------------------------------------------------------------

describe("generateSkillMarkdown — author", () => {
  it("preserves existing @ prefix", () => {
    const out = generateSkillMarkdown(VALID);
    expect(out).toContain('author: "@sales-ai"');
  });

  it("adds @ prefix when missing", () => {
    const out = generateSkillMarkdown({ ...VALID, author: "sales-ai" });
    expect(out).toContain('author: "@sales-ai"');
  });
});

// ---------------------------------------------------------------------------
// generateSkillMarkdown — version fallback
// ---------------------------------------------------------------------------

describe("generateSkillMarkdown — version", () => {
  it("uses provided semver", () => {
    const out = generateSkillMarkdown({ ...VALID, version: "2.3.1" });
    expect(out).toContain('version: "2.3.1"');
  });

  it("falls back to 1.0.0 when version is omitted", () => {
    const out = generateSkillMarkdown({ ...VALID, version: undefined });
    expect(out).toContain('version: "1.0.0"');
  });
});

// ---------------------------------------------------------------------------
// generateSkillMarkdown — tags
// ---------------------------------------------------------------------------

describe("generateSkillMarkdown — tags", () => {
  it("renders tags as YAML flow sequence", () => {
    const out = generateSkillMarkdown(VALID);
    expect(out).toContain("tags: [MEDDPICC, pipeline, enterprise]");
  });

  it("deduplicates tags", () => {
    const out = generateSkillMarkdown({ ...VALID, tags: "sales, sales, pipeline" });
    expect(out).toContain("tags: [sales, pipeline]");
  });

  it("accepts tags as a pre-parsed array", () => {
    const out = generateSkillMarkdown({ ...VALID, tags: ["ROI", "CFO"] });
    expect(out).toContain("tags: [ROI, CFO]");
  });

  it("quotes tags that contain YAML-unsafe characters", () => {
    const out = generateSkillMarkdown({ ...VALID, tags: ["data: driven", "pipeline"] });
    expect(out).toContain('"data: driven"');
  });
});

// ---------------------------------------------------------------------------
// generateSkillMarkdown — whitespace hygiene
// ---------------------------------------------------------------------------

describe("generateSkillMarkdown — whitespace", () => {
  it("has no trailing spaces on any line", () => {
    const out = generateSkillMarkdown(VALID);
    const violations = out
      .split("\n")
      .filter((line) => / +$/.test(line));
    expect(violations).toHaveLength(0);
  });

  it("does not end with more than one blank line", () => {
    const out = generateSkillMarkdown(VALID);
    expect(out).not.toMatch(/\n{3,}$/);
  });

  it("does not have 3+ consecutive blank lines anywhere", () => {
    const out = generateSkillMarkdown(VALID);
    expect(out).not.toMatch(/\n{3,}/);
  });
});

// ---------------------------------------------------------------------------
// generateSkillMarkdown — validation guard
// ---------------------------------------------------------------------------

describe("generateSkillMarkdown — validation guard", () => {
  it("throws when required fields are missing", () => {
    expect(() =>
      generateSkillMarkdown({ ...VALID, name: "", purpose: "" })
    ).toThrow("validation failed");
  });

  it("includes the failing field name in the error message", () => {
    expect(() =>
      generateSkillMarkdown({ ...VALID, name: "" })
    ).toThrow("name");
  });
});
