import { z } from "zod";

export const allowedAnalyticsEventNames = [
  "book_cta_click",
  "whatsapp_click",
  "phone_click",
  "directions_click",
  "service_view",
  "gallery_filter",
  "gallery_to_book",
  "booking_handoff_started",
  "booking_handoff_failed",
] as const;

export type AnalyticsEventName = (typeof allowedAnalyticsEventNames)[number];

const entryPointSchema = z.enum([
  "home",
  "header",
  "footer",
  "action-bar",
  "services",
  "gallery",
  "studio",
  "visit",
  "faq",
  "book",
  "privacy",
  "terms",
  "custom-nail-art",
  "lashes",
]);

const channelSchema = z.enum(["book", "whatsapp", "phone", "walk-in"]);
const bookingModeSchema = z.enum([
  "manual-handoff",
  "hosted-redirect",
  "embedded-widget",
]);
const serviceCategorySchema = z.enum([
  "nails",
  "custom-nail-art",
  "nail-extensions",
  "biab",
  "soft-gel",
  "lashes",
]);

const analyticsEventSchema = z.discriminatedUnion("name", [
  z
    .object({
      name: z.literal("book_cta_click"),
      properties: z
        .object({
          entryPoint: entryPointSchema,
          channel: channelSchema,
        })
        .strict(),
    })
    .strict(),
  z
    .object({
      name: z.literal("whatsapp_click"),
      properties: z.object({ entryPoint: entryPointSchema }).strict(),
    })
    .strict(),
  z
    .object({
      name: z.literal("phone_click"),
      properties: z.object({ entryPoint: entryPointSchema }).strict(),
    })
    .strict(),
  z
    .object({
      name: z.literal("directions_click"),
      properties: z.object({ entryPoint: entryPointSchema }).strict(),
    })
    .strict(),
  z
    .object({
      name: z.literal("service_view"),
      properties: z
        .object({ serviceCategoryId: serviceCategorySchema })
        .strict(),
    })
    .strict(),
  z
    .object({
      name: z.literal("gallery_filter"),
      properties: z.object({ filter: z.literal("all") }).strict(),
    })
    .strict(),
  z
    .object({
      name: z.literal("gallery_to_book"),
      properties: z.object({ entryPoint: z.literal("gallery") }).strict(),
    })
    .strict(),
  z
    .object({
      name: z.literal("booking_handoff_started"),
      properties: z
        .object({
          mode: bookingModeSchema,
          channel: channelSchema.optional(),
        })
        .strict(),
    })
    .strict(),
  z
    .object({
      name: z.literal("booking_handoff_failed"),
      properties: z
        .object({
          mode: bookingModeSchema,
          channel: channelSchema.optional(),
        })
        .strict(),
    })
    .strict(),
]);

export type AnalyticsEvent = z.infer<typeof analyticsEventSchema>;

export interface AnalyticsPort {
  track(event: unknown): void;
}

export const analyticsDestination = "off" as const;

export function sanitizeAnalyticsEvent(event: unknown): AnalyticsEvent | null {
  const parsed = analyticsEventSchema.safeParse(event);
  return parsed.success ? parsed.data : null;
}

export const noOpAnalytics: AnalyticsPort = {
  track(event) {
    sanitizeAnalyticsEvent(event);
  },
};
