import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PRODUCTS } from "@/lib/products";
import { ShieldCheck, Radar, Layers, Quote } from "lucide-react";

/**
 * CaptainProof
 *
 * Credibility, not fluff. Leads with verifiable facts derived from the catalog
 * plus the standing marketing claims (captains served, seasons). Then shows the
 * concrete verification process. Testimonials render only when real ones are
 * added to TESTIMONIALS — we ship no fabricated quotes.
 */

// To add real social proof, drop entries here (with permission). Leave empty
// and the testimonials block simply doesn't render.
const TESTIMONIALS: { quote: string; name: string; detail: string }[] = [];

const regions = PRODUCTS.filter((p) => p.region !== "statewide");
const totalSpots = regions.reduce((n, p) => n + p.spotCount, 0);
const structureMarks = regions.reduce((n, p) => n + p.reefCount + p.wreckCount, 0);

const STATS = [
  { value: totalSpots.toLocaleString(), label: "GPS-verified spots" },
  { value: `${regions.length}`, label: "Regions across Florida" },
  { value: "8,400+", label: "Captains loaded up" },
  { value: "20+", label: "Seasons of local knowledge" },
];

const VERIFY = [
  {
    icon: <Radar className="h-6 w-6" />,
    title: "Fished, not generated",
    body: "Every coordinate was collected on the water by working Florida captains — not scraped, guessed, or auto-placed on a chart.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "Confirmed on the machine",
    body: "Each mark was checked against bottom-machine returns to confirm there's real structure holding fish before it made the pack.",
  },
  {
    icon: <Layers className="h-6 w-6" />,
    title: "Cleaned & formatted",
    body: `Duplicates removed, every spot labeled by type, and the ${structureMarks.toLocaleString()} reef and wreck marks packaged for your exact chartplotter.`,
  },
];

export function CaptainProof() {
  return (
    <div className="bg-gradient-to-b from-deep/30 to-abyss border-y border-plotter/10">
      <Container>
        <Section
          eyebrow="Captain-built proof"
          title="Built from real seasons on the water"
          subtitle="No stock databases, no random pins. Here's what's behind every pack."
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
