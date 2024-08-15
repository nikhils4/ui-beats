import React from "react";
import FadeIn from "@/components/demo/fade-in";
import ScaleIn from "@/components/demo/scale-in";
import SmoothReveal from "@/components/demo/smooth-reveal";
import TextWriter from "@/components/demo/text-writer";

export const getAnimationPreview = (
  componentName: string,
  key: number = 0,
  isString: boolean = false,
) => {
  switch (componentName) {
    case "fade-in":
      if (isString) {
        return `<FadeIn><p className="text-md mb-4">This content will fade in when it enters the viewport</p></FadeIn>`;
      }
      return (
        <FadeIn key={key}>
          <p className="text-xl">
            This content will fade in when it enters the viewport
          </p>
        </FadeIn>
      );
    case "smooth-reveal":
      if (isString) {
        return `<SmoothReveal><p className="text-md mb-4">This content will smoothly reveal on scroll</p></SmoothReveal>`;
      }
      return (
        <SmoothReveal key={key}>
          <p className="text-md mb-4">
            This content will smoothly reveal on scroll
          </p>
        </SmoothReveal>
      );
    case "scale-in":
      if (isString) {
        return `<ScaleIn><div className="text-md mb-4">This content will scale in when visible</div></ScaleIn>`;
      }
      return (
        <ScaleIn key={key}>
          <div className="text-md mb-4">
            This content will scale in when visible
          </div>
        </ScaleIn>
      );
    case "text-writer":
      if (isString) {
        return `<TextWriter text="Welcome to ui/beats" className="text-md mb-4" delay={0.1} />`;
      }
      return (
        <TextWriter
          key={key}
          text="Welcome to ui/beats"
          className="text-md mb-4"
          delay={0.1}
        />
      );
    default:
      return "";
  }
};
