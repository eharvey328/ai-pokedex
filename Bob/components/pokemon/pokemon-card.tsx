"use client";

import { Pokemon } from "@/lib/types";
import { cn, formatPokemonNumber, getTypeColor } from "@/lib/utils";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useToggleFavorite } from "@/lib/hooks/use-pokemon";

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick: () => void;
  viewMode: "grid" | "list";
}

export function PokemonCard({ pokemon, onClick, viewMode }: PokemonCardProps) {
  const [imageError, setImageError] = useState(false);
  const toggleFavorite = useToggleFavorite();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite.mutate({ id: pokemon.id, isFavorite: pokemon.isFavorite });
  };

  if (viewMode === "list") {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        whileHover={{ scale: 1.02 }}
        className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border hover:shadow-lg transition-shadow cursor-pointer"
        onClick={onClick}
      >
        <div className="relative w-20 h-20 flex-shrink-0">
          {!imageError ? (
            <Image
              src={pokemon.image}
              alt={pokemon.name}
              fill
              className="object-contain"
              onError={() => setImageError(true)}
              sizes="80px"
            />
          ) : (
            <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
              ?
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm text-muted-foreground font-mono">
              {formatPokemonNumber(pokemon.number)}
            </span>
            <h3 className="text-lg font-semibold truncate">{pokemon.name}</h3>
          </div>
          <div className="flex gap-2 flex-wrap">
            {pokemon.types.map((type) => (
              <span
                key={type}
                className={cn("type-badge", getTypeColor(type))}
              >
                {type}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={handleFavoriteClick}
          className="p-2 rounded-full hover:bg-accent transition-colors"
          aria-label={pokemon.isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            className={cn(
              "w-6 h-6 transition-colors",
              pokemon.isFavorite
                ? "fill-red-500 text-red-500"
                : "text-muted-foreground"
            )}
          />
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="group relative bg-card rounded-xl border border-border overflow-hidden cursor-pointer card-hover"
      onClick={onClick}
    >
      <div className="absolute top-2 right-2 z-10">
        <button
          onClick={handleFavoriteClick}
          className="p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
          aria-label={pokemon.isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            className={cn(
              "w-5 h-5 transition-colors",
              pokemon.isFavorite
                ? "fill-red-500 text-red-500"
                : "text-muted-foreground"
            )}
          />
        </button>
      </div>

      <div className="aspect-square relative bg-gradient-to-br from-muted/50 to-muted p-4">
        {!imageError ? (
          <Image
            src={pokemon.image}
            alt={pokemon.name}
            fill
            className="object-contain p-4 group-hover:scale-110 transition-transform duration-300"
            onError={() => setImageError(true)}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={pokemon.number <= 20}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl text-muted-foreground">
            ?
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-muted-foreground font-mono">
            {formatPokemonNumber(pokemon.number)}
          </span>
        </div>
        <h3 className="text-lg font-bold mb-3 truncate">{pokemon.name}</h3>
        <div className="flex gap-2 flex-wrap">
          {pokemon.types.map((type) => (
            <span
              key={type}
              className={cn("type-badge text-xs", getTypeColor(type))}
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Made with Bob
