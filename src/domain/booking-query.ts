import { z } from "zod";

import { publishedGalleryItems } from "@/src/content/gallery";
import { site, type ServiceCategoryId } from "@/src/content/site";
import {
  bookingEntryPoints,
  type BookingIntent,
  type BookingView,
} from "@/src/domain/booking";

export type BookingSearchValue = string | string[] | undefined;
export type BookingSearchParams = Record<string, BookingSearchValue>;

const entryPointSchema = z.enum(bookingEntryPoints);
const categorySchema = z.enum([
  "nails",
  "custom-nail-art",
  "nail-extensions",
  "biab",
  "soft-gel",
  "lashes",
]);
const campaignSchema = z.enum(["site"]);

export const redirectQueryKeys = [
  "next",
  "redirect",
  "url",
  "returnUrl",
  "return_url",
  "continue",
  "destination",
  "goto",
  "callback",
  "callbackUrl",
] as const;

export const adapterQueryKeys = ["mode", "bookingMode", "adapter"] as const;

const returnSignalKeys = [
  "return",
  "booking",
  "bookingId",
  "booking_id",
  "appointment",
  "appointmentId",
  "confirmed",
  "confirmation",
] as const;

const errorStatuses = new Set(["error", "fail", "failed", "timeout"]);
const unavailableStatuses = new Set(["unavailable", "disabled", "down"]);
const falseSuccessStatuses = new Set([
  "success",
  "confirmed",
  "complete",
  "completed",
  "booked",
  "ok",
]);

function firstString(value: BookingSearchValue): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
}

function hasKey(search: BookingSearchParams, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(search, key);
}

export function parseBookingIntent(
  search: BookingSearchParams,
  options?: {
    publishedGalleryIds?: readonly string[];
    serviceCategoryIds?: readonly ServiceCategoryId[];
  },
): BookingIntent {
  const entryPoint = entryPointSchema.safeParse(firstString(search.from));
  const category = categorySchema.safeParse(firstString(search.category));
  const campaign = campaignSchema.safeParse(firstString(search.campaign));
  const galleryId = firstString(search.gallery);
  const publishedGalleryIds =
    options?.publishedGalleryIds ??
    publishedGalleryItems().map((item) => item.id);
  const allowedCategories =
    options?.serviceCategoryIds ?? site.services.map((service) => service.id);

  return {
    entryPoint: entryPoint.success ? entryPoint.data : "book",
    serviceCategoryId:
      category.success && allowedCategories.includes(category.data)
        ? category.data
        : undefined,
    galleryReferenceId:
      galleryId && publishedGalleryIds.includes(galleryId)
        ? galleryId
        : undefined,
    campaign: campaign.success ? campaign.data : undefined,
  };
}

export function viewHintFromSearch(search: BookingSearchParams): BookingView {
  const status = firstString(search.status)?.trim().toLowerCase();

  if (status && errorStatuses.has(status)) {
    return "error";
  }
  if (status && unavailableStatuses.has(status)) {
    return "unavailable";
  }
  if (status && falseSuccessStatuses.has(status)) {
    return "return";
  }

  if (returnSignalKeys.some((key) => hasKey(search, key))) {
    return "return";
  }

  return "manual";
}

export function rejectedRedirectTargets(search: BookingSearchParams): string[] {
  return redirectQueryKeys.flatMap((key) => {
    const value = firstString(search[key]);
    return value ? [value] : [];
  });
}

export function requestedAdapterOverride(
  search: BookingSearchParams,
): string | undefined {
  for (const key of adapterQueryKeys) {
    const value = firstString(search[key]);
    if (value) {
      return value;
    }
  }
  return undefined;
}

export type ParsedBookingQuery = Readonly<{
  intent: BookingIntent;
  viewHint: BookingView;
  requestedAdapter?: string;
  rejectedRedirects: string[];
}>;

export function parseBookingQuery(
  search: BookingSearchParams,
): ParsedBookingQuery {
  return {
    intent: parseBookingIntent(search),
    viewHint: viewHintFromSearch(search),
    requestedAdapter: requestedAdapterOverride(search),
    rejectedRedirects: rejectedRedirectTargets(search),
  };
}
