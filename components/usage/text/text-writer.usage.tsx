import React from "react";
import TextWriter from "@/components/demo/text/text-writer";

const TextWriterUsage = () => {
  return (
    <TextWriter
      text="Welcome to UI Beats"
      className="text-md mb-4 md:text-lg"
      delay={0.1}
    />
  );
};

export default TextWriterUsage;
