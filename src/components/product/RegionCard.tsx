import Link from "next/link";
import { ArrowRight, Fish, MapPin } from "lucide-react";
import type { RegionProduct } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

export function RegionCard({ product }: { product: RegionProduct }) {
  const isLive = product.status === "live";
  return (
    <Link
      href={`/maps/${product.slug}`}
      className="group glass relative overflow-hidden rounded-xl p-6 transition-all hover:-translate-y-1 block"
    >
      {/* Top: name + price (price only when purchasable) */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-mono text-plotter uppercase tracking-wider">
            <MapPin className="h-3 w-3" />
            {product.region.replace(/-/g, " ")}
          </div>
          <h3 className="mt-1 font-display text-xl font-semibold text-foam group-hover:text-plotter transition-colors">
            {product.shortName}
          </h3>
        </div>
        <div className="text-right">
          {isLive ? (
            <div className="font-display text-2xl font-bold text-foam">
              {formatPrice(product.priceCents)}
            </div>
          ) : (
            <span className="inline-flex items-center rounded-full border border-sun/40 bg-sun/10 px-2.5 py-1 text-[10px] uppercase tracking-wider font-mono text-sun">
              Coming soon
            </span>
          )}
        </div>
      </div>

      <p className="text-sm text-foam/70 leading-relaxed mb-5 line-clamp-2">
        {isLive
          ? product.description
          : `${product.shortName} is being charted now. Spot counts and pricing publish at launch — join the list on the region page.`}
      </p>

      {/* Spot stats — only shown once a pack is live and counts are real */}
      {isLive && (
        <div className="grid grid-cols-4 gap-2 mb-5">
          <Stat label="Total" value={product.spotCount} highlight />
          <Stat label="Inshore" value={product.inshoreCount} />
          <Stat label="Offshore" value={product.offshoreCount} />
          <Stat label="Wrecks" value={product.wreckCount} />
        </div>
      )}

      {/* Species */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {product.speciesTargets.slice(0, 3).map((s) => (
          <span
            key={s}
            className="inline-flex items-center gap-1 rounded-full border border-plotter/20 bg-plotter/5 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-plotter"
          >
            <Fish className="h-2.5 w-2.5" />
            {s}
          </span>
        ))}
        {product.speciesTargets.length > 3 && (
          <span className="text-[10px] uppercase tracking-wider text-foam/50 px-1 py-0.5">
            +{product.speciesTargets.length - 3} more
          </span>
        )}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-foam/50 font-mono coord">
          {product.center.lat.toFixed(4)}°N {Math.abs(product.center.lng).toFixed(4)}°W
        </span>
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-plotter group-hover:gap-2 transition-all">
          {isLive ? "View" : "Preview"}
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>

      {/* Subtle glow on hover */}
      <div className="absolute inset-x-6 -bottom-px h-px bg-gradient-to-r from-transparent via-plotter to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </Link>
  );
}

function Stat({ label, value, highlight }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div className="text-center rounded-md border border-foam/5 bg-abyss/40 py-2">
      <div
        className={`font-display font-bold text-sm ${
          highlight ? "text-sonar" : "text-foam"
        }`}
      >
        {value}
      </div>
      <div className="text-[9px] uppercase tracking-wider text-foam/50">{label}</div>
    </div>
  );
}
