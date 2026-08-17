import { describe, expect, it } from "vitest";

import { instagramProfileUrl } from "./navigation";
import { pageMetadata, publicPageList } from "./pages";
import {
  approvedProductionOrigin,
  createRouteMetadata,
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
      expect(route.openGraph?.images).toBeUndefined();
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
