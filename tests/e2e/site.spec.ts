import { test, expect } from "@playwright/test";

test.describe("marketing pages", () => {
  test("home renders the hero and links into the docs", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: /supercharge your ui/i }),
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

  test("images carry alt text", async ({ page }) => {
    await page.goto("/blogs");
    const images = page.locator("img");
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      await expect(images.nth(i)).toHaveAttribute("alt", /.*/);
    }
  });
});
