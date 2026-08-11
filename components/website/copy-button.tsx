"use client";

import { useCallback, useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  value: string;
  className?: string;
  label?: string;
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
        "absolute top-3 right-3 z-10 size-7 opacity-70 transition-opacity hover:opacity-100",
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
