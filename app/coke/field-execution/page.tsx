import type { Metadata } from "next";
import CokeHero from "@/components/coke/CokeHero";

export const metadata: Metadata = {
  title: "Field Execution · The Agentic Enterprise",
};

export default function CokeFieldExecutionPage() {
  return (
    <div>
      <CokeHero
        eyebrow="Role View · Field Execution"
        headline="Coming Soon"
        subheadline="The Field Execution role deep-dive is being developed. Return to the overview to explore the three-act transformation story."
        ctaSecondary={{ label: "Back to Overview", href: "/coke" }}
      />
    </div>
  );
}
