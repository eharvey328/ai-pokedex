"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { usePokemonDetail, useToggleFavorite } from "@/lib/hooks/use-pokemon";
import { cn, formatPokemonNumber, formatRange, getTypeColor } from "@/lib/utils";
import { motion } from "framer-motion";
import { Heart, Volume2, Weight, Ruler, Zap, Activity } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface PokemonDetailModalProps {
  pokemonId: string | null;
  onClose: () => void;
}

export function PokemonDetailModal({
  pokemonId,
  onClose,
}: PokemonDetailModalProps) {
  const { data: pokemon, isLoading } = usePokemonDetail(pokemonId);
  const toggleFavorite = useToggleFavorite();
  const [imageError, setImageError] = useState(false);
  const [isPlayingSound, setIsPlayingSound] = useState(false);

  const handleFavoriteClick = () => {
    if (pokemon) {
      toggleFavorite.mutate({ id: pokemon.id, isFavorite: pokemon.isFavorite });
    }
  };

  const playSound = () => {
    if (pokemon?.sound && !isPlayingSound) {
      setIsPlayingSound(true);
      const audio = new Audio(pokemon.sound);
      audio.play().catch(() => {
        // Silently fail if audio can't play
      });
      audio.onended = () => setIsPlayingSound(false);
    }
  };

  return (
    <Dialog open={!!pokemonId} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        {isLoading || !pokemon ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-64 w-full" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-24" />
              <Skeleton className="h-24" />
            </div>
          </div>
        ) : (
          <>
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle className="text-3xl font-bold">
                  {pokemon.name}
                  <span className="text-lg text-muted-foreground ml-2 font-mono">
                    {formatPokemonNumber(pokemon.number)}
                  </span>
                </DialogTitle>
                <div className="flex gap-2">
                  {pokemon.sound && (
                    <button
                      onClick={playSound}
                      disabled={isPlayingSound}
                      className="p-2 rounded-full hover:bg-accent transition-colors disabled:opacity-50"
                      aria-label="Play Pokemon cry"
                    >
                      <Volume2
                        className={cn(
                          "w-6 h-6",
                          isPlayingSound && "animate-pulse"
                        )}
                      />
                    </button>
                  )}
                  <button
                    onClick={handleFavoriteClick}
                    className="p-2 rounded-full hover:bg-accent transition-colors"
                    aria-label={
                      pokemon.isFavorite
                        ? "Remove from favorites"
                        : "Add to favorites"
                    }
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
                </div>
              </div>
            </DialogHeader>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Image Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative aspect-square bg-gradient-to-br from-muted/50 to-muted rounded-xl overflow-hidden"
              >
                {!imageError ? (
                  <Image
                    src={pokemon.image}
                    alt={pokemon.name}
                    fill
                    className="object-contain p-8"
                    onError={() => setImageError(true)}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-9xl text-muted-foreground">
                    ?
                  </div>
                )}
              </motion.div>

              {/* Info Section */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                {/* Types */}
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                    Type
                  </h3>
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

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-card border border-border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Weight className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-semibold">Weight</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {formatRange(pokemon.weight.minimum, pokemon.weight.maximum)}
                    </p>
                  </div>

                  <div className="bg-card border border-border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Ruler className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-semibold">Height</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {formatRange(pokemon.height.minimum, pokemon.height.maximum)}
                    </p>
                  </div>

                  <div className="bg-card border border-border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-semibold">Max CP</span>
                    </div>
                    <p className="text-lg font-bold">{pokemon.maxCP}</p>
                  </div>

                  <div className="bg-card border border-border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-semibold">Max HP</span>
                    </div>
                    <p className="text-lg font-bold">{pokemon.maxHP}</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Evolutions */}
            {(pokemon.previousEvolutions.length > 0 ||
              pokemon.evolutions.length > 0) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-bold">Evolution Chain</h3>
                <div className="flex flex-wrap gap-4 items-center">
                  {/* Previous Evolutions */}
                  {pokemon.previousEvolutions.map((evo) => (
                    <EvolutionCard key={evo.id} pokemon={evo} />
                  ))}

                  {/* Current Pokemon */}
                  <div className="relative">
                    <EvolutionCard pokemon={pokemon} isCurrent />
                  </div>

                  {/* Next Evolutions */}
                  {pokemon.evolutions.map((evo) => (
                    <EvolutionCard key={evo.id} pokemon={evo} />
                  ))}
                </div>
              </motion.div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function EvolutionCard({
  pokemon,
  isCurrent = false,
}: {
  pokemon: { id: string; name: string; image: string; number: number };
  isCurrent?: boolean;
}) {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-2 p-3 rounded-lg border transition-all",
        isCurrent
          ? "border-primary bg-primary/10 ring-2 ring-primary"
          : "border-border bg-card hover:border-primary/50"
      )}
    >
      <div className="relative w-20 h-20">
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
      <div className="text-center">
        <p className="text-xs text-muted-foreground font-mono">
          {formatPokemonNumber(pokemon.number)}
        </p>
        <p className="text-sm font-semibold">{pokemon.name}</p>
      </div>
    </div>
  );
}

// Made with Bob
