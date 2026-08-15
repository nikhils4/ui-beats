import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.PORT ?? 3000);
const baseURL = `http://127.0.0.1:${PORT}`;

export default defineConfig({
  // Widened from `tests/e2e` to take in `tests/visual`. Which specs a run
  // actually executes is decided per project below, not by the directory.
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  /*
   * Baselines are keyed by project and platform.
   *
   * The platform segment is not optional: font hinting and antialiasing differ
   * enough between macOS and the CI runner that a baseline made on one fails
   * wholesale on the other, and the resulting diff tells you nothing. Keeping
   * them apart means a developer can generate their own locally without ever
   * touching the set CI compares against.
   */
  snapshotPathTemplate:
    "{testDir}/visual/__screenshots__/{platform}/{arg}{ext}",
  projects: [
    {
      name: "chromium",
      testMatch: ["e2e/**/*.spec.ts", "visual/settle.spec.ts"],
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "mobile",
      testMatch: "e2e/**/*.spec.ts",
      use: { ...devices["Pixel 7"] },
    },
    /*
     * Pixel diffing, excluded from the default run.
     *
     * Not because it is unimportant, but because it is the one suite whose
     * pass/fail depends on where it runs. `yarn test:visual` selects it
     * explicitly; CI runs it as its own job against committed Linux baselines.
     */
    {
      name: "visual",
      testMatch: "visual/frames.spec.ts",
      use: {
        ...devices["Desktop Chrome"],
        // Pinned so a baseline is not invalidated by a machine's own display.
        viewport: { width: 1280, height: 720 },
        deviceScaleFactor: 1,
        // The site is theme-aware and the stage colour changes with it; a
        // baseline has to state which one it captured.
        colorScheme: "light",
      },
    },
  ],
  // Runs against the production build so the assertions cover the real
  // prerendered HTML rather than a dev-mode render.
  webServer: {
    command: `yarn build && yarn start -p ${PORT}`,
    url: baseURL,
    /*
     * Opt in to reuse; do not default to it.
     *
     * This was `!process.env.CI`, which meant any process already listening on
     * the port was adopted silently: a `next dev` server, or a `next start`
     * left over from an older build. The suite then tested code that was not
     * the code in the working tree, and reported it as failures in the code
     * that was. One run cost 25 phantom failures across Tilt Card, Dock, Card
     * Stack and others, all of which passed on a free port with no source
     * change at all.
     *
     * The default now always builds and serves the current tree. Set
     * `E2E_REUSE_SERVER=1` to keep a server between runs while iterating on a
     * spec, which is the case the old default was quietly optimising for.
     */
    reuseExistingServer:
      !process.env.CI && process.env.E2E_REUSE_SERVER === "1",
    timeout: 300_000,
  },
});
