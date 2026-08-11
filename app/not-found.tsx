import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70svh] items-center justify-center px-4">
      <div className="text-center">
        <p className="text-sm font-medium text-muted-foreground">404</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          This page doesn&apos;t exist
        </h1>
        <p className="mt-3 text-muted-foreground">
          The page you&apos;re looking for was moved or never existed.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {/* Client-side navigation via Link, rather than a
              `window.location.href` assignment that reloaded the whole app. */}
          <Button asChild>
            <Link href="/">Back to home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/docs/getting-started/introduction">Browse docs</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
