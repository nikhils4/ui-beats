"use client";
import { useRef } from "react";
import { ScrollProgress } from "@/components/demo/component/scroll-progress";

const ARTICLE = [
  "Motion is a language, and most interfaces speak it badly.",
  "A transition that runs too long reads as lag. One that skips a frame reads as a bug.",
  "The fix is to move only what actually changed, and to move it the shortest distance that still explains itself.",
  "Everything else holds still, so the one thing that moved is the thing you notice.",
];

const ScrollProgressUsage = () => {
  const scrollArea = useRef<HTMLDivElement>(null);

  return (
    // The bar wraps the scroll area rather than sitting inside it, so it stays
    // put while the text moves. Drop `container` to track the whole page.
    <div className="relative w-full max-w-sm overflow-hidden rounded-xl border bg-card">
      <ScrollProgress container={scrollArea} />

      <div ref={scrollArea} className="h-56 overflow-y-auto p-5">
        <h3 className="mb-3 text-base font-semibold">On motion</h3>
        {ARTICLE.map((paragraph) => (
          <p
            key={paragraph}
            className="mb-4 text-sm leading-relaxed text-muted-foreground"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ScrollProgressUsage;
