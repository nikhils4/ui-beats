"use client";

import ScaleIn from "@/components/demo/animation/scale-in";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for ScaleIn.
 *
 * Mirrors `components/usage/animation/scale-in.usage.tsx` so the studio and
 * the docs page show the same demo. The component takes its props from the
 * control panel; everything around it is identical.
 */
export default function ScaleInPlayground({ values }: PlaygroundHarnessProps) {
  const props = asProps(ScaleIn, values);

  return (
    <ScaleIn {...props}>
      <p className="text-md md:text-lg">
        This content will scale in when visible
      </p>
    </ScaleIn>
  );
}
