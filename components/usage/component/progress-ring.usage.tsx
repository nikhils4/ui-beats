"use client";

import { ProgressRing } from "@/components/demo/component/progress-ring";

const ProgressRingUsage = () => {
  return (
    <div className="flex flex-col items-center gap-3">
      <ProgressRing />
      <p className="text-sm text-muted-foreground">
        The number is driven by the same animation as the arc.
      </p>
    </div>
  );
};

export default ProgressRingUsage;
