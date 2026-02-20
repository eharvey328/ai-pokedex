"use client";

import { usePokemonList } from "@/lib/hooks/use-pokemon";
import { usePokemonStore } from "@/lib/store";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { PokemonCard } from "./pokemon-card";
import { PokemonCardSkeleton } from "./pokemon-card-skeleton";
import { PokemonDetailModal } from "./pokemon-detail-modal";

export function PokemonList() {
  const { filters, viewMode } = usePokemonStore();
  const [selectedPokemonId, setSelectedPokemonId] = useState<string | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = usePokemonList(filters.query, filters.type, filters.showFavorites);

  // Infinite scroll trigger
  const { ref: loadMoreRef } = useInView({
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    threshold: 0.1,
  });

  // Get all Pokemon from pages
  const allPokemon = data?.pages.flatMap((page) => page.items) ?? [];

  // Loading state
  if (isLoading) {
    return (
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "flex flex-col gap-4"
        }
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <PokemonCardSkeleton key={i} viewMode={viewMode} />
        ))}
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-12 text-center"
      >
        <AlertCircle className="w-12 h-12 text-destructive mb-4" />
        <h3 className="text-lg font-semibold mb-2">Oops! Something went wrong</h3>
        <p className="text-muted-foreground max-w-md">
          {error instanceof Error ? error.message : "Failed to load Pokemon"}
        </p>
      </motion.div>
    );
  }

  // Empty state
  if (allPokemon.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-12 text-center"
      >
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-lg font-semibold mb-2">No Pokemon found</h3>
        <p className="text-muted-foreground max-w-md">
          {filters.showFavorites
            ? "You haven't added any favorites yet. Click the heart icon on Pokemon cards to add them!"
            : "Try adjusting your search or filters"}
        </p>
      </motion.div>
    );
  }

  return (
    <>
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "flex flex-col gap-4"
        }
      >
        <AnimatePresence mode="popLayout">
          {allPokemon.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              onClick={() => setSelectedPokemonId(pokemon.id)}
              viewMode={viewMode}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Infinite scroll trigger */}
      {hasNextPage && (
        <div ref={loadMoreRef} className="flex justify-center py-8">
          {isFetchingNextPage && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Loading more Pokemon...</span>
            </div>
          )}
        </div>
      )}

      {/* Detail Modal */}
      <PokemonDetailModal
        pokemonId={selectedPokemonId}
        onClose={() => setSelectedPokemonId(null)}
      />
    </>
  );
}

// Made with Bob
