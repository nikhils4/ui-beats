"use client";

import { useRef, type ReactNode, type Ref } from "react";
import { Database, Sparkles } from "lucide-react";
import { AnimatedBeam } from "@/components/demo/background/animated-beam";
import { GitHubIcon } from "@/components/icons";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for AnimatedBeam.
 *
 * Hand-written rather than generated, because this is the one component whose
 * required props are refs. A control panel cannot produce a `RefObject`, so
 * the harness owns the container and the two endpoints and lets the controls
 * drive everything else — which is exactly the arrangement a real page uses.
 */
function Node({
  ref,
  children,
  accent = false,
}: {
  ref: Ref<HTMLDivElement>;
  children: ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      ref={ref}
      className={`z-10 flex size-11 items-center justify-center rounded-full border bg-card shadow-subtle ${
        accent ? "border-brand/40" : ""
      }`}
    >
      {children}
    </div>
  );
}

export default function AnimatedBeamPlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(AnimatedBeam, values);

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

      {/*
        Two beams, so `delay` and `reverse` have something to be relative to.
        The second is offset by the delay the controls set, plus a little, so
        the pair reads as a sequence rather than one doubled beam.
      */}
      <AnimatedBeam
        {...props}
        containerRef={container}
        fromRef={left}
        toRef={centre}
      />
      <AnimatedBeam
        {...props}
        containerRef={container}
        fromRef={centre}
        toRef={right}
        delay={(Number(values.delay) || 0) + 0.8}
      />
    </div>
  );
}
