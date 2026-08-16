# Security Policy

## Supported versions

UI Beats is distributed as source you copy into your own project, so there are
no released versions to patch. Fixes land on `main` and are picked up the next
time you add or re-add a component.

The hosted site at [uibeats.com](https://uibeats.com) is always running the
latest `main`.

## Reporting a vulnerability

**Please do not open a public issue for security problems.**

Report it privately through
[GitHub Security Advisories](https://github.com/nikhils4/ui-beats/security/advisories/new).
The report stays between you and the maintainers until a fix ships.

Please include:

- What the issue is and why it matters
- Steps to reproduce, or a proof of concept
- The affected file, route, or component
- Any suggested fix

### What to expect

| Stage           | Target                          |
| --------------- | ------------------------------- |
| Acknowledgement | Within 3 business days          |
| Initial triage  | Within 7 business days          |
| Fix or plan     | Within 30 days for valid issues |

You will be credited in the advisory unless you would rather not be.

## Scope

**In scope**

- The uibeats.com site and its routes
- The shadcn registry endpoints under `/r/`
- Any component in this repository
- The build and release tooling in `scripts/`

**Out of scope**

- Vulnerabilities in third-party dependencies without a working exploit against
  this project — report those upstream
- Missing hardening headers with no demonstrated impact
- Denial of service through volumetric traffic
- Findings from automated scanners with no proof of exploitability
- Social engineering

## Notes for people using these components

Components are distributed as source and run entirely on the client. When you
add one:

- **Review what you install.** Read the file — that is the point of source
  distribution.
- **Treat props as untrusted** if they carry user-supplied data. No component
  here writes to `innerHTML`, and none should. If you add HTML rendering to a
  copy, sanitise it yourself.
- **Pin the registry URL to a host you trust.** `shadcn add <url>` executes a
  file-write from a remote JSON document.
