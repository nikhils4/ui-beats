"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, Loader2 } from "lucide-react";

/**
 * Native button props minus the handlers Motion redefines with its own
 * signatures: spreading React's DOM versions onto `motion.button` conflicts.
 */
type NativeButtonProps = Omit<
  ComponentPropsWithoutRef<"button">,
  | "ref"
  | "style"
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onAnimationIteration"
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
>;

interface LoadingButtonProps extends NativeButtonProps {
  children: ReactNode;
  /** The work to run on click. The button stays busy until this settles. */
  onAction?: () => void | Promise<void>;
  /** Label while the action is in flight. */
  loadingText?: string;
  /** Label shown briefly once the action resolves. */
  successText?: string;
  /** Seconds the success label stays up before the button returns to idle. */
  successDuration?: number;
  className?: string;
}

type Status = "idle" | "loading" | "success";

/**
 * A submit button that runs one async action and reports on it in place.
 *
 * The button owns the busy state rather than taking it as a prop, because the
 * two things that usually go wrong with a submit button are both timing bugs a
 * caller has to remember to avoid: a second click landing while the first
 * request is still open, and the busy flag never clearing on the failure path.
 * Here the click is ignored unless the status is `idle`, and the status is
 * restored in a `finally`, so a rejected action returns the button to idle
 * instead of stranding it on a spinner.
 *
 * The spinner keeps turning under `prefers-reduced-motion`: it is the only
 * signal that the request is still open, but the width and label transitions
 * are dropped.
 */
export function LoadingButton({
  children,
  onAction,
  loadingText = "Saving",
  successText = "Saved",
  successDuration = 1.6,
  className = "",
  onClick,
  disabled,
  ...props
}: LoadingButtonProps) {
  const [status, setStatus] = useState<Status>("idle");
  const prefersReducedMotion = useReducedMotion();
  // The action is awaited, so the component can unmount before it settles.
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (status !== "success") return;
    const timer = setTimeout(
      () => setStatus("idle"),
      Math.max(0, successDuration) * 1000,
    );
    return () => clearTimeout(timer);
  }, [status, successDuration]);

  const handleClick = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      // Refused before the caller's handler runs. The button is `aria-disabled`
      // rather than `disabled` while busy, so the browser still delivers the
      // click and this guard is the only thing standing between an impatient
      // second press and a duplicate request.
      if (status !== "idle") return;
      onClick?.(event);

      setStatus("loading");
      try {
        await onAction?.();
        if (mounted.current) setStatus("success");
      } catch {
        // The caller owns error reporting; the button's only job is to stop
        // claiming the request is still running.
        if (mounted.current) setStatus("idle");
      }
    },
    [onAction, onClick, status],
  );

  const label =
    status === "loading"
      ? loadingText
      : status === "success"
        ? successText
        : children;

  return (
    <motion.button
      layout={!prefersReducedMotion}
      transition={{ type: "spring", stiffness: 320, damping: 30 }}
      onClick={handleClick}
      /*
       * Busy is `aria-disabled`, not `disabled`. A real `disabled` attribute
       * drops focus in most browsers, and the button is almost always focused
       * at that moment because the click is what made it busy, so the label
       * change to "Saving" would go unannounced by the screen reader that most
       * needed it. The click is refused by `handleClick` either way.
       */
      disabled={disabled}
      aria-disabled={disabled || status !== "idle"}
      aria-busy={status === "loading"}
      data-status={status}
      className={`relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none aria-disabled:cursor-not-allowed data-[status=success]:bg-emerald-600 ${className}`}
      {...props}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={status}
          className="flex items-center gap-2 whitespace-nowrap"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
        >
          {status === "loading" && (
            <Loader2 className="size-4 shrink-0 animate-spin" />
          )}
          {status === "success" && <Check className="size-4 shrink-0" />}
          {label}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}

export default LoadingButton;
