import { expect, test } from "@playwright/test";

function evidencePath(
  testInfo: {
    outputPath: (...pathSegments: string[]) => string;
    project: { name: string };
  },
  name: string,
) {
  if (process.env.CI) {
    return testInfo.outputPath(name);
  }

  return `docs/screenshots/milestone-6/${testInfo.project.name}-${name}`;
}

test("capture milestone 6 release evidence", async ({ page }, testInfo) => {
  const shots = [
    ["home.png", "/"],
    ["gallery-fallback.png", "/gallery"],
    ["book-manual.png", "/book"],
    ["book-unavailable.png", "/book?status=unavailable"],
    ["book-error.png", "/book?status=timeout"],
    ["book-return.png", "/book?status=confirmed"],
  ] as const;

  for (const [name, path] of shots) {
    await page.goto(path);
    if (name === "gallery-fallback.png") {
      await expect(
        page.getByRole("heading", { name: "Website gallery in preparation" }),
      ).toBeVisible();
    }
    if (name === "book-unavailable.png") {
      await expect(
        page.getByRole("heading", {
          name: "Online scheduling is not available",
        }),
      ).toBeVisible();
    }
    if (name === "book-error.png") {
      await expect(
        page.getByRole("heading", {
          name: "Online booking is unavailable right now",
        }),
      ).toBeVisible();
    }
    if (name === "book-return.png") {
      await expect(
        page.getByRole("heading", {
          name: "This page cannot confirm an appointment",
        }),
      ).toBeVisible();
    }
    await page.screenshot({ path: evidencePath(testInfo, name) });
  }
});
