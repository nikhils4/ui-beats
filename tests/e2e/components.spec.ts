import { test, expect } from "@playwright/test";

test.describe("Tilt Card", () => {
  /*
   * Regression: the glare was a radial gradient with no visibility control, so
   * it was painted permanently at the card's centre — the card sat there with a
   * bright blob on it whether or not a pointer was anywhere near.
   */
  test("hides the glare until the pointer is over the card", async ({
    page,
  }) => {
    await page.goto("/docs/card/tilt-card");

    const glare = page
      .locator("main .h-80 .rounded-2xl .pointer-events-none.absolute.inset-0")
      .first();
    const card = page.locator("main .h-80 .rounded-2xl").first();

    await expect(card).toBeVisible();
    await expect(glare).toHaveCSS("opacity", "0");

    await card.hover();
    await expect
      .poll(async () =>
        Number(await glare.evaluate((el) => getComputedStyle(el).opacity)),
      )
      .toBeGreaterThan(0.8);

    // And it goes away again.
    await page.mouse.move(5, 5);
    await expect
      .poll(async () =>
        Number(await glare.evaluate((el) => getComputedStyle(el).opacity)),
      )
      .toBeLessThan(0.05);
  });
});

test.describe("Dock", () => {
  test("names each item in a tooltip on hover", async ({ page }) => {
    await page.goto("/docs/component/dock");
    const stage = page.locator("main .h-80").first();
    await expect(stage).toBeVisible();

    await expect(page.getByRole("tooltip")).toHaveCount(0);

    await stage.getByRole("button", { name: "Projects" }).hover();
    await expect(page.getByRole("tooltip")).toHaveText("Projects");
  });

  /*
   * A dock whose labels only exist on pointer hover is unusable by keyboard
   * and invisible on touch, so focus has to surface them too.
   */
  test("shows the tooltip on keyboard focus", async ({ page }) => {
    await page.goto("/docs/component/dock");
    const stage = page.locator("main .h-80").first();

    await stage.getByRole("button", { name: "Search" }).focus();
    await expect(page.getByRole("tooltip")).toHaveText("Search");
  });

  test("gives every item an accessible name", async ({ page }) => {
    await page.goto("/docs/component/dock");
    const items = page.locator("main .h-80 [role='toolbar'] button");

    /*
     * `count()` does not auto-wait, and the preview is a `next/dynamic` chunk,
     * so reading it straight after `goto` can land before the dock mounts and
     * return 0. Wait for the first item, then count.
     */
    await expect(items.first()).toBeVisible();

    const count = await items.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      await expect(items.nth(i)).toHaveAttribute("aria-label", /.+/);
    }
  });
});
