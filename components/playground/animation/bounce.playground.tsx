"use client";

import Bounce from "@/components/demo/animation/bounce";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for Bounce.
 *
 * Mirrors `components/usage/animation/bounce.usage.tsx` so the studio and
 * the docs page show the same demo. The component takes its props from the
 * control panel; everything around it is identical.
 */
export default function BouncePlayground({ values }: PlaygroundHarnessProps) {
  const props = asProps(Bounce, values);

  return (
    <Bounce {...props}>
      <p className="text-md md:text-lg">
        This content will bounce when visible
      </p>
    </Bounce>
  );
}
