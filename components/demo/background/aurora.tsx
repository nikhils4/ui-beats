"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface AuroraProps {
  /** Colour the ribbons start from. Any CSS colour. */
  from?: string;
  /** Colour they pass through at their brightest. */
  via?: string;
  /** Seconds for one drift cycle. Higher is slower. */
  speed?: number;
  /** How far the ribbons are softened, in pixels. */
  blur?: number;
  /** Overall opacity of the layer, 0 to 1. */
  intensity?: number;
  className?: string;
}

/**
 * Slow bands of colour drifting behind content, like an aurora.
 *
 * Three ribbons rather than one: a single animated gradient reads as a
 * gradient being animated, because every part of it moves in step. Overlapping
 * bands at different angles and — crucially — different periods never repeat
 * the same arrangement, so the layer keeps changing without any one element
 * doing anything complicated.
 *
 * The periods are derived from `speed` by fixed ratios instead of being offset
 * with delays: a delay only shifts where a loop starts, so the ribbons would
 * still realign every cycle and the whole field would pulse.
 *
 * Both colours default to theme tokens, so an installed aurora picks up the
 * project's accent rather than ours.
 */

/** Position, angle and period ratio per ribbon. */
const RIBBONS = [
  { inset: "-30% -20% auto auto", size: "95% 85%", angle: -18, ratio: 1 },
  { inset: "-15% auto auto -25%", size: "85% 105%", angle: 14, ratio: 1.37 },
  { inset: "auto -15% -25% auto", size: "110% 75%", angle: -6, ratio: 0.79 },
];

export function Aurora({
  from = "var(--brand)",
  via = "var(--accent-pink)",
  speed = 14,
  blur = 72,
  intensity = 0.55,
  className = "",
}: AuroraProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <div
        className="absolute inset-0"
        style={{ filter: `blur(${blur}px)`, opacity: intensity }}
      >
        {RIBBONS.map((ribbon, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{
              inset: ribbon.inset,
              width: ribbon.size.split(" ")[0],
              height: ribbon.size.split(" ")[1],
              rotate: `${ribbon.angle}deg`,
              backgroundImage: `linear-gradient(115deg, transparent 10%, ${from} 40%, ${via} 65%, transparent 92%)`,
            }}
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    x: ["-6%", "10%", "-6%"],
                    y: ["-5%", "7%", "-5%"],
                    scale: [1, 1.18, 1],
                  }
            }
            transition={{
              duration: speed * ribbon.ratio,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Aurora;
