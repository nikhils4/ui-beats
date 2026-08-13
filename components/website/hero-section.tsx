"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GitHubIcon } from "@/components/icons";
import { CopyButton } from "@/components/website/copy-button";
import { BorderBeam } from "@/components/demo/component/border-beam";
import { Marquee } from "@/components/demo/component/marquee";
import { siteConfig } from "@/lib/site";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] as const },
  },
};

export interface HeroComponentLink {
  title: string;
  href: string;
}

interface HeroSectionProps {
  componentCount: number;
  latestComponent?: string;
  latestHref?: string;
  /** Every component, for the ticker along the bottom of the hero. */
  components: HeroComponentLink[];
}

export function HeroSection({
  componentCount,
  latestComponent,
  latestHref,
  components,
}: HeroSectionProps) {
  const installCommand = `npx shadcn@latest add ${siteConfig.url}/r/border-beam.json`;

  return (
    <section className="relative overflow-hidden">
      {/*
       * Ambient background, deliberately quieter than it was.
       *
       * This used to run three animated aurora blobs *and* a full Retro Grid
       * horizon behind the copy. The grid is the largest tile in the showcase
       * directly below, so the hero was paying for an expensive animation to
       * duplicate the section that follows it, and the headline had to compete
       * with all of it. Two soft washes and the masked grid leave the words as
       * the loudest thing on the screen; the Border Beam on the install line
       * is the one piece of motion that stays, because it points at the thing
       * people came to copy.
       */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_55%_45%_at_50%_35%,black,transparent)] opacity-[0.3]" />
        <div className="absolute top-[-14rem] left-1/2 size-[34rem] -translate-x-1/2 animate-aurora rounded-full bg-brand/15 blur-[120px]" />
        <div className="absolute top-[2rem] right-[10%] size-[20rem] animate-aurora rounded-full bg-accent-pink/10 blur-[110px] [animation-delay:-8s]" />
      </div>

      <motion.div
        className="relative mx-auto flex max-w-3xl flex-col items-center px-6 pt-20 pb-14 text-center md:pt-28"
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
          The headline now says what the thing is.
          "Supercharge your UI" is the brand line and it stays in the logo and
          the title tag, but as an <h1> it competed for a phrase nobody
          searches. This one leads with the words people actually type and
          states the differentiator in the same breath.

          `leading-[0.95]` clipped the descenders on "g" and "y": with
          `background-clip: text` the glyphs are painted by the element's
          background, which only covers the padding box, so any part of a glyph
          outside that box has nothing to paint it. Hence the room and padding.
        */}
        <motion.h1
          variants={itemVariants}
          className="mt-7 pb-[0.12em] text-5xl leading-[1.05] font-extrabold tracking-tighter text-balance sm:text-6xl"
        >
          Animated React components{" "}
          <span className="text-gradient">you own</span>
        </motion.h1>

        {/* One line. The hero was carrying a two-line paragraph, a three-item
            proof row and the ticker underneath it, which left five things
            competing under the headline. */}
        <motion.p
          variants={itemVariants}
          className="mt-5 max-w-md text-lg leading-relaxed text-balance text-muted-foreground"
        >
          {componentCount} components. Copy one in, then change whatever you
          like — it is your file now.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-8 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row"
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

        {/* The install command is the page's most important line, so it keeps
            the Border Beam: the component demonstrating itself on the one
            element everybody is meant to look at. */}
        <motion.div
          variants={itemVariants}
          className="relative mt-9 w-full max-w-xl"
        >
          <BorderBeam duration={7} arc={95} className="rounded-xl">
            <div className="flex items-center gap-3 overflow-hidden rounded-[inherit] py-3.5 pr-12 pl-4 text-left">
              <span aria-hidden="true" className="text-brand select-none">
                $
              </span>
              <code className="min-w-0 flex-1 truncate font-mono text-xs text-muted-foreground sm:text-sm">
                npx shadcn@latest add {siteConfig.url}/r/border-beam.json
              </code>
            </div>
          </BorderBeam>
          <CopyButton
            value={installCommand}
            label="Copy install command"
            className="top-1/2 right-2 z-20 -translate-y-1/2"
          />
        </motion.div>
      </motion.div>

      {/* Every component, ticking past. It shows the breadth of the library in
          one glance and puts a real link to each page at the top of the site. */}
      <div className="relative border-y border-border/60 bg-card/30 py-3 backdrop-blur">
        <Marquee speed={32} pauseOnHover fadeEdges>
          {components.map(({ title, href }) => (
            <Link
              key={href}
              href={href}
              className="mx-3 rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs whitespace-nowrap text-muted-foreground transition-colors hover:border-brand/40 hover:text-foreground"
            >
              {title}
            </Link>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
