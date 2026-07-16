import { list } from "@vercel/blob";
import { FORMAT_CATALOG, type ChartplotterFormat, type RegionProduct } from "./products";

/**
 * Resolve the actual Blob URL for a (region, format) pair.
 *
 * Delivery model: every purchase receives the COMPLETE region package zip
 * (all chartplotter formats + universal .gpx/.kmz + PDF guides) — this is
 * exactly what the product page promises. The chosen format personalizes the
 * email copy and loading instructions.
 *
 * Blob naming convention:
 *   maps/<slug>/<slug>-bundle.zip         (complete package — preferred)
 *   maps/<slug>/<slug>-<format>.<ext>     (single-format fallback)
 *
 * Upload files with `node scripts/upload-maps.mjs` and the system finds them
 * automatically. If `product.files[format]` is set explicitly, that URL wins.
 */
export async function resolveDownloadUrl(
  product: RegionProduct,
  format: ChartplotterFormat
): Promise<string | null> {
  // 1. Explicit override in catalog
  const explicit = product.files[format];
  if (explicit) return explicit;

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return null;
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN;

  try {
    // 2. Complete region package (preferred deliverable)
    const bundlePrefix = `maps/${product.slug}/${product.slug}-bundle`;
    const bundle = await list({ prefix: bundlePrefix, limit: 5, token });
    const bundleMatch =
      bundle.blobs.find((b) => b.pathname.endsWith(".zip")) || bundle.blobs[0];
    if (bundleMatch?.url) return bundleMatch.url;

    // 3. Single-format file by convention
    const info = FORMAT_CATALOG[format];
    const ext = info.extension.replace(/^\./, "");
    const expectedPrefix = `maps/${product.slug}/${product.slug}-${format}`;
    const { blobs } = await list({ prefix: expectedPrefix, limit: 5, token });
    const match = blobs.find((b) => b.pathname.endsWith(`.${ext}`)) || blobs[0];
    return match?.url ?? null;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("[blob] resolve failed", e);
    return null;
  }
}
