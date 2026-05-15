import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/home/Hero";
import { RegionCard } from "@/components/product/RegionCard";
import { PRODUCTS, getFeatured } from "@/lib/products";
import {
  Download,
  Mail,
  ShieldCheck,
  Map,
  Compass,
  Anchor,
  Waves,
  Cpu,
} from "lucide-react";

const COMPATIBILITY = [
  { name: "Garmin", note: "GPSMAP, ECHOMAP, Striker" },
  { name: "Lowrance", note: "HDS, Elite, Hook²" },
  { name: "Humminbird", note: "Helix, Solix, Apex" },
  { name: "Simrad", note: "NSS, NSO, GO, Cruise" },
  { name: "Raymarine", note: "Axiom, Element, Dragonfly" },
  { name: "Furuno", note: "TZtouch2, TZtouch3, NavNet" },
  { name: "Navionics App", note: "iOS & Android" },
  { name: "Google Earth", note: ".kmz universal" },
];

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
    a: "Every spot has been fished and verified. They were collected over more than 20 years by working Florida captains and confirmed against bottom-machine returns.",
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

      {/* Compatibility */}
      <Container>
        <Section
          eyebrow="Universal compatibility"
          title="Every chartplotter on the water"
          subtitle="If your unit takes an SD card or accepts a GPX import, you're covered. We package the right format automatically based on your selection at checkout."
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {COMPATIBILITY.map((c) => (
              <div
                key={c.name}
                className="glass rounded-lg p-5 text-center"
              >
                <div className="font-display font-semibold text-foam text-lg">
                  {c.name}
                </div>
                <div className="mt-1 text-xs text-foam/60">{c.note}</div>
              </div>
            ))}
          </div>
        </Section>
      </Container>

      {/* Trust strip */}
      <div className="bg-gradient-to-b from-deep/30 to-abyss border-y border-plotter/10">
        <Container>
          <Section align="center" className="py-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <Trust
                icon={<ShieldCheck className="h-6 w-6" />}
                title="Stripe Checkout"
                body="Bank-grade encryption"
              />
              <Trust
                icon={<Mail className="h-6 w-6" />}
                title="Instant Delivery"
                body="Email within minutes"
              />
              <Trust
                icon={<Waves className="h-6 w-6" />}
                title="Verified Spots"
                body="Fished by real captains"
              />
              <Trust
                icon={<Compass className="h-6 w-6" />}
                title="All-Format Pack"
                body="Every chartplotter brand"
              />
            </div>
          </Section>
        </Container>
      </div>

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
              <ButtonLink href="/maps/florida-statewide-bundle" size="lg" variant="secondary">
                Get the Statewide Bundle (Best Value)
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

function Trust({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="text-center">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-plotter/10 text-plotter mb-3">
        {icon}
      </div>
      <div className="font-display font-semibold text-foam text-sm">{title}</div>
      <div className="text-xs text-foam/60 mt-1">{body}</div>
    </div>
  );
}
