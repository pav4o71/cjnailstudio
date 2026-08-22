import { z } from "zod";

import { capturedAt } from "@/src/content/evidence";
import type { ServiceCategoryId } from "@/src/content/site";
import {
  ownerMediaCapturedAt,
  studioPhotos,
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

    if (!item.mediaId.startsWith("studio-photo-")) {
      ctx.addIssue({
        code: "custom",
        message: "Published gallery items must use studio-photo ids.",
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

const publishedLooks: ReadonlyArray<{
  photo: StudioPhotoRecord;
  serviceCategoryId: ServiceCategoryId;
}> = [
  { photo: studioPhotos.rose, serviceCategoryId: "custom-nail-art" },
  { photo: studioPhotos.laceBow, serviceCategoryId: "custom-nail-art" },
  { photo: studioPhotos.goldLeaf, serviceCategoryId: "custom-nail-art" },
  { photo: studioPhotos.redChrome, serviceCategoryId: "custom-nail-art" },
  { photo: studioPhotos.pink, serviceCategoryId: "custom-nail-art" },
  { photo: studioPhotos.rhinestone, serviceCategoryId: "custom-nail-art" },
  { photo: studioPhotos.customNailArt, serviceCategoryId: "custom-nail-art" },
  { photo: studioPhotos.lashes, serviceCategoryId: "lashes" },
];

export const galleryStudioPhotos = publishedLooks
  .filter((look) => look.photo.status === "published")
  .map((look) => look.photo);

export const galleryItems = z
  .array(galleryItemSchema)
  .parse([
    ...publishedLooks
      .filter((look) => look.photo.status === "published")
      .map((look) => publishedLook(look.photo, look.serviceCategoryId)),
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
