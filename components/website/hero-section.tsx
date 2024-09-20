"use client";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div
      className="mt-16 flex flex-col md:mt-20 h-full"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="flex flex-col items-start gap-6 px-7 pb-8 text-center md:items-center md:px-10">
        <motion.div variants={itemVariants}>
          <a
            href="https://github.com/nikhils4/ui-beats"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="group relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-full bg-white/10 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium backdrop-blur-sm transition-all duration-300 hover:bg-white/20 dark:bg-black/20 dark:hover:bg-black/30 border-transparent hover:border-blue-300/70 dark:hover:border-blue-600/70 border">
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/10 to-purple-400/10 opacity-50 blur-sm transition-opacity"
                animate={{
                  background: [
                    "linear-gradient(to right, rgba(96, 165, 250, 0.1), rgba(192, 132, 252, 0.1))",
                    "linear-gradient(to right, rgba(192, 132, 252, 0.1), rgba(96, 165, 250, 0.1))",
                    "linear-gradient(to right, rgba(96, 165, 250, 0.1), rgba(192, 132, 252, 0.1))",
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
              ></motion.div>
              <span className="relative mr-1 sm:mr-2 text-blue-600 dark:text-blue-400 font-semibold">
                Last Update
              </span>
              <div
                data-orientation="vertical"
                role="none"
                className="relative shrink-0 bg-gray-400 dark:bg-gray-500 w-px mx-1 sm:mx-2 h-2 sm:h-3 self-center"
              ></div>
              <span className="relative text-gray-700 dark:text-gray-200 ml-1 sm:ml-2">
                Sep 18
              </span>
              <motion.div
                className="relative ml-1 sm:ml-2 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </a>
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="relative flex flex-col gap-10 md:items-center lg:flex-row md:mt-6"
        >
          <h1 className="text-black dark:text-white relative mx-0 max-w-[43.5rem] pt-5 md:mx-auto md:px-4 md:py-2 text-left tracking-tighter text-balance md:text-center font-semibold md:text-7xl lg:text-7xl sm:text-7xl text-5xl">
            Supercharge your UI
          </h1>
        </motion.div>
        <motion.p
          variants={itemVariants}
          className="max-w-xl mt-6 mb-6 text-balance text-left text-base tracking-tight text-black dark:font-medium dark:text-white md:text-center md:text-lg "
        >
          Implement <strong>responsive design patterns</strong> and create a <strong>seamless user
          experience</strong> using our collection of <strong>animated react components</strong>.
        </motion.p>
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row"
        >
          <Link
            rel="noopener noreferrer"
            href="/docs/getting-started"
            target="_blank"
          >
            <Button className="w-full">
              Browse Components <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <a
            href="https://github.com/nikhils4/ui-beats"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Button variant="outline" className="mt-7 md:mt-0 md:ml-5 w-full">
              Contribute <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
};
