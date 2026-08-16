import { test, expect } from "@playwright/test";

const CATEGORIES = [
  "animation",
  "background",
  "button",
  "card",
  "component",
  "text",
] as const;

test.describe("docs navigation", () => {
  /*
   * Regression: each `/docs/<category>` landing page redirected using a
   * hardcoded index into the nav array, and every one of the six was wrong:
   * `/docs/text` landed on an animation page, `/docs/button` on a background.
   */
  for (const category of CATEGORIES) {
    test(`/docs/${category} is an indexable landing page`, async ({ page }) => {
      await page.goto(`/docs/${category}`);

      // These were bare redirects to the first component, so six URLs could
      // never rank for the plural query people search before they know a
      // component's name. They render in place now.
      await expect(page).toHaveURL(new RegExp(`/docs/${category}$`));
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        new RegExp(`/docs/${category}$`),
      );

      // Every component link in the list must stay inside this category. The
      // old hardcoded sideNav[n] redirects all pointed at the wrong section.
      //
      // Scoped to the <ul> deliberately: the breadcrumb is an <ol>, and its
      // "Docs" link has the same path-segment count as a component link, so a
      // looser selector picks it up and the assertion fails on the test's own
      // sloppiness rather than on a real bug.
      const links = page.locator("main ul a[href^='/docs/']");
      await expect(links.first()).toBeVisible();

      const hrefs = await links.evaluateAll((nodes) =>
        nodes.map((node) => node.getAttribute("href") ?? ""),
      );

      expect(hrefs.length).toBeGreaterThan(0);
      for (const href of hrefs) {
        expect(href).toMatch(new RegExp(`^/docs/${category}/`));
      }
    });
  }

  test("/docs redirects into getting started", async ({ page }) => {
    await page.goto("/docs");
    await expect(page).toHaveURL(/\/docs\/getting-started\/introduction$/);
  });

  test("an unknown component 404s", async ({ page }) => {
    const response = await page.goto("/docs/card/not-a-real-component");
    expect(response?.status()).toBe(404);
  });
});

test.describe("component page", () => {
  test("renders title, props and install command server-side", async ({
    page,
  }) => {
    await page.goto("/docs/card/flip-card");

    await expect(page).toHaveTitle(/Flip Card/);
    await expect(
      page.getByRole("heading", { name: "Flip Card", level: 1 }),
    ).toBeVisible();

    // Props table is prerendered, not fetched after hydration.
    await expect(
      page.getByRole("cell", { name: "flipDirection" }),
    ).toBeVisible();

    await expect(
      page.getByText("npx shadcn@latest add", { exact: false }).first(),
    ).toBeVisible();
  });

  test("exposes a canonical URL and OG tags", async ({ page }) => {
    await page.goto("/docs/text/text-shine");

    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      /\/docs\/text\/text-shine$/,
    );
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      "content",
      /Text Shine/,
    );
  });

  test("switches between preview and code tabs", async ({ page }) => {
    await page.goto("/docs/animation/bounce");

    await page.getByRole("tab", { name: "Code" }).first().click();
    await expect(page.getByText("BounceUsage").first()).toBeVisible();
  });

  test("sidebar links to another component", async ({ page }) => {
    await page.goto("/docs/animation/bounce");

    /*
     * On mobile the sidebar is an off-canvas Sheet that is not rendered at all
     * until it is opened: the links are absent from the DOM, not merely
     * hidden. Tapping the trigger is the real mobile navigation path, so open
     * it rather than skipping the project.
     */
    const link = page.getByRole("link", { name: "Fade In", exact: true });

    if ((await link.count()) === 0) {
      await page.getByRole("button", { name: /toggle sidebar/i }).click();
    }

    await link.click();
    await expect(page).toHaveURL(/\/docs\/animation\/fade-in$/);
  });
});

test.describe("registry", () => {
  test("serves the registry index", async ({ request }) => {
    const response = await request.get("/r/registry.json");
    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    expect(body.name).toBe("ui-beats");
    expect(Array.isArray(body.items)).toBe(true);
    expect(body.items.length).toBeGreaterThan(0);
  });

  test("serves an installable item with its source", async ({ request }) => {
    const response = await request.get("/r/flip-card.json");
    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    expect(body.name).toBe("flip-card");
    expect(body.dependencies).toContain("motion");
    expect(body.files[0].content).toContain("FlipCard");
    expect(body.files[0].target).toBe("components/ui/flip-card.tsx");
  });
});
