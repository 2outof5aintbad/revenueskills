import type { Metadata } from "next";
import CokeNav from "@/components/coke/CokeNav";

export const metadata: Metadata = {
  title: "The Agentic Enterprise · Executive Briefing",
  description:
    "An executive briefing microsite exploring how Coca-Cola can transform operations through Slack, Agentforce, and intelligent automation.",
};

export default function CokeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="coke-shell bg-[#0A0A0F] text-white min-h-screen">
      <CokeNav />
      <main>{children}</main>
    </div>
  );
}
