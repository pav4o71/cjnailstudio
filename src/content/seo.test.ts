import { describe, expect, it, vi } from "vitest";

import { instagramProfileUrl } from "./navigation";
import { pageMetadata, publicPageList } from "./pages";
import {
  approvedProductionOrigin,
  createRouteMetadata,
  siteMetadataBase,
  deferredPaths,
  launchSitemapPaths,
  localBusinessJsonLd,
  openingHoursSpecification,
  robotsPolicy,
  sitemapEntries,
} from "./seo";
import { site } from "./site";

describe("indexation until an approved production origin exists", () => {
  it("does not invent a production domain", () => {
    expect(approvedProductionOrigin).toBeNull();
    expect(robotsPolicy.index).toBe(false);
    expect(robotsPolicy.follow).toBe(false);
    expect(sitemapEntries()).toEqual([]);
    expect(siteMetadataBase()).toBeUndefined();
  });

  it("may use a Netlify preview host and never a custom production domain", () => {
    vi.stubEnv("DEPLOY_PRIME_URL", "https://draft--cjnailstudio.netlify.app");
    expect(siteMetadataBase()?.origin).toBe(
      "https://draft--cjnailstudio.netlify.app",
    );

    vi.stubEnv("DEPLOY_PRIME_URL", "https://cjnailstudio.com");
    expect(siteMetadataBase()).toBeUndefined();
    vi.unstubAllEnvs();
    expect(siteMetadataBase()).toBeUndefined();
  });

  it("lists only compact-sitemap launch paths for a future origin-backed sitemap", () => {
    expect(launchSitemapPaths).toEqual(publicPageList.map((page) => page.path));
    expect(deferredPaths).toEqual([
      "/matcha",
      "/team",
      "/reviews",
      "/pricing",
      "/beacon-tower",
    ]);
    expect(launchSitemapPaths).not.toEqual(
      expect.arrayContaining([...deferredPaths]),
    );
  });
});

describe("route metadata", () => {
  it("gives every launch route unique Open Graph copy and a noindex robots policy", () => {
    const routes = publicPageList.map((page) => createRouteMetadata(page));
    const ogTitles = routes.map((route) => route.openGraph?.title);
    const ogDescriptions = routes.map((route) => route.openGraph?.description);

    expect(new Set(ogTitles).size).toBe(routes.length);
    expect(new Set(ogDescriptions).size).toBe(routes.length);

    for (const route of routes) {
      expect(route.description).toBeTruthy();
      expect(route.robots).toMatchObject({ index: false, follow: false });
      expect(route.openGraph).toMatchObject({
        type: "website",
        siteName: site.business.name,
      });
      expect(route.openGraph && "url" in route.openGraph).toBe(false);
      expect(route.metadataBase).toBeUndefined();
      expect(route.openGraph?.images).toEqual([
        {
          url: "/og/studio-share.png",
          width: 1200,
          height: 630,
          alt: "Decorative studio artwork for Beauty Nail Studio by Cj; no customer image is used",
        },
      ]);
      expect(route.twitter).toMatchObject({
        card: "summary_large_image",
        images: ["/og/studio-share.png"],
      });
      expect(route.alternates?.canonical).toBeUndefined();
    }

    expect(createRouteMetadata(pageMetadata.home).title).toEqual({
      absolute: pageMetadata.home.title,
    });
  });
});

describe("verified structured data", () => {
  it("emits NailSalon JSON-LD from the canonical record only", () => {
    const jsonLd = localBusinessJsonLd(site);

    expect(jsonLd["@context"]).toBe("https://schema.org");
    expect(jsonLd["@type"]).toBe("NailSalon");
    expect(jsonLd.name).toBe(site.business.name);
    expect(jsonLd.telephone).toBe(site.phone.e164);
    expect(jsonLd.email).toBe(site.business.email);
    expect(jsonLd.address).toEqual({
      "@type": "PostalAddress",
      streetAddress: site.location.address,
      addressLocality: site.location.locality,
    });
    expect(jsonLd.openingHoursSpecification).toEqual(
      openingHoursSpecification(site.location.hours),
    );
    expect(jsonLd.sameAs).toEqual([
      site.business.facebookUrl,
      instagramProfileUrl(site.business.instagramHandle),
    ]);
  });

  it("omits unverified LocalBusiness fields", () => {
    const serialized = JSON.stringify(localBusinessJsonLd(site));

    expect(serialized).not.toMatch(
      /aggregateRating|priceRange|paymentAccepted|geo|hasMap|menu|Matcha|Beacon|Medical Towers|starRating|image|logo|"url"/i,
    );
    expect(serialized).not.toContain("4.8");
  });

  it("maps only the verified daily hours literal", () => {
    expect(openingHoursSpecification("Open daily, 12:00 noon–9:00 PM")).toEqual(
      {
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
      },
    );
    expect(() => openingHoursSpecification("Open weekdays")).toThrow(
      /unverified hours/i,
    );
  });
});
