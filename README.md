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

## Components

26 components across six categories:

| Category       | Components                                                                              |
| -------------- | --------------------------------------------------------------------------------------- |
| **Animation**  | Bounce, Fade In, Fade In Unblur, Rotate In, Scale In, Smooth Reveal, Stagger List       |
| **Background** | Animated Beam, Gradient Flow, Orbiting Elements, Sparkling Grid                         |
| **Button**     | Magnetic Button, Subscribe Button                                                       |
| **Card**       | Flip Card, Glowing Card, Morphing Card, Tilt Card                                       |
| **Component**  | Dock, Marquee, Shimmer Effect                                                           |
| **Text**       | Gravity Text Swap, Number Ticker, Scroll Reveal, Text Scramble, Text Shine, Text Writer |

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
| `yarn format`         | Prettier                                               |
| `yarn registry:build` | Regenerate `public/r/` from the component source       |

## How it fits together

Adding a component means adding **four files**. The sidebar, the docs page, the sitemap, the command menu and the shadcn registry entry are all derived from them — there is no central list to keep in sync.

```
components/demo/<category>/<name>.tsx         the component itself
components/usage/<category>/<name>.usage.tsx  a runnable example
content/docs/<category>/<name>.content.ts     title, description, props table
content/docs/index.ts                         add the config to the array
components/website/component-preview.tsx      one line in the lazy preview map
```

Everything else is generated:

- **`lib/registry.ts`** joins each config with its source on disk and derives the npm dependency list from the component's own `import` statements.
- **`config/side-nav.ts`** builds the sidebar from the same array.
- **`scripts/build-registry.ts`** emits `public/r/*.json` for the shadcn CLI.
- **`app/docs/[category]/[component]/page.tsx`** statically generates one page per component, with real per-page metadata.

### Stack

| Area         | Choice                                                   |
| ------------ | -------------------------------------------------------- |
| Framework    | Next.js 16 (App Router, React 19)                        |
| Styling      | Tailwind CSS v4 (CSS-first theme, no JS config)          |
| Animation    | Motion                                                   |
| Content      | MDX via `next-mdx-remote`, frontmatter via `gray-matter` |
| Highlighting | Shiki, at build time                                     |
| Distribution | shadcn registry                                          |
| Testing      | Vitest + Testing Library, Playwright                     |

## Contributing

Contributions are welcome — see [CONTRIBUTING.md](CONTRIBUTING.md) and the [contribute guide](https://uibeats.com/docs/getting-started/contribute). Contributors are credited on their component's docs page.

### Attribution

Every component says where it came from. The `credits` field on each component's config drives the Credits block on its docs page, the `author` field in its registry JSON, and the `author` in its structured data.

Ten components — Tilt Card, Text Scramble, Magnetic Button, Stagger List, Dock, Marquee, Number Ticker, Scroll Reveal, Orbiting Elements and Animated Beam — were written with [Claude Code](https://claude.com/claude-code) and are credited as such rather than presented as community contributions. They are reviewed and maintained here like any other component.

<a href="https://github.com/nikhils4/ui-beats/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=nikhils4/ui-beats" alt="Contributors" />
</a>

## Security

Found a vulnerability? Please follow [SECURITY.md](SECURITY.md) rather than opening a public issue.

## License

[MIT](LICENSE.md) © [Nikhil Singh](https://nikhils.ca)
