"use client";

import { ConfettiButton } from "@/components/demo/button/confetti-button";

const ConfettiButtonUsage = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <ConfettiButton>Ship it</ConfettiButton>
      <p className="text-sm text-muted-foreground">
        The burst starts at the button, not the top of the screen.
      </p>
    </div>
  );
};

export default ConfettiButtonUsage;
