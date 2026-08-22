import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import {
  buildSecurityHeaders,
  securityHeaders,
  shouldSendNoindexRobotsTag,
} from "./headers";

function header(
  name: string,
  headers: Array<{ key: string; value: string }> = securityHeaders,
): string | undefined {
  return headers.find((item) => item.key === name)?.value;
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
      'camera=(), microphone=(), geolocation=(), payment=("https://booking.pavells.com"), clipboard-write=("https://booking.pavells.com")',
    );
    expect(header("X-Robots-Tag")).toBeUndefined();
  });

  it("allows the Pavells booking origin and still blocks analytics pixels", () => {
    const csp = header("Content-Security-Policy") ?? "";

    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("connect-src 'self'");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain(
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://booking.pavells.com",
    );
    expect(csp).toContain("frame-src https://booking.pavells.com");
    expect(csp).not.toMatch(/googletagmanager|google-analytics|facebook\.net/i);
  });

  it("keeps Netlify preview and branch deploys noindex after D-017", () => {
    expect(shouldSendNoindexRobotsTag({ CONTEXT: "deploy-preview" })).toBe(
      true,
    );
    expect(shouldSendNoindexRobotsTag({ CONTEXT: "branch-deploy" })).toBe(true);
    expect(
      shouldSendNoindexRobotsTag({
        DEPLOY_PRIME_URL: "https://abc123--cjnailstudio.netlify.app",
      }),
    ).toBe(true);
    expect(
      shouldSendNoindexRobotsTag({
        CONTEXT: "production",
        DEPLOY_PRIME_URL: "https://cjnailstudio.netlify.app",
      }),
    ).toBe(false);

    expect(
      header(
        "X-Robots-Tag",
        buildSecurityHeaders({ CONTEXT: "deploy-preview" }),
      ),
    ).toBe("noindex, nofollow");

    const netlify = readFileSync(join(process.cwd(), "netlify.toml"), "utf8");
    expect(netlify).toMatch(/context\.deploy-preview\.headers/);
    expect(netlify).toMatch(/context\.branch-deploy\.headers/);
    expect(netlify).toMatch(/X-Robots-Tag\s*=\s*"noindex, nofollow"/);
    expect(netlify).not.toMatch(
      /\[\[headers\]\][\s\S]*X-Robots-Tag\s*=\s*"noindex, nofollow"/,
    );
  });
});
