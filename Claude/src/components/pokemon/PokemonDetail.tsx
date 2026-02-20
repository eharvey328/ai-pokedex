"use client";

import { useQuery } from "@apollo/client/react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Heart, Volume2, ChevronRight, Loader2 } from "lucide-react";
import { useRef, useCallback } from "react";
import { GET_POKEMON_BY_NAME } from "@/lib/graphql/queries";
import type { GetPokemonByNameData } from "@/lib/graphql/types";
import { Pokemon } from "@/types/pokemon";
import { TypeBadge } from "@/components/ui/TypeBadge";
import { StatBar } from "@/components/ui/StatBar";
import { useFavorite } from "@/hooks/useFavorite";
import { getTypeColor } from "@/lib/type-colors";
import { formatPokemonNumber, cn } from "@/lib/utils";

interface PokemonDetailProps {
  pokemonName: string | null;
  onClose: () => void;
  onNavigate: (name: string) => void;
}

export function PokemonDetail({ pokemonName, onClose, onNavigate }: PokemonDetailProps) {
  const { data, loading, error } = useQuery<GetPokemonByNameData>(GET_POKEMON_BY_NAME, {
    variables: { name: pokemonName ?? "" },
    skip: !pokemonName,
  });

  const { toggleFavorite } = useFavorite();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const pokemon: Pokemon | null = data?.pokemonByName ?? null;
  const primaryType = pokemon?.types[0];
  const typeColor = primaryType ? getTypeColor(primaryType) : null;

  const handlePlaySound = useCallback(() => {
    if (!pokemon?.sound) return;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    const audio = new Audio(pokemon.sound);
    audioRef.current = audio;
    audio.volume = 0.5;
    audio.play().catch(() => {});
  }, [pokemon?.sound]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <AnimatePresence>
      {pokemonName && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }}
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full sm:max-w-lg max-h-[92dvh] sm:max-h-[85dvh] overflow-y-auto rounded-t-3xl sm:rounded-3xl"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-full glass hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </motion.button>

            {/* Loading state */}
            {loading && (
              <div className="flex items-center justify-center h-80">
                <Loader2 className="animate-spin text-indigo-400" size={32} />
              </div>
            )}

            {/* Error state */}
            {error && (
              <div className="flex flex-col items-center justify-center h-80 gap-4 text-[var(--text-secondary)]">
                <p className="text-lg">Failed to load Pokémon</p>
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  Close
                </button>
              </div>
            )}

            {pokemon && typeColor && (
              <>
                {/* Hero section */}
                <div
                  className={cn(
                    "relative overflow-hidden",
                    `bg-gradient-to-br ${typeColor.gradient}`
                  )}
                  style={{ opacity: 0.9 }}
                >
                  <div className="absolute inset-0 opacity-10">
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      <circle cx="100" cy="100" r="90" fill="none" stroke="white" strokeWidth="8" />
                      <path d="M10 100h180M50 100a50 50 0 0 1 100 0a50 50 0 0 1-100 0z" fill="white" />
                      <circle cx="100" cy="100" r="15" fill="none" stroke="white" strokeWidth="8" />
                    </svg>
                  </div>
                  <div className="relative z-10 pt-12 pb-8 flex flex-col items-center">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
                      className="relative w-40 h-40"
                    >
                      <Image
                        src={pokemon.image}
                        alt={pokemon.name}
                        fill
                        sizes="160px"
                        className="object-contain drop-shadow-2xl"
                        priority
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[var(--text-muted)] text-sm font-mono">
                        {formatPokemonNumber(pokemon.number)}
                      </p>
                      <h2 className="text-3xl font-bold text-[var(--text-primary)] mt-0.5">
                        {pokemon.name}
                      </h2>
                      <div className="flex gap-2 mt-2">
                        {pokemon.types.map((type) => (
                          <TypeBadge key={type} type={type} size="md" />
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {pokemon.sound && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={handlePlaySound}
                          className="p-2.5 rounded-full glass hover:bg-white/10 transition-colors"
                          aria-label="Play cry"
                          title="Play Pokémon cry"
                        >
                          <Volume2 size={18} className="text-[var(--text-secondary)]" />
                        </motion.button>
                      )}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleFavorite(pokemon)}
                        className="p-2.5 rounded-full glass hover:bg-white/10 transition-colors"
                        aria-label={pokemon.isFavorite ? "Remove from favorites" : "Add to favorites"}
                      >
                        <Heart
                          size={18}
                          className={cn(
                            "transition-all duration-200",
                            pokemon.isFavorite
                              ? "fill-rose-400 stroke-rose-400"
                              : "stroke-[var(--text-secondary)]"
                          )}
                        />
                      </motion.button>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                      Base Stats
                    </h3>
                    <StatBar label="Max CP" value={pokemon.maxCP} max={5000} color="bg-indigo-500" delay={0.1} />
                    <StatBar label="Max HP" value={pokemon.maxHP} max={5000} color="bg-emerald-500" delay={0.2} />
                  </div>

                  {/* Dimensions */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="glass rounded-xl p-4 text-center">
                      <p className="text-[var(--text-muted)] text-xs uppercase tracking-wider mb-1">Weight</p>
                      <p className="font-semibold text-[var(--text-primary)]">
                        {pokemon.weight?.minimum} – {pokemon.weight?.maximum}
                      </p>
                    </div>
                    <div className="glass rounded-xl p-4 text-center">
                      <p className="text-[var(--text-muted)] text-xs uppercase tracking-wider mb-1">Height</p>
                      <p className="font-semibold text-[var(--text-primary)]">
                        {pokemon.height?.minimum} – {pokemon.height?.maximum}
                      </p>
                    </div>
                  </div>

                  {/* Evolution chain */}
                  {((pokemon.previousEvolutions?.length ?? 0) > 0 || (pokemon.evolutions?.length ?? 0) > 0) && (
                    <div className="space-y-3">
                      <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                        Evolution Chain
                      </h3>
                      <div className="flex items-center gap-2 overflow-x-auto pb-1">
                        {/* Previous evolutions */}
                        {pokemon.previousEvolutions?.map((evo) => (
                          <EvolutionNode
                            key={evo.id}
                            pokemon={evo}
                            onClick={() => onNavigate(evo.name)}
                            isCurrent={false}
                          />
                        ))}

                        {/* Current */}
                        {(pokemon.previousEvolutions?.length ?? 0) > 0 && (
                          <ChevronRight size={16} className="text-[var(--text-muted)] shrink-0" />
                        )}
                        <EvolutionNode
                          pokemon={pokemon}
                          onClick={() => {}}
                          isCurrent={true}
                        />

                        {/* Next evolutions */}
                        {pokemon.evolutions?.map((evo) => (
                          <div key={evo.id} className="flex items-center gap-2 shrink-0">
                            <ChevronRight size={16} className="text-[var(--text-muted)]" />
                            <EvolutionNode
                              pokemon={evo}
                              onClick={() => onNavigate(evo.name)}
                              isCurrent={false}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface EvolutionNodeProps {
  pokemon: { id: string; name: string; image: string; types: string[]; isFavorite: boolean };
  onClick: () => void;
  isCurrent: boolean;
}

function EvolutionNode({ pokemon, onClick, isCurrent }: EvolutionNodeProps) {
  const typeColor = getTypeColor(pokemon.types[0]);

  return (
    <motion.button
      whileHover={!isCurrent ? { scale: 1.05 } : undefined}
      whileTap={!isCurrent ? { scale: 0.95 } : undefined}
      onClick={onClick}
      disabled={isCurrent}
      className={cn(
        "flex flex-col items-center gap-1.5 p-2 rounded-xl text-center shrink-0 transition-colors",
        isCurrent
          ? "ring-2 ring-indigo-500/50 bg-indigo-500/10 cursor-default"
          : "glass glass-hover cursor-pointer"
      )}
    >
      <div
        className={cn(
          "relative w-14 h-14 rounded-lg overflow-hidden",
          `bg-gradient-to-br ${typeColor.gradient} opacity-80`
        )}
      >
        <Image
          src={pokemon.image}
          alt={pokemon.name}
          fill
          sizes="56px"
          className="object-contain p-1 drop-shadow-md"
        />
      </div>
      <span className="text-xs font-medium text-[var(--text-primary)] whitespace-nowrap">
        {pokemon.name}
      </span>
    </motion.button>
  );
}
