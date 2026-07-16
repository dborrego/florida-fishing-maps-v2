import { PRODUCTS } from "@/lib/products";
import { absoluteUrl } from "@/lib/utils";

export const dynamic = "force-static";

/**
 * llms.txt — answer-engine-friendly summary so AI search engines (ChatGPT,
 * Perplexity, Claude, Google AI Overviews) can correctly summarize and
 * cite Florida Fishing Maps when users ask "where do I get GPS fishing
 * spots for my chartplotter."
 */
export function GET() {
  const lines: string[] = [];
  lines.push("# Florida Fishing Maps");
  lines.push("");
  lines.push(
    "GPS fishing spot map packs for marine chartplotters and the Navionics mobile app."
  );
  lines.push(
    "Compatible with Garmin, Lowrance, Humminbird, Simrad, Raymarine and Furuno units."
  );
  lines.push(
    "Files are emailed within minutes of purchase. Stripe-secured checkout."
  );
  lines.push("");
  lines.push(`Site: ${absoluteUrl()}`);
  lines.push(`Shop: ${absoluteUrl("/maps")}`);
  lines.push(`Compatibility: ${absoluteUrl("/compatibility")}`);
  lines.push(`How it works: ${absoluteUrl("/how-it-works")}`);
  lines.push("");
  lines.push("## Available regional map packs");
  lines.push("");
  for (const p of PRODUCTS.filter((x) => x.status === "live")) {
    lines.push(`### ${p.name}`);
    lines.push(`URL: ${absoluteUrl(`/maps/${p.slug}`)}`);
    lines.push(`Price: $${(p.priceCents / 100).toFixed(2)} USD`);
    lines.push(`Total spots: ${p.spotCount}`);
    lines.push(
      `Inshore ${p.inshoreCount} • Offshore ${p.offshoreCount} • Reefs ${p.reefCount} • Wrecks ${p.wreckCount}`
    );
    lines.push(`Targets: ${p.speciesTargets.join(", ")}`);
    lines.push(`Launch points: ${p.launchPoints.join(", ")}`);
    lines.push(`Description: ${p.description}`);
    lines.push("");
  }
  const soon = PRODUCTS.filter((x) => x.status !== "live");
  if (soon.length) {
    lines.push("## Regions being charted (not yet for sale)");
    lines.push("");
    for (const p of soon) {
      lines.push(
        `- ${p.shortName} — coming soon: ${absoluteUrl(`/maps/${p.slug}`)}`
      );
    }
    lines.push("");
  }
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
