import { expect, test } from "@playwright/test";

import { publicPageList } from "../src/content/pages";
import { localBusinessJsonLd } from "../src/content/seo";
import { site } from "../src/content/site";

test("launch routes expose unique Open Graph tags, relative canonicals and noindex", async ({
  page,
}) => {
  const ogTitles: string[] = [];

  for (const route of publicPageList) {
    const response = await page.goto(route.path);
    expect(response?.ok()).toBeTruthy();
    expect(response?.headers()["x-robots-tag"]).toMatch(/noindex/i);
    expect(response?.headers()["content-security-policy"]).toContain(
      "connect-src 'self'",
    );
    expect(response?.headers()["strict-transport-security"]).toContain(
      "max-age=31536000",
    );

    const robots = page.locator('meta[name="robots"]');
    await expect(robots).toHaveAttribute("content", /noindex/);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      "content",
      route.title,
    );
    await expect(
      page.locator('meta[property="og:description"]'),
    ).toHaveAttribute("content", route.description);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      new RegExp(`${route.path === "/" ? "/$" : `${route.path}$`}`),
    );
    const canonicalHref = await page
      .locator('link[rel="canonical"]')
      .getAttribute("href");
    expect(canonicalHref).not.toMatch(/cjnailstudio\.com|example\.com/i);

    ogTitles.push(
      (await page
        .locator('meta[property="og:title"]')
        .getAttribute("content")) ?? "",
    );
  }

  expect(new Set(ogTitles).size).toBe(publicPageList.length);
});

test("visit stays noindex until ODR-024 approves a production origin", async ({
  page,
}) => {
  const response = await page.goto("/visit");
  expect(response?.ok()).toBeTruthy();
  expect(response?.headers()["x-robots-tag"]).toMatch(/noindex/i);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /noindex/,
  );
});

test("robots and sitemap stay non-indexable without an approved origin", async ({
  request,
}) => {
  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBeTruthy();
  const robotsBody = await robots.text();
  expect(robotsBody).toMatch(/Disallow:\s*\//i);
  expect(robotsBody).not.toMatch(/Sitemap:\s*https?:\/\/(?!127\.0\.0\.1)/i);

  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBeTruthy();
  const sitemapBody = await sitemap.text();
  expect(sitemapBody).not.toMatch(/<(?:loc|url)>/i);
  expect(sitemapBody).not.toContain("/matcha");
  expect(sitemapBody).not.toContain("/visit");
});

test("structured data uses only verified LocalBusiness facts", async ({
  page,
}) => {
  await page.goto("/");
  const jsonLd = JSON.parse(
    (await page.locator('script[type="application/ld+json"]').textContent()) ??
      "{}",
  );
  expect(jsonLd).toEqual(localBusinessJsonLd(site));
  expect(JSON.stringify(jsonLd)).not.toMatch(
    /aggregateRating|priceRange|paymentAccepted|Matcha|Beacon/i,
  );
});

test("privacy and terms still describe no-op analytics and manual booking", async ({
  page,
}) => {
  await page.goto("/privacy");
  await expect(page.locator("#main")).toContainText(/analytics is a no-op/i);
  await expect(page.locator("#main")).toContainText(
    /does not include a first-party booking or contact form/i,
  );

  await page.goto("/terms");
  await expect(page.locator("#main")).toContainText(/manual handoff/i);
  await expect(page.locator("#main")).toContainText(
    /does not show live availability or confirm bookings/i,
  );
});

test("booking journey does not call a third-party analytics destination", async ({
  page,
}) => {
  const blocked: string[] = [];
  page.on("request", (request) => {
    if (
      /google-analytics|googletagmanager|facebook\.net|mixpanel|hotjar|cdn\.segment\.com/i.test(
        request.url(),
      )
    ) {
      blocked.push(request.url());
    }
  });

  await page.goto("/");
  await page
    .getByRole("link", { name: "Book or contact the studio" })
    .first()
    .click();
  await expect(
    page.getByRole("heading", { name: "Book or contact the studio" }),
  ).toBeVisible();
  expect(blocked).toEqual([]);
});
