import { test, expect } from "@playwright/test";

test.describe("marketing pages", () => {
  test("home renders the hero and links into the docs", async ({ page }) => {
    await page.goto("/");
    await expect(
      // Matches the stable half of the headline. Pinning the whole sentence
      // means every copy tweak fails a test that is really here to check the
      // hero rendered at all.
      page.getByRole("heading", { name: /animated react components/i }),
    ).toBeVisible();

    await page.getByRole("link", { name: /browse components/i }).click();
    await expect(page).toHaveURL(/\/docs\//);
  });

  test("blog index lists posts and filters by category", async ({ page }) => {
    await page.goto("/blogs");
    await expect(
      page.getByRole("heading", { name: "Blog", level: 1 }),
    ).toBeVisible();

    const cards = page.getByRole("link", { name: /read more/i });
    await expect(cards.first()).toBeVisible();
  });

  test("a blog post renders its body", async ({ page }) => {
    await page.goto("/blogs");
    await page
      .getByRole("link", { name: /read more/i })
      .first()
      .click();
    await expect(page).toHaveURL(/\/blogs\/[a-z0-9-]+$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});

test.describe("seo endpoints", () => {
  test("sitemap lists component and blog routes on one host", async ({
    request,
  }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.ok()).toBeTruthy();

    const xml = await response.text();
    expect(xml).toContain("/docs/card/flip-card");

    /*
     * Regression: the sitemap used to emit www.uibeats.com while canonical
     * tags used uibeats.com, splitting ranking signals across two hosts.
     */
    const hosts = new Set(
      [...xml.matchAll(/<loc>(https?:\/\/[^/<]+)/g)].map((m) => m[1]),
    );
    expect(hosts.size).toBe(1);
  });

  test("rss items point at /blogs/, not /blog/", async ({ request }) => {
    const response = await request.get("/api/rss.xml");
    expect(response.ok()).toBeTruthy();

    const xml = await response.text();
    expect(xml).toContain("/blogs/");
    expect(xml).not.toMatch(/<link>https?:\/\/[^/]+\/blog\/[a-z0-9-]/);
  });

  test("robots.txt advertises the sitemap", async ({ request }) => {
    const response = await request.get("/robots.txt");
    expect(response.ok()).toBeTruthy();
    expect(await response.text()).toContain("Sitemap:");
  });
});

test.describe("accessibility basics", () => {
  test("home has exactly one h1 and a skip link", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(
      page.getByRole("link", { name: /skip to content/i }),
    ).toBeAttached();
  });

  /*
   * A blog post, not the blog index.
   *
   * This used to load `/blogs` and assert an image was visible before checking
   * alt text. That passed only because the site header carried a raster logo,
   * so every page was guaranteed one `<img>`; the blog *cards* have never
   * rendered images. When the logo became an inline SVG the page dropped to
   * zero images and the test failed without anything about image
   * accessibility having changed. A post body is where the images actually
   * are, so that is what is worth asserting on.
   */
  test("images carry alt text", async ({ page }) => {
    await page.goto("/blogs");
    await page
      .getByRole("link", { name: /read more/i })
      .first()
      .click();
    await expect(page).toHaveURL(/\/blogs\/[a-z0-9-]+$/);

    const images = page.locator("img");
    // Same non-auto-waiting caveat as elsewhere: settle before counting.
    await expect(images.first()).toBeVisible();
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      await expect(images.nth(i)).toHaveAttribute("alt", /.*/);
    }
  });
});

test.describe("home showcase", () => {
  /** Scroll the whole page so every lazily mounted demo has been created. */
  const mountEverything = async (page: import("@playwright/test").Page) => {
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.8;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 150));
      }
      window.scrollTo(0, 0);
    });
  };

  /*
   * Regression: every tile used to be one big `<Link>` wrapped around its
   * demo, which put the dock's buttons and the magnetic button inside an
   * anchor — invalid markup, and it meant any attempt to play with a demo
   * navigated away from the page instead.
   */
  test("never nests an interactive control inside a link", async ({ page }) => {
    await page.goto("/");
    await mountEverything(page);

    const nested = await page.evaluate(
      () =>
        document.querySelectorAll("a button, a a, a [role='button']").length,
    );
    expect(nested).toBe(0);
  });

  test("playing with a demo does not navigate away", async ({ page }) => {
    await page.goto("/");
    await mountEverything(page);

    const button = page.getByRole("button", { name: "Press anywhere" });
    await button.scrollIntoViewIfNeeded();
    await button.click();

    await expect(page).toHaveURL(/\/$/);
  });

  test("mounts demos only once they are near the viewport", async ({
    page,
  }) => {
    await page.goto("/");

    // The dock lives most of the way down the showcase, so it must not be in
    // the document while the visitor is still reading the hero.
    const dock = page.locator("[role='toolbar'][aria-label='Dock']");
    await expect(dock).toHaveCount(0);

    await mountEverything(page);
    await expect(dock).toHaveCount(1);
  });
});
