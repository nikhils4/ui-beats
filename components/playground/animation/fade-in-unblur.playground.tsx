"use client";

import FadeInUnblur from "@/components/demo/animation/fade-in-unblur";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for FadeInUnblur.
 *
 * Mirrors `components/usage/animation/fade-in-unblur.usage.tsx` so the studio and
 * the docs page show the same demo. The component takes its props from the
 * control panel; everything around it is identical.
 */
export default function FadeInUnblurPlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(FadeInUnblur, values);

  return (
    <FadeInUnblur {...props}>
      <p className="text-md md:text-lg">
        This content fades in while unblurring when it enters the viewport
      </p>
    </FadeInUnblur>
  );
}
