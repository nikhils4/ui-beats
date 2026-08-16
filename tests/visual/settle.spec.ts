import { test, expect, type Locator } from "@playwright/test";
import componentConfigs from "../../content/docs";

/**
 * Every component ends up visible, with motion and without it.
 *
 * The failure this exists for has no pixel baseline and no thrown error: an
 * entrance animation whose settled state never arrives leaves real content in
 * the DOM at `opacity: 0`, reading perfectly to a crawler and to `toBeVisible`
 * while showing the user an empty box. Forty components got a reduced-motion
 * branch in one pass, and that branch is exactly where such a state hides,
 * because nobody browses the site with the setting on.
 *
 * No screenshots here on purpose: this half has to be deterministic enough to
 * gate every pull request, so it asserts a measured property rather than a
 * picture. `tests/visual/frames.spec.ts` does the pixels.
 */

/**
 * Whether anything inside the stage is actually being shown to a reader.
 *
 * Opacity is read as rendered, not as declared: a `motion.div` at `opacity: 1`
 * inside a wrapper still at 0 is invisible, and the per-element value says
 * nothing about that, which is the entire bug class this is chasing.
 */
async function hasVisibleContent(stage: Locator): Promise<boolean> {
  return stage.evaluate((root: HTMLElement) => {
    const effectiveOpacity = (node: HTMLElement): number => {
      let value = 1;
      let current: HTMLElement | null = node;
      while (current && current !== root.parentElement) {
        const style = getComputedStyle(current);
        if (style.visibility === "hidden" || style.display === "none") return 0;
        value *= Number(style.opacity || "1");
        current = current.parentElement;
      }
      return value;
    };

    const stageBox = root.getBoundingClientRect();

    return Array.from(root.querySelectorAll<HTMLElement>("*")).some((node) => {
      // The replay button is page chrome, not the component, and it is always
      // present and opaque; it would pass every check below on its own.
      if (node.closest("[aria-label='Replay animation']")) return false;

      const box = node.getBoundingClientRect();
      if (box.width < 6 || box.height < 6) return false;

      // Inside the frame, rather than parked outside it mid-travel.
      const inside =
        box.right > stageBox.left &&
        box.left < stageBox.right &&
        box.bottom > stageBox.top &&
        box.top < stageBox.bottom;
      if (!inside) return false;

      return effectiveOpacity(node) > 0.9;
    });
  });
}

for (const config of componentConfigs) {
  const key = `${config.category}/${config.name}`;
  const url = `/docs/${config.category}/${config.name}`;

  test.describe(config.title, () => {
    test("settles into view with motion running", async ({ page }) => {
      await page.goto(url);
      const stage = page.locator(`[data-preview-stage="${key}"]`);
      await expect(stage).toBeVisible();

      // Generous, because it is not measuring speed: a component that has not
      // settled in three seconds is broken rather than slow.
      await expect
        .poll(() => hasVisibleContent(stage), { timeout: 3_000 })
        .toBe(true);
    });

    test("is already settled under reduced motion", async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(url);
      const stage = page.locator(`[data-preview-stage="${key}"]`);
      await expect(stage).toBeVisible();

      /*
       * A much tighter budget than the motion case, and that tightness is the
       * assertion. With the preference set there is nothing left to wait for,
       * so anything still arriving a second later is running an animation it
       * was asked not to run.
       */
      await expect
        .poll(() => hasVisibleContent(stage), { timeout: 1_000 })
        .toBe(true);
    });
  });
}
