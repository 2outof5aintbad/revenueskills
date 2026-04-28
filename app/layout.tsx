import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Nav from "@/components/Nav";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "RevenueSkills — AI Skills for Sales Professionals",
  description: "Discover and install Claude AI skills built for revenue teams. Close more deals, prep faster, and hit quota with skills designed for enterprise sales.",
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
