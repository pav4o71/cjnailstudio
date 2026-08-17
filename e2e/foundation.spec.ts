import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const hamburgerProjects = new Set(["mobile", "tablet"]);

test("shell exposes current navigation and minimum-size interactive targets", async ({
  page,
}) => {
  await page.goto("/services");
  const currentLinks = page.locator('a[aria-current="page"]');
  await expect(currentLinks).toHaveCount(2);
  await expect(currentLinks.nth(0)).toContainText("Services");
  await expect(currentLinks.nth(1)).toContainText("Services");

  const targets = page.locator("a, button");
  const count = await targets.count();
  for (let index = 0; index < count; index += 1) {
    const target = targets.nth(index);
    if (!(await target.isVisible())) continue;
    const box = await target.boundingBox();
    expect(box?.width ?? 0).toBeGreaterThanOrEqual(44);
    expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
  }
});

test("modal navigation closes with Escape and restores trigger focus", async ({
  page,
}, testInfo) => {
  test.skip(
    !hamburgerProjects.has(testInfo.project.name),
    "Menu is used when the hamburger is visible",
  );
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

test("menu navigation moves focus to main instead of the trigger", async ({
  page,
}, testInfo) => {
  test.skip(
    !hamburgerProjects.has(testInfo.project.name),
    "Menu is used when the hamburger is visible",
  );
  await page.goto("/");

  await page.getByRole("button", { name: /Menu/ }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Services", exact: true })
    .click();
  await expect(page).toHaveURL(/\/services$/);
  await expect(page.locator("#main")).toBeFocused();
});

test("open menu dialog has no serious or critical automated accessibility findings", async ({
  page,
}, testInfo) => {
  test.skip(
    !hamburgerProjects.has(testInfo.project.name),
    "Menu is used when the hamburger is visible",
  );
  await page.goto("/");
  await page.getByRole("button", { name: /Menu/ }).click();
  await expect(page.getByRole("dialog")).toBeVisible();

  const results = await new AxeBuilder({ page }).analyze();
  const blocking = results.violations.filter((violation) =>
    ["serious", "critical"].includes(violation.impact ?? ""),
  );
  expect(blocking).toEqual([]);
});

test("hamburger and book action bar stay paired through the 64rem breakpoint", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "desktop",
    "Breakpoint probe uses the desktop project",
  );
  await page.setViewportSize({ width: 1024, height: 800 });
  await page.goto("/");
  await expect(page.getByRole("button", { name: /Menu/ })).toBeVisible();
  await expect(
    page.getByRole("navigation", { name: "Quick booking actions" }),
  ).toBeVisible();
  await expect(
    page
      .getByRole("navigation", { name: "Quick booking actions" })
      .getByRole("link", { name: "Book" }),
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
  await expect(
    page.getByRole("heading", { name: "Walk-ins are welcome" }),
  ).toBeVisible();
  await expect(page.getByText(/availability is not guaranteed/i)).toBeVisible();
  await expect(
    page.getByRole("link", { name: "See address and hours" }),
  ).toHaveAttribute("href", "/visit");
});

test("footer keeps the approved contact and legal paths", async ({ page }) => {
  await page.goto("/");
  const footer = page.getByRole("contentinfo");
  await expect(footer.getByRole("link", { name: "FAQ" })).toHaveAttribute(
    "href",
    "/faq",
  );
  await expect(
    footer.getByRole("link", { name: "WhatsApp the studio" }),
  ).toBeVisible();
  await expect(footer.getByRole("link", { name: /Call \+63/ })).toBeVisible();
  await expect(
    footer.getByRole("link", { name: "Email the studio" }),
  ).toBeVisible();
  await expect(
    footer.getByRole("link", { name: /Instagram @beautynailstudiobycj/ }),
  ).toHaveAttribute("href", "https://www.instagram.com/beautynailstudiobycj/");
  await expect(footer.getByRole("link", { name: "Privacy" })).toHaveAttribute(
    "href",
    "/privacy",
  );
  await expect(footer.getByRole("link", { name: "Terms" })).toHaveAttribute(
    "href",
    "/terms",
  );
  await expect(footer.getByText(/Knightsbridge Residences/)).toBeVisible();
  await expect(
    footer.getByText("Open daily, 12:00 noon–9:00 PM"),
  ).toBeVisible();
});

test.describe("no JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("core navigation and contact remain reachable without the menu dialog", async ({
    page,
  }, testInfo) => {
    test.skip(
      !hamburgerProjects.has(testInfo.project.name),
      "No-JS fallback is for viewports that otherwise hide desktop nav",
    );
    await page.goto("/");
    await expect(page.getByRole("button", { name: /Menu/ })).toBeHidden();
    await expect(
      page.getByRole("navigation", { name: "Primary navigation" }),
    ).toBeVisible();
    await expect(
      page.getByRole("navigation", { name: "Quick booking actions" }),
    ).toBeVisible();
    await page
      .getByRole("navigation", { name: "Primary navigation" })
      .getByRole("link", { name: "Visit" })
      .click();
    await expect(page).toHaveURL(/\/visit/);
    await expect(
      page.getByRole("heading", {
        name: "Visit Beauty Nail Studio by Cj in Makati",
      }),
    ).toBeVisible();
  });
});

for (const path of [
  "/",
  "/services",
  "/services/custom-nail-art",
  "/services/lashes",
  "/gallery",
  "/studio",
  "/visit",
  "/faq",
  "/book",
  "/privacy",
  "/terms",
]) {
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
