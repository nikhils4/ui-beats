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
    <div className="flex flex-col min-h-screen md:flex-row">
      <aside className="hidden md:block w-64 px-8 py-8 overflow-y-auto">
        <SideNav />
      </aside>
      <div className="flex flex-col flex-grow md:flex-row">
        <main className="flex-grow p-4 md:p-6 lg:p-8 overflow-x-auto">
          <div className="max-w-full md:max-w-3xl lg:max-w-4xl xl:max-w-4xl mx-auto">
            {children}
          </div>
        </main>
        <div className="hidden xl:block w-64 px-8 py-8">
          <div className="text-sm">The very right column</div>
        </div>
      </div>
    </div>
  );
}
