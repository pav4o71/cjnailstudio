import { expect, test } from "@playwright/test";

import {
  blockedClaimPattern,
  pinnedSourceBackedCopy,
} from "../src/content/claim-guards";

const launchPages = [
  {
    path: "/",
    title: /Nail & Lash Studio in Makati/,
    h1: "Bring the look you have in mind.",
  },
  {
    path: "/services",
    title: /Nail & Lash Services in Makati/,
    h1: "Nail and lash services",
  },
  {
    path: "/services/custom-nail-art",
    title: /Custom Nail Art in Makati/,
    h1: "Custom nail art in Knightsbridge, Makati",
  },
  {
    path: "/services/lashes",
    title: /Lash Extensions in Makati/,
    h1: "Lash extensions in Makati",
  },
  {
    path: "/gallery",
    title: /Nail Art Gallery/,
    h1: "Nail art by Beauty Nail Studio by Cj",
  },
  {
    path: "/studio",
    title: /Our Knightsbridge Studio/,
    h1: "Our Knightsbridge studio",
  },
  {
    path: "/visit",
    title: /Visit the Knightsbridge Studio/,
    h1: "Visit Beauty Nail Studio by Cj in Makati",
  },
  {
    path: "/faq",
    title: /First-Visit Questions/,
    h1: "First-visit questions",
  },
  {
    path: "/book",
    title: /Book or Contact the Studio/,
    h1: "Book or contact the studio",
  },
  {
    path: "/privacy",
    title: /Privacy/,
    h1: "Privacy on this website",
  },
  {
    path: "/terms",
    title: /Website Terms/,
    h1: "Website terms",
  },
] as const;

test.describe("milestone 3 public pages", () => {
  for (const route of launchPages) {
    test(`${route.path} renders unique evidence-backed content`, async ({
      page,
    }) => {
      const response = await page.goto(route.path);
      expect(response?.ok()).toBeTruthy();
      await expect(page).toHaveTitle(route.title);
      await expect(
        page.getByRole("heading", { level: 1, name: route.h1 }),
      ).toBeVisible();
      if (route.path === "/book") {
        await expect(
          page.getByRole("link", { name: "Message the studio on WhatsApp" }),
        ).toBeVisible();
      } else {
        await expect(
          page
            .getByRole("link", { name: "Book or contact the studio" })
            .first(),
        ).toBeVisible();
      }

      const mainText = await page.locator("#main").innerText();
      expect(mainText).not.toMatch(blockedClaimPattern);
      expect(mainText).not.toMatch(/tbd|lorem ipsum/i);
      expect(await page.locator("#main img").count()).toBe(0);
    });
  }

  test("deferred routes stay absent", async ({ page }) => {
    for (const path of [
      "/matcha",
      "/team",
      "/reviews",
      "/pricing",
      "/beacon-tower",
    ]) {
      const response = await page.goto(path);
      expect(response?.status()).toBe(404);
      await expect(
        page.getByRole("heading", { name: "This page is not available" }),
      ).toBeVisible();
    }
  });

  test("gallery keeps an honest empty state and Instagram path", async ({
    page,
  }) => {
    await page.goto("/gallery");
    const countText = await page.locator(".lede").innerText();
    const publishedCount = Number(/^(\d+) look/.exec(countText)?.[1] ?? -1);

    if (publishedCount === 0) {
      await expect(
        page.getByText("0 looks published on this website."),
      ).toBeVisible();
      await expect(
        page.getByRole("heading", { name: "Website gallery in preparation" }),
      ).toBeVisible();
    } else {
      expect(
        await page.locator("#main img, #main [data-gallery-item]").count(),
      ).toBeGreaterThan(0);
    }

    await expect(
      page
        .locator("#main")
        .getByRole("link", { name: /Instagram @beautynailstudiobycj/ }),
    ).toHaveAttribute(
      "href",
      "https://www.instagram.com/beautynailstudiobycj/",
    );
  });

  test("rendered #main pins source-backed hygiene, categories, walk-in and review themes", async ({
    page,
  }) => {
    await page.goto("/studio");
    const studioMain = await page.locator("#main").innerText();
    expect(studioMain).toContain(pinnedSourceBackedCopy.hygieneSummary);
    for (const heading of pinnedSourceBackedCopy.reviewThemeHeadings) {
      expect(studioMain).toContain(heading);
    }

    await page.goto("/services");
    const servicesMain = await page.locator("#main").innerText();
    expect(pinnedSourceBackedCopy.categoryLabels).toHaveLength(6);
    for (const label of pinnedSourceBackedCopy.categoryLabels) {
      expect(servicesMain).toContain(label);
    }

    await page.goto("/visit");
    const visitMain = await page.locator("#main").innerText();
    expect(visitMain).toContain(pinnedSourceBackedCopy.walkInCaveat);

    await page.goto("/faq");
    await page.locator("#are-walk-ins-accepted").locator("summary").click();
    await expect(page.locator("#are-walk-ins-accepted")).toHaveJSProperty(
      "open",
      true,
    );
    await expect(
      page
        .locator("#are-walk-ins-accepted")
        .getByText(pinnedSourceBackedCopy.walkInCaveat),
    ).toBeVisible();
  });

  test("FAQ uses native details for verified first-visit answers", async ({
    page,
  }) => {
    await page.goto("/faq");
    const location = page.locator("#where-is-the-studio");
    await expect(location).toBeVisible();
    await location.locator("summary").click();
    await expect(location).toHaveJSProperty("open", true);
    await expect(location.getByText(/Knightsbridge Residences/)).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Are walk-ins accepted?" }),
    ).toBeVisible();
  });

  test("custom nail art and lashes keep a booking handoff without style menus", async ({
    page,
  }) => {
    await page.goto("/services/custom-nail-art");
    await expect(
      page.getByRole("link", { name: "Book this kind of look" }),
    ).toHaveAttribute("href", "/book");
    await page.goto("/services/lashes");
    await expect(
      page.getByRole("link", { name: "Ask or book lash services" }),
    ).toHaveAttribute("href", "/book");
    const lashesText = await page.locator("#main").innerText();
    expect(lashesText).not.toMatch(/classic|volume|hybrid|mega|cat-eye/i);
  });
});
