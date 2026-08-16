import type { ComponentConfig } from "@/types/component-config.type";

const TerminalContent: ComponentConfig = {
  name: "terminal",
  category: "component",
  title: "Terminal",
  description:
    "The Terminal component replays a shell session, typing the commands character by character and printing everything else whole, with the pause sitting in front of each output line where the work would have happened.",
  addedAt: "2026-08-15",
  whenToUse:
    "On a landing page for anything installed from a command line, where showing the install is more convincing than describing it. Keep the session to what a reader can follow at a glance: a transcript long enough to need scrolling has stopped being a demo and become documentation in the wrong place.",
  props: [
    {
      prop: "lines",
      type: "TerminalLine[]",
      defaultValue: "-",
      description: "The session to replay, in order (required)",
    },
    {
      prop: "typingSpeed",
      type: "number",
      defaultValue: "0.03",
      description: "Seconds per character while a command types",
    },
    {
      prop: "lineDelay",
      type: "number",
      defaultValue: "0.5",
      description: "Seconds between one line finishing and the next starting",
    },
    {
      prop: "loop",
      type: "boolean",
      defaultValue: "true",
      description: "Replay the session from the top once it has finished",
    },
    {
      prop: "loopDelay",
      type: "number",
      defaultValue: "2.5",
      description: "Seconds the finished session is held before it replays",
    },
    {
      prop: "chrome",
      type: "boolean",
      defaultValue: "true",
      description: "Show the window chrome above the output",
    },
    {
      prop: "title",
      type: "string",
      defaultValue: "bash",
      description: "Title shown in the chrome bar",
    },
    {
      prop: "className",
      type: "string",
      defaultValue: "''",
      description: "Additional CSS classes for styling",
    },
    {
      prop: "TerminalLine: kind",
      type: "'command' | 'output' | 'success' | 'error'",
      defaultValue: "output",
      description: "command types out behind a prompt; the rest appear whole",
    },
    {
      prop: "TerminalLine: text",
      type: "string",
      defaultValue: "-",
      description: "The line itself",
    },
  ],
  credits: {
    name: "Claude Code",
    url: "https://claude.com/claude-code",
    kind: "tool",
  },
  playground: {
    fixedSource: `  lines={session}`,
    ranges: {
      typingSpeed: { min: 0.01, max: 0.2, step: 0.005, unit: "s" },
      lineDelay: { min: 0.1, max: 2, step: 0.05, unit: "s" },
      loopDelay: { min: 0.5, max: 8, step: 0.5, unit: "s" },
    },
  },
};

export default TerminalContent;
