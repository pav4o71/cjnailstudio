import type { ServiceCategoryId } from "@/src/content/site";

export type BookingMode =
  "manual-handoff" | "hosted-redirect" | "embedded-widget" | "custom-scheduler";

export type BookingEntryPoint =
  "home" | "services" | "gallery" | "studio" | "visit" | "book" | "faq";

export type BookingCampaign = "site";

export type BookingIntent = Readonly<{
  entryPoint: BookingEntryPoint;
  serviceCategoryId?: ServiceCategoryId;
  galleryReferenceId?: string;
  campaign?: BookingCampaign;
}>;

export type BookingCapability = Readonly<{
  liveAvailability: boolean;
  customerReschedule: boolean;
  customerCancel: boolean;
  inspirationUpload: boolean;
  paymentOrchestration: boolean;
}>;

export type BookingHandoff =
  | Readonly<{
      kind: "navigate";
      channel: "whatsapp" | "phone" | "walk-in" | "hosted";
      href: URL;
      external: boolean;
    }>
  | Readonly<{
      kind: "unavailable";
      reason: "disabled" | "misconfigured" | "upstream-unavailable";
    }>;

export interface BookingAdapter {
  readonly mode: BookingMode;
  capabilities(): BookingCapability;
  createHandoff(intent: BookingIntent): Promise<BookingHandoff>;
}

export type ManualHandoffs = Readonly<{
  whatsapp: URL;
  phone: URL;
  visit: URL;
}>;

export type BookingView =
  "manual" | "loading" | "unavailable" | "error" | "return";

export const noBookingCapabilities: BookingCapability = {
  liveAvailability: false,
  customerReschedule: false,
  customerCancel: false,
  inspirationUpload: false,
  paymentOrchestration: false,
};

export const bookingEntryPoints = [
  "home",
  "services",
  "gallery",
  "studio",
  "visit",
  "book",
  "faq",
] as const satisfies readonly BookingEntryPoint[];

function digits(e164: string): string {
  return e164.replace(/\D/g, "");
}

export const MANUAL_VISIT_ORIGIN = "https://local.invalid";

export function createManualHandoffs(
  e164: string,
  visitPath = "/visit",
): ManualHandoffs {
  if (!/^\+[1-9]\d{7,14}$/.test(e164)) {
    throw new Error("Invalid canonical E.164 phone number");
  }

  return {
    whatsapp: new URL(`https://wa.me/${digits(e164)}`),
    phone: new URL(`tel:${e164}`),
    visit: new URL(visitPath, MANUAL_VISIT_ORIGIN),
  };
}

export class ManualHandoffAdapter implements BookingAdapter {
  readonly mode = "manual-handoff" as const;

  constructor(private readonly handoffs: ManualHandoffs) {}

  capabilities(): BookingCapability {
    return noBookingCapabilities;
  }

  async createHandoff(intent: BookingIntent): Promise<BookingHandoff> {
    void intent;
    return {
      kind: "navigate",
      channel: "whatsapp",
      href: this.handoffs.whatsapp,
      external: true,
    };
  }
}

export function bookingHref(intent: BookingIntent): string {
  const params = new URLSearchParams();
  if (intent.entryPoint !== "book") {
    params.set("from", intent.entryPoint);
  }
  if (intent.serviceCategoryId) {
    params.set("category", intent.serviceCategoryId);
  }
  if (intent.galleryReferenceId) {
    params.set("gallery", intent.galleryReferenceId);
  }
  if (intent.campaign) {
    params.set("campaign", intent.campaign);
  }
  const query = params.toString();
  return query ? `/book?${query}` : "/book";
}

const unsafeProtocols = new Set(["javascript:", "data:", "vbscript:", "file:"]);

export function isSafeHandoffUrl(
  url: URL,
  allowlist: Readonly<{
    httpsHosts: readonly string[];
    telE164?: string;
  }>,
): boolean {
  if (unsafeProtocols.has(url.protocol)) {
    return false;
  }

  if (url.username || url.password) {
    return false;
  }

  if (url.protocol === "tel:") {
    return allowlist.telE164 ? url.href === `tel:${allowlist.telE164}` : false;
  }

  if (url.protocol !== "https:") {
    return false;
  }

  return allowlist.httpsHosts.includes(url.host);
}

function isSafeWalkInUrl(url: URL): boolean {
  return (
    isSafeHandoffUrl(url, {
      httpsHosts: [new URL(MANUAL_VISIT_ORIGIN).host],
    }) &&
    url.origin === MANUAL_VISIT_ORIGIN &&
    url.pathname.startsWith("/") &&
    !url.pathname.startsWith("//")
  );
}

export function sanitizeHandoff(
  handoff: BookingHandoff,
  allowlist: Readonly<{
    httpsHosts: readonly string[];
    telE164?: string;
  }>,
): BookingHandoff {
  if (handoff.kind === "unavailable") {
    return handoff;
  }

  if (handoff.channel === "whatsapp") {
    return isSafeHandoffUrl(handoff.href, {
      httpsHosts: ["wa.me"],
      telE164: allowlist.telE164,
    })
      ? handoff
      : { kind: "unavailable", reason: "misconfigured" };
  }

  if (handoff.channel === "phone") {
    return isSafeHandoffUrl(handoff.href, allowlist)
      ? handoff
      : { kind: "unavailable", reason: "misconfigured" };
  }

  if (handoff.channel === "walk-in") {
    return isSafeWalkInUrl(handoff.href)
      ? handoff
      : { kind: "unavailable", reason: "misconfigured" };
  }

  return isSafeHandoffUrl(handoff.href, allowlist)
    ? handoff
    : { kind: "unavailable", reason: "misconfigured" };
}

export type BookingResolution = Readonly<{
  view: BookingView;
  hostedHref?: URL;
  unavailableReason?: "disabled" | "misconfigured" | "upstream-unavailable";
}>;

export async function resolveBookingView(input: {
  adapter: BookingAdapter;
  intent: BookingIntent;
  viewHint: BookingView;
  hostedHosts?: readonly string[];
  telE164?: string;
}): Promise<BookingResolution> {
  if (input.viewHint === "return") {
    return { view: "return" };
  }
  if (input.viewHint === "error") {
    return { view: "error" };
  }
  if (input.viewHint === "unavailable") {
    return { view: "unavailable", unavailableReason: "upstream-unavailable" };
  }
  if (input.viewHint === "loading") {
    return { view: "loading" };
  }

  try {
    const handoff = sanitizeHandoff(
      await input.adapter.createHandoff(input.intent),
      {
        httpsHosts: input.hostedHosts ?? [],
        telE164: input.telE164,
      },
    );

    if (handoff.kind === "unavailable") {
      return { view: "unavailable", unavailableReason: handoff.reason };
    }

    if (handoff.channel === "hosted") {
      return {
        view: "unavailable",
        unavailableReason: "disabled",
        hostedHref: handoff.href,
      };
    }

    return { view: "manual" };
  } catch {
    return { view: "error" };
  }
}
