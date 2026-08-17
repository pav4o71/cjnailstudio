import { describe, expect, it } from "vitest";

import { site } from "./site";
import {
  desktopBookCta,
  desktopPrimaryNav,
  footerDocumentNav,
  instagramProfileUrl,
  mobileMenuNav,
  publicLocationLabel,
} from "./navigation";

describe("approved sitemap chrome", () => {
  it("keeps desktop, mobile and footer labels aligned with docs/SITEMAP.md", () => {
    expect(desktopPrimaryNav.map((item) => item.label)).toEqual([
      "Services",
      "Gallery",
      "Studio",
      "Visit",
    ]);
    expect(desktopBookCta).toEqual({ href: "/book", label: "Book" });
    expect(mobileMenuNav.map((item) => item.label)).toEqual([
      "Home",
      "Services",
      "Custom Nail Art",
      "Lashes",
      "Gallery",
      "Studio",
      "Visit",
      "FAQ",
      "Book",
    ]);
    expect(footerDocumentNav.map((item) => item.label)).toEqual([
      "FAQ",
      "Privacy",
      "Terms",
    ]);
  });

  it("derives public location and Instagram URL from the canonical record", () => {
    expect(publicLocationLabel).toBe("Knightsbridge Residences · Makati City");
    expect(site.location.address).toContain("Knightsbridge Residences");
    expect(instagramProfileUrl(site.business.instagramHandle)).toBe(
      "https://www.instagram.com/beautynailstudiobycj/",
    );
  });
});
