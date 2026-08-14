"use client";

import RotateIn from "@/components/demo/animation/rotate-in";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for RotateIn.
 *
 * Mirrors `components/usage/animation/rotate-in.usage.tsx` so the studio and
 * the docs page show the same demo. The component takes its props from the
 * control panel; everything around it is identical.
 */
export default function RotateInPlayground({ values }: PlaygroundHarnessProps) {
  const props = asProps(RotateIn, values);

  return (
    <RotateIn {...props}>
      <p className="text-md md:text-lg">
        This content will rotate in when visible
      </p>
    </RotateIn>
  );
}
