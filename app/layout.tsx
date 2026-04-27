import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Nav from "@/components/Nav";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "SkillMarket — Claude Skills Marketplace",
  description: "Discover and install production-ready skills for Claude.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-surface-50 text-ink-900 antialiased">
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
