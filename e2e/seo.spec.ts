import { expect, test } from "@playwright/test";

import { publicPageList } from "../src/content/pages";
import {
  approvedProductionOrigin,
  deferredPaths,
  localBusinessJsonLd,
} from "../src/content/seo";
import { site } from "../src/content/site";

function productionOrigin(): string {
  if (!approvedProductionOrigin) {
    throw new Error("approvedProductionOrigin must be set for production e2e");
  }
  return approvedProductionOrigin;
}

test("launch routes expose unique Open Graph tags, absolute canonicals and indexable robots", async ({
  page,
}) => {
  const ogTitles: string[] = [];

  for (const route of publicPageList) {
    const response = await page.goto(route.path);
    expect(response?.ok()).toBeTruthy();
    expect(response?.headers()["x-robots-tag"] ?? "").not.toMatch(/noindex/i);
    expect(response?.headers()["content-security-policy"]).toContain(
      "connect-src 'self'",
    );
    expect(response?.headers()["strict-transport-security"]).toContain(
      "max-age=31536000",
    );

    const robots = page.locator('meta[name="robots"]');
    const robotsContent = await robots.getAttribute("content");
    expect(robotsContent).toMatch(/\bindex\b/i);
    expect(robotsContent).not.toMatch(/noindex/i);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      "content",
      route.title,
    );
    await expect(
      page.locator('meta[property="og:description"]'),
    ).toHaveAttribute("content", route.description);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      new URL(route.path, `${productionOrigin()}/`).href,
    );
    const canonicalHref = await page
      .locator('link[rel="canonical"]')
      .getAttribute("href");
    expect(canonicalHref).not.toMatch(/cjnailstudio\.com|example\.com/i);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      "content",
      /\/og\/studio-share\.png/,
    );
    await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute(
      "content",
      /\/og\/studio-share\.png/,
    );
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      "content",
      "summary_large_image",
    );
    const ogImage = await page
      .locator('meta[property="og:image"]')
      .getAttribute("content");
    expect(ogImage).not.toMatch(/cjnailstudio\.com|example\.com/i);

    ogTitles.push(
      (await page
        .locator('meta[property="og:title"]')
        .getAttribute("content")) ?? "",
    );
  }

  expect(new Set(ogTitles).size).toBe(publicPageList.length);
});

test("visit is indexable on the approved production origin", async ({
  page,
}) => {
  const response = await page.goto("/visit");
  expect(response?.ok()).toBeTruthy();
  expect(response?.headers()["x-robots-tag"] ?? "").not.toMatch(/noindex/i);
  const robotsContent = await page
    .locator('meta[name="robots"]')
    .getAttribute("content");
  expect(robotsContent).toMatch(/\bindex\b/i);
  expect(robotsContent).not.toMatch(/noindex/i);
});

test("robots and sitemap index launch routes on the approved origin", async ({
  request,
}) => {
  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBeTruthy();
  const robotsBody = await robots.text();
  expect(robotsBody).toMatch(/Allow:\s*\//i);
  expect(robotsBody).toContain(`Sitemap: ${productionOrigin()}/sitemap.xml`);
  for (const path of deferredPaths) {
    expect(robotsBody).toMatch(new RegExp(`Disallow:\\s*${path}`, "i"));
  }

  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBeTruthy();
  const sitemapBody = await sitemap.text();
  expect(sitemapBody).toContain(`${productionOrigin()}/visit`);
  expect(sitemapBody).toContain(`${productionOrigin()}/book`);
  expect(sitemapBody).not.toContain("/matcha");
  expect(sitemapBody).not.toContain("/team");
  expect(sitemapBody).not.toContain("/reviews");
  expect(sitemapBody).not.toContain("/pricing");
  expect(sitemapBody).not.toContain("/beacon-tower");
  expect(sitemapBody).not.toMatch(/cjnailstudio\.com/i);
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

test("privacy and terms still describe no-op analytics and the Pavells panel", async ({
  page,
}) => {
  await page.goto("/privacy");
  await expect(page.locator("#main")).toContainText(/analytics is a no-op/i);
  await expect(page.locator("#main")).toContainText(
    /does not include a first-party booking or contact form/i,
  );
  await expect(page.locator("#main")).toContainText(/Pavells Booking/i);

  await page.goto("/terms");
  await expect(page.locator("#main")).toContainText(/Pavells Booking/i);
  await expect(page.locator("#main")).toContainText(
    /does not confirm an appointment by itself/i,
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
