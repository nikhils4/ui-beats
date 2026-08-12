"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GitHubIcon } from "@/components/icons";
import { CopyButton } from "@/components/website/copy-button";
import { siteConfig } from "@/lib/site";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] as const },
  },
};

interface HeroSectionProps {
  componentCount: number;
  latestComponent?: string;
  latestHref?: string;
}

export function HeroSection({
  componentCount,
  latestComponent,
  latestHref,
}: HeroSectionProps) {
  const installCommand = `npx shadcn@latest add ${siteConfig.url}/r/flip-card.json`;

  return (
    <section className="relative overflow-hidden">
      {/* Ambient background: a grid that fades out toward the edges, plus two
          slow-drifting colour washes. Purely decorative, so aria-hidden. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,black,transparent)] opacity-[0.35]" />
        <div className="absolute top-[-12rem] left-1/2 size-[38rem] -translate-x-1/2 animate-aurora rounded-full bg-brand/20 blur-[110px]" />
        <div className="absolute top-[-4rem] right-[8%] size-[24rem] animate-aurora rounded-full bg-accent-pink/15 blur-[100px] [animation-delay:-6s]" />
        <div className="absolute top-[4rem] left-[6%] size-[22rem] animate-aurora rounded-full bg-accent-cyan/15 blur-[100px] [animation-delay:-12s]" />
      </div>

      <motion.div
        className="relative mx-auto flex max-w-4xl flex-col items-center px-6 pt-24 pb-28 text-center md:pt-32"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {latestComponent && latestHref ? (
          <motion.div variants={itemVariants}>
            <Link
              href={latestHref}
              className="group inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 py-1 pr-3 pl-1 text-sm shadow-subtle backdrop-blur transition-colors hover:border-brand/40"
            >
              <span className="inline-flex items-center gap-1 rounded-full bg-brand px-2 py-0.5 text-[11px] font-semibold text-brand-foreground">
                <Sparkles className="size-3" />
                New
              </span>
              <span className="text-muted-foreground transition-colors group-hover:text-foreground">
                {latestComponent}
              </span>
              <ArrowRight className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        ) : null}

        {/*
          `leading-[0.95]` clipped the descenders on "g" and "y".
          With `background-clip: text` the glyphs are painted by the element's
          background, which only covers the padding box — so any part of a
          glyph sitting outside that box has nothing to paint it and simply
          vanishes. A line-height under 1 pushes descenders straight out.
          Fixed by giving the line room and a little padding to paint into.
        */}
        <motion.h1
          variants={itemVariants}
          className="mt-8 text-gradient pb-[0.12em] text-5xl leading-[1.06] font-extrabold tracking-tighter text-balance sm:text-6xl md:text-7xl"
        >
          Supercharge your UI
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-6 max-w-xl text-lg leading-relaxed text-balance text-muted-foreground"
        >
          {componentCount} animated React components built with TypeScript,
          Tailwind CSS and Motion. Install one with a single command, then make
          it yours.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-9 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row"
        >
          <Button
            size="lg"
            asChild
            className="w-full gap-2 shadow-brand sm:w-auto"
          >
            {/* This was `target="_blank"` on an internal route, which opened
                the docs in a new tab and dropped client-side navigation. */}
            <Link href="/docs/getting-started/introduction">
              Browse components
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="w-full gap-2 sm:w-auto"
          >
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon className="size-4" />
              Star on GitHub
            </a>
          </Button>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="group relative mt-10 w-full max-w-lg"
        >
          <div className="flex items-center gap-3 overflow-hidden rounded-xl border bg-card/70 py-3 pr-12 pl-4 text-left shadow-subtle backdrop-blur">
            <span aria-hidden="true" className="text-brand select-none">
              $
            </span>
            <code className="min-w-0 flex-1 truncate font-mono text-xs text-muted-foreground sm:text-sm">
              npx shadcn@latest add {siteConfig.url}/r/flip-card.json
            </code>
          </div>
          <CopyButton
            value={installCommand}
            label="Copy install command"
            className="top-1/2 right-2 -translate-y-1/2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
