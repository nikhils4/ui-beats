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

Before pushing, run what CI runs:

```bash
yarn lint
yarn typecheck
yarn test
yarn build
```

A `pre-commit` hook runs ESLint and Prettier over staged files.

## Adding a component

Start here:

```bash
yarn new:component --name flip-clock --category component
```

It writes all four files, registers them in the three maps that need to know,
and leaves a stub that compiles, renders and passes the suite — so your first
run of `yarn test` tells you about your component rather than about a wiring
mistake. Then replace the TODOs.

The rest of this section describes what those files are, for when you want to
know rather than to be handed one. A component is four files, plus one line in
the preview map.

### 1. The component — `components/demo/<category>/<name>.tsx`

This is the file people install, so treat it as a public API.

```tsx
"use client";

import { motion } from "motion/react";

interface TiltCardProps {
  children: React.ReactNode;
  /** Maximum tilt in degrees. */
  maxTilt?: number;
  className?: string;
}

export function TiltCard({ children, maxTilt = 12, className }: TiltCardProps) {
  // ...
}
```

### 2. A runnable example — `components/usage/<category>/<name>.usage.tsx`

Default-export a component that takes **no props**. This is both the live
preview and the code sample shown in the Code tab, so keep it short and
realistic.

### 3. Docs config — `content/docs/<category>/<name>.content.ts`

```ts
import type { ComponentConfig } from "@/types/component-config.type";

const TiltCardContent: ComponentConfig = {
  name: "tilt-card",
  category: "card",
  title: "Tilt Card",
  description: "A card that tilts toward the cursor.",
  isNew: true,
  props: [
    {
      prop: "maxTilt",
      type: "number",
      defaultValue: "12",
      description: "Maximum tilt in degrees.",
    },
  ],
};

export default TiltCardContent;
```

The filename must be `<name>.content.ts` under the `<category>` directory, and
`name`/`category` must match — a test enforces this.

### 4. Register it

Add the config to the array in `content/docs/index.ts`, and add one line to the
lazy map in `components/website/component-preview.tsx`.

That's it. The sidebar, the docs page, the sitemap, the command menu and the
shadcn registry entry are all derived from there.

## Component guidelines

- **Type every prop.** `any` is a lint error.
- **Keep dependencies minimal.** Whatever your component imports becomes a
  dependency for everyone who installs it. `motion` is fine; a new charting
  library is not.
- **Use the design tokens** (`bg-background`, `text-muted-foreground`, `border`)
  rather than hardcoded colours, so the component works in both themes — and in
  the themes of the projects it gets installed into, which is the harder half.
  A colour shadcn does not define has to be declared in `config/tokens.ts` so
  the registry can ship it; the build fails on a `var(--whatever)` that nothing
  defines, because that renders correctly here and breaks on install.
- **Never call `Math.random()` or `Date.now()` during render.** They differ
  between the server and the browser and cause hydration mismatches. Use
  `useId()` for stable variation.
- **Format dates with an explicit locale and `timeZone`.** Same reason.
- **Honour `prefers-reduced-motion`.** Not only for loops — for anything that
  moves. `tests/reduced-motion.test.ts` fails the build if a component does not
  consult the preference, or consults it and ignores the answer.

  What to do with it is a judgement. An entrance should be settled from the
  first frame rather than merely instant, or the content sits invisible until
  it scrolls into view. Something the user explicitly starts may still animate.
  Something that withholds content — a typewriter — should show all of it.

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
- CI must be green.

Contributors are credited on their component's docs page via the `credits`
field. Add yours in the same PR.

## Reporting bugs

Open an issue with the [bug report template](.github/ISSUE_TEMPLATE/bug_report.md).
Include the component, your Next/React/Tailwind versions, and a reproduction if
you can.

For security issues, follow [SECURITY.md](SECURITY.md) instead — please don't
open a public issue.
