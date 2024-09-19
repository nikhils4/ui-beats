"use client";
import { BellIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface SubscribeButtonProps {
  onClick?: () => void;
  text?: string;
  theme?: "light" | "dark";
  className?: string;
}

export const SubscribeButton: React.FC<SubscribeButtonProps> = ({
  onClick,
  text = "Subscribe",
  theme = "light",
  className = "",
}) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  const handleClick = () => {
    if (!isSubscribed) {
      setIsAnimating(true);
    }
    setIsSubscribed(!isSubscribed);
    if (onClick) {
      onClick();
    }
  };

  const createCircles = (count = 20) => {
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * 2 * Math.PI;
      const radius = Math.random() * 100 + 50;
      const endX = Math.cos(angle) * radius;
      const endY = Math.sin(angle) * radius;

      const shapes = ["circle", "star"];
      const randomShape = shapes[Math.floor(Math.random() * shapes.length)];

      return (
        <motion.div
          key={i}
          className={`absolute ${
            randomShape === "circle" ? "rounded-full" : ""
          }`}
          initial={{
            opacity: 0,
            scale: 0,
            x: "-50%",
            y: "-50%",
            left: "50%",
            top: "50%",
            rotate: 0,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, Math.random() * 0.5 + 0.7, 0],
            x: ["-50%", `calc(${endX}px - 50%)`],
            y: ["-50%", `calc(${endY}px - 50%)`],
            rotate: [0, Math.random() * 360],
          }}
          transition={{
            duration: 1,
            delay: Math.random() * 0.1,
            ease: "easeInOut",
          }}
          style={{
            width: `${Math.random() * 2 + 10}px`,
            height: `${Math.random() * 2 + 10}px`,
            backgroundColor: `hsl(${Math.random() * 360}, 100%, 60%)`,
            clipPath:
              randomShape === "star"
                ? "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)"
                : "",
            boxShadow: "0 0 10px rgba(255, 255, 255, 0.2)",
          }}
        />
      );
    });
  };

  const buttonBackgroundColor =
    theme === "light"
      ? isSubscribed
        ? isAnimating
          ? [
              "rgba(211,211,211,0.3)",
              "rgba(105,255,0,0.3)",
              "rgba(0,255,0,0.3)",
              "rgba(64,255,0,0.3)",
              "rgba(128,255,0,0.3)",
              "rgba(192,255,0,0.35)",
              "rgba(255,255,0,0.4)",
              "rgba(255,224,0,0.45)",
              "rgba(255,192,0,0.5)",
              "rgba(255,160,0,0.55)",
              "rgba(255,128,0,0.6)",
              "rgba(255,96,0,0.65)",
              "rgba(255,64,0,0.7)",
              "rgba(255,32,0,0.75)",
              "rgba(255,0,0,0.8)",
              "rgba(233,105,105,0.85)",
              "rgba(211,211,211,0.9)",
            ]
          : "rgba(211,211,211,1)"
        : "rgba(0,0,0,1)"
      : isSubscribed
      ? isAnimating
        ? [
            "rgba(50,50,50,0.3)",
            "rgba(0,150,0,0.3)",
            "rgba(0,200,0,0.3)",
            "rgba(0,250,0,0.3)",
            "rgba(50,250,0,0.3)",
            "rgba(100,250,0,0.35)",
            "rgba(150,250,0,0.4)",
            "rgba(200,250,0,0.45)",
            "rgba(250,250,0,0.5)",
            "rgba(250,200,0,0.55)",
            "rgba(250,150,0,0.6)",
            "rgba(250,100,0,0.65)",
            "rgba(250,50,0,0.7)",
            "rgba(250,0,0,0.75)",
            "rgba(200,0,0,0.8)",
            "rgba(150,0,0,0.85)",
            "rgba(50,50,50,0.9)",
          ]
        : "rgba(50,50,50,1)"
      : "rgba(200,200,200,1)";

  return (
    <motion.div className="relative w-fit">
      {isSubscribed ? createCircles() : null}
      <motion.button
        onClick={handleClick}
        layout
        animate={{
          backgroundColor: buttonBackgroundColor,
        }}
        transition={{
          backgroundColor: {
            duration: isAnimating ? 1.2 : 0.3,
            times: isAnimating
              ? [
                  0, 0.0625, 0.125, 0.1875, 0.25, 0.3125, 0.375, 0.4375, 0.5,
                  0.5625, 0.625, 0.6875, 0.75, 0.8125, 0.875, 0.9375, 1,
                ]
              : [0, 1],
          },
        }}
        className={`flex relative justify-center items-center ${
          theme === "light" ? "text-white" : "text-black"
        } px-10 py-2 rounded-full overflow-hidden ${className}`}
        style={{
          width: isSubscribed ? "170px" : "140px",
        }}
      >
        <AnimatePresence mode="wait">
          {isSubscribed ? (
            <motion.div
              key="subscribed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex items-center"
              style={{
                color:
                  theme === "light"
                    ? isSubscribed
                      ? "black"
                      : "white"
                    : isSubscribed
                    ? "white"
                    : "black",
              }}
            >
              <motion.div
                animate={{
                  rotate: [0, -15, 15, -15, 15, -15, 15, 0],
                  transition: { duration: 0.7, delay: 0.2 },
                }}
                style={{ transformOrigin: "top center" }}
              >
                <BellIcon className="w-4 h-4 mr-2" />
              </motion.div>
              Subscribed
            </motion.div>
          ) : (
            <motion.div
              key="subscribe"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {text}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
};
