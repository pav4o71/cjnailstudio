import { expect, test } from "@playwright/test";

function maxTransitionMs(value: string) {
  return Math.max(
    ...value.split(",").map((part) => {
      const duration = part.trim();
      if (duration.endsWith("ms")) {
        return Number.parseFloat(duration);
      }
      if (duration.endsWith("s")) {
        return Number.parseFloat(duration) * 1000;
      }
      return Number.POSITIVE_INFINITY;
    }),
  );
}

test.describe("reduced-motion hero art", () => {
  test.use({
    contextOptions: { reducedMotion: "reduce" },
  });

  test("does not run a hero enter animation", async ({ page }) => {
    await page.goto("/");
    const art = page.locator(".hero-art-slot [aria-hidden='true']").first();
    await expect(art).toBeVisible();
    await expect
      .poll(async () =>
        art.evaluate((element) => getComputedStyle(element).opacity),
      )
      .toBe("1");
    const motion = await art.evaluate((element) => {
      const style = getComputedStyle(element);
      return {
        animationName: style.animationName,
        transform: style.transform,
        transitionDuration: style.transitionDuration,
      };
    });
    expect(motion.animationName === "none" || motion.animationName === "").toBe(
      true,
    );
    expect(maxTransitionMs(motion.transitionDuration)).toBeLessThan(1);
    expect(
      motion.transform === "none" ||
        motion.transform === "matrix(1, 0, 0, 1, 0, 0)",
    ).toBe(true);
  });

  test("does not run a button-press transition", async ({ page }) => {
    await page.goto("/");
    const cta = page
      .getByRole("link", { name: "Book or contact the studio" })
      .first();
    await expect(cta).toBeVisible();
    const duration = await cta.evaluate(
      (element) => getComputedStyle(element).transitionDuration,
    );
    expect(maxTransitionMs(duration)).toBeLessThan(1);
  });
});

test.describe("default-motion hero art", () => {
  test.use({
    contextOptions: { reducedMotion: "no-preference" },
  });

  test("uses a one-shot opacity and transform transition", async ({ page }) => {
    await page.goto("/");
    const art = page.locator(".hero-art-slot [aria-hidden='true']").first();
    const transition = await art.evaluate((element) => {
      const style = getComputedStyle(element);
      return {
        property: style.transitionProperty,
        duration: style.transitionDuration,
      };
    });
    expect(transition.property).toMatch(/opacity/);
    expect(transition.property).toMatch(/transform/);
    expect(transition.duration).toMatch(/0\.16s|160ms/);
  });
});
