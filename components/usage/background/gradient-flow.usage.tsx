import React from "react";
import GradientFlow from "@/components/demo/background/gradient-flow";

const GradientFlowUsage = () => {
  return (
    <GradientFlow
      duration={20}
      colors={["#6366f1", "#2563eb", "#7c3aed", "#db2777"]}
      fullWidth={true}
      radialOverlay={true}
      blurAmount="10px"
    >
      <div className="text-md mb-4 text-white md:text-lg">
        Flowing Gradient Background
      </div>
    </GradientFlow>
  );
};

export default GradientFlowUsage;
