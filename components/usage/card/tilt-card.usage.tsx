"use client";
import { TiltCard } from "@/components/demo/card/tilt-card";

const TiltCardUsage = () => {
  return (
    <TiltCard maxTilt={14} className="w-64">
      <h3 className="text-lg font-semibold">Tilt Card</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Move your cursor across the card to tilt it in 3D.
      </p>
    </TiltCard>
  );
};

export default TiltCardUsage;
