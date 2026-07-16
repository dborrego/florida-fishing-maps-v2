"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Fish, MapPin, Radar } from "lucide-react";

/**
 * SonarDepthFinder
 *
 * A live, canvas-rendered fish-finder display: scrolling bottom structure,
 * fish arches, and pulsing GPS waypoints dropped on the productive marks.
 * The whole thing is generated procedurally — no external assets, no
 * copyright exposure. Respects prefers-reduced-motion (renders a static frame).
 */

interface FishMark {
  x: number;
  depth: number; // 0..1 of usable column
  size: number;
  hue: string;
}

interface Waypoint {
  x: number; // 0..1 horizontal position
  depth: number; // 0..1
  label: string;
}

const WAYPOINTS: Waypoint[] = [
  { x: 0.26, depth: 0.74, label: "WRECK" },
  { x: 0.54, depth: 0.62, label: "LEDGE" },
  { x: 0.8, depth: 0.82, label: "HUMP" },
];

export function SonarDepthFinder() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Logical drawing size; scaled for crispness via DPR.
    const W = 900;
    const H = 420;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    // Procedural bottom contour: sum of sines + a couple of structure humps.
    const bottomAt = (x: number, phase: number) => {
      const base = H * 0.62;
      const s =
        Math.sin((x + phase) * 0.012) * 26 +
        Math.sin((x + phase) * 0.031 + 1.3) * 14 +
        Math.sin((x + phase) * 0.07 + 0.5) * 6;
      // structure humps (wrecks/ledges) at certain world positions
      const humpA = 60 * Math.exp(-((((x + phase) % 1400) - 360) ** 2) / 2400);
      const humpB = 80 * Math.exp(-((((x + phase) % 1400) - 1040) ** 2) / 1600);
      return base + s - humpA - humpB + H * 0.16;
    };

    let fish: FishMark[] = [];
    const spawnFish = (phase: number) => {
      if (fish.length > 14) return;
      if (Math.random() > 0.06) return;
      const x = W + 20;
      const bottom = bottomAt(x, phase);
      const surface = H * 0.16;
      const depth = surface + Math.random() * (bottom - surface - 30);
      const hues = ["#00FFB2", "#00E5FF", "#FFD60A", "#FF6B47"];
      fish.push({
        x,
        depth: depth / H,
        size: 6 + Math.random() * 10,
        hue: hues[Math.floor(Math.random() * hues.length)],
      });
    };

    let phase = 0;
    let raf = 0;
    const speed = 1.1;

    const draw = (t: number) => {
      // Water column gradient
      const g = ctx.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, "#072036");
      g.addColorStop(0.5, "#04121f");
      g.addColorStop(1, "#020a12");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      // Depth grid lines
      ctx.strokeStyle = "rgba(0,229,255,0.07)";
      ctx.lineWidth = 1;
      for (let i = 1; i < 6; i++) {
        const y = (H / 6) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      // Surface shimmer line
      ctx.strokeStyle = "rgba(0,229,255,0.35)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, H * 0.16);
      ctx.lineTo(W, H * 0.16);
      ctx.stroke();

      // Bottom contour + hard return fill
      ctx.beginPath();
      ctx.moveTo(0, H);
      for (let x = 0; x <= W; x += 4) {
        ctx.lineTo(x, bottomAt(x, phase));
      }
      ctx.lineTo(W, H);
      ctx.closePath();
      const bg = ctx.createLinearGradient(0, H * 0.6, 0, H);
      bg.addColorStop(0, "rgba(255,107,71,0.85)");
      bg.addColorStop(0.4, "rgba(255,138,71,0.6)");
      bg.addColorStop(1, "rgba(120,40,20,0.95)");
      ctx.fillStyle = bg;
      ctx.fill();

      // Bright hard-bottom edge
      ctx.beginPath();
      for (let x = 0; x <= W; x += 4) {
        const y = bottomAt(x, phase);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "#FFD60A";
      ctx.lineWidth = 2;
      ctx.shadowColor = "rgba(255,214,10,0.7)";
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Fish arches
      fish.forEach((f) => {
        const y = f.depth * H;
        ctx.beginPath();
        ctx.arc(f.x, y, f.size, Math.PI * 1.15, Math.PI * 1.85);
        ctx.strokeStyle = f.hue;
        ctx.lineWidth = 3;
        ctx.shadowColor = f.hue;
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      // GPS waypoints dropped on structure
      WAYPOINTS.forEach((w) => {
        const x = w.x * W;
        const y = w.depth * H;
        const pulse = reduceMotion ? 0.6 : 0.5 + 0.5 * Math.sin(t / 320 + x);
        // vertical drop line
        ctx.strokeStyle = "rgba(0,229,255,0.35)";
        ctx.setLineDash([4, 5]);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, H * 0.16);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.setLineDash([]);
        // pulsing ring
        ctx.beginPath();
        ctx.arc(x, y, 7 + pulse * 9, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,255,178,${0.5 - pulse * 0.35})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        // marker
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = "#00FFB2";
        ctx.shadowColor = "#00FFB2";
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
        // label chip
        ctx.font = "600 11px JetBrains Mono, monospace";
        const tw = ctx.measureText(w.label).width;
        ctx.fillStyle = "rgba(4,10,20,0.85)";
        ctx.fillRect(x + 9, y - 9, tw + 10, 17);
        ctx.fillStyle = "#00FFB2";
        ctx.fillText(w.label, x + 14, y + 3);
      });

      // Right-edge depth scale + readouts
      const curBottomDepth = Math.round(((bottomAt(W * 0.5, phase) - H * 0.16) / H) * 230 + 18);
      ctx.fillStyle = "rgba(4,10,20,0.7)";
      ctx.fillRect(0, 0, W, H * 0.16);
      ctx.font = "700 15px JetBrains Mono, monospace";
      ctx.fillStyle = "#00FFB2";
      ctx.fillText(`${curBottomDepth} ft`, 16, 32);
      ctx.font = "600 11px JetBrains Mono, monospace";
      ctx.fillStyle = "rgba(248,250,252,0.55)";
      ctx.fillText("DEPTH", 16, 48);
      ctx.fillStyle = "#00E5FF";
      ctx.font = "700 15px JetBrains Mono, monospace";
      ctx.fillText("79°F", 120, 32);
      ctx.font = "600 11px JetBrains Mono, monospace";
      ctx.fillStyle = "rgba(248,250,252,0.55)";
      ctx.fillText("WATER TEMP", 120, 48);
      ctx.fillStyle = "#00E5FF";
      ctx.font = "600 12px JetBrains Mono, monospace";
      ctx.textAlign = "right";
      ctx.fillText("CHIRP · 200 kHz · GPS 3D", W - 16, 30);
      ctx.textAlign = "left";

      if (!reduceMotion) {
        phase += speed;
        fish = fish
          .map((f) => ({ ...f, x: f.x - speed }))
          .filter((f) => f.x > -30);
        spawnFish(phase);
        raf = requestAnimationFrame(draw);
      }
    };

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="relative border-y border-plotter/10 bg-midnight/40 overflow-hidden">
      <div className="absolute inset-0 bg-grid bg-grid opacity-20" />
      <Container className="relative py-20 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] items-center">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-mono text-plotter">
              <Radar className="h-3.5 w-3.5" /> Live sonar
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-foam leading-tight">
              See what your chartplotter is{" "}
              <span className="bg-gradient-to-r from-plotter to-sonar bg-clip-text text-transparent">
                missing.
              </span>
            </h2>
            <p className="mt-5 text-base sm:text-lg text-foam/70 leading-relaxed max-w-xl">
              Wrecks, ledges and humps don't show up on a stock map. We've already
              found the structure that holds fish and dropped the waypoints —
              you just load them and run straight to the marks.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-foam/80">
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-sonar shrink-0" /> Hundreds of GPS marks on real structure — not auto-placed pins
              </li>
              <li className="flex items-center gap-3">
                <Fish className="h-4 w-4 text-sonar shrink-0" /> Reefs, wrecks, humps, ledges and flats
              </li>
              <li className="flex items-center gap-3">
                <Radar className="h-4 w-4 text-sonar shrink-0" /> Every mark labeled by structure type and species
              </li>
            </ul>
            <div className="mt-8">
              <ButtonLink href="/maps" size="lg" variant="primary">
                Find Your Marks →
              </ButtonLink>
            </div>
          </div>

          {/* Fish-finder unit */}
          <div className="relative rounded-2xl bg-[#0b0f17] p-3 ring-1 ring-plotter/20 shadow-card">
            <div className="flex items-center justify-between px-2 pb-2 pt-1">
              <span className="font-mono text-[11px] uppercase tracking-widest text-plotter/80">
                FloridaFishingMaps · Sonar
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[11px] text-sonar">
                <span className="h-1.5 w-1.5 rounded-full bg-sonar animate-pulse" />
                REC
              </span>
            </div>
            <canvas
              ref={canvasRef}
              className="w-full h-auto rounded-xl block"
              style={{ aspectRatio: "900 / 420" }}
              aria-label="Animated fish-finder sonar display showing bottom structure, fish, and GPS waypoints"
              role="img"
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
