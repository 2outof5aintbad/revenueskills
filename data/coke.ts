export const COKE = {
  company: "The Coca-Cola Company",

  hero: {
    eyebrow: "Executive Briefing",
    headline: "The Agentic\nEnterprise",
    subheadline:
      "Three acts. One transformation. How Coca-Cola can close the gap between the platform investments you've made and the intelligent, autonomous operation they could power.",
    ctaPrimary: { label: "Begin the Story", href: "/coke/act-1-gaps" },
    ctaSecondary: { label: "View All Acts", href: "#acts" },
  },

  platformInvestments: [
    { product: "Sales Cloud",     aov: "$4.2M",  category: "CRM",           highlight: false },
    { product: "Service Cloud",   aov: "$3.8M",  category: "Service",       highlight: false },
    { product: "Marketing Cloud", aov: "$2.9M",  category: "Marketing",     highlight: false },
    { product: "Data Cloud",      aov: "$1.6M",  category: "Data",          highlight: false },
    { product: "Tableau",         aov: "$890K",  category: "Analytics",     highlight: false },
    { product: "MuleSoft",        aov: "$1.2M",  category: "Integration",   highlight: false },
    { product: "Agentforce",      aov: "$2.1M",  category: "AI Platform",   highlight: false },
    { product: "Slack",           aov: "$0",     category: "Collaboration", highlight: true  },
  ],

  gap: {
    headline: "Your people are the integration layer.",
    subhead: "And it's costing you.",
    body: "You've invested in world-class platforms. But when systems don't communicate automatically, people become the connective tissue — manually moving data between tools that were never designed to talk to each other. That's not a technology failure. It's a design gap with a measurable cost.",
    stats: [
      { value: "47%",    label: "of work time lost to manual coordination" },
      { value: "6–8",    label: "systems a field rep navigates per incident" },
      { value: "4.5 hrs", label: "average time to resolve a consumer complaint" },
    ],
  },

  acts: [
    {
      number: "01",
      href: "/coke/act-1-gaps",
      title: "The Gaps Are Costing You",
      tagline: "Fragmentation is your biggest operational risk.",
      description:
        "Every day, your people spend hours moving information between systems that don't speak to each other. They are the integration layer — and it's not sustainable.",
    },
    {
      number: "02",
      href: "/coke/act-2-work-os",
      title: "The Work OS",
      tagline: "One surface. Every system. Real time.",
      description:
        "Slack becomes the operating layer where your data, people, and AI converge — turning fragmented alerts into coordinated action before problems escalate.",
    },
    {
      number: "03",
      href: "/coke/act-3-agentic-enterprise",
      title: "The Agentic Enterprise",
      tagline: "AI that doesn't just assist — it acts.",
      description:
        "End-to-end agentic flows that take a consumer complaint from detection to resolution to organizational learning — without manual hand-offs.",
    },
  ],

  act1: {
    meta: { title: "Act 1: The Gaps Are Costing You · The Agentic Enterprise" },
    hero: {
      eyebrow: "Act 01",
      headline: "The Gaps Are\nCosting You",
      subheadline:
        "Fragmentation isn't a technology problem. It's a people problem — and it's running invisibly inside your organization right now.",
    },
    narrative: [
      {
        title: "A Platform Portfolio Without a Brain",
        body: "Coca-Cola has invested significantly in Salesforce. Sales Cloud captures opportunities. Service Cloud manages cases. Data Cloud unifies records. Tableau surfaces analytics. Each system does its job well. But when a consumer files a complaint, or a field rep needs to respond to an out-of-stock condition, none of these systems communicate automatically. A person does it — manually, inconsistently, and at the cost of their most valuable time.",
      },
      {
        title: "The Hidden Operating Model",
        body: "Right now, there is an informal operating model inside your organization. It runs on Slack messages, forwarded emails, hallway conversations, and calendar invites. It works — barely — because your people are talented and motivated. But it doesn't scale. It burns out your best operators. And it leaves institutional knowledge stranded in someone's inbox.",
      },
    ],
    scenario: {
      eyebrow: "The Cost, Made Visible",
      title: "A Day Without Integration",
      subtitle: "One consumer complaint. Six manual steps. 4.5 hours.",
      steps: [
        {
          time: "8:14 AM",
          actor: "Consumer",
          action: "Files a product quality complaint through the consumer care line.",
          system: "Service Cloud — Case Created",
          friction: null,
        },
        {
          time: "8:31 AM",
          actor: "Service Rep",
          action: "Sees the case. Needs production batch information. Navigates to a separate QA portal — different login, different interface.",
          system: "QA System (separate login)",
          friction: "Manual context switch — no data follows them across systems.",
        },
        {
          time: "9:02 AM",
          actor: "Service Rep",
          action: "Can't locate the batch records. Sends a Slack message to a field contact asking for the batch number.",
          system: "Slack",
          friction: "Now waiting. The SLA clock is running.",
        },
        {
          time: "10:45 AM",
          actor: "Field Contact",
          action: "Responds with the batch number. Rep manually copies it back into the Service Cloud case record.",
          system: "Service Cloud (manual update)",
          friction: "96-minute delay for one data point. Two people's time consumed.",
        },
        {
          time: "11:20 AM",
          actor: "Service Rep",
          action: "Drafts a consumer response. Has to locate approved brand language in a SharePoint folder.",
          system: "SharePoint (third system)",
          friction: "Third context switch. Another login. More time lost.",
        },
        {
          time: "12:45 PM",
          actor: "Service Rep",
          action: "Case closed. No pattern flagged. No learning captured. Tomorrow: start over.",
          system: "Service Cloud (closed)",
          friction: "4.5 hours. Zero organizational intelligence gained.",
        },
      ],
    },
    closing: {
      quote:
        "The cost isn't just time. Every manual hand-off is a point where context is lost, errors are introduced, and your people become the bottleneck — not the asset.",
    },
    next: {
      href: "/coke/act-2-work-os",
      label: "Continue to Act 2: The Work OS",
    },
  },

  act2: {
    meta: { title: "Act 2: The Work OS · The Agentic Enterprise" },
    hero: {
      eyebrow: "Act 02",
      headline: "The Work OS",
      subheadline:
        "What if Slack wasn't just where you chat — but where your entire operation ran?",
    },
    narrative: [
      {
        title: "Slack as the Connective Layer",
        body: "Every system Coca-Cola has invested in can surface its signals into Slack — not as passive notifications, but as actionable, context-rich cards. A service case crossing an SLA threshold automatically notifies the right team with the right data in the right channel. A field execution gap triggers a coordinated workflow, not just an alert that gets ignored.",
      },
      {
        title: "Real-Time Collaboration at Operational Speed",
        body: "When information flows into Slack with full context attached, decisions happen in minutes, not hours. A consumer complaint becomes a Slack thread that includes the service rep, field contact, QA lead, and an AI assistant — all in one place, with the case record and batch data surfaced automatically from their respective systems.",
      },
    ],
    scenario: {
      eyebrow: "The Same Incident. A Different Experience.",
      title: "With Slack as the Work OS",
      subtitle: "One consumer complaint. Four automated steps. Six minutes.",
      steps: [
        {
          step: "01",
          title: "Instant Awareness",
          description:
            "Consumer complaint opens in Service Cloud. A Slack workflow fires immediately — posting the full case context to #product-quality with assigned owner and priority classification.",
          delta: "Time to awareness: 8 seconds (was 17 minutes)",
        },
        {
          step: "02",
          title: "Automated Context Assembly",
          description:
            "A Slack workflow queries the QA portal and Data Cloud in parallel. Batch records, distribution region, consumer history, and prior similar cases surface in the thread automatically.",
          delta: "Manual research eliminated: 47 minutes recovered",
        },
        {
          step: "03",
          title: "AI-Assisted Response",
          description:
            "An AI assistant in Slack drafts a compliant, brand-appropriate consumer response using case data and approved brand guidelines — ready for one-click review.",
          delta: "Draft time: 45 seconds (was 25 minutes)",
        },
        {
          step: "04",
          title: "One-Click Resolution",
          description:
            "The service rep reviews the draft, approves it, and the response sends. Service Cloud updates automatically. Full audit trail archived in the thread.",
          delta: "Total resolution: 6 minutes (was 4.5 hours)",
        },
      ],
    },
    aiCapabilities: [
      {
        title: "Instant Classification",
        body: "AI reads incoming cases and classifies by type, urgency, and product category before a human sees them.",
      },
      {
        title: "Context Retrieval",
        body: "Relevant data from CRM, QA systems, and supply chain surfaces automatically — no manual lookups required.",
      },
      {
        title: "Draft Generation",
        body: "Brand-compliant response drafts ready in under 60 seconds, using approved language and product guidelines.",
      },
      {
        title: "Pattern Detection",
        body: "AI flags when multiple complaints share a batch code or region before they compound into a crisis.",
      },
    ],
    quote: {
      text: "Slack doesn't replace your systems of record. It becomes the surface where they all become useful at the same time.",
    },
    next: {
      href: "/coke/act-3-agentic-enterprise",
      label: "Continue to Act 3: The Agentic Enterprise",
    },
  },

  act3: {
    meta: { title: "Act 3: The Agentic Enterprise · The Agentic Enterprise" },
    hero: {
      eyebrow: "Act 03",
      headline: "The Agentic\nEnterprise",
      subheadline:
        "The Work OS gets you faster. The Agentic Enterprise gets you smarter — at scale, without adding headcount.",
    },
    narrative: [
      {
        title: "From Assistance to Autonomy",
        body: "Agentforce doesn't just surface information — it takes action. Agents can open and resolve cases, route work to the right teams, trigger multi-system workflows, update records, and escalate only what genuinely requires human judgment. Your people stay in the loop where it matters. Not on everything.",
      },
      {
        title: "The Compounding Effect",
        body: "Every resolved case becomes a learning signal. Every pattern an agent detects and acts on improves the next response. The system gets faster, smarter, and more accurate with every interaction — compounding operational value over time in a way that headcount additions never can.",
      },
    ],
    scenario: {
      eyebrow: "End-to-End Agentic Flow",
      title: "Consumer Complaint → Resolution → Learning",
      subtitle: "Autonomous where it can be. Human where it matters.",
      steps: [
        {
          step: "01",
          agent: "Classification Agent",
          title: "Signal Detection",
          description:
            "Consumer complaint arrives via any digital channel. The Classification Agent reads it in real time — identifying product type, severity level, geographic cluster, and relevant batch codes. Zero human time required.",
          autonomous: true,
          note: null,
        },
        {
          step: "02",
          agent: "Context Assembly Agent",
          title: "Parallel Context Assembly",
          description:
            "The agent simultaneously queries Service Cloud, Data Cloud, the QA system, and supply chain records. In seconds, it assembles a complete incident picture: case history, affected batch, regional distribution, similar prior complaints.",
          autonomous: true,
          note: null,
        },
        {
          step: "03",
          agent: "Resolution Agent",
          title: "Decision and Routing",
          description:
            "High-confidence, pattern-matched cases are resolved autonomously using approved response playbooks. Novel or high-severity cases are escalated to a human — with every piece of context already assembled and a draft response ready to approve.",
          autonomous: false,
          note: "Human-in-the-loop for novel or high-severity cases",
        },
        {
          step: "04",
          agent: "Escalation Handler",
          title: "Human Review",
          description:
            "Complex cases arrive in Slack fully loaded: draft response, case history, relevant precedents, compliance checklist. The rep reviews, adjusts if needed, approves. One action. Complete context.",
          autonomous: false,
          note: null,
        },
        {
          step: "05",
          agent: "Learning Loop",
          title: "Organizational Learning",
          description:
            "Every resolved case — automated or human-approved — feeds the learning loop. Classification models update. Response playbooks refine. Systemic quality patterns route to quality leadership automatically.",
          autonomous: true,
          note: null,
        },
      ],
    },
    outcomes: [
      { metric: "73%",  label: "of complaints resolved without human intervention" },
      { metric: "4.2×", label: "faster mean time to resolution" },
      { metric: "91%",  label: "consumer satisfaction (vs. 67% baseline)" },
      { metric: "40%",  label: "reduction in service operations burden" },
    ],
    quote: {
      text: "This isn't automation replacing people. It's automation handling what shouldn't require people — freeing your best operators to focus on what only they can do.",
    },
    vision:
      "A reachable state, not a future one. Built on the investments Coca-Cola has already made — Salesforce, Slack, Agentforce, Data Cloud. The infrastructure exists. The question is whether it's orchestrated.",
    next: {
      href: "/coke",
      label: "Return to Overview",
    },
  },
};
