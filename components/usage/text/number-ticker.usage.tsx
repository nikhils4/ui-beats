"use client";
import { NumberTicker } from "@/components/demo/text/number-ticker";

const NumberTickerUsage = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-10 text-center">
      <div>
        <NumberTicker value={12480} className="text-3xl font-bold" />
        <p className="mt-1 text-xs text-muted-foreground">Downloads</p>
      </div>
      <div>
        <NumberTicker
          value={99.9}
          decimals={1}
          suffix="%"
          className="text-3xl font-bold text-brand"
        />
        <p className="mt-1 text-xs text-muted-foreground">Uptime</p>
      </div>
    </div>
  );
};

export default NumberTickerUsage;
