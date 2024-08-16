import React from "react";
import Bounce from "@/components/demo/animation/bounce";

const BounceUsage = ({ key }: { key: number }) => {
  return (
    <Bounce key={key}>
      <div className="text-md md:text-lg mb-4">
        This content will bounce when visible
      </div>
    </Bounce>
  );
};

BounceUsage.stringVersion = `<Bounce><div className="text-md md:text-lg mb-4">This content will bounce when visible</div></Bounce>`;

export default BounceUsage;