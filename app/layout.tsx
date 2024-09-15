import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/theme-provider";
import { GeistSans } from "geist/font/sans";
import { Header } from "@/components/website/header";
import { Footer } from "@/components/website/footer";
import { WebsiteContextProvider } from "@/context/website-context";
import { ReactNode } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "UIBeats",
  description:
    "Supercharge your UI with UIBeats! Reusable components crafted with React, TypeScript, Tailwind CSS, and Framer Motion for dynamic, responsive interfaces.",
  metadataBase: new URL("https://uibeats.com"),
  applicationName: "UIBeats",
  authors: [{ name: "Nikhil Singh", url: "https://nikhils.ca" }],
  creator: "Nikhil Singh",
  openGraph: {
    title: "UIBeats",
    description:
      "Supercharge your UI with UIBeats! Reusable components crafted with React, TypeScript, Tailwind CSS, and Framer Motion for dynamic, responsive interfaces.",
    url: "https://uibeats.com",
    type: "website",
    images: [
      {
        url: "/uibeats-social-media.png",
        alt: "UIBeats social media image",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
  icons: {
    icon: "/uibeats-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <WebsiteContextProvider>
        <body className={GeistSans.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
            <Footer />
          </ThemeProvider>
        </body>
        <GoogleAnalytics gaId="G-E5FVREP9R1" />
      </WebsiteContextProvider>
    </html>
  );
}
