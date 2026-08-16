"use client";

import { ExpandableCard } from "@/components/demo/card/expandable-card";

const releases = [
  {
    id: "registry",
    meta: "Distribution",
    title: "Install with one command",
    summary: "The CLI writes the source into your repo",
    detail:
      "Every component is published as a registry item, so the shadcn CLI drops the real source into your project along with the packages it needs. Nothing to pin, nothing to wrap.",
  },
  {
    id: "motion",
    meta: "Animation",
    title: "Motion is part of the component",
    summary: "Not a wrapper bolted on afterwards",
    detail:
      "The animation lives in the same file as the markup, which is why you can change it. A library that hides motion behind a prop can only ever give you the transitions it thought of first.",
  },
  {
    id: "themes",
    meta: "Theming",
    title: "Colours come from your tokens",
    summary: "Both themes, and the ones you define",
    detail:
      "Components read the design tokens your project already defines, so an install picks up your palette instead of ours. Anything outside that set ships with the component as a variable.",
  },
];

const ExpandableCardUsage = () => {
  return (
    <div className="w-full max-w-md">
      <ExpandableCard items={releases} />
    </div>
  );
};

export default ExpandableCardUsage;
