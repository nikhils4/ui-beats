import type { Metadata } from "next";
import { ReactNode } from "react";
import { SideNav } from "@/components/website/side-nav";

export const metadata: Metadata = {
  title: "ui/beats",
  description: "Develop effortless stunning UI with reusable components",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      <aside className="hidden md:block w-64 px-8 py-8 overflow-auto">
        <SideNav />
      </aside>
      <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
        <div className="w-full container">{children}</div>
        <div className="hidden text-sm xl:block">The very right column</div>
      </main>
    </div>
  );
}
