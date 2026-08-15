#!/usr/bin/env node
/**
 * UI Beats MCP server.
 *
 * Lets a coding agent search the component catalogue, read a component's full
 * documentation and source, and get the exact install command — without the
 * user ever opening the website.
 *
 * Run it over stdio:
 *
 *     npx -y @uibeats/mcp
 */
import { createRequire } from "node:module";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import {
  ORIGIN,
  fetchComponentMarkdown,
  findComponent,
  loadCatalogue,
  searchComponents,
  type Catalogue,
  type CatalogueComponent,
} from "./catalogue.js";

/**
 * Read off package.json rather than hardcoded, so `npm version` is the single
 * place a release is stamped. A duplicated constant silently reports the old
 * version to every client from the first bump onwards.
 */
const VERSION = (
  createRequire(import.meta.url)("../package.json") as { version: string }
).version;

const server = new McpServer(
  { name: "uibeats", version: VERSION },
  {
    instructions: [
      "UI Beats is a library of animated React components (TypeScript, Tailwind CSS, Motion).",
      "Components are copied into the user's project via the shadcn CLI — this is not an npm",
      "package, and there is nothing to import from node_modules.",
      "",
      "Use `search_components` to find a component, then `get_component` to read its full",
      "source, props and usage example before writing code. Never guess a component's props:",
      "fetch them. To add one to the project, run the command from `get_install_command`.",
    ].join("\n"),
  },
);

/**
 * Summary used in search results.
 *
 * URLs are rebuilt from ORIGIN rather than read off the catalogue entry, so a
 * server pointed at localhost does not hand back production links that the
 * agent would then try to install from.
 */
function summarize(entry: CatalogueComponent): string {
  return [
    `### ${entry.title} (\`${entry.name}\`)`,
    `- Category: ${entry.category}`,
    `- ${entry.description}`,
    entry.whenToUse ? `- When to use: ${entry.whenToUse}` : "",
    `- Docs: ${ORIGIN}/docs/${entry.category}/${entry.name}`,
    `- Install: \`npx shadcn@latest add ${ORIGIN}/r/${entry.name}.json\``,
  ]
    .filter(Boolean)
    .join("\n");
}

/**
 * A category filter, checked against the catalogue rather than a literal union.
 *
 * This was a `z.enum` of six values. The site shipped a seventh — `block` — and
 * the schema then rejected the one word an agent would reach for to find the
 * three blocks, while the site's own docs listed them under exactly that name.
 * Nothing about the server needed to change for the components themselves to
 * appear, which is the point of reading the catalogue live; hardcoding the
 * categories was the one place that quietly opted out of it.
 *
 * The catalogue states its own categories and is already loaded before any
 * filter is applied, so it can answer this. A new category now works against
 * the published server on the day the site deploys it.
 */
const CATEGORY_DESCRIPTION =
  "Restrict results to one category, e.g. 'card' or 'block'. Omit to search everything; list_components shows the current set.";

function rejectUnknownCategory(catalogue: Catalogue, category?: string) {
  if (!category || catalogue.categories.includes(category)) return null;
  return errorResult(
    `No category "${category}". The catalogue has: ${catalogue.categories.join(", ")}.`,
  );
}

/**
 * Where the CLI puts the file, and what else arrives with it.
 *
 * A block is not one file: it composes other UI Beats components, and the CLI
 * installs those alongside it. Reporting `components/ui/<name>.tsx` for
 * everything named the wrong directory for all three blocks and never
 * mentioned the parts, so an agent would write imports against files it had
 * not been told existed.
 */
function installNotes(entry: CatalogueComponent): string[] {
  const target =
    entry.category === "block"
      ? `components/blocks/${entry.name}.tsx`
      : `components/ui/${entry.name}.tsx`;

  // Bare entries are shadcn's own items (`utils`); a URL is a UI Beats
  // component, whose name is the last path segment without the extension.
  const parts = entry.registryDependencies
    .filter((dep) => dep.includes("://"))
    .map((dep) =>
      dep
        .split("/")
        .pop()
        ?.replace(/\.json$/, ""),
    )
    .filter((name): name is string => Boolean(name));

  return [
    `Writes \`${target}\` and installs its dependencies.`,
    parts.length
      ? `\nAlso installs into \`components/ui/\`: ${parts.join(", ")}.`
      : "",
  ].filter(Boolean);
}

function textResult(text: string) {
  return { content: [{ type: "text" as const, text }] };
}

function errorResult(text: string) {
  return { content: [{ type: "text" as const, text }], isError: true };
}

/**
 * Turn a thrown fetch error into a tool error the agent can act on.
 *
 * Letting it propagate surfaces as a transport-level failure, which reads to
 * the model as "the tool is broken" rather than "the network call failed".
 */
async function guard<T>(run: () => Promise<T>, what: string) {
  try {
    return await run();
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    return errorResult(
      `Could not ${what}. ${detail}\n\nThe catalogue is served from ${ORIGIN}/r/components.json — check connectivity, or set UIBEATS_URL to a reachable origin.`,
    );
  }
}

server.registerTool(
  "search_components",
  {
    title: "Search UI Beats components",
    description:
      "Search the UI Beats catalogue by intent or name — e.g. 'card that flips', 'number counting up', 'animated background', 'flip-card'. Returns ranked matches with their description, docs URL and install command. Call get_component afterwards to read the actual source and props.",
    inputSchema: {
      query: z
        .string()
        .describe(
          "What the component should do, in plain words, or its exact name.",
        ),
      category: z.string().optional().describe(CATEGORY_DESCRIPTION),
      /*
       * No ceiling. This was `.max(34)`, written when the catalogue held 34
       * components; it now holds more, so asking for all of them failed
       * validation. The result is bounded by the pool either way — a limit
       * past the end of it just returns the pool.
       */
      limit: z
        .number()
        .int()
        .min(1)
        .optional()
        .describe("Maximum number of results (default 10)."),
    },
    annotations: { readOnlyHint: true, openWorldHint: true },
  },
  async ({ query, category, limit }) =>
    guard(async () => {
      const catalogue = await loadCatalogue();
      const rejected = rejectUnknownCategory(catalogue, category);
      if (rejected) return rejected;

      const matches = searchComponents(catalogue, query, { category, limit });

      if (!matches.length) {
        const names = catalogue.components
          .map((entry) => entry.name)
          .join(", ");
        return textResult(
          `No component matched "${query}"${category ? ` in category "${category}"` : ""}.\n\nThe full catalogue is: ${names}`,
        );
      }

      return textResult(
        [
          `${matches.length} match${matches.length === 1 ? "" : "es"} for "${query}":`,
          ...matches.map(summarize),
        ].join("\n\n"),
      );
    }, `search the UI Beats catalogue`),
);

server.registerTool(
  "get_component",
  {
    title: "Get a UI Beats component",
    description:
      "Fetch the complete documentation for one component: description, when to use it, the full props table, a runnable usage example and the entire source file. Read this before writing code that uses a UI Beats component.",
    inputSchema: {
      name: z
        .string()
        .describe("Component name, e.g. 'flip-card' (or 'Flip Card')."),
    },
    annotations: { readOnlyHint: true, openWorldHint: true },
  },
  async ({ name }) =>
    guard(async () => {
      const catalogue = await loadCatalogue();
      const entry = findComponent(catalogue, name);

      if (!entry) {
        const suggestions = searchComponents(catalogue, name, { limit: 5 });
        return errorResult(
          [
            `No component named "${name}".`,
            suggestions.length
              ? `\nDid you mean: ${suggestions.map((s) => s.name).join(", ")}?`
              : `\nUse search_components to find one.`,
          ].join("\n"),
        );
      }

      return textResult(await fetchComponentMarkdown(entry));
    }, `fetch the "${name}" component`),
);

server.registerTool(
  "list_components",
  {
    title: "List UI Beats components",
    description:
      "List every component in the catalogue, grouped by category. Use this to see what is available before searching.",
    inputSchema: {
      category: z
        .string()
        .optional()
        .describe("List only this category, e.g. 'card' or 'block'."),
    },
    annotations: { readOnlyHint: true, openWorldHint: true },
  },
  async ({ category }) =>
    guard(async () => {
      const catalogue = await loadCatalogue();
      const rejected = rejectUnknownCategory(catalogue, category);
      if (rejected) return rejected;

      const categories = category ? [category] : catalogue.categories;

      const sections = categories.map((current) => {
        const entries = catalogue.components
          .filter((entry) => entry.category === current)
          .sort((a, b) => a.title.localeCompare(b.title));

        return [
          `## ${current} (${entries.length})`,
          "",
          ...entries.map(
            (entry) =>
              `- \`${entry.name}\` — ${entry.title}: ${entry.description}`,
          ),
        ].join("\n");
      });

      return textResult(
        [
          `UI Beats — ${catalogue.count} components, MIT licensed.`,
          `Install any of them with: npx shadcn@latest add ${ORIGIN}/r/<name>.json`,
          "",
          ...sections,
        ].join("\n"),
      );
    }, "list the UI Beats catalogue"),
);

server.registerTool(
  "get_install_command",
  {
    title: "Get the install command for a component",
    description:
      "Return the exact shadcn CLI command that adds a component to the current project, along with the npm packages it pulls in. Run the returned command in the project root.",
    inputSchema: {
      name: z.string().describe("Component name, e.g. 'flip-card'."),
    },
    annotations: { readOnlyHint: true, openWorldHint: true },
  },
  async ({ name }) =>
    guard(async () => {
      const catalogue = await loadCatalogue();
      const entry = findComponent(catalogue, name);

      if (!entry) {
        return errorResult(
          `No component named "${name}". Use list_components to see what exists.`,
        );
      }

      return textResult(
        [
          `\`\`\`bash`,
          `npx shadcn@latest add ${ORIGIN}/r/${entry.name}.json`,
          `\`\`\``,
          "",
          ...installNotes(entry),
          entry.dependencies.length
            ? `\nnpm dependencies: ${entry.dependencies.join(", ")}`
            : `\nNo extra npm dependencies.`,
          `\nDocs: ${entry.docs}`,
        ].join("\n"),
      );
    }, `build the install command for "${name}"`),
);

async function main() {
  await server.connect(new StdioServerTransport());
  // stdout is the transport — anything written there corrupts the JSON-RPC
  // stream, so status goes to stderr.
  console.error(`uibeats-mcp ${VERSION} ready (origin: ${ORIGIN})`);
}

main().catch((error) => {
  console.error("uibeats-mcp failed to start:", error);
  process.exit(1);
});
