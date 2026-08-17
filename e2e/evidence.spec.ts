import { test } from "@playwright/test";

test("capture milestone 2 responsive shell evidence", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  await page.screenshot({
    path: `docs/screenshots/milestone-2/${testInfo.project.name}-home.png`,
  });
});
