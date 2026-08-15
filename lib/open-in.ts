/**
 * Deep links that put a component into a tool without anybody typing.
 *
 * Everything needed for this already existed — a public registry URL per
 * component and a published MCP server — and none of it was exposed as
 * something you could click. A reader who wanted the component still had to
 * copy a command, find a terminal, and be in the right directory. These are
 * the same install, minus those three steps.
 */
import { absoluteUrl } from "@/lib/site";

/** The npm package that serves the catalogue over MCP. */
export const MCP_PACKAGE = "@uibeats/mcp";

/** The stdio server definition every MCP client is configured with. */
export const MCP_SERVER = {
  command: "npx",
  args: ["-y", MCP_PACKAGE],
} as const;

/** The public registry item a shadcn CLI or v0 would fetch. */
export function registryUrl(name: string): string {
  return absoluteUrl(`/r/${name}.json`);
}

/** The command a reader pastes into a terminal. */
export function shadcnCommand(name: string): string {
  return `npx shadcn@latest add ${registryUrl(name)}`;
}

/**
 * Open a component in v0.
 *
 * v0 fetches the registry item itself, so this passes the URL rather than the
 * source — the chat starts with the real component, its dependencies and its
 * `cssVars`, not a paraphrase of them.
 *
 * `v0.app`, not the `v0.dev` every other registry still links to. The old host
 * answers this path with a redirect to `v0.dev/api/auth/login?next=v0.app/...`,
 * which signs the reader in on one origin and then hands them to another that
 * cannot see the cookie just set. The sign-in gate reappears, its confirm
 * button disables itself, and the hand-off ends there. Same endpoint, one
 * origin, no cross-domain hop.
 */
export function v0Url(name: string): string {
  return `https://v0.app/chat/api/open?url=${encodeURIComponent(registryUrl(name))}`;
}

/**
 * Base64 for a UTF-8 string, in both runtimes.
 *
 * `btoa` throws on anything outside Latin-1 and does not exist on the server;
 * `Buffer` does not exist in the browser. This component tree renders in both.
 */
function encodeBase64(value: string): string {
  if (typeof Buffer !== "undefined")
    return Buffer.from(value, "utf8").toString("base64");
  const bytes = new TextEncoder().encode(value);
  return btoa(String.fromCharCode(...bytes));
}

/**
 * One-click MCP install for Cursor.
 *
 * The config travels base64-encoded in the URL, which is Cursor's own format:
 * the link opens the editor with the server pre-filled and asks the user to
 * confirm, so nothing is installed behind their back.
 */
export function cursorMcpUrl(): string {
  const config = encodeBase64(JSON.stringify(MCP_SERVER));
  return `cursor://anysphere.cursor-deeplink/mcp/install?name=uibeats&config=${encodeURIComponent(config)}`;
}

/** The one-liner that registers the server with Claude Code. */
export function claudeCodeCommand(): string {
  return `claude mcp add uibeats -- npx -y ${MCP_PACKAGE}`;
}

/**
 * VS Code's MCP install link.
 *
 * Plain JSON in the query string rather than base64 — the two editors chose
 * differently, and guessing wrong produces a link that opens the editor and
 * then fails silently.
 */
export function vsCodeMcpUrl(): string {
  const config = JSON.stringify({ name: "uibeats", ...MCP_SERVER });
  return `vscode:mcp/install?${encodeURIComponent(config)}`;
}
