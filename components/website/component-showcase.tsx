"use client";

import Link from "next/link";
import { ArrowUpRight, Home, Layers, Search, Settings } from "lucide-react";
import { SparklingGrid } from "@/components/demo/background/sparkling-grid";
import { TextShine } from "@/components/demo/text/text-shine";
import { TextScramble } from "@/components/demo/text/text-scramble";
import { TiltCard } from "@/components/demo/card/tilt-card";
import { MagneticButton } from "@/components/demo/button/magnetic-button";
import { Dock, DockItem } from "@/components/demo/component/dock";
import { NumberTicker } from "@/components/demo/text/number-ticker";
import GradientFlow from "@/components/demo/background/gradient-flow";
import { cn } from "@/lib/utils";

/**
 * Live component showcase.
 *
 * A component library should demonstrate, not describe. Rather than a row of
 * equal-sized cards containing an icon and a sentence, each tile here runs the
 * real component at a size that suits it, in an asymmetric grid.
 */

interface TileProps {
  href: string;
  label: string;
  className?: string;
  /** Skip the inner padding for components that should reach the edges. */
  bleed?: boolean;
  children: React.ReactNode;
}

function Tile({ href, label, className, bleed = false, children }: TileProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative isolate overflow-hidden rounded-2xl bg-muted/30 ring-1 ring-border/60 transition-all",
        "hover:bg-muted/50 hover:ring-brand/30",
        className,
      )}
    >
      <div
        className={cn(
          "flex size-full items-center justify-center",
          !bleed && "p-6",
        )}
      >
        {children}
      </div>

      {/* Label sits over the demo rather than in a separate header strip, so
          the component itself stays the focus. */}
      <span className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-center justify-between bg-gradient-to-t from-background/90 to-transparent px-4 pt-8 pb-3 text-xs font-medium">
        <span className="text-foreground/70 transition-colors group-hover:text-foreground">
          {label}
        </span>
        <ArrowUpRight className="size-3.5 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
      </span>
    </Link>
  );
}

export function ComponentShowcase({ total }: { total: number }) {
  return (
    <section className="relative border-t border-border/60">
      <div className="mx-auto max-w-(--breakpoint-xl) px-4 py-24 md:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-brand uppercase">
              The library
            </p>
            <h2 className="mt-3 max-w-xl text-3xl font-bold tracking-tighter text-balance sm:text-4xl">
              Components that earn their place
            </h2>
          </div>
          <Link
            href="/docs/getting-started/introduction"
            className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            All {total} components
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="mt-12 grid auto-rows-[11rem] grid-cols-1 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          <Tile
            href="/docs/background/sparkling-grid"
            label="Sparkling Grid"
            bleed
            className="sm:col-span-4 sm:row-span-2 lg:col-span-4"
          >
            <div className="relative size-full">
              <SparklingGrid gridSize={26} sparkleFrequency={0.06} />
            </div>
          </Tile>

          <Tile
            href="/docs/button/magnetic-button"
            label="Magnetic Button"
            className="sm:col-span-2 lg:col-span-2"
          >
            <MagneticButton strength={16}>Hover me</MagneticButton>
          </Tile>

          <Tile
            href="/docs/text/text-shine"
            label="Text Shine"
            className="sm:col-span-2 lg:col-span-2"
          >
            <TextShine text="Shine on" shineColor="#c4b5fd" duration={4} />
          </Tile>

          <Tile
            href="/docs/card/tilt-card"
            label="Tilt Card"
            className="sm:col-span-2 sm:row-span-2 lg:col-span-2"
          >
            <TiltCard maxTilt={16} className="w-full max-w-[13rem]">
              <p className="text-sm font-semibold">Tilt me</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Follows your cursor in 3D.
              </p>
            </TiltCard>
          </Tile>

          <Tile
            href="/docs/text/text-scramble"
            label="Text Scramble"
            className="sm:col-span-2 lg:col-span-2"
          >
            <TextScramble text="DECODING" speed={45} className="text-lg" />
          </Tile>

          <Tile
            href="/docs/background/gradient-flow"
            label="Gradient Flow"
            bleed
            className="sm:col-span-2 lg:col-span-2"
          >
            <GradientFlow
              duration={14}
              colors={["#6366f1", "#a855f7", "#ec4899"]}
              fullWidth
              radialOverlay
              blurAmount="8px"
            >
              <span className="text-sm font-medium text-white">Flow</span>
            </GradientFlow>
          </Tile>

          <Tile
            href="/docs/component/dock"
            label="Dock"
            className="sm:col-span-2 lg:col-span-2"
          >
            <Dock size={34} magnification={56} reach={100}>
              {[
                { label: "Home", icon: Home },
                { label: "Search", icon: Search },
                { label: "Projects", icon: Layers },
                { label: "Settings", icon: Settings },
              ].map(({ label, icon: Icon }) => (
                <DockItem key={label} label={label}>
                  <Icon className="size-1/2 text-muted-foreground" />
                </DockItem>
              ))}
            </Dock>
          </Tile>

          {/* Eighth tile is what makes the grid tile cleanly: seven items with
              these spans leave a hole in the last row at the lg breakpoint. */}
          <Tile
            href="/docs/text/number-ticker"
            label="Number Ticker"
            className="sm:col-span-2 lg:col-span-2"
          >
            <div className="text-center">
              <NumberTicker value={12480} className="text-3xl font-bold" />
              <p className="mt-1 text-xs text-muted-foreground">Downloads</p>
            </div>
          </Tile>
        </div>
      </div>
    </section>
  );
}
