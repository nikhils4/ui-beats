"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Footer = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

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
      className={`flex w-full items-center mt-14 text-sm transition-colors text-foreground/60 px-2 md:px-7 h-24 ${
        isHomePage ? "justify-center" : "justify-between"
      }`}
    >
      <div
        className={`flex justify-center md:justify-between w-full md:w-auto`}
      >
        <span>Crafted by&nbsp;</span>
        <a
          className="hover:text-foreground/80 underline"
          target="_blank"
          href="https://nikhils.ca"
        >
          nikhils4
        </a>
        <span>, for the web!</span>
      </div>
      {!isHomePage && (
        <Link
          href="/blogs"
          className="hover:text-foreground/80 underline hidden md:inline-block"
        >
          Read our blogs
        </Link>
      )}
    </motion.footer>
  );
};
