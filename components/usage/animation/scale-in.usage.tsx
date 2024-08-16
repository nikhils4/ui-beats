import React from "react";
import ScaleIn from "@/components/demo/animation/scale-in";

const ScaleInUsage = () => {
  return (
    <ScaleIn>
      <div className="text-md md:text-lg mb-4">
        This content will scale in when visible
      </div>
    </ScaleIn>
  );
};

ScaleInUsage.stringVersion = `<ScaleIn><div className="text-md md:text-lg mb-4">This content will scale in when visible</div></ScaleIn>`;

export default ScaleInUsage;