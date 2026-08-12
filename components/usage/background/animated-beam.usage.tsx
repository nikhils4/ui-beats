"use client";

import { useRef } from "react";
import { AnimatedBeam } from "@/components/demo/background/animated-beam";
import { Database, Sparkles } from "lucide-react";
import { GitHubIcon } from "@/components/icons";

const AnimatedBeamUsage = () => {
  const container = useRef<HTMLDivElement>(null);
  const left = useRef<HTMLDivElement>(null);
  const centre = useRef<HTMLDivElement>(null);
  const right = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={container}
      className="relative flex w-full max-w-md items-center justify-between px-4"
    >
      <Node ref={left}>
        <GitHubIcon className="size-5 text-muted-foreground" />
      </Node>
      <Node ref={centre} accent>
        <Sparkles className="size-5 text-brand" />
      </Node>
      <Node ref={right}>
        <Database className="size-5 text-muted-foreground" />
      </Node>

      <AnimatedBeam
        containerRef={container}
        fromRef={left}
        toRef={centre}
        curvature={-40}
      />
      <AnimatedBeam
        containerRef={container}
        fromRef={centre}
        toRef={right}
        curvature={-40}
        delay={0.8}
      />
    </div>
  );
};

function Node({
  ref,
  children,
  accent = false,
}: {
  ref: React.Ref<HTMLDivElement>;
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      ref={ref}
      className={`z-10 flex size-12 items-center justify-center rounded-xl border bg-card shadow-subtle ${
        accent ? "ring-2 ring-brand/30" : ""
      }`}
    >
      {children}
    </div>
  );
}

export default AnimatedBeamUsage;
