import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { RegionCard } from "@/components/product/RegionCard";
import { PRODUCTS } from "@/lib/products";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = buildMetadata({
  title: "All Florida GPS Fishing Maps — Every Region",
  description:
    "Browse every Florida GPS fishing map pack. Inshore, offshore, reef, wreck and ledge spots for the Keys, Tampa Bay, Miami, Panhandle, Jacksonville, Everglades, Fort Lauderdale and the Indian River Lagoon.",
  path: "/maps",
});

export default function MapsPage() {
  return (
    <Container>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "/" },
        { name: "Shop Maps", url: "/maps" },
      ]} />
      <Section
        eyebrow={`${PRODUCTS.length} regions • 1,855+ verified spots`}
        title="Every Florida fishing map we've built"
        subtitle="Pick your region. Every pack includes inshore, offshore, reef and wreck spots — and a file format for every chartplotter."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p) => (
            <RegionCard key={p.slug} product={p} />
          ))}
        </div>
      </Section>
    </Container>
  );
}
