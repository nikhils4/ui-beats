"use client";
import { Hero } from "@/components/demo/block/hero";

const TEAM = [
  { name: "Ava Chen" },
  { name: "Marcus Hale" },
  { name: "Priya Nair" },
  { name: "Diego Ramos" },
  { name: "Yuki Tanaka" },
  { name: "Noor Haddad" },
];

const HeroUsage = () => {
  return (
    <Hero
      eyebrow="Now with 40 components"
      title={
        <>
          Ship the section, <span className="text-primary">not the setup</span>
        </>
      }
      description="Install one block and it brings every component it uses along with it."
      primaryAction={{ label: "Get started", href: "#" }}
      secondaryAction={{ label: "Read the docs", href: "#" }}
      avatars={TEAM}
      proof="Joined by 2,400 teams"
    />
  );
};

export default HeroUsage;
