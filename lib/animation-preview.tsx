import SmoothReveal from "@/components/demo/smooth-reveal";
import React from "react";
import TextWriter from "@/components/demo/text-writer";
import ScaleIn from "@/components/demo/scale-in";

export const getAnimationPreview = (
  componentName: string,
  key: number = 0,
  isString: boolean = false,
) => {
  switch (componentName) {
    case "smooth-reveal":
      if (isString) {
        return `<SmoothReveal><p className="text-2xl font-bold mb-4">This content will smoothly reveal on scroll</p></SmoothReveal>`;
      }
      return (
        <SmoothReveal key={key}>
          <p className="text-2xl font-bold mb-4">
            This content will smoothly reveal on scroll
          </p>
        </SmoothReveal>
      );
    case "text-writer":
      if (isString) {
        return `<TextWriter
  text="Welcome to ui/beats"
  className="text-2xl font-bold mb-4"
  delay={0.1}
/>`;
      }
      return (
        <TextWriter
          key={key}
          text="Welcome to ui/beats"
          className="text-2xl font-bold mb-4"
          delay={0.1}
        />
      );
    case "scale-in":
      if (isString) {
        return `<ScaleIn><div className="text-2xl font-bold mb-4">This content will scale in when visible</div></ScaleIn>`;
      }
      return (
        <ScaleIn key={key}>
          <div className="text-2xl font-bold mb-4">
            This content will scale in when visible
          </div>
        </ScaleIn>
      );
    default:
      return "";
  }
};
