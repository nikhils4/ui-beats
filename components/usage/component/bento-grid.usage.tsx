"use client";
import { BentoCard, BentoGrid } from "@/components/demo/component/bento-grid";

const CELLS = [
  {
    title: "Copy, paste, own it",
    body: "Every component lands in your repo as plain source you can edit.",
    colSpan: 2,
  },
  {
    title: "Motion included",
    body: "Animation is part of the component, not a wrapper bolted on later.",
    colSpan: 1,
  },
  {
    title: "Themed by default",
    body: "Colours come from your own tokens.",
    colSpan: 1,
  },
  {
    title: "Documented properly",
    body: "Every prop has a table, a playground, and a reason to exist.",
    colSpan: 2,
  },
];

const BentoGridUsage = () => {
  return (
    <BentoGrid columns={3} gap={12}>
      {CELLS.map(({ title, body, colSpan }) => (
        <BentoCard key={title} colSpan={colSpan}>
          <h3 className="text-sm font-semibold">{title}</h3>
          <p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
        </BentoCard>
      ))}
    </BentoGrid>
  );
};

export default BentoGridUsage;
