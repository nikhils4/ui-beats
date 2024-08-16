import React from "react";
import ShimmerEffect from "@/components/demo/components/shimmer-effect";

const ShimmerEffectUsage = ({ key }: { key: number }) => {
  return <ShimmerEffect key={key} width="200px" height="20px" duration={2} />;
};

ShimmerEffectUsage.stringVersion = `<ShimmerEffect width="200px" height="20px" duration={2} />`;

export default ShimmerEffectUsage;