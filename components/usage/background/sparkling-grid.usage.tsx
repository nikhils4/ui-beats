"use client";
import { SparklingGrid } from "@/components/demo/background/sparkling-grid";

const SparklingGridUsage = () => {
  return (
    <div className="relative size-full overflow-hidden">
      <SparklingGrid gridSize={28} sparkleFrequency={0.05} />
      {/* `relative z-10` lifts content above the grid. */}
      <div className="relative z-10 flex size-full items-center justify-center text-lg font-semibold md:text-2xl">
        Sparkling Grid Background
      </div>
    </div>
  );
};

export default SparklingGridUsage;
