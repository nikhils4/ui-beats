"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import {
  createContext,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";

interface DockContextValue {
  mouseX: MotionValue<number>;
  size: number;
  magnification: number;
  reach: number;
}

const DockContext = createContext<DockContextValue | null>(null);

function useDock(component: string) {
  const context = useContext(DockContext);
  if (!context) {
    throw new Error(`<${component}> must be rendered inside a <Dock>.`);
  }
  return context;
}

interface DockProps {
  children: ReactNode;
  /** Resting size of each item, in pixels. */
  size?: number;
  /** Size an item reaches directly under the pointer. */
  magnification?: number;
  /** How far, in pixels, the magnification reaches along the dock. */
  reach?: number;
  className?: string;
}

/**
 * A macOS-style dock: items swell as the pointer approaches and settle back
 * on a spring as it leaves.
 *
 * The pointer's x position is held in a motion value and read by each item
 * through context, so magnification runs entirely off the main thread — no
 * state updates and no re-renders per frame, however many items the dock
 * holds.
 */
export function Dock({
  children,
  size = 44,
  magnification = 76,
  reach = 130,
  className = "",
}: DockProps) {
  // Infinity parks every item at its resting size until the pointer arrives.
  const mouseX = useMotionValue(Number.POSITIVE_INFINITY);
  const prefersReducedMotion = useReducedMotion();

  return (
    <DockContext.Provider
      value={{
        mouseX,
        size,
        magnification: prefersReducedMotion ? size : magnification,
        reach,
      }}
    >
      <div
        role="toolbar"
        aria-label="Dock"
        onPointerMove={(event) => {
          if (event.pointerType === "touch" || prefersReducedMotion) return;
          mouseX.set(event.clientX);
        }}
        onPointerLeave={() => mouseX.set(Number.POSITIVE_INFINITY)}
        style={{ height: magnification + 16 }}
        className={`flex items-end gap-3 rounded-2xl border bg-card/70 px-4 pb-3 backdrop-blur-xl ${className}`}
      >
        {children}
      </div>
    </DockContext.Provider>
  );
}

interface DockItemProps {
  children: ReactNode;
  /** Name shown in the tooltip above the item, and its accessible name. */
  label: string;
  onClick?: () => void;
  /** Render as a link instead of a button. */
  href?: string;
  className?: string;
}

/**
 * A single dock entry.
 *
 * The label appears on focus as well as hover — a dock whose names only exist
 * on pointer hover is unusable by keyboard and invisible on touch.
 */
export function DockItem({
  children,
  label,
  onClick,
  href,
  className = "",
}: DockItemProps) {
  const { mouseX, size, magnification, reach } = useDock("DockItem");
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  // Horizontal distance from the pointer to this item's centre.
  const distance = useTransform(mouseX, (x) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return Number.POSITIVE_INFINITY;
    return x - bounds.x - bounds.width / 2;
  });

  const targetSize = useTransform(
    distance,
    [-reach, 0, reach],
    [size, magnification, size],
    { clamp: true },
  );

  const width = useSpring(targetSize, {
    mass: 0.1,
    stiffness: 170,
    damping: 14,
  });

  const Interactive = href ? "a" : "button";

  return (
    <motion.div
      ref={ref}
      style={{ width, height: width }}
      onHoverStart={() => setOpen(true)}
      onHoverEnd={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      className="relative flex aspect-square shrink-0 items-end justify-center"
    >
      <AnimatePresence>
        {open ? (
          <motion.span
            role="tooltip"
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            // Centred on the item and lifted clear of it, so it never covers
            // the icon it is naming.
            className="pointer-events-none absolute -top-9 left-1/2 z-10 -translate-x-1/2 rounded-md border bg-popover px-2 py-1 text-xs whitespace-nowrap text-popover-foreground shadow-subtle"
          >
            {label}
          </motion.span>
        ) : null}
      </AnimatePresence>

      <Interactive
        type={href ? undefined : "button"}
        href={href}
        onClick={onClick}
        aria-label={label}
        className={`flex size-full items-center justify-center rounded-xl border bg-background/80 shadow-subtle transition-colors hover:bg-accent ${className}`}
      >
        {children}
      </Interactive>
    </motion.div>
  );
}

export default Dock;
