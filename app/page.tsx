import { HeroSection } from "@/components/website/hero-section";
import { SparklingGrid } from "@/components/demo/components/sparkling-grid";
import { useTheme } from "next-themes";

export default function Home() {
  const { theme } = useTheme();

  return (
    <main>
      <HeroSection />
      <SparklingGrid theme={theme || "light"} />
    </main>
  );
}
