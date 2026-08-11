import { HeroSection } from "@/components/website/hero-section";
import { ComponentShowcase } from "@/components/website/component-showcase";
import { CategoryIndex } from "@/components/website/category-index";
import { getRegistry } from "@/lib/registry";

export default function HomePage() {
  const registry = getRegistry();
  // The hero used to advertise a hardcoded "Last Update — Dec 06" that had to
  // be edited by hand and was months stale. Both numbers are derived now.
  const newest = registry.filter((entry) => entry.isNew);

  return (
    <main>
      <HeroSection
        componentCount={registry.length}
        latestComponent={newest.at(-1)?.title}
        latestHref={newest.at(-1)?.href}
      />
      <ComponentShowcase total={registry.length} />
      <CategoryIndex entries={registry} />
    </main>
  );
}
