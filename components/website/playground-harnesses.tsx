"use client";

import type { ComponentType } from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

const loading = () => <Skeleton className="size-full" />;

/**
 * Lazy map of playground harnesses, keyed by `<category>/<name>`.
 *
 * Split per component for the same reason the preview map is: a page should
 * download the one harness it renders, not all of them.
 */
export const playgroundHarnesses: Record<
  string,
  ComponentType<PlaygroundHarnessProps>
> = {
  "animation/animated-list": dynamic(
    () => import("@/components/playground/animation/animated-list.playground"),
    { loading },
  ),
  "animation/bounce": dynamic(
    () => import("@/components/playground/animation/bounce.playground"),
    { loading },
  ),
  "animation/fade-in": dynamic(
    () => import("@/components/playground/animation/fade-in.playground"),
    { loading },
  ),
  "animation/fade-in-unblur": dynamic(
    () => import("@/components/playground/animation/fade-in-unblur.playground"),
    { loading },
  ),
  "animation/rotate-in": dynamic(
    () => import("@/components/playground/animation/rotate-in.playground"),
    { loading },
  ),
  "animation/scale-in": dynamic(
    () => import("@/components/playground/animation/scale-in.playground"),
    { loading },
  ),
  "animation/smooth-reveal": dynamic(
    () => import("@/components/playground/animation/smooth-reveal.playground"),
    { loading },
  ),
  "animation/stagger-list": dynamic(
    () => import("@/components/playground/animation/stagger-list.playground"),
    { loading },
  ),
  "background/animated-beam": dynamic(
    () => import("@/components/playground/background/animated-beam.playground"),
    { loading },
  ),
  "background/gradient-flow": dynamic(
    () => import("@/components/playground/background/gradient-flow.playground"),
    { loading },
  ),
  "background/orbiting-elements": dynamic(
    () =>
      import("@/components/playground/background/orbiting-elements.playground"),
    { loading },
  ),
  "background/retro-grid": dynamic(
    () => import("@/components/playground/background/retro-grid.playground"),
    { loading },
  ),
  "background/aurora": dynamic(
    () => import("@/components/playground/background/aurora.playground"),
    { loading },
  ),
  "background/dot-pattern": dynamic(
    () => import("@/components/playground/background/dot-pattern.playground"),
    { loading },
  ),
  "background/particles": dynamic(
    () => import("@/components/playground/background/particles.playground"),
    { loading },
  ),
  "background/sparkling-grid": dynamic(
    () =>
      import("@/components/playground/background/sparkling-grid.playground"),
    { loading },
  ),
  "button/magnetic-button": dynamic(
    () => import("@/components/playground/button/magnetic-button.playground"),
    { loading },
  ),
  "button/ripple-button": dynamic(
    () => import("@/components/playground/button/ripple-button.playground"),
    { loading },
  ),
  "button/subscribe-button": dynamic(
    () => import("@/components/playground/button/subscribe-button.playground"),
    { loading },
  ),
  "button/rainbow-button": dynamic(
    () => import("@/components/playground/button/rainbow-button.playground"),
    { loading },
  ),
  "button/confetti-button": dynamic(
    () => import("@/components/playground/button/confetti-button.playground"),
    { loading },
  ),
  "card/card-stack": dynamic(
    () => import("@/components/playground/card/card-stack.playground"),
    { loading },
  ),
  "card/flip-card": dynamic(
    () => import("@/components/playground/card/flip-card.playground"),
    { loading },
  ),
  "card/glowing-card": dynamic(
    () => import("@/components/playground/card/glowing-card.playground"),
    { loading },
  ),
  "card/morphing-card": dynamic(
    () => import("@/components/playground/card/morphing-card.playground"),
    { loading },
  ),
  "card/tilt-card": dynamic(
    () => import("@/components/playground/card/tilt-card.playground"),
    { loading },
  ),
  "card/expandable-card": dynamic(
    () => import("@/components/playground/card/expandable-card.playground"),
    { loading },
  ),
  "component/border-beam": dynamic(
    () => import("@/components/playground/component/border-beam.playground"),
    { loading },
  ),
  "component/dock": dynamic(
    () => import("@/components/playground/component/dock.playground"),
    { loading },
  ),
  "component/liquid-tabs": dynamic(
    () => import("@/components/playground/component/liquid-tabs.playground"),
    { loading },
  ),
  "component/marquee": dynamic(
    () => import("@/components/playground/component/marquee.playground"),
    { loading },
  ),
  "component/scratch-to-reveal": dynamic(
    () =>
      import("@/components/playground/component/scratch-to-reveal.playground"),
    { loading },
  ),
  "component/shimmer-effect": dynamic(
    () => import("@/components/playground/component/shimmer-effect.playground"),
    { loading },
  ),
  "component/timeline": dynamic(
    () => import("@/components/playground/component/timeline.playground"),
    { loading },
  ),
  "component/terminal": dynamic(
    () => import("@/components/playground/component/terminal.playground"),
    { loading },
  ),
  "component/comparison-slider": dynamic(
    () =>
      import("@/components/playground/component/comparison-slider.playground"),
    { loading },
  ),
  "component/progress-ring": dynamic(
    () => import("@/components/playground/component/progress-ring.playground"),
    { loading },
  ),
  "text/gravity-text-swap": dynamic(
    () => import("@/components/playground/text/gravity-text-swap.playground"),
    { loading },
  ),
  "text/number-ticker": dynamic(
    () => import("@/components/playground/text/number-ticker.playground"),
    { loading },
  ),
  "text/scroll-reveal": dynamic(
    () => import("@/components/playground/text/scroll-reveal.playground"),
    { loading },
  ),
  "text/split-flap": dynamic(
    () => import("@/components/playground/text/split-flap.playground"),
    { loading },
  ),
  "text/text-scramble": dynamic(
    () => import("@/components/playground/text/text-scramble.playground"),
    { loading },
  ),
  "text/text-shine": dynamic(
    () => import("@/components/playground/text/text-shine.playground"),
    { loading },
  ),
  "text/text-writer": dynamic(
    () => import("@/components/playground/text/text-writer.playground"),
    { loading },
  ),
  "text/gradient-text": dynamic(
    () => import("@/components/playground/text/gradient-text.playground"),
    { loading },
  ),
  "text/flip-words": dynamic(
    () => import("@/components/playground/text/flip-words.playground"),
    { loading },
  ),
};

/** Whether a component has a playground harness wired up. */
export function hasPlayground(category: string, name: string): boolean {
  return `${category}/${name}` in playgroundHarnesses;
}
