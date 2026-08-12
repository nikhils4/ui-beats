"use client";
import { ScrollReveal } from "@/components/demo/text/scroll-reveal";

const ScrollRevealUsage = () => {
  return (
    <ScrollReveal className="max-w-md text-xl leading-relaxed font-semibold md:text-2xl">
      Scroll and every word arrives in turn, tied to the scrollbar rather than
      to a timer.
    </ScrollReveal>
  );
};

export default ScrollRevealUsage;
