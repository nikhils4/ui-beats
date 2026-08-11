import React from "react";
import FadeInUnblur from "@/components/demo/animation/fade-in-unblur";

const FadeInUnblurUsage = () => {
  return (
    <FadeInUnblur delay={1.2}>
      <p className="text-md mb-4 md:text-lg">
        This content fades in while unblurring when it enters the viewport
      </p>
    </FadeInUnblur>
  );
};

export default FadeInUnblurUsage;
