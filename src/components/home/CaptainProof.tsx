import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import {
  LIVE_REGION_PRODUCTS,
  LIVE_SPOT_TOTAL,
  FORMAT_CATALOG,
} from "@/lib/products";
import { ShieldCheck, Radar, Layers, Quote } from "lucide-react";

/**
 * CaptainProof
 *
 * Credibility, not fluff. Every stat here is derived from the live catalog or
 * is a plainly verifiable fact — no invented social proof. Testimonials render
 * only when real ones are added to TESTIMONIALS — we ship no fabricated quotes.
 */

// To add real social proof, drop entries here (with permission). Leave empty
// and the testimonials block simply doesn't render.
const TESTIMONIALS: { quote: string; name: string; detail: string }[] = [];

const structureMarks = LIVE_REGION_PRODUCTS.reduce(
  (n, p) => n + p.reefCount + p.wreckCount,
  0
);

const STATS = [
  { value: LIVE_SPOT_TOTAL.toLocaleString(), label: "GPS spots live today" },
  { value: `${LIVE_REGION_PRODUCTS.length}`, label: "Regions ready to ship" },
  {
    value: `${Object.keys(FORMAT_CATALOG).length}`,
    label: "Chartplotter formats",
  },
  { value: "< 1 hr", label: "Checkout to loaded card" },
];

const VERIFY = [
  {
    icon: <Radar className="h-6 w-6" />,
    title: "Real structure, labeled",
    body: "Reefs, wrecks, ledges, humps and flats — every coordinate is labeled by structure type and target species, not dropped as an anonymous pin.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "Only what's finished",
    body: "We list a region for sale only when its files are complete and load-tested. Regions still being charted say so — no invented spot counts, ever.",
  },
  {
    icon: <Layers className="h-6 w-6" />,
    title: "Cleaned & formatted",
    body: `Duplicates removed, coordinates checked, and the ${structureMarks.toLocaleString()} reef and wreck marks packaged in your exact chartplotter's native file format.`,
  },
];

export function CaptainProof() {
  return (
    <div className="bg-gradient-to-b from-deep/30 to-abyss border-y border-plotter/10">
      <Container>
        <Section
          eyebrow="What's behind every pack"
          title="Honest numbers, finished files"
          subtitle="Every stat below comes straight from the catalog — if a region isn't ready, we say so instead of selling it."
          align="center"
        >
          {/* stat band */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-3xl sm:text-4xl font-bold bg-gradient-to-r from-plotter to-sonar bg-clip-text text-transparent">
                  {s.value}
                </div>
                <div className="mt-2 text-xs sm:text-sm text-foam/60">{s.label}</div>
              </div>
            ))}
          </div>

          {/* verification process */}
          <div className="mt-16 grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            {VERIFY.map((v) => (
              <div key={v.title} className="glass rounded-xl p-7 text-left">
                <div className="text-plotter mb-4">{v.icon}</div>
                <h3 className="font-display text-lg font-semibold text-foam mb-2">
                  {v.title}
                </h3>
                <p className="text-sm text-foam/70 leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>

          {/* testimonials — render only when real ones exist */}
          {TESTIMONIALS.length > 0 && (
            <div className="mt-16 grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
              {TESTIMONIALS.map((t) => (
                <figure key={t.name} className="glass rounded-xl p-7 text-left">
                  <Quote className="h-6 w-6 text-plotter/50 mb-3" />
                  <blockquote className="text-sm text-foam/85 leading-relaxed">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-4 text-sm">
                    <span className="font-display font-semibold text-foam">{t.name}</span>
                    <span className="block text-xs text-foam/55">{t.detail}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </Section>
      </Container>
    </div>
  );
}
