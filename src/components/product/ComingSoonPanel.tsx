import { ButtonLink } from "@/components/ui/Button";
import type { RegionProduct } from "@/lib/products";
import { Compass, Mail, MapPin } from "lucide-react";

/**
 * Rendered in place of BuyPanel for regions that are still being charted.
 * No price, no invented spot counts, no purchase path — checkout also
 * rejects these slugs server-side.
 */
export function ComingSoonPanel({ product }: { product: RegionProduct }) {
  const mailto = `mailto:hello@floridafishingmaps.com?subject=${encodeURIComponent(
    `Waitlist: ${product.shortName}`
  )}&body=${encodeURIComponent(
    `Put me on the list for the ${product.shortName} pack. My chartplotter brand is: `
  )}`;

  return (
    <div className="glass rounded-2xl p-6 sm:p-8 sticky top-24">
      <div className="inline-flex items-center gap-2 rounded-full border border-sun/40 bg-sun/10 px-3 py-1 text-xs uppercase tracking-widest font-mono text-sun mb-4">
        <Compass className="h-3 w-3" />
        Coming soon
      </div>

      <h3 className="font-display text-2xl font-bold text-foam mb-2">
        {product.shortName} is being charted now
      </h3>
      <p className="text-sm text-foam/70 leading-relaxed mb-6">
        We only sell regions once the files are finished, verified, and ready
        to load on your unit. This one isn&apos;t there yet — no launch date
        promised until it is.
      </p>

      <ButtonLink href={mailto} variant="primary" size="lg" className="w-full">
        <Mail className="h-4 w-4" />
        Get notified at launch
      </ButtonLink>
      <p className="mt-3 text-xs text-foam/50 leading-relaxed">
        One email when it ships, with a launch discount. No spam.
      </p>

      <div className="border-t border-plotter/15 mt-6 pt-5">
        <div className="text-xs uppercase tracking-widest font-mono text-plotter mb-2">
          Ready today
        </div>
        <p className="text-sm text-foam/70 mb-3">
          The Florida Keys and Miami Offshore packs are finished and ship
          instantly.
        </p>
        <ButtonLink href="/maps" variant="ghost" size="md" className="w-full">
          <MapPin className="h-4 w-4" />
          See live regions
        </ButtonLink>
      </div>
    </div>
  );
}
