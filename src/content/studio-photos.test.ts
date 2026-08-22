import { existsSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import {
  galleryItems,
  galleryStudioPhotos,
  publishedGalleryItems,
} from "./gallery";
import { pageStudioPhotos, publishedPhotoById } from "./studio-photos";

function mediaFileExists(src: string): boolean {
  return existsSync(join(process.cwd(), "public", src.replace(/^\//, "")));
}

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
          mediaFileExists(item.src),
      ),
    ).toBe(true);
  });

  it("binds the lash look by named photo, not array order", () => {
    const lashLooks = publishedGalleryItems().filter(
      (item) => item.serviceCategoryId === "lashes",
    );

    expect(lashLooks.map((item) => item.id)).toEqual(["look-lashes"]);
    expect(lashLooks[0]?.mediaId).toBe("studio-photo-lashes");
  });

  it("withdraws a page photograph by id instead of throwing", () => {
    expect(publishedPhotoById("studio-photo-hero")?.src).toBe(
      "/media/hero-branded-set.jpg",
    );
    expect(publishedPhotoById("media-023")).toBeUndefined();
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
      expect(mediaFileExists(photo.src)).toBe(true);
    }
  });
});
