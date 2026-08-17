import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("shell exposes current navigation and minimum-size interactive targets", async ({
  page,
}) => {
  await page.goto("/services");
  const currentLinks = page.locator('a[aria-current="page"]');
  await expect(currentLinks).toHaveCount(2);
  await expect(currentLinks).toHaveText(["Services", "Services"]);

  const targets = page.locator("a, button");
  const count = await targets.count();
  for (let index = 0; index < count; index += 1) {
    const target = targets.nth(index);
    if (!(await target.isVisible())) continue;
    const box = await target.boundingBox();
    expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
  }
});

test("mobile modal navigation closes with Escape and restores focus", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Mobile shell behavior");
  await page.goto("/");

  const trigger = page.getByRole("button", { name: /Menu/ });
  await trigger.focus();
  await trigger.press("Enter");
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("button", { name: "Close menu" })).toBeFocused();

  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();
  await expect(trigger).toBeFocused();
  await expect(
    page.getByRole("navigation", { name: "Quick booking actions" }),
  ).toBeVisible();
});

test("primary pages and manual booking handoff are reachable", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Bring the look you have in mind." }),
  ).toBeVisible();
  await page
    .getByRole("link", { name: "Book or contact the studio" })
    .first()
    .click();
  await expect(
    page.getByRole("heading", { name: "Book or contact the studio" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Message the studio on WhatsApp" }),
  ).toHaveAttribute("href", "https://wa.me/639617400664");
  await expect(
    page
      .getByRole("group", { name: "Booking contact options" })
      .getByRole("link", { name: /Call \+63/ }),
  ).toHaveAttribute("href", "tel:+639617400664");
});

for (const path of ["/", "/services", "/gallery", "/book", "/visit"]) {
  test(`${path} has no serious or critical automated accessibility findings`, async ({
    page,
  }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).analyze();
    const blocking = results.violations.filter((violation) =>
      ["serious", "critical"].includes(violation.impact ?? ""),
    );
    expect(blocking).toEqual([]);
  });
}
