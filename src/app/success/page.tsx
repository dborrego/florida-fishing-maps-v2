import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/seo";
import { CheckCircle2, Mail } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Order Confirmed — Check Your Email",
  description: "Your Florida Fishing Maps order is confirmed. Your download link is on its way to your inbox.",
  path: "/success",
  noIndex: true,
});

export default function SuccessPage() {
  return (
    <Container className="py-32">
      <div className="mx-auto max-w-2xl glass rounded-2xl p-10 text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-sonar/10 text-sonar mb-6">
          <CheckCircle2 className="h-9 w-9" />
        </div>
        <h1 className="font-display text-4xl font-bold text-foam mb-3">
          You're locked in.
        </h1>
        <p className="text-foam/75 leading-relaxed">
          Your payment is confirmed. We've just sent your download link to the
          email you used at checkout. It usually arrives within a minute — if
          you don't see it after 10 minutes, check spam (look for{" "}
          <span className="font-mono text-plotter">orders@floridafishingmaps.com</span>)
          or email{" "}
          <a href="mailto:support@floridafishingmaps.com" className="text-plotter hover:underline">
            support@floridafishingmaps.com
          </a>
          .
        </p>

        <div className="mt-8 inline-flex items-center gap-2 text-sm text-foam/60">
          <Mail className="h-4 w-4 text-plotter" />
          Delivery in progress
        </div>

        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          <ButtonLink href="/maps" variant="secondary">
            Browse More Regions
          </ButtonLink>
          <ButtonLink href="/compatibility" variant="ghost">
            Loading Instructions
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
