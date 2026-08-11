import React from "react";
import GlowingCard from "@/components/demo/card/glowing-card";

const GlowingCardUsage = () => {
  return (
    <GlowingCard>
      <div className="mb-2 text-sm font-semibold">Glowing Card</div>
      <div className="text-xs">
        Hover over this card to see the glowing effect. The glow follows your
        cursor movement.
      </div>
      <div className="mt-auto text-right text-xs">Next</div>
    </GlowingCard>
  );
};

export default GlowingCardUsage;
