import React from "react";
import RotateIn from "@/components/demo/animation/rotate-in";

const RotateInUsage = () => {
  return (
    <RotateIn delay={1.2}>
      <div className="text-md md:text-lg mb-4">
        This content will rotate in when visible
      </div>
    </RotateIn>
  );
};

RotateInUsage.stringVersion = `<RotateIn><div className="text-md md:text-lg mb-4">This content will rotate in when visible</div></RotateIn>`;

export default RotateInUsage;
