"use client";

import { FlipWords } from "@/components/demo/text/flip-words";

const FlipWordsUsage = () => {
  return (
    <p className="text-2xl font-semibold tracking-tight sm:text-3xl">
      Built for{" "}
      <FlipWords
        words={["designers", "engineers", "founders", "small teams"]}
        className="text-primary"
      />
    </p>
  );
};

export default FlipWordsUsage;
