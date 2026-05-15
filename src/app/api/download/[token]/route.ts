import { NextRequest, NextResponse } from "next/server";
import { verifyDownloadToken } from "@/lib/tokens";
import { getProduct, type ChartplotterFormat } from "@/lib/products";
import { resolveDownloadUrl } from "@/lib/blob";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: { token: string } }
) {
  const payload = verifyDownloadToken(params.token);
  if (!payload) {
    return NextResponse.json(
      { error: "This download link is invalid or has expired. Email support@floridafishingmaps.com and we'll send a fresh one." },
      { status: 403 }
    );
  }
  const product = getProduct(payload.slug);
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
  const url = await resolveDownloadUrl(product, payload.format as ChartplotterFormat);
  if (!url) {
    return NextResponse.json(
      {
        error:
          "Your file isn't online yet. Email support@floridafishingmaps.com — we'll get it to you within minutes.",
      },
      { status: 404 }
    );
  }
  // 302 to the signed Vercel Blob URL
  return NextResponse.redirect(url, { status: 302 });
}
