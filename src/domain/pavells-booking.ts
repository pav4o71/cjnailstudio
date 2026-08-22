import { z } from "zod";

export const PAVELLS_BOOKING_ORIGIN = "https://booking.pavells.com";
export const PAVELLS_WIDGET_MOUNT_ID = "pavells-booking";
export const PAVELLS_BUSINESS_SLUG = "beauty-nail-studio-by-cj2";
export const PAVELLS_EMBED_INTEGRATION_KEY = "pavells-booking";

const slugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

export type PavellsBookingConfig = Readonly<{
  origin: string;
  businessSlug: string;
  mountId: string;
  scriptSrc: string;
  embedSrc: string;
}>;

export type PavellsWidgetMount = Readonly<{
  mountId: string;
  businessSlug: string;
  scriptSrc: string;
}>;

export function pavellsWidgetMount(
  config: PavellsBookingConfig,
): PavellsWidgetMount {
  return {
    mountId: config.mountId,
    businessSlug: config.businessSlug,
    scriptSrc: config.scriptSrc,
  };
}

export function readPavellsBookingConfig(
  input: {
    origin?: string;
    businessSlug?: string;
  } = {},
): PavellsBookingConfig | null {
  const originRaw = input.origin ?? PAVELLS_BOOKING_ORIGIN;
  const slug = input.businessSlug ?? PAVELLS_BUSINESS_SLUG;
  if (!slugSchema.safeParse(slug).success) {
    return null;
  }

  let originUrl: URL;
  try {
    originUrl = new URL(originRaw);
  } catch {
    return null;
  }

  if (
    originUrl.protocol !== "https:" ||
    originUrl.hostname !== "booking.pavells.com" ||
    originUrl.port !== "" ||
    originUrl.username !== "" ||
    originUrl.password !== ""
  ) {
    return null;
  }

  return {
    origin: originUrl.origin,
    businessSlug: slug,
    mountId: PAVELLS_WIDGET_MOUNT_ID,
    scriptSrc: new URL("/api/public/widget.js", originUrl).href,
    embedSrc: `${new URL(`/b/${slug}`, originUrl).href}?embed=1`,
  };
}
