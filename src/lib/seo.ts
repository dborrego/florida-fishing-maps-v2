import type { Metadata } from "next";
import { absoluteUrl } from "./utils";

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "Florida Fishing Maps";
const DEFAULT_DESC =
  "GPS fishing spot maps for every chartplotter — Garmin, Lowrance, Humminbird, Simrad, Raymarine, Furuno. Inshore, offshore, reefs and wrecks across Florida. Delivered in minutes.";

export function buildMetadata({
  title,
  description = DEFAULT_DESC,
  path = "/",
  image,
  noIndex = false,
}: {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image || absoluteUrl("/og-default.png");
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(absoluteUrl()),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}
