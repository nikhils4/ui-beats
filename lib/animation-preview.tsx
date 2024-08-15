import React from "react";
import FadeIn from "@/components/demo/fade-in";
import ScaleIn from "@/components/demo/scale-in";
import SmoothReveal from "@/components/demo/smooth-reveal";
import RotateIn from "@/components/demo/rotate-in";
import TextWriter from "@/components/demo/text-writer";
import ShimmerEffect from "@/components/demo/shimmer-effect";

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
    case "rotate-in":
      if (isString) {
        return `<RotateIn><div className="text-md mb-4">This content will rotate in when visible</div></RotateIn>`;
      }
      return (
        <RotateIn key={key}>
          <div className="text-md mb-4">
            This content will rotate in when visible
          </div>
        </RotateIn>
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
    case "shimmer-effect":
      if (isString) {
        return `<ShimmerEffect width="200px" height="20px" duration={2} />`;
      }
      return (
        <ShimmerEffect key={key} width="200px" height="20px" duration={2} />
      );
    default:
      return "";
  }
};
