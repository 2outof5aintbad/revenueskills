import type { Metadata } from "next";
import CokeHero from "@/components/coke/CokeHero";

export const metadata: Metadata = {
  title: "Supply Chain · The Agentic Enterprise",
};

export default function CokeSupplyChainPage() {
  return (
    <div>
      <CokeHero
        eyebrow="Role View · Supply Chain"
        headline="Coming Soon"
        subheadline="The Supply Chain role deep-dive is being developed. Return to the overview to explore the three-act transformation story."
        ctaSecondary={{ label: "Back to Overview", href: "/coke" }}
      />
    </div>
  );
}
