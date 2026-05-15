import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  // Don't throw at import time — this lets `next build` succeed without secrets.
  // Routes that need Stripe will fail fast at request time instead.
  // eslint-disable-next-line no-console
  console.warn("[stripe] STRIPE_SECRET_KEY is not set");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
  apiVersion: "2024-11-20.acacia",
  typescript: true,
});
