import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Skeleton */}
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Skeleton className="w-12 h-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-4 w-40" />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Skeleton className="h-10 flex-1 max-w-md" />
              <Skeleton className="h-10 w-[180px]" />
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </div>
      </header>

      {/* Content Skeleton */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="bg-card rounded-xl border border-border overflow-hidden">
              <Skeleton className="aspect-square" />
              <div className="p-4 space-y-3">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-6 w-24" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

// Made with Bob
