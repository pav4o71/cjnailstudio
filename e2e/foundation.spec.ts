import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

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
