import React from "react";
import SmoothReveal from "@/components/demo/animation/smooth-reveal";

const SmoothRevealUsage = () => {
  return (
    <SmoothReveal>
      <p className="text-md md:text-lg mb-4">
        This content will smoothly reveal on scroll
      </p>
    </SmoothReveal>
  );
};

SmoothRevealUsage.stringVersion = `<SmoothReveal><p className="text-md md:text-lg mb-4">This content will smoothly reveal on scroll</p></SmoothReveal>`;

export default SmoothRevealUsage;