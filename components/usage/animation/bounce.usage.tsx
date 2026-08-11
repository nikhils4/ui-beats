import React from "react";
import Bounce from "@/components/demo/animation/bounce";

const BounceUsage = () => {
  return (
    <Bounce delay={1.2}>
      <div className="text-md mb-4 md:text-lg">
        This content will bounce when visible
      </div>
    </Bounce>
  );
};

export default BounceUsage;
