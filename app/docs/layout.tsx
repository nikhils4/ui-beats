import { ReactNode } from "react";
import { SideNav } from "@/components/website/side-nav";
import { Bug, Edit3 } from "lucide-react";

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
          <div className="space-y-2">
            <ul className="m-0 list-none">
              <li className="mt-0 pt-2">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                  href="https://github.com/nikhils4/ui-beats/issues"
                >
                  <Bug className="h-4 w-4 mr-2" />
                  Report an issue
                </a>
              </li>
              <li className="mt-0 pt-2">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                  href="https://github.com/nikhils4/ui-beats"
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  Request a feature
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
