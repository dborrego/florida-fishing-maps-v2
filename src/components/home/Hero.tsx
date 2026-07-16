import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LIVE_REGION_PRODUCTS, LIVE_SPOT_TOTAL } from "@/lib/products";
import { Anchor, MapPin, Zap } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid bg-grid opacity-60" />
      <div className="absolute inset-0 bg-radial-glow" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-plotter to-transparent opacity-60" />

      <Container className="relative pt-24 pb-32 md:pt-32 md:pb-40">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-plotter/30 bg-plotter/5 px-4 py-1.5 text-xs uppercase tracking-[0.25em] font-mono text-plotter">
            <Zap className="h-3 w-3" />
            Instant delivery · Every chartplotter brand
          </div>

          <h1 className="mt-6 font-display text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05] text-foam">
            The Florida fishing spots
            <br />
            <span className="bg-gradient-to-r from-plotter via-sonar to-sun bg-clip-text text-transparent">
              your chartplotter is missing.
            </span>
          </h1>

          <p className="mt-8 text-lg sm:text-xl text-foam/70 max-w-2xl leading-relaxed">
            GPS-verified inshore, offshore, reef, wreck and ledge coordinates —
            built for Garmin, Lowrance, Humminbird, Simrad, Raymarine and
            Furuno. Pick your region. Pick your unit. Load and go.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <ButtonLink href="/maps" size="lg" variant="primary">
              Browse All Regions →
            </ButtonLink>
            <ButtonLink href="/how-it-works" size="lg" variant="ghost">
              How It Works
            </ButtonLink>
          </div>

          {/* Stats derive from the live catalog — never hardcode counts here. */}
          <div className="mt-14 grid grid-cols-3 gap-8 max-w-xl">
            {[
              { n: LIVE_SPOT_TOTAL.toLocaleString(), l: "GPS Spots Live Now" },
              {
                n: `${LIVE_REGION_PRODUCTS.length} Regions`,
                l: "Live · More Being Charted",
              },
              { n: "< 1 hr", l: "Email Delivery" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display text-2xl sm:text-3xl font-bold text-plotter">
                  {s.n}
                </div>
                <div className="text-xs sm:text-sm text-foam/60 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating compass-style accent */}
        <div className="absolute -right-32 top-12 h-96 w-96 rounded-full border border-plotter/20 hidden md:block">
          <div className="absolute inset-8 rounded-full border border-plotter/15 animate-pulse-glow" />
          <div className="absolute inset-20 rounded-full border border-plotter/10" />
          <Anchor className="absolute inset-0 m-auto h-16 w-16 text-plotter/40" />
          <MapPin className="absolute top-8 left-1/2 -translate-x-1/2 h-5 w-5 text-coral animate-pulse" />
        </div>
      </Container>
    </section>
  );
}
