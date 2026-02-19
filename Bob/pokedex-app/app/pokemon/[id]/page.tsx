"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Pokemon,
  PokemonSpecies,
  EvolutionChain,
  EvolutionChainLink,
} from "@/types/pokemon";
import {
  fetchPokemon,
  fetchPokemonSpecies,
  fetchEvolutionChain,
} from "@/lib/api";
import {
  formatPokemonName,
  formatPokemonId,
  getTypeColor,
  getStatName,
} from "@/lib/utils";
import { isFavorite, toggleFavorite } from "@/lib/favorites";
import Loading from "@/components/Loading";

interface EvolutionData {
  id: number;
  name: string;
  imageUrl: string;
}

export default function PokemonDetail() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [species, setSpecies] = useState<PokemonSpecies | null>(null);
  const [evolutions, setEvolutions] = useState<EvolutionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const loadPokemonData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch Pokemon data
        const pokemonData = await fetchPokemon(id);
        setPokemon(pokemonData);
        setIsFav(isFavorite(pokemonData.id));

        // Fetch species data
        const speciesData = await fetchPokemonSpecies(pokemonData.id);
        setSpecies(speciesData);

        // Fetch evolution chain
        if (speciesData.evolution_chain?.url) {
          const evolutionData = await fetchEvolutionChain(
            speciesData.evolution_chain.url,
          );
          const evolutionList = await parseEvolutionChain(evolutionData.chain);
          setEvolutions(evolutionList);
        }
      } catch (err) {
        setError("Failed to load Pokemon data. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPokemonData();
  }, [id]);

  const parseEvolutionChain = async (
    chain: EvolutionChainLink,
  ): Promise<EvolutionData[]> => {
    const evolutions: EvolutionData[] = [];

    const traverse = async (link: EvolutionChainLink) => {
      const pokemonId = parseInt(link.species.url.split("/").slice(-2, -1)[0]);
      const pokemonData = await fetchPokemon(pokemonId);

      evolutions.push({
        id: pokemonId,
        name: link.species.name,
        imageUrl:
          pokemonData.sprites.other["official-artwork"].front_default ||
          pokemonData.sprites.front_default,
      });

      for (const evolution of link.evolves_to) {
        await traverse(evolution);
      }
    };

    await traverse(chain);
    return evolutions;
  };

  const handleFavoriteClick = () => {
    if (pokemon) {
      const newFavState = toggleFavorite(pokemon.id);
      setIsFav(newFavState);
      window.dispatchEvent(new Event("favoritesChanged"));
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Loading />
      </main>
    );
  }

  if (error || !pokemon) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-xl mb-4">
            {error || "Pokemon not found"}
          </p>
          <Link
            href="/"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  const imageUrl =
    pokemon.sprites.other["official-artwork"].front_default ||
    pokemon.sprites.front_default;

  const description = species?.flavor_text_entries
    .find((entry) => entry.language.name === "en")
    ?.flavor_text.replace(/\f/g, " ");

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="md:flex">
            {/* Left Side - Image */}
            <div className="md:w-1/2 bg-gradient-to-br from-gray-50 to-gray-100 p-8 flex flex-col items-center justify-center relative">
              <button
                onClick={handleFavoriteClick}
                className="absolute top-4 right-4 p-3 rounded-full bg-white shadow-md hover:scale-110 transition-transform"
                aria-label={
                  isFav ? "Remove from favorites" : "Add to favorites"
                }
              >
                <svg
                  className={`w-8 h-8 ${
                    isFav ? "fill-red-500" : "fill-gray-300"
                  } transition-colors`}
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </button>
              <Image
                src={imageUrl}
                alt={pokemon.name}
                width={400}
                height={400}
                className="object-contain"
                priority
              />
            </div>

            {/* Right Side - Details */}
            <div className="md:w-1/2 p-8">
              <div className="mb-4">
                <p className="text-gray-500 font-semibold text-lg">
                  {formatPokemonId(pokemon.id)}
                </p>
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                  {formatPokemonName(pokemon.name)}
                </h1>
                <div className="flex gap-2 mb-4">
                  {pokemon.types.map((type) => (
                    <span
                      key={type.type.name}
                      className={`px-4 py-2 rounded-full text-white font-semibold ${getTypeColor(
                        type.type.name,
                      )}`}
                    >
                      {formatPokemonName(type.type.name)}
                    </span>
                  ))}
                </div>
                {description && (
                  <p className="text-gray-700 leading-relaxed">{description}</p>
                )}
              </div>

              {/* Physical Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600 text-sm">Height</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {(pokemon.height / 10).toFixed(1)} m
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600 text-sm">Weight</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {(pokemon.weight / 10).toFixed(1)} kg
                  </p>
                </div>
              </div>

              {/* Abilities */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Abilities
                </h3>
                <div className="flex flex-wrap gap-2">
                  {pokemon.abilities.map((ability) => (
                    <span
                      key={ability.ability.name}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold"
                    >
                      {formatPokemonName(ability.ability.name)}
                      {ability.is_hidden && " (Hidden)"}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Base Stats
                </h3>
                <div className="space-y-2">
                  {pokemon.stats.map((stat) => (
                    <div key={stat.stat.name}>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-700 font-semibold">
                          {getStatName(stat.stat.name)}
                        </span>
                        <span className="text-gray-600">{stat.base_stat}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all"
                          style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Evolution Chain */}
          {evolutions.length > 1 && (
            <div className="border-t border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Evolution Chain
              </h2>
              <div className="flex flex-wrap items-center justify-center gap-8">
                {evolutions.map((evo, index) => (
                  <div key={evo.id} className="flex items-center">
                    <Link href={`/pokemon/${evo.id}`}>
                      <div
                        className={`text-center cursor-pointer transition-transform hover:scale-110 ${
                          evo.id === pokemon.id
                            ? "ring-4 ring-blue-500 rounded-lg"
                            : ""
                        }`}
                      >
                        <div className="bg-gray-50 rounded-lg p-4 mb-2">
                          <Image
                            src={evo.imageUrl}
                            alt={evo.name}
                            width={120}
                            height={120}
                            className="object-contain"
                          />
                        </div>
                        <p className="font-semibold text-gray-800">
                          {formatPokemonName(evo.name)}
                        </p>
                      </div>
                    </Link>
                    {index < evolutions.length - 1 && (
                      <svg
                        className="w-8 h-8 text-gray-400 mx-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

// Made with Bob
