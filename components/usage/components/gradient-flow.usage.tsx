import React from "react";
import GradientFlow from "@/components/demo/components/gradient-flow";

const GradientFlowUsage = ({ key }: { key: number }) => {
  return (
    <GradientFlow
      key={key}
      duration={20}
      colors={["#6366f1", "#2563eb", "#7c3aed", "#db2777"]}
      fullWidth={true}
      radialOverlay={true}
      blurAmount="10px"
    >
      <div className="text-white text-md md:text-lg mb-4">
        Flowing Gradient Background
      </div>
    </GradientFlow>
  );
};

GradientFlowUsage.stringVersion =
`<GradientFlow
  duration={20} 
  colors={['#6366f1', '#2563eb', '#7c3aed', '#db2777']} 
  fullWidth={true}
  radialOverlay={true}
  blurAmount="10px"
>
  <div className="text-white text-md md:text-lg mb-4">
    Flowing Gradient Background
  </div>
</GradientFlow>`;

export default GradientFlowUsage;