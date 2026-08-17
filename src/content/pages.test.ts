import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import {
  blockedClaimPattern,
  inventedClaimSamples,
  pinnedSourceBackedCopy,
  verifiedSafeClaimSamples,
} from "./claim-guards";
import { allowedSourceIds } from "./evidence";
import { faqs } from "./faq";
import { galleryItems, publishedGalleryItems } from "./gallery";
import {
  pageCopy,
  pageMetadata,
  privacySections,
  publicPageList,
  resultChooser,
  reviewThemes,
  termsSections,
} from "./pages";
import { site } from "./site";

const visiblePropPattern =
  /(?:eyebrow|heading|title|label|actionLabel|description|aria-label)=["']([^"']+)["']/g;
const jsxTextPattern = />([^<>{]+)</g;

function collectCopy(): string[] {
  return [
    ...Object.values(pageMetadata).flatMap((page) => [
      page.title,
      page.description,
      page.h1,
    ]),
    ...Object.values(pageCopy).map((block) => block.text),
    ...resultChooser.map((option) => option.label),
    ...reviewThemes.flatMap((theme) => [
      theme.heading,
      theme.text,
      theme.attribution,
    ]),
    ...faqs.flatMap((item) => [item.question, item.answer.text]),
    ...privacySections.map((section) => section.text),
    ...termsSections.map((section) => section.text),
    ...site.services.map((service) => service.label),
    site.location.address,
    site.location.hours,
    ...galleryItems.map((item) => item.altText),
  ];
}

function listPageModules(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      return listPageModules(path);
    }
    return entry.name === "page.tsx" ? [path] : [];
  });
}

function visibleStringsFromSource(source: string): string[] {
  return [
    ...source.matchAll(visiblePropPattern),
    ...source.matchAll(jsxTextPattern),
  ]
    .map((match) => match[1]?.replace(/\s+/g, " ").trim())
    .filter((value): value is string => Boolean(value));
}

function citedSourceIds(): string[] {
  return [
    ...Object.values(pageCopy).flatMap((block) => block.evidence.sourceIds),
    ...reviewThemes.flatMap((theme) => theme.evidence.sourceIds),
    ...faqs.flatMap((item) => item.answer.evidence.sourceIds),
    ...privacySections.flatMap((section) => section.evidence.sourceIds),
    ...termsSections.flatMap((section) => section.evidence.sourceIds),
    ...site.business.evidence.sourceIds,
    ...site.location.evidence.sourceIds,
    ...site.phone.evidence.sourceIds,
    ...site.walkIns.evidence.sourceIds,
    ...site.services.flatMap((service) => service.evidence.sourceIds),
  ];
}

function galleryPageHasPublishedRenderer(source: string): boolean {
  return /published\.map\s*\(/.test(source);
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
      for (const sourceId of block.evidence.sourceIds) {
        expect(allowedSourceIds).toContain(sourceId);
      }
    }

    for (const sourceId of citedSourceIds()) {
      expect(allowedSourceIds).toContain(sourceId);
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

  it("catches high-risk invented claims without false-positing verified copy", () => {
    for (const sample of inventedClaimSamples) {
      expect(sample).toMatch(blockedClaimPattern);
    }

    for (const sample of verifiedSafeClaimSamples) {
      expect(sample).not.toMatch(blockedClaimPattern);
    }

    for (const text of collectCopy()) {
      expect(text).not.toMatch(blockedClaimPattern);
    }

    const pageModules = listPageModules(join(process.cwd(), "app"));
    expect(pageModules.length).toBeGreaterThan(0);
    for (const file of pageModules) {
      for (const text of visibleStringsFromSource(readFileSync(file, "utf8"))) {
        expect(text).not.toMatch(blockedClaimPattern);
      }
    }
  });

  it("attributes hygiene and review themes instead of stating them as guarantees", () => {
    expect(pageCopy.hygiene.text).toBe(pinnedSourceBackedCopy.hygieneSummary);
    expect(pageCopy.walkIn.text).toBe(pinnedSourceBackedCopy.walkInCaveat);
    expect(site.services.map((service) => service.label)).toEqual([
      ...pinnedSourceBackedCopy.categoryLabels,
    ]);
    expect(reviewThemes.map((theme) => theme.heading)).toEqual([
      ...pinnedSourceBackedCopy.reviewThemeHeadings,
    ]);
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

  it("reuses the walk-in caveat instead of a parallel FAQ answer", () => {
    const walkInFaq = faqs.find((item) => item.id === "are-walk-ins-accepted");
    expect(walkInFaq?.answer.text).toBe(pageCopy.walkIn.text);
    expect(walkInFaq?.answer.evidence).toEqual(pageCopy.walkIn.evidence);
  });

  it("does not publish retained gallery media without rights and consent", () => {
    const galleryPageSource = readFileSync(
      join(process.cwd(), "app/gallery/page.tsx"),
      "utf8",
    );
    const published = publishedGalleryItems();

    expect(galleryItems.length).toBeGreaterThan(0);
    expect(
      galleryItems.every(
        (item) =>
          item.status !== "published" && item.publishability === "blocked",
      ),
    ).toBe(true);
    expect(galleryItems.some((item) => item.mediaId === "media-023")).toBe(
      true,
    );

    if (published.length > 0) {
      expect(galleryPageHasPublishedRenderer(galleryPageSource)).toBe(true);
    } else {
      expect(published).toEqual([]);
      expect(galleryPageSource).toMatch(/published\.length === 0/);
      expect(galleryPageSource).toContain("Website gallery in preparation");
      expect(galleryPageHasPublishedRenderer(galleryPageSource)).toBe(false);
    }
  });
});
