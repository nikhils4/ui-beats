import React from "react";
import FadeInUnblur from "@/components/demo/animation/fade-in-unblur";

const FadeInUnblurUsage = () => {
  return (
    <FadeInUnblur>
      <p className="text-md md:text-lg mb-4">
        This content fades in while unblurring when it enters the viewport
      </p>
    </FadeInUnblur>
  );
};

FadeInUnblurUsage.stringVersion = `<FadeInUnblur><p className="text-md md:text-lg mb-4">This content fades in while unblurring when it enters the viewport</p></FadeInUnblur>`;

export default FadeInUnblurUsage;
