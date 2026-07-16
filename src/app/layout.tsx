import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { buildMetadata } from "@/lib/seo";
import { OrganizationJsonLd, WebsiteJsonLd } from "@/components/seo/JsonLd";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#040A14",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = buildMetadata({
  title: "Florida Fishing Maps — GPS Fishing Spots for Every Chartplotter",
  description:
    "Florida's most accurate GPS fishing maps for Garmin, Lowrance, Humminbird, Simrad, Raymarine and Furuno chartplotters. Inshore, offshore, reefs, wrecks and ledges. Delivered to your inbox.",
  path: "/",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable} ${mono.variable}`}>
      <body className="bg-abyss text-foam antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <OrganizationJsonLd />
        <WebsiteJsonLd />
        {/* Vercel Web Analytics — cookieless; enable in Vercel → Analytics. */}
        <Analytics />
      </body>
    </html>
  );
}
