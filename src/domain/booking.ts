import type { ServiceCategoryId } from "@/src/content/site";

export type BookingMode =
  "manual-handoff" | "hosted-redirect" | "embedded-widget" | "custom-scheduler";

export type BookingIntent = Readonly<{
  entryPoint: "home" | "services" | "gallery" | "studio" | "visit" | "book";
  serviceCategoryId?: ServiceCategoryId;
  galleryReferenceId?: string;
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

function digits(e164: string): string {
  return e164.replace(/\D/g, "");
}

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
    visit: new URL(visitPath, "https://local.invalid"),
  };
}

const noCapabilities: BookingCapability = {
  liveAvailability: false,
  customerReschedule: false,
  customerCancel: false,
  inspirationUpload: false,
  paymentOrchestration: false,
};

export class ManualHandoffAdapter implements BookingAdapter {
  readonly mode = "manual-handoff" as const;

  constructor(private readonly handoffs: ManualHandoffs) {}

  capabilities(): BookingCapability {
    return noCapabilities;
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
