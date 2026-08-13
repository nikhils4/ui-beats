"use client";

import { useEffect, useState } from "react";
import { SplitFlap } from "@/components/demo/text/split-flap";

const board = ["DEPARTURES", "NOW BOARDING", "ON TIME", "UI BEATS"];

const SplitFlapUsage = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setIndex((current) => (current + 1) % board.length),
      3200,
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <SplitFlap text={board[index] ?? ""} className="text-lg sm:text-2xl" />
      <p className="text-xs text-muted-foreground">
        Every column flips until it finds its letter.
      </p>
    </div>
  );
};

export default SplitFlapUsage;
