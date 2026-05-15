import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo";
import { FaqJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = buildMetadata({
  title: "FAQ — Florida GPS Fishing Map Questions",
  description:
    "Common questions about loading GPS fishing spots on Garmin, Lowrance, Humminbird, Simrad, Raymarine and Furuno chartplotters.",
  path: "/faq",
});

const FAQS = [
  {
    q: "How fast will I receive my fishing maps?",
    a: "Within minutes of your Stripe payment confirming. Most customers have the email in under 10 minutes. If you don't see it, check spam — the message comes from orders@floridafishingmaps.com.",
  },
  {
    q: "Will these spots work on my chartplotter?",
    a: "Yes — we provide format-specific files for every major brand: Garmin, Lowrance, Humminbird, Simrad, Raymarine, and Furuno. We also include a universal .gpx file and a .kmz for Google Earth.",
  },
  {
    q: "What's actually in a 'spot'?",
    a: "Each spot is a GPS coordinate pair (latitude/longitude) with a label describing the structure type (reef, wreck, ledge, hole), the species it holds, and any notes on tide or season. They load as named waypoints on your chartplotter.",
  },
  {
    q: "Are these public or private fishing spots?",
    a: "A mix. We include all major public reefs and wrecks (these are widely known) plus private numbers gathered by working captains over 20+ years. The private spots are what makes the difference — you won't find them on any chart.",
  },
  {
    q: "Can I share the file with friends?",
    a: "The license is for personal use on your own boats and devices. We track downloads, and re-distribution will trigger a takedown. We keep prices low because we trust customers; please respect that.",
  },
  {
    q: "What if my chartplotter is more than 10 years old?",
    a: "Most older units still accept .gpx import via SD card. Email support@floridafishingmaps.com with your unit's model number and we'll confirm before you buy.",
  },
  {
    q: "Will you add my favorite stretch of coastline?",
    a: "We're constantly adding regions. Email a request to support@floridafishingmaps.com with the area you fish. If we hear it from enough customers, it goes on the roadmap.",
  },
  {
    q: "Can I get a refund?",
    a: "Because these are instant digital downloads, all sales are final once delivered. That said: if you can't load the file on your unit, email support and we'll fix it. We have never had a customer we couldn't get on the water.",
  },
  {
    q: "Do you offer a guarantee that I'll catch fish?",
    a: "No one can guarantee that — fish move, weather changes, sometimes they just don't bite. What we guarantee is that every coordinate has held fish in the past, was verified by working captains, and gives you a starting point that would otherwise take seasons of trial-and-error to build.",
  },
  {
    q: "How do I load the spots on my unit?",
    a: "The download includes a brand-specific PDF guide. The short version: save the file to a blank SD card (any size), plug it into your chartplotter, and use the unit's Import or My Data menu. Most modern units detect the file and prompt you. The whole process is usually 2-3 minutes.",
  },
];

export default function FaqPage() {
  return (
    <>
      <FaqJsonLd faqs={FAQS} />
      <Container>
        <Section
          eyebrow="Frequently asked questions"
          title="Everything captains ask"
        >
          <div className="space-y-3 max-w-3xl">
            {FAQS.map((f) => (
              <details key={f.q} className="glass rounded-lg p-5 group">
                <summary className="cursor-pointer flex items-center justify-between font-display font-semibold text-foam">
                  {f.q}
                  <span className="text-plotter group-open:rotate-45 transition-transform text-xl">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-foam/75 leading-relaxed">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </Section>
      </Container>
    </>
  );
}
