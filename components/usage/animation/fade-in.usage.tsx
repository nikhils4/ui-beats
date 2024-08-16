import React from "react";
import FadeIn from "@/components/demo/animation/fade-in";

const FadeInUsage = () => {
  return (
    <FadeIn>
      <p className="text-md md:text-lg mb-4">
        This content will fade in when it enters the viewport
      </p>
    </FadeIn>
  );
};

FadeInUsage.stringVersion = `<FadeIn><p className="text-md md:text-lg mb-4">This content will fade in when it enters the viewport</p></FadeIn>`;

export default FadeInUsage;