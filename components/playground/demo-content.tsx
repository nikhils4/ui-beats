"use client";

import {
  Atom,
  Boxes,
  CreditCard,
  Cpu,
  GitPullRequest,
  Home,
  Layers,
  Mail,
  Search,
  Settings,
  Sparkles,
  Star,
  UserPlus,
} from "lucide-react";

/**
 * The content each playground harness renders.
 *
 * The rule: a component looks the same in the studio as it does on its docs
 * page. It did not: the harnesses were generated with generic filler ("Copy
 * the component / Own the code / Ship it") while the docs demo showed a
 * notification feed, a testimonial deck, a dock of real icons. Same component,
 * two unrelated experiences, and the studio was the one that looked unfinished.
 *
 * This module holds the data and the item markup from
 * `components/usage/<category>/<name>.usage.tsx`, so both surfaces render the
 * same thing. `tests/playground-parity.test.ts` fails if the two drift apart
 * again.
 */

/* -- animation/animated-list ------------------------------------------- */

export const EVENTS = [
  {
    icon: Star,
    title: "New star on ui-beats",
    meta: "just now",
    tone: "text-amber-500",
  },
  {
    icon: CreditCard,
    title: "Payment received · $49.00",
    meta: "1m ago",
    tone: "text-emerald-500",
  },
  {
    icon: UserPlus,
    title: "Priya joined your workspace",
    meta: "2m ago",
    tone: "text-brand",
  },
  {
    icon: GitPullRequest,
    title: "PR #218 ready for review",
    meta: "4m ago",
    tone: "text-sky-500",
  },
];

export function EventItems() {
  return (
    <>
      {EVENTS.map(({ icon: Icon, title, meta, tone }) => (
        <div
          key={title}
          className="flex items-center gap-3 rounded-xl border bg-card p-3 shadow-subtle"
        >
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
            <Icon className={`size-4 ${tone}`} />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{title}</p>
            <p className="text-xs text-muted-foreground">{meta}</p>
          </div>
        </div>
      ))}
    </>
  );
}

/* -- animation/stagger-list -------------------------------------------- */

export const STAGGER_LABELS = ["Design", "Build", "Animate", "Ship"];

export function StaggerItems() {
  return (
    <>
      {STAGGER_LABELS.map((label) => (
        <div
          key={label}
          className="rounded-lg border bg-card px-4 py-2 text-sm"
        >
          {label}
        </div>
      ))}
    </>
  );
}

/* -- background/orbiting-elements -------------------------------------- */

export function OrbitingCentre() {
  return (
    <div className="absolute flex size-16 items-center justify-center rounded-2xl border bg-card shadow-subtle">
      <Sparkles className="size-6 text-brand" />
    </div>
  );
}

export function OrbitingItems() {
  return (
    <>
      {[Atom, Cpu, Boxes].map((Icon, index) => (
        <div
          key={index}
          className="flex size-10 items-center justify-center rounded-full border bg-background shadow-subtle"
        >
          <Icon className="size-4 text-muted-foreground" />
        </div>
      ))}
    </>
  );
}

/* -- card/card-stack --------------------------------------------------- */

export const QUOTES = [
  {
    quote: "Dropped it in on a Friday and shipped the redesign on Monday.",
    name: "Ava Chen",
    role: "Design engineer",
  },
  {
    quote: "The only component library where I did not delete half the props.",
    name: "Marcus Hale",
    role: "Staff frontend",
  },
  {
    quote: "It reads like something a person wrote, because it is.",
    name: "Priya Nair",
    role: "Founder",
  },
];

export function QuoteCards() {
  return (
    <>
      {QUOTES.map(({ quote, name, role }) => (
        <div key={name} className="flex h-full flex-col justify-between">
          <p className="text-sm leading-relaxed text-balance">
            &ldquo;{quote}&rdquo;
          </p>
          <div>
            <p className="text-sm font-medium">{name}</p>
            <p className="text-xs text-muted-foreground">{role}</p>
          </div>
        </div>
      ))}
    </>
  );
}

/* -- component/dock ---------------------------------------------------- */

export const DOCK_ITEMS = [
  { label: "Home", icon: Home },
  { label: "Search", icon: Search },
  { label: "Projects", icon: Layers },
  { label: "Mail", icon: Mail },
  { label: "Settings", icon: Settings },
];

/* -- component/liquid-tabs --------------------------------------------- */

export const TABS = [
  { label: "Overview", value: "overview" },
  { label: "Analytics", value: "analytics" },
  { label: "Reports", value: "reports" },
  { label: "Settings", value: "settings" },
];

/* -- component/avatar-stack -------------------------------------------- */

export const TEAM = [
  { name: "Ava Chen" },
  { name: "Marcus Hale" },
  { name: "Priya Nair" },
  { name: "Diego Ramos" },
  { name: "Yuki Tanaka" },
  { name: "Noor Haddad" },
  { name: "Sam Okafor" },
];

/* -- component/bento-grid ---------------------------------------------- */

export const BENTO_CELLS = [
  {
    title: "Copy, paste, own it",
    body: "Every component lands in your repo as plain source you can edit.",
    colSpan: 2,
  },
  {
    title: "Motion included",
    body: "Animation is part of the component, not a wrapper bolted on later.",
    colSpan: 1,
  },
  {
    title: "Themed by default",
    body: "Colours come from your own tokens.",
    colSpan: 1,
  },
  {
    title: "Documented properly",
    body: "Every prop has a table, a playground, and a reason to exist.",
    colSpan: 2,
  },
];

/* -- component/scroll-progress ----------------------------------------- */

export const ARTICLE = [
  "Motion is a language, and most interfaces speak it badly.",
  "A transition that runs too long reads as lag. One that skips a frame reads as a bug.",
  "The fix is to move only what actually changed, and to move it the shortest distance that still explains itself.",
  "Everything else holds still, so the one thing that moved is the thing you notice.",
];

/* -- component/marquee ------------------------------------------------- */

export const LOGOS = [
  "Vercel",
  "Linear",
  "Stripe",
  "Figma",
  "Raycast",
  "Supabase",
];

export function LogoItems() {
  return (
    <>
      {LOGOS.map((name) => (
        <div
          key={name}
          className="mx-3 rounded-xl border bg-card px-6 py-3 text-sm font-semibold whitespace-nowrap"
        >
          {name}
        </div>
      ))}
    </>
  );
}

/* -- text/flip-words --------------------------------------------------- */

export const AUDIENCES = ["designers", "engineers", "founders", "small teams"];

/* -- card/expandable-card ---------------------------------------------- */

export const RELEASES = [
  {
    id: "registry",
    meta: "Distribution",
    title: "Install with one command",
    summary: "The CLI writes the source into your repo",
    detail:
      "Every component is published as a registry item, so the shadcn CLI drops the real source into your project along with the packages it needs. Nothing to pin, nothing to wrap.",
  },
  {
    id: "motion",
    meta: "Animation",
    title: "Motion is part of the component",
    summary: "Not a wrapper bolted on afterwards",
    detail:
      "The animation lives in the same file as the markup, which is why you can change it. A library that hides motion behind a prop can only ever give you the transitions it thought of first.",
  },
  {
    id: "themes",
    meta: "Theming",
    title: "Colours come from your tokens",
    summary: "Both themes, and the ones you define",
    detail:
      "Components read the design tokens your project already defines, so an install picks up your palette instead of ours. Anything outside that set ships with the component as a variable.",
  },
];

/* -- component/timeline ------------------------------------------------ */

export const MILESTONES = [
  {
    id: "scaffold",
    meta: "Step one",
    title: "Scaffold the component",
    body: "One command writes the four files and edits the three registries that have to know about it.",
  },
  {
    id: "build",
    meta: "Step two",
    title: "Write the animation",
    body: "Motion lives in the same file as the markup, so there is one place to change how it feels.",
  },
  {
    id: "document",
    meta: "Step three",
    title: "Fill in the props table",
    body: "The table is the source of truth: the playground controls are derived from it, not written twice.",
  },
  {
    id: "ship",
    meta: "Step four",
    title: "Open the pull request",
    body: "The suite checks the reduced-motion guard, the title budget and a pixel baseline before it merges.",
  },
];

/* -- component/terminal ------------------------------------------------ */

export const TERMINAL_SESSION = [
  { kind: "command" as const, text: "npx shadcn@latest add terminal.json" },
  { kind: "output" as const, text: "Checking registry..." },
  { kind: "output" as const, text: "Installing dependencies: motion" },
  { kind: "output" as const, text: "Writing components/ui/terminal.tsx" },
  { kind: "success" as const, text: "Done. One file, yours to edit." },
];

/* -- component/comparison-slider --------------------------------------- */

export function ComparisonBefore() {
  return (
    <div className="flex size-full flex-col justify-between bg-muted p-4">
      <span className="self-start rounded-full border bg-background/90 px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase">
        Before
      </span>
      <div className="space-y-2">
        <div className="h-2.5 w-2/3 rounded-full bg-foreground/25" />
        <div className="h-2.5 w-1/2 rounded-full bg-foreground/15" />
      </div>
    </div>
  );
}

export function ComparisonAfter() {
  return (
    <div className="flex size-full flex-col justify-between bg-gradient-to-br from-primary/35 via-primary/10 to-transparent p-4">
      <span className="self-end rounded-full border bg-background/90 px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase">
        After
      </span>
      <div className="space-y-2">
        <div className="h-2.5 w-2/3 rounded-full bg-primary/70" />
        <div className="h-2.5 w-1/2 rounded-full bg-primary/40" />
      </div>
    </div>
  );
}
