"use client";

import { BentoCard, BentoGrid } from "@/components/demo/component/bento-grid";
import { BENTO_CELLS } from "@/components/playground/demo-content";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for BentoGrid.
 *
 * Mirrors `components/usage/component/bento-grid.usage.tsx` so the studio and
 * the docs page show the same demo. The cards and their spans are the content
 * being laid out; the grid's own settings come from the control panel.
 */
export default function BentoGridPlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(BentoGrid, values);

  return (
    <BentoGrid {...props}>
      {BENTO_CELLS.map(({ title, body, colSpan }) => (
        <BentoCard key={title} colSpan={colSpan}>
          <h3 className="text-sm font-semibold">{title}</h3>
          <p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
        </BentoCard>
      ))}
    </BentoGrid>
  );
}
