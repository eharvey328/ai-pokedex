"use client";

import { useEffect, useState, useRef, use } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  getPokemon,
  getPokemonSpecies,
  getEvolutionChain,
  flattenEvolutionChain,
} from "@/lib/pokeapi";
import { Pokemon } from "@/types/pokemon";
import { typeColors } from "@/lib/typeColors";
import { useFavorites } from "@/hooks/useFavorites";
import FavoriteButton from "@/components/FavoriteButton";
import StatBar from "@/components/StatBar";
import EvolutionChain from "@/components/EvolutionChain";

export default function PokemonDetail({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = use(params);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [evolutions, setEvolutions] = useState<{ name: string; id: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const [poke, species] = await Promise.all([
          getPokemon(name),
          getPokemonSpecies(name),
        ]);
        setPokemon(poke);

        const evoChain = await getEvolutionChain(species.evolution_chain.url);
        setEvolutions(flattenEvolutionChain(evoChain.chain));
      } catch (err) {
        setError("Failed to load Pokémon details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [name]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-red-500">{error || "Pokémon not found"}</p>
        <Link
          href="/"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Back to list
        </Link>
      </div>
    );
  }

  const imageUrl = pokemon.sprites.other["official-artwork"].front_default;
  const types = pokemon.types.map((t) => t.type.name);
  const hp = pokemon.stats.find((s) => s.stat.name === "hp")?.base_stat || 0;
  const attack = pokemon.stats.find((s) => s.stat.name === "attack")?.base_stat || 0;
  const weightKg = pokemon.weight / 10;
  const heightM = pokemon.height / 10;

  return (
    <main className="max-w-2xl mx-auto px-4 py-6">
      <Link
        href="/"
        className="inline-flex items-center text-blue-500 hover:text-blue-700 mb-4"
      >
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </Link>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 flex items-center justify-center p-8">
          <Image
            src={imageUrl}
            alt={pokemon.name}
            width={250}
            height={250}
            className="w-64 h-64 object-contain"
            priority
          />
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <button
                onClick={() => audioRef.current?.play()}
                className="text-gray-400 hover:text-gray-600 mb-2 cursor-pointer"
                aria-label="Play cry"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                </svg>
              </button>
              <audio ref={audioRef} src={pokemon.cries?.latest} />
            </div>
          </div>

          <div className="flex items-center justify-between mt-2">
            <h1 className="text-2xl font-bold capitalize text-gray-800">
              {pokemon.name}
            </h1>
            <FavoriteButton
              isFavorite={isFavorite(pokemon.name)}
              onToggle={() => toggleFavorite(pokemon.name)}
              size="md"
            />
          </div>

          <div className="flex gap-2 mt-2">
            {types.map((type) => (
              <span
                key={type}
                className="text-sm px-3 py-1 rounded-full text-white capitalize"
                style={{ backgroundColor: typeColors[type] || "#777" }}
              >
                {type}
              </span>
            ))}
          </div>

          <div className="mt-4 space-y-2">
            <StatBar label="CP" value={attack} max={200} color="#6390F0" />
            <StatBar label="HP" value={hp} max={255} color="#7AC74C" />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6 text-center">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-500">Weight</p>
              <p className="font-semibold text-gray-800">{weightKg} kg</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-500">Height</p>
              <p className="font-semibold text-gray-800">{heightM} m</p>
            </div>
          </div>

          <EvolutionChain
            evolutions={evolutions}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
          />
        </div>
      </div>
    </main>
  );
}
