import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import {
  bookingHref,
  createManualHandoffs,
  isSafeHandoffUrl,
  ManualHandoffAdapter,
  resolveBookingView,
  sanitizeHandoff,
} from "./booking";
import {
  createProductionAdapter,
  readProductionBookingMode,
} from "./booking-config";
import { parseBookingQuery } from "./booking-query";
import { FAKE_HOSTED_ORIGIN, FakeHostedAdapter } from "./fake-hosted-adapter";

function listSourceFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      return listSourceFiles(path);
    }
    return entry.name.endsWith(".ts") || entry.name.endsWith(".tsx")
      ? [path]
      : [];
  });
}

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

describe("controlled booking intents and URL security", () => {
  it("keeps only allowlisted intent fields", () => {
    const parsed = parseBookingQuery({
      from: "home",
      category: "lashes",
      campaign: "site",
      gallery: "gallery-media-011",
      notes: "please book me at 3pm",
    });

    expect(parsed.intent).toEqual({
      entryPoint: "home",
      serviceCategoryId: "lashes",
      galleryReferenceId: undefined,
      campaign: "site",
    });
  });

  it("drops invalid category, unpublished gallery and adapter overrides", () => {
    const parsed = parseBookingQuery({
      from: "https://evil.example",
      category: "<script>alert(1)</script>",
      gallery: "media-023",
      mode: "hosted-redirect",
      adapter: "FakeHostedAdapter",
    });

    expect(parsed.intent.entryPoint).toBe("book");
    expect(parsed.intent.serviceCategoryId).toBeUndefined();
    expect(parsed.intent.galleryReferenceId).toBeUndefined();
    expect(parsed.requestedAdapter).toBe("hosted-redirect");
    expect(parsed.viewHint).toBe("manual");
  });

  it("treats confirmation-looking return params as an untrusted return", () => {
    expect(
      parseBookingQuery({ status: "confirmed", appointmentId: "abc" }).viewHint,
    ).toBe("return");
    expect(parseBookingQuery({ return: "1" }).viewHint).toBe("return");
    expect(parseBookingQuery({ status: "success" }).viewHint).toBe("return");
  });

  it("maps coarse failure statuses without confirming a booking", () => {
    expect(parseBookingQuery({ status: "timeout" }).viewHint).toBe("error");
    expect(parseBookingQuery({ status: "unavailable" }).viewHint).toBe(
      "unavailable",
    );
  });

  it("never uses redirect query values as destinations", () => {
    const parsed = parseBookingQuery({
      redirect: "https://evil.example/phish",
      next: "javascript:alert(1)",
    });
    expect(parsed.rejectedRedirects).toEqual([
      "javascript:alert(1)",
      "https://evil.example/phish",
    ]);
    expect(parsed.viewHint).toBe("manual");
    expect(bookingHref(parsed.intent)).toBe("/book");
  });

  it("rejects unsafe handoff URLs", () => {
    expect(
      isSafeHandoffUrl(new URL("javascript:alert(1)"), { httpsHosts: [] }),
    ).toBe(false);
    expect(
      isSafeHandoffUrl(new URL("https://evil.example"), {
        httpsHosts: ["booking.test.invalid"],
      }),
    ).toBe(false);
    expect(
      isSafeHandoffUrl(new URL("https://user:pass@wa.me/639617400664"), {
        httpsHosts: ["wa.me"],
      }),
    ).toBe(false);
    expect(
      isSafeHandoffUrl(new URL("https://wa.me/639617400664"), {
        httpsHosts: ["wa.me"],
      }),
    ).toBe(true);
  });
});

describe("production booking config", () => {
  it("fails closed to manual-handoff for every non-production mode", () => {
    expect(readProductionBookingMode({})).toBe("manual-handoff");
    expect(readProductionBookingMode({ BOOKING_MODE: "hosted-redirect" })).toBe(
      "manual-handoff",
    );
    expect(readProductionBookingMode({ BOOKING_MODE: "embedded-widget" })).toBe(
      "manual-handoff",
    );
    expect(
      readProductionBookingMode({ BOOKING_MODE: "custom-scheduler" }),
    ).toBe("manual-handoff");
    expect(readProductionBookingMode({ BOOKING_MODE: "nope" })).toBe(
      "manual-handoff",
    );
  });

  it("constructs only the manual adapter", async () => {
    const adapter = createProductionAdapter("+639617400664");
    expect(adapter.mode).toBe("manual-handoff");
    expect(adapter).toBeInstanceOf(ManualHandoffAdapter);
    await expect(
      adapter.createHandoff({ entryPoint: "book" }),
    ).resolves.toMatchObject({ channel: "whatsapp" });
  });

  it("keeps fake hosted code out of production routes and UI", () => {
    const productionFiles = [
      ...listSourceFiles(join(process.cwd(), "app")),
      ...listSourceFiles(join(process.cwd(), "src/components")),
      join(process.cwd(), "src/domain/booking-config.ts"),
    ].filter((file) => !file.includes(".test."));

    for (const file of productionFiles) {
      const source = readFileSync(file, "utf8");
      expect(source).not.toMatch(
        /FakeHostedAdapter|fake-hosted-adapter|booking\.test\.invalid/,
      );
    }
  });
});

describe("booking view resolution", () => {
  const adapter = createProductionAdapter("+639617400664");

  it("keeps the production adapter on the manual view", async () => {
    await expect(
      resolveBookingView({
        adapter,
        hostedHosts: [],
        intent: { entryPoint: "book" },
        telE164: "+639617400664",
        viewHint: "manual",
      }),
    ).resolves.toEqual({ view: "manual" });
  });

  it("does not surface a hosted URL when the allowlist is empty", async () => {
    const hosted = new FakeHostedAdapter();
    const resolution = await resolveBookingView({
      adapter: hosted,
      hostedHosts: [],
      intent: { entryPoint: "home", serviceCategoryId: "lashes" },
      viewHint: "manual",
    });
    expect(resolution.view).toBe("unavailable");
    expect(resolution.hostedHref).toBeUndefined();
  });

  it("sanitizes a malformed hosted URL to unavailable", () => {
    const handoff = sanitizeHandoff(
      {
        kind: "navigate",
        channel: "hosted",
        href: new URL("javascript:alert(1)"),
        external: true,
      },
      { httpsHosts: ["booking.test.invalid"] },
    );
    expect(handoff).toEqual({
      kind: "unavailable",
      reason: "misconfigured",
    });
  });
});

describe("test-only fake hosted adapter isolation", () => {
  it("never enables live scheduling, payments or uploads", () => {
    const adapter = new FakeHostedAdapter();
    expect(adapter.mode).toBe("hosted-redirect");
    expect(adapter.capabilities()).toEqual({
      liveAvailability: false,
      customerReschedule: false,
      customerCancel: false,
      inspirationUpload: false,
      paymentOrchestration: false,
    });
  });

  it("emits only controlled query fields on the test origin", async () => {
    const adapter = new FakeHostedAdapter();
    const handoff = await adapter.createHandoff({
      entryPoint: "gallery",
      serviceCategoryId: "lashes",
      galleryReferenceId: "not-forwarded-unless-parsed",
    });
    expect(handoff.kind).toBe("navigate");
    if (handoff.kind !== "navigate") {
      return;
    }
    expect(handoff.href.origin).toBe(FAKE_HOSTED_ORIGIN);
    expect(handoff.href.searchParams.get("from")).toBe("gallery");
    expect(handoff.href.searchParams.get("category")).toBe("lashes");
    expect(handoff.href.href).not.toMatch(/not-forwarded/);
  });

  it("covers timeout, blocked and malformed outcomes", async () => {
    await expect(
      new FakeHostedAdapter({ outcome: "timeout" }).createHandoff({
        entryPoint: "book",
      }),
    ).resolves.toEqual({
      kind: "unavailable",
      reason: "upstream-unavailable",
    });
    await expect(
      new FakeHostedAdapter({ outcome: "blocked" }).createHandoff({
        entryPoint: "book",
      }),
    ).resolves.toEqual({ kind: "unavailable", reason: "disabled" });
    const malformed = await new FakeHostedAdapter({
      outcome: "malformed",
    }).createHandoff({ entryPoint: "book" });
    expect(malformed.kind).toBe("navigate");
    if (malformed.kind === "navigate") {
      expect(malformed.href.protocol).toBe("javascript:");
    }
  });
});
