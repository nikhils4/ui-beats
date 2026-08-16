"use client";

import { Aurora } from "@/components/demo/background/aurora";

const AuroraUsage = () => {
  return (
    <div className="relative size-full overflow-hidden bg-background">
      <Aurora />

      <div className="relative z-10 flex size-full flex-col items-center justify-center px-6 text-center">
        <h2 className="text-4xl font-bold tracking-tighter">Northern lights</h2>
        <p className="mt-2 max-w-xs text-sm text-muted-foreground">
          Three ribbons on different periods, so the field never settles into a
          pattern.
        </p>
      </div>
    </div>
  );
};

export default AuroraUsage;
