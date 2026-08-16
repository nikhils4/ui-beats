"use client";

import { Terminal } from "@/components/demo/component/terminal";

const session = [
  { kind: "command" as const, text: "npx shadcn@latest add terminal.json" },
  { kind: "output" as const, text: "Checking registry..." },
  { kind: "output" as const, text: "Installing dependencies: motion" },
  { kind: "output" as const, text: "Writing components/ui/terminal.tsx" },
  { kind: "success" as const, text: "Done. One file, yours to edit." },
];

const TerminalUsage = () => {
  return (
    <div className="w-full max-w-md">
      <Terminal lines={session} />
    </div>
  );
};

export default TerminalUsage;
