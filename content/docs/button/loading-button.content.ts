import type { ComponentConfig } from "@/types/component-config.type";

const LoadingButtonContent: ComponentConfig = {
  name: "loading-button",
  category: "button",
  title: "Loading Button",
  description:
    "The LoadingButton component runs one async action and reports on it in place: it swaps to a spinner while the request is open, confirms with a tick when it resolves, and returns to its resting label on its own.",
  addedAt: "2026-08-15",
  whenToUse:
    "For any button that fires a request, whether that is submitting a form, saving a draft or sending an invite. It owns the busy state itself, which closes the two bugs a hand-rolled version usually ships with: a second click landing while the first request is still open, and the spinner never clearing when the request fails. Reach for it only where the work is genuinely asynchronous; on an instant action the success tick appears and vanishes so fast it reads as a glitch. For a toggle that flips between two settled states rather than performing work, use Subscribe Button instead.",
  props: [
    {
      prop: "children",
      type: "React.ReactNode",
      defaultValue: "-",
      description: "Resting label, shown when the button is idle (required)",
    },
    {
      prop: "onAction",
      type: "() => void | Promise<void>",
      defaultValue: "-",
      description:
        "The work to run on click. The button stays busy until it settles, and returns to idle if it rejects",
    },
    {
      prop: "loadingText",
      type: "string",
      defaultValue: "Saving",
      description: "Label shown while the action is in flight",
    },
    {
      prop: "successText",
      type: "string",
      defaultValue: "Saved",
      description: "Label shown briefly once the action resolves",
    },
    {
      prop: "successDuration",
      type: "number",
      defaultValue: "1.6",
      description:
        "Seconds the success label stays up before the button returns to idle",
    },
    {
      prop: "className",
      type: "string",
      defaultValue: "''",
      description: "Additional CSS classes for styling",
    },
    {
      prop: "...props",
      type: "ButtonHTMLAttributes",
      defaultValue: "-",
      description:
        "Any other native button props, including onClick, type and disabled",
    },
  ],
  credits: {
    name: "Claude Code",
    url: "https://claude.com/claude-code",
    kind: "tool",
  },
  playground: {
    fixedSource: "  onAction={publish}",
    childrenSource: "  Publish changes",
  },
};

export default LoadingButtonContent;
