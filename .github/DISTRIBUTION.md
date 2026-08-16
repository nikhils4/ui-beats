# Distribution checklist

Where UI Beats needs to be listed, and the exact text to submit. Everything
here is a manual step — each destination wants a pull request or a form from an
account, so none of it can be automated from this repo.

Keep this file updated as entries land. An unticked box is a channel that is
not carrying anyone.

## Where this actually stands

Measured 2026-08-16, so that the boxes below are read against real numbers
rather than intent.

| Signal                          | Value                                  |
| ------------------------------- | -------------------------------------- |
| Stars                           | 227, from 2024-07-08                    |
| Recent star rate                | ~2/month (26 stars since 2025-06-27)    |
| Repo views, trailing 14 days    | 79 views / 15 uniques                   |
| Referrers, trailing 14 days     | github.com (2 uniques), Google (1)      |
| `@uibeats/mcp` downloads, 30d   | 0                                       |

Two of the three top-viewed paths are `/pulls` and `/security/dependabot`,
which is the maintainer looking at his own repo. The honest reading is that
there is no inbound discovery path at all right now — not that the components
are being found and passed over.

## Canonical facts

Reuse these verbatim so the description is the same everywhere. They match
`lib/site.ts` and `packages/mcp/package.json`.

| Field       | Value                                                                                                                  |
| ----------- | ---------------------------------------------------------------------------------------------------------------------- |
| Name        | UI Beats                                                                                                               |
| URL         | https://uibeats.com                                                                                                    |
| Repo        | https://github.com/nikhils4/ui-beats                                                                                   |
| Registry    | https://uibeats.com/r/registry.json                                                                                    |
| MCP package | `@uibeats/mcp`                                                                                                         |
| Licence     | MIT                                                                                                                    |
| One-liner   | Animated React components built with TypeScript, Tailwind CSS and Motion. Copy, paste, or install with the shadcn CLI. |

Longer blurb, for anywhere that allows a paragraph:

> UI Beats is a registry of animated React components you own outright — the
> shadcn CLI writes the source into your project, so there is no package to pin
> and no wrapper API to work around. Every component ships a props table, an
> interactive playground and a reduced-motion path, and the whole catalogue is
> available to coding agents over MCP.

The GitHub repo description is not currently one of these. It still reads
"Framer Motion", which the project moved off, and it does not match the
one-liner above. Fixing it costs nothing and it is the first line of copy
anyone sees on the repo.

## Landed

- [x] **awesome-shadcn-ui** — https://github.com/birobirobiro/awesome-shadcn-ui
      Row in `Libs and Components` since 2024-12-27. The description was thin
      and is being replaced by PR #591 below.
- [x] **awesome-uikit** — https://github.com/jaywcjlove/awesome-uikit
- [x] **awesome-shadcnui** — https://github.com/2-fly-4-ai/awesome-shadcnui
- [x] **shadcntemplates.com** — https://shadcntemplates.com
- [x] FMHY developer-tools mirrors, downstream of awesome-shadcn-ui. Not
      submitted directly and not worth submitting to individually.

## Open pull requests

Opened 2026-08-16. Each is a single-line diff written in the destination's own
row format.

- [ ] **design-resources-for-developers** (66.7k) —
      https://github.com/bradtraversy/design-resources-for-developers/pull/1686
- [ ] **awesome-ui-component-library** (1.7k) —
      https://github.com/anubhavsrivastava/awesome-ui-component-library/pull/52
- [ ] **bytefer/awesome-shadcn-ui** (726) —
      https://github.com/bytefer/awesome-shadcn-ui/pull/31
- [ ] **awesome-shadcn-ui description fix** —
      https://github.com/birobirobiro/awesome-shadcn-ui/pull/591

## Directories that need a browser

No repository to fork; each wants a form or a signed-in session. Magic UI is
listed on all four and UI Beats is on none of them.

- [ ] **21st.dev** — https://21st.dev — anyone can publish, components live on
      your profile. The highest-traffic gap on this list.
- [ ] **registry.directory** — https://registry.directory — has an "Add your
      Registry" link and reads `registry.json` directly.
- [ ] **shadcnregistry.com** — https://shadcnregistry.com
- [ ] **shadcn.io/awesome** — https://www.shadcn.io/awesome/registries — mirrors
      awesome-shadcn-ui but UI Beats is missing from the registries page
      despite being in the source list. Worth an enquiry rather than a
      resubmission.

## MCP channels

Nothing here is a gap against Magic UI — Magic UI is absent from all of these
too. Checked 2026-08-16 against the raw READMEs of `punkpeye/awesome-mcp-servers`
(1.3 MB, zero hits), `wong2`, `appcypher` and `modelcontextprotocol/servers`.
That makes it an uncontested category rather than a race.

- [ ] **MCP server registry** — https://github.com/modelcontextprotocol/registry
      The server card is already served at
      https://uibeats.com/.well-known/mcp.json and generated by
      `yarn registry:build`, so a submission points at that rather than
      restating it.
- [ ] **Awesome MCP Servers** — https://github.com/punkpeye/awesome-mcp-servers
      Category: "Developer Tools" / UI. One line, linking `@uibeats/mcp`.
- [ ] **Smithery** — https://smithery.ai — hosted MCP directory, form submission.

## Why this is on the list at all

The MCP server has been on npm since `0.1.0` with no inbound path to it: an
agent only reaches a tool it has been told about, and nothing tells it. Thirty
days of zero downloads is that sentence with a number attached. Two listings do
more for adoption than the next ten components, because the components already
exist and nobody can find them.

## After a listing lands

Check it actually carries traffic before adding another. `/r/*.json` fetches
are logged by `proxy.ts` — a listing that produces no `registry_install` or
`registry_catalogue_read` events after a fortnight is a badge, not a channel.

The same test applies to this file. Re-measure the table at the top when the
open pull requests resolve; if stars and referrers have not moved, the next
listing is not the answer and the top section should say so.
