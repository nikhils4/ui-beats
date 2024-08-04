import SmoothReveal from "@/components/demo/smooth-reveal";
import React from "react";
import TextWriter from "@/components/demo/text-writer";

export const getAnimationPreview = (
  componentName: string,
  isString: boolean = false,
) => {
  switch (componentName) {
    case "smooth-reveal":
      if (isString) {
        return `<SmoothReveal><p>This content will smoothly reveal on scroll</p></SmoothReveal>`;
      }
      return (
        <SmoothReveal>
          <p>This content will smoothly reveal on scroll</p>
        </SmoothReveal>
      );
    case "text-writer":
      if (isString) {
        return `<TextWriter
  text="Welcome to Our Amazing Website"
  className="text-4xl font-bold mb-4"
  delay={0.1}
/>`;
      }
      return (
        <TextWriter
          text="Welcome to Our Amazing Website"
          className="text-4xl font-bold mb-4"
          delay={0.1}
        />
      );
    default:
      return "";
  }
};
