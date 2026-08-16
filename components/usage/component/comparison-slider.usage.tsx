"use client";

import { ComparisonSlider } from "@/components/demo/component/comparison-slider";

/*
 * The two sides differ in colour, not in copy, and their labels sit in
 * opposite corners. Put the same sentence in the same place on both and the
 * divider cuts it in half, so the demo reads as one broken paragraph rather
 * than as two treatments of one design.
 */
const Before = () => (
  <div className="flex size-full flex-col justify-between bg-muted p-4">
    <span className="self-start rounded-full border bg-background/90 px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase">
      Before
    </span>
    <div className="space-y-2">
      <div className="h-2.5 w-2/3 rounded-full bg-foreground/25" />
      <div className="h-2.5 w-1/2 rounded-full bg-foreground/15" />
    </div>
  </div>
);

const After = () => (
  <div className="flex size-full flex-col justify-between bg-gradient-to-br from-primary/35 via-primary/10 to-transparent p-4">
    <span className="self-end rounded-full border bg-background/90 px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase">
      After
    </span>
    <div className="space-y-2">
      <div className="h-2.5 w-2/3 rounded-full bg-primary/70" />
      <div className="h-2.5 w-1/2 rounded-full bg-primary/40" />
    </div>
  </div>
);

const ComparisonSliderUsage = () => {
  return (
    <ComparisonSlider
      before={<Before />}
      after={<After />}
      className="h-56 w-full max-w-sm rounded-xl border"
    />
  );
};

export default ComparisonSliderUsage;
