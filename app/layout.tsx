import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/theme-provider";
import { GeistSans } from "geist/font/sans";
import { Header } from "@/components/website/header";
import { Footer } from "@/components/website/footer";
import { WebsiteContextProvider } from "@/context/website-context";
import { ReactNode } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";

export const metadata: Metadata = {
  title: "ui/beats",
  description:
    "Supercharge your UI with ui/beats! Reusable components crafted with React, TypeScript, Tailwind CSS, and Framer Motion for dynamic, responsive interfaces.",
  metadataBase: new URL("https://uibeats.com"),
  applicationName: "ui/beats",
  authors: [{ name: "Nikhil Singh", url: "https://nikhils.ca" }],
  creator: "Nikhil Singh",
  openGraph: {
    title: "ui/beats",
    description:
      "Supercharge your UI with ui/beats! Reusable components crafted with React, TypeScript, Tailwind CSS, and Framer Motion for dynamic, responsive interfaces.",
    url: "https://uibeats.com",
    type: "website",
    images: [
      {
        url: "/uibeats-social-media.png",
        alt: "ui/beats social media image",
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
          <Script id="blog-assets" strategy="afterInteractive">
            {`
            if (window.location.pathname.startsWith('/blogs')) {
              const linkEl = document.createElement('link');
              linkEl.rel = 'stylesheet';
              linkEl.href = '/api/blog/_next/static/css/app/blogs/layout.css';
              document.head.appendChild(linkEl);

              const scriptEl = document.createElement('script');
              scriptEl.src = '/api/blog/_next/static/chunks/app/blogs/page.js';
              document.body.appendChild(scriptEl);
            }
          `}
          </Script>
        </body>
        <GoogleAnalytics gaId="G-E5FVREP9R1" />
      </WebsiteContextProvider>
    </html>
  );
}
