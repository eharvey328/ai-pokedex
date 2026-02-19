"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Pokemon } from "@/types/pokemon";
import { formatPokemonName, formatPokemonId, getTypeColor } from "@/lib/utils";
import { isFavorite, toggleFavorite } from "@/lib/favorites";

interface PokemonCardProps {
  pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const [isFav, setIsFav] = useState(() => isFavorite(pokemon.id));

  useEffect(() => {
    const handleFavoritesChange = () => {
      setIsFav(isFavorite(pokemon.id));
    };

    window.addEventListener("favoritesChanged", handleFavoritesChange);
    return () => {
      window.removeEventListener("favoritesChanged", handleFavoritesChange);
    };
  }, [pokemon.id]);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newFavState = toggleFavorite(pokemon.id);
    setIsFav(newFavState);
    window.dispatchEvent(new Event("favoritesChanged"));
  };

  const imageUrl =
    pokemon.sprites.other["official-artwork"].front_default ||
    pokemon.sprites.front_default;

  return (
    <Link href={`/pokemon/${pokemon.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer group">
        <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-6">
          <button
            onClick={handleFavoriteClick}
            className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white shadow-md hover:scale-110 transition-transform"
            aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
          >
            <svg
              className={`w-6 h-6 ${
                isFav ? "fill-red-500" : "fill-gray-300"
              } transition-colors`}
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
          <div className="relative w-full h-48 flex items-center justify-center">
            <Image
              src={imageUrl}
              alt={pokemon.name}
              width={192}
              height={192}
              className="object-contain group-hover:scale-110 transition-transform duration-300"
              priority={false}
            />
          </div>
        </div>
        <div className="p-4">
          <p className="text-sm text-gray-500 font-semibold">
            {formatPokemonId(pokemon.id)}
          </p>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            {formatPokemonName(pokemon.name)}
          </h3>
          <div className="flex gap-2 flex-wrap">
            {pokemon.types.map((type) => (
              <span
                key={type.type.name}
                className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${getTypeColor(
                  type.type.name,
                )}`}
              >
                {formatPokemonName(type.type.name)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

// Made with Bob
