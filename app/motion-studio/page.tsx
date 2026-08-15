import type { Metadata } from "next";
import { Studio } from "@/components/website/studio";
import { getStudioComponents } from "@/lib/studio";
import { absoluteUrl, siteConfig } from "@/lib/site";

const title = "Motion Studio: cubic bezier and spring editor for React";
const description =
  "Tune any UI Beats component live, shape its easing curve or spring, and copy the code. Free, no sign-up.";

export const metadata: Metadata = {
  // Absolute, because this is a tool page that should rank on its own terms
  // rather than reading as a subsection of the component library.
  title: { absolute: title },
  description,
  keywords: [
    "cubic bezier editor",
    "easing curve generator",
    "react spring editor",
    "framer motion easing",
    "motion transition generator",
    "css cubic-bezier generator",
    "react component playground",
  ],
  alternates: { canonical: absoluteUrl("/motion-studio") },
  openGraph: {
    title,
    description,
    url: absoluteUrl("/motion-studio"),
    type: "website",
    siteName: siteConfig.name,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Motion Studio",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  url: absoluteUrl("/motion-studio"),
  description,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  isPartOf: { "@type": "WebSite", name: siteConfig.name, url: siteConfig.url },
};

export default function MotionStudioPage() {
  const components = getStudioComponents();

  return (
    /*
     * The studio fills the viewport under the site header (`h-16`) and takes
     * its own scrolling from there, so on a desktop the stage, the snippet and
     * every control are on screen at once with no page scroll at all.
     */
    <main className="flex w-full min-w-0 flex-col lg:h-[calc(100svh-4rem)] lg:overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="shrink-0 border-b px-4 py-3 sm:px-6">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h1 className="text-lg font-bold tracking-tight">Motion Studio</h1>
          <p className="text-sm text-muted-foreground">
            Pick a component, tune its props, shape its easing.
          </p>
        </div>
      </header>

      <Studio components={components} className="lg:min-h-0 lg:flex-1" />
    </main>
  );
}
