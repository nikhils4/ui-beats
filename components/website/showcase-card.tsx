"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export const ShowcaseCard = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full rounded-lg border bg-card/90 p-6 relative overflow-hidden group"
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-slate-100/20 via-blue-50/20 to-gray-100/20 dark:from-slate-800/20 dark:via-slate-700/20 dark:to-slate-800/20"
        style={{
          backgroundSize: "400% 400%",
          animation: "gradient 15s ease infinite",
        }}
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(148,163,184,0.05),rgba(255,255,255,0))] dark:bg-[radial-gradient(circle_at_50%_120%,rgba(51,65,85,0.05),rgba(0,0,0,0))]"
      />
      <style jsx global>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
      <div className="relative flex items-start space-x-4">
        <div className="flex-1 space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold leading-none tracking-tight">
              Share Your Website
            </h3>
            <p className="text-sm text-muted-foreground">
              Built something with UI Beats? We&apos;d love to feature your
              creation in our showcase.
            </p>
          </div>

          <Button
            onClick={() =>
              window.open("https://forms.gle/eVBGbBEyG1ELqDMv6", "_blank")
            }
            size="sm"
            className="w-full sm:w-auto hover:opacity-90 transition-all duration-300"
          >
            Submit Your Website
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
