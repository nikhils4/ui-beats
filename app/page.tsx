import { HeroSection } from "@/components/website/hero-section";
import { BlocksShowcase } from "@/components/website/blocks-showcase";
import { ComponentShowcase } from "@/components/website/component-showcase";
import { OwnTheCode } from "@/components/website/own-the-code";
import { BuiltForYourWorkflow } from "@/components/website/built-for-your-workflow";
import { FinalCta } from "@/components/website/final-cta";
import { getNewestComponents, getRegistry } from "@/lib/registry";

export default function HomePage() {
  const registry = getRegistry();
  // The hero used to advertise a hardcoded "Last Update: Dec 06" that had to
  // be edited by hand and was months stale. Everything is derived now. The
  // featured component comes from each config's `addedAt` instead of a flag
  // read in category order, which showed a component added two years ago.
  const [latest] = getNewestComponents(1);

  return (
    <main>
      <HeroSection
        componentCount={registry.length}
        latestComponent={latest?.title}
        latestHref={latest?.href}
        // Only what the ticker renders crosses the server/client boundary.
        // Full registry entries carry every component's source with them.
        components={registry.map((entry) => ({
          title: entry.title,
          href: entry.href,
        }))}
      />
      {/*
        Four sections, down from six.
        Show it working, say what you get, say what you can do with it, ask for
        the click. Two sections went: "Why UI Beats" was four paragraphs of
        specification that belongs in the docs, and the full A-Z index was
        duplicating the ticker in the hero, which already links every single
        component. Neither was earning the scroll it cost.
      */}
      {/* The live grid goes first. Blocks are the shortest path to a finished
          section, but they are sold in words, and words landing before anyone
          has seen a single component running is an argument with nothing
          behind it. Show the parts, then say they also come assembled. */}
      <ComponentShowcase total={registry.length} />
      <BlocksShowcase />
      <OwnTheCode />
      <BuiltForYourWorkflow />
      <FinalCta componentCount={registry.length} />
    </main>
  );
}
