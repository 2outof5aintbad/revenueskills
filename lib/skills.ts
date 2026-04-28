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

  // ── SDR Skills ────────────────────────────────────────────────────────────

  {
    id: "prospecting-email-generator",
    name: "Prospecting Email Generator",
    slug: "prospecting-email-generator",
    description:
      "Turns a prospect's name, company, and a single pain point into a personalized cold outreach email. Uses a problem-insight-solution structure that gets replies. Writes at a 6th-grade reading level — punchy, direct, no fluff.",
    category: "writing",
    tags: ["prospecting", "cold email", "outreach", "SDR", "personalization"],
    author: "@sdr-toolkit",
    authorBio:
      "SDR team lead and outreach specialist. Ramped 40+ SDRs across SaaS companies ranging from Series A to enterprise. Obsessed with reply rates and pipeline creation.",
    installs: 7_841,
    rating: 4.7,
    featured: true,
    triggers: [
      "Write a cold email to the VP of Sales at Acme Corp",
      "Draft a prospecting email for a CFO at a manufacturing company",
      "Generate outreach for this prospect",
      "Write me a cold email about our product",
      "Personalize this outreach for my ICP",
    ],
    exampleOutput: `## Cold Email — VP of Sales, Acme Corp

**Subject:** Acme's Q2 pipeline gap

Hi Sarah,

Most VP Sales at companies your size tell me their biggest headache isn't quota — it's that reps spend 40% of their week on prep and admin instead of selling.

We cut that in half for teams at [Similar Company] in under 30 days.

Worth a 15-minute conversation to see if it's relevant for Acme?

[Your name]

---
*Tone: Direct, peer-level. No product pitch.*
*Reading level: Grade 6.*
*Word count: 58 words.*`,
    reviews: [
      {
        id: "r1",
        rating: 5,
        text: "My reply rate went from 4% to 11% in two weeks. The problem-insight-solution structure forces you to lead with value, not features. Every SDR on my team uses this daily.",
        author: "@ryan.mcallister",
        date: "2026-04-15T09:30:00Z",
      },
      {
        id: "r2",
        rating: 5,
        text: "I was skeptical but the emails it writes are genuinely better than mine. Short, relevant, no buzzwords. Booked 3 meetings in the first week.",
        author: "@keisha.brown",
        date: "2026-03-28T14:45:00Z",
      },
      {
        id: "r3",
        rating: 4,
        text: "Solid for initial outreach. Works best when you give it a specific pain point rather than a generic ICP description.",
        author: "@tom.wright",
        date: "2026-02-12T11:20:00Z",
      },
    ],
    versions: [
      {
        version: "2.0.0",
        changeSummary: "Rewrote prompt structure to enforce problem-insight-solution format. Added reading level targeting and word count guidance.",
        createdAt: "2026-03-15T00:00:00Z",
      },
      {
        version: "1.0.0",
        changeSummary: "Initial release.",
        createdAt: "2025-11-01T00:00:00Z",
      },
    ],
  },

  {
    id: "cold-call-script-builder",
    name: "Cold Call Script Builder",
    slug: "cold-call-script-builder",
    description:
      "Builds a personalized cold call script in under 60 seconds. Includes an attention-grabbing opener, a permission-based bridge, two qualifying questions, and a confident meeting ask. Handles the top 3 brush-offs inline so you never get caught flat-footed.",
    category: "sales",
    tags: ["cold calling", "SDR", "scripts", "prospecting", "phone"],
    author: "@sdr-toolkit",
    authorBio:
      "SDR team lead and outreach specialist. Ramped 40+ SDRs across SaaS companies ranging from Series A to enterprise. Obsessed with reply rates and pipeline creation.",
    installs: 5_109,
    rating: 4.6,
    featured: false,
    triggers: [
      "Build me a cold call script for a CFO in fintech",
      "Write a call script for my prospect at TechCo",
      "Create a cold call opener for this account",
      "Script a call for a VP Engineering at a Series B startup",
      "Give me a cold call for tomorrow's prospecting block",
    ],
    exampleOutput: `## Cold Call Script — CFO, Fintech / Series C

**Opener (0:00–0:10)**
"Hi [Name], this is [You] from [Company]. I know I'm catching you cold — I'll be quick."

**Bridge (0:10–0:25)**
"I work with finance leaders at companies like yours who are dealing with [specific pain]. We've helped them [specific outcome]. Would it be worth 15 minutes to see if it's relevant for [Company]?"

**Qualifying Questions**
1. "What does your current process look like for [pain area]?"
2. "Is that something your team is actively looking to solve, or more of a back-burner problem?"

**Meeting Ask**
"Based on what you've shared, I think there's something worth showing you. Are you open to a 20-minute call next week — Tuesday or Thursday work?"

---

**Brush-off Handlers**

*"Not interested"*
→ "Totally fair. Can I ask — is it the timing, or is [pain area] not a priority right now?"

*"Send me an email"*
→ "Happy to. I'll send something short — if it doesn't land in 48 hours, it's not relevant. Fair enough?"

*"We're all set"*
→ "Good to hear. Out of curiosity, what are you using today for [pain area]?"`,
    reviews: [
      {
        id: "r1",
        rating: 5,
        text: "The brush-off handlers alone are worth it. I used to freeze when someone said 'send me an email.' Now I have three good responses memorized. Connect rate up 30%.",
        author: "@alex.dumont",
        date: "2026-04-08T10:15:00Z",
      },
      {
        id: "r2",
        rating: 4,
        text: "Really solid structure. The permission-based bridge made my calls feel less pushy. Took a few reps to make it sound natural but worth the practice.",
        author: "@priya.mehta",
        date: "2026-03-01T16:00:00Z",
      },
      {
        id: "r3",
        rating: 5,
        text: "Our whole SDR team now uses this before power hours. Consistency is up, pipeline is up. Manager loves it.",
        author: "@david.nkosi",
        date: "2026-01-22T08:30:00Z",
      },
    ],
    versions: [
      {
        version: "1.3.0",
        changeSummary: "Added inline brush-off handlers for top 3 objections. Improved qualifying question quality for enterprise personas.",
        createdAt: "2026-02-10T00:00:00Z",
      },
      {
        version: "1.0.0",
        changeSummary: "Initial release.",
        createdAt: "2025-10-15T00:00:00Z",
      },
    ],
  },

  // ── AE Skills ─────────────────────────────────────────────────────────────

  {
    id: "champion-letter-generator",
    name: "Champion Letter Generator",
    slug: "champion-letter-generator",
    description:
      "Writes an internal selling document your champion can use to get buy-in from stakeholders you can't reach directly. Frames the business case in the language of each persona — financial for the CFO, operational for IT, strategic for the C-suite. Gives your champion the words to sell for you.",
    category: "writing",
    tags: ["champion", "internal selling", "stakeholder", "business case", "AE"],
    author: "@sales-ai",
    authorBio:
      "Enterprise sales coach and toolbuilder. 12 years in SaaS sales, 4 years building Claude skills for revenue teams. Focused on structured methodology — MEDDPICC, SPIN, Challenger.",
    installs: 3_892,
    rating: 4.8,
    featured: false,
    triggers: [
      "Write a champion letter for my contact at GlobalBank",
      "Help my champion sell this internally",
      "Draft an internal selling doc for this deal",
      "Create a business case my champion can forward",
      "Write a stakeholder brief for the CFO and CTO",
    ],
    exampleOutput: `## Internal Selling Brief — Platform Migration
*Prepared by: Marcus Webb, Director of RevOps*

**Why I'm recommending this**

After evaluating three vendors over 8 weeks, I'm recommending we move forward with [Vendor]. Here's why it matters for us specifically.

**The problem we're solving**

Our team spends 22 hours per week on manual reconciliation across four systems. That's $312K annually in fully-loaded labor cost — and it's the #1 reason our audit prep takes two weeks instead of two days.

**What this solves**

[Vendor]'s platform automates 80% of that reconciliation. Based on our pilot with two teams, we're on track to reduce prep time by 70% and eliminate two contractor renewals in Q3.

**For the CFO: The numbers**
- Year 1 investment: $310K (platform + implementation)
- Annual savings: $455K
- Payback: 7 months
- 3-year ROI: 301%

**For IT: The integration path**
Pre-built connectors for Salesforce, NetSuite, and Workday. Our team validated the security review — no custom dev required.

**Recommended next step**
30-minute exec review with David (CFO) and Lisa (VP Eng) week of May 5th.

I'm happy to walk through any of this — let me know your questions before the meeting.`,
    reviews: [
      {
        id: "r1",
        rating: 5,
        text: "I sent this to my champion before a deal that had stalled for 6 weeks. She forwarded it to the CFO with two sentences of her own. We had a call booked in 48 hours. This skill unstuck a $400K deal.",
        author: "@ben.larsson",
        date: "2026-04-18T13:00:00Z",
      },
      {
        id: "r2",
        rating: 5,
        text: "The persona-specific framing is the key insight. CFOs don't care what IT cares about and vice versa. This writes one doc that speaks to both without sounding like a vendor brochure.",
        author: "@claire.fontaine",
        date: "2026-03-11T09:45:00Z",
      },
      {
        id: "r3",
        rating: 4,
        text: "Very strong. Requires good input on the stakeholders involved — the more specific you are about each persona's priorities, the better the output.",
        author: "@james.okafor",
        date: "2026-02-05T15:30:00Z",
      },
    ],
    versions: [
      {
        version: "1.2.0",
        changeSummary: "Added persona-specific framing sections for CFO, CTO, and VP Operations. Output now includes a recommended next step.",
        createdAt: "2026-03-01T00:00:00Z",
      },
      {
        version: "1.0.0",
        changeSummary: "Initial release.",
        createdAt: "2025-12-10T00:00:00Z",
      },
    ],
  },

  {
    id: "competitive-battlecard-builder",
    name: "Competitive Battlecard Builder",
    slug: "competitive-battlecard-builder",
    description:
      "Generates a live competitive battlecard from a competitor's name and your positioning. Surfaces their known weaknesses, your strongest differentiation points, and exact language to use when they come up in a deal. Updated format based on win/loss pattern analysis.",
    category: "research",
    tags: ["competitive", "battlecard", "positioning", "win/loss", "displacement"],
    author: "@sales-ai",
    authorBio:
      "Enterprise sales coach and toolbuilder. 12 years in SaaS sales, 4 years building Claude skills for revenue teams. Focused on structured methodology — MEDDPICC, SPIN, Challenger.",
    installs: 4_560,
    rating: 4.5,
    featured: false,
    triggers: [
      "Build a battlecard against Competitor X",
      "How do I beat Vendor Y in a deal?",
      "Create a competitive card for this opportunity",
      "What do I say when they mention the incumbent?",
      "Run competitive prep for my deal against Salesforce",
    ],
    exampleOutput: `## Competitive Battlecard — Vendor X vs. [Your Company]

**When Vendor X comes up**
Don't attack. Ask: "What specifically is attractive about them for your situation?" Then listen for which dimension matters — price, features, relationships. Your response changes by dimension.

---

**Their strengths (acknowledge, don't hide)**
- Established brand and reference customers in mid-market
- Lower entry-level price point
- Existing integrations with legacy ERP systems

**Their weaknesses (only raise when relevant)**
- Implementation timelines average 14 weeks vs. our 3 weeks
- No native mobile app — known friction point for field teams
- Support SLA is 48hr vs. our 4hr — matters in regulated industries
- Customer retention rate: 78% (vs. our 94%) — source: G2, March 2026

---

**Your strongest differentiators by persona**

*CFO:* "We're typically 15–20% higher on license cost and 60% lower on total cost of ownership over 3 years. Here's why..." [use TCO model]

*VP Engineering:* "Implementation is 11 weeks faster on average. We have the Slack messages to prove it." [reference customer intro]

*Procurement:* "We offer a 90-day performance clause — if you don't hit the agreed KPIs, you can exit. Vendor X doesn't offer this."

---

**The displacement play**
Ask: "When did you last do a formal vendor review?" If 18+ months ago: "Markets shift fast. Would it be worth running a 2-week proof of concept to validate you're still getting the best outcome?"`,
    reviews: [
      {
        id: "r1",
        rating: 5,
        text: "Used this to prep my whole team for a competitive displacement quarter. Win rate against our top competitor went from 31% to 52% in 90 days. The persona-specific language is what makes it.",
        author: "@sophie.lambert",
        date: "2026-04-01T11:00:00Z",
      },
      {
        id: "r2",
        rating: 4,
        text: "Really useful frame for organizing what you already know about a competitor. The displacement play section alone is worth it.",
        author: "@derek.walsh",
        date: "2026-02-20T14:30:00Z",
      },
      {
        id: "r3",
        rating: 5,
        text: "My reps stopped winging competitive conversations. This gives them a structure. Consistency improved, confidence improved, win rate improved.",
        author: "@amy.chen",
        date: "2026-01-08T09:15:00Z",
      },
    ],
    versions: [
      {
        version: "2.1.0",
        changeSummary: "Added persona-specific differentiation language. Included displacement play framework for incumbent vendors.",
        createdAt: "2026-01-20T00:00:00Z",
      },
      {
        version: "1.0.0",
        changeSummary: "Initial release.",
        createdAt: "2025-09-05T00:00:00Z",
      },
    ],
  },

  // ── Data / Pipeline Skills ────────────────────────────────────────────────

  {
    id: "pipeline-health-check",
    name: "Pipeline Health Check",
    slug: "pipeline-health-check",
    description:
      "Scores your pipeline's health across five dimensions: coverage ratio, stage distribution, deal velocity, close date integrity, and champion strength. Surfaces the 3 most at-risk deals and the 3 most actionable opportunities — so you know exactly where to spend your week.",
    category: "data",
    tags: ["pipeline", "forecast", "health check", "deal velocity", "coverage"],
    author: "@revenue-ops",
    authorBio:
      "Revenue Operations leader with 10 years building forecasting and pipeline systems for high-growth SaaS companies. Believes clean pipeline data is a competitive advantage.",
    installs: 4_203,
    rating: 4.6,
    featured: false,
    triggers: [
      "Run a pipeline health check for Q2",
      "Score my current pipeline",
      "Where are the risks in my forecast?",
      "Which deals should I focus on this week?",
      "Analyze my pipeline for this quarter",
    ],
    exampleOutput: `## Pipeline Health Check — Q2 2026

**Overall Score: 67 / 100** ⚠️ Needs Attention

---

**Dimension Scores**
| Dimension | Score | Signal |
|---|---|---|
| Coverage Ratio | 3.2x | ✅ Above 3x target |
| Stage Distribution | 58% | ⚠️ Too much in early stages |
| Deal Velocity | 47 days avg | ⚠️ 18% slower than Q1 |
| Close Date Integrity | 61% | ❌ 39% of dates not updated in 14+ days |
| Champion Strength | 44% | ❌ Champion unconfirmed on majority of deals |

---

**3 Most At-Risk Deals**
1. **GlobalBank — $420K** — Close date unchanged for 23 days. Champion (Marcus Webb) hasn't responded in 10 days. Security review not scheduled. Risk: slips to Q3.
2. **RetailCo — $185K** — Stage 3 for 6 weeks. No next step on record. Economic Buyer never identified.
3. **TechStart — $95K** — Champion left the company. Deal effectively reset. Recommend requalifying or closing out.

---

**3 Most Actionable This Week**
1. **MedGroup — $310K** — Legal review complete. Procurement contact identified. Send final pricing this week to hit Q2.
2. **FinEdge — $220K** — Champion confirmed. Decision deadline is May 15. Need exec sponsor intro — request this week.
3. **BuildCo — $140K** — Strong champion, clear pain. Stalled on technical validation. Schedule SE call to unblock.`,
    reviews: [
      {
        id: "r1",
        rating: 5,
        text: "This replaced 45 minutes of Monday pipeline review prep. I paste in my Salesforce export and get a prioritized action list in 2 minutes. My manager loves the consistency.",
        author: "@frank.mills",
        date: "2026-03-25T08:00:00Z",
      },
      {
        id: "r2",
        rating: 4,
        text: "The champion strength dimension is the most valuable — it forces you to be honest about deals where you only have a single contact. Exposed three deals I thought were solid.",
        author: "@diana.ross",
        date: "2026-02-14T12:30:00Z",
      },
      {
        id: "r3",
        rating: 5,
        text: "Run this every Monday morning before my 1:1 with my manager. She's noticed the improvement in my pipeline hygiene. Attributed a $180K deal save to catching a stalled deal early.",
        author: "@michael.tan",
        date: "2026-01-30T10:00:00Z",
      },
    ],
    versions: [
      {
        version: "1.4.0",
        changeSummary: "Added champion strength dimension and close date integrity scoring. Output now includes weekly action priorities.",
        createdAt: "2026-02-28T00:00:00Z",
      },
      {
        version: "1.0.0",
        changeSummary: "Initial release.",
        createdAt: "2025-11-20T00:00:00Z",
      },
    ],
  },

  // ── Customer Success Skills ────────────────────────────────────────────────

  {
    id: "qbr-deck-outline",
    name: "QBR Deck Outline",
    slug: "qbr-deck-outline",
    description:
      "Builds a complete Quarterly Business Review slide structure from your account data. Covers value delivered, usage metrics, business outcomes, risks, and expansion opportunities. Gives you a professional, customer-ready narrative in minutes — not hours.",
    category: "customer-success",
    tags: ["QBR", "customer success", "deck", "retention", "business review"],
    author: "@cs-playbook",
    authorBio:
      "Customer Success leader who has run QBRs for accounts ranging from $50K to $8M ARR. Believes the best QBR is the one your customer brings their boss to.",
    installs: 3_671,
    rating: 4.7,
    featured: false,
    triggers: [
      "Build a QBR outline for GlobalBank",
      "Create a quarterly business review deck for my account",
      "Draft my QBR agenda for next week",
      "Help me prep for my Q2 business review",
      "Generate a QBR structure for a $500K account",
    ],
    exampleOutput: `## QBR Outline — GlobalBank // Q2 2026
*60-minute format. Presented by: [CSM Name]*

---

**Slide 1 — Welcome & Agenda** (2 min)
- Attendees, housekeeping, objectives for the session

**Slide 2 — Where We Started** (3 min)
- Original goals from onboarding: reduce manual reconciliation, cut audit prep time
- Baseline metrics documented at kickoff

**Slide 3 — What We Delivered** (10 min)
- Reconciliation time: down 76% (target was 70%) ✅
- Audit prep: down 68% (target was 70%) ⚠️ Close
- Active users: 47 of 50 provisioned ✅
- Support tickets: 3 in 90 days (industry avg: 12) ✅

**Slide 4 — Business Impact** (8 min)
- $312K in annualized labor savings
- 2 FTE contractor renewals avoided
- Audit completed in 3 days vs. 14 days historically

**Slide 5 — Usage Highlights** (5 min)
- Top 5 power users, adoption by team
- Feature utilization heatmap

**Slide 6 — Open Items & Risks** (5 min)
- CTO onboarding still pending — action item to resolve
- Q3 licensing renewal: decision needed by June 30

**Slide 7 — Q3 Roadmap** (10 min)
- New features relevant to GlobalBank use case
- Recommended expansion: Finance team (12 additional seats)

**Slide 8 — Mutual Success Plan** (10 min)
- Goals for Q3, owners, success metrics
- Next touchpoints

**Slide 9 — Open Discussion** (7 min)

---
*Prep checklist: Pull usage data from dashboard. Confirm attendees 48hr before. Send pre-read 24hr before.*`,
    reviews: [
      {
        id: "r1",
        rating: 5,
        text: "Cut my QBR prep from 3 hours to 40 minutes. The structure it generates is better than what I was doing manually — my customers consistently comment on how organized the session feels.",
        author: "@sara.hutchins",
        date: "2026-04-10T14:00:00Z",
      },
      {
        id: "r2",
        rating: 5,
        text: "The 'Where We Started' vs 'What We Delivered' framing is simple but brilliant. It anchors the whole conversation in their original goals rather than your product features.",
        author: "@omar.ali",
        date: "2026-03-03T10:30:00Z",
      },
      {
        id: "r3",
        rating: 4,
        text: "Very solid. The prep checklist at the end is a nice touch — I've missed sending pre-reads before and it always shows. This keeps me honest.",
        author: "@jessica.park",
        date: "2026-01-25T09:00:00Z",
      },
    ],
    versions: [
      {
        version: "1.3.0",
        changeSummary: "Added mutual success plan slide and prep checklist. Improved business impact framing to lead with customer outcomes.",
        createdAt: "2026-02-05T00:00:00Z",
      },
      {
        version: "1.0.0",
        changeSummary: "Initial release.",
        createdAt: "2025-10-20T00:00:00Z",
      },
    ],
  },

  {
    id: "renewal-risk-scorer",
    name: "Renewal Risk Scorer",
    slug: "renewal-risk-scorer",
    description:
      "Scores renewal risk across six health signals: product adoption, stakeholder engagement, support history, business outcome achievement, executive sponsor status, and competitive exposure. Returns a risk tier (Green / Yellow / Red) with specific intervention plays for each.",
    category: "customer-success",
    tags: ["renewal", "churn", "health score", "customer success", "retention"],
    author: "@cs-playbook",
    authorBio:
      "Customer Success leader who has run QBRs for accounts ranging from $50K to $8M ARR. Believes the best QBR is the one your customer brings their boss to.",
    installs: 2_988,
    rating: 4.6,
    featured: false,
    triggers: [
      "Score renewal risk for GlobalBank",
      "Is this account at risk of churning?",
      "Run a health check on this customer",
      "What's the renewal risk for my Q3 book?",
      "Flag at-risk accounts in my portfolio",
    ],
    exampleOutput: `## Renewal Risk Score — RetailCo // Renewal: Aug 31

**Risk Tier: YELLOW** ⚠️
**Score: 58 / 100** — Intervention required within 30 days

---

**Signal Breakdown**
| Signal | Score | Detail |
|---|---|---|
| Product Adoption | 70 | 34/50 seats active. Finance team still not onboarded. |
| Stakeholder Engagement | 45 | Primary contact changed 6 weeks ago. New contact unresponsive. |
| Support History | 80 | 2 tickets in 90 days, both resolved same day. |
| Outcome Achievement | 60 | Reconciliation target hit. Audit prep target missed by 8%. |
| Executive Sponsor | 30 | VP Operations (original sponsor) left company. No replacement identified. |
| Competitive Exposure | 55 | Competitor X presented to IT team last month. Source: LinkedIn. |

---

**Recommended Interventions**

🔴 **This week**
- Identify new executive sponsor before renewal conversation
- Request intro to replacement VP Operations via your champion

🟡 **This month**
- Run Finance team onboarding session to close adoption gap
- Schedule outcome review call to address missed audit target — show revised roadmap

🟢 **Before renewal**
- Conduct competitive comparison review if asked
- Prepare renewal business case anchored in ROI delivered, not features

**Renewal confidence: Moderate.** Deal is winnable with focused effort. Key risk is sponsor gap.`,
    reviews: [
      {
        id: "r1",
        rating: 5,
        text: "Found two accounts I thought were solid that were actually Yellow. One had a key stakeholder change I'd missed. Caught both before the 90-day renewal window. This pays for itself.",
        author: "@laura.jensen",
        date: "2026-04-05T11:15:00Z",
      },
      {
        id: "r2",
        rating: 4,
        text: "The intervention plays by risk tier are actionable. Most health score tools just show you a number — this tells you what to do about it.",
        author: "@carlos.vega",
        date: "2026-02-28T13:45:00Z",
      },
      {
        id: "r3",
        rating: 5,
        text: "I run this on every account 120 days before renewal now. Saved a $240K account last quarter that was flagged Yellow — sponsor had left and I didn't know.",
        author: "@michelle.wong",
        date: "2026-01-14T08:45:00Z",
      },
    ],
    versions: [
      {
        version: "1.2.0",
        changeSummary: "Added competitive exposure signal and per-tier intervention playbooks. Improved executive sponsor health signal weighting.",
        createdAt: "2026-01-15T00:00:00Z",
      },
      {
        version: "1.0.0",
        changeSummary: "Initial release.",
        createdAt: "2025-09-30T00:00:00Z",
      },
    ],
  },

  {
    id: "territory-planning-assistant",
    name: "Territory Planning Assistant",
    slug: "territory-planning-assistant",
    description:
      "Builds a structured territory plan from your account list. Segments accounts by tier, surfaces the highest-potential whitespace, recommends a coverage strategy, and outputs a 90-day action plan with prioritized outreach targets. Built for AEs and managers who need to show their work at QBP.",
    category: "data",
    tags: ["territory", "planning", "account segmentation", "QBP", "coverage"],
    author: "@revenue-ops",
    authorBio:
      "Revenue Operations leader with 10 years building forecasting and pipeline systems for high-growth SaaS companies. Believes clean pipeline data is a competitive advantage.",
    installs: 2_340,
    rating: 4.5,
    featured: false,
    triggers: [
      "Build my territory plan for Q3",
      "Segment my account list by potential",
      "Help me prep for my QBP presentation",
      "Which accounts should I prioritize this quarter?",
      "Create a 90-day territory plan",
    ],
    exampleOutput: `## Territory Plan — [Rep Name] // Q3 2026

**Territory Summary**
- Total accounts: 84
- Current pipeline: $1.2M
- Quota: $480K
- Coverage ratio: 2.5x (target: 3x — gap to close)

---

**Account Segmentation**

**Tier 1 — Priority Accounts (12 accounts)**
High ICP fit + buying signals detected. Require weekly activity.
Top targets: MedGroup ($310K est.), FinEdge ($220K est.), BuildCo ($140K est.)

**Tier 2 — Development Accounts (28 accounts)**
Strong ICP fit, no active engagement. Require 2x/month outreach.
Focus: Convert 4 to active opportunities by Aug 31.

**Tier 3 — Monitor Accounts (44 accounts)**
Weak ICP fit or small ACV potential. Assign to sequences only.

---

**Whitespace Opportunities**
- 6 Tier 1 accounts with no logged activity in 60+ days
- 3 existing customers with documented expansion potential (CS flagged)
- 2 competitive install accounts — Vendor X contract renewals in Sept

---

**90-Day Action Plan**

*Month 1 (July):* Activate all Tier 1 accounts. Run Pipeline Health Check. Identify 3 expansion candidates with CS.
*Month 2 (August):* Convert 4 Tier 2 accounts to Stage 1. Progress Tier 1 to Stage 3+.
*Month 3 (September):* Close 3 Tier 1 deals. Lock Q4 pipeline from Tier 2 conversions.

**Forecast confidence: Moderate.** Coverage gap requires immediate Tier 2 activation.`,
    reviews: [
      {
        id: "r1",
        rating: 5,
        text: "Used this to build my QBP deck in 2 hours instead of a full day. My manager said it was the most structured territory plan she'd seen from our team. Nailed the presentation.",
        author: "@paul.harris",
        date: "2026-03-20T09:30:00Z",
      },
      {
        id: "r2",
        rating: 4,
        text: "The whitespace section is genuinely useful. Made me realize I had 6 Tier 1 accounts with no activity. Fixed that in the first week and booked 2 meetings.",
        author: "@nina.brooks",
        date: "2026-02-10T11:00:00Z",
      },
      {
        id: "r3",
        rating: 5,
        text: "Every AE should run this at the start of each quarter. The account tiering alone forces you to be strategic rather than just working your inbox.",
        author: "@raj.patel",
        date: "2026-01-05T14:00:00Z",
      },
    ],
    versions: [
      {
        version: "1.1.0",
        changeSummary: "Added whitespace analysis section and competitive install identification. Improved 90-day action plan structure.",
        createdAt: "2026-01-10T00:00:00Z",
      },
      {
        version: "1.0.0",
        changeSummary: "Initial release.",
        createdAt: "2025-11-15T00:00:00Z",
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
