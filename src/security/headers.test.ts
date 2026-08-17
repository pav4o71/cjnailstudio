import { describe, expect, it } from "vitest";

import { securityHeaders } from "./headers";

function header(name: string): string | undefined {
  return securityHeaders.find((item) => item.key === name)?.value;
}

describe("production security headers", () => {
  it("includes HSTS, framing, content-type, referrer, permissions and CSP controls", () => {
    expect(header("Strict-Transport-Security")).toBe(
      "max-age=31536000; includeSubDomains; preload",
    );
    expect(header("X-Content-Type-Options")).toBe("nosniff");
    expect(header("X-Frame-Options")).toBe("DENY");
    expect(header("Referrer-Policy")).toBe("strict-origin-when-cross-origin");
    expect(header("Permissions-Policy")).toBe(
      "camera=(), microphone=(), geolocation=(), payment=()",
    );
    expect(header("X-Robots-Tag")).toBe("noindex, nofollow");
  });

  it("keeps CSP first-party only so analytics pixels cannot load", () => {
    const csp = header("Content-Security-Policy") ?? "";

    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("connect-src 'self'");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).not.toMatch(/googletagmanager|google-analytics|facebook\.net/i);
  });
});
