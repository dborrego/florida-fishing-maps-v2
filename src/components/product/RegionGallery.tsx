import Image from "next/image";
import type { RegionProduct } from "@/lib/products";

/**
 * RegionGallery
 *
 * Renders location/fishing photos for a region. Reads product.gallery, which is
 * a curated list of license-clean images (Unsplash CDN, Wikimedia Commons, or
 * owned uploads in Vercel Blob). Renders nothing if no photos are set yet, so
 * product pages never show a broken or empty gallery before curation.
 */

export function RegionGallery({ product }: { product: RegionProduct }) {
  const photos = product.gallery ?? [];
  if (photos.length === 0) return null;

  return (
    <section>
      <h2 className="font-display text-2xl font-bold text-foam mb-4">
        Fishing {product.shortName}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {photos.map((photo, i) => (
          <figure
            key={photo.src}
            className={`relative overflow-hidden rounded-lg ring-1 ring-plotter/10 ${
              i === 0 ? "col-span-2 sm:col-span-2 row-span-2" : ""
            }`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={i === 0 ? 800 : 400}
              height={i === 0 ? 600 : 300}
              className="h-full w-full object-cover"
              sizes="(max-width: 640px) 50vw, 33vw"
            />
            {photo.credit && (
              <figcaption className="absolute bottom-0 right-0 bg-abyss/70 px-2 py-0.5 text-[10px] font-mono text-foam/70">
                {photo.credit}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </section>
  );
}
