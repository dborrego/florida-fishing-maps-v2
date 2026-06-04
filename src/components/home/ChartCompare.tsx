"use client";

import { useRef, useState, useCallback } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { MoveHorizontal } from "lucide-react";

/**
 * ChartCompare
 *
 * A before/after wipe slider. Underneath: a blank "stock chart" — open water
 * with nothing on it. On top (revealed by the handle): the same water loaded
 * with GPS fishing waypoints. Directly sells the core value: empty vs loaded.
 * Pins are deterministic (seeded) so server and client render identically.
 */

// Seeded RNG so pin layout is stable across SSR/CSR (no hydration mismatch).
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(20260602);
const PINS = Array.from({ length: 46 }, () => ({
  x: 8 + rand() * 84,
  y: 14 + rand() * 78,
  kind: rand(),
}));

function pinColor(kind: number) {
  if (kind < 0.34) return "#00FFB2"; // inshore
  if (kind < 0.7) return "#00E5FF"; // offshore
  if (kind < 0.88) return "#FFD60A"; // reef
  return "#FF6B47"; // wreck
}

function ChartBase() {
  return (
    <svg viewBox="0 0 800 460" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="cc-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0a2236" />
          <stop offset="0.6" stopColor="#06121f" />
          <stop offset="1" stopColor="#030a12" />
        </linearGradient>
      </defs>
      <rect width="800" height="460" fill="url(#cc-water)" />
      {/* faint depth contours */}
      {[0.3, 0.5, 0.7, 0.85].map((p, i) => (
        <path
          key={i}
          d={`M0 ${460 * p + Math.sin(i) * 10} C 200 ${460 * p - 24}, 600 ${460 * p + 30}, 800 ${460 * p - 10}`}
          fill="none"
          stroke="rgba(0,229,255,0.10)"
          strokeWidth="1"
        />
      ))}
      {/* coastline corner */}
      <path d="M0 460 L0 360 C 90 350, 150 410, 230 460 Z" fill="rgba(245,230,211,0.10)" stroke="rgba(245,230,211,0.25)" strokeWidth="1" />
      <text x="24" y="408" fontFamily="JetBrains Mono, monospace" fontSize="13" fill="rgba(245,230,211,0.35)">
        LAND
      </text>
      {/* grid ticks */}
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={i} x1={(800 / 9) * i} y1="0" x2={(800 / 9) * i} y2="460" stroke="rgba(0,229,255,0.04)" strokeWidth="1" />
      ))}
    </svg>
  );
}

export function ChartCompare() {
  const [pos, setPos] = useState(52);
  const wrapRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(2, Math.min(98, pct)));
  }, []);

  return (
    <Container>
      <Section
        eyebrow="Before / after"
        title="A blank chart catches nothing"
        subtitle="Drag the handle. On the left, open water — the same empty chart your unit ships with. On the right, the exact same water loaded with proven GPS spots."
      >
        <div
          ref={wrapRef}
          className="relative mx-auto max-w-4xl select-none overflow-hidden rounded-2xl ring-1 ring-plotter/20 shadow-card cursor-ew-resize"
          style={{ aspectRatio: "800 / 460", touchAction: "none" }}
          onPointerDown={(e) => {
            dragging.current = true;
            (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
            setFromClientX(e.clientX);
          }}
          onPointerMove={(e) => dragging.current && setFromClientX(e.clientX)}
          onPointerUp={() => (dragging.current = false)}
        >
          {/* BASE: blank chart */}
          <ChartBase />
          <div className="absolute left-4 top-4 rounded-md bg-abyss/70 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-foam/60">
            Stock chart
          </div>

          {/* OVERLAY: loaded chart, clipped to handle position */}
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          >
            <ChartBase />
            <svg viewBox="0 0 800 460" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              {PINS.map((p, i) => {
                const c = pinColor(p.kind);
                return (
                  <g key={i}>
                    <circle cx={(p.x / 100) * 800} cy={(p.y / 100) * 460} r="9" fill={c} opacity="0.18" />
                    <circle cx={(p.x / 100) * 800} cy={(p.y / 100) * 460} r="3.2" fill={c} />
                  </g>
                );
              })}
            </svg>
            <div className="absolute right-4 top-4 rounded-md bg-plotter/15 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-plotter ring-1 ring-plotter/40">
              Loaded · 312 spots
            </div>
          </div>

          {/* Divider + handle */}
          <div className="absolute inset-y-0 pointer-events-none" style={{ left: `${pos}%` }}>
            <div className="absolute inset-y-0 -translate-x-1/2 w-0.5 bg-plotter/80 shadow-glow" />
            <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-plotter text-abyss shadow-glow">
              <MoveHorizontal className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* Accessible range fallback + legend */}
        <div className="mx-auto mt-6 max-w-4xl">
          <label className="sr-only" htmlFor="chart-compare-range">
            Reveal loaded chart
          </label>
          <input
            id="chart-compare-range"
            type="range"
            min={2}
            max={98}
            value={pos}
            onChange={(e) => setPos(Number(e.target.value))}
            className="w-full accent-plotter"
          />
          <div className="mt-4 flex flex-wrap justify-center gap-4 font-mono text-[11px] uppercase tracking-wider text-foam/60">
            <Legend color="#00FFB2" label="Inshore" />
            <Legend color="#00E5FF" label="Offshore" />
            <Legend color="#FFD60A" label="Reef" />
            <Legend color="#FF6B47" label="Wreck" />
          </div>
        </div>
      </Section>
    </Container>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}
