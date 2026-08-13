"use client";

import { Fragment, type ReactNode } from "react";
import { CopyButton } from "@/components/website/copy-button";
import { cn } from "@/lib/utils";

/**
 * The live snippet under a playground.
 *
 * `CodeBlock` highlights with Shiki at build time and is a server component, so
 * it cannot render a string that changes as the reader drags a slider. Shipping
 * a highlighter to the client for four lines of JSX is not worth it, so this
 * tokenises the narrow subset a generated snippet can contain (a tag,
 * attributes, strings and braced expressions) into React nodes. No `innerHTML`,
 * so no escaping question either.
 */

const TOKEN =
  /("(?:[^"\\]|\\.)*")|(\{(?:[^{}]|\{[^{}]*\})*\})|(<\/?[A-Za-z][\w.]*|\/>|>)|([A-Za-z_$][\w$]*(?=\s*=))/g;

const CLASS = {
  string: "text-emerald-600 dark:text-emerald-400",
  expression: "text-amber-600 dark:text-amber-400",
  tag: "text-brand",
  attribute: "text-sky-700 dark:text-sky-300",
} as const;

function highlight(line: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let cursor = 0;
  let key = 0;

  for (const match of line.matchAll(TOKEN)) {
    const [text, string, expression, tag, attribute] = match;
    const start = match.index;

    if (start > cursor) nodes.push(line.slice(cursor, start));

    const className = string
      ? CLASS.string
      : expression
        ? CLASS.expression
        : tag
          ? CLASS.tag
          : CLASS.attribute;

    void attribute;
    nodes.push(
      <span key={key++} className={className}>
        {text}
      </span>,
    );
    cursor = start + text.length;
  }

  if (cursor < line.length) nodes.push(line.slice(cursor));
  return nodes;
}

interface PlaygroundSnippetProps {
  code: string;
  /** Strip shown above the code. Motion Studio renders two side by side. */
  title?: string;
  className?: string;
}

export function PlaygroundSnippet({
  code,
  title = "Your configuration",
  className,
}: PlaygroundSnippetProps) {
  return (
    <div
      className={cn(
        "relative w-full max-w-full overflow-hidden rounded-xl border bg-card shadow-subtle",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2 border-b bg-muted/40 py-1.5 pr-1.5 pl-4">
        <span className="font-mono text-[11px] text-muted-foreground">
          {title}
        </span>
        <CopyButton value={code} label="Copy snippet" floating={false} />
      </div>
      <pre className="overflow-x-auto px-4 py-3.5 font-mono text-xs leading-relaxed">
        <code>
          {code.split("\n").map((line, index) => (
            <Fragment key={index}>
              {index > 0 ? "\n" : null}
              {highlight(line)}
            </Fragment>
          ))}
        </code>
      </pre>
    </div>
  );
}
