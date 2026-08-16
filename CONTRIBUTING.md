# Contributing to UI Beats

Thanks for taking the time to contribute. This document covers the practical
details; the same guide in prose lives at
[uibeats.com/docs/getting-started/contribute](https://uibeats.com/docs/getting-started/contribute).

## Getting set up

Requires **Node 20.9+** and Yarn 4 via Corepack.

```bash
git clone https://github.com/<you>/ui-beats.git
cd ui-beats
corepack enable
yarn install
yarn dev
```

Before pushing, run what CI runs. There are four required jobs, and this is all
of them:

```bash
yarn lint
yarn format:check   # `yarn format` fixes what this reports
yarn typecheck
yarn test
yarn build          # also regenerates public/r/ via registry:build
yarn test:e2e       # builds, serves, then runs chromium + mobile
```

A fifth job — **Motion frames** — diffs pixel baselines and only reproduces on
Linux. See [Motion baselines](#motion-baselines) for what that means for a new
component.

A `pre-commit` hook runs ESLint and Prettier over staged files.

## Adding a component

### Start with the scaffolder

```bash
yarn new:component --name flip-clock --category card
```

`--category` is one of `animation`, `background`, `button`, `card`, `component`,
`text`. Blocks are hand-authored — see [Adding a block](#adding-a-block).
`--title` overrides the title derived from the name (`flip-clock` → `Flip Clock`).

It writes four files, edits three registries, dates the component today, and
leaves a stub that compiles, renders and passes the suite — so your first run of
`yarn test` tells you about your component rather than about a wiring mistake.
Then replace the TODOs.

The rest of this section describes what it did, for when you want to know rather
than to be handed one.

### The seven places a component lives

| Path                                                     | What it is                                                                           |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `components/demo/<category>/<name>.tsx`                  | The component. This exact text is what the registry serves and what people install.  |
| `components/usage/<category>/<name>.usage.tsx`           | A runnable example: default export, **no props**. The docs preview and the Code tab. |
| `components/playground/<category>/<name>.playground.tsx` | Optional. The Motion Studio harness. Its existence alone turns the playground on.    |
| `content/docs/<category>/<name>.content.ts`              | Title, description, props table, guidance, attribution.                              |
| `content/docs/index.ts`                                  | One import plus one array entry, at the end of the component's own category.         |
| `components/website/component-preview.tsx`               | A `next/dynamic` entry keyed `"<category>/<name>"`.                                  |
| `components/website/playground-harnesses.tsx`            | The same, for the harness — only if you wrote one.                                   |

Miss the preview map and `tests/registry.test.ts` fails with
`component-preview.tsx is missing "<category>/<name>"`, rather than the component
quietly rendering "No preview available" in production.

### Everything else is generated

Do not hand-edit any of these. They all read the registry:

- the sidebar, the command menu and the `/docs/<category>` landing pages
- `/docs/<category>/<name>`, its markdown twin at `…/<name>.md`, and its OG card
- the sitemap, `/llms.txt` and `/llms-full.txt`
- the home page's featured component, picked by `addedAt`
- `public/r/<name>.json`, `registry.json`, `components.json` and
  `.well-known/mcp.json` — written by `yarn registry:build` (which `yarn build`
  runs) and gitignored, so there is nothing to commit
- the MCP server, which fetches the deployed `components.json` at runtime. A new
  component reaches `@uibeats/mcp` users on deploy; the package needs no release.

### The content file, field by field

```ts
import type { ComponentConfig } from "@/types/component-config.type";

const FlipClockContent: ComponentConfig = {
  name: "flip-clock",
  category: "card",
  title: "Flip Clock",
  description:
    "The FlipClock component counts down on split flaps that fall through the change, so a deadline reads as motion rather than as a number that quietly differs from the one before.",
  addedAt: "2026-08-15",
  whenToUse:
    "For a countdown a reader is meant to feel — a sale ending, a launch. Not for a clock that merely shows the time, where the flap animation draws the eye to something nobody needs to look at twice.",
  props: [
    {
      prop: "until",
      type: "Date",
      defaultValue: "-",
      description: "When the countdown reaches zero (required)",
    },
  ],
  credits: { name: "Your Name", url: "https://github.com/you" },
};

export default FlipClockContent;
```

- **`name`, `category`, filename.** All three have to agree — the docs route,
  the sidebar and the registry key off the triple, and a test enforces it.
- **`description`** is the meta description, the registry entry and the MCP
  catalogue text, not just page copy. Lead with what the component does.
- **`title`** carries an SEO budget: pages are titled
  `React <Title> <category noun>` and `tests/seo.test.ts` requires the result
  plus `" — UI Beats"` to fit in 60 characters, to be unique across the library,
  and not to repeat a word (`Flip Card` + `Card Component` must not become
  `Flip Card Card Component`).
- **`addedAt`** is `YYYY-MM-DD`. `isNew` is derived from it and expires on its
  own; a date in the future fails the suite.
- **`whenToUse`** is required in practice: over 80 characters, unique across the
  library, and not a restatement of the description. Say where the component
  fits _and_ where it does not — a page of one description plus a props table has
  no prose for a search engine to rank.
- **`props`** needs at least one row, and it is also where the playground gets
  its controls, so the names matter (see below). Sub-component props are rows
  named `"PricingTier: featured"`.
- **`credits`** is required for anything new — `tests/registry.test.ts` holds a
  closed list of five grandfathered components and fails on any other entry
  without it. The URL must be `https://`. If a model wrote the component, use
  `kind: "tool"`; crediting one as a person makes the page copy and the
  schema.org author type both wrong.
- **`fullBleedPreview`** renders the preview edge to edge. For a background that
  genuinely fills its frame, not for every component in the `background`
  category.
- **`extraInstallation`** appends steps after the standard copy-the-code ones.
- **`playground`** holds only what cannot be derived: `childrenSource`,
  `fixedSource`, `ranges`, `defaults`, `exclude`, `tag`.

### The playground harness

A harness renders the real component with the panel's `values` merged in. It is
optional — no file, no playground — but if you write one, two rules apply:

- **Controls come from the props table.** `lib/playground.ts` infers a control
  from each prop's name and type, so `duration` gets seconds and `opacity` gets
  0–1. Where the guess is wrong, override it under `playground.ranges` rather
  than renaming the prop. Types containing `=>`, `RefObject`, `[]` or
  `ReactNode` produce no control at all; pass those from the harness and show
  them in the snippet via `playground.fixedSource`.
- **The studio and the docs page must show the same demo.**
  `tests/playground-parity.test.ts` compares the visible copy in the two files:
  any prose of five characters or more in the usage file has to appear in the
  harness or in the shared `components/playground/demo-content.tsx`. Where they
  genuinely cannot agree — the docs demo cycles a prop the studio gives a control
  for — add an entry to `EXCEPTIONS` in that test with a reason.

### Motion baselines

`tests/visual/frames.spec.ts` freezes the clock and screenshots every component
at 0 ms, 300 ms and 1200 ms, so a regression in the middle of a transition fails
a PR instead of shipping. Baselines are platform-specific and only the Linux set
is committed:

- Locally, `yarn test:visual` writes a **darwin** set on its first run. It is
  gitignored — it is yours, for iterating.
- On CI, the **Motion frames** job runs against
  `tests/visual/__screenshots__/linux/`. A new component has no baseline there,
  so the job writes three PNGs and fails. Download the `visual-baselines`
  artifact from that run, commit
  `tests/visual/__screenshots__/linux/<name>-{0,300,1200}ms.png`, and push. The
  second run compares against them.

Look at the three frames before committing them. Frame 0 is where a broken
initial state shows up — a component already settled in frame 0 has lost its
entrance animation, and no later frame can tell you that.

## Adding a block

A block is a whole section — a hero, a pricing table — rather than a primitive.
It has no scaffolder and three differences from a component:

- It installs to `components/blocks/` as `registry:block`, not to
  `components/ui/`.
- It may import other UI Beats components from
  `@/components/demo/<category>/<name>`, and those become registry dependencies:
  installing the block installs its parts. The build fails if a block imports
  something the registry does not document.
- It may skip the reduced-motion guard **only** if it delegates every moving part
  to components that have one. A block that animates something itself is held to
  the same rule as everything else.

Blocks have no playground harness.

## Component guidelines

- **Type every prop.** `any` is a lint error, and so is a non-null assertion
  (`!`) outside `tests/`.
- **Keep dependencies minimal.** Whatever your component imports becomes a
  dependency for everyone who installs it, derived straight from the import
  statements. `motion` is fine; a new charting library is not.
- **Use the design tokens** (`bg-background`, `text-muted-foreground`, `border`)
  rather than hardcoded colours, so the component works in both themes — and in
  the themes of the projects it gets installed into, which is the harder half.
  A colour shadcn does not define has to be declared in `config/tokens.ts` so
  the registry can ship it in `cssVars`; the build fails on a `var(--whatever)`
  that nothing defines, because that renders correctly here and breaks on
  install.
- **Never call `Math.random()` or `Date.now()` during render.** They differ
  between the server and the browser and cause hydration mismatches. Use
  `useId()` for stable variation.
- **Format dates with an explicit locale and `timeZone`.** Same reason.
- **Honour `prefers-reduced-motion`.** Not only for loops — for anything that
  moves. `tests/reduced-motion.test.ts` fails the build if a component does not
  consult the preference, consults it and ignores the answer, or uses
  `useReducedMotion` without a `"use client"` directive. A `motion-reduce:` class
  or a `prefers-reduced-motion` media query counts.

  What to do with it is a judgement. An entrance should be settled from the
  first frame rather than merely instant, or the content sits invisible until
  it scrolls into view. Something the user explicitly starts may still animate.
  Something that withholds content — a typewriter — should show all of it.

  `tests/visual/settle.spec.ts` then checks that the component is actually
  visible both ways, because a reduced-motion branch that never reaches its
  settled state leaves real content at `opacity: 0`.

- **Give interactive elements accessible names** and a visible focus style.

## Commit messages

[Conventional Commits](https://www.conventionalcommits.org/):

```
feat(card): add tilt card
fix(sidebar): correct collapsed-state width
docs(readme): document the registry build
chore(deps): bump motion to 13.1
```

## Pull requests

- One component, or one logical change, per PR.
- Include a screenshot or short screen recording for anything visual.
- Explain _why_, not just what — the diff already says what.
- CI must be green, Motion frames included. For a new component that means the
  baseline commit described above.

Contributors are credited on their component's docs page via the `credits`
field. Add yours in the same PR.

## Reporting bugs

Open an issue with the [bug report template](.github/ISSUE_TEMPLATE/bug_report.md).
Include the component, your Next/React/Tailwind versions, and a reproduction if
you can.

For security issues, follow [SECURITY.md](SECURITY.md) instead — please don't
open a public issue.
