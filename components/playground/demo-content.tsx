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
 * page. It did not — the harnesses were generated with generic filler ("Copy
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
    title: "Payment received — $49.00",
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
