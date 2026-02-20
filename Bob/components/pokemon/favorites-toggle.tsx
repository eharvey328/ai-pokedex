"use client";

import { Button } from "@/components/ui/button";
import { usePokemonStore } from "@/lib/store";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

export function FavoritesToggle() {
  const { filters, setShowFavorites } = usePokemonStore();

  return (
    <div className="flex gap-1 bg-muted p-1 rounded-lg">
      <Button
        variant={!filters.showFavorites ? "default" : "ghost"}
        size="sm"
        onClick={() => setShowFavorites(false)}
        aria-label="Show all Pokemon"
      >
        All
      </Button>
      <Button
        variant={filters.showFavorites ? "default" : "ghost"}
        size="sm"
        onClick={() => setShowFavorites(true)}
        aria-label="Show favorite Pokemon"
        className="gap-2"
      >
        <Heart
          className={cn(
            "w-4 h-4",
            filters.showFavorites && "fill-current"
          )}
        />
        Favorites
      </Button>
    </div>
  );
}

// Made with Bob
