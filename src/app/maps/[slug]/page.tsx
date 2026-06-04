import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { BuyPanel } from "@/components/product/BuyPanel";
import { RegionCard } from "@/components/product/RegionCard";
import { ChartplotterPreview } from "@/components/product/ChartplotterPreview";
import { RegionGallery } from "@/components/product/RegionGallery";
import { PRODUCTS, getProduct } from "@/lib/products";
import { buildMetadata } from "@/lib/seo";
import {
  ProductJsonLd,
  BreadcrumbJsonLd,
  FaqJsonLd,
  LocalBusinessJsonLd,
} from "@/components/seo/JsonLd";
import {
  Anchor,
  Fish,
  MapPin,
  Waves,
  Compass,
  Map,
  Ship,
} from "lucide-react";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = getProduct(params.slug);
  if (!product) return buildMetadata({ title: "Map Not Found", noIndex: true });
  return buildMetadata({
    title: `${product.name} — ${product.spotCount} GPS Spots for Your Chartplotter`,
    description: product.description,
    path: `/maps/${product.slug}`,
  });
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const related = PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <>
      <ProductJsonLd product={product} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Shop Maps", url: "/maps" },
          { name: product.shortName, url: `/maps/${product.slug}` },
        ]}
      />
      <FaqJsonLd faqs={product.faqs} />
      <LocalBusinessJsonLd product={product} />

      {/* Hero */}
      <div className="relative border-b border-plotter/10 overflow-hidden">
        <div className="absolute inset-0 bg-grid bg-grid opacity-40" />
        <div className="absolute inset-0 bg-radial-glow" />
        <Container className="relative pt-16 pb-12">
          <nav className="text-xs font-mono uppercase tracking-widest text-foam/50 mb-4">
            <a href="/" className="hover:text-plotter">Home</a>
            <span className="mx-2">/</span>
            <a href="/maps" className="hover:text-plotter">Maps</a>
            <span className="mx-2">/</span>
            <span className="text-plotter">{product.shortName}</span>
          </nav>

          <div className="inline-flex items-center gap-2 rounded-full border border-plotter/30 bg-plotter/5 px-3 py-1 text-xs uppercase tracking-widest font-mono text-plotter">
            <MapPin className="h-3 w-3" /> {product.city}, {product.county} County
          </div>

          <h1 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl font-bold text-foam leading-tight max-w-3xl">
            {product.name}
          </h1>

          <p className="mt-5 text-lg text-foam/70 max-w-2xl leading-relaxed">
            {product.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3 text-xs uppercase tracking-wider font-mono text-foam/60">
            <span className="coord">
              {product.center.lat.toFixed(4)}°N {Math.abs(product.center.lng).toFixed(4)}°W
            </span>
          </div>
        </Container>
      </div>

      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_400px] py-16">
          {/* LEFT: long-form content */}
          <div className="space-y-12">
            {/* Spot breakdown */}
            <section>
              <h2 className="font-display text-2xl font-bold text-foam mb-6">
                What's in the pack
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Stat icon={<Compass />} label="Total Spots" value={product.spotCount} highlight />
                <Stat icon={<Fish />} label="Inshore" value={product.inshoreCount} />
                <Stat icon={<Waves />} label="Offshore" value={product.offshoreCount} />
                <Stat icon={<Anchor />} label="Reefs" value={product.reefCount} />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                <Stat icon={<Ship />} label="Wrecks" value={product.wreckCount} />
                <Stat icon={<Map />} label="Launch Points" value={product.launchPoints.length} />
              </div>
            </section>

            {/* About this region */}
            <section>
              <h2 className="font-display text-2xl font-bold text-foam mb-4">
                About these spots
              </h2>
              <p className="text-foam/80 leading-relaxed text-base">
                {product.longDescription}
              </p>
            </section>

            {/* Location photos */}
            <RegionGallery product={product} />

            {/* What a spot looks like on a chartplotter */}
            <section>
              <h2 className="font-display text-2xl font-bold text-foam mb-4">
                Your spots, on your screen
              </h2>
              <p className="text-foam/80 leading-relaxed text-base mb-5">
                Every coordinate loads as a labeled waypoint, exactly like this.
                Drop the file on an SD card, import it, and the spots appear on
                your chartplotter ready to navigate to.
              </p>
              <ChartplotterPreview product={product} />
            </section>

            {/* Species */}
            <section>
              <h2 className="font-display text-2xl font-bold text-foam mb-4">
                Target species
              </h2>
              <div className="flex flex-wrap gap-2">
                {product.speciesTargets.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-1.5 rounded-full border border-plotter/20 bg-plotter/5 px-3 py-1.5 text-sm text-plotter"
                  >
                    <Fish className="h-3.5 w-3.5" />
                    {s}
                  </span>
                ))}
              </div>
            </section>

            {/* Launch points */}
            <section>
              <h2 className="font-display text-2xl font-bold text-foam mb-4">
                Best launch points
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {product.launchPoints.map((lp) => (
                  <div
                    key={lp}
                    className="glass rounded-md p-3 flex items-center gap-2 text-sm"
                  >
                    <MapPin className="h-4 w-4 text-plotter shrink-0" />
                    {lp}
                  </div>
                ))}
              </div>
            </section>

            {/* What you get */}
            <section>
              <h2 className="font-display text-2xl font-bold text-foam mb-4">
                What you'll receive after checkout
              </h2>
              <ol className="space-y-3 text-foam/80">
                <li className="flex gap-3">
                  <span className="font-mono text-plotter text-sm shrink-0 mt-1">
                    01
                  </span>
                  <span>
                    Your chartplotter-specific file (selected at checkout). Drop
                    it on an SD card and import — spots show up as waypoints.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-plotter text-sm shrink-0 mt-1">
                    02
                  </span>
                  <span>
                    A universal .gpx file (works with most apps and units) and a
                    .kmz file for Google Earth so you can plan trips on a
                    laptop.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-plotter text-sm shrink-0 mt-1">
                    03
                  </span>
                  <span>
                    A quick-start PDF with brand-specific loading instructions
                    and notes on which spots fish best in which season and tide.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-plotter text-sm shrink-0 mt-1">
                    04
                  </span>
                  <span>
                    A re-download link that stays active so if your SD card
                    fails or you upgrade your unit, you can pull the files again.
                  </span>
                </li>
              </ol>
            </section>

            {/* FAQ */}
            {product.faqs.length > 0 && (
              <section>
                <h2 className="font-display text-2xl font-bold text-foam mb-4">
                  Questions about this pack
                </h2>
                <div className="space-y-3">
                  {product.faqs.map((f) => (
                    <details key={f.q} className="glass rounded-lg p-5 group">
                      <summary className="cursor-pointer flex items-center justify-between font-display font-semibold text-foam">
                        {f.q}
                        <span className="text-plotter group-open:rotate-45 transition-transform text-xl">
                          +
                        </span>
                      </summary>
                      <p className="mt-3 text-sm text-foam/75 leading-relaxed">
                        {f.a}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* RIGHT: buy panel */}
          <aside>
            <BuyPanel product={product} />
          </aside>
        </div>
      </Container>

      {/* Related */}
      <Container>
        <Section title="Other regions captains buy" className="border-t border-plotter/10">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <RegionCard key={p.slug} product={p} />
            ))}
          </div>
        </Section>
      </Container>
    </>
  );
}

function Stat({
  icon,
  label,
  value,
  highlight,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  highlight?: boolean;
}) {
  return (
    <div className="glass rounded-xl p-5">
      <div className={`mb-2 ${highlight ? "text-sonar" : "text-plotter"}`}>
        {icon}
      </div>
      <div
        className={`font-display text-3xl font-bold ${
          highlight ? "text-sonar" : "text-foam"
        }`}
      >
        {value}
      </div>
      <div className="text-xs uppercase tracking-wider text-foam/55 mt-1">
        {label}
      </div>
    </div>
  );
}
