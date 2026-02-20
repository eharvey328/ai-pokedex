import { Skeleton } from "@/components/ui/skeleton";

interface PokemonCardSkeletonProps {
  viewMode: "grid" | "list";
}

export function PokemonCardSkeleton({ viewMode }: PokemonCardSkeletonProps) {
  if (viewMode === "list") {
    return (
      <div className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border">
        <Skeleton className="w-20 h-20 flex-shrink-0 rounded-lg" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-6 w-32" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
        </div>
        <Skeleton className="w-10 h-10 rounded-full" />
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
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
  );
}

// Made with Bob
