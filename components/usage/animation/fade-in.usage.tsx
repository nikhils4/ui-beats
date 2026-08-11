import React from "react";
import FadeIn from "@/components/demo/animation/fade-in";

const FadeInUsage = () => {
  return (
    <FadeIn delay={1.2}>
      <p className="text-md mb-4 md:text-lg">
        This content will fade in when it enters the viewport
      </p>
    </FadeIn>
  );
};

export default FadeInUsage;
