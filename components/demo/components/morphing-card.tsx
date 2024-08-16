import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Circle, Square, Hexagon } from "lucide-react";

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
}

const shapeVariants = {
  rectangle: { borderRadius: "16px" },
  circle: { borderRadius: "50%" },
  hexagon: { borderRadius: "40% 91% 24% 76% / 32% 32% 68% 68%" },
};

const MorphingCard: React.FC<MorphingCardProps> = ({
  width = "300px",
  height = "300px",
  contents,
  colorScheme = { from: "#4F46E5", to: "#7C3AED" },
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextShape = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % contents.length);
  };

  const currentContent = contents[currentIndex];

  return (
    <motion.div
      className="flex items-center justify-center cursor-pointer overflow-hidden shadow-lg"
      style={{
        width,
        height,
        background: `linear-gradient(135deg, ${colorScheme.from}, ${colorScheme.to})`,
      }}
      animate={shapeVariants[currentContent.shape]}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      onClick={nextShape}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="p-6 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold">{currentContent.title}</h3>
          {currentContent.shape === "rectangle" && (
            <Square className="w-6 h-6" />
          )}
          {currentContent.shape === "circle" && <Circle className="w-6 h-6" />}
          {currentContent.shape === "hexagon" && (
            <Hexagon className="w-6 h-6" />
          )}
        </div>
        <p className="text-sm mb-4">{currentContent.description}</p>
        <ArrowRight className="w-6 h-6" />
      </motion.div>
    </motion.div>
  );
};

export default MorphingCard;
