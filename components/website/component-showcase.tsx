"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowUpRight,
  CreditCard,
  GitPullRequest,
  Home,
  Layers,
  Search,
  Settings,
  Star,
} from "lucide-react";
import { AnimatedList } from "@/components/demo/animation/animated-list";
import { AnimatedBeam } from "@/components/demo/background/animated-beam";
import { Meteors } from "@/components/demo/background/meteors";
import { OrbitingElements } from "@/components/demo/background/orbiting-elements";
import { RetroGrid } from "@/components/demo/background/retro-grid";
import { SparklingGrid } from "@/components/demo/background/sparkling-grid";
import { LoadingButton } from "@/components/demo/button/loading-button";
import { MagneticButton } from "@/components/demo/button/magnetic-button";
import { RainbowButton } from "@/components/demo/button/rainbow-button";
import { RippleButton } from "@/components/demo/button/ripple-button";
import { ShimmerButton } from "@/components/demo/button/shimmer-button";
import { SubscribeButton } from "@/components/demo/button/subscribe-button";
import { AvatarStack } from "@/components/demo/component/avatar-stack";
import { CardStack } from "@/components/demo/card/card-stack";
import { ComparisonSlider } from "@/components/demo/component/comparison-slider";
import { ExpandableCard } from "@/components/demo/card/expandable-card";
import { Terminal } from "@/components/demo/component/terminal";
import FlipCard from "@/components/demo/card/flip-card";
import GlowingCard from "@/components/demo/card/glowing-card";
import { TiltCard } from "@/components/demo/card/tilt-card";
import { BorderBeam } from "@/components/demo/component/border-beam";
import { Dock, DockItem } from "@/components/demo/component/dock";
import { LiquidTabs } from "@/components/demo/component/liquid-tabs";
import { ScratchToReveal } from "@/components/demo/component/scratch-to-reveal";
import { ProgressRing } from "@/components/demo/component/progress-ring";
import { GradientText } from "@/components/demo/text/gradient-text";
import GravityTextSwap from "@/components/demo/text/gravity-text-swap";
import { NumberTicker } from "@/components/demo/text/number-ticker";
import { SplitFlap } from "@/components/demo/text/split-flap";
import { TextScramble } from "@/components/demo/text/text-scramble";
import { TextShine } from "@/components/demo/text/text-shine";
import TextWriter from "@/components/demo/text/text-writer";
import GradientFlow from "@/components/demo/background/gradient-flow";
import { InView } from "@/components/website/in-view";
import { cn } from "@/lib/utils";

/**
 * Live component showcase.
 *
 * A component library should demonstrate, not describe. Instead of a row of
 * equal-sized cards holding an icon and a sentence, each tile here runs the
 * real component at a size that suits it, in an asymmetric grid.
 */

interface TileProps {
  href: string;
  label: string;
  className?: string;
  /** Skip the inner padding for components that should reach the edges. */
  bleed?: boolean;
  /**
   * The demo answers the pointer, so only its label links away.
   *
   * The tiles used to be one big `<Link>` wrapped around the demo, which put
   * the dock's buttons and the magnetic button *inside* an anchor. That is
   * invalid markup, and it meant every attempt to play with a demo navigated
   * away from the page instead.
   */
  interactive?: boolean;
  children: ReactNode;
}

function Tile({
  href,
  label,
  className,
  bleed = false,
  interactive = false,
  children,
}: TileProps) {
  return (
    <div
      className={cn(
        "group relative isolate overflow-hidden rounded-2xl bg-muted/30 ring-1 ring-border/60 transition-all",
        "hover:bg-muted/50 hover:ring-brand/30",
        className,
      )}
    >
      <InView
        className={cn(
          "flex size-full items-center justify-center",
          !bleed && "p-6",
        )}
      >
        {children}
      </InView>

      {/* Label sits over the demo rather than in a separate header strip, so
          the component itself stays the focus. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-center justify-between bg-gradient-to-t from-background/90 to-transparent px-4 pt-8 pb-3 text-xs font-medium">
        {interactive ? (
          <Link
            href={href}
            className="pointer-events-auto text-foreground/70 transition-colors hover:text-foreground"
          >
            {label}
          </Link>
        ) : (
          <span className="text-foreground/70 transition-colors group-hover:text-foreground">
            {label}
          </span>
        )}
        <ArrowUpRight className="size-3.5 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
      </div>

      {/* Non-interactive demos get the whole tile as one link. */}
      {interactive ? null : (
        <Link
          href={href}
          aria-label={label}
          className="absolute inset-0 z-30"
        />
      )}
    </div>
  );
}

/**
 * Animated Beam needs refs to real nodes, so its tile gets a small component
 * of its own rather than being expressible inline like the others.
 */
function BeamDiagram() {
  const container = useRef<HTMLDivElement>(null);
  const left = useRef<HTMLDivElement>(null);
  const centre = useRef<HTMLDivElement>(null);
  const right = useRef<HTMLDivElement>(null);

  const node =
    "z-10 flex size-10 items-center justify-center rounded-full border bg-card shadow-subtle";

  return (
    <div
      ref={container}
      className="relative flex w-full max-w-sm items-center justify-between px-2"
    >
      <div ref={left} className={node}>
        <Layers className="size-4 text-muted-foreground" />
      </div>
      <div ref={centre} className={cn(node, "border-brand/40")}>
        <Star className="size-4 text-brand" />
      </div>
      <div ref={right} className={node}>
        <CreditCard className="size-4 text-muted-foreground" />
      </div>

      <AnimatedBeam
        containerRef={container}
        fromRef={left}
        toRef={centre}
        curvature={-34}
        duration={3}
      />
      <AnimatedBeam
        containerRef={container}
        fromRef={centre}
        toRef={right}
        curvature={-34}
        duration={3}
        delay={0.9}
      />
    </div>
  );
}

const BOARD = ["NOW BOARDING", "ON TIME", "UI BEATS"];

/** The board earns its place by changing; a word that lands once is a JPEG. */
function FlapBoard() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setIndex((current) => (current + 1) % BOARD.length),
      3600,
    );
    return () => clearInterval(timer);
  }, []);

  return <SplitFlap text={BOARD[index] ?? ""} className="text-sm sm:text-lg" />;
}

const QUOTES = [
  {
    quote: "Dropped it in on Friday, shipped the redesign on Monday.",
    who: "Ava Chen",
  },
  {
    quote: "The only library where I did not delete half the props.",
    who: "Marcus Hale",
  },
  {
    quote: "It reads like something a person wrote, because it is.",
    who: "Priya Nair",
  },
];

const FEED = [
  {
    icon: Star,
    title: "New star on ui-beats",
    meta: "just now",
    tone: "text-amber-500",
  },
  {
    icon: CreditCard,
    title: "Payment received",
    meta: "1m ago",
    tone: "text-emerald-500",
  },
  {
    icon: GitPullRequest,
    title: "PR #218 ready",
    meta: "4m ago",
    tone: "text-sky-500",
  },
];

const TABS = [
  { label: "All", value: "all" },
  { label: "New", value: "new" },
  { label: "Text", value: "text" },
];

const DOCK_ITEMS = [
  { label: "Home", icon: Home },
  { label: "Search", icon: Search },
  { label: "Projects", icon: Layers },
  { label: "Settings", icon: Settings },
];

const TEAM = [
  { name: "Ava Chen" },
  { name: "Marcus Hale" },
  { name: "Priya Nair" },
  { name: "Diego Ramos" },
  { name: "Yuki Tanaka" },
  { name: "Sam Okafor" },
];

/** Stands in for the request the Loading Button would normally be awaiting. */
const wait = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

/* -- the newest four --------------------------------------------------- */

const SESSION = [
  { kind: "command" as const, text: "npx shadcn add terminal" },
  { kind: "output" as const, text: "Fetching registry..." },
  { kind: "output" as const, text: "Installing motion" },
  { kind: "output" as const, text: "Writing ui/terminal.tsx" },
  { kind: "success" as const, text: "Done. Yours to edit." },
];

const CHANGELOG = [
  {
    id: "terminal",
    meta: "New",
    title: "Terminal",
    summary: "Replays an install, one line at a time",
    detail:
      "Only the commands type. The pause sits in front of each output line, where the work would have happened.",
  },
  {
    id: "compare",
    meta: "New",
    title: "Comparison Slider",
    summary: "Drag one layer across another",
    detail:
      "The top layer is clipped rather than resized, so neither side reflows as the divider travels over it.",
  },
  {
    id: "rainbow",
    meta: "New",
    title: "Rainbow Button",
    summary: "Colour that travels around the edge",
    detail:
      "The palette is your own chart tokens, so it arrives wearing your colours instead of five that belong to us.",
  },
];

/**
 * The two sides of the comparison tile.
 *
 * They differ in colour, not in copy, with their labels in opposite corners:
 * the same sentence in the same place on both would simply be cut in half by
 * the divider.
 */
function CompareBefore() {
  return (
    <div className="flex size-full flex-col justify-between bg-muted p-4">
      <span className="self-start rounded-full border bg-background/90 px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase">
        Before
      </span>
      <div className="space-y-2 pb-6">
        {/* Both bars run past the halfway mark so the divider always cuts
            each of them, wherever the reader parks it. */}
        <div className="h-2 w-4/5 rounded-full bg-foreground/25" />
        <div className="h-2 w-3/5 rounded-full bg-foreground/15" />
      </div>
    </div>
  );
}

function CompareAfter() {
  return (
    <div className="flex size-full flex-col justify-between bg-gradient-to-br from-brand/35 via-brand/10 to-transparent p-4">
      <span className="self-end rounded-full border bg-background/90 px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase">
        After
      </span>
      <div className="space-y-2 pb-6">
        {/* Same widths as the Before panel: a mismatch would show as two
            different bars either side of the divider rather than one bar
            changing colour across it. */}
        <div className="h-2 w-4/5 rounded-full bg-brand/80" />
        <div className="h-2 w-3/5 rounded-full bg-brand/50" />
      </div>
    </div>
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
            <p className="mt-3 max-w-md text-sm text-muted-foreground">
              Everything below is the real component, running. Drag the deck,
              scratch the card, press the button.
            </p>
          </div>
          <Link
            href="/docs/getting-started/introduction"
            className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            All {total} components
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* `grid-flow-dense` backfills the gaps that row-spanning tiles leave
            behind at the narrower breakpoints.

            What it cannot backfill is the end. Dense flow fills holes *before*
            the last item, so a two-row tile near the bottom leaves its second
            row half empty and the section trails off into background instead
            of ending on a line. The totals have to come out even by hand: at
            six columns every row needs three two-column tiles, so the spans
            must sum to a multiple of six with the row-spanning tiles paired
            off. Adding a tile means checking both that and the four-column
            case, where the same tiles pack differently. */}
        <div className="mt-12 grid grid-flow-dense auto-rows-[11rem] grid-cols-1 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          <Tile
            href="/docs/background/retro-grid"
            label="Retro Grid"
            bleed
            className="sm:col-span-4 sm:row-span-2 lg:col-span-4"
          >
            <div className="relative size-full overflow-hidden bg-background">
              {/* Taller than the docs preview: this tile is two rows deep, and
                  a grid filling only the bottom 70% leaves a band of dead
                  black across the top of the largest tile on the page. */}
              <RetroGrid
                className="text-brand/45"
                cellSize={46}
                duration={2.2}
                height={0.92}
              />
              <div className="relative z-10 flex size-full items-center justify-center pb-6">
                <span className="bg-gradient-to-b from-foreground to-foreground/40 bg-clip-text text-4xl font-bold tracking-tighter text-transparent">
                  Ship it
                </span>
              </div>
            </div>
          </Tile>

          <Tile
            href="/docs/text/split-flap"
            label="Split Flap"
            className="sm:col-span-2 lg:col-span-2"
          >
            <FlapBoard />
          </Tile>

          <Tile
            href="/docs/component/border-beam"
            label="Border Beam"
            className="sm:col-span-2 lg:col-span-2"
          >
            <BorderBeam className="w-full max-w-[15rem]" duration={5} arc={80}>
              <div className="p-4">
                <p className="text-sm font-semibold">Pro plan</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  A light that traces the exact border.
                </p>
              </div>
            </BorderBeam>
          </Tile>

          {/*
            The newest four, placed here rather than appended to the end.
            A showcase that files what just shipped below twenty older tiles is
            an archive, not a shop window — and these are the four that earn a
            slot on their own merits rather than on being recent. Terminal and
            Comparison Slider do something no other tile does; Expandable Card
            is the only interaction here that rearranges the layout; Rainbow
            Button is simply the best-looking button in the library.
          */}
          {/* Two rows rather than one wide row: a terminal centred in a tile
              four columns across is a small box in a large empty field, and
              the height is what makes it read as a window. */}
          <Tile
            href="/docs/component/terminal"
            label="Terminal"
            className="sm:col-span-2 sm:row-span-2 lg:col-span-2"
          >
            <Terminal
              lines={SESSION}
              typingSpeed={0.045}
              lineDelay={0.4}
              loopDelay={2.5}
              title="~/my-app"
            />
          </Tile>

          <Tile
            href="/docs/component/comparison-slider"
            label="Comparison Slider"
            interactive
            bleed
            className="sm:col-span-2 sm:row-span-2 lg:col-span-2"
          >
            <ComparisonSlider
              before={<CompareBefore />}
              after={<CompareAfter />}
              className="size-full"
            />
          </Tile>

          <Tile
            href="/docs/card/expandable-card"
            label="Expandable Card"
            interactive
            className="sm:col-span-2 sm:row-span-2 lg:col-span-2"
          >
            <ExpandableCard items={CHANGELOG} duration={0.3} />
          </Tile>

          <Tile
            href="/docs/button/rainbow-button"
            label="Rainbow Button"
            interactive
            className="sm:col-span-2 lg:col-span-2"
          >
            <RainbowButton speed={3.5}>Get started</RainbowButton>
          </Tile>

          <Tile
            href="/docs/background/meteors"
            label="Meteors"
            bleed
            className="sm:col-span-2 sm:row-span-2 lg:col-span-2"
          >
            <div className="relative size-full overflow-hidden bg-neutral-950">
              <Meteors count={18} color="#c4b5fd" trailLength={70} />
              <div className="relative z-10 flex size-full items-center justify-center pb-6">
                <span className="text-2xl font-bold tracking-tighter text-white">
                  Night shift
                </span>
              </div>
            </div>
          </Tile>

          <Tile
            href="/docs/card/card-stack"
            label="Card Stack"
            interactive
            className="sm:col-span-2 sm:row-span-2 lg:col-span-2"
          >
            <CardStack autoplay={3600} className="h-32 w-full max-w-[15rem]">
              {QUOTES.map(({ quote, who }) => (
                <div key={who} className="flex h-full flex-col justify-between">
                  <p className="text-xs leading-relaxed text-balance">
                    “{quote}”
                  </p>
                  <p className="text-xs font-medium text-muted-foreground">
                    {who}
                  </p>
                </div>
              ))}
            </CardStack>
          </Tile>

          <Tile
            href="/docs/animation/animated-list"
            label="Animated List"
            className="sm:col-span-2 sm:row-span-2 lg:col-span-2"
          >
            <AnimatedList delay={1500} max={3} className="max-w-[15rem]">
              {FEED.map(({ icon: Icon, title, meta, tone }) => (
                <div
                  key={title}
                  className="flex items-center gap-2.5 rounded-xl border bg-card p-2.5 shadow-subtle"
                >
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <Icon className={cn("size-3.5", tone)} />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium">{title}</p>
                    <p className="text-[11px] text-muted-foreground">{meta}</p>
                  </div>
                </div>
              ))}
            </AnimatedList>
          </Tile>

          <Tile
            href="/docs/component/scratch-to-reveal"
            label="Scratch to Reveal"
            interactive
            className="sm:col-span-2 sm:row-span-2 lg:col-span-2"
          >
            <ScratchToReveal
              width={228}
              height={132}
              brushSize={18}
              threshold={0.5}
              label="Scratch me"
            >
              <div className="text-center">
                <p className="font-mono text-lg font-bold text-brand">
                  BEATS-30
                </p>
                <p className="text-[11px] text-muted-foreground">30% off</p>
              </div>
            </ScratchToReveal>
          </Tile>

          <Tile
            href="/docs/component/liquid-tabs"
            label="Liquid Tabs"
            interactive
            className="sm:col-span-2 lg:col-span-2"
          >
            <LiquidTabs items={TABS} />
          </Tile>

          <Tile
            href="/docs/button/ripple-button"
            label="Ripple Button"
            interactive
            className="sm:col-span-2 lg:col-span-2"
          >
            <RippleButton>Press anywhere</RippleButton>
          </Tile>

          <Tile
            href="/docs/button/shimmer-button"
            label="Shimmer Button"
            interactive
            className="sm:col-span-2 lg:col-span-2"
          >
            <ShimmerButton shimmerWidth={35}>Get started</ShimmerButton>
          </Tile>

          <Tile
            href="/docs/button/loading-button"
            label="Loading Button"
            interactive
            className="sm:col-span-2 lg:col-span-2"
          >
            <LoadingButton
              onAction={() => wait(1400)}
              loadingText="Publishing"
              successText="Published"
            >
              Publish changes
            </LoadingButton>
          </Tile>

          <Tile
            href="/docs/component/avatar-stack"
            label="Avatar Stack"
            interactive
            className="sm:col-span-2 lg:col-span-2"
          >
            <AvatarStack avatars={TEAM} max={4} size={44} />
          </Tile>

          <Tile
            href="/docs/component/dock"
            label="Dock"
            interactive
            className="sm:col-span-2 lg:col-span-2"
          >
            <Dock size={34} magnification={56} reach={100}>
              {DOCK_ITEMS.map(({ label, icon: Icon }) => (
                <DockItem key={label} label={label}>
                  <Icon className="size-1/2 text-muted-foreground" />
                </DockItem>
              ))}
            </Dock>
          </Tile>

          <Tile
            href="/docs/card/tilt-card"
            label="Tilt Card"
            interactive
            className="sm:col-span-2 sm:row-span-2 lg:col-span-2"
          >
            <TiltCard maxTilt={16} className="w-full max-w-[14rem]">
              <p className="text-sm font-semibold">Tilt me</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Follows your cursor in 3D.
              </p>
            </TiltCard>
          </Tile>

          <Tile
            href="/docs/background/sparkling-grid"
            label="Sparkling Grid"
            bleed
            className="sm:col-span-2 sm:row-span-2 lg:col-span-2"
          >
            {/* Brighter and denser than the docs preview: at a quarter of the
                width, the default settings sparkle so rarely that the tile
                reads as an empty dotted box. */}
            <div className="relative size-full text-brand/70">
              <SparklingGrid gridSize={18} sparkleFrequency={0.14} />
            </div>
          </Tile>

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

          <Tile
            href="/docs/text/text-scramble"
            label="Text Scramble"
            className="sm:col-span-2 lg:col-span-2"
          >
            <TextScramble text="DECODING" speed={45} className="text-lg" />
          </Tile>

          <Tile
            href="/docs/button/magnetic-button"
            label="Magnetic Button"
            interactive
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

          {/*
            The flagships that were missing. Flip Card and Animated Beam are
            two of the most-searched patterns in the library, and the showcase
            was selling neither.
          */}
          <Tile
            href="/docs/card/flip-card"
            label="Flip Card"
            interactive
            className="sm:col-span-2 sm:row-span-2 lg:col-span-2"
          >
            <FlipCard
              frontContent={{ title: "Discover", subtitle: "Hover to flip" }}
              backContent={{
                title: "UI Beats",
                description: "Own the code the moment you copy it.",
              }}
              width="100%"
              height="14rem"
            />
          </Tile>

          <Tile
            href="/docs/background/animated-beam"
            label="Animated Beam"
            className="sm:col-span-4 lg:col-span-4"
          >
            <BeamDiagram />
          </Tile>

          <Tile
            href="/docs/text/text-writer"
            label="Text Writer"
            className="sm:col-span-2 lg:col-span-2"
          >
            <TextWriter
              text="npm run ship"
              delay={0.09}
              loop
              eraseOnComplete
              cursorColor="var(--brand)"
              className="font-mono text-lg font-medium"
            />
          </Tile>

          <Tile
            href="/docs/background/orbiting-elements"
            label="Orbiting Elements"
            className="sm:col-span-2 lg:col-span-2"
          >
            <OrbitingElements radius={54} duration={14} showPath>
              {[Star, GitPullRequest, CreditCard].map((Icon, index) => (
                <div
                  key={index}
                  className="flex size-8 items-center justify-center rounded-full border bg-card shadow-subtle"
                >
                  <Icon className="size-3.5 text-brand" />
                </div>
              ))}
            </OrbitingElements>
          </Tile>

          {/*
            `interactive`, because the glow follows the pointer. Without it the
            tile lays a full-cover link over the demo at z-30, and that link
            swallows every pointer event the card needs to track: the component
            rendered, but the one thing it does never happened.
          */}
          {/*
            Two rows, like the other card tiles.
            A single 11rem row leaves about 128px inside the tile's padding, so
            a card had to shrink to 124px to fit and sat wedged against its own
            edges with the label strip crowding the bottom. There was also
            nowhere for the glow to fall off, which is the thing the tile is
            meant to sell.
          */}
          <Tile
            href="/docs/card/glowing-card"
            label="Glowing Card"
            interactive
            className="sm:col-span-2 sm:row-span-2 lg:col-span-2"
          >
            <GlowingCard width={236} height={224}>
              <div className="flex size-full flex-col justify-center p-5">
                <p className="text-sm font-semibold">Follow the pointer</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  The glow tracks your cursor.
                </p>
              </div>
            </GlowingCard>
          </Tile>

          <Tile
            href="/docs/text/gravity-text-swap"
            label="Gravity Text Swap"
            className="sm:col-span-2 lg:col-span-2"
          >
            <GravityTextSwap
              textArray={["faster", "smoother", "yours"]}
              duration={0.5}
              pauseDuration={1.8}
              className="text-2xl font-bold tracking-tight"
            />
          </Tile>

          <Tile
            href="/docs/button/subscribe-button"
            label="Subscribe Button"
            interactive
            className="sm:col-span-2 lg:col-span-2"
          >
            <SubscribeButton text="Subscribe" />
          </Tile>

          {/*
            These two close the grid, and that is most of why they are here.
            Glowing Card is two rows tall and lands in the last row of the six
            column layout, which left four cells of empty background below the
            tiles beside it — the section stopped rather than ended. Two
            single-row tiles fill exactly that gap, and at four columns they
            add one complete row, so neither breakpoint is left ragged.

            Anything added here has to stay one row tall and two columns wide
            for that to hold: see the packing note in the grid comment above.
          */}
          <Tile
            href="/docs/text/gradient-text"
            label="Gradient Text"
            className="sm:col-span-2 lg:col-span-2"
          >
            <GradientText
              text="Supercharge"
              duration={5}
              className="text-3xl font-bold tracking-tighter"
            />
          </Tile>

          <Tile
            href="/docs/component/progress-ring"
            label="Progress Ring"
            className="sm:col-span-2 lg:col-span-2"
          >
            <ProgressRing value={86} size={92} strokeWidth={8} duration={1.6} />
          </Tile>
        </div>
      </div>
    </section>
  );
}
