import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import {
  Bricolage_Grotesque,
  Instrument_Sans,
  JetBrains_Mono,
} from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Toaster } from "sonner";
import "./globals.css";
import { ThemeProvider } from "@/context/theme-provider";
import { SiteHeader } from "@/components/website/site-header";
import { SiteFooter } from "@/components/website/site-footer";
import { siteConfig, absoluteUrl } from "@/lib/site";

/*
 * Type pairing.
 *
 * Bricolage Grotesque carries the headings. It has real personality at large
 * sizes without the "default framework template" look Geist had picked up.
 * Instrument Sans handles UI and body text, where it stays quiet and legible
 * at 14–17px. JetBrains Mono is the code face: a true 1/l/I distinction and a
 * slashed zero, which matter in a library people read snippets from.
 *
 * All three are variable fonts, self-hosted by next/font at build time, so
 * there is no external request and no layout shift.
 */
const fontDisplay = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const fontSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    // Component pages set a bare title; this gives them a consistent suffix
    // instead of the old `document.title = ...` effect that crawlers never ran.
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "react components",
    "tailwind css components",
    "animated react components",
    "motion",
    "shadcn registry",
    "ui library",
    "typescript",
  ],
  authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
  creator: siteConfig.author.name,
  publisher: siteConfig.author.name,
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [
        { url: absoluteUrl("/api/rss.xml"), title: `${siteConfig.name} Blog` },
      ],
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.description}`,
      },
    ],
  },
  // Note: Next still derives `twitter:card` / `twitter:image` from `openGraph`
  // below. That is framework behaviour with no opt-out in the Metadata API.
  // It only affects how a shared link renders, and suppressing it would mean
  // dropping Open Graph, which Slack, Discord and LinkedIn also read.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/uibeats-icon.png",
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  // The site defaults to dark, so the browser chrome should match on first
  // paint rather than flashing a light bar.
  themeColor: "#131218",
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
};

/** JSON-LD so search engines can render a proper rich result for the site. */
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  author: {
    "@type": "Person",
    name: siteConfig.author.name,
    url: siteConfig.author.url,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/*
        `<body>` is now the only child of `<html>`. The previous layout wrapped
        `<html>`'s children in a context provider and put `<GoogleAnalytics />`
        as a sibling of `<body>`, which is invalid document structure.
      */}
      <body
        className={`${fontSans.variable} ${fontDisplay.variable} ${fontMono.variable} font-sans antialiased`}
      >
        {/* Dark is the default. `enableSystem={false}` matters: with it on,
            next-themes resolves "system" for anyone who has not chosen, and
            light-mode visitors would never see the dark default. */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-lg focus:bg-background focus:px-4 focus:py-2 focus:shadow-raised"
          >
            Skip to content
          </a>
          <SiteHeader />
          <div id="main-content">{children}</div>
          <SiteFooter />
          <Toaster richColors closeButton />
        </ThemeProvider>
        <script
          type="application/ld+json"
          // Static object defined above; no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {process.env.NODE_ENV === "production" ? (
          <GoogleAnalytics gaId={siteConfig.analyticsId} />
        ) : null}
      </body>
    </html>
  );
}
