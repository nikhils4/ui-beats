# @uibeats/mcp

MCP server for [UI Beats](https://uibeats.com). Lets a coding agent search the
component catalogue, read a component's full source and props, and install it,
without anyone opening the website.

## Install

Claude Code:

```bash
claude mcp add uibeats -- npx -y @uibeats/mcp
```

Cursor, Windsurf, Claude Desktop and anything else that reads an
`mcpServers` block:

```json
{
  "mcpServers": {
    "uibeats": {
      "command": "npx",
      "args": ["-y", "@uibeats/mcp"]
    }
  }
}
```

## Tools

| Tool                  | What it does                                                             |
| --------------------- | ------------------------------------------------------------------------ |
| `search_components`   | Rank the catalogue against a plain-language query or a name              |
| `get_component`       | Full docs for one component: props table, usage example, complete source |
| `list_components`     | Everything available, grouped by category                                |
| `get_install_command` | The exact `shadcn` command, plus the npm packages it pulls in            |

A typical exchange: the agent calls `search_components("card that flips")`,
then `get_component("flip-card")` to read the real props before writing any
JSX, then `get_install_command("flip-card")` and runs it.

## How it works

There is no backend. The server is a cached client over two static files the
site already publishes:

- `/r/components.json`: the search index (names, descriptions, props, guidance)
- `/docs/<category>/<name>.md`: the canonical document for one component

The catalogue is cached in memory for ten minutes, and a stale copy is kept as
a fallback so a brief network failure does not break every tool call.

## Configuration

| Variable      | Default               | Purpose                                   |
| ------------- | --------------------- | ----------------------------------------- |
| `UIBEATS_URL` | `https://uibeats.com` | Point at a local `next dev` while working |

```bash
UIBEATS_URL=http://localhost:3000 npx @uibeats/mcp
```

## Development

This package is standalone: it is not part of the site's Yarn install.

```bash
cd packages/mcp
npm install
npm run build
```

## License

MIT
