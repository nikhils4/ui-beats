import React from "react";
import GravityTextSwap from "@/components/demo/text/gravity-text-swap";

const GravityTextSwapUsage = () => {
  return (
    <GravityTextSwap
      textArray={["Code", "Build", "Sleep", "Repeat"]}
      duration={0.5}
      pauseDuration={0.8}
      className="text-md mb-4 md:text-lg"
    />
  );
};

export default GravityTextSwapUsage;
