/**
 * Generates the shadcn-compatible registry into `public/r/`.
 *
 * After this runs, any component can be installed with:
 *
 *     npx shadcn@latest add https://uibeats.com/r/flip-card.json
 *
 * Everything is derived from `content/docs/*` plus the component source on
 * disk, so the registry cannot drift from the docs. Run via `yarn registry:build`
 * (which `yarn build` does automatically).
 */
import fs from "node:fs";
import path from "node:path";
import componentConfigs from "../content/docs";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "public", "r");
const DEMO_DIR = path.join(ROOT, "components", "demo");

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://uibeats.com"
).replace(/\/$/, "");

const IMPLICIT_DEPS = new Set(["react", "react-dom", "next"]);

interface RegistryFile {
  path: string;
  content: string;
  type: "registry:ui";
  target: string;
}

interface RegistryItem {
  $schema: string;
  name: string;
  type: "registry:ui";
  title: string;
  description: string;
  /** Who wrote this component, so attribution survives an install. */
  author?: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files: RegistryFile[];
}

/** Read the npm packages a component imports, so users get them installed. */
function detectDependencies(source: string): {
  dependencies: string[];
  registryDependencies: string[];
} {
  const dependencies = new Set<string>();
  const registryDependencies = new Set<string>();

  for (const match of source.matchAll(/from\s+["']([^"']+)["']/g)) {
    const specifier = match[1];
    if (!specifier) continue;

    if (specifier.startsWith("@/lib/utils")) {
      registryDependencies.add("utils");
      continue;
    }
    if (specifier.startsWith(".") || specifier.startsWith("@/")) continue;

    const segments = specifier.split("/");
    const pkg = specifier.startsWith("@")
      ? segments.slice(0, 2).join("/")
      : (segments[0] ?? specifier);

    if (!IMPLICIT_DEPS.has(pkg)) dependencies.add(pkg);
  }

  return {
    dependencies: [...dependencies].sort(),
    registryDependencies: [...registryDependencies].sort(),
  };
}

function main() {
  fs.rmSync(OUT_DIR, { recursive: true, force: true });
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const items: RegistryItem[] = [];

  for (const config of componentConfigs) {
    const sourcePath = path.join(
      DEMO_DIR,
      config.category,
      `${config.name}.tsx`,
    );

    if (!fs.existsSync(sourcePath)) {
      throw new Error(
        `Registry: "${config.name}" is documented but has no source at ${path.relative(ROOT, sourcePath)}`,
      );
    }

    const content = fs.readFileSync(sourcePath, "utf8");
    const { dependencies, registryDependencies } = detectDependencies(content);

    const item: RegistryItem = {
      $schema: "https://ui.shadcn.com/schema/registry-item.json",
      name: config.name,
      type: "registry:ui",
      title: config.title,
      description: config.description,
      ...(config.credits
        ? { author: `${config.credits.name} (${config.credits.url})` }
        : {}),
      ...(dependencies.length ? { dependencies } : {}),
      ...(registryDependencies.length ? { registryDependencies } : {}),
      files: [
        {
          path: `components/demo/${config.category}/${config.name}.tsx`,
          content,
          type: "registry:ui",
          target: `components/ui/${config.name}.tsx`,
        },
      ],
    };

    items.push(item);
    fs.writeFileSync(
      path.join(OUT_DIR, `${config.name}.json`),
      `${JSON.stringify(item, null, 2)}\n`,
    );
  }

  // The index the shadcn CLI reads to resolve names and list what is available.
  const registry = {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "ui-beats",
    homepage: SITE_URL,
    items: items.map(({ files: _files, $schema: _schema, ...rest }) => ({
      ...rest,
      files: [
        {
          path: `components/ui/${rest.name}.tsx`,
          type: "registry:ui" as const,
        },
      ],
    })),
  };

  fs.writeFileSync(
    path.join(OUT_DIR, "registry.json"),
    `${JSON.stringify(registry, null, 2)}\n`,
  );

  console.log(
    `registry: wrote ${items.length} items + registry.json to public/r/`,
  );
}

main();
