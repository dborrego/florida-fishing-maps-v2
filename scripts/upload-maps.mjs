#!/usr/bin/env node
/**
 * Uploader: push deliverable files into Vercel Blob under the EXACT names
 * `resolveDownloadUrl` (src/lib/blob.ts) looks for:
 *
 *   maps/<slug>/<slug>-bundle.zip         (complete package — the deliverable)
 *   maps/<slug>/<slug>-<format>.<ext>     (single-format fallback files)
 *
 * USAGE:
 *   export BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxx   (Vercel → Storage → Blob)
 *   node scripts/upload-maps.mjs           # uploads everything
 *   node scripts/upload-maps.mjs --verify  # dry-run: list what WOULD upload +
 *                                          # diff against what's already in Blob
 *
 * Requires `zip`/`unzip` CLI (present on macOS/Linux) to build the
 * South Florida combined bundle.
 */
import { readFile, stat, mkdtemp, rm } from "node:fs/promises";
import { execSync } from "node:child_process";
import { tmpdir } from "node:os";
import path from "node:path";
import { list, put } from "@vercel/blob";

const REPO = process.cwd();
const MAP = (p) => path.join(REPO, "map-files", p);
const DELIV = (p) => path.join(REPO, "deliverables", p);

/**
 * Source-of-truth upload manifest.
 * Format extensions MUST match FORMAT_CATALOG in src/lib/products.ts
 * (garmin .adm, lowrance .usr, humminbird .HWR, simrad/raymarine/furuno/
 * navionics-mobile .gpx, google-earth .kmz).
 */
const MANIFEST = {
  "florida-keys": {
    bundle: DELIV("FloridaFishingMaps-FL-Keys-Package.zip"),
    formats: {
      garmin: MAP("florida-keys/GPS-Files/Garmin/FloridaFishingMaps-FL-Keys.adm"),
      lowrance: MAP("florida-keys/GPS-Files/Lowrance/FloridaFishingMaps-FL-Keys.usr"),
      humminbird: MAP("florida-keys/GPS-Files/Humminbird/FloridaFishingMaps-FL-Keys.HWR"),
      simrad: MAP("florida-keys/GPS-Files/Simrad/FloridaFishingMaps-FL-Keys.gpx"),
      raymarine: MAP("florida-keys/GPS-Files/Raymarine/FloridaFishingMaps-FL-Keys.gpx"),
      // Furuno + Navionics accept standard GPX; the universal GPX ships for both.
      furuno: MAP("florida-keys/GPS-Files/Lowrance/FloridaFishingMaps-FL-Keys.gpx"),
      "navionics-mobile": MAP("florida-keys/GPS-Files/Lowrance/FloridaFishingMaps-FL-Keys.gpx"),
      "google-earth": MAP("florida-keys/FloridaFishingMaps-FL-Keys-NOAA.kmz"),
    },
  },
  "miami-offshore": {
    bundle: DELIV("FloridaFishingMaps-Miami-Offshore-Package.zip"),
    formats: {
      garmin: MAP("miami-offshore/GPS-Files/Garmin/FloridaFishingMaps-Miami.adm"),
      lowrance: MAP("miami-offshore/GPS-Files/Lowrance/FloridaFishingMaps-Miami.usr"),
      humminbird: MAP("miami-offshore/GPS-Files/Humminbird/FloridaFishingMaps-Miami.HWR"),
      simrad: MAP("miami-offshore/GPS-Files/Simrad/FloridaFishingMaps-Miami.gpx"),
      raymarine: MAP("miami-offshore/GPS-Files/Raymarine/FloridaFishingMaps-Miami.gpx"),
      furuno: MAP("miami-offshore/GPS-Files/Lowrance/FloridaFishingMaps-Miami.gpx"),
      "navionics-mobile": MAP("miami-offshore/GPS-Files/Lowrance/FloridaFishingMaps-Miami.gpx"),
      "google-earth": MAP("miami-offshore/FloridaFishingMaps-Miami-Offshore-NOAA.kmz"),
    },
  },
  // Combined bundle is built on the fly from the two region packages.
  "south-florida-bundle": { combinedOf: ["florida-keys", "miami-offshore"] },
};

const EXT = (f) => path.extname(f).replace(/^\./, "");

async function buildCombinedBundle(slugs) {
  const work = await mkdtemp(path.join(tmpdir(), "ffm-bundle-"));
  const stage = path.join(work, "FloridaFishingMaps-South-Florida-Bundle");
  execSync(`mkdir -p "${stage}"`);
  for (const slug of slugs) {
    const src = MANIFEST[slug].bundle;
    execSync(`unzip -q "${src}" -d "${stage}/${slug}"`);
  }
  const out = path.join(work, "south-florida-bundle-bundle.zip");
  execSync(`cd "${work}" && zip -qr "${out}" "FloridaFishingMaps-South-Florida-Bundle"`);
  return { out, cleanup: () => rm(work, { recursive: true, force: true }) };
}

async function collectUploads() {
  const uploads = []; // { blobPath, localPath, cleanup? }
  for (const [slug, def] of Object.entries(MANIFEST)) {
    if (def.combinedOf) {
      const { out, cleanup } = await buildCombinedBundle(def.combinedOf);
      uploads.push({ blobPath: `maps/${slug}/${slug}-bundle.zip`, localPath: out, cleanup });
      continue;
    }
    uploads.push({
      blobPath: `maps/${slug}/${slug}-bundle.zip`,
      localPath: def.bundle,
    });
    for (const [format, localPath] of Object.entries(def.formats)) {
      uploads.push({
        blobPath: `maps/${slug}/${slug}-${format}.${EXT(localPath)}`,
        localPath,
      });
    }
  }
  return uploads;
}

async function main() {
  const verifyOnly = process.argv.includes("--verify");
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    console.error("✗ BLOB_READ_WRITE_TOKEN is not set. Get it from Vercel → Storage → Blob.");
    process.exit(1);
  }

  const uploads = await collectUploads();

  // Check every local source exists before touching the network.
  let missing = 0;
  for (const u of uploads) {
    try {
      await stat(u.localPath);
    } catch {
      console.error(`✗ MISSING local file: ${u.localPath}`);
      missing++;
    }
  }
  if (missing) process.exit(1);

  const existing = await list({ prefix: "maps/", limit: 1000, token });
  const have = new Set(existing.blobs.map((b) => b.pathname));

  console.log(`${verifyOnly ? "VERIFY" : "UPLOAD"}: ${uploads.length} expected blob(s)\n`);
  for (const u of uploads) {
    const mark = have.has(u.blobPath) ? "= (already in Blob)" : "+ (new)";
    console.log(`  ${mark} ${u.blobPath}`);
    if (!verifyOnly) {
      const data = await readFile(u.localPath);
      await put(u.blobPath, data, { access: "public", addRandomSuffix: false, token });
    }
    if (u.cleanup && !verifyOnly) await u.cleanup();
  }

  const expected = new Set(uploads.map((u) => u.blobPath));
  const strays = existing.blobs.filter((b) => !expected.has(b.pathname));
  if (strays.length) {
    console.log(`\n⚠ ${strays.length} blob(s) under maps/ don't match the manifest (old names?):`);
    for (const s of strays) console.log(`    ? ${s.pathname}`);
  }
  console.log(verifyOnly ? "\nDry run complete — nothing uploaded." : "\nDone. /api/download will resolve these automatically.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
