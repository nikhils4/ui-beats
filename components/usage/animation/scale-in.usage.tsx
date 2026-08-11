import React from "react";
import ScaleIn from "@/components/demo/animation/scale-in";

const ScaleInUsage = () => {
  return (
    <ScaleIn delay={1.2}>
      <div className="text-md mb-4 md:text-lg">
        This content will scale in when visible
      </div>
    </ScaleIn>
  );
};

export default ScaleInUsage;
