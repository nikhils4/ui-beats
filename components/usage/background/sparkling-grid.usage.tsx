"use client";
import React from "react";
import { SparklingGrid } from "@/components/demo/background/sparkling-grid";
import { useTheme } from "next-themes";

const SparklingGridUsage = () => {
  const { theme } = useTheme();

  return (
    <div className="relative h-80 w-full">
      <SparklingGrid theme={theme as "light" | "dark"} />
      <div className="absolute inset-0 flex items-center justify-center text-lg md:text-2xl font-semibold">
        Sparkling Grid Background
      </div>
    </div>
  );
};

SparklingGridUsage.stringVersion = `<div className="relative h-80 w-full">
  <SparklingGrid theme={theme as "light" | "dark"} />
  <div className="absolute inset-0 flex items-center justify-center text-lg md:text-2xl font-semibold">
    Sparkling Grid Background
  </div>
</div>`;

export default SparklingGridUsage;
