<div align="center">

<img src="public/uibeats-logo.png" alt="UI Beats" width="72" height="72" />

# UI Beats

**Supercharge your UI.**

Beautifully designed, animated React components you can copy, paste, or install with the shadcn CLI.

[**Documentation**](https://uibeats.com/docs) · [**Components**](https://uibeats.com/docs/getting-started/introduction) · [**Blog**](https://uibeats.com/blogs)

[![CI](https://github.com/nikhils4/ui-beats/actions/workflows/ci.yml/badge.svg)](https://github.com/nikhils4/ui-beats/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE.md)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-149eca?logo=react)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)

</div>

---

## What this is

UI Beats is a collection of animated React components built with **TypeScript**, **Tailwind CSS** and **Motion**.

It is **not** a package you install and import from. You own the code: add a component, then change whatever you like. No version pinning, no wrapper APIs, no waiting on a maintainer to expose a prop.

## Install a component

```bash
npx shadcn@latest add https://uibeats.com/r/flip-card.json
```

The CLI writes the component into your project and installs the npm packages it needs. Every component page lists its own command, and the full index lives at [`/r/registry.json`](https://uibeats.com/r/registry.json).

Prefer to copy and paste? Every component page has the full source under **Installation → Manual**.

## Use it from your coding agent

Most components get picked by whatever is writing the code. The MCP server puts the whole catalogue inside Claude Code, Cursor, Windsurf and anything else that speaks [MCP](https://modelcontextprotocol.io), so your agent can search for a component and read its real props instead of guessing.

```bash
claude mcp add uibeats -- npx -y @uibeats/mcp
```

It exposes four tools — `search_components`, `get_component`, `list_components` and `get_install_command`. See [`packages/mcp`](packages/mcp) or the [MCP docs](https://uibeats.com/docs/getting-started/mcp).

For agents that only fetch URLs, the same content is served as plain text:

| URL                          | What it is                                                   |
| ---------------------------- | ------------------------------------------------------------ |
| `/llms.txt`                  | Index of every component, linking to its markdown            |
| `/llms-full.txt`             | Every component's props and full source, in one file         |
| `/docs/<category>/<name>.md` | Any component page as markdown — just add `.md`              |
| `/r/components.json`         | The catalogue as JSON, with props and guidance. CORS is open |

## Tune before you copy

Every component has a **playground** at `/playground/<category>/<name>`: the props table becomes a live control panel, the preview updates as you drag, and the snippet carries only what you actually changed. All 40 of them.

The controls are derived from the same `props` array that renders the documentation table, so a control can never describe a prop the docs do not.

Alongside it, **[Motion Studio](https://uibeats.com/motion-studio)** — a cubic-bezier and spring editor. Drag the curve or tune stiffness, damping and mass, watch it run on three properties at once, and copy the Motion `transition` or the CSS. Springs are integrated from the same damped-oscillator model Motion uses rather than approximated with a bezier, so the preview is the motion you will ship.

## Components

40 components across six categories:

| Category       | Components                                                                                                            |
| -------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Animation**  | Animated List, Bounce, Fade In, Fade In Unblur, Rotate In, Scale In, Smooth Reveal, Stagger List                      |
| **Background** | Animated Beam, Gradient Flow, Meteors, Orbiting Elements, Retro Grid, Sparkling Grid                                  |
| **Button**     | Loading Button, Magnetic Button, Ripple Button, Shimmer Button, Subscribe Button                                      |
| **Card**       | Card Stack, Flip Card, Glowing Card, Morphing Card, Tilt Card                                                         |
| **Component**  | Avatar Stack, Bento Grid, Border Beam, Dock, Liquid Tabs, Marquee, Scratch to Reveal, Scroll Progress, Shimmer Effect |
| **Text**       | Gravity Text Swap, Number Ticker, Scroll Reveal, Split Flap, Text Scramble, Text Shine, Text Writer                   |

### Motion you can switch off

Every component honours `prefers-reduced-motion`. Not "most of them" — the
whole registry, checked in CI: `tests/reduced-motion.test.ts` fails the build
if a component ships without consulting the preference, or reads it and then
animates anyway.

What that means per component is a judgement, not a switch. An entrance is
settled from the first frame. A carousel stops advancing on its own but still
moves when you press the button. Flip Card still turns, because the back face
is the point — it just cuts instead of sweeping.

### Themed by your tokens, not ours

Components read shadcn's own variables — `--card`, `--border`,
`--muted-foreground` — so an installed component wears your palette. The few
that need a colour shadcn does not define ship it with them: `cssVars` in the
registry item, merged into your stylesheet by the CLI. See `config/tokens.ts`;
the build fails on a component that reads a variable nothing defines.

## Local development

Requires **Node 20.9+** and Yarn 4 (via Corepack).

```bash
git clone https://github.com/nikhils4/ui-beats.git
cd ui-beats
corepack enable
yarn install
yarn dev
```

The site runs at [http://localhost:3000](http://localhost:3000).

### Scripts

| Script                | What it does                                           |
| --------------------- | ------------------------------------------------------ |
| `yarn dev`            | Start the dev server                                   |
| `yarn build`          | Build the registry, then the production site           |
| `yarn start`          | Serve the production build                             |
| `yarn lint`           | ESLint (flat config)                                   |
| `yarn typecheck`      | `tsc --noEmit`                                         |
| `yarn test`           | Vitest unit tests                                      |
| `yarn test:e2e`       | Playwright end-to-end tests against a production build |
| `yarn test:visual`    | Motion frame diffs against the committed baselines     |
| `yarn format`         | Prettier                                               |
| `yarn registry:build` | Regenerate `public/r/` from the component source       |
| `yarn new:component`  | Scaffold a component and wire it into every registry   |

## How it fits together

```bash
yarn new:component --name flip-clock --category component
```

That writes the four files below, registers them in all three maps, and leaves
a stub that compiles and passes the suite. The rest of this section is what it
does, for when you need to do it by hand.

Adding a component means adding **four files**. The sidebar, the docs page, the sitemap, the command menu and the shadcn registry entry are all derived from them — there is no central list to keep in sync.

```
components/demo/<category>/<name>.tsx         the component itself
components/usage/<category>/<name>.usage.tsx  a runnable example
content/docs/<category>/<name>.content.ts     title, description, props table
content/docs/index.ts                         add the config to the array
components/website/component-preview.tsx      one line in the lazy preview map
```

Optionally a fifth, to give it a playground:

```
components/playground/<category>/<name>.playground.tsx   renders it from live values
components/website/playground-harnesses.tsx              one line in the lazy harness map
```

Everything else is generated:

- **`lib/registry.ts`** joins each config with its source on disk and derives the npm dependency list from the component's own `import` statements.
- **`lib/playground.ts`** turns the documented props table into controls — a string-literal union becomes a select, a `number` becomes a range with a bounded scale, a hex-defaulted colour prop becomes a swatch.
- **`lib/agent-docs.ts`** renders the same registry data as markdown for `/llms.txt`, `/llms-full.txt` and the per-component `.md` routes.
- **`config/side-nav.ts`** builds the sidebar from the same array.
- **`scripts/build-registry.ts`** emits `public/r/*.json` for the shadcn CLI, plus `components.json` for the MCP server.
- **`app/docs/[category]/[component]/page.tsx`** statically generates one page per component, with real per-page metadata.

### Stack

| Area         | Choice                                                   |
| ------------ | -------------------------------------------------------- |
| Framework    | Next.js 16 (App Router, React 19)                        |
| Styling      | Tailwind CSS v4 (CSS-first theme, no JS config)          |
| Animation    | Motion                                                   |
| Content      | MDX via `next-mdx-remote`, frontmatter via `gray-matter` |
| Highlighting | Shiki, at build time                                     |
| Distribution | shadcn registry, MCP server, `llms.txt`                  |
| Testing      | Vitest + Testing Library, Playwright                     |

## Contributing

Contributions are welcome — see [CONTRIBUTING.md](CONTRIBUTING.md) and the [contribute guide](https://uibeats.com/docs/getting-started/contribute). Contributors are credited on their component's docs page.

### Attribution

Every component says where it came from. The `credits` field on each component's config drives the Credits block on its docs page, the `author` field in its registry JSON, and the `author` in its structured data.

Eighteen components — Tilt Card, Text Scramble, Magnetic Button, Stagger List, Dock, Marquee, Number Ticker, Scroll Reveal, Orbiting Elements, Animated Beam, Animated List, Border Beam, Card Stack, Liquid Tabs, Retro Grid, Ripple Button, Scratch to Reveal and Split Flap — were written with [Claude Code](https://claude.com/claude-code) and are credited as such rather than presented as community contributions. They are reviewed and maintained here like any other component.

<a href="https://github.com/nikhils4/ui-beats/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=nikhils4/ui-beats" alt="Contributors" />
</a>

## Security

Found a vulnerability? Please follow [SECURITY.md](SECURITY.md) rather than opening a public issue.

## License

[MIT](LICENSE.md) © [Nikhil Singh](https://nikhils4.vercel.app)
