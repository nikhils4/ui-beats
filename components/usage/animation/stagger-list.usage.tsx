"use client";
import { StaggerList } from "@/components/demo/animation/stagger-list";

const StaggerListUsage = () => {
  return (
    <StaggerList stagger={0.1} className="space-y-2">
      {["Design", "Build", "Animate", "Ship"].map((label) => (
        <div
          key={label}
          className="rounded-lg border bg-card px-4 py-2 text-sm"
        >
          {label}
        </div>
      ))}
    </StaggerList>
  );
};

export default StaggerListUsage;
