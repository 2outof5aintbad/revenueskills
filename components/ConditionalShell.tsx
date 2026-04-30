"use client";

import { usePathname } from "next/navigation";
import Nav from "@/components/Nav";
import WelcomeBanner from "@/components/WelcomeBanner";

export default function ConditionalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isCoke = pathname.startsWith("/coke");

  return (
    <>
      {!isCoke && (
        <>
          <Nav />
          <WelcomeBanner />
        </>
      )}
      <main>{children}</main>
    </>
  );
}
