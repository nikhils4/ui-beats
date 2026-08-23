# Distribution checklist

Where UI Beats needs to be listed, and the exact text to submit. Everything
here is a manual step: each destination wants a pull request or a form from an
account, so none of it can be automated from this repo.

Keep this file updated as entries land. An unticked box is a channel that is
not carrying anyone.

## Where this actually stands

Measured 2026-08-17, so that the boxes below are read against real numbers
rather than intent. The 2026-08-16 baseline is kept alongside, because the
point of the table is the delta.

| Signal                        | 2026-08-16                           | 2026-08-17           |
| ----------------------------- | ------------------------------------ | -------------------- |
| Stars                         | 227, from 2024-07-08                 | 229                  |
| Recent star rate              | ~2/month (26 stars since 2025-06-27) | too early to reread  |
| Repo views, trailing 14 days  | 79 views / 15 uniques                | 254 views / 37       |
| Referrers, trailing 14 days   | github.com (2 uniques), Google (1)   | github.com 91, Bing 2|
| `@uibeats/mcp` downloads, 30d | 0                                    | 245, all on one day  |

None of this is traction yet, and it should not be read as any. The view rise
tracks pull requests opened from this account on 2026-08-16, so most of that
github.com referral is the submissions themselves rather than readers. The 245
npm downloads landed entirely on 2026-08-15 with zero on every other day, which
is the shape of a mirror or a crawler, not of people installing a server.

Two of the three top-viewed paths on 2026-08-16 were `/pulls` and
`/security/dependabot`, which is the maintainer looking at his own repo. The
honest reading is still that there is no inbound discovery path, only that
several have now been applied for.

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

> UI Beats is a registry of animated React components you own outright. The
> shadcn CLI writes the source into your project, so there is no package to pin
> and no wrapper API to work around. Every component ships a props table, an
> interactive playground and a reduced-motion path, and the whole catalogue is
> available to coding agents over MCP.

The GitHub repo description and topics were corrected on 2026-08-16. The
description now carries the hero line rather than the old "Framer Motion" copy,
and the topic list went from 6 to 18.

## Landed

- [x] **awesome-shadcn-ui**: https://github.com/birobirobiro/awesome-shadcn-ui
      Row in `Libs and Components` since 2024-12-27. The description was thin
      and is being replaced by PR #591 below.
- [x] **awesome-uikit**: https://github.com/jaywcjlove/awesome-uikit
- [x] **awesome-shadcnui**: https://github.com/2-fly-4-ai/awesome-shadcnui
- [x] **shadcntemplates.com**: https://shadcntemplates.com
- [x] FMHY developer-tools mirrors, downstream of awesome-shadcn-ui. Not
      submitted directly and not worth submitting to individually.
- [x] **awesome-ui-component-library** (1.7k): merged 2026-08-17.
      https://github.com/anubhavsrivastava/awesome-ui-component-library/pull/52
- [x] **claude-skill-registry** (561k community catalogue): merged 2026-08-17.
      https://github.com/majiayu000/claude-skill-registry-core/pull/277
      Submissions go to the `-core` repo; the popular one is a generated
      artifact that is overwritten on each publish cycle. The next cycle picks
      up `skills/ui-beats` from this repo.

## Open pull requests

Each is a single-line diff written in the destination's own row format.

- [ ] **design-resources-for-developers** (66.7k):
      https://github.com/bradtraversy/design-resources-for-developers/pull/1686
- [ ] **bytefer/awesome-shadcn-ui** (726):
      https://github.com/bytefer/awesome-shadcn-ui/pull/31
- [ ] **awesome-shadcn-ui description fix**:
      https://github.com/birobirobiro/awesome-shadcn-ui/pull/591
      Both red checks are the destination's own: `format-readme` pushes to
      `origin` on a fork PR, which a read-only `GITHUB_TOKEN` cannot do, and
      the Vercel preview needs team authorisation. Their formatter run against
      this branch produces no diff, so the row itself is already canonical.
- [ ] **awesome-mcp-servers** (68k):
      https://github.com/punkpeye/awesome-mcp-servers/pull/12275
      Blocked on a new listing requirement: the server has to be on Glama
      (https://glama.ai/mcp/servers) and passing its checks, after which the
      PR needs a score badge appended to the entry.

## Directories that need a browser

No repository to fork; each wants a form or a signed-in session. Magic UI is
listed on all four and UI Beats is on none of them.

- [ ] **21st.dev**: https://21st.dev. Anyone can publish, components live on
      your profile. The highest-traffic gap on this list.
- [ ] **registry.directory**: https://registry.directory. Has an "Add your
      Registry" link and reads `registry.json` directly.
- [ ] **shadcnregistry.com**: https://shadcnregistry.com
- [ ] **shadcn.io/awesome**: https://www.shadcn.io/awesome/registries. Mirrors
      awesome-shadcn-ui but UI Beats is missing from the registries page
      despite being in the source list. Worth an enquiry rather than a
      resubmission.

## MCP channels

Nothing here is a gap against Magic UI; Magic UI is absent from all of these
too. Checked 2026-08-16 against the raw READMEs of `punkpeye/awesome-mcp-servers`
(1.3 MB, zero hits), `wong2`, `appcypher` and `modelcontextprotocol/servers`.
That makes it an uncontested category rather than a race.

- [ ] **MCP server registry**: https://github.com/modelcontextprotocol/registry
      Half done. DNS authentication for the `com.uibeats` namespace succeeded
      on 2026-08-17 against an apex TXT record on uibeats.com, and the card at
      `server.json` validates on the current `2025-12-11` schema. The publish
      itself is rejected until npm carries the claim: the registry reads the
      *published* package and requires `"mcpName": "com.uibeats/mcp"` in it.
      That ships as 0.1.3, so the remaining step is tagging `mcp-v0.1.3` and
      letting the release workflow publish, then re-running
      `mcp-publisher publish`.

      The signing key lives at `~/.config/mcp-publisher/uibeats.key.pem`, mode
      600, outside this repo. Every future version publish re-authenticates
      with it. Replacing it means swapping the apex TXT record and deleting the
      old one, because a stale record is tried first and fails verification.
- [x] **Awesome MCP Servers**: submitted, see the open pull requests above.
- [ ] **Glama**: https://glama.ai/mcp/servers. Not previously on this list.
      It is now a prerequisite for the awesome-mcp-servers entry rather than an
      optional extra.
- [ ] **Smithery**: https://smithery.ai. Hosted MCP directory, form submission.

## Why this is on the list at all

The MCP server has been on npm since `0.1.0` with no inbound path to it: an
agent only reaches a tool it has been told about, and nothing tells it. Thirty
days of zero downloads is that sentence with a number attached. Two listings do
more for adoption than the next ten components, because the components already
exist and nobody can find them.

## After a listing lands

Check it actually carries traffic before adding another. `/r/*.json` fetches
are logged by `proxy.ts`: a listing that produces no `registry_install` or
`registry_catalogue_read` events after a fortnight is a badge, not a channel.

The same test applies to this file. Re-measure the table at the top when the
open pull requests resolve; if stars and referrers have not moved, the next
listing is not the answer and the top section should say so.
