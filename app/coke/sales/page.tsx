import type { Metadata } from "next";
import CokeHero from "@/components/coke/CokeHero";

export const metadata: Metadata = {
  title: "Sales · The Agentic Enterprise",
};

export default function CokeSalesPage() {
  return (
    <div>
      <CokeHero
        eyebrow="Role View · Sales"
        headline="Coming Soon"
        subheadline="The Sales role deep-dive is being developed. Return to the overview to explore the three-act transformation story."
        ctaSecondary={{ label: "Back to Overview", href: "/coke" }}
      />
    </div>
  );
}
