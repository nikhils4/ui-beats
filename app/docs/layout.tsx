"use client";
import { ReactNode } from "react";
import { SideNav } from "@/components/website/side-nav";
import { Bug, Edit3 } from "lucide-react";
import { motion } from "framer-motion";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <motion.div
      className="flex flex-col min-h-screen md:flex-row"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.aside variants={itemVariants} className="hidden md:block w-64 px-8 py-8 overflow-y-auto">
        <SideNav />
      </motion.aside>
      <motion.div variants={itemVariants} className="flex flex-col flex-grow md:flex-row">
        <motion.main variants={contentVariants} className="flex-grow p-4 md:p-6 lg:p-8 overflow-x-auto">
          <motion.div variants={contentVariants} className="max-w-full md:max-w-3xl lg:max-w-4xl xl:max-w-4xl mx-auto">
            {children}
          </motion.div>
        </motion.main>
        <motion.div variants={itemVariants} className="hidden xl:block w-64 px-8 py-8">
          <div className="space-y-2">
            <ul className="m-0 list-none">
              <motion.li
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-0 pt-2"
              >
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                  href="https://github.com/nikhils4/ui-beats/issues/new?assignees=&labels=&projects=&template=bug_report.md&title="
                >
                  <Bug className="h-4 w-4 mr-2" />
                  Report an issue
                </a>
              </motion.li>
              <motion.li
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-0 pt-2"
              >
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                  href="https://github.com/nikhils4/ui-beats/issues/new?assignees=&labels=&projects=&template=feature_request.md&title="
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  Request a feature
                </a>
              </motion.li>
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
