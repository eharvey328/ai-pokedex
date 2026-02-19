"use client";

import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "./FavoriteButton";
import { PokemonCardData } from "@/types/pokemon";
import { typeColors } from "@/lib/typeColors";

interface PokemonCardProps {
  pokemon: PokemonCardData;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  viewMode: "grid" | "list";
}

export default function PokemonCard({
  pokemon,
  isFavorite,
  onToggleFavorite,
  viewMode,
}: PokemonCardProps) {
  if (viewMode === "list") {
    return (
      <Link
        href={`/pokemon/${pokemon.name}`}
        className="flex items-center gap-4 bg-white rounded-lg border border-gray-200 p-3 hover:shadow-md transition-shadow"
      >
        <Image
          src={pokemon.imageUrl}
          alt={pokemon.name}
          width={64}
          height={64}
          className="w-16 h-16 object-contain"
        />
        <div className="flex-1 min-w-0">
          <p className="font-semibold capitalize text-gray-800 truncate">
            {pokemon.name}
          </p>
          <div className="flex gap-1 mt-1">
            {pokemon.types.map((type) => (
              <span
                key={type}
                className="text-xs px-2 py-0.5 rounded-full text-white capitalize"
                style={{ backgroundColor: typeColors[type] || "#777" }}
              >
                {type}
              </span>
            ))}
          </div>
        </div>
        <FavoriteButton isFavorite={isFavorite} onToggle={onToggleFavorite} />
      </Link>
    );
  }

  return (
    <Link
      href={`/pokemon/${pokemon.name}`}
      className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow flex flex-col items-center"
    >
      <div className="w-full flex justify-end">
        <FavoriteButton isFavorite={isFavorite} onToggle={onToggleFavorite} />
      </div>
      <Image
        src={pokemon.imageUrl}
        alt={pokemon.name}
        width={120}
        height={120}
        className="w-28 h-28 object-contain"
      />
      <p className="font-semibold capitalize text-gray-800 mt-2">
        {pokemon.name}
      </p>
      <div className="flex gap-1 mt-1">
        {pokemon.types.map((type) => (
          <span
            key={type}
            className="text-xs px-2 py-0.5 rounded-full text-white capitalize"
            style={{ backgroundColor: typeColors[type] || "#777" }}
          >
            {type}
          </span>
        ))}
      </div>
    </Link>
  );
}
