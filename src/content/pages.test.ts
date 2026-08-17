import { describe, expect, it } from "vitest";

import { faqs } from "./faq";
import { galleryItems, publishedGalleryItems } from "./gallery";
import {
  pageCopy,
  pageMetadata,
  privacySections,
  publicPageList,
  reviewThemes,
  termsSections,
} from "./pages";

const blockedClaimPattern =
  /₱|\bphp\b|gcash|deposit|matcha|beacon tower|medical towers|autoclave|\brufa\b|\bkris\b|loyalty|gift card|membership/i;

function collectCopy(): string[] {
  return [
    ...Object.values(pageMetadata).flatMap((page) => [
      page.title,
      page.description,
      page.h1,
    ]),
    ...Object.values(pageCopy).map((block) => block.text),
    ...reviewThemes.flatMap((theme) => [
      theme.heading,
      theme.text,
      theme.attribution,
    ]),
    ...faqs.flatMap((item) => [item.question, item.answer.text]),
    ...privacySections.map((section) => section.text),
    ...termsSections.map((section) => section.text),
  ];
}

describe("public page metadata", () => {
  it("gives every launch route a unique title, description and h1", () => {
    const titles = publicPageList.map((page) => page.title);
    const descriptions = publicPageList.map((page) => page.description);
    const headings = publicPageList.map((page) => page.h1);

    expect(new Set(titles).size).toBe(titles.length);
    expect(new Set(descriptions).size).toBe(descriptions.length);
    expect(new Set(headings).size).toBe(headings.length);
    expect(publicPageList.map((page) => page.path)).toEqual([
      "/",
      "/services",
      "/services/custom-nail-art",
      "/services/lashes",
      "/gallery",
      "/studio",
      "/visit",
      "/faq",
      "/book",
      "/privacy",
      "/terms",
    ]);
  });
});

describe("claim and media traceability", () => {
  it("keeps every published copy block on an allowed source id", () => {
    const blocks = [
      ...Object.values(pageCopy),
      ...reviewThemes.map((theme) => ({
        id: theme.id,
        evidence: theme.evidence,
      })),
      ...faqs.map((item) => item.answer),
      ...privacySections,
      ...termsSections,
    ];

    for (const block of blocks) {
      expect(block.evidence.sourceIds.length).toBeGreaterThan(0);
      expect(block.evidence.capturedAt).toBeTruthy();
    }

    const googleMapsUses = blocks.filter((block) =>
      block.evidence.sourceIds.includes("google-maps"),
    );
    expect(googleMapsUses.length).toBeGreaterThan(0);
    expect(
      googleMapsUses.every(
        (block) => block.evidence.evidenceClass === "customer_opinion",
      ),
    ).toBe(true);
  });

  it("omits invented commercial, location and staff claims", () => {
    for (const text of collectCopy()) {
      expect(text).not.toMatch(blockedClaimPattern);
    }
  });

  it("attributes hygiene and review themes instead of stating them as guarantees", () => {
    expect(pageCopy.hygiene.text).toMatch(/official studio post says/i);
    expect(pageCopy.hygiene.evidence.evidenceClass).toBe(
      "official_content_claim",
    );
    expect(
      reviewThemes.every((theme) =>
        /not a studio promise/i.test(theme.attribution),
      ),
    ).toBe(true);
  });

  it("does not publish retained gallery media without rights and consent", () => {
    expect(galleryItems.length).toBeGreaterThan(0);
    expect(
      galleryItems.every(
        (item) =>
          item.status !== "published" && item.publishability === "blocked",
      ),
    ).toBe(true);
    expect(publishedGalleryItems()).toEqual([]);
    expect(galleryItems.some((item) => item.mediaId === "media-023")).toBe(
      true,
    );
  });
});
