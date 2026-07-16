import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/home/Hero";
import { SonarDepthFinder } from "@/components/home/SonarDepthFinder";
import { ChartCompare } from "@/components/home/ChartCompare";
import { SpeciesFinder } from "@/components/home/SpeciesFinder";
import { CompatibilityWizard } from "@/components/home/CompatibilityWizard";
import { CaptainProof } from "@/components/home/CaptainProof";
import { ActionStrip } from "@/components/home/ActionStrip";
import { RegionCard } from "@/components/product/RegionCard";
import { PRODUCTS, getFeatured } from "@/lib/products";
import { Download, Map, Anchor, Cpu } from "lucide-react";

const HOMEPAGE_FAQS = [
  {
    q: "How fast will I get my GPS fishing maps?",
    a: "Same day — usually within an hour of payment. The download link is emailed automatically after Stripe confirms your payment.",
  },
  {
    q: "Will these spots work on my chartplotter?",
    a: "Yes. We provide format-specific files for every major brand: Garmin, Lowrance, Humminbird, Simrad, Raymarine, and Furuno. We also include a universal .gpx file for the Navionics mobile app and a .kmz for Google Earth.",
  },
  {
    q: "Are these real fishing spots or random GPS points?",
    a: "Real spots on real structure — reefs, wrecks, ledges, humps and flats — curated, deduplicated and labeled by structure type and species. No auto-generated grids or random pins.",
  },
  {
    q: "What's the difference between inshore, offshore, reef, and wreck spots?",
    a: "Inshore covers flats, creeks, and bays (snook, redfish, trout). Offshore covers open-water bottom (snapper, grouper, kingfish). Reef spots are natural and artificial reefs. Wrecks are sunken ships and aircraft, the most productive structure for big fish.",
  },
  {
    q: "Can I get a refund if the maps don't work?",
    a: "Because these are instant digital downloads, all sales are final once delivered — but if your file won't load on your unit, email support and we'll send the right format or fix it. We've never had a customer we couldn't get on the water.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* 1. Animated sonar / depth finder — "see what your chartplotter is missing" */}
      <SonarDepthFinder />

      {/* 2. Blank vs loaded chart */}
      <ChartCompare />

      {/* Featured regions */}
      <Container>
        <Section
          eyebrow="Top-selling regions"
          title="Pick your patch of Florida"
          subtitle="Every region has been mapped by working captains over 20+ seasons. Hit the ground running on day one."
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {getFeatured().map((p) => (
              <RegionCard key={p.slug} product={p} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <ButtonLink href="/maps" size="lg" variant="secondary">
              See All {PRODUCTS.length} Map Packs →
            </ButtonLink>
          </div>
        </Section>
      </Container>

      {/* 3. Species / season finder */}
      <SpeciesFinder />

      {/* How it works */}
      <div className="bg-midnight/40 border-y border-plotter/10">
        <Container>
          <Section
            eyebrow="How it works"
            title="From cart to chartplotter in three steps"
            align="center"
          >
            <div className="grid gap-8 md:grid-cols-3">
              <Step
                n="01"
                icon={<Map className="h-7 w-7" />}
                title="Pick your region"
                body="Choose the area you fish. Each pack has hundreds of spots across inshore and offshore."
              />
              <Step
                n="02"
                icon={<Cpu className="h-7 w-7" />}
                title="Choose your chartplotter"
                body="Garmin, Lowrance, Humminbird, Simrad, Raymarine, Furuno or the Navionics app — we deliver the right file."
              />
              <Step
                n="03"
                icon={<Download className="h-7 w-7" />}
                title="Download & load"
                body="The file is emailed within minutes. Drop it on an SD card, plug into your unit, and the spots show up as waypoints."
              />
            </div>
          </Section>
        </Container>
      </div>

      {/* 4. Compatibility wizard */}
      <CompatibilityWizard />

      {/* 5. Captain proof */}
      <CaptainProof />

      {/* 6. Action / atmosphere strip (secondary) */}
      <ActionStrip />

      {/* FAQ */}
      <Container>
        <Section
          eyebrow="Questions, answered"
          title="Everything captains ask before they buy"
        >
          <div className="space-y-4 max-w-3xl">
            {HOMEPAGE_FAQS.map((f) => (
              <details
                key={f.q}
                className="glass rounded-lg p-5 group"
              >
                <summary className="cursor-pointer flex items-center justify-between font-display font-semibold text-foam text-base">
                  {f.q}
                  <span className="text-plotter group-open:rotate-45 transition-transform text-xl">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-foam/70 leading-relaxed">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </Section>
      </Container>

      {/* CTA */}
      <div className="relative overflow-hidden bg-gradient-to-br from-deep to-abyss border-t border-plotter/10">
        <div className="absolute inset-0 bg-grid bg-grid opacity-30" />
        <Container className="relative">
          <Section align="center" className="py-24">
            <Anchor className="h-12 w-12 text-plotter mx-auto mb-6 opacity-60" />
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foam max-w-3xl mx-auto leading-tight">
              Stop guessing. Start catching.
            </h2>
            <p className="mt-6 text-foam/70 text-lg max-w-2xl mx-auto">
              Pick a region today and the spots are loaded on your chartplotter
              before your next trip.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              <ButtonLink href="/maps" size="lg" variant="primary">
                Shop All Regions
              </ButtonLink>
              <ButtonLink href="/maps/south-florida-bundle" size="lg" variant="secondary">
                Get the South Florida Bundle (Best Value)
              </ButtonLink>
            </div>
          </Section>
        </Container>
      </div>
    </>
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
    <div className="glass rounded-xl p-8 text-left">
      <div className="flex items-center justify-between mb-6">
        <span className="font-mono text-xs text-plotter tracking-widest">
          {n}
        </span>
        <div className="text-plotter">{icon}</div>
      </div>
      <h3 className="font-display text-xl font-semibold text-foam mb-2">
        {title}
      </h3>
      <p className="text-sm text-foam/70 leading-relaxed">{body}</p>
    </div>
  );
}
