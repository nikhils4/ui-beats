"use client";

import { Meteors } from "@/components/demo/background/meteors";

const MeteorsUsage = () => {
  return (
    <div className="relative size-full overflow-hidden bg-neutral-950">
      <Meteors count={24} color="#c4b5fd" />

      <div className="relative z-10 flex size-full flex-col items-center justify-center px-6 text-center">
        <h2 className="text-4xl font-bold tracking-tighter text-white">
          Night shift
        </h2>
        <p className="mt-2 max-w-xs text-sm text-neutral-400">
          A quiet shower of light falling behind whatever you put in front of
          it.
        </p>
      </div>
    </div>
  );
};

export default MeteorsUsage;
