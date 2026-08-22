import { expect, test, type Page } from "@playwright/test";

import { mapsSearchUrl, site } from "../src/content/site";

function bookingCallLink(page: Page) {
  return page
    .getByRole("group", { name: "Booking contact options" })
    .getByRole("link", { name: /Call \+63/ });
}

async function expectManualHandoff(page: Page) {
  await expect(
    page.getByRole("heading", { name: "Book or contact the studio" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Message the studio on WhatsApp" }),
  ).toHaveAttribute("href", "https://wa.me/639617400664");
  await expect(bookingCallLink(page)).toHaveAttribute(
    "href",
    "tel:+639617400664",
  );
}

test("home primary CTA reaches WhatsApp and call handoff", async ({ page }) => {
  await page.goto("/");
  const visitHeading = page.getByRole("heading", {
    name: "Knightsbridge studio",
  });
  const galleryPreview = page.getByRole("heading", {
    name: "Selected looks from the studio",
  });
  await expect(visitHeading).toBeVisible();
  await expect(galleryPreview).toBeVisible();
  const galleryFollowsVisit = await visitHeading.evaluate(
    (visit, gallery) => {
      return Boolean(
        gallery &&
        (visit.compareDocumentPosition(gallery) &
          Node.DOCUMENT_POSITION_FOLLOWING) ===
          Node.DOCUMENT_POSITION_FOLLOWING,
      );
    },
    await galleryPreview.elementHandle(),
  );
  expect(galleryFollowsVisit).toBe(true);
  await page
    .getByRole("link", { name: "Book or contact the studio" })
    .first()
    .click();
  await expect(page).toHaveURL(/\/book\?from=home$/);
  await expectManualHandoff(page);
});

test("services overview books through to manual contact", async ({ page }) => {
  await page.goto("/services");
  await page
    .locator("#main")
    .getByRole("link", { name: "Book or contact the studio" })
    .click();
  await expect(page).toHaveURL(/\/book\?from=services$/);
  await expectManualHandoff(page);
});

test("custom nail art books the related category without a live scheduler", async ({
  page,
}) => {
  await page.goto("/services/custom-nail-art");
  await page.getByRole("link", { name: "Book this kind of look" }).click();
  await expect(page).toHaveURL(
    /\/book\?from=services&category=custom-nail-art$/,
  );
  await expect(page.getByText(/Starting point: Custom nail art/)).toBeVisible();
  await expectManualHandoff(page);
});

test("lashes inquiry reaches WhatsApp and call handoff", async ({ page }) => {
  await page.goto("/services/lashes");
  await page.getByRole("link", { name: "Ask or book lash services" }).click();
  await expect(page).toHaveURL(/\/book\?from=services&category=lashes$/);
  await expect(page.getByText(/Starting point: Lash services/)).toBeVisible();
  await expectManualHandoff(page);
});

test("gallery publishes cleared looks and books through to manual contact", async ({
  page,
}) => {
  await page.goto("/gallery");
  await expect(
    page.getByText(/^[1-9]\d* looks published on this website\.$/),
  ).toBeVisible();
  await expect(page.locator("#main img").first()).toBeVisible();
  await page
    .locator("#main")
    .getByRole("link", { name: "Book or contact the studio" })
    .click();
  await expect(page).toHaveURL(/\/book\?from=gallery$/);
  await expectManualHandoff(page);
});

test("visit offers directions and books through to manual contact", async ({
  page,
}) => {
  await page.goto("/visit");
  await expect(
    page.getByRole("link", { name: "Search this address in Google Maps" }),
  ).toHaveAttribute("href", mapsSearchUrl(site.location.address));
  await page
    .locator("#main")
    .getByRole("link", { name: "Book or contact the studio" })
    .click();
  await expect(page).toHaveURL(/\/book\?from=visit$/);
  await expectManualHandoff(page);
});
