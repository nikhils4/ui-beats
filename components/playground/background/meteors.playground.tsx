"use client";

import Meteors from "@/components/demo/background/meteors";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for Meteors.
 *
 * Mirrors `components/usage/background/meteors.usage.tsx` so the studio and the
 * docs page show the same demo. The component takes its props from the control
 * panel; everything around it is identical.
 */
export default function MeteorsPlayground({ values }: PlaygroundHarnessProps) {
  const props = asProps(Meteors, values);

  return (
    <div className="relative size-full overflow-hidden rounded-lg bg-neutral-950">
      <Meteors {...props} />

      <div className="relative z-10 flex size-full flex-col items-center justify-center px-6 text-center">
        <h2 className="text-4xl font-bold tracking-tighter text-white">
          Night shift
        </h2>
        <p className="mt-2 max-w-xs text-sm text-neutral-400">
          A quiet shower of light falling behind whatever you put in front of
          it.
        </p>
      </div>
    </div>
  );
}
