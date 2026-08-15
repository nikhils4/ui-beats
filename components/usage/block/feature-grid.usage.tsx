"use client";
import { Boxes, Palette, Sparkles, Zap } from "lucide-react";
import { FeatureGrid } from "@/components/demo/block/feature-grid";

const FEATURES = [
  {
    title: "Copy, paste, own it",
    description:
      "Every component lands in your repo as plain source you can edit.",
    icon: Boxes,
    colSpan: 2,
  },
  {
    title: "Motion included",
    description:
      "Animation is part of the component, not a wrapper added later.",
    icon: Sparkles,
    colSpan: 1,
  },
  {
    title: "Themed by default",
    description: "Colours come from your own tokens.",
    icon: Palette,
    colSpan: 1,
  },
  {
    title: "Documented properly",
    description: "Every prop has a table, a playground, and a reason to exist.",
    icon: Zap,
    colSpan: 2,
  },
];

const FeatureGridUsage = () => {
  return (
    <FeatureGrid
      heading="Built to be edited"
      description="Four things that matter more than the component count."
      features={FEATURES}
    />
  );
};

export default FeatureGridUsage;
