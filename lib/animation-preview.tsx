import SmoothReveal from "@/components/demo/smooth-reveal";
import React from "react";
import TextWriter from "@/components/demo/text-writer";

export const getAnimationPreview = (
  componentName: string,
  key: number = 0,
  isString: boolean = false,
) => {
  switch (componentName) {
    case "smooth-reveal":
      if (isString) {
        return `<SmoothReveal><p className="text-xl">This content will smoothly reveal on scroll</p></SmoothReveal>`;
      }
      return (
        <SmoothReveal key={key}>
          <p className="text-xl">This content will smoothly reveal on scroll</p>
        </SmoothReveal>
      );
    case "text-writer":
      if (isString) {
        return `<TextWriter
  text="Welcome to ui/beats"
  className="text-4xl font-bold mb-4"
  delay={0.1}
/>`;
      }
      return (
        <TextWriter
          key={key}
          text="Welcome to ui/beats"
          className="text-4xl font-bold mb-4"
          delay={0.1}
        />
      );
    default:
      return "";
  }
};
