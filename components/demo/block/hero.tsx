"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Meteors } from "@/components/demo/background/meteors";
import { ShimmerButton } from "@/components/demo/button/shimmer-button";
import {
  AvatarStack,
  type AvatarStackItem,
} from "@/components/demo/component/avatar-stack";
import { cn } from "@/lib/utils";

interface HeroAction {
  label: string;
  href: string;
}

interface HeroProps {
  /** Small line above the headline, e.g. a release note or a category. */
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  primaryAction?: HeroAction;
  secondaryAction?: HeroAction;
  /** Faces for the social proof row. Omit it and the row is not rendered. */
  avatars?: AvatarStackItem[];
  /** The line beside those faces, e.g. "Joined by 2,400 teams". */
  proof?: string;
  /** Streaks behind the content. Set false for a plain surface. */
  showMeteors?: boolean;
  className?: string;
}

/**
 * A landing page hero, assembled from three components in this library.
 *
 * Installing it installs Meteors, Shimmer Button and Avatar Stack with it, so
 * the section arrives working rather than as a file full of imports you have
 * to go and satisfy one by one. Everything it renders is a prop, and the file
 * itself is yours the moment the CLI writes it, so the parts you want to
 * rearrange are ordinary JSX rather than configuration.
 *
 * Links are plain anchors on purpose. A block that reached for `next/link`
 * would only work in a Next.js project, and there is nothing else in here that
 * cares which framework is rendering it.
 */
export function Hero({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  avatars,
  proof,
  showMeteors = true,
  className = "",
}: HeroProps) {
  const prefersReducedMotion = useReducedMotion();

  const rise = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
      };

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-background px-6 py-24 sm:py-32",
        className,
      )}
    >
      {showMeteors ? (
        <Meteors count={16} color="#c4b5fd" trailLength={80} />
      ) : null}

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
        {eyebrow ? (
          <motion.p
            {...rise}
            transition={{ duration: 0.4 }}
            className="mb-5 rounded-full border border-border/70 bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur"
          >
            {eyebrow}
          </motion.p>
        ) : null}

        <motion.h1
          {...rise}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="text-4xl font-extrabold tracking-tighter text-balance sm:text-6xl"
        >
          {title}
        </motion.h1>

        {description ? (
          <motion.p
            {...rise}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-5 max-w-xl text-lg text-balance text-muted-foreground"
          >
            {description}
          </motion.p>
        ) : null}

        {primaryAction || secondaryAction ? (
          <motion.div
            {...rise}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="mt-9 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row"
          >
            {primaryAction ? (
              <a href={primaryAction.href} className="w-full sm:w-auto">
                <ShimmerButton className="w-full sm:w-auto">
                  {primaryAction.label}
                </ShimmerButton>
              </a>
            ) : null}
            {secondaryAction ? (
              <a
                href={secondaryAction.href}
                className="inline-flex w-full items-center justify-center rounded-full border border-border bg-card/60 px-6 py-2.5 text-sm font-medium backdrop-blur transition-colors hover:bg-accent sm:w-auto"
              >
                {secondaryAction.label}
              </a>
            ) : null}
          </motion.div>
        ) : null}

        {avatars?.length ? (
          <motion.div
            {...rise}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-10 flex items-center gap-3"
          >
            <AvatarStack avatars={avatars} max={5} size={34} />
            {proof ? (
              <span className="text-sm text-muted-foreground">{proof}</span>
            ) : null}
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}

export default Hero;
