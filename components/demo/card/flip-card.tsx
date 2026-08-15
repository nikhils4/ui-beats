"use client";
import React, { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface FlipCardProps {
  frontContent: {
    title: string;
    subtitle?: string;
  };
  backContent: {
    title: string;
    description: string;
  };
  width?: string;
  height?: string;
  flipDirection?: "horizontal" | "vertical";
  triggerMode?: "hover" | "click";
}

const FlipCard: React.FC<FlipCardProps> = ({
  frontContent,
  backContent,
  width = "300px",
  height = "200px",
  flipDirection = "horizontal",
  triggerMode = "hover",
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const toggleFlip = () => {
    if (triggerMode === "click") {
      setIsFlipped(!isFlipped);
    }
  };

  const rotateValue =
    flipDirection === "horizontal" ? "rotateY(180deg)" : "rotateX(180deg)";

  const cardStyle = {
    width,
    height,
    perspective: "1000px",
  };

  const faceClassNames = cn(
    "absolute flex h-full w-full flex-col items-center justify-center p-6",
    "rounded-2xl border border-border shadow-lg backface-hidden",
    "overflow-hidden",
  );

  return (
    <div
      ref={cardRef}
      style={cardStyle}
      onMouseEnter={() => {
        if (triggerMode === "hover") setIsFlipped(true);
      }}
      onMouseLeave={() => {
        if (triggerMode === "hover") setIsFlipped(false);
      }}
      onClick={toggleFlip}
      className="relative cursor-pointer rounded-2xl"
    >
      <motion.div
        className="relative h-full w-full rounded-2xl"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ transform: isFlipped ? rotateValue : "none" }}
        /*
         * The card still turns under reduced motion — it just cuts rather than
         * sweeps. Suppressing the flip outright would leave the back face
         * permanently unreachable, which is a different bug from a calm one:
         * the component exists to show what is written on the other side.
         */
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { duration: 0.6, ease: [0.23, 1, 0.32, 1] }
        }
      >
        <div
          className={cn(faceClassNames, "bg-gradient-to-br from-card to-muted")}
        >
          <h3 className="mb-2 text-2xl font-semibold text-card-foreground">
            {frontContent.title}
          </h3>
          {frontContent.subtitle && (
            <p className="text-sm text-muted-foreground">
              {frontContent.subtitle}
            </p>
          )}
          <ArrowRight className="absolute right-4 bottom-4 h-6 w-6 text-muted-foreground" />
        </div>
        <div
          className={cn(faceClassNames, "bg-gradient-to-br from-muted to-card")}
          style={{ transform: rotateValue, backfaceVisibility: "hidden" }}
        >
          <h3 className="mb-3 text-xl font-semibold text-card-foreground">
            {backContent.title}
          </h3>
          <p className="text-center text-sm text-muted-foreground">
            {backContent.description}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default FlipCard;
