import { describe, expect, it } from "vitest";

import { mapsSearchUrl, site } from "./site";

describe("canonical site content", () => {
  it("keeps the verified contact details in one record", () => {
    expect(site.phone.e164).toBe("+639617400664");
    expect(site.location.address).toContain("Knightsbridge Residences");
    expect(site.location.hours).toBe("Open daily, 12:00 noon–9:00 PM");
    expect(site.walkIns.accepted).toBe(true);
    expect(site.business.facebookUrl).toBe(
      "https://www.facebook.com/p/Beauty-Nail-Studio-by-Cj-61568532466562/",
    );
  });

  it("contains only broad verified service categories", () => {
    expect(site.services).toHaveLength(6);
    expect(site.services.map((service) => service.id)).toEqual([
      "nails",
      "custom-nail-art",
      "nail-extensions",
      "biab",
      "soft-gel",
      "lashes",
    ]);
    expect(JSON.stringify(site)).not.toMatch(
      /price|duration|deposit|availability|payment/i,
    );
  });

  it("builds a neutral Google Maps search URL from the canonical address", () => {
    const href = mapsSearchUrl(site.location.address);
    expect(href.startsWith("https://www.google.com/maps/search/")).toBe(true);
    expect(new URL(href).searchParams.get("query")).toBe(site.location.address);
  });
});
