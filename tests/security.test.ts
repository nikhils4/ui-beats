import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

/*
 * The original `/api/file-content` route did:
 *
 *   const filePath = path.join(process.cwd(), "components/demo/", fileName);
 *   fs.readFileSync(filePath, "utf8")
 *
 * with `fileName` taken straight from the query string, so
 * `?file=../../.env.local` escaped the directory and returned arbitrary server
 * files over HTTP. Component source is now read at build time from names that
 * come out of the registry.
 */
describe("component source is not reachable over HTTP", () => {
  it("has no file-content API route", () => {
    expect(fs.existsSync(path.join(ROOT, "app/api/file-content"))).toBe(false);
  });

  it("has no route handler that reads a path from the request", () => {
    const apiDir = path.join(ROOT, "app/api");
    if (!fs.existsSync(apiDir)) return;

    const routes: string[] = [];
    const walk = (dir: string) => {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) walk(full);
        else if (entry.name === "route.ts" || entry.name === "route.tsx") {
          routes.push(full);
        }
      }
    };
    walk(apiDir);

    for (const route of routes) {
      const source = fs.readFileSync(route, "utf8");
      const readsFiles = /readFile(Sync)?|createReadStream/.test(source);
      const readsUserInput =
        /searchParams|params|await\s+request\.(json|text)/.test(source);

      expect(
        readsFiles && readsUserInput,
        `${path.relative(ROOT, route)} both reads files and reads request input`,
      ).toBe(false);
    }
  });
});

describe("registry source reads stay inside their base directory", () => {
  // Mirrors the containment check in lib/registry.ts:readContained.
  const contains = (baseDir: string, relativePath: string) => {
    const base = path.resolve(baseDir);
    const target = path.resolve(base, relativePath);
    return target === base || target.startsWith(base + path.sep);
  };

  const base = path.join(ROOT, "components", "demo");

  it("accepts legitimate component paths", () => {
    expect(contains(base, "card/flip-card.tsx")).toBe(true);
    expect(contains(base, "text/text-shine.tsx")).toBe(true);
  });

  it("rejects traversal attempts", () => {
    for (const attack of [
      "../../.env.local",
      "../../package.json",
      "../../../../../../etc/passwd",
      "card/../../../next.config.mjs",
      "/etc/passwd",
    ]) {
      expect(contains(base, attack), `traversal allowed: ${attack}`).toBe(
        false,
      );
    }
  });
});

describe("html injection sinks", () => {
  it("only feeds JSON.stringify'd data to dangerouslySetInnerHTML", () => {
    /*
     * Credits used to be an HTML string piped through dangerouslySetInnerHTML
     * and scrubbed with DOMPurify; they are structured data now. JSON-LD still
     * legitimately uses the same API, so assert on the argument rather than
     * banning the prop outright: every usage must be a JSON.stringify call.
     */
    const files = [
      "app/docs/[category]/[component]/page.tsx",
      "app/docs/[category]/page.tsx",
      "app/blogs/[slug]/page.tsx",
      "app/layout.tsx",
    ];

    for (const file of files) {
      const source = fs.readFileSync(path.join(ROOT, file), "utf8");
      const usages = [
        ...source.matchAll(
          /dangerouslySetInnerHTML=\{\{\s*__html:\s*([^}]+)\}\}/g,
        ),
      ];

      for (const [, argument] of usages) {
        expect(
          argument?.trim().startsWith("JSON.stringify("),
          `${file} passes non-JSON content to dangerouslySetInnerHTML: ${argument}`,
        ).toBe(true);
      }
    }
  });

  it("never renders a credits field as HTML", () => {
    const docsPage = fs.readFileSync(
      path.join(ROOT, "app/docs/[category]/[component]/page.tsx"),
      "utf8",
    );
    expect(docsPage).not.toMatch(/__html:\s*[^}]*credits/);
  });

  it("has dropped the DOMPurify/JSDOM sanitiser entirely", () => {
    const utils = fs.readFileSync(path.join(ROOT, "lib/utils.ts"), "utf8");
    expect(utils).not.toContain("DOMPurify");
    expect(utils).not.toContain("jsdom");
  });
});
