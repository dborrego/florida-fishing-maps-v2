import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How Florida Fishing Maps handles your information.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <Container className="py-20">
      <article className="mx-auto max-w-3xl text-foam/80 space-y-5 leading-relaxed">
        <h1 className="font-display text-4xl font-bold text-foam mb-2">
          Privacy Policy
        </h1>
        <p className="text-foam/50 text-sm">Last updated: 2026</p>

        <p>
          We collect the bare minimum needed to deliver your order: your email
          address, your country/state for tax compliance, and the payment
          details Stripe handles directly (we never see your card number).
        </p>

        <h2 className="font-display text-xl font-semibold text-foam mt-6">What we store</h2>
        <p>
          We don't run our own customer database. Your order details (email and
          purchase) live securely with Stripe, our payment processor — that's
          how we verify your purchase and re-send your download link if you
          lose it. We don't sell or rent your data, ever.
        </p>

        <h2 className="font-display text-xl font-semibold text-foam mt-6">Third parties</h2>
        <p>
          Payments: Stripe. Email delivery: Resend. File hosting: Vercel
          Blob. Analytics: Vercel Web Analytics (privacy-respecting, no
          cookies). Each is bound by their own privacy policies.
        </p>

        <h2 className="font-display text-xl font-semibold text-foam mt-6">Your rights</h2>
        <p>
          Email{" "}
          <a className="text-plotter hover:underline" href="mailto:support@floridafishingmaps.com">
            support@floridafishingmaps.com
          </a>{" "}
          to access or delete your data at any time.
        </p>
      </article>
    </Container>
  );
}
