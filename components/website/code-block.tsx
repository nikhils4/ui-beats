import { highlight } from "@/lib/highlight";
import { CopyButton } from "@/components/website/copy-button";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  /** Optional filename shown in a header strip above the code. */
  title?: string;
  className?: string;
  maxHeight?: string;
}

/**
 * Server component: highlights at build time and ships static HTML.
 *
 * Only the copy button is a client island, so a docs page with six snippets
 * costs one small bundle rather than a full syntax highlighter.
 */
export async function CodeBlock({
  code,
  language = "tsx",
  title,
  className,
  maxHeight = "32rem",
}: CodeBlockProps) {
  const html = await highlight(code, language);
  const isShell = language === "bash" || language === "sh";

  return (
    <figure
      className={cn(
        // `max-w-full` + the scroll container below keep long lines inside the
        // column instead of widening the whole docs layout.
        "group relative my-4 w-full max-w-full overflow-hidden rounded-xl border bg-card shadow-subtle",
        className,
      )}
    >
      {title ? (
        <figcaption className="flex items-center gap-2 border-b bg-muted/50 px-4 py-2.5">
          {/* Three dots read as "this is a file", cheaper than an icon set. */}
          <span aria-hidden="true" className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-destructive/40" />
            <span className="size-2.5 rounded-full bg-warning/40" />
            <span className="size-2.5 rounded-full bg-success/40" />
          </span>
          <span className="ml-1 font-mono text-xs text-muted-foreground">
            {title}
          </span>
        </figcaption>
      ) : null}

      <CopyButton value={code} className={title ? "top-12" : undefined} />

      <div
        className={cn(
          "overflow-auto text-sm [&_pre]:!bg-transparent [&_pre]:p-4",
          isShell && "[&_pre]:py-3.5",
        )}
        style={{ maxHeight }}
        // Shiki output is generated at build time from source in this repo,
        // never from user input.
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </figure>
  );
}
