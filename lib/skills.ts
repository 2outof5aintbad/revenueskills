import type { Skill, SkillCategory } from "@/types/skill";

export const CATEGORY_LABELS: Record<SkillCategory, string> = {
  sales: "Sales",
  research: "Research",
  productivity: "Productivity",
  writing: "Writing",
  data: "Data & Analytics",
  "customer-success": "Customer Success",
};

export const SKILLS: Skill[] = [
  {
    id: "meddpicc-discovery-prep",
    name: "MEDDPICC Discovery Prep",
    slug: "meddpicc-discovery-prep",
    description:
      "Analyzes your opportunity data and generates a pre-call discovery plan mapped to every MEDDPICC dimension. Surfaces gaps, suggests probing questions, and flags which criteria are unvalidated before you walk into the room.",
    category: "sales",
    tags: ["MEDDPICC", "discovery", "qualification", "pipeline", "enterprise"],
    author: "@sales-ai",
    authorBio:
      "Enterprise sales coach and toolbuilder. 12 years in SaaS sales, 4 years building Claude skills for revenue teams. Focused on structured methodology — MEDDPICC, SPIN, Challenger.",
    installs: 6_204,
    rating: 4.8,
    featured: true,
    triggers: [
      "Prep me for my discovery call with Acme Corp",
      "Run MEDDPICC on this opportunity",
      "What's missing in my deal for TechCo?",
      "Score my qualification for this opp",
      "Where are the gaps in my pipeline for Q2?",
    ],
    exampleOutput: `## MEDDPICC Gap Analysis — Acme Corp // Q2 Close

**Metrics** ✅ Validated
Target: 40% reduction in manual reporting hours (~$180K annual savings).
Risk: CFO has not yet signed off on the savings figure. Recommend confirming in next call.

**Economic Buyer** ⚠️ Partial
Identified: Sarah Chen, CFO. No direct contact yet — all communication through IT sponsor.
Next step: Request intro via champion. Draft intro email included below.

**Decision Criteria** ❌ Missing
No formal scorecard on file. Competitor likely setting criteria in parallel.
Suggested question: "What does a successful vendor evaluation look like for your team?"

**Decision Process** ⚠️ Partial
3-stage process: Technical, Security, Legal. Security review not yet scheduled.
Risk: 6–8 week security queue could push close past Q2.

**Paper Process** ❌ Missing
No visibility into procurement or legal timeline.
Suggested question: "Who owns the contract process on your side, and what's the typical timeline?"

**Identify Pain** ✅ Validated
Primary: Manual reconciliation across 4 systems consuming 3 FTEs monthly.
Secondary: Audit prep taking 2 weeks per cycle.

**Champion** ⚠️ Partial
Marcus Webb (Director of RevOps) is engaged but has not yet publicly advocated.
Champion test: Has Marcus agreed to arrange the CFO intro? Status: Pending.

**Competition** ⚠️ Partial
Shortlist includes Vendor X. Win/loss notes suggest Vendor X wins on price when champion is weak.
Suggested action: Strengthen champion before pricing conversation.

---
**Overall Qualification Score: 5 / 8 dimensions validated**
Recommended next step: CFO intro + security review scheduling before advancing stage.`,
    reviews: [
      {
        id: "r1",
        rating: 5,
        text: "Changed how I prep for every enterprise call. I paste in my Salesforce notes and get a structured gap analysis in 30 seconds. Closed my last two deals faster because I stopped missing the Economic Buyer early.",
        author: "@jenna.torres",
        date: "2026-03-18T10:22:00Z",
      },
      {
        id: "r2",
        rating: 5,
        text: "The probing question output alone is worth it. Saves me 45 minutes of prep per deal and the questions are sharper than what I'd write myself.",
        author: "@daniel.osei",
        date: "2026-02-27T14:05:00Z",
      },
      {
        id: "r3",
        rating: 4,
        text: "Solid for mid-market and enterprise. Less useful for transactional deals where MEDDPICC is overkill. Would love a lighter mode.",
        author: "@priya.nair",
        date: "2026-01-15T09:44:00Z",
      },
    ],
    versions: [
      {
        version: "2.1.0",
        changeSummary:
          "Added Champion validation questions and Decision Criteria scoring rubric. Improved output structure for easier copy-paste into Salesforce.",
        createdAt: "2026-03-01T00:00:00Z",
      },
      {
        version: "2.0.0",
        changeSummary:
          "Full rewrite. Structured output with per-dimension status (Validated / Partial / Missing). Removed freeform narrative in favor of scannable sections.",
        createdAt: "2025-11-12T00:00:00Z",
      },
      {
        version: "1.0.0",
        changeSummary: "Initial release.",
        createdAt: "2025-08-03T00:00:00Z",
      },
    ],
  },

  {
    id: "account-prep-brief",
    name: "Account Prep Brief",
    slug: "account-prep-brief",
    description:
      "Generates a tight, one-page executive brief before any customer meeting. Pulls from account history, recent news, known stakeholders, and open opportunities to surface what matters — so you walk in informed and credible.",
    category: "sales",
    tags: ["account prep", "executive", "briefing", "stakeholders", "meeting prep"],
    author: "@marketplace-user",
    authorBio:
      "Principal SE at a Fortune 500 SaaS company. Builds tools that make sellers and SEs look sharper in front of customers. Obsessed with the pre-meeting ritual.",
    installs: 4_871,
    rating: 4.7,
    featured: true,
    triggers: [
      "Brief me on GlobalBank before my EBC Thursday",
      "Prep a one-pager for my Coca-Cola meeting",
      "Summarize what I need to know about this account before tomorrow",
      "Run account prep for RetailCo — meeting at 2pm",
      "What do I need to know before walking into this exec meeting?",
    ],
    exampleOutput: `## Account Brief — GlobalBank // EBC Thursday 9am

**Meeting Context**
EBC with CFO (David Harrington) and VP Engineering (Lisa Park). Objective: advance platform expansion discussion from pilot to enterprise agreement.

**What's Changed Since Last Meeting**
- Q1 earnings call (Apr 3): CFO cited "cost of infrastructure complexity" as top 3 operational risk. Direct alignment to our pitch.
- New CTO announced Feb 28. Background: previously at AWS, known for consolidation plays.
- Pilot expanded from 2 to 4 teams internally without our involvement — strong signal.

**Stakeholders**
| Name | Title | Priority | Watch |
|---|---|---|---|
| David Harrington | CFO | Cost reduction, audit readiness | Skeptical of vendor lock-in |
| Lisa Park | VP Engineering | Developer velocity | Wants to see migration path |
| Tom Reyes | Dir. Procurement | Contract terms | Will push for 2-year max |

**Open Opportunities**
- Enterprise Expansion: $420K ACV, Stage 4, Close: Q2. Risk: security review pending.
- Pro Services: $85K, verbal commitment, SOW not yet sent.

**Risk Flags**
⚠️ Competitor X presented to Lisa Park two weeks ago. Source: LinkedIn activity.
⚠️ No contact with new CTO yet. High priority before enterprise conversation.

**Recommended Opening**
Lead with the Q1 earnings language on infrastructure complexity — let the CFO hear his own words back before you present anything.

**Suggested Talking Order**
1. Acknowledge Q1 context (2 min)
2. Pilot results recap — let customer present (5 min)
3. Platform expansion proposal (10 min)
4. Commercial path + next steps (5 min)`,
    reviews: [
      {
        id: "r1",
        rating: 5,
        text: "I run this before every QBR and exec visit. The brief it produces is genuinely better than what I used to put together manually in an hour. My SE called it 'unfairly good.'",
        author: "@marcus.webb",
        date: "2026-04-02T11:30:00Z",
      },
      {
        id: "r2",
        rating: 5,
        text: "Used it before a cold intro with a new CIO. She commented that I clearly understood her business. I had met her 10 minutes earlier. This skill is the reason.",
        author: "@tara.simmons",
        date: "2026-03-14T16:20:00Z",
      },
      {
        id: "r3",
        rating: 4,
        text: "Great output but requires well-structured input. If your notes are a mess, the brief reflects that. Worth cleaning up your input before running.",
        author: "@kevin.flores",
        date: "2026-02-09T08:55:00Z",
      },
    ],
    versions: [
      {
        version: "1.3.0",
        changeSummary:
          "Added 'Risk Flags' section to surface open issues or escalations that could derail the meeting. Output now includes a recommended talking order.",
        createdAt: "2026-02-14T00:00:00Z",
      },
      {
        version: "1.2.0",
        changeSummary:
          "Stakeholder section now includes inferred priorities and communication preferences based on title and past interaction history.",
        createdAt: "2025-12-01T00:00:00Z",
      },
      {
        version: "1.0.0",
        changeSummary: "Initial release.",
        createdAt: "2025-09-22T00:00:00Z",
      },
    ],
  },

  {
    id: "objection-reframe-engine",
    name: "Objection Reframe Engine",
    slug: "objection-reframe-engine",
    description:
      "Takes any sales objection — price, timing, incumbent vendor, internal priority — and returns three reframe approaches: a logic-based response, an emotion-based response, and a question to redirect control back to you. Built on pattern analysis from thousands of won and lost deals.",
    category: "sales",
    tags: ["objection handling", "reframe", "negotiation", "closing", "competitive"],
    author: "@sales-ai",
    authorBio:
      "Enterprise sales coach and toolbuilder. 12 years in SaaS sales, 4 years building Claude skills for revenue teams. Focused on structured methodology — MEDDPICC, SPIN, Challenger.",
    installs: 5_330,
    rating: 4.6,
    featured: false,
    triggers: [
      "Help me handle this objection: 'Your price is too high'",
      "They said they're happy with their current vendor — how do I respond?",
      "Reframe this objection for me",
      "They pushed back on timing, what do I say?",
      "The champion went dark — how do I re-engage?",
    ],
    exampleOutput: `## Objection Reframe — "Your price is 40% higher than the alternative"

**The Objection**
"We've reviewed both proposals. Your price is 40% higher and we need to justify that internally."

---

**Approach 1 — Logic (Total Cost of Ownership)**
"Understood — and that's exactly the right question to ask. When our customers compare fully-loaded costs — migration, training, ongoing support, and the time your team spends managing edge cases — the 12-month delta typically closes to under 10%. Can I walk you through the TCO model we built with a similar customer in your space?"

*Use when:* Economic Buyer or procurement is in the room. Buyer responds to data.

---

**Approach 2 — Emotion (Risk of the Cheaper Option)**
"I appreciate you being direct with me. The customers who went the other direction often come back 18 months later after a painful migration. I'd hate for you to be in that position. What matters most to you in terms of a stable, long-term partnership?"

*Use when:* Buyer has been burned before or shows risk-aversion. Use sparingly.

---

**Approach 3 — Redirect Question**
"That's fair. Help me understand — is this a budget constraint, or is it more about justifying the delta to a stakeholder internally? The answer changes how I can help."

*Use when:* You need to understand whether this is a real objection or a negotiating position. Almost always the right first move.

---

**Recommended sequence:** Start with Approach 3 to diagnose, then use 1 or 2 based on the answer.`,
    reviews: [
      {
        id: "r1",
        rating: 5,
        text: "The three-angle format is genius. I pick whichever fits the buyer's personality. Got out of a 'we're happy with our current vendor' objection last week using the question approach — it completely changed the conversation.",
        author: "@ashley.kim",
        date: "2026-03-29T13:15:00Z",
      },
      {
        id: "r2",
        rating: 4,
        text: "Very strong on price and timing objections. The incumbent vendor responses can feel a little generic. Would love the ability to feed in competitor-specific context.",
        author: "@james.okonkwo",
        date: "2026-02-18T10:40:00Z",
      },
      {
        id: "r3",
        rating: 5,
        text: "Used this to prep my whole team before a competitive displacement deal. We role-played every response. Won the deal against a 3-year incumbent. Correlation, not causation — but still.",
        author: "@rachel.chen",
        date: "2026-01-31T09:00:00Z",
      },
    ],
    versions: [
      {
        version: "3.0.0",
        changeSummary:
          "Introduced the three-angle output format (logic / emotion / redirect question). Previous single-response format deprecated.",
        createdAt: "2026-01-07T00:00:00Z",
      },
      {
        version: "2.1.0",
        changeSummary:
          "Expanded objection taxonomy to 40 categories. Improved handling of 'not a priority right now' and 'our CEO won't approve it' objections.",
        createdAt: "2025-10-15T00:00:00Z",
      },
      {
        version: "1.0.0",
        changeSummary: "Initial release.",
        createdAt: "2025-07-11T00:00:00Z",
      },
    ],
  },

  {
    id: "call-followup-generator",
    name: "Call Follow-Up Generator",
    slug: "call-followup-generator",
    description:
      "Converts raw call notes or a transcript into a polished follow-up email in under 60 seconds. Captures commitments, next steps, and open questions. Tone-matches to the relationship stage — introductory, mid-cycle, or late-stage close.",
    category: "productivity",
    tags: ["follow-up", "email", "call notes", "next steps", "automation"],
    author: "@workflow-tools",
    authorBio:
      "Operations and productivity toolbuilder. Specializes in turning messy human output — call notes, meeting transcripts, Slack threads — into clean, structured documents that people actually send.",
    installs: 8_913,
    rating: 4.9,
    featured: true,
    triggers: [
      "Write my follow-up from today's call",
      "Turn these call notes into a follow-up email",
      "Summarize the call and draft next steps",
      "Here's my transcript — send a follow-up",
      "Draft a recap email from my meeting notes",
    ],
    exampleOutput: `## Follow-Up Email Draft

**To:** Lisa Park, VP Engineering — GlobalBank
**Subject:** Following up — platform expansion next steps

Hi Lisa,

Great conversation today. A few things I want to make sure we have on record:

**What we covered**
- Pilot results: 4 teams now live, avg onboarding time down from 3 weeks to 6 days
- Discussed path from pilot to enterprise agreement targeting Q2 close
- Flagged security review as the critical path item

**Commitments made**
- You: Intro to David Harrington (CFO) by EOW
- Me: Send enterprise pricing proposal by Thursday COB
- Me: Connect our security team with yours for the formal review — scheduling this today

**Open questions**
- Does the new CTO need to be involved in the enterprise decision?
- Is there a preferred contract structure (annual vs multi-year)?

**Next step:** Let's aim for a follow-up call with you and David the week of May 5th. I'll send a calendar invite for three time options by tomorrow.

Thanks again — this one's moving fast and I'm glad we're aligned.

[Your name]

---
*Internal CRM note (do not send):*
Champion engagement: Strong. Lisa referenced Q2 close without prompting.
Risk: CTO relationship is blank. Prioritize before enterprise proposal goes out.
Stage advancement: Ready to move to Stage 4 pending CFO intro confirmation.`,
    reviews: [
      {
        id: "r1",
        rating: 5,
        text: "This is my most-used skill by a mile. I send a follow-up within 5 minutes of every call now. Before this, it was end of day at best. My response rate from prospects went up noticeably.",
        author: "@nina.patel",
        date: "2026-04-10T17:45:00Z",
      },
      {
        id: "r2",
        rating: 5,
        text: "The tone-matching is real. It genuinely writes differently for an intro call vs. a final negotiation. I almost never edit the output before sending.",
        author: "@will.barnett",
        date: "2026-03-22T12:00:00Z",
      },
      {
        id: "r3",
        rating: 5,
        text: "I paste messy Zoom transcripts in and get clean, professional emails out. Tested it with a 90-minute transcript and it correctly extracted 7 action items with owners and dates.",
        author: "@sofia.ruiz",
        date: "2026-02-05T08:30:00Z",
      },
    ],
    versions: [
      {
        version: "2.2.0",
        changeSummary:
          "Added tone detection for relationship stage (introductory / mid-cycle / late-stage). Output now includes a separate 'Internal CRM Notes' block.",
        createdAt: "2026-03-10T00:00:00Z",
      },
      {
        version: "2.0.0",
        changeSummary:
          "Rewrote prompt to handle messy transcript input without hallucinating commitments. Added confidence markers on extracted action items.",
        createdAt: "2025-12-18T00:00:00Z",
      },
      {
        version: "1.0.0",
        changeSummary: "Initial release.",
        createdAt: "2025-08-29T00:00:00Z",
      },
    ],
  },

  {
    id: "roi-business-case-builder",
    name: "ROI Business Case Builder",
    slug: "roi-business-case-builder",
    description:
      "Builds a structured, defensible business case from your opportunity data. Takes inputs on current-state costs, projected efficiency gains, and risk reduction to produce a CFO-ready ROI model with payback period, 3-year NPV, and sensitivity analysis narrative.",
    category: "sales",
    tags: ["ROI", "business case", "CFO", "value selling", "financial justification"],
    author: "@value-selling",
    authorBio:
      "Value engineer and sales consultant. Has built business cases for deals ranging from $80K to $18M. Believes the CFO is always the real Economic Buyer and builds accordingly.",
    installs: 3_455,
    rating: 4.7,
    featured: false,
    triggers: [
      "Build a business case for this deal",
      "Create an ROI model for the Acme opportunity",
      "Help me justify the cost internally for this customer",
      "Draft a CFO-ready ROI summary",
      "What's the payback period on this investment?",
    ],
    exampleOutput: `## ROI Business Case — RetailCo Platform Migration

**Executive Summary**
Migrating to the proposed platform eliminates an estimated $640K in annual operational cost while reducing audit prep time by 70%. Payback period: 7 months. 3-year NPV at 10% discount rate: $1.24M.

---

**Current State Costs (Annual)**
| Cost Driver | FTEs | Hours/Month | Fully-Loaded Cost |
|---|---|---|---|
| Manual reconciliation | 3.0 | 240 | $312,000 |
| Audit preparation | 1.5 | 80 | $156,000 |
| Integration maintenance | 1.0 | 60 | $104,000 |
| Incident response (avg) | — | — | $68,000 |
| **Total** | | | **$640,000** |

**Projected Post-Implementation Savings**
- Manual reconciliation: −80% ($249,600 saved)
- Audit prep: −70% ($109,200 saved)
- Integration maintenance: −60% ($62,400 saved)
- Incident reduction: −50% ($34,000 saved)
- **Total annual savings: $455,200**

**Investment**
- Year 1 (platform + implementation): $310,000
- Year 2–3 (annual license): $180,000/yr

**Returns**
- Payback period: 7.3 months
- 3-year cumulative savings: $1,365,600
- 3-year NPV (10%): $1,242,000
- 3-year ROI: 301%

---

**Sensitivity Analysis**
If savings are 30% lower than projected: payback extends to 10.4 months, 3-year ROI = 187%. Still positive.
If implementation runs 20% over budget: payback extends to 8.8 months. NPV remains above $1M.

**Assumptions Table** available in full model. Key assumption: FTE fully-loaded cost of $130K/yr.`,
    reviews: [
      {
        id: "r1",
        rating: 5,
        text: "Finally a business case tool that doesn't produce fantasy numbers. I gave it conservative inputs and it gave me a conservative output — which made it infinitely more credible with the CFO than the typical vendor ROI calculator.",
        author: "@brendan.hayes",
        date: "2026-04-05T14:00:00Z",
      },
      {
        id: "r2",
        rating: 4,
        text: "The output structure is excellent. The sensitivity section in particular is something I've never seen in a skill before — it helped me anticipate the CFO's pushback before the meeting.",
        author: "@lisa.tran",
        date: "2026-03-01T09:20:00Z",
      },
      {
        id: "r3",
        rating: 5,
        text: "Used this to build the business case for a $2.4M deal. The customer's VP of Finance said it was the most credible vendor-provided ROI model she'd seen. We won. Enough said.",
        author: "@carlos.mendez",
        date: "2026-01-19T16:50:00Z",
      },
    ],
    versions: [
      {
        version: "1.4.0",
        changeSummary:
          "Added sensitivity analysis narrative and payback period calculation. Output now includes an assumptions table for full transparency.",
        createdAt: "2026-02-20T00:00:00Z",
      },
      {
        version: "1.2.0",
        changeSummary:
          "Introduced 3-year NPV calculation. Added support for risk-reduction value inputs alongside efficiency gains.",
        createdAt: "2025-11-30T00:00:00Z",
      },
      {
        version: "1.0.0",
        changeSummary: "Initial release.",
        createdAt: "2025-10-01T00:00:00Z",
      },
    ],
  },
];

export const FEATURED_SKILLS = SKILLS.filter((s) => s.featured);

export const TRENDING_SKILLS = [...SKILLS]
  .sort((a, b) => b.installs - a.installs)
  .slice(0, 3);

export const TOP_RATED_SKILLS = [...SKILLS]
  .sort((a, b) => b.rating - a.rating || b.reviews.length - a.reviews.length)
  .slice(0, 3);

export const RECENTLY_UPDATED_SKILLS = [...SKILLS]
  .sort((a, b) => {
    const aDate = a.versions[0]?.createdAt ?? "";
    const bDate = b.versions[0]?.createdAt ?? "";
    return bDate.localeCompare(aDate);
  })
  .slice(0, 3);
