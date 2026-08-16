"use client";

import { ComparisonSlider } from "@/components/demo/component/comparison-slider";
import {
  ComparisonAfter,
  ComparisonBefore,
} from "@/components/playground/demo-content";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for ComparisonSlider.
 *
 * `before` and `after` are nodes, so they cannot become controls; the harness
 * supplies the same two panels the docs demo shows.
 */
export default function ComparisonSliderPlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(ComparisonSlider, values);

  return (
    <ComparisonSlider
      {...props}
      before={<ComparisonBefore />}
      after={<ComparisonAfter />}
      className="h-56 w-full max-w-sm rounded-xl border"
    />
  );
}
