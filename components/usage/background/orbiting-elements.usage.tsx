"use client";
import { OrbitingElements } from "@/components/demo/background/orbiting-elements";
import { Atom, Boxes, Cpu, Sparkles } from "lucide-react";

const OrbitingElementsUsage = () => {
  return (
    <div className="relative flex size-full items-center justify-center">
      <div className="absolute flex size-16 items-center justify-center rounded-2xl border bg-card shadow-subtle">
        <Sparkles className="size-6 text-brand" />
      </div>
      <OrbitingElements radius={110} duration={18}>
        {[Atom, Cpu, Boxes].map((Icon, index) => (
          <div
            key={index}
            className="flex size-10 items-center justify-center rounded-full border bg-background shadow-subtle"
          >
            <Icon className="size-4 text-muted-foreground" />
          </div>
        ))}
      </OrbitingElements>
    </div>
  );
};

export default OrbitingElementsUsage;
