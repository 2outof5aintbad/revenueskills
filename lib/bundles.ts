import type { Bundle } from "@/types/bundle";

export const BUNDLES: Bundle[] = [
  {
    id: "enterprise-deal-kit",
    slug: "enterprise-deal-kit",
    name: "Enterprise Deal Kit",
    tagline: "Everything an AE needs to run a complex deal from discovery to close.",
    description:
      "The Enterprise Deal Kit gives Account Executives a complete AI-powered playbook for navigating complex, multi-stakeholder deals. From MEDDPICC discovery prep to ROI modeling to champion enablement — this bundle covers every critical moment in the enterprise sales cycle. Used by AEs at companies closing $250K+ deals.",
    role: "Account Executives",
    icon: "🏢",
    featured: true,
    skillSlugs: [
      "meddpicc-discovery-prep",
      "account-prep-brief",
      "roi-business-case-builder",
      "champion-letter-generator",
      "objection-reframe-engine",
    ],
  },
  {
    id: "sdr-prospecting-pack",
    slug: "sdr-prospecting-pack",
    name: "SDR Prospecting Pack",
    tagline: "Book more meetings. Fill better pipeline. Hit ramp faster.",
    description:
      "The SDR Prospecting Pack equips Sales Development Reps with AI skills for every stage of the outbound motion — from crafting personalized cold emails to running structured cold calls to following up without going dark. Built for SDRs who want to ramp faster and book more qualified meetings.",
    role: "Sales Development Reps",
    icon: "📞",
    featured: true,
    skillSlugs: [
      "prospecting-email-generator",
      "cold-call-script-builder",
      "call-followup-generator",
      "competitive-battlecard-builder",
    ],
  },
  {
    id: "customer-success-playbook",
    slug: "customer-success-playbook",
    name: "Customer Success Playbook",
    tagline: "Retain more revenue. Expand more accounts. Run better reviews.",
    description:
      "The Customer Success Playbook gives CSMs AI skills to stay ahead of churn, run exceptional QBRs, and identify expansion opportunities before renewal conversations start. From renewal risk scoring to QBR preparation to ROI storytelling — everything a CSM needs to protect and grow their book of business.",
    role: "Customer Success Managers",
    icon: "🤝",
    featured: true,
    skillSlugs: [
      "renewal-risk-scorer",
      "qbr-deck-outline",
      "roi-business-case-builder",
      "account-prep-brief",
      "call-followup-generator",
    ],
  },
  {
    id: "sales-leadership-pack",
    slug: "sales-leadership-pack",
    name: "Sales Leadership Pack",
    tagline: "Coach your team, call your number, and run tight pipeline reviews.",
    description:
      "The Sales Leadership Pack gives frontline managers and VPs of Sales AI skills for the operational work that consumes their week — pipeline health, territory planning, forecast accuracy, and competitive positioning. Spend less time building spreadsheets and more time coaching the deals that matter.",
    role: "Sales Managers & Leaders",
    icon: "📊",
    featured: false,
    skillSlugs: [
      "pipeline-health-check",
      "territory-planning-assistant",
      "meddpicc-discovery-prep",
      "competitive-battlecard-builder",
      "roi-business-case-builder",
    ],
  },
];

export const FEATURED_BUNDLES = BUNDLES.filter((b) => b.featured);
