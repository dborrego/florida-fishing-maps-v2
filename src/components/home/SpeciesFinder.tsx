"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { PRODUCTS, getProduct } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { Fish, ArrowRight } from "lucide-react";

/**
 * SpeciesFinder
 *
 * Pick what you're chasing -> get the region packs that target it, ranked by
 * how many regions cover that species. Matching is substring-based against each
 * product's speciesTargets, so "Snapper" catches yellowtail, mutton, mangrove
 * and red snapper. Season notes are general Florida guidance.
 */

interface SpeciesCategory {
  label: string;
  match: string[]; // case-insensitive substrings
  season: string;
}

const SPECIES: SpeciesCategory[] = [
  { label: "Snapper", match: ["snapper"], season: "Best late spring through fall; mangroves fire on summer nights." },
  { label: "Grouper", match: ["grouper"], season: "Gag and black grouper peak fall and winter on structure." },
  { label: "Mahi", match: ["mahi"], season: "Late spring into summer along the weed lines and current edges." },
  { label: "Tarpon", match: ["tarpon"], season: "Migratory peak May–July on the beaches and passes." },
  { label: "Snook", match: ["snook"], season: "Spring and fall runs; summer spawn around inlets and passes." },
  { label: "Redfish", match: ["redfish"], season: "Year-round inshore; big fall schools on the flats." },
  { label: "Sailfish", match: ["sailfish"], season: "Prime December–March on the east coast cold fronts." },
  { label: "Trout", match: ["trout", "seatrout"], season: "Cooler months over grass flats; gator trout in winter." },
  { label: "Kingfish", match: ["kingfish", "king mackerel"], season: "Spring and fall runs near-shore and on the reefs." },
  { label: "Wahoo", match: ["wahoo"], season: "Fall and winter on the humps and deep ledges." },
  { label: "Cobia", match: ["cobia"], season: "Spring migration along beaches and buoys." },
  { label: "Permit", match: ["permit"], season: "Spring and summer on the flats and offshore wrecks." },
];

export function SpeciesFinder() {
  const [active, setActive] = useState(0);
  const species = SPECIES[active];

  const matches = useMemo(() => {
    return PRODUCTS.filter((p) =>
      p.speciesTargets.some((s) =>
        species.match.some((m) => s.toLowerCase().includes(m))
      )
    );
  }, [species]);

  const bundle = getProduct("florida-statewide-bundle");

  return (
    <Container>
      <Section
        eyebrow="Find your fish"
        title="What are you chasing?"
        subtitle="Tap a species and we'll point you to the regions that target it. Buying for everything? The Statewide Bundle covers all of it."
      >
        {/* species chips */}
        <div className="flex flex-wrap gap-2.5">
          {SPECIES.map((s, i) => {
            const isActive = i === active;
            return (
              <button
                key={s.label}
                onClick={() => setActive(i)}
                aria-pressed={isActive}
                className={
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all " +
                  (isActive
                    ? "border-plotter bg-plotter/15 text-plotter shadow-glow"
                    : "border-foam/15 bg-foam/[0.03] text-foam/70 hover:border-plotter/40 hover:text-foam")
                }
              >
                <Fish className="h-3.5 w-3.5" />
                {s.label}
              </button>
            );
          })}
        </div>

        {/* season note */}
        <p className="mt-6 flex items-start gap-2 text-sm text-foam/70">
          <span className="font-mono text-xs uppercase tracking-widest text-sonar mt-0.5">
            Season
          </span>
          {species.season}
        </p>

        {/* recommended regions */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {matches.map((p) => (
            <a
              key={p.slug}
              href={`/maps/${p.slug}`}
              className="glass group rounded-xl p-5 transition-all hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-display text-lg font-semibold text-foam group-hover:text-plotter transition-colors">
                    {p.shortName}
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-foam/50 font-mono">
                    {p.spotCount} spots · {p.city}
                  </div>
                </div>
                <div className="font-display text-plotter font-bold">
                  {formatPrice(p.priceCents)}
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.speciesTargets
                  .filter((s) => species.match.some((m) => s.toLowerCase().includes(m)))
                  .slice(0, 3)
                  .map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-sonar/10 px-2 py-0.5 text-[11px] text-sonar"
                    >
                      {s}
                    </span>
                  ))}
              </div>
              <div className="mt-4 inline-flex items-center gap-1 text-sm text-plotter opacity-0 group-hover:opacity-100 transition-opacity">
                View pack <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </a>
          ))}
        </div>

        {bundle && (
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-plotter/20 bg-plotter/[0.04] p-6">
            <div>
              <div className="font-display text-lg font-semibold text-foam">
                Chasing more than one? Get every species, every region.
              </div>
              <div className="mt-1 text-sm text-foam/60">
                {bundle.spotCount.toLocaleString()} spots statewide for {formatPrice(bundle.priceCents)}.
              </div>
            </div>
            <ButtonLink href={`/maps/${bundle.slug}`} variant="primary" size="lg">
              Statewide Bundle →
            </ButtonLink>
          </div>
        )}
      </Section>
    </Container>
  );
}
