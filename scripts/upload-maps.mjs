#!/usr/bin/env node
/**
 * One-time uploader: push your map files into Vercel Blob with the right naming.
 *
 * USAGE:
 *   1.  Drop your files into ./map-files/<slug>/  using this naming:
 *         <slug>-<format>.<ext>
 *       Examples:
 *         map-files/florida-keys/florida-keys-garmin.gpx
 *         map-files/florida-keys/florida-keys-lowrance.usr
 *         map-files/florida-keys/florida-keys-google-earth.kmz
 *   2.  export BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxx
 *   3.  node scripts/upload-maps.mjs
 */
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { put } from "@vercel/blob";

const ROOT = path.join(process.cwd(), "map-files");

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await walk(p)));
    } else {
      out.push(p);
    }
  }
  return out;
}

async function main() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error("✗ BLOB_READ_WRITE_TOKEN is not set.");
    process.exit(1);
  }
  try {
    await stat(ROOT);
  } catch {
    console.error(`✗ ${ROOT} doesn't exist. Create it and drop your map files inside.`);
    process.exit(1);
  }

  const files = await walk(ROOT);
  if (!files.length) {
    console.warn("No files found under map-files/ — nothing to upload.");
    return;
  }

  console.log(`Uploading ${files.length} file(s) to Vercel Blob…\n`);
  for (const file of files) {
    const rel = path.relative(ROOT, file).split(path.sep).join("/");
    const blobPath = `maps/${rel}`;
    const data = await readFile(file);
    const { url } = await put(blobPath, data, {
      access: "public",
      addRandomSuffix: false,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    console.log(`  ✓ ${blobPath}\n      ${url}`);
  }
  console.log("\nDone. Your /api/download routes will resolve to these URLs automatically.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
