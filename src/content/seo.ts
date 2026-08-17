import type { Metadata } from "next";

import { instagramProfileUrl } from "@/src/content/navigation";
import { publicPageList } from "@/src/content/pages";
import { site, type SiteContent } from "@/src/content/site";

export const approvedProductionOrigin = null;

export const robotsPolicy = {
  index: false,
  follow: false,
} as const;

export const launchSitemapPaths = publicPageList.map((page) => page.path);

export const deferredPaths = [
  "/matcha",
  "/team",
  "/reviews",
  "/pricing",
  "/beacon-tower",
] as const;

const verifiedHours = "Open daily, 12:00 noon–9:00 PM";

export type OpeningHoursSpecification = Readonly<{
  "@type": "OpeningHoursSpecification";
  dayOfWeek: readonly [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  opens: "12:00";
  closes: "21:00";
}>;

export function openingHoursSpecification(
  hours: string,
): OpeningHoursSpecification {
  if (hours !== verifiedHours) {
    throw new Error("Unverified hours cannot be serialized to structured data");
  }

  return {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "12:00",
    closes: "21:00",
  };
}

export type LocalBusinessJsonLd = Readonly<{
  "@context": "https://schema.org";
  "@type": "NailSalon";
  name: string;
  telephone: string;
  email: string;
  address: {
    "@type": "PostalAddress";
    streetAddress: string;
    addressLocality: string;
  };
  openingHoursSpecification: OpeningHoursSpecification;
  sameAs: readonly [string, string];
}>;

export function localBusinessJsonLd(
  record: SiteContent = site,
): LocalBusinessJsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "NailSalon",
    name: record.business.name,
    telephone: record.phone.e164,
    email: record.business.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: record.location.address,
      addressLocality: record.location.locality,
    },
    openingHoursSpecification: openingHoursSpecification(record.location.hours),
    sameAs: [
      record.business.facebookUrl,
      instagramProfileUrl(record.business.instagramHandle),
    ],
  };
}

export function sitemapEntries(): [] {
  return [];
}

export function createRouteMetadata(page: {
  path: string;
  title: string;
  description: string;
}): Metadata {
  return {
    title: page.path === "/" ? { absolute: page.title } : page.title,
    description: page.description,
    robots: {
      index: robotsPolicy.index,
      follow: robotsPolicy.follow,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
      },
    },
    openGraph: {
      title: page.title,
      description: page.description,
      type: "website",
      siteName: site.business.name,
      locale: "en",
    },
    twitter: {
      card: "summary",
      title: page.title,
      description: page.description,
    },
  };
}
