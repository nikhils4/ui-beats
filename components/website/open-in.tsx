import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/website/copy-button";
import {
  claudeCodeCommand,
  cursorMcpUrl,
  v0Url,
  vsCodeMcpUrl,
} from "@/lib/open-in";
import { cn } from "@/lib/utils";

/**
 * Hand the component to v0.
 *
 * Sits with the install command rather than in the page header: somebody
 * reading the installation section has already decided they want the
 * component, and this is the version of that decision that costs one click
 * instead of a terminal.
 */
export function OpenInV0({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return (
    <Button
      asChild
      variant="outline"
      size="sm"
      className={cn("gap-2", className)}
    >
      <a
        href={v0Url(name)}
        target="_blank"
        // `noreferrer` alongside `noopener` because the destination has no
        // business knowing which component page sent the reader.
        rel="noopener noreferrer"
      >
        Open in v0
        <ExternalLink className="size-3.5" aria-hidden="true" />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    </Button>
  );
}

/**
 * Install the MCP server into an editor, one click each.
 *
 * Claude Code is a copyable command rather than a link because it configures
 * MCP through its own CLI and has no URL scheme to hand off to. Pretending
 * otherwise with a dead `claude://` link would be worse than a command.
 */
export function McpInstallButtons({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <Button asChild variant="outline" size="sm" className="gap-2">
        <a href={cursorMcpUrl()}>
          Add to Cursor
          <ExternalLink className="size-3.5" aria-hidden="true" />
        </a>
      </Button>

      <Button asChild variant="outline" size="sm" className="gap-2">
        <a href={vsCodeMcpUrl()}>
          Add to VS Code
          <ExternalLink className="size-3.5" aria-hidden="true" />
        </a>
      </Button>

      <div className="flex items-center gap-1 rounded-md border bg-muted/40 py-1 pr-1 pl-3">
        <code className="font-mono text-xs text-muted-foreground">
          {claudeCodeCommand()}
        </code>
        <CopyButton
          value={claudeCodeCommand()}
          label="Copy the Claude Code command"
          floating={false}
        />
      </div>
    </div>
  );
}
