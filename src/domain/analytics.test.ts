import { describe, expect, it, vi } from "vitest";

import { noOpAnalytics } from "./analytics";

describe("no-op analytics", () => {
  it("never performs a network request", () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    noOpAnalytics.track({
      name: "booking_cta_clicked",
      properties: { entryPoint: "home", channel: "book" },
    });
    expect(fetchSpy).not.toHaveBeenCalled();
    fetchSpy.mockRestore();
  });
});
