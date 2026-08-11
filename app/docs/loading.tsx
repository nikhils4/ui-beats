import { Skeleton } from "@/components/ui/skeleton";

export default function DocsLoading() {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <Skeleton className="h-5 w-64" />
      <Skeleton className="mt-6 h-9 w-1/2" />
      <Skeleton className="mt-3 h-5 w-3/4" />
      <Skeleton className="mt-8 h-72 w-full rounded-xl" />
      <Skeleton className="mt-10 h-40 w-full rounded-xl" />
    </div>
  );
}
