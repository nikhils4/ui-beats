"use client";

import { useCallback, useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  value: string;
  className?: string;
  label?: string;
  /**
   * Float over the content, for a code block with no header to sit in.
   *
   * This used to be unconditional, which quietly broke every caller that put
   * the button inside a header row: `absolute` resolves against the nearest
   * positioned ancestor, so a button written *inside* a flex strip jumped out
   * of it and pinned itself to the corner of the whole card, hanging below the
   * strip and across its bottom border. Those callers pass `floating={false}`
   * and get a button that simply sits where it was written.
   */
  floating?: boolean;
}

/**
 * Copy-to-clipboard control.
 *
 * Replaces `react-use`'s `useCopyToClipboard`, which never reset its state, so
 * the old snippet button showed a permanent tick after the first copy.
 */
export function CopyButton({
  value,
  className,
  label = "Copy code",
  floating = true,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      // Clipboard access can be denied (insecure origin, permissions policy).
      // Failing silently is better than throwing inside an event handler.
    }
  }, [value]);

  return (
    <Button
      type="button"
      size="icon"
      variant="ghost"
      onClick={copy}
      aria-label={copied ? "Copied" : label}
      className={cn(
        "size-7 shrink-0 opacity-70 transition-opacity hover:opacity-100",
        floating && "absolute top-3 right-3 z-10",
        className,
      )}
    >
      {copied ? (
        <Check className="size-3.5 text-emerald-500" />
      ) : (
        <Copy className="size-3.5" />
      )}
      <span className="sr-only">{copied ? "Copied" : label}</span>
    </Button>
  );
}
