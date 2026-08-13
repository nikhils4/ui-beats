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
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import {
  ORIGIN,
  fetchComponentMarkdown,
  findComponent,
  loadCatalogue,
  searchComponents,
  type CatalogueComponent,
} from "./catalogue.js";

const VERSION = "0.1.0";

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
      category: z
        .enum(["animation", "background", "button", "card", "component", "text"])
        .optional()
        .describe("Restrict results to one category."),
      limit: z
        .number()
        .int()
        .min(1)
        .max(34)
        .optional()
        .describe("Maximum number of results (default 10)."),
    },
    annotations: { readOnlyHint: true, openWorldHint: true },
  },
  async ({ query, category, limit }) =>
    guard(async () => {
      const catalogue = await loadCatalogue();
      const matches = searchComponents(catalogue, query, { category, limit });

      if (!matches.length) {
        const names = catalogue.components.map((entry) => entry.name).join(", ");
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
        .enum(["animation", "background", "button", "card", "component", "text"])
        .optional()
        .describe("List only this category."),
    },
    annotations: { readOnlyHint: true, openWorldHint: true },
  },
  async ({ category }) =>
    guard(async () => {
      const catalogue = await loadCatalogue();
      const categories = category ? [category] : catalogue.categories;

      const sections = categories.map((current) => {
        const entries = catalogue.components
          .filter((entry) => entry.category === current)
          .sort((a, b) => a.title.localeCompare(b.title));

        return [
          `## ${current} (${entries.length})`,
          "",
          ...entries.map(
            (entry) => `- \`${entry.name}\` — ${entry.title}: ${entry.description}`,
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
          `Writes \`components/ui/${entry.name}.tsx\` and installs its dependencies.`,
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
