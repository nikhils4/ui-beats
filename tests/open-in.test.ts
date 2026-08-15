import { describe, expect, it } from "vitest";
import {
  MCP_PACKAGE,
  claudeCodeCommand,
  cursorMcpUrl,
  registryUrl,
  shadcnCommand,
  v0Url,
  vsCodeMcpUrl,
} from "@/lib/open-in";
import { getRegistry } from "@/lib/registry";
import { siteConfig } from "@/lib/site";

describe("v0 hand-off", () => {
  it("points at the registry item, not the docs page", () => {
    // v0 resolves the item itself, so it gets the dependencies and cssVars
    // with it. A docs URL would hand it a web page to scrape instead.
    const url = v0Url("flip-card");
    expect(url).toContain("v0.app/chat/api/open?url=");
    expect(decodeURIComponent(url.split("url=")[1]!)).toBe(
      `${siteConfig.url}/r/flip-card.json`,
    );
  });

  it("encodes the registry URL rather than splicing it in raw", () => {
    expect(v0Url("flip-card")).not.toContain("https://uibeats.com/r");
  });

  it("skips the legacy host, which signs the reader in on the wrong origin", () => {
    // v0.dev answers this path by redirecting to its own login with
    // `next=v0.app/...`. The cookie lands on v0.dev, the request lands on
    // v0.app, and the reader is stuck on a sign-in gate that never clears.
    expect(v0Url("flip-card")).not.toContain("v0.dev");
  });

  it("resolves for every component in the registry", () => {
    for (const entry of getRegistry()) {
      expect(registryUrl(entry.name), entry.name).toBe(
        `${siteConfig.url}/r/${entry.name}.json`,
      );
      expect(shadcnCommand(entry.name)).toContain("npx shadcn@latest add");
    }
  });
});

describe("MCP install links", () => {
  it("base64-encodes the Cursor config", () => {
    const url = cursorMcpUrl();
    expect(
      url.startsWith("cursor://anysphere.cursor-deeplink/mcp/install?"),
    ).toBe(true);

    const config = decodeURIComponent(url.split("config=")[1]!);
    const decoded = JSON.parse(Buffer.from(config, "base64").toString("utf8"));
    expect(decoded).toEqual({ command: "npx", args: ["-y", MCP_PACKAGE] });
  });

  it("sends VS Code plain JSON, which is what it reads", () => {
    // The two editors chose different encodings; guessing wrong opens the
    // editor and then fails silently, which is worse than no button.
    const url = vsCodeMcpUrl();
    expect(url.startsWith("vscode:mcp/install?")).toBe(true);
    const decoded = JSON.parse(
      decodeURIComponent(url.slice("vscode:mcp/install?".length)),
    );
    expect(decoded.name).toBe("uibeats");
    expect(decoded.args).toEqual(["-y", MCP_PACKAGE]);
  });

  it("names the published package everywhere", () => {
    expect(MCP_PACKAGE).toBe("@uibeats/mcp");
    expect(claudeCodeCommand()).toBe(
      "claude mcp add uibeats -- npx -y @uibeats/mcp",
    );
  });
});
