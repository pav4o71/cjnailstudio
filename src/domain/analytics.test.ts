import { describe, expect, it, vi } from "vitest";

import {
  allowedAnalyticsEventNames,
  noOpAnalytics,
  sanitizeAnalyticsEvent,
} from "./analytics";

const forbiddenPropertyKeys = [
  "name",
  "email",
  "phone",
  "message",
  "imageUrl",
  "query",
  "appointmentId",
  "metadata",
];

describe("fixed analytics taxonomy", () => {
  it("keeps the approved no-op event names only", () => {
    expect([...allowedAnalyticsEventNames]).toEqual([
      "book_cta_click",
      "whatsapp_click",
      "phone_click",
      "directions_click",
      "service_view",
      "gallery_filter",
      "gallery_to_book",
      "booking_handoff_started",
      "booking_handoff_failed",
    ]);
  });

  it("accepts allowlisted fields and rejects PII or free-form metadata", () => {
    expect(
      sanitizeAnalyticsEvent({
        name: "book_cta_click",
        properties: { entryPoint: "home", channel: "book" },
      }),
    ).toEqual({
      name: "book_cta_click",
      properties: { entryPoint: "home", channel: "book" },
    });

    expect(
      sanitizeAnalyticsEvent({
        name: "whatsapp_click",
        properties: { phone: "+639617400664", message: "hi" },
      }),
    ).toBeNull();

    for (const key of forbiddenPropertyKeys) {
      expect(
        sanitizeAnalyticsEvent({
          name: "book_cta_click",
          properties: { [key]: "secret", entryPoint: "home" },
        }),
      ).toBeNull();
    }

    expect(
      sanitizeAnalyticsEvent({
        name: "custom_event",
        properties: { entryPoint: "home" },
      }),
    ).toBeNull();
  });

  it("never performs a network request", () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const beacon = vi.fn().mockReturnValue(true);
    vi.stubGlobal("navigator", {
      ...globalThis.navigator,
      sendBeacon: beacon,
    });

    noOpAnalytics.track({
      name: "book_cta_click",
      properties: { entryPoint: "home", channel: "book" },
    });
    noOpAnalytics.track({
      name: "unknown_pixel",
      properties: { email: "guest@example.com" },
    } as never);

    expect(fetchSpy).not.toHaveBeenCalled();
    expect(beacon).not.toHaveBeenCalled();
    fetchSpy.mockRestore();
    vi.unstubAllGlobals();
  });
});
