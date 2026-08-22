import { existsSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { galleryItems, publishedGalleryItems } from "./gallery";
import {
  galleryStudioPhotos,
  pageStudioPhotos,
  studioPhotoFileExists,
} from "./studio-photos";

describe("owner-cleared studio photos", () => {
  it("keeps published looks on local /media files with new ids", () => {
    const published = publishedGalleryItems();

    expect(published.length).toBe(galleryStudioPhotos.length);
    expect(
      published.every(
        (item) =>
          item.src &&
          /^\/media\/[a-z0-9-]+\.jpg$/.test(item.src) &&
          item.mediaId.startsWith("studio-photo-") &&
          !/media-0(0[1-9]|[12][0-9]|30)/.test(item.src) &&
          !/media-0(0[1-9]|[12][0-9]|30)/.test(item.mediaId) &&
          studioPhotoFileExists(item.src),
      ),
    ).toBe(true);
  });

  it("leaves retained social-manifest candidates unpublished", () => {
    const planning = galleryItems.filter((item) =>
      /^media-0(0[1-9]|[12][0-9]|30)$/.test(item.mediaId),
    );

    expect(planning.length).toBeGreaterThan(0);
    expect(
      planning.every(
        (item) =>
          item.status !== "published" && item.publishability === "blocked",
      ),
    ).toBe(true);
  });

  it("stores page photographs beside the gallery set", () => {
    for (const photo of [...pageStudioPhotos, ...galleryStudioPhotos]) {
      expect(studioPhotoFileExists(photo.src)).toBe(true);
      expect(
        existsSync(join(process.cwd(), "public", photo.src.slice(1))),
      ).toBe(true);
    }
  });
});
