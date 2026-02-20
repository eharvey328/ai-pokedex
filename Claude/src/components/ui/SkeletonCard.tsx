"use client";

import { cn } from "@/lib/utils";

interface SkeletonCardProps {
  viewMode?: "grid" | "list";
}

export function SkeletonCard({ viewMode = "grid" }: SkeletonCardProps) {
  if (viewMode === "list") {
    return (
      <div className="glass rounded-xl p-4 flex items-center gap-4 animate-pulse">
        <div className="w-16 h-16 rounded-lg shimmer shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 shimmer rounded w-1/3" />
          <div className="h-3 shimmer rounded w-1/4" />
        </div>
        <div className="flex gap-2">
          <div className="h-5 w-14 shimmer rounded-full" />
        </div>
        <div className="w-8 h-8 shimmer rounded-full" />
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl overflow-hidden animate-pulse">
      <div className="aspect-square shimmer" />
      <div className="p-4 space-y-3">
        <div className="h-3 shimmer rounded w-1/3" />
        <div className="h-5 shimmer rounded w-1/2" />
        <div className="flex gap-2">
          <div className="h-5 w-16 shimmer rounded-full" />
          <div className="h-5 w-16 shimmer rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 20, viewMode = "grid" }: { count?: number; viewMode?: "grid" | "list" }) {
  return (
    <div
      className={cn(
        viewMode === "grid"
          ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          : "flex flex-col gap-3"
      )}
    >
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} viewMode={viewMode} />
      ))}
    </div>
  );
}
