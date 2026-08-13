"use client";

import Marquee from "@/components/demo/component/marquee";
import { asProps } from "@/lib/playground";
import { StageLogos } from "@/components/playground/stage";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for Marquee.
 *
 * Supplies whatever the component needs beyond its scalar props — children,
 * object literals — and lets the control panel drive the rest.
 */
export default function MarqueePlayground({ values }: PlaygroundHarnessProps) {
  const props = asProps(Marquee, values);

  return (
    <Marquee {...props}>
      <StageLogos />
    </Marquee>
  );
}
