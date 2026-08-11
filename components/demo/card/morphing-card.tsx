import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Pause, Play } from "lucide-react";
import { useTheme } from "next-themes";

type Shape = "rectangle" | "circle" | "hexagon";

interface MorphingCardProps {
  width?: string;
  height?: string;
  contents: Array<{
    shape: Shape;
    title: string;
    description: string;
  }>;
  colorScheme?: {
    from: string;
    to: string;
  };
  autoPlay?: boolean;
  interval?: number;
}

const shapeVariants = {
  rectangle: { borderRadius: "16px", rotate: 0 },
  circle: { borderRadius: "50%", rotate: 120 },
  hexagon: { borderRadius: "24% 76% 24% 76% / 32% 32% 68% 68%", rotate: 240 },
};

const MorphingCard: React.FC<MorphingCardProps> = ({
  width = "300px",
  height = "300px",
  contents,
  colorScheme = { from: "#4F46E5", to: "#7C3AED" },
  autoPlay = true,
  interval = 3000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  const nextShape = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % contents.length);
  }, [contents.length]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(nextShape, interval);
    }
    return () => clearInterval(timer);
  }, [isPlaying, interval, nextShape]);

  const currentContent = contents[currentIndex];
  const { theme, systemTheme } = useTheme();

  // `contents` is caller-supplied; an empty array would otherwise crash here.
  if (!currentContent) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div className="relative" style={{ width, height }}>
      <motion.div
        className="absolute inset-0 cursor-pointer overflow-hidden rounded-2xl shadow-lg"
        style={{
          background: `linear-gradient(135deg, ${colorScheme.from}, ${colorScheme.to})`,
        }}
        animate={shapeVariants[currentContent.shape]}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* This empty div will handle the shape morphing */}
      </motion.div>
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="flex h-full w-full flex-col items-center justify-center p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="mb-4 text-center text-xl font-semibold text-white">
              {currentContent.title}
            </h3>
            <p className="text-center text-sm text-white">
              {currentContent.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-1">
        {contents.map((_, index) => (
          <motion.div
            key={index}
            className="h-1 w-3 rounded-full bg-white"
            initial={{ opacity: 0.3 }}
            animate={{ opacity: index === currentIndex ? 1 : 0.3 }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
      <button
        className={`absolute top-4 right-4 rounded-full p-2 text-white ${currentTheme !== "dark" ? "bg-gray-800 hover:bg-gray-500" : "bg-white/20 hover:bg-white/30"}`}
        onClick={(e) => {
          e.stopPropagation();
          setIsPlaying(!isPlaying);
        }}
      >
        {isPlaying ? <Pause size={14} /> : <Play size={14} />}
      </button>
      <button
        className={`absolute right-4 bottom-4 rounded-full p-2 text-white ${currentTheme !== "dark" ? "bg-gray-800 hover:bg-gray-500" : "bg-white/20 hover:bg-white/30"}`}
        onClick={(e) => {
          e.stopPropagation();
          nextShape();
        }}
      >
        <ArrowRight size={14} />
      </button>
    </div>
  );
};

export default MorphingCard;
