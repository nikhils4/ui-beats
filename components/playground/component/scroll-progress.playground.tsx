"use client";

import { useRef } from "react";
import ScrollProgress from "@/components/demo/component/scroll-progress";
import { ARTICLE } from "@/components/playground/demo-content";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for ScrollProgress.
 *
 * Mirrors `components/usage/component/scroll-progress.usage.tsx` so the studio
 * and the docs page show the same demo. The bar tracks a panel rather than the
 * window here for the same reason it does in the docs: the studio's own page
 * scroll is not what the reader is trying to look at.
 */
export default function ScrollProgressPlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(ScrollProgress, values);
  const scrollArea = useRef<HTMLDivElement>(null);

  return (
    <div className="relative w-full max-w-sm overflow-hidden rounded-xl border bg-card">
      <ScrollProgress {...props} container={scrollArea} />

      <div ref={scrollArea} className="h-56 overflow-y-auto p-5">
        <h3 className="mb-3 text-base font-semibold">On motion</h3>
        {ARTICLE.map((paragraph) => (
          <p
            key={paragraph}
            className="mb-4 text-sm leading-relaxed text-muted-foreground"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
