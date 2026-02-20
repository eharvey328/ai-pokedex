"use client";

import { useQuery } from "@apollo/client/react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useCallback } from "react";
import { Frown } from "lucide-react";
import { GET_POKEMONS } from "@/lib/graphql/queries";
import type { GetPokemonsData } from "@/lib/graphql/types";
import { Pokemon, PokemonsQueryInput } from "@/types/pokemon";
import { PokemonCard } from "./PokemonCard";
import { SkeletonGrid } from "@/components/ui/SkeletonCard";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 20;

interface PokemonGridProps {
  queryInput: PokemonsQueryInput;
  onPokemonClick: (pokemon: Pokemon) => void;
  viewMode: "grid" | "list";
}

export function PokemonGrid({ queryInput, onPokemonClick, viewMode }: PokemonGridProps) {
  const sentinelRef = useRef<HTMLDivElement>(null);

  const variables = {
    query: {
      limit: PAGE_SIZE,
      offset: 0,
      ...(queryInput.search ? { search: queryInput.search } : {}),
      ...(queryInput.filter && Object.keys(queryInput.filter).length > 0
        ? { filter: queryInput.filter }
        : {}),
    },
  };

  const { data, loading, error, fetchMore } = useQuery<GetPokemonsData>(GET_POKEMONS, {
    variables,
    notifyOnNetworkStatusChange: true,
  });

  const pokemons: Pokemon[] = data?.pokemons?.edges ?? [];
  const totalCount: number = data?.pokemons?.count ?? 0;
  const hasMore = pokemons.length < totalCount;

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;
    fetchMore({
      variables: {
        query: {
          ...variables.query,
          offset: pokemons.length,
        },
      },
    });
  }, [loading, hasMore, fetchMore, pokemons.length, variables.query]);

  // Infinite scroll via IntersectionObserver
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4 text-[var(--text-secondary)]">
        <Frown size={48} className="text-[var(--text-muted)]" />
        <p className="text-lg font-medium">Failed to load Pokémon</p>
        <p className="text-sm text-[var(--text-muted)]">{error.message}</p>
      </div>
    );
  }

  if (loading && pokemons.length === 0) {
    return <SkeletonGrid count={PAGE_SIZE} viewMode={viewMode} />;
  }

  if (!loading && pokemons.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-24 gap-4 text-[var(--text-secondary)]"
      >
        <div className="text-6xl">🔍</div>
        <p className="text-xl font-semibold text-[var(--text-primary)]">No Pokémon found</p>
        <p className="text-sm text-[var(--text-muted)]">
          Try adjusting your search or filters
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {totalCount > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[var(--text-muted)] text-sm"
        >
          Showing {pokemons.length} of {totalCount} Pokémon
        </motion.p>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={`${viewMode}-${queryInput.search}-${queryInput.filter?.type}-${queryInput.filter?.isFavorite}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            viewMode === "grid"
              ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
              : "flex flex-col gap-3"
          )}
        >
          {pokemons.map((pokemon, index) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              onClick={onPokemonClick}
              index={index % PAGE_SIZE}
              viewMode={viewMode}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Infinite scroll sentinel */}
      <div ref={sentinelRef} className="h-1" />

      {/* Loading more indicator */}
      {loading && pokemons.length > 0 && (
        <div className="flex justify-center py-8">
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-indigo-500"
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </div>
      )}

      {!hasMore && pokemons.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8 text-[var(--text-muted)] text-sm"
        >
          All {totalCount} Pokémon loaded
        </motion.div>
      )}
    </div>
  );
}
