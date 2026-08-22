import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join } from "node:path";

import { describe, expect, it } from "vitest";

const publicRoots = ["app", "src", "public"] as const;
const textExtensions = new Set([
  ".css",
  ".html",
  ".js",
  ".json",
  ".mjs",
  ".svg",
  ".ts",
  ".tsx",
]);
const retainedMediaId = /media-0(0[1-9]|[12][0-9]|30)/;
const imageSource =
  /(src|href|url)\s*[=:(]\s*['"`][^'"`]*media-0(0[1-9]|[12][0-9]|30)/i;
const retainedImageFile =
  /media-0(0[1-9]|[12][0-9]|30)[^"'`\s]*\.(png|jpe?g|webp|gif|avif)/i;

function walk(directory: string, files: string[]) {
  for (const entry of readdirSync(directory)) {
    if (entry === "node_modules" || entry === ".next") {
      continue;
    }

    const path = join(directory, entry);
    if (statSync(path).isDirectory()) {
      walk(path, files);
      continue;
    }

    if (textExtensions.has(extname(path))) {
      files.push(path);
    }
  }
}

describe("consent-safe public art", () => {
  it("does not serve retained social media-manifest ids as images", () => {
    const files: string[] = [];

    for (const root of publicRoots) {
      if (!existsSync(root)) {
        continue;
      }

      walk(root, files);
    }

    const violations = files.flatMap((file) => {
      const contents = readFileSync(file, "utf8");
      if (file.includes("media-manifest") || file.includes("media-guard")) {
        return [];
      }

      if (
        imageSource.test(contents) ||
        /['"`]\/[^'"`]*media-0(0[1-9]|[12][0-9]|30)/.test(contents)
      ) {
        return [file];
      }

      if (retainedImageFile.test(contents)) {
        return [file];
      }

      return [];
    });

    expect(violations).toEqual([]);
  });

  it("treats the Open Graph share card as original decoration", () => {
    const shareCard = "public/og/studio-share.png";
    expect(existsSync(shareCard)).toBe(true);
    expect(shareCard).not.toMatch(retainedMediaId);

    const png = readFileSync(shareCard);
    expect([...png.subarray(0, 8)]).toEqual([
      0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
    ]);
    expect(png.readUInt32BE(16)).toBe(1200);
    expect(png.readUInt32BE(20)).toBe(630);
  });
});
