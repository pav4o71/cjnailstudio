import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { privacySections, termsSections } from "@/src/content/pages";

const root = process.cwd();
const scanRoots = ["app", "src", "next.config.ts", "netlify.toml"];

const secretPattern =
  /(?:AKIA[0-9A-Z]{16}|sk_live_|sk_test_|ghp_[A-Za-z0-9]{20,}|AIza[0-9A-Za-z_-]{20,}|-----BEGIN (?:RSA )?PRIVATE KEY-----)/;

const thirdPartyPixelPattern =
  /googletagmanager|google-analytics\.com|gtag\(|fbevents\.js|connect\.facebook\.net|hotjar|mixpanel|cdn\.segment\.com|analytics\.js/i;

function listFiles(path: string): string[] {
  const statsPath = join(root, path);
  try {
    const stat = readdirSync(statsPath, { withFileTypes: true });
    return stat.flatMap((entry) => {
      const next = join(path, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === "node_modules" || entry.name === ".next") {
          return [];
        }
        return listFiles(next);
      }
      return [next];
    });
  } catch {
    return [path];
  }
}

function scannedSources(): string[] {
  return scanRoots.flatMap((path) => listFiles(path));
}

describe("repository privacy and security scan", () => {
  it("does not commit secrets or third-party analytics pixels in the app surface", () => {
    const files = scannedSources();
    expect(files.length).toBeGreaterThan(10);

    for (const file of files) {
      if (!/\.(?:ts|tsx|js|mjs|toml)$/.test(file)) continue;
      if (/\.test\.(ts|tsx)$/.test(file)) continue;
      let source: string;
      try {
        source = readFileSync(join(root, file), "utf8");
      } catch {
        continue;
      }
      expect(source, file).not.toMatch(secretPattern);
      expect(source, file).not.toMatch(thirdPartyPixelPattern);
    }
  });

  it("keeps privacy and terms aligned with implemented no-form, no-op analytics behavior", () => {
    const privacy = privacySections.map((section) => section.text).join(" ");
    const terms = termsSections.map((section) => section.text).join(" ");

    expect(privacy).toMatch(
      /does not include a first-party booking or contact form/i,
    );
    expect(privacy).toMatch(/analytics is a no-op/i);
    expect(privacy).toMatch(/no marketing destination is configured/i);
    expect(privacy).not.toMatch(
      /we collect your email|cookie banner|payment card/i,
    );
    expect(terms).toMatch(/does not create an appointment/i);
    expect(terms).toMatch(/manual handoff/i);
    expect(terms).toMatch(
      /does not show live availability or confirm bookings/i,
    );
  });
});
