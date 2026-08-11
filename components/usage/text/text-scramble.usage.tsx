"use client";
import { TextScramble } from "@/components/demo/text/text-scramble";

const TextScrambleUsage = () => {
  return (
    <TextScramble
      text="Supercharge your UI"
      speed={35}
      className="text-xl font-bold md:text-2xl"
    />
  );
};

export default TextScrambleUsage;
