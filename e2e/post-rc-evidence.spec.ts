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

  return `docs/screenshots/post-rc/${testInfo.project.name}-${name}`;
}

test("capture post-rc home and gallery fallback evidence", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Bring the look you have in mind." }),
  ).toBeVisible();
  await expect(
    page
      .locator(".hero")
      .getByRole("link", { name: "Book or contact the studio" }),
  ).toHaveCount(1);
  await expect(
    page.locator(".hero").getByRole("link", { name: "WhatsApp the studio" }),
  ).toHaveCount(0);
  await page.screenshot({ path: evidencePath(testInfo, "home.png") });

  await page.goto("/gallery");
  await expect(
    page.getByRole("heading", { name: "Website gallery in preparation" }),
  ).toBeVisible();
  await page.screenshot({
    path: evidencePath(testInfo, "gallery-fallback.png"),
  });
});
