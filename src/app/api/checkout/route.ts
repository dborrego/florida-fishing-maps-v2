import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { stripe } from "@/lib/stripe";
import { getProduct, FORMAT_CATALOG } from "@/lib/products";
import { absoluteUrl } from "@/lib/utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const Body = z.object({
  slug: z.string().min(1),
  format: z.enum([
    "garmin",
    "lowrance",
    "humminbird",
    "simrad",
    "raymarine",
    "furuno",
    "navionics-mobile",
    "google-earth",
  ]),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = Body.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
    const { slug, format } = parsed.data;
    const product = getProduct(slug);
    if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });

    const formatInfo = FORMAT_CATALOG[format];

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: product.priceCents,
            product_data: {
              name: product.name,
              description: `${product.spotCount} GPS-verified spots • Packaged for ${formatInfo.label}`,
              metadata: { slug, format },
            },
          },
        },
      ],
      metadata: { slug, format, formatLabel: formatInfo.label },
      success_url: `${absoluteUrl("/success")}?sid={CHECKOUT_SESSION_ID}`,
      cancel_url: absoluteUrl(`/maps/${slug}`),
      automatic_tax: { enabled: false },
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      customer_creation: "always",
    });

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Checkout failed";
    // eslint-disable-next-line no-console
    console.error("[checkout]", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
