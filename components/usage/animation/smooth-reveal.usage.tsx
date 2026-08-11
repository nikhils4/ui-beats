import React from "react";
import SmoothReveal from "@/components/demo/animation/smooth-reveal";

const SmoothRevealUsage = () => {
  return (
    <SmoothReveal delay={1.2}>
      <p className="text-md mb-4 md:text-lg">
        This content will smoothly reveal on scroll
      </p>
    </SmoothReveal>
  );
};

export default SmoothRevealUsage;
