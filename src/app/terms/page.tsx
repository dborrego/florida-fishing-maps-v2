import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description: "Florida Fishing Maps terms of service.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <Container className="py-20">
      <article className="mx-auto max-w-3xl text-foam/80 space-y-5 leading-relaxed">
        <h1 className="font-display text-4xl font-bold text-foam mb-2">
          Terms of Service
        </h1>
        <p className="text-foam/50 text-sm">Last updated: 2026</p>

        <h2 className="font-display text-xl font-semibold text-foam mt-8">License</h2>
        <p>
          When you purchase a Florida Fishing Maps product, you receive a
          non-exclusive, non-transferable license to use the GPS coordinates
          on your personal devices and vessels. Redistribution, reselling, or
          public posting of the files is prohibited.
        </p>

        <h2 className="font-display text-xl font-semibold text-foam mt-8">No Warranty</h2>
        <p>
          The GPS coordinates and supplemental information are provided "as
          is." Conditions on the water — depth changes, debris, weather — are
          your responsibility. Always verify your surroundings, follow safe
          boating practices, and respect federal, state, and local fishing
          regulations.
        </p>

        <h2 className="font-display text-xl font-semibold text-foam mt-8">Conservation</h2>
        <p>
          Florida's fisheries are a public resource. Practice catch and
          release where appropriate, follow size and bag limits, and avoid
          spot-burning by sharing responsibly. Sustainable fishing keeps these
          spots productive for future generations.
        </p>

        <h2 className="font-display text-xl font-semibold text-foam mt-8">Limitation of Liability</h2>
        <p>
          Florida Fishing Maps is not liable for any loss, damage, or injury
          resulting from use of the products. You assume all risk associated
          with marine activities.
        </p>

        <h2 className="font-display text-xl font-semibold text-foam mt-8">Contact</h2>
        <p>
          Questions about these terms? Email{" "}
          <a className="text-plotter hover:underline" href="mailto:support@floridafishingmaps.com">
            support@floridafishingmaps.com
          </a>
          .
        </p>
      </article>
    </Container>
  );
}
