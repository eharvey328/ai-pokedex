"use client";

import { useEffect, useRef } from "react";
import PokemonCard from "./PokemonCard";
import { PokemonCardData } from "@/types/pokemon";

interface PokemonGridProps {
  pokemon: PokemonCardData[];
  viewMode: "grid" | "list";
  isFavorite: (name: string) => boolean;
  onToggleFavorite: (name: string) => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
  loading?: boolean;
}

export default function PokemonGrid({
  pokemon,
  viewMode,
  isFavorite,
  onToggleFavorite,
  onLoadMore,
  hasMore,
  loading,
}: PokemonGridProps) {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!onLoadMore || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          onLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    const el = sentinelRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [onLoadMore, hasMore, loading]);

  if (pokemon.length === 0 && !loading) {
    return (
      <div className="text-center py-12 text-gray-500">
        No Pokémon found.
      </div>
    );
  }

  return (
    <div>
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
            : "flex flex-col gap-2"
        }
      >
        {pokemon.map((p) => (
          <PokemonCard
            key={p.name}
            pokemon={p}
            isFavorite={isFavorite(p.name)}
            onToggleFavorite={() => onToggleFavorite(p.name)}
            viewMode={viewMode}
          />
        ))}
      </div>
      {loading && (
        <div className="flex justify-center py-8">
          <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      {hasMore && <div ref={sentinelRef} className="h-4" />}
    </div>
  );
}
