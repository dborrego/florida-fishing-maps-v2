import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { RegionCard } from "@/components/product/RegionCard";
import {
  PRODUCTS,
  LIVE_PRODUCTS,
  LIVE_REGION_PRODUCTS,
  LIVE_SPOT_TOTAL,
} from "@/lib/products";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = buildMetadata({
  title: "All Florida GPS Fishing Maps — Every Region",
  description:
    "Browse every Florida GPS fishing map pack. Florida Keys and Miami Offshore are live now — Tampa Bay, the Panhandle, Jacksonville, the Everglades, Fort Lauderdale and the Indian River Lagoon are being charted.",
  path: "/maps",
});

export default function MapsPage() {
  const comingSoon = PRODUCTS.filter((p) => p.status !== "live");

  return (
    <Container>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "/" },
        { name: "Shop Maps", url: "/maps" },
      ]} />
      <Section
        eyebrow={`${LIVE_REGION_PRODUCTS.length} regions live • ${LIVE_SPOT_TOTAL.toLocaleString()} verified spots • more being charted`}
        title="Every Florida fishing map we've built"
        subtitle="Pick your region. Every live pack includes inshore, offshore, reef and wreck spots — and a file format for every chartplotter."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {LIVE_PRODUCTS.map((p) => (
            <RegionCard key={p.slug} product={p} />
          ))}
        </div>

        {comingSoon.length > 0 && (
          <>
            <h2 className="mt-16 mb-2 font-display text-2xl font-bold text-foam">
              Being charted now
            </h2>
            <p className="mb-6 text-sm text-foam/60 max-w-2xl">
              These regions aren&apos;t for sale yet — we only list a pack once
              its files are finished and verified. Open a region to join its
              launch list.
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {comingSoon.map((p) => (
                <RegionCard key={p.slug} product={p} />
              ))}
            </div>
          </>
        )}
      </Section>
    </Container>
  );
}
