"use client";

import { Button } from "@/components/ui/button";
import { usePokemonStore } from "@/lib/store";
import { Grid3x3, List } from "lucide-react";

export function ViewModeToggle() {
  const { viewMode, setViewMode } = usePokemonStore();

  return (
    <div className="flex gap-1 bg-muted p-1 rounded-lg">
      <Button
        variant={viewMode === "grid" ? "default" : "ghost"}
        size="sm"
        onClick={() => setViewMode("grid")}
        aria-label="Grid view"
        className="gap-2"
      >
        <Grid3x3 className="w-4 h-4" />
        <span className="hidden sm:inline">Grid</span>
      </Button>
      <Button
        variant={viewMode === "list" ? "default" : "ghost"}
        size="sm"
        onClick={() => setViewMode("list")}
        aria-label="List view"
        className="gap-2"
      >
        <List className="w-4 h-4" />
        <span className="hidden sm:inline">List</span>
      </Button>
    </div>
  );
}

// Made with Bob
