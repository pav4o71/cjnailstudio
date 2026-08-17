import { expect, test } from "@playwright/test";

test.describe("reduced-motion hero art", () => {
  test.use({ reducedMotion: "reduce" });

  test("does not run a hero enter animation", async ({ page }) => {
    await page.goto("/");
    const art = page.locator(".hero-art-slot > div").first();
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
      };
    });
    expect(motion.animationName === "none" || motion.animationName === "").toBe(
      true,
    );
    expect(
      motion.transform === "none" ||
        motion.transform === "matrix(1, 0, 0, 1, 0, 0)",
    ).toBe(true);
  });
});

test.describe("default-motion hero art", () => {
  test.use({ reducedMotion: "no-preference" });

  test("uses a one-shot opacity and transform transition", async ({ page }) => {
    await page.goto("/");
    const art = page.locator(".hero-art-slot > div").first();
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
