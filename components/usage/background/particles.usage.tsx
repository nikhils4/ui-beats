"use client";

import { Particles } from "@/components/demo/background/particles";

const ParticlesUsage = () => {
  return (
    <div className="relative size-full overflow-hidden bg-background">
      <Particles className="text-foreground" />

      <div className="pointer-events-none relative z-10 flex size-full flex-col items-center justify-center px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tighter">Drift</h2>
        <p className="mt-2 max-w-xs text-sm text-muted-foreground">
          Sixty specks on a canvas, scattering out of the way wherever the
          pointer goes.
        </p>
      </div>
    </div>
  );
};

export default ParticlesUsage;
