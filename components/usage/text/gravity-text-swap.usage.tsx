import React from "react";
import GravityTextSwap from "@/components/demo/text/gravity-text-swap";

const GravityTextSwapUsage = () => {
  return (
    <GravityTextSwap
      textArray={["Code", "Build", "Sleep", "Repeat"]}
      duration={0.5}
      pauseDuration={0.8}
      className="text-md md:text-lg mb-4"
    />
  );
};

GravityTextSwapUsage.stringVersion =
    `<GravityTextSwap
  textArray={["Code", "Build", "Sleep", "Repeat"]}
  duration={0.5}
  pauseDuration={0.8}
  className="text-md md:text-lg mb-4"
/>`;

export default GravityTextSwapUsage;