import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/seo";
import { Map, Cpu, Download, MapPin, ArrowRight } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "How GPS Fishing Map Delivery Works",
  description:
    "Pick a region, pick your chartplotter, and your GPS fishing spots arrive by email within minutes. Step-by-step instructions for Garmin, Lowrance, Humminbird, Simrad, Raymarine and Furuno.",
  path: "/how-it-works",
});

export default function HowItWorksPage() {
  return (
    <Container>
      <Section
        eyebrow="How it works"
        title="From cart to chartplotter — in three steps"
        subtitle="No subscriptions, no shipping wait, no SD card mailed across the country. Buy it, download it, load it, fish it."
      >
        <div className="space-y-8">
          <Step
            n="01"
            icon={<Map className="h-7 w-7" />}
            title="Pick your region"
            body="Browse the catalog and choose the area of Florida you want to fish. Each pack covers a specific stretch of coastline — the Keys, Tampa Bay, Miami offshore, the Panhandle, Jacksonville, the Everglades, Fort Lauderdale & Palm Beach, or the Indian River Lagoon. The Statewide Bundle includes everything at over 50% off."
          />
          <Step
            n="02"
            icon={<Cpu className="h-7 w-7" />}
            title="Choose your chartplotter brand"
            body="On the product page, select your unit: Garmin (.gpx), Lowrance (.usr), Humminbird (.gpx), Simrad (.usr), Raymarine (.gpx), Furuno (.gpx), the Navionics mobile app, or Google Earth (.kmz). We package the right format automatically. You'll also get the universal .gpx and .kmz files in case you have a backup unit or use a planning app on your laptop."
          />
          <Step
            n="03"
            icon={<Download className="h-7 w-7" />}
            title="Check your email"
            body="As soon as Stripe confirms payment (usually within seconds), the system generates a secure download link and emails it to you. Open the email, click the link, save the file to your SD card, plug the SD card into your chartplotter, and import. The spots will appear as labeled waypoints. Total time from purchase to loaded waypoints: usually under 10 minutes."
          />
        </div>

        <div className="mt-16 glass rounded-2xl p-8 max-w-3xl mx-auto">
          <div className="flex items-start gap-3 mb-3">
            <MapPin className="h-5 w-5 text-plotter mt-0.5" />
            <h3 className="font-display text-xl font-semibold text-foam">
              Don't have an SD card slot?
            </h3>
          </div>
          <p className="text-foam/70 leading-relaxed">
            No problem. The Navionics mobile app accepts our .gpx files
            directly — your spots appear as waypoints on your phone or tablet.
            Many newer chartplotters also accept Wi-Fi or USB transfer; the
            included PDF guide walks through your specific brand.
          </p>
        </div>

        <div className="mt-12 text-center">
          <ButtonLink href="/maps" size="lg" variant="primary">
            Pick Your Region
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </div>
      </Section>
    </Container>
  );
}

function Step({
  n,
  icon,
  title,
  body,
}: {
  n: string;
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="glass rounded-2xl p-8 grid gap-6 sm:grid-cols-[auto_1fr] items-start">
      <div className="flex items-center gap-4">
        <span className="font-mono text-xs text-plotter tracking-widest">
          {n}
        </span>
        <div className="text-plotter">{icon}</div>
      </div>
      <div>
        <h3 className="font-display text-2xl font-semibold text-foam mb-2">
          {title}
        </h3>
        <p className="text-foam/75 leading-relaxed">{body}</p>
      </div>
    </div>
  );
}
