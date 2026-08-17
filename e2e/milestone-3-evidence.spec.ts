import { test } from "@playwright/test";

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

  return `docs/screenshots/milestone-3/${testInfo.project.name}-${name}`;
}

test("capture milestone 3 page evidence", async ({ page }, testInfo) => {
  const shots = [
    ["home.png", "/"],
    ["custom-nail-art.png", "/services/custom-nail-art"],
    ["lashes.png", "/services/lashes"],
    ["studio.png", "/studio"],
    ["faq.png", "/faq"],
    ["privacy.png", "/privacy"],
  ] as const;

  for (const [name, path] of shots) {
    await page.goto(path);
    await page.screenshot({ path: evidencePath(testInfo, name) });
  }
});
