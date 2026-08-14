"use client";

import Marquee from "@/components/demo/component/marquee";
import { asProps } from "@/lib/playground";
import { LogoItems } from "@/components/playground/demo-content";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for Marquee.
 *
 * Mirrors `components/usage/component/marquee.usage.tsx` so the studio and
 * the docs page show the same demo. The component takes its props from the
 * control panel; everything around it is identical.
 */
export default function MarqueePlayground({ values }: PlaygroundHarnessProps) {
  const props = asProps(Marquee, values);

  return (
    <Marquee {...props}>
      <LogoItems />
    </Marquee>
  );
}
