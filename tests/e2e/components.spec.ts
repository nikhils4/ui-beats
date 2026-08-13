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

test.describe("Split Flap", () => {
  /*
   * Regression: the flaps were rendered through an `AnimatePresence`, and at
   * one flip every 55ms the exits could not retire faster than they arrived —
   * a spinning column ended up holding twenty invisible cards it had already
   * turned over. Each cell now renders exactly the outgoing and incoming card.
   */
  test("retires each card it turns over", async ({ page }) => {
    await page.goto("/docs/text/split-flap");

    const cells = page.locator("main .h-80 span.font-mono > span[aria-hidden]");
    await expect(cells.first()).toBeVisible();

    // Sample through a full spin, including the change of text at ~3.2s.
    for (let sample = 0; sample < 8; sample++) {
      const most = await cells.evaluateAll((nodes) =>
        Math.max(
          ...nodes.map(
            (node) =>
              node.querySelectorAll(":scope > span:not(.pointer-events-none)")
                .length,
          ),
        ),
      );
      expect(most).toBeLessThanOrEqual(2);
      await page.waitForTimeout(500);
    }
  });

  test("exposes the settled text once, to screen readers", async ({ page }) => {
    await page.goto("/docs/text/split-flap");

    const label = page.locator("main .h-80 span.font-mono .sr-only").first();
    await expect(label).toHaveText(/^[A-Z ]+$/);
  });
});

test.describe("Ripple Button", () => {
  /*
   * A ripple that outlives its animation is a node the button keeps forever,
   * so every ripple removes itself the moment it finishes.
   */
  test("removes each ripple once it has finished", async ({ page }) => {
    await page.goto("/docs/button/ripple-button");

    const stage = page.locator("main .h-80").first();
    const button = stage.getByRole("button", { name: "Press anywhere" });
    const ripples = button.locator("span.rounded-full");

    await expect(button).toBeVisible();
    for (let press = 0; press < 3; press++) await button.click();

    await expect(ripples).toHaveCount(0, { timeout: 3000 });
  });

  /*
   * Regression: activating a button from the keyboard makes Chromium fire a
   * synthetic pointerdown with an empty `pointerType` at coordinates (0, 0) as
   * well as the click, so Enter used to produce two ripples — the second of
   * them starting from outside the button entirely.
   */
  test("ripples exactly once, from the centre, on a keyboard press", async ({
    page,
  }) => {
    await page.goto("/docs/button/ripple-button");

    const stage = page.locator("main .h-80").first();
    const button = stage.getByRole("button", { name: "Press anywhere" });
    await button.focus();
    await button.press("Enter");

    const ripples = button.locator("span.rounded-full");
    // Read immediately: a ripple removes itself as soon as it finishes.
    expect(await ripples.count()).toBe(1);

    const box = await button.boundingBox();
    const ripple = await ripples.first().boundingBox();
    if (!box || !ripple) throw new Error("no ripple to measure");

    // Centred on the button, rather than on the viewport's top-left corner.
    expect(
      Math.abs(ripple.x + ripple.width / 2 - (box.x + box.width / 2)),
    ).toBeLessThan(2);
    expect(
      Math.abs(ripple.y + ripple.height / 2 - (box.y + box.height / 2)),
    ).toBeLessThan(2);
  });
});

test.describe("Scratch to Reveal", () => {
  /*
   * A control that can only be operated by dragging a pointer across it is
   * unusable to anyone who does not have one.
   */
  test("reveals from the keyboard alone", async ({ page }) => {
    await page.goto("/docs/component/scratch-to-reveal");

    const canvas = page.locator("main .h-80 canvas").first();
    await expect(canvas).toBeVisible();
    await expect(canvas).toHaveCSS("opacity", "1");

    await canvas.focus();
    await canvas.press("Enter");

    await expect
      .poll(async () =>
        Number(await canvas.evaluate((el) => getComputedStyle(el).opacity)),
      )
      .toBeLessThan(0.05);
  });
});

test.describe("Liquid Tabs", () => {
  test("moves the selection with the arrow keys and wraps", async ({
    page,
  }) => {
    await page.goto("/docs/component/liquid-tabs");

    const stage = page.locator("main .h-80").first();
    const selected = stage.getByRole("tab", { selected: true });
    await expect(selected).toHaveText("Overview");

    await selected.press("ArrowLeft");
    await expect(stage.getByRole("tab", { selected: true })).toHaveText(
      "Settings",
    );

    await stage.getByRole("tab", { selected: true }).press("ArrowRight");
    await expect(stage.getByRole("tab", { selected: true })).toHaveText(
      "Overview",
    );
  });

  test("keeps one tab stop for the whole group", async ({ page }) => {
    await page.goto("/docs/component/liquid-tabs");

    const stage = page.locator("main .h-80").first();
    const tabs = stage.getByRole("tab");
    await expect(tabs.first()).toBeVisible();

    const stops = await tabs.evaluateAll(
      (nodes) =>
        nodes.filter((node) => node.getAttribute("tabindex") === "0").length,
    );
    expect(stops).toBe(1);
  });
});

test.describe("Card Stack", () => {
  test("advances when the top card is thrown aside", async ({ page }) => {
    await page.goto("/docs/card/card-stack");

    const deck = page.locator("main .h-80").first().getByRole("group");
    await expect(deck).toBeVisible();
    const before = await deck.textContent();

    const box = await deck.boundingBox();
    if (!box) throw new Error("card stack has no box");

    const midY = box.y + box.height / 2;
    await page.mouse.move(box.x + box.width / 2, midY);
    await page.mouse.down();
    for (let step = 1; step <= 10; step++) {
      await page.mouse.move(box.x + box.width / 2 + step * 22, midY);
    }
    await page.mouse.up();

    await expect.poll(async () => await deck.textContent()).not.toBe(before);
  });
});
