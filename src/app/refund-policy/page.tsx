import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Refund Policy",
  description: "Our refund policy for digital GPS fishing map purchases.",
  path: "/refund-policy",
});

export default function RefundPage() {
  return (
    <Container className="py-20">
      <article className="mx-auto max-w-3xl text-foam/80 space-y-5 leading-relaxed">
        <h1 className="font-display text-4xl font-bold text-foam mb-2">
          Refund Policy
        </h1>
        <p className="text-foam/50 text-sm">Last updated: 2026</p>

        <p>
          Our products are instant digital downloads. Once the file has been
          delivered to your email, the order is considered fulfilled and
          refunds are not available.
        </p>

        <p>
          That said — we want every customer fishing. If you can't get the
          file loaded on your chartplotter, email{" "}
          <a className="text-plotter hover:underline" href="mailto:support@floridafishingmaps.com">
            support@floridafishingmaps.com
          </a>
          {" "}with your unit model and the issue. We'll send the right
          format, walk you through loading it, or in extremely rare
          unsolvable cases issue a refund. We've never had a customer we
          couldn't get on the water.
        </p>
      </article>
    </Container>
  );
}
