import { z } from "zod";

import { capturedAt } from "@/src/content/evidence";
import type { ServiceCategoryId } from "@/src/content/site";
import {
  galleryStudioPhotos,
  ownerMediaCapturedAt,
  type StudioPhotoRecord,
} from "@/src/content/studio-photos";

const galleryItemSchema = z
  .object({
    id: z.string().min(1),
    mediaId: z.string().min(1),
    status: z.enum(["draft", "blocked", "published"]),
    rightsStatus: z.enum(["planning_only", "cleared"]),
    consentStatus: z.enum(["undocumented", "cleared"]),
    altText: z.string().min(1),
    src: z
      .string()
      .regex(/^\/media\/[a-z0-9-]+\.jpg$/)
      .optional(),
    width: z.number().int().positive().optional(),
    height: z.number().int().positive().optional(),
    serviceCategoryId: z
      .enum([
        "nails",
        "custom-nail-art",
        "nail-extensions",
        "biab",
        "soft-gel",
        "lashes",
      ])
      .optional(),
    capturedAt: z.string().min(1),
    publishability: z.enum(["blocked", "publishable"]),
  })
  .superRefine((item, ctx) => {
    if (item.status !== "published") {
      return;
    }

    if (!item.src || !item.width || !item.height) {
      ctx.addIssue({
        code: "custom",
        message: "Published gallery items need a local image source and size.",
      });
    }
  });

export type GalleryItem = z.infer<typeof galleryItemSchema>;

const planningItem = (
  id: string,
  mediaId: string,
  serviceCategoryId?: ServiceCategoryId,
): GalleryItem =>
  galleryItemSchema.parse({
    id,
    mediaId,
    status: "blocked",
    rightsStatus: "planning_only",
    consentStatus: "undocumented",
    altText: "Planning-only portfolio candidate; not published.",
    serviceCategoryId,
    capturedAt,
    publishability: "blocked",
  });

const publishedLook = (
  photo: StudioPhotoRecord,
  serviceCategoryId: ServiceCategoryId,
): GalleryItem =>
  galleryItemSchema.parse({
    id: `look-${photo.id.replace(/^studio-photo-/, "")}`,
    mediaId: photo.id,
    status: "published",
    rightsStatus: "cleared",
    consentStatus: "cleared",
    altText: photo.alt,
    src: photo.src,
    width: photo.width,
    height: photo.height,
    serviceCategoryId,
    capturedAt: ownerMediaCapturedAt,
    publishability: "publishable",
  });

export const galleryItems = z
  .array(galleryItemSchema)
  .parse([
    publishedLook(galleryStudioPhotos[0], "custom-nail-art"),
    publishedLook(galleryStudioPhotos[1], "custom-nail-art"),
    publishedLook(galleryStudioPhotos[2], "custom-nail-art"),
    publishedLook(galleryStudioPhotos[3], "custom-nail-art"),
    publishedLook(galleryStudioPhotos[4], "custom-nail-art"),
    publishedLook(galleryStudioPhotos[5], "custom-nail-art"),
    publishedLook(galleryStudioPhotos[6], "custom-nail-art"),
    publishedLook(galleryStudioPhotos[7], "lashes"),
    planningItem("gallery-media-011", "media-011", "custom-nail-art"),
    planningItem("gallery-media-012", "media-012", "custom-nail-art"),
    planningItem("gallery-media-013", "media-013", "custom-nail-art"),
    planningItem("gallery-media-015", "media-015", "custom-nail-art"),
    planningItem("gallery-media-023", "media-023", "lashes"),
    planningItem("gallery-media-029", "media-029", "custom-nail-art"),
  ]);

export function publishedGalleryItems(
  items: readonly GalleryItem[] = galleryItems,
): GalleryItem[] {
  return items.filter(
    (item) =>
      item.status === "published" &&
      item.rightsStatus === "cleared" &&
      item.consentStatus === "cleared" &&
      item.publishability === "publishable",
  );
}

export function previewGalleryItems(
  items: readonly GalleryItem[] = galleryItems,
): GalleryItem[] {
  return publishedGalleryItems(items).slice(0, 3);
}
