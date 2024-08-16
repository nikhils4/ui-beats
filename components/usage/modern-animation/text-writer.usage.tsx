import React from "react";
import TextWriter from "@/components/demo/modern-animation/text-writer";

const TextWriterUsage = () => {
  return (
    <TextWriter
      text="Welcome to ui/beats"
      className="text-md md:text-lg mb-4"
      delay={0.1}
    />
  );
};

TextWriterUsage.stringVersion =
    `<TextWriter
  text="Welcome to ui/beats"
  className="text-md md:text-lg mb-4"
  delay={0.1}
/>`;

export default TextWriterUsage;