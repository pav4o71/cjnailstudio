import { describe, expect, it } from "vitest";

import { createManualHandoffs, ManualHandoffAdapter } from "./booking";

describe("manual booking handoff", () => {
  const handoffs = createManualHandoffs("+639617400664");

  it("generates controlled contact destinations", () => {
    expect(handoffs.whatsapp.href).toBe("https://wa.me/639617400664");
    expect(handoffs.phone.href).toBe("tel:+639617400664");
    expect(handoffs.visit.pathname).toBe("/visit");
  });

  it("rejects malformed phone configuration", () => {
    expect(() => createManualHandoffs("09617400664")).toThrow(
      "Invalid canonical E.164 phone number",
    );
  });

  it("exposes no unavailable phase-zero capabilities", async () => {
    const adapter = new ManualHandoffAdapter(handoffs);
    expect(adapter.capabilities()).toEqual({
      liveAvailability: false,
      customerReschedule: false,
      customerCancel: false,
      inspirationUpload: false,
      paymentOrchestration: false,
    });
    await expect(
      adapter.createHandoff({ entryPoint: "book" }),
    ).resolves.toMatchObject({
      kind: "navigate",
      channel: "whatsapp",
      external: true,
    });
  });
});
