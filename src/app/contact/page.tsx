import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo";
import { Mail, MessageSquare, Clock } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Contact Florida Fishing Maps",
  description: "Questions about your purchase, your chartplotter, or a region we should add? Email us — a real person reads every message.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Container>
      <Section
        eyebrow="Contact"
        title="Talk to a human"
        subtitle="Pre-purchase questions, chartplotter compatibility, missing email — we answer every message within 24 hours, usually faster."
      >
        <div className="grid gap-6 md:grid-cols-3 max-w-4xl">
          <ContactCard
            icon={<Mail className="h-6 w-6" />}
            title="Email Support"
            body="support@floridafishingmaps.com"
            link="mailto:support@floridafishingmaps.com"
          />
          <ContactCard
            icon={<MessageSquare className="h-6 w-6" />}
            title="Order Issues"
            body="orders@floridafishingmaps.com"
            link="mailto:orders@floridafishingmaps.com"
          />
          <ContactCard
            icon={<Clock className="h-6 w-6" />}
            title="Response Time"
            body="Within 24 hours, 7 days a week"
          />
        </div>
      </Section>
    </Container>
  );
}

function ContactCard({
  icon,
  title,
  body,
  link,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  link?: string;
}) {
  const content = (
    <>
      <div className="text-plotter mb-3">{icon}</div>
      <div className="font-display font-semibold text-foam mb-1">{title}</div>
      <div className="text-sm text-foam/70 break-all">{body}</div>
    </>
  );
  return link ? (
    <a href={link} className="glass rounded-xl p-6 block hover:border-plotter/40 transition">
      {content}
    </a>
  ) : (
    <div className="glass rounded-xl p-6">{content}</div>
  );
}
