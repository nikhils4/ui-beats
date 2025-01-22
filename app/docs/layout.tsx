"use client";
import { ReactNode, useEffect } from "react";
import { SideNav } from "@/components/website/side-nav";
import { ArrowRight, BookOpen, Bug, Edit3, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { SidebarProvider } from "@/components/ui/sidebar";
import Link from "next/link";
import { ShowcaseCard } from "@/components/website/showcase-card";

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

  useEffect(() => {
    const hasShownToast = localStorage.getItem("supportToastShown");
    if (!hasShownToast) {
      const timer = setTimeout(() => {
        toast("Show your support for UI Beats", {
          description: "Keep building for good! ❤️",
          duration: 30000,
          action: {
            label: "Star on GitHub",
            onClick: () =>
              window.open("https://github.com/nikhils4/ui-beats", "_blank"),
          },
          onDismiss: () => {
            localStorage.setItem("supportToastShown", "true");
          },
          onAutoClose: () => {
            localStorage.setItem("supportToastShown", "true");
          },
        });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <SidebarProvider>
      <motion.div
        className="flex flex-col min-h-screen md:flex-row w-full md:w-auto overflow-x-hidden"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.aside variants={itemVariants}>
          <SideNav />
        </motion.aside>
        <motion.div
          variants={itemVariants}
          className="flex flex-col flex-grow md:flex-row"
        >
          <motion.main
            variants={contentVariants}
            className="flex-grow p-4 md:p-6 lg:p-8 overflow-y-auto"
          >
            <motion.div
              variants={contentVariants}
              className="max-w-full md:max-w-3xl lg:max-w-4xl xl:max-w-4xl mx-auto"
            >
              {children}
            </motion.div>
          </motion.main>
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="hidden xl:block w-80 px-8 fixed right-0 top-[25px] bottom-0 z-10"
        >
          <div className="space-y-2 mb-6">
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
              <motion.li
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-0 pt-2"
              >
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                  href="/blogs"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Blogs
                </Link>
              </motion.li>
            </ul>
          </div>
          <ShowcaseCard />
        </motion.div>
      </motion.div>
    </SidebarProvider>
  );
}
