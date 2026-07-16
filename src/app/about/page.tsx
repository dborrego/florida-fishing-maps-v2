import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About Florida Fishing Maps",
  description:
    "We package real Florida GPS fishing coordinates — reefs, wrecks, ledges and flats — into clean, chartplotter-ready files for Garmin, Lowrance, Humminbird, Simrad, Raymarine and more.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <Container>
      <Section
        eyebrow="About"
        title="Real spots, in the file format your unit actually takes"
      >
        <div className="prose prose-invert max-w-3xl text-foam/80 leading-relaxed space-y-5 text-base">
          <p>
            Florida Fishing Maps started the way most good things start — out
            of frustration. A chartplotter fresh out of the box is an empty
            map, and building a spot book the hard way takes seasons of fuel
            and dead drifts. We package real, curated GPS coordinates of
            productive Florida fishing spots so you can skip that curve.
          </p>
          <p>
            Every pack is cleaned, deduplicated, labeled by structure type and
            target species, and delivered in the exact file your chartplotter
            expects — native Garmin, Lowrance, Humminbird, Simrad and Raymarine
            formats plus a universal .gpx and a Google Earth .kmz.
          </p>
          <p>
            We keep the catalog honest: we only sell a region once its files
            are finished and verified. The Florida Keys and Miami Offshore
            packs are live today; the rest of the state is being charted and
            listed as coming soon — with no invented spot counts in the
            meantime. Your download link lasts 30 days, and if you ever lose
            the files, email us and we&apos;ll send a fresh one.
          </p>
          <p>
            Got a question? Email{" "}
            <a
              href="mailto:support@floridafishingmaps.com"
              className="text-plotter hover:underline"
            >
              support@floridafishingmaps.com
            </a>{" "}
            — a real person reads every message.
          </p>
        </div>
      </Section>
    </Container>
  );
}
