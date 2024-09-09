import React from "react";
import { SparklingGrid } from "@/components/demo/components/sparkling-grid";

const SparklingGridUsage = () => {
  return (
    <div className="relative h-80 w-full">
      <SparklingGrid />
      <div className="absolute inset-0 flex items-center justify-center text-lg md:text-2xl font-semibold">
        Sparkling Grid Background
      </div>
    </div>
  );
};

SparklingGridUsage.stringVersion = `<div className="relative h-80 w-full">
  <SparklingGrid />
  <div className="absolute inset-0 flex items-center justify-center text-lg md:text-2xl font-semibold">
    Sparkling Grid Background
  </div>
</div>`;

export default SparklingGridUsage;
