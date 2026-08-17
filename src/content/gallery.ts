import { z } from "zod";

import { capturedAt } from "@/src/content/evidence";
import type { ServiceCategoryId } from "@/src/content/site";

const galleryItemSchema = z.object({
  id: z.string().min(1),
  mediaId: z.string().min(1),
  status: z.enum(["draft", "blocked", "published"]),
  rightsStatus: z.enum(["planning_only", "cleared"]),
  consentStatus: z.enum(["undocumented", "cleared"]),
  altText: z.string().min(1),
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

export const galleryItems = z
  .array(galleryItemSchema)
  .parse([
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
