"use client";

import { useState, type ComponentType } from "react";
import dynamic from "next/dynamic";
import { RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

/**
 * Previews take no props; they are self-contained examples. `object`, in place
 * of `Record<string, never>`, keeps them assignable from `next/dynamic`'s
 * inferred component types.
 */
type PreviewComponent = ComponentType<object>;

/**
 * The stage renders immediately; the preview inside it does not, because every
 * one is a separate `next/dynamic` chunk. `data-preview-loading` marks that gap
 * so the visual suite can tell "not here yet" from "here and not yet animated",
 * which look identical for an entrance that starts at opacity zero.
 */
const loading = () => (
  <Skeleton data-preview-loading="" className="size-full" />
);

/**
 * Lazy map of live previews, keyed by `<category>/<name>`.
 *
 * `next/dynamic` gives every component its own chunk, so a docs page loads one
 * preview rather than all sixteen. The old `components/usage/index.ts` pulled
 * every usage module in through `require()`, which bundled the whole catalogue
 * into every page.
 */
const previews: Record<string, PreviewComponent> = {
  "block/hero": dynamic(() => import("@/components/usage/block/hero.usage"), {
    loading,
  }),
  "block/pricing": dynamic(
    () => import("@/components/usage/block/pricing.usage"),
    { loading },
  ),
  "block/feature-grid": dynamic(
    () => import("@/components/usage/block/feature-grid.usage"),
    { loading },
  ),
  "animation/animated-list": dynamic(
    () => import("@/components/usage/animation/animated-list.usage"),
    { loading },
  ),
  "animation/bounce": dynamic(
    () => import("@/components/usage/animation/bounce.usage"),
    { loading },
  ),
  "animation/fade-in": dynamic(
    () => import("@/components/usage/animation/fade-in.usage"),
    { loading },
  ),
  "animation/fade-in-unblur": dynamic(
    () => import("@/components/usage/animation/fade-in-unblur.usage"),
    { loading },
  ),
  "animation/rotate-in": dynamic(
    () => import("@/components/usage/animation/rotate-in.usage"),
    { loading },
  ),
  "animation/scale-in": dynamic(
    () => import("@/components/usage/animation/scale-in.usage"),
    { loading },
  ),
  "animation/smooth-reveal": dynamic(
    () => import("@/components/usage/animation/smooth-reveal.usage"),
    { loading },
  ),
  "animation/stagger-list": dynamic(
    () => import("@/components/usage/animation/stagger-list.usage"),
    { loading },
  ),
  "background/gradient-flow": dynamic(
    () => import("@/components/usage/background/gradient-flow.usage"),
    { loading },
  ),
  "background/orbiting-elements": dynamic(
    () => import("@/components/usage/background/orbiting-elements.usage"),
    { loading },
  ),
  "background/animated-beam": dynamic(
    () => import("@/components/usage/background/animated-beam.usage"),
    { loading },
  ),
  "background/retro-grid": dynamic(
    () => import("@/components/usage/background/retro-grid.usage"),
    { loading },
  ),
  "background/sparkling-grid": dynamic(
    () => import("@/components/usage/background/sparkling-grid.usage"),
    { loading },
  ),
  "background/meteors": dynamic(
    () => import("@/components/usage/background/meteors.usage"),
    { loading },
  ),
  "background/aurora": dynamic(
    () => import("@/components/usage/background/aurora.usage"),
    { loading },
  ),
  "background/dot-pattern": dynamic(
    () => import("@/components/usage/background/dot-pattern.usage"),
    { loading },
  ),
  "background/particles": dynamic(
    () => import("@/components/usage/background/particles.usage"),
    { loading },
  ),
  "button/ripple-button": dynamic(
    () => import("@/components/usage/button/ripple-button.usage"),
    { loading },
  ),
  "button/subscribe-button": dynamic(
    () => import("@/components/usage/button/subscribe-button.usage"),
    { loading },
  ),
  "button/magnetic-button": dynamic(
    () => import("@/components/usage/button/magnetic-button.usage"),
    { loading },
  ),
  "button/shimmer-button": dynamic(
    () => import("@/components/usage/button/shimmer-button.usage"),
    { loading },
  ),
  "button/loading-button": dynamic(
    () => import("@/components/usage/button/loading-button.usage"),
    { loading },
  ),
  "button/rainbow-button": dynamic(
    () => import("@/components/usage/button/rainbow-button.usage"),
    { loading },
  ),
  "button/confetti-button": dynamic(
    () => import("@/components/usage/button/confetti-button.usage"),
    { loading },
  ),
  "card/card-stack": dynamic(
    () => import("@/components/usage/card/card-stack.usage"),
    { loading },
  ),
  "card/flip-card": dynamic(
    () => import("@/components/usage/card/flip-card.usage"),
    { loading },
  ),
  "card/glowing-card": dynamic(
    () => import("@/components/usage/card/glowing-card.usage"),
    { loading },
  ),
  "card/morphing-card": dynamic(
    () => import("@/components/usage/card/morphing-card.usage"),
    { loading },
  ),
  "card/tilt-card": dynamic(
    () => import("@/components/usage/card/tilt-card.usage"),
    { loading },
  ),
  "card/expandable-card": dynamic(
    () => import("@/components/usage/card/expandable-card.usage"),
    { loading },
  ),
  "component/shimmer-effect": dynamic(
    () => import("@/components/usage/component/shimmer-effect.usage"),
    { loading },
  ),
  "component/marquee": dynamic(
    () => import("@/components/usage/component/marquee.usage"),
    { loading },
  ),
  "component/dock": dynamic(
    () => import("@/components/usage/component/dock.usage"),
    { loading },
  ),
  "component/border-beam": dynamic(
    () => import("@/components/usage/component/border-beam.usage"),
    { loading },
  ),
  "component/liquid-tabs": dynamic(
    () => import("@/components/usage/component/liquid-tabs.usage"),
    { loading },
  ),
  "component/scratch-to-reveal": dynamic(
    () => import("@/components/usage/component/scratch-to-reveal.usage"),
    { loading },
  ),
  "component/bento-grid": dynamic(
    () => import("@/components/usage/component/bento-grid.usage"),
    { loading },
  ),
  "component/avatar-stack": dynamic(
    () => import("@/components/usage/component/avatar-stack.usage"),
    { loading },
  ),
  "component/scroll-progress": dynamic(
    () => import("@/components/usage/component/scroll-progress.usage"),
    { loading },
  ),
  "component/timeline": dynamic(
    () => import("@/components/usage/component/timeline.usage"),
    { loading },
  ),
  "component/terminal": dynamic(
    () => import("@/components/usage/component/terminal.usage"),
    { loading },
  ),
  "component/comparison-slider": dynamic(
    () => import("@/components/usage/component/comparison-slider.usage"),
    { loading },
  ),
  "component/progress-ring": dynamic(
    () => import("@/components/usage/component/progress-ring.usage"),
    { loading },
  ),
  "text/gravity-text-swap": dynamic(
    () => import("@/components/usage/text/gravity-text-swap.usage"),
    { loading },
  ),
  "text/scroll-reveal": dynamic(
    () => import("@/components/usage/text/scroll-reveal.usage"),
    { loading },
  ),
  "text/number-ticker": dynamic(
    () => import("@/components/usage/text/number-ticker.usage"),
    { loading },
  ),
  "text/split-flap": dynamic(
    () => import("@/components/usage/text/split-flap.usage"),
    { loading },
  ),
  "text/text-shine": dynamic(
    () => import("@/components/usage/text/text-shine.usage"),
    { loading },
  ),
  "text/text-scramble": dynamic(
    () => import("@/components/usage/text/text-scramble.usage"),
    { loading },
  ),
  "text/text-writer": dynamic(
    () => import("@/components/usage/text/text-writer.usage"),
    { loading },
  ),
  "text/gradient-text": dynamic(
    () => import("@/components/usage/text/gradient-text.usage"),
    { loading },
  ),
  "text/flip-words": dynamic(
    () => import("@/components/usage/text/flip-words.usage"),
    { loading },
  ),
};

export function hasPreview(category: string, name: string): boolean {
  return `${category}/${name}` in previews;
}

interface ComponentPreviewProps {
  category: string;
  name: string;
  /** Some previews (backgrounds) need to fill the frame edge to edge. */
  fullBleed?: boolean;
  /** Lets a caller drop the frame when the preview already sits inside one. */
  className?: string;
}

export function ComponentPreview({
  category,
  name,
  fullBleed = false,
  className,
}: ComponentPreviewProps) {
  // Remounting the preview is how the replay button restarts enter animations.
  const [runId, setRunId] = useState(0);
  const Preview = previews[`${category}/${name}`];

  if (!Preview) {
    return (
      <div
        className={cn(
          "flex h-72 items-center justify-center rounded-xl border text-sm text-muted-foreground",
          className,
        )}
      >
        No preview available for this component.
      </div>
    );
  }

  return (
    <div
      // The visual-regression suite frames every capture on this element, so
      // a snapshot is of the component rather than of the page around it.
      // Structural selectors were doing the job before and broke whenever the
      // stage picked up a wrapper.
      data-preview-stage={`${category}/${name}`}
      className={cn(
        "group relative w-full max-w-full overflow-hidden rounded-xl border bg-card shadow-subtle",
        /*
         * A block is a whole page section, not a widget. In the 20rem stage
         * every other component uses, Pricing showed its heading and the top
         * inch of its cards — not the feature lists, not the buttons, and not
         * the Border Beam tracing the recommended tier, which is the entire
         * reason that block exists. Blocks get a stage tall enough to be
         * judged, and scroll rather than crop if they still exceed it.
         */
        category === "block" ? "h-[38rem] overflow-y-auto" : "h-80",
        className,
      )}
    >
      {/* A faint dot grid gives the stage depth and makes transparent or
          light-on-light components legible. Backgrounds opt out. */}
      {!fullBleed ? (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-dots [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black,transparent)] opacity-60"
        />
      ) : null}

      <Button
        variant="outline"
        size="icon"
        className="absolute top-3 right-3 z-20 size-8 bg-background/70 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 focus-visible:opacity-100 md:opacity-70"
        onClick={() => setRunId((id) => id + 1)}
        aria-label="Replay animation"
      >
        <RotateCw className="size-4" />
        <span className="sr-only">Replay animation</span>
      </Button>

      <div
        className={
          fullBleed
            ? "absolute inset-0"
            : "relative z-10 flex size-full items-center justify-center overflow-auto p-8"
        }
      >
        <Preview key={runId} />
      </div>
    </div>
  );
}
