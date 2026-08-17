import { expect, test, type Page } from "@playwright/test";

import {
  FAKE_HOSTED_ORIGIN,
  FakeHostedAdapter,
} from "../src/domain/fake-hosted-adapter";

const confirmationPattern =
  /you(?:'re| are) booked|appointment (?:is |has been )?confirmed|booking confirmed/i;

function bookingCallLink(page: Page) {
  return page
    .getByRole("group", { name: "Booking contact options" })
    .getByRole("link", { name: /Call \+63/ });
}

test("manual handoff stays the production booking path", async ({ page }) => {
  await page.goto("/book");
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
  await expect(
    page.getByRole("link", { name: "Visit and walk-in information" }),
  ).toHaveAttribute("href", "/visit");
  const main = await page.locator("#main").innerText();
  expect(main).not.toMatch(confirmationPattern);
  expect(main).not.toContain("booking.test.invalid");
  expect(main).not.toContain(FAKE_HOSTED_ORIGIN);
  await expect(page.locator("#main .eyebrow")).toHaveText("Contact the studio");
});

test("controlled intents are acknowledged without forwarding raw query text", async ({
  page,
}) => {
  await page.goto("/book?from=home&category=lashes");
  await expect(page.getByText(/Starting point: Lash services/)).toBeVisible();
  await expect(page.getByText(/not an appointment/)).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Message the studio on WhatsApp" }),
  ).toBeVisible();
});

test("invalid intent and open-redirect params are ignored", async ({
  page,
}) => {
  await page.goto(
    "/book?from=not-a-page&category=%3Cscript%3E&redirect=https://evil.example/phish&mode=hosted-redirect",
  );
  await expect(
    page.getByRole("heading", { name: "Book or contact the studio" }),
  ).toBeVisible();
  await expect(page.getByText(/Starting point:/)).toHaveCount(0);
  const html = await page.locator("#main").innerHTML();
  expect(html).not.toContain("evil.example");
  expect(html).not.toContain("javascript:");
  expect(html).not.toContain("hosted-redirect");
  expect(html).not.toContain("booking.test.invalid");
});

test("false-success return query stays unconfirmed", async ({ page }) => {
  await page.goto("/book?status=confirmed&appointmentId=secret-slot");
  await expect(
    page.getByRole("heading", {
      name: "This page cannot confirm an appointment",
    }),
  ).toBeVisible();
  const main = await page.locator("#main").innerText();
  expect(main).not.toMatch(confirmationPattern);
  expect(main).not.toContain("secret-slot");
  await expect(
    page.getByRole("link", { name: "Message the studio on WhatsApp" }),
  ).toBeVisible();
});

test("unavailable and error return statuses keep contact fallbacks", async ({
  page,
}) => {
  await page.goto("/book?status=unavailable");
  await expect(
    page.getByRole("heading", { name: "Online scheduling is not available" }),
  ).toBeVisible();
  await expect(bookingCallLink(page)).toBeVisible();

  await page.goto("/book?status=timeout");
  await expect(
    page.getByRole("heading", {
      name: "Online booking is unavailable right now",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Visit and walk-in information" }),
  ).toBeVisible();
  expect(await page.locator("#main").innerText()).not.toMatch(
    confirmationPattern,
  );
});

test("fake hosted adapter stays isolated from the production page", async ({
  page,
}) => {
  const adapter = new FakeHostedAdapter();
  const handoff = await adapter.createHandoff({
    entryPoint: "book",
    serviceCategoryId: "biab",
  });
  expect(handoff.kind).toBe("navigate");
  if (handoff.kind === "navigate") {
    expect(handoff.href.origin).toBe(FAKE_HOSTED_ORIGIN);
  }

  await page.goto("/book?mode=hosted-redirect&adapter=fake");
  const html = await page.locator("#main").innerHTML();
  expect(html).not.toContain("booking.test.invalid");
  expect(html).not.toContain("/handoff");
});

test.describe("no JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("contact links remain usable without JavaScript", async ({ page }) => {
    await page.goto("/book?from=visit&category=soft-gel");
    await expect(
      page.getByRole("link", { name: "Message the studio on WhatsApp" }),
    ).toHaveAttribute("href", "https://wa.me/639617400664");
    await expect(bookingCallLink(page)).toHaveAttribute(
      "href",
      "tel:+639617400664",
    );
    await expect(
      page.getByRole("link", { name: "Visit and walk-in information" }),
    ).toHaveAttribute("href", "/visit");
    await expect(page.getByText(/Starting point: Soft gel/)).toBeVisible();
  });
});
