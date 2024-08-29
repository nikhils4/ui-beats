"use client";
import { motion } from "framer-motion";

export const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.footer
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex justify-center mt-14 text-sm items-center transition-colors text-foreground/60 px-2 md:px-7 h-24"
    >
      Crafted by&nbsp;
      <a
        className="hover:text-foreground/80 underline"
        target="_blank"
        href="https://nikhils.ca"
      >
        nikhils4
      </a>
      , for the web!
    </motion.footer>
  );
};
