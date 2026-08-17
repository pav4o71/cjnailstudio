import {
  noBookingCapabilities,
  type BookingAdapter,
  type BookingCapability,
  type BookingHandoff,
  type BookingIntent,
} from "@/src/domain/booking";

export const FAKE_HOSTED_ORIGIN = "https://booking.test.invalid";

export type FakeHostedOutcome =
  "ok" | "timeout" | "malformed" | "blocked" | "misconfigured";

type FakeHostedAdapterOptions = Readonly<{
  outcome?: FakeHostedOutcome;
}>;

/**
 * Test-only hosted redirect stub. Production booking config cannot select it.
 * Capabilities stay closed: this is not a live scheduler, payment, or
 * notification provider.
 */
export class FakeHostedAdapter implements BookingAdapter {
  readonly mode = "hosted-redirect" as const;

  constructor(private readonly options: FakeHostedAdapterOptions = {}) {}

  capabilities(): BookingCapability {
    return noBookingCapabilities;
  }

  async createHandoff(intent: BookingIntent): Promise<BookingHandoff> {
    switch (this.options.outcome) {
      case "timeout":
        return { kind: "unavailable", reason: "upstream-unavailable" };
      case "blocked":
        return { kind: "unavailable", reason: "disabled" };
      case "misconfigured":
        return { kind: "unavailable", reason: "misconfigured" };
      case "malformed":
        return {
          kind: "navigate",
          channel: "hosted",
          href: new URL("javascript:alert(1)"),
          external: true,
        };
      default: {
        const href = new URL("/handoff", FAKE_HOSTED_ORIGIN);
        href.searchParams.set("from", intent.entryPoint);
        if (intent.serviceCategoryId) {
          href.searchParams.set("category", intent.serviceCategoryId);
        }
        return {
          kind: "navigate",
          channel: "hosted",
          href,
          external: true,
        };
      }
    }
  }
}
