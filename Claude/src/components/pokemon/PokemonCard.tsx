"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Heart } from "lucide-react";
import { Pokemon } from "@/types/pokemon";
import { TypeBadge } from "@/components/ui/TypeBadge";
import { useFavorite } from "@/hooks/useFavorite";
import { formatPokemonNumber } from "@/lib/utils";
import { getTypeColor } from "@/lib/type-colors";
import { cn } from "@/lib/utils";

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick: (pokemon: Pokemon) => void;
  index?: number;
  viewMode?: "grid" | "list";
}

export function PokemonCard({
  pokemon,
  onClick,
  index = 0,
  viewMode = "grid",
}: PokemonCardProps) {
  const { toggleFavorite } = useFavorite();
  const primaryType = pokemon.types[0];
  const typeColor = getTypeColor(primaryType);

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(pokemon);
  };

  if (viewMode === "list") {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.25, delay: index * 0.03 }}
        onClick={() => onClick(pokemon)}
        className="group glass glass-hover rounded-xl p-3 flex items-center gap-4 cursor-pointer"
      >
        <div className="relative w-14 h-14 shrink-0">
          <div
            className={cn(
              "absolute inset-0 rounded-lg opacity-20 blur-sm",
              `bg-gradient-to-br ${typeColor.gradient}`
            )}
          />
          <Image
            src={pokemon.image}
            alt={pokemon.name}
            fill
            sizes="56px"
            className="object-contain drop-shadow-lg relative z-10 transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-[var(--text-muted)] text-xs font-mono">
            {formatPokemonNumber(pokemon.number)}
          </p>
          <h3 className="font-semibold text-[var(--text-primary)] truncate leading-tight">
            {pokemon.name}
          </h3>
        </div>

        <div className="flex gap-1.5 shrink-0">
          {pokemon.types.map((type) => (
            <TypeBadge key={type} type={type} />
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleFavorite}
          className="shrink-0 p-1.5 rounded-full hover:bg-white/5 transition-colors"
          aria-label={pokemon.isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            size={18}
            className={cn(
              "transition-all duration-200",
              pokemon.isFavorite
                ? "fill-rose-400 stroke-rose-400"
                : "stroke-[var(--text-muted)] group-hover:stroke-rose-400"
            )}
          />
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={() => onClick(pokemon)}
      className="group relative glass glass-hover rounded-2xl overflow-hidden cursor-pointer"
      style={{ boxShadow: pokemon.isFavorite ? `0 0 20px 2px rgba(251,113,133,0.15)` : undefined }}
    >
      {/* Type gradient background */}
      <div
        className={cn(
          "absolute inset-0 opacity-10 transition-opacity duration-300 group-hover:opacity-20",
          `bg-gradient-to-br ${typeColor.gradient}`
        )}
      />

      {/* Pokeball watermark */}
      <div className="absolute top-2 right-2 w-16 h-16 opacity-[0.04] group-hover:opacity-[0.07] transition-opacity">
        <svg viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="4" fill="none" />
          <path d="M2 50h96M26 50a24 24 0 0 1 48 0a24 24 0 0 1-48 0z" fill="currentColor" />
          <circle cx="50" cy="50" r="8" fill="none" stroke="currentColor" strokeWidth="4" />
        </svg>
      </div>

      {/* Favorite button */}
      <motion.button
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.85 }}
        onClick={handleFavorite}
        className="absolute top-2 left-2 z-20 p-1.5 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/40 transition-colors"
        aria-label={pokemon.isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart
          size={16}
          className={cn(
            "transition-all duration-200",
            pokemon.isFavorite
              ? "fill-rose-400 stroke-rose-400"
              : "stroke-white/50 group-hover:stroke-rose-300"
          )}
        />
      </motion.button>

      {/* Pokemon image */}
      <div className="relative pt-6 pb-2 px-4 flex justify-center items-center aspect-square">
        <motion.div
          className="relative w-full h-full max-w-[140px] max-h-[140px]"
          whileHover={{ scale: 1.08 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <Image
            src={pokemon.image}
            alt={pokemon.name}
            fill
            sizes="(max-width: 640px) 140px, 160px"
            className="object-contain drop-shadow-2xl"
            priority={index < 8}
          />
        </motion.div>
      </div>

      {/* Info */}
      <div className="relative z-10 px-4 pb-4">
        <p className="text-[var(--text-muted)] text-[10px] font-mono font-medium tracking-wider mb-0.5">
          {formatPokemonNumber(pokemon.number)}
        </p>
        <h3 className="font-bold text-[var(--text-primary)] text-base leading-tight mb-2 truncate">
          {pokemon.name}
        </h3>
        <div className="flex gap-1.5 flex-wrap">
          {pokemon.types.map((type) => (
            <TypeBadge key={type} type={type} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
