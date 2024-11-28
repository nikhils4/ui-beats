import React from "react";
import TextWriter from "@/components/demo/text/text-writer";

const TextWriterUsage = () => {
  return (
    <TextWriter
      text="Welcome to UI Beats"
      className="text-md md:text-lg mb-4"
      delay={0.1}
    />
  );
};

TextWriterUsage.stringVersion = `<TextWriter
  text="Welcome to UI Beats"
  className="text-md md:text-lg mb-4"
  delay={0.1}
/>`;

export default TextWriterUsage;
