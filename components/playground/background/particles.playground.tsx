"use client";

import Particles from "@/components/demo/background/particles";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for Particles.
 *
 * Mirrors `components/usage/background/particles.usage.tsx` so the studio and
 * the docs page show the same demo. `quantity` is a control here, so the
 * harness does not pin it the way the docs demo does.
 */
export default function ParticlesPlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(Particles, values);

  return (
    <div className="relative size-full overflow-hidden rounded-lg bg-background">
      <Particles {...props} className="text-foreground" />

      <div className="pointer-events-none relative z-10 flex size-full flex-col items-center justify-center px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tighter">Drift</h2>
        <p className="mt-2 max-w-xs text-sm text-muted-foreground">
          Sixty specks on a canvas, scattering out of the way wherever the
          pointer goes.
        </p>
      </div>
    </div>
  );
}
