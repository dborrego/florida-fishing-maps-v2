import { list } from "@vercel/blob";
import { FORMAT_CATALOG, type ChartplotterFormat, type RegionProduct } from "./products";

/**
 * Resolve the actual Blob URL for a (region, format) pair.
 *
 * Convention:
 *   maps/<slug>/<slug>-<format>.<ext>     (per-format file)
 *   maps/<slug>/<slug>-bundle.zip         (everything in one zip — also delivered)
 *
 * Drop the files in Vercel Blob with this naming and the system finds them automatically.
 * If `product.files[format]` is set explicitly, that path wins.
 */
export async function resolveDownloadUrl(
  product: RegionProduct,
  format: ChartplotterFormat
): Promise<string | null> {
  // 1. Explicit override in catalog
  const explicit = product.files[format];
  if (explicit) return explicit;

  // 2. Look up by convention in Vercel Blob
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return null;
  }
  try {
    const info = FORMAT_CATALOG[format];
    const ext = info.extension.replace(/^\./, "");
    const expectedPrefix = `maps/${product.slug}/${product.slug}-${format}`;
    const { blobs } = await list({
      prefix: expectedPrefix,
      limit: 5,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    const match =
      blobs.find((b) => b.pathname.endsWith(`.${ext}`)) || blobs[0];
    return match?.url ?? null;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("[blob] resolve failed", e);
    return null;
  }
}
