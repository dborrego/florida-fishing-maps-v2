"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { FORMAT_CATALOG, type ChartplotterFormat } from "@/lib/products";
import { Cpu, FileDown, Check, HardDrive } from "lucide-react";

/**
 * CompatibilityWizard
 *
 * Pick your unit -> see the exact file you'll receive and the precise steps to
 * load it. Removes the #1 pre-purchase doubt ("will this work on MY plotter?").
 * File/extension data comes from FORMAT_CATALOG; steps are brand-specific.
 */

const ORDER: ChartplotterFormat[] = [
  "garmin",
  "lowrance",
  "humminbird",
  "simrad",
  "raymarine",
  "furuno",
  "navionics-mobile",
  "google-earth",
];

const LOAD_STEPS: Record<ChartplotterFormat, string[]> = {
  garmin: [
    "Copy the native .adm file onto a blank SD card (universal .gpx also included in your ZIP).",
    "Insert the card into your GPSMAP, ECHOMAP or Striker unit.",
    "Import User Data (or Waypoints → Import) — every spot drops in as a waypoint.",
  ],
  lowrance: [
    "Copy the .usr file to the root of a microSD card.",
    "Insert the card and open Files from the home screen.",
    "Select the .usr file → Import — all waypoints load at once.",
  ],
  humminbird: [
    "Place the native .HWR file on a blank SD card.",
    "Insert the card into your Helix, Solix or Apex.",
    "Menu → Import Nav Data → choose the file.",
  ],
  simrad: [
    "Copy the .gpx file onto an SD or microSD card.",
    "Insert the card into your NSS, NSO, GO or Cruise unit.",
    "Files → memory card → select the file → Import.",
  ],
  raymarine: [
    "Copy the .gpx file to a microSD card.",
    "Insert the card into your Axiom, Element or Dragonfly.",
    "Home → My Data → Import/Export → Import from card.",
  ],
  furuno: [
    "Copy the .gpx file onto an SD card.",
    "Insert the card into your TZtouch2, TZtouch3 or NavNet.",
    "Menu → Files → Import Waypoints/Routes.",
  ],
  "navionics-mobile": [
    "Download the ZIP from your email, then open the universal .gpx in your Files app.",
    "Choose 'Open in Navionics Boating'.",
    "The spots import straight into your markers — no card needed.",
  ],
  "google-earth": [
    "Download the .kmz to your computer or phone.",
    "Open it in Google Earth (web, desktop or mobile).",
    "Every spot appears as a placemark for planning your trip.",
  ],
};

export function CompatibilityWizard() {
  const [brand, setBrand] = useState<ChartplotterFormat>("garmin");
  const info = FORMAT_CATALOG[brand];
  const steps = LOAD_STEPS[brand];

  return (
    <Container>
      <Section
        eyebrow="Compatibility wizard"
        title="Will it work on your unit? Yes — here's how."
        subtitle="Pick your chartplotter and see exactly what file you'll get and how it loads. We package the right format automatically based on your choice at checkout."
      >
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          {/* brand picker */}
          <div>
            <div className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-plotter">
              <Cpu className="h-3.5 w-3.5" /> Choose your chartplotter
            </div>
            <div className="grid grid-cols-2 gap-3">
              {ORDER.map((id) => {
                const isActive = id === brand;
                return (
                  <button
                    key={id}
                    onClick={() => setBrand(id)}
                    aria-pressed={isActive}
                    className={
                      "rounded-lg border px-4 py-3 text-left transition-all " +
                      (isActive
                        ? "border-plotter bg-plotter/15 shadow-glow"
                        : "border-foam/12 bg-foam/[0.03] hover:border-plotter/40")
                    }
                  >
                    <div className={"font-display text-sm font-semibold " + (isActive ? "text-plotter" : "text-foam")}>
                      {FORMAT_CATALOG[id].label}
                    </div>
                    <div className="mt-0.5 font-mono text-[11px] text-foam/50">
                      {FORMAT_CATALOG[id].extension}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* result panel */}
          <div className="glass rounded-2xl p-7">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-foam/50">
                  You'll receive
                </div>
                <div className="mt-1 font-display text-2xl font-bold text-foam">
                  {info.label}
                </div>
              </div>
              <div className="inline-flex items-center gap-2 rounded-lg bg-sonar/10 px-3 py-2 font-mono text-sonar">
                <FileDown className="h-4 w-4" />
                {info.extension}
              </div>
            </div>

            <p className="mt-4 text-sm text-foam/70 leading-relaxed">
              {info.description}
            </p>

            <div className="mt-6 space-y-4">
              {steps.map((s, i) => (
                <div key={i} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-plotter/15 font-mono text-xs text-plotter">
                    {i + 1}
                  </span>
                  <span className="text-sm text-foam/80 leading-relaxed">{s}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-start gap-2 rounded-lg border border-plotter/15 bg-abyss/40 p-3 text-xs text-foam/60">
              <HardDrive className="h-4 w-4 text-plotter shrink-0 mt-0.5" />
              Every order also includes a universal .gpx and a Google Earth .kmz, plus a quick-start PDF — so you're covered even if you switch units.
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm text-sonar">
              <Check className="h-4 w-4" /> Compatible — delivered within an hour of checkout.
            </div>
          </div>
        </div>
      </Section>
    </Container>
  );
}
