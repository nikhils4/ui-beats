import React from "react";
import GlowingCard from "@/components/demo/modern-animation/glowing-card";

const GlowingCardUsage = () => {
  return (
    <GlowingCard>
      <div className="text-sm font-semibold mb-2">Glowing Card</div>
      <div className="text-xs">
        Hover over this card to see the glowing effect. The glow follows your
        cursor movement.
      </div>
      <div className="mt-auto text-xs text-right">Next</div>
    </GlowingCard>
  );
};

GlowingCardUsage.stringVersion = `<GlowingCard>    
  <div className="text-sm font-semibold mb-2">Glowing Card</div>
  <div className="text-xs">
    Hover over this card to see the glowing effect. The glow follows your cursor movement.
  </div>
  <div className="mt-auto text-xs text-right">
    Next
  </div>
</GlowingCard>`;

export default GlowingCardUsage;
