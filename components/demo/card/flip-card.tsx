"use client";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
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
        "absolute w-full h-full flex flex-col items-center justify-center p-6",
        "backface-hidden rounded-2xl shadow-lg border border-gray-200",
        "dark:border-gray-700 overflow-hidden"
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
            className="cursor-pointer relative rounded-2xl"
        >
            <motion.div
                className="w-full h-full relative rounded-2xl"
                style={{ transformStyle: "preserve-3d" }}
                animate={{ transform: isFlipped ? rotateValue : "none" }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
                <div className={cn(
                    faceClassNames,
                    "bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900"
                )}>
                    <h3 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white">
                        {frontContent.title}
                    </h3>
                    {frontContent.subtitle && (
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            {frontContent.subtitle}
                        </p>
                    )}
                    <ArrowRight className="absolute bottom-4 right-4 w-6 h-6 text-gray-400 dark:text-gray-500" />
                </div>
                <div
                    className={cn(
                        faceClassNames,
                        "bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
                    )}
                    style={{ transform: rotateValue, backfaceVisibility: "hidden" }}
                >
                    <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
                        {backContent.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                        {backContent.description}
                    </p>
                </div>
            </motion.div>
        </div>
    );
};


export default FlipCard;