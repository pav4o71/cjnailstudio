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

  return `docs/screenshots/milestone-2/${testInfo.project.name}-${name}`;
}

test("capture milestone 2 responsive shell evidence", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  await page.screenshot({
    path: evidencePath(testInfo, "home.png"),
  });

  await page.goto("/book");
  await page.screenshot({
    path: evidencePath(testInfo, "book.png"),
  });

  await page.goto("/gallery");
  await page.screenshot({
    path: evidencePath(testInfo, "gallery.png"),
  });

  if (testInfo.project.name !== "desktop") {
    await page.goto("/");
    await page.getByRole("button", { name: /Menu/ }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.screenshot({
      path: evidencePath(testInfo, "menu.png"),
    });
  }
});
