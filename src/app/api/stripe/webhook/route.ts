import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { getProduct, FORMAT_CATALOG, type ChartplotterFormat } from "@/lib/products";
import { signDownloadToken } from "@/lib/tokens";
import { sendOrderEmail, sendAdminNotification } from "@/lib/email";
import { absoluteUrl } from "@/lib/utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!sig || !secret) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const body = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "bad signature";
    // eslint-disable-next-line no-console
    console.error("[webhook] sig verify failed", msg);
    return NextResponse.json({ error: `Webhook Error: ${msg}` }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      await fulfill(session);
    }
    return NextResponse.json({ received: true });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("[webhook] fulfill error", e);
    return NextResponse.json({ error: "fulfillment failed" }, { status: 500 });
  }
}

async function fulfill(session: Stripe.Checkout.Session) {
  const md = session.metadata || {};
  const slug = md.slug;
  const format = md.format as ChartplotterFormat | undefined;
  if (!slug || !format) {
    // eslint-disable-next-line no-console
    console.error("[fulfill] missing metadata", md);
    return;
  }
  const product = getProduct(slug);
  if (!product) {
    // eslint-disable-next-line no-console
    console.error("[fulfill] unknown product", slug);
    return;
  }
  const customerEmail =
    session.customer_details?.email || session.customer_email || md.email;
  if (!customerEmail) {
    // eslint-disable-next-line no-console
    console.error("[fulfill] no customer email on session", session.id);
    return;
  }

  const ttl = Number(process.env.DOWNLOAD_TOKEN_TTL_HOURS || 720); // 30 days
  const token = signDownloadToken({
    slug,
    format,
    oid: session.id,
    ttlHours: ttl,
  });
  const downloadUrl = absoluteUrl(`/api/download/${token}`);

  const formatLabel = FORMAT_CATALOG[format].label;

  await Promise.all([
    sendOrderEmail({
      to: customerEmail,
      productName: product.name,
      formatLabel,
      spotCount: product.spotCount,
      downloadUrl,
      expiresHours: ttl,
    }),
    sendAdminNotification({
      productName: product.name,
      formatLabel,
      customerEmail,
      amountCents: session.amount_total ?? product.priceCents,
      oid: session.id,
    }),
  ]);
}
