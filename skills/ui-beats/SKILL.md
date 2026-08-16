---
name: ui-beats
description: Use this skill when users want to add, customize, or troubleshoot UI Beats components in React/Next.js projects. It covers component selection, shadcn registry installation from uibeats.com, the UI Beats MCP server, motion and reduced-motion handling, and integration patterns for animated sections.
metadata:
  short-description: Build animated React interfaces with UI Beats components
---

# UI Beats

Use this skill when the task involves UI Beats components, animated React
sections, or turning a static section into a moving one using the UI Beats
registry.

UI Beats is a registry of 55 animated React components built with TypeScript,
Tailwind CSS and Motion. The shadcn CLI writes the source into the project, so
there is no package to pin and no wrapper API to work around — once installed,
the file is ordinary project code and can be edited freely.

## When To Apply

Apply this skill when users ask to:

- Add a UI Beats component (for example: border-beam, marquee, flip-card,
  text-scramble, particles)
- Build an animated section — hero, pricing, feature grid, testimonial wall
- Replace hand-written animation code with a maintained component
- Troubleshoot installation or imports for `https://uibeats.com/r/*.json`

## Core Workflow

1. **Read the catalogue before choosing.** Component names do not always
   describe the effect. Load `references/components.md` and match on the
   description, not the slug.

2. **Prefer the MCP server when it is available.** UI Beats ships one, and it
   returns the real props table and full source rather than a guess:

   ```bash
   claude mcp add uibeats -- npx -y @uibeats/mcp
   ```

   It exposes `search_components`, `get_component`, `list_components` and
   `get_install_command`. The reliable sequence is
   `search_components("card that flips")` → `get_component("flip-card")` to
   read the actual props → `get_install_command("flip-card")`. Do not write JSX
   against remembered prop names; read them first.

3. **Confirm prerequisites.** React or Next.js with Tailwind CSS, and shadcn
   initialised:

   ```bash
   npx shadcn@latest init
   ```

4. **Install the component.** UI Beats is a URL registry, so the install
   target is the full JSON path:

   ```bash
   npx shadcn@latest add https://uibeats.com/r/<slug>.json
   ```

   Example:

   ```bash
   npx shadcn@latest add https://uibeats.com/r/border-beam.json
   ```

   Blocks pull their own parts in — installing `hero` also installs the
   components it composes.

5. **Integrate.** Import from `@/components/ui/<slug>`. Prefer props and
   `className` over editing internals on the first pass; the source is yours to
   change, but an unmodified file is easier to re-install later.

6. **Validate before finishing.**
   - **Motion:** UI Beats components handle `prefers-reduced-motion`
     themselves. If you wrap or re-implement one, preserve that path rather
     than stripping it.
   - **Motion budget:** one prominent effect per viewport. Stacking a
     background, an animated border and text motion in the same fold reads as
     noise and costs frames.
   - **Accessibility:** decorative motion layers take `aria-hidden`; keep
     semantic HTML and keyboard access intact.
   - **Client boundaries:** animated components are client components. In
     Next.js App Router keep the `"use client"` boundary as low in the tree as
     possible rather than promoting a whole page.

## Common Failures

- **Installing by bare slug.** `npx shadcn@latest add border-beam` resolves
  against the default registry and will not find UI Beats. The full
  `https://uibeats.com/r/border-beam.json` URL is required.
- **Guessed props.** Read `get_component` or the docs page before writing JSX.
- **Dropped CSS variables.** `animated-beam`, `aurora`, `morphing-card` and
  `gradient-text` ship light and dark CSS variables that the registry writes on
  install. If one of them renders colourless, the variables did not land —
  re-run the install rather than hard-coding hex values.

## References To Load On Demand

- `references/components.md` — the full catalogue with slugs, grouped by
  category, generated from the registry.
- Docs, props tables and live playgrounds: https://uibeats.com/docs
- Registry index: https://uibeats.com/r/registry.json
