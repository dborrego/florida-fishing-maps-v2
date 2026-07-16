import { absoluteUrl } from "@/lib/utils";
import type { RegionProduct } from "@/lib/products";

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Florida Fishing Maps",
        url: absoluteUrl(),
        logo: absoluteUrl("/logo.png"),
        sameAs: [],
        contactPoint: {
          "@type": "ContactPoint",
          email: "support@floridafishingmaps.com",
          contactType: "customer support",
          areaServed: "US",
          availableLanguage: ["en"],
        },
      }}
    />
  );
}

export function WebsiteJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Florida Fishing Maps",
        url: absoluteUrl(),
        potentialAction: {
          "@type": "SearchAction",
          target: `${absoluteUrl()}/maps?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      }}
    />
  );
}

export function ProductJsonLd({ product }: { product: RegionProduct }) {
  const url = absoluteUrl(`/maps/${product.slug}`);
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description: product.description,
        sku: product.slug,
        brand: { "@type": "Brand", name: "Florida Fishing Maps" },
        category: "GPS Fishing Maps",
        image: [product.heroImage],
        // NOTE: no aggregateRating on purpose — review markup is only allowed
        // once real, on-site customer reviews exist (Google policy).
        offers:
          product.status === "live"
            ? {
                "@type": "Offer",
                url,
                priceCurrency: "USD",
                price: (product.priceCents / 100).toFixed(2),
                availability: "https://schema.org/InStock",
                itemCondition: "https://schema.org/NewCondition",
                seller: { "@type": "Organization", name: "Florida Fishing Maps" },
              }
            : undefined,
      }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: absoluteUrl(item.url),
        })),
      }}
    />
  );
}

export function FaqJsonLd({ faqs }: { faqs: { q: string; a: string }[] }) {
  if (!faqs.length) return null;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }}
    />
  );
}

export function LocalBusinessJsonLd({ product }: { product: RegionProduct }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "GPS Fishing Maps",
        provider: {
          "@type": "Organization",
          name: "Florida Fishing Maps",
          url: absoluteUrl(),
        },
        areaServed: {
          "@type": "Place",
          name: `${product.city}, Florida`,
          address: {
            "@type": "PostalAddress",
            addressRegion: "FL",
            addressCountry: "US",
            addressLocality: product.city,
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: product.center.lat,
            longitude: product.center.lng,
          },
        },
      }}
    />
  );
}
