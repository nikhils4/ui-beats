import "server-only";

import {
  getRegistry,
  getPopulatedCategories,
  categoryLabel,
} from "@/lib/registry";
import { CATEGORY_INTRO } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { GETTING_STARTED } from "@/config/categories";
import type { RegistryEntry } from "@/lib/registry";

/**
 * Markdown renditions of the docs, for coding agents rather than browsers.
 *
 * A component gets picked by whatever is writing the code, and increasingly
 * that is an agent that never loads the page. It fetches a URL and reads what
 * comes back, so HTML full of sidebar chrome, Shiki spans and JSON-LD is the
 * wrong payload. These functions render the same registry data as plain
 * markdown, served at `/llms.txt`, `/llms-full.txt` and `/docs/<cat>/<name>.md`.
 *
 * Everything derives from `getRegistry()`, so an agent-facing doc cannot drift
 * from the human-facing page the way a hand-written summary would.
 */

/** Fence a block of source without letting its own backticks close the fence. */
function fence(code: string, language = "tsx"): string {
  // A component whose source contains ``` would otherwise terminate the block
  // early and spill code into prose. Grow the fence past the longest run.
  const longestRun = [...code.matchAll(/`+/g)].reduce(
    (max, [run]) => Math.max(max, run.length),
    0,
  );
  const delimiter = "`".repeat(Math.max(3, longestRun + 1));
  return `${delimiter}${language}\n${code.trim()}\n${delimiter}`;
}

/** Escape the pipes in a prop type so a union does not break the table row. */
function cell(value: string): string {
  return value.replace(/\|/g, "\\|").replace(/\n+/g, " ").trim();
}

export function installCommand(entry: { name: string }): string {
  return `npx shadcn@latest add ${absoluteUrl(`/r/${entry.name}.json`)}`;
}

/** The props table, or a note that the component takes none. */
function propsSection(entry: RegistryEntry): string {
  if (!entry.props.length) {
    return "## Props\n\nThis component takes no props.";
  }

  const rows = entry.props.map(
    (prop) =>
      `| \`${cell(prop.prop)}\` | \`${cell(prop.type)}\` | \`${cell(prop.defaultValue)}\` | ${cell(prop.description)} |`,
  );

  return [
    "## Props",
    "",
    "| Prop | Type | Default | Description |",
    "| --- | --- | --- | --- |",
    ...rows,
  ].join("\n");
}

/**
 * The full markdown document for one component: what `/docs/<cat>/<name>.md`
 * serves, and what the MCP server hands back for `get_component`.
 */
export function componentMarkdown(entry: RegistryEntry): string {
  const sections: string[] = [
    `# ${entry.title}`,
    "",
    entry.description,
    "",
    `- **Category:** ${categoryLabel(entry.category)}`,
    `- **Docs:** ${absoluteUrl(entry.href)}`,
    `- **Registry:** ${absoluteUrl(`/r/${entry.name}.json`)}`,
    `- **License:** MIT`,
  ];

  if (entry.dependencies.length) {
    sections.push(
      `- **npm dependencies:** ${entry.dependencies.map((dep) => `\`${dep}\``).join(", ")}`,
    );
  }

  sections.push(
    "",
    "## Installation",
    "",
    fence(installCommand(entry), "bash"),
  );

  if (entry.dependencies.length) {
    sections.push(
      "",
      "Or install the dependencies and copy the source below:",
      "",
      fence(`npm install ${entry.dependencies.join(" ")}`, "bash"),
    );
  }

  if (entry.whenToUse) {
    sections.push("", `## When to use`, "", entry.whenToUse);
  }

  sections.push("", propsSection(entry));

  if (entry.usage.trim()) {
    sections.push("", "## Example usage", "", fence(entry.usage));
  }

  sections.push(
    "",
    "## Source",
    "",
    `Save as \`components/ui/${entry.name}.tsx\`.`,
    "",
    fence(entry.source),
  );

  if (entry.registryDependencies.includes("utils")) {
    sections.push(
      "",
      "This component imports the `cn` helper. If your project does not have it:",
      "",
      fence(
        `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`,
        "ts",
      ),
    );
  }

  if (entry.credits) {
    sections.push(
      "",
      "## Credits",
      "",
      `Written by [${entry.credits.name}](${entry.credits.url}).`,
    );
  }

  return `${sections.join("\n")}\n`;
}

/**
 * `/llms.txt`, the index an agent reads first.
 *
 * Follows the llms.txt convention: an H1, a blockquote summary, then link
 * sections. Every component links to its own `.md`, so an agent can pull one
 * component instead of the whole catalogue.
 */
export function llmsIndex(): string {
  const lines: string[] = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.description}`,
    "",
    "UI Beats is not an npm package. Components are copied into your project",
    "and you own the code afterwards. There is no wrapper API and no version",
    "to pin. Install any component with the shadcn CLI:",
    "",
    "```bash",
    "npx shadcn@latest add https://uibeats.com/r/<component>.json",
    "```",
    "",
    "Every component below links to a markdown document containing its full",
    "source, props table and a runnable example.",
    "",
  ];

  for (const category of getPopulatedCategories()) {
    const entries = getRegistry()
      .filter((entry) => entry.category === category)
      .sort((a, b) => a.title.localeCompare(b.title));

    lines.push(`## ${categoryLabel(category)}`, "");
    lines.push(CATEGORY_INTRO[category], "");

    for (const entry of entries) {
      lines.push(
        `- [${entry.title}](${absoluteUrl(`${entry.href}.md`)}): ${entry.description}`,
      );
    }
    lines.push("");
  }

  lines.push("## Getting started", "");
  for (const item of GETTING_STARTED.items) {
    lines.push(`- [${item.title}](${absoluteUrl(item.path)})`);
  }
  lines.push("");

  lines.push("## Optional", "");
  lines.push(
    `- [Full documentation](${absoluteUrl("/llms-full.txt")}): every component's source and props in one file`,
    `- [Machine-readable index](${absoluteUrl("/r/components.json")}): the same catalogue as JSON`,
    `- [shadcn registry](${absoluteUrl("/r/registry.json")}): registry index for the shadcn CLI`,
    `- [GitHub](${siteConfig.links.github})`,
  );

  return `${lines.join("\n")}\n`;
}

/** `/llms-full.txt`: every component document concatenated. */
export function llmsFull(): string {
  const header = [
    `# ${siteConfig.name} — full documentation`,
    "",
    `> ${siteConfig.description}`,
    "",
    "This file contains every component in the library: description, props,",
    "example usage and complete source. Install any of them with:",
    "",
    "```bash",
    "npx shadcn@latest add https://uibeats.com/r/<component>.json",
    "```",
    "",
    "---",
    "",
  ].join("\n");

  const documents = getPopulatedCategories().flatMap((category) =>
    getRegistry()
      .filter((entry) => entry.category === category)
      .sort((a, b) => a.title.localeCompare(b.title))
      .map((entry) => componentMarkdown(entry)),
  );

  return `${header}${documents.join("\n---\n\n")}`;
}
