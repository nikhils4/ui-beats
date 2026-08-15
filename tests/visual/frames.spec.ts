import { test, expect } from "@playwright/test";
import componentConfigs from "../../content/docs";

/**
 * Pixel snapshots of an animation, taken at fixed points along it.
 *
 * Screenshotting an animated component normally produces a different image
 * every run, which is why nobody in this category does it — and why a
 * regression in the middle of a transition ships unnoticed until somebody
 * happens to look. Playwright's clock removes the variable: time is installed
 * frozen, then advanced by an exact number of milliseconds, so frame 300 is
 * the same frame 300 on every machine and every run.
 *
 * Kept in a separate project from `settle.spec.ts`. That one is deterministic
 * everywhere and gates every pull request; this one owns platform-specific
 * baselines and runs where those baselines were made.
 */

/**
 * Where along an entrance the interesting frames are.
 *
 * Zero is deliberately included. The first frame is where a broken initial
 * variant shows up — a component that starts already settled has lost its
 * animation, and no later frame can tell you that.
 */
const FRAMES_MS = [0, 300, 1200];

test.describe.configure({ mode: "parallel" });

for (const config of componentConfigs) {
  const key = `${config.category}/${config.name}`;

  test(`frames — ${key}`, async ({ page }) => {
    /*
     * Installed before navigation so the page never sees a real clock. Motion
     * reads `performance.now()` on its first frame; letting that be genuine
     * and only then freezing it produces an off-by-a-few-milliseconds start
     * that shows up as a diff.
     */
    await page.clock.install({ time: 0 });
    await page.goto(`/docs/${config.category}/${config.name}`);

    const stage = page.locator(`[data-preview-stage="${key}"]`);
    await expect(stage).toBeVisible();

    /*
     * The stage is server-rendered and visible at once; the preview inside it
     * is a `next/dynamic` chunk that lands later, behind a skeleton. Asserting
     * on the stage alone let frame 0 race that chunk, capturing the skeleton
     * about one run in forty — a different component each time, which is what
     * made this suite look flaky rather than broken.
     *
     * The wait is free: the clock is frozen, so nothing animates while the
     * chunk loads and frame 0 is still frame 0 when it arrives.
     */
    await expect(stage.locator("[data-preview-loading]")).toHaveCount(0);

    for (const at of FRAMES_MS) {
      // `runFor` advances by a delta, so each step moves from the previous
      // frame to this one rather than restarting from zero.
      const delta = at - (FRAMES_MS[FRAMES_MS.indexOf(at) - 1] ?? 0);
      if (delta > 0) await page.clock.runFor(delta);

      await expect(stage).toHaveScreenshot(`${config.name}-${at}ms.png`, {
        /*
         * Antialiasing on a rotated or blurred edge differs by a pixel or two
         * between driver versions without anything having changed. A flat
         * ratio absorbs that; anything that actually moved is orders of
         * magnitude larger than this.
         */
        maxDiffPixelRatio: 0.02,
        // Playwright's own animation freezing on top of the frozen clock, for
        // CSS transitions that never went through Motion at all.
        animations: "disabled",
      });
    }
  });
}
