"use client";

import { Sparkles } from "lucide-react";
import { BorderBeam } from "@/components/demo/component/border-beam";

const BorderBeamUsage = () => {
  return (
    <BorderBeam className="w-72" duration={5}>
      <div className="p-6">
        <div className="flex size-9 items-center justify-center rounded-lg bg-brand-subtle text-brand">
          <Sparkles className="size-4" />
        </div>
        <h3 className="mt-4 text-sm font-semibold">Pro plan</h3>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          A light travels the border to mark the card worth looking at, without
          moving anything on the page.
        </p>
      </div>
    </BorderBeam>
  );
};

export default BorderBeamUsage;
