"use client";

import { CreditCard, GitPullRequest, Star, UserPlus } from "lucide-react";
import { AnimatedList } from "@/components/demo/animation/animated-list";

const events = [
  {
    icon: Star,
    title: "New star on ui-beats",
    meta: "just now",
    tone: "text-amber-500",
  },
  {
    icon: CreditCard,
    title: "Payment received · $49.00",
    meta: "1m ago",
    tone: "text-emerald-500",
  },
  {
    icon: UserPlus,
    title: "Priya joined your workspace",
    meta: "2m ago",
    tone: "text-brand",
  },
  {
    icon: GitPullRequest,
    title: "PR #218 ready for review",
    meta: "4m ago",
    tone: "text-sky-500",
  },
];

const AnimatedListUsage = () => {
  return (
    <div className="w-full max-w-sm">
      <AnimatedList delay={1300} max={3}>
        {events.map(({ icon: Icon, title, meta, tone }) => (
          <div
            key={title}
            className="flex items-center gap-3 rounded-xl border bg-card p-3 shadow-subtle"
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
              <Icon className={`size-4 ${tone}`} />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{title}</p>
              <p className="text-xs text-muted-foreground">{meta}</p>
            </div>
          </div>
        ))}
      </AnimatedList>
    </div>
  );
};

export default AnimatedListUsage;
