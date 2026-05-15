import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About Florida Fishing Maps",
  description:
    "We're Florida fishermen who got tired of watching captains burn fuel hunting for spots. So we packaged 20+ years of GPS waypoints into chartplotter-ready files.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <Container>
      <Section
        eyebrow="About"
        title="Built by Florida captains, for Florida captains"
      >
        <div className="prose prose-invert max-w-3xl text-foam/80 leading-relaxed space-y-5 text-base">
          <p>
            Florida Fishing Maps started the way most good things start — out
            of frustration. After spending too many trips watching newer boat
            owners idle around the same patches of bottom, hoping to stumble
            onto fish, we decided to package what we'd spent decades collecting:
            real, verified GPS coordinates of productive Florida fishing spots.
          </p>
          <p>
            Every spot in our catalog was fished, marked, and confirmed before
            it made the cut. We didn't pull these from old chart books or
            scrape them from forums. They're the actual numbers Florida
            captains rely on, organized by region and packaged in the exact file
            format your chartplotter expects.
          </p>
          <p>
            We keep the catalog tight — eight regional packs that cover the
            entire state, plus a Statewide Bundle for the captains who run all
            over. We update the spots seasonally and add new ones as we verify
            them. When you buy once, you keep access for life.
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
