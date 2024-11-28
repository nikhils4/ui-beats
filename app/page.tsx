"use client";
import { HeroSection } from "@/components/website/hero-section";
import { SparklingGrid } from "@/components/demo/background/sparkling-grid";
import { useTheme } from "next-themes";

export default function Home() {
  const { theme } = useTheme() as { theme: "light" | "dark" };

  return (
    <main>
      <HeroSection />
      <SparklingGrid theme={theme || "light"} />
    </main>
  );
}
