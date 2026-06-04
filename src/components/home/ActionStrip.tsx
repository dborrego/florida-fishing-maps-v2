import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Waves } from "lucide-react";

/**
 * ActionStrip
 *
 * Secondary cinematic band for atmosphere. Ships with an owned, CSS-only motion
 * scene (rotating radar sweep + scan line) so there is zero copyright exposure.
 * Pass `videoSrc` + `poster` later to drop in licensed/owned footage — the copy
 * and overlay stay the same. Kept intentionally lighter than the sonar section,
 * which converts harder.
 */

export function ActionStrip({
  videoSrc,
  poster,
}: {
  videoSrc?: string;
  poster?: string;
}) {
  return (
    <section className="relative overflow-hidden border-y border-plotter/10 bg-gradient-to-br from-deep via-midnight to-abyss">
      {/* Optional licensed/owned video layer */}
      {videoSrc ? (
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-40"
          autoPlay
          muted
          loop
          playsInline
          poster={poster}
        >
          <source src={videoSrc} />
        </video>
      ) : (
        <>
          {/* Owned CSS motion scene */}
          <div className="absolute inset-0 bg-grid bg-grid opacity-20" />
          <div
            className="absolute left-1/2 top-1/2 h-[680px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.18] animate-spin motion-reduce:animate-none [animation-duration:14s]"
            style={{
              background:
                "conic-gradient(from 0deg, rgba(0,229,255,0) 0deg, rgba(0,229,255,0.5) 40deg, rgba(0,229,255,0) 90deg)",
              maskImage: "radial-gradient(circle, #000 60%, transparent 71%)",
              WebkitMaskImage: "radial-gradient(circle, #000 60%, transparent 71%)",
            }}
            aria-hidden="true"
          />
          <div className="scan-line" aria-hidden="true" />
        </>
      )}
      <div className="absolute inset-0 bg-hero-overlay opacity-70" aria-hidden="true" />

      <Container className="relative">
        <div className="py-20 sm:py-24 text-center">
          <p className="mb-3 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-mono text-plotter">
            <Waves className="h-3.5 w-3.5" /> On the water
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-foam leading-tight max-w-3xl mx-auto">
            Less time searching.{" "}
            <span className="bg-gradient-to-r from-plotter to-sonar bg-clip-text text-transparent">
              More time hooked up.
            </span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-foam/70 max-w-2xl mx-auto leading-relaxed">
            Idle past the crowded spots and run straight to proven structure. Your
            next trip starts on the marks, not searching for them.
          </p>
          <div className="mt-9">
            <ButtonLink href="/maps" size="lg" variant="primary">
              Load Your Chartplotter →
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
