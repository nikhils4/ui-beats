import type { Metadata } from "next";
import { CodeBlock } from "@/components/website/code-block";
import { DocsBreadcrumb } from "@/components/website/docs-breadcrumb";
import { DocsPageHeader } from "@/components/website/docs-page-header";
import { DocsSection } from "@/components/website/docs-section";
import { getRegistry } from "@/lib/registry";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "MCP Server",
  description:
    "Let Claude Code, Cursor and any other MCP client search, read and install UI Beats components without leaving your editor.",
  keywords: [
    "ui beats mcp",
    "mcp server react components",
    "claude code react components",
    "cursor mcp ui library",
    "shadcn mcp",
    "llms.txt react components",
  ],
  alternates: { canonical: absoluteUrl("/docs/getting-started/mcp") },
};

const TOOLS = [
  {
    name: "search_components",
    description:
      'Rank the catalogue against a plain-language query — "a card that flips", "number counting up" — or an exact name.',
  },
  {
    name: "get_component",
    description:
      "The full document for one component: description, when to use it, every prop, a runnable example and the complete source.",
  },
  {
    name: "list_components",
    description: "Everything available, grouped by category.",
  },
  {
    name: "get_install_command",
    description:
      "The exact shadcn command for a component, plus the npm packages it pulls in.",
  },
];

export default function McpPage() {
  const registry = getRegistry();

  return (
    <div className="w-full min-w-0 pb-16">
      <DocsBreadcrumb
        items={[
          { label: "Docs", href: "/docs/getting-started/introduction" },
          { label: "Getting Started", href: "/docs/getting-started" },
          { label: "MCP Server" },
        ]}
      />

      <DocsPageHeader
        title="MCP Server"
        description="Use UI Beats from inside your coding agent."
      />

      <p className="mt-8 max-w-2xl leading-7">
        Most components now get chosen by whatever is writing the code, not by
        someone browsing a gallery. The UI Beats MCP server puts the whole
        catalogue — {registry.length} components, their props and their source —
        inside Claude Code, Cursor, Windsurf, or any other client that speaks{" "}
        <a
          href="https://modelcontextprotocol.io"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-brand underline-offset-4 hover:underline"
        >
          MCP
        </a>
        . Your agent can then find the right component and read its real props
        instead of guessing at an API.
      </p>

      <DocsSection
        id="install"
        title="Install"
        description="One command for Claude Code; a config block for everything else."
      >
        <CodeBlock
          code="claude mcp add uibeats -- npx -y @uibeats/mcp"
          language="bash"
        />

        <p className="mt-6 mb-2 text-sm text-muted-foreground">
          For Cursor, Windsurf, Claude Desktop and anything else that reads an{" "}
          <code className="font-mono text-xs">mcpServers</code> block:
        </p>
        <CodeBlock
          title="mcp.json"
          language="json"
          code={`{
  "mcpServers": {
    "uibeats": {
      "command": "npx",
      "args": ["-y", "@uibeats/mcp"]
    }
  }
}`}
        />
      </DocsSection>

      <DocsSection
        id="tools"
        title="Tools"
        description="Four, deliberately. Each one maps to a step your agent actually takes."
      >
        <div className="w-full max-w-full overflow-hidden rounded-xl border bg-card shadow-subtle">
          <dl className="divide-y">
            {TOOLS.map((tool) => (
              <div key={tool.name} className="px-4 py-3.5">
                <dt className="font-mono text-xs font-medium text-brand">
                  {tool.name}
                </dt>
                <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {tool.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          A typical exchange: the agent searches for what you described, reads
          the component&rsquo;s real props before writing any JSX, then runs the
          install command in your project root.
        </p>
      </DocsSection>

      <DocsSection
        id="plain-text"
        title="Without an MCP client"
        description="The same content is served as plain markdown, for agents that only fetch URLs."
      >
        <div className="w-full max-w-full overflow-hidden rounded-xl border bg-card shadow-subtle">
          <dl className="divide-y">
            <div className="px-4 py-3.5">
              <dt className="font-mono text-xs font-medium text-brand">
                /llms.txt
              </dt>
              <dd className="mt-1 text-sm text-muted-foreground">
                The index: every component, one line each, linking to its
                markdown.
              </dd>
            </div>
            <div className="px-4 py-3.5">
              <dt className="font-mono text-xs font-medium text-brand">
                /llms-full.txt
              </dt>
              <dd className="mt-1 text-sm text-muted-foreground">
                Every component&rsquo;s props and complete source, in one file.
              </dd>
            </div>
            <div className="px-4 py-3.5">
              <dt className="font-mono text-xs font-medium text-brand">
                /docs/&lt;category&gt;/&lt;name&gt;.md
              </dt>
              <dd className="mt-1 text-sm text-muted-foreground">
                Any component page as markdown — add{" "}
                <code className="font-mono text-xs">.md</code> to its URL.
              </dd>
            </div>
            <div className="px-4 py-3.5">
              <dt className="font-mono text-xs font-medium text-brand">
                /r/components.json
              </dt>
              <dd className="mt-1 text-sm text-muted-foreground">
                The whole catalogue as JSON, with props and guidance. CORS is
                open.
              </dd>
            </div>
          </dl>
        </div>

        <p className="mt-5 mb-2 text-sm text-muted-foreground">
          Point an agent at a single component:
        </p>
        <CodeBlock
          language="bash"
          code={`curl ${absoluteUrl("/docs/card/flip-card.md")}`}
        />
      </DocsSection>

      <DocsSection
        id="source"
        title="Source"
        description="The server is open source and has no backend of its own."
      >
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          It is a cached client over the two static files above, so it stays in
          step with the site automatically. Read it under{" "}
          <a
            href={`${siteConfig.links.github}/tree/main/packages/mcp`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-brand underline-offset-4 hover:underline"
          >
            packages/mcp
          </a>
          . To develop against a local site, set{" "}
          <code className="font-mono text-xs">UIBEATS_URL</code>.
        </p>
      </DocsSection>
    </div>
  );
}
