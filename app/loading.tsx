import { Skeleton } from "@/components/ui/skeleton";

/** Route-level loading fallback so navigations show structure, not a blank frame. */
export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 pt-16 pb-24">
      <Skeleton className="h-9 w-2/3" />
      <Skeleton className="mt-4 h-5 w-full" />
      <Skeleton className="mt-2 h-5 w-5/6" />
      <Skeleton className="mt-10 h-72 w-full rounded-xl" />
    </div>
  );
}
