"use client";

import BorderBeam from "@/components/demo/component/border-beam";
import { asProps } from "@/lib/playground";
import { Sparkles } from "lucide-react";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for BorderBeam.
 *
 * Mirrors `components/usage/component/border-beam.usage.tsx` so the studio and
 * the docs page show the same demo. The component takes its props from the
 * control panel; everything around it is identical.
 */
export default function BorderBeamPlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(BorderBeam, values);

  return (
    <BorderBeam {...props} className="w-72">
      <div className="p-6">
        <div className="flex size-9 items-center justify-center rounded-lg bg-brand-subtle text-brand">
          <Sparkles className="size-4" />
        </div>
        <h3 className="mt-4 text-sm font-semibold">Pro plan</h3>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          A light travels the border to mark the card worth looking at, without
          moving anything on the page.
        </p>
      </div>
    </BorderBeam>
  );
}
