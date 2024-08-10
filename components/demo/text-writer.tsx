"use client";
import React, { useEffect, useRef, useState } from "react";
import { Easing, motion } from "framer-motion";

interface TextWriterProps {
  text: string;
  delay?: number;
  className?: string;
  cursorColor?: string;
  cursorWidth?: string;
  cursorStyle?: string;
  eraseOnComplete?: boolean;
  eraseDelay?: number;
  loop?: boolean;
}

const TextWriter: React.FC<TextWriterProps> = ({
  text,
  delay = 0.05,
  className = "",
  cursorColor = "#000",
  cursorWidth = "2px",
  cursorStyle = "solid",
  eraseOnComplete = false,
  eraseDelay = 2000,
  loop = false,
}) => {
  const [displayText, setDisplayText] = useState("");
  const [isWriting, setIsWriting] = useState(true);
  const textRef = useRef<HTMLSpanElement>(null);
  const stepEasing: Easing = (t) => Math.floor(t * 2) / 2;

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let currentIndex = 0;

    const writeText = () => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex));
        currentIndex++;
        timeoutId = setTimeout(writeText, delay * 1000);
      } else {
        setIsWriting(false);
        if (eraseOnComplete || loop) {
          timeoutId = setTimeout(eraseText, eraseDelay);
        }
      }
    };

    const eraseText = () => {
      setIsWriting(true);
      if (currentIndex > 0) {
        currentIndex--;
        setDisplayText(text.slice(0, currentIndex));
        timeoutId = setTimeout(eraseText, delay * 1000);
      } else {
        if (loop) {
          currentIndex = 0;
          timeoutId = setTimeout(writeText, delay * 1000);
        } else {
          setIsWriting(false);
        }
      }
    };

    writeText();

    return () => clearTimeout(timeoutId);
  }, [text, delay, eraseOnComplete, eraseDelay, loop]);

  return (
    <span className={`inline-flex items-center ${className}`}>
      <span ref={textRef}>{displayText}</span>
      {isWriting && (
        <motion.span
          style={{
            width: cursorWidth,
            height: "1em",
            backgroundColor: cursorColor,
            display: "inline-block",
            borderStyle: cursorStyle,
            marginLeft: "1px",
          }}
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: stepEasing,
          }}
        />
      )}
    </span>
  );
};

export default TextWriter;
