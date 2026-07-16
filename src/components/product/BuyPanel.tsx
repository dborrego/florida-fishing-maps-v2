"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { FORMAT_CATALOG, type ChartplotterFormat, type RegionProduct } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { Check, ShieldCheck, Mail, Loader2 } from "lucide-react";

const FORMAT_ORDER: ChartplotterFormat[] = [
  "garmin",
  "lowrance",
  "humminbird",
  "simrad",
  "raymarine",
  "furuno",
  "navionics-mobile",
  "google-earth",
];

export function BuyPanel({ product }: { product: RegionProduct }) {
  const [format, setFormat] = useState<ChartplotterFormat>("garmin");
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = () => {
    setError(null);
    startTransition(async () => {
      try {
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug: product.slug, format }),
        });
        const data = await res.json();
        if (!res.ok || !data.url) {
          throw new Error(data.error || "Checkout failed");
        }
        window.location.href = data.url;
      } catch (e) {
        setError(e instanceof Error ? e.message : "Something went wrong");
      }
    });
  };

  const selectedInfo = FORMAT_CATALOG[format];

  return (
    <div className="glass rounded-2xl p-6 sm:p-8 sticky top-24">
      <div className="flex items-baseline gap-3 mb-1">
        <span className="font-display text-4xl font-bold text-foam">
          {formatPrice(product.priceCents)}
        </span>
        <span className="text-sm text-foam/50">one-time</span>
      </div>
      <p className="text-sm text-foam/70 mb-6">
        {product.spotCount} GPS-verified fishing spots
      </p>

      <div className="space-y-2 mb-6">
        {[
          "Every chartplotter format in one ZIP",
          "Universal .gpx + Google Earth .kmz included",
          "Quick-start loading guides (PDF)",
          "Email delivery within an hour",
          "30-day download link — email us anytime for a fresh one",
        ].map((b) => (
          <div key={b} className="flex items-start gap-2 text-sm">
            <Check className="h-4 w-4 mt-0.5 text-sonar shrink-0" />
            <span className="text-foam/80">{b}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-plotter/15 pt-6 mb-6">
        <label className="block text-xs uppercase tracking-widest font-mono text-plotter mb-3">
          Your chartplotter
        </label>
        <div className="grid grid-cols-2 gap-2">
          {FORMAT_ORDER.map((f) => {
            const info = FORMAT_CATALOG[f];
            const active = f === format;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFormat(f)}
                className={`text-left rounded-md border px-3 py-2.5 text-sm transition-all ${
                  active
                    ? "border-plotter bg-plotter/10 text-plotter"
                    : "border-foam/10 bg-abyss/40 text-foam/70 hover:border-plotter/40"
                }`}
              >
                <div className="font-semibold leading-tight">{info.label}</div>
                <div className="text-[10px] uppercase tracking-wider opacity-70 mt-0.5">
                  {info.extension}
                </div>
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-xs text-foam/60 leading-relaxed">
          {selectedInfo.description}
        </p>
      </div>

      <Button
        variant="primary"
        size="lg"
        className="w-full"
        onClick={handleCheckout}
        disabled={pending}
      >
        {pending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Redirecting…
          </>
        ) : (
          <>Buy & Download — {formatPrice(product.priceCents)}</>
        )}
      </Button>

      {error && (
        <p className="mt-3 text-xs text-coral">{error}</p>
      )}

      <div className="mt-5 flex flex-col gap-2 text-xs text-foam/60">
        <span className="inline-flex items-center gap-2">
          <ShieldCheck className="h-3.5 w-3.5 text-sonar" />
          Secure Stripe Checkout
        </span>
        <span className="inline-flex items-center gap-2">
          <Mail className="h-3.5 w-3.5 text-plotter" />
          Files emailed within minutes
        </span>
      </div>
    </div>
  );
}
