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
import { cssVarsFor, unknownTokensFor } from "../config/tokens";
import { detectDependencies, publishableSource } from "../lib/registry-deps";
import { siteConfig } from "../lib/site";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "public", "r");
const WELL_KNOWN_DIR = path.join(ROOT, "public", ".well-known");
const DEMO_DIR = path.join(ROOT, "components", "demo");
const MCP_PKG = path.join(ROOT, "packages", "mcp", "package.json");

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://uibeats.com"
).replace(/\/$/, "");

/**
 * Where each kind of item installs, and what shadcn should call it.
 *
 * A block is a whole section rather than a primitive, so it lands in
 * `components/blocks/` and is typed `registry:block`. The distinction is not
 * cosmetic: it is what stops a hero section being filed next to `button.tsx`
 * in someone's UI folder.
 */
const ITEM_KIND = {
  component: {
    itemType: "registry:ui",
    fileType: "registry:ui",
    dir: "components/ui",
  },
  block: {
    itemType: "registry:block",
    fileType: "registry:component",
    dir: "components/blocks",
  },
} as const;

type ItemKind = keyof typeof ITEM_KIND;

interface RegistryFile {
  path: string;
  content: string;
  type: string;
  target: string;
}

interface RegistryItem {
  $schema: string;
  name: string;
  type: string;
  title: string;
  description: string;
  /** Who wrote this component, so attribution survives an install. */
  author?: string;
  dependencies?: string[];
  registryDependencies?: string[];
  /**
   * Theme tokens the CLI merges into the user's stylesheet on install.
   *
   * Only the ones this component actually reads; see `config/tokens.ts` for
   * why a component's own inline variables are not in here.
   */
  cssVars?: { light: Record<string, string>; dark: Record<string, string> };
  files: RegistryFile[];
}

/**
 * A UI Beats component named as an absolute registry URL.
 *
 * shadcn resolves a `registryDependencies` entry that looks like a URL by
 * fetching it, which is how a block installed from here brings its own parts
 * with it rather than landing broken in a project that has none of them.
 */
function registryUrlFor(name: string): string {
  return `${SITE_URL}/r/${name}.json`;
}

/**
 * Who wrote a component, always answered.
 *
 * `credits` is only set for components someone else wrote, so five of the
 * author's own were shipping with no `author` at all: the field simply
 * vanished on those entries, which reads as missing data to anything consuming
 * the catalogue rather than as different provenance.
 *
 * A `kind: "tool"` credit is not authorship. The docs page has always drawn
 * that line (it types a tool credit as `SoftwareApplication` rather than
 * `Person` in its JSON-LD) but this function did not carry `kind` in its
 * signature at all, so it could not see the difference and promoted the tool
 * into `author`. That put "Claude Code" on 39 of 55 entries in the one file
 * every directory, scraper and MCP client reads, against 5 for the maintainer.
 * The credit itself is untouched and still renders on the component page; it
 * simply stops standing in for the person answerable for the code.
 */
function authorFor(config: {
  credits?: { name: string; url: string; kind?: string };
}): string {
  return config.credits && config.credits.kind !== "tool"
    ? `${config.credits.name} (${config.credits.url})`
    : `${siteConfig.author.name} (${siteConfig.author.url})`;
}

/**
 * One entry in `components.json`: the catalogue the MCP server reads.
 *
 * The shadcn `registry.json` deliberately stays inside its own schema, so the
 * props table and the guidance prose that an agent needs in order to *pick*
 * the right component live here instead of being smuggled into that file.
 *
 * Deliberately no `source`: this is a search index, and the source is already
 * served two ways (`/r/<name>.json` and `/docs/<cat>/<name>.md`). Duplicating
 * 34 components of source here would triple the file an agent downloads just
 * to find out which component it wants.
 */
interface CatalogueEntry {
  name: string;
  title: string;
  category: string;
  description: string;
  whenToUse?: string;
  docs: string;
  markdown: string;
  install: string;
  registry: string;
  dependencies: string[];
  registryDependencies: string[];
  props: {
    prop: string;
    type: string;
    defaultValue: string;
    description: string;
  }[];
  author?: string;
}

/**
 * The MCP server card, at `/.well-known/mcp.json`.
 *
 * Lets an agent that only knows the domain discover that a UI Beats MCP server
 * exists and how to run it, instead of needing someone to have read the README.
 *
 * `packages` rather than `remotes`: this server is stdio, spawned by the client
 * from npm: there is no HTTP endpoint to advertise. Name and version are read
 * off the package itself so a release cannot leave this file stale.
 */
function writeServerCard() {
  const pkg = JSON.parse(fs.readFileSync(MCP_PKG, "utf8")) as {
    name: string;
    version: string;
    description: string;
  };

  const card = {
    $schema:
      "https://static.modelcontextprotocol.io/schemas/2025-10-17/server.schema.json",
    // Reverse-DNS, exactly one slash, per the schema.
    name: "com.uibeats/mcp",
    title: "UI Beats",
    description: pkg.description,
    version: pkg.version,
    websiteUrl: SITE_URL,
    repository: {
      url: "https://github.com/nikhils4/ui-beats",
      source: "github",
      // Stable across renames, and changes if the repo is deleted and recreated.
      id: "825856991",
      subfolder: "packages/mcp",
    },
    packages: [
      {
        registryType: "npm",
        identifier: pkg.name,
        version: pkg.version,
        transport: { type: "stdio" },
      },
    ],
  };

  fs.rmSync(WELL_KNOWN_DIR, { recursive: true, force: true });
  fs.mkdirSync(WELL_KNOWN_DIR, { recursive: true });
  fs.writeFileSync(
    path.join(WELL_KNOWN_DIR, "mcp.json"),
    `${JSON.stringify(card, null, 2)}\n`,
  );

  return `${pkg.name}@${pkg.version}`;
}

function main() {
  fs.rmSync(OUT_DIR, { recursive: true, force: true });
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const items: RegistryItem[] = [];
  const catalogue: CatalogueEntry[] = [];

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

    const source = fs.readFileSync(sourcePath, "utf8");
    // What an installed project sees: a block's imports of its own parts get
    // repointed from `components/demo/<category>/` to `components/ui/`, where
    // the CLI will have just written them.
    const content = publishableSource(source);
    const { dependencies, registryDependencies, beatsDependencies } =
      detectDependencies(source);

    const kind: ItemKind = config.category === "block" ? "block" : "component";
    const { itemType, fileType, dir } = ITEM_KIND[kind];

    for (const dependency of beatsDependencies) {
      const exists = componentConfigs.some((c) => c.name === dependency);
      if (!exists) {
        throw new Error(
          `Registry: "${config.name}" imports "${dependency}", which is not a documented component. ` +
            `A block may only compose things the registry can actually install.`,
        );
      }
    }

    const allRegistryDeps = [
      ...registryDependencies,
      ...beatsDependencies.map(registryUrlFor),
    ];

    /*
     * A dangling token is a broken install that looks fine here, because this
     * origin defines every variable the site has ever used. Failing the build
     * is the only place the difference is visible.
     */
    const unknown = unknownTokensFor(content);
    if (unknown.length) {
      throw new Error(
        `Registry: "${config.name}" reads ${unknown
          .map((name) => `--${name}`)
          .join(", ")}, which no installed project would define. Add it to ` +
          `BEATS_TOKENS in config/tokens.ts, or use a shadcn base token.`,
      );
    }

    const cssVars = cssVarsFor(content);

    const item: RegistryItem = {
      $schema: "https://ui.shadcn.com/schema/registry-item.json",
      name: config.name,
      type: itemType,
      title: config.title,
      description: config.description,
      author: authorFor(config),
      ...(dependencies.length ? { dependencies } : {}),
      ...(allRegistryDeps.length
        ? { registryDependencies: allRegistryDeps }
        : {}),
      ...(cssVars ? { cssVars } : {}),
      files: [
        {
          path: `components/demo/${config.category}/${config.name}.tsx`,
          content,
          type: fileType,
          target: `${dir}/${config.name}.tsx`,
        },
      ],
    };

    items.push(item);
    fs.writeFileSync(
      path.join(OUT_DIR, `${config.name}.json`),
      `${JSON.stringify(item, null, 2)}\n`,
    );

    catalogue.push({
      name: config.name,
      title: config.title,
      category: config.category,
      description: config.description,
      ...(config.whenToUse ? { whenToUse: config.whenToUse } : {}),
      docs: `${SITE_URL}/docs/${config.category}/${config.name}`,
      markdown: `${SITE_URL}/docs/${config.category}/${config.name}.md`,
      install: `npx shadcn@latest add ${SITE_URL}/r/${config.name}.json`,
      registry: `${SITE_URL}/r/${config.name}.json`,
      dependencies,
      registryDependencies: allRegistryDeps,
      props: config.props,
      author: authorFor(config),
    });
  }

  // The index the shadcn CLI reads to resolve names and list what is available.
  const registry = {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "ui-beats",
    homepage: SITE_URL,
    /*
     * Derived from each item's own file entries rather than rebuilt from its
     * name. The old version hardcoded `components/ui/<name>.tsx`, which was
     * true of every item right up until blocks started installing to
     * `components/blocks/`, at which point the index would have advertised a
     * path no block actually writes to.
     */
    items: items.map(({ files, $schema: _schema, ...rest }) => ({
      ...rest,
      files: files.map((file) => ({
        path: file.target,
        type: file.type,
      })),
    })),
  };

  fs.writeFileSync(
    path.join(OUT_DIR, "registry.json"),
    `${JSON.stringify(registry, null, 2)}\n`,
  );

  /*
   * The catalogue the MCP server fetches on startup.
   *
   * Shipping it as a static file rather than an API route means the MCP server
   * needs no backend of its own, and the existing CORS + cache headers on
   * `/r/:path*.json` already apply to it.
   */
  fs.writeFileSync(
    path.join(OUT_DIR, "components.json"),
    `${JSON.stringify(
      {
        name: "ui-beats",
        homepage: SITE_URL,
        license: "MIT",
        count: catalogue.length,
        categories: [...new Set(catalogue.map((entry) => entry.category))],
        components: catalogue,
      },
      null,
      2,
    )}\n`,
  );

  const server = writeServerCard();

  console.log(
    `registry: wrote ${items.length} items + registry.json + components.json to public/r/`,
  );
  console.log(`registry: wrote .well-known/mcp.json for ${server}`);
}

main();
