"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

/**
 * Root error boundary. The app previously had none, so any render error in a
 * client component blanked the page with React's default fallback.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[70svh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-bold tracking-tight">
          Something went wrong
        </h1>
        <p className="mt-3 text-muted-foreground">
          An unexpected error occurred while rendering this page.
        </p>
        {error.digest ? (
          <p className="mt-2 font-mono text-xs text-muted-foreground">
            Reference: {error.digest}
          </p>
        ) : null}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button onClick={reset}>Try again</Button>
          <Button variant="outline" asChild>
            <a
              href={siteConfig.links.newIssue}
              target="_blank"
              rel="noopener noreferrer"
            >
              Report this
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
