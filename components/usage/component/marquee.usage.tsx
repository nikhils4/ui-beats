"use client";
import { Marquee } from "@/components/demo/component/marquee";

const LOGOS = ["Vercel", "Linear", "Stripe", "Figma", "Raycast", "Supabase"];

const MarqueeUsage = () => {
  return (
    <Marquee speed={50} pauseOnHover>
      {LOGOS.map((name) => (
        <div
          key={name}
          className="mx-3 rounded-xl border bg-card px-6 py-3 text-sm font-semibold whitespace-nowrap"
        >
          {name}
        </div>
      ))}
    </Marquee>
  );
};

export default MarqueeUsage;
