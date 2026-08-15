import { describe, expect, it } from "vitest";
import {
  componentMarkdown,
  installCommand,
  llmsFull,
  llmsIndex,
} from "@/lib/agent-docs";
import { getRegistry } from "@/lib/registry";
import { siteConfig } from "@/lib/site";

const registry = getRegistry();

describe("componentMarkdown", () => {
  it("renders a document for every component", () => {
    for (const entry of registry) {
      const markdown = componentMarkdown(entry);
      expect(markdown.startsWith(`# ${entry.title}\n`)).toBe(true);
      expect(markdown).toContain(entry.description);
      expect(markdown).toContain("## Installation");
      expect(markdown).toContain("## Source");
    }
  });

  it("includes the full component source", () => {
    for (const entry of registry) {
      const markdown = componentMarkdown(entry);
      // An agent that gets a truncated file writes code against a component
      // that does not exist, so the whole source has to survive fencing.
      expect(markdown).toContain(entry.source.trim());
    }
  });

  it("documents every prop the props table lists", () => {
    for (const entry of registry) {
      const markdown = componentMarkdown(entry);
      for (const prop of entry.props) {
        expect(markdown).toContain(`\`${prop.prop}\``);
      }
    }
  });

  it("escapes pipes so union types cannot break the table", () => {
    const withUnion = registry.find((entry) =>
      entry.props.some((prop) => prop.type.includes("|")),
    );
    expect(withUnion, "expected at least one union-typed prop").toBeDefined();

    const markdown = componentMarkdown(withUnion!);
    const unionProp = withUnion!.props.find((prop) => prop.type.includes("|"))!;
    const row = markdown
      .split("\n")
      .find((line) => line.startsWith(`| \`${unionProp.prop}\``));

    expect(row).toBeDefined();
    // Four columns means five pipes; an unescaped union would add more.
    expect(row!.match(/(?<!\\)\|/g)).toHaveLength(5);
  });

  it("grows the fence past any backticks in the source", () => {
    // Source containing ``` would otherwise close the block early and spill
    // code into prose.
    const fenced = componentMarkdown({
      ...registry[0]!,
      source: "const doc = `````ts\\nhello\\n`````;",
    });
    expect(fenced).toContain("``````tsx");
  });
});

describe("installCommand", () => {
  it("points at the component's registry JSON", () => {
    for (const entry of registry) {
      expect(installCommand(entry)).toBe(
        `npx shadcn@latest add ${siteConfig.url}/r/${entry.name}.json`,
      );
    }
  });
});

describe("llmsIndex", () => {
  const index = llmsIndex();

  it("follows the llms.txt shape: H1 then a blockquote summary", () => {
    const lines = index.split("\n");
    expect(lines[0]).toBe(`# ${siteConfig.name}`);
    expect(lines[2]?.startsWith("> ")).toBe(true);
  });

  it("links every component to its markdown twin", () => {
    for (const entry of registry) {
      expect(index).toContain(`${siteConfig.url}${entry.href}.md`);
    }
  });

  it("uses absolute URLs throughout", () => {
    const links = [...index.matchAll(/\]\(([^)]+)\)/g)].map(
      (match) => match[1]!,
    );
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      expect(link.startsWith("http"), `relative link: ${link}`).toBe(true);
    }
  });
});

describe("llmsFull", () => {
  const full = llmsFull();

  it("contains every component's document", () => {
    for (const entry of registry) {
      expect(full).toContain(`# ${entry.title}\n`);
      expect(full).toContain(entry.source.trim());
    }
  });

  it("separates documents with a horizontal rule", () => {
    expect(full.split("\n---\n").length).toBe(registry.length + 1);
  });
});
