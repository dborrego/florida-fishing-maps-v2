import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo";
import { Check } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Chartplotter Compatibility — Garmin, Lowrance, Humminbird & More",
  description:
    "Florida Fishing Maps work with every modern chartplotter: Garmin (GPSMAP, ECHOMAP), Lowrance (HDS, Elite, Hook²), Humminbird (Helix, Solix, Apex), Simrad (NSS, NSO), Raymarine (Axiom, Element), Furuno (TZtouch). Plus the Navionics app and Google Earth.",
  path: "/compatibility",
});

const BRANDS = [
  {
    brand: "Garmin",
    extension: ".adm",
    units: [
      "GPSMAP series (8400, 8600, 9000)",
      "ECHOMAP UHD",
      "ECHOMAP Plus",
      "Striker Vivid / Striker Plus",
      "Handhelds: GPSMAP 78s, 64sx, 86s",
    ],
    instructions:
      "Put the native .adm file on an SD card → insert it → Import User Data → spots appear under Waypoints. A universal .gpx is also in your ZIP (drop it in /Garmin/GPX) if you prefer GPX import.",
  },
  {
    brand: "Lowrance",
    extension: ".usr",
    units: ["HDS LIVE", "HDS Carbon", "HDS Gen3", "Elite FS / Elite Ti²", "HOOK Reveal", "HOOK²"],
    instructions:
      "Insert SD card → Settings → Files → select the .usr file → Import. Waypoints sync immediately.",
  },
  {
    brand: "Humminbird",
    extension: ".HWR",
    units: ["Helix series (5–15)", "Solix series", "Apex series", "Onix"],
    instructions:
      "Put the native .HWR file on an SD card → insert it → Menu → Nav Data → Import. Spots load into the Waypoint Manager.",
  },
  {
    brand: "Simrad",
    extension: ".gpx",
    units: ["NSS evo3 / evo3S", "NSO evo3", "GO9 / GO12", "Cruise series"],
    instructions:
      "Insert SD → Files → Memory Card → tap the .gpx → Import. Spots appear under Waypoints.",
  },
  {
    brand: "Raymarine",
    extension: ".gpx",
    units: ["Axiom / Axiom Pro / Axiom XL", "eS Series", "Element series", "Dragonfly"],
    instructions:
      "Insert SD → Menu → My Data → Import from card → select .gpx. Waypoints load to Waypoint List.",
  },
  {
    brand: "Furuno",
    extension: ".gpx",
    units: ["TZtouch2 (TZTL12F, TZTL15F)", "TZtouch3 (TZT9F, TZT12F, TZT16F, TZT19F)", "NavNet"],
    instructions:
      "SD card → Files → Import User Data → choose .gpx. Spots show under Routes/Marks.",
  },
  {
    brand: "Navionics App",
    extension: ".gpx",
    units: ["Navionics Boating (iOS)", "Navionics Boating (Android)"],
    instructions:
      "Open your download email on the phone → download the ZIP → tap the universal .gpx → 'Open in Navionics'. Spots become waypoints.",
  },
  {
    brand: "Google Earth",
    extension: ".kmz",
    units: ["Google Earth Pro (desktop)", "Google Earth Web", "Google Earth Mobile"],
    instructions:
      "Double-click the .kmz file or drag it into Google Earth. All spots appear as labeled placemarks for trip planning.",
  },
];

export default function CompatibilityPage() {
  return (
    <Container>
      <Section
        eyebrow="Chartplotter compatibility"
        title="Every brand. Every modern unit."
        subtitle="If your chartplotter takes an SD card or accepts a GPX import, you're covered. Pick your brand at checkout — we handle the formatting."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {BRANDS.map((b) => (
            <div key={b.brand} className="glass rounded-xl p-6">
              <div className="flex items-baseline justify-between mb-4">
                <h3 className="font-display text-2xl font-semibold text-foam">
                  {b.brand}
                </h3>
                <span className="font-mono text-xs text-plotter uppercase tracking-widest">
                  {b.extension}
                </span>
              </div>
              <ul className="space-y-1.5 mb-5">
                {b.units.map((u) => (
                  <li key={u} className="flex items-start gap-2 text-sm text-foam/80">
                    <Check className="h-4 w-4 text-sonar mt-0.5 shrink-0" />
                    {u}
                  </li>
                ))}
              </ul>
              <div className="border-t border-plotter/10 pt-4">
                <div className="text-xs uppercase tracking-widest font-mono text-plotter mb-1.5">
                  How to load
                </div>
                <p className="text-sm text-foam/70 leading-relaxed">
                  {b.instructions}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </Container>
  );
}
