"use client";

import Image from "next/image";
import Link from "next/link";
import { getPokemonImageUrl } from "@/lib/pokeapi";
import FavoriteButton from "./FavoriteButton";

interface EvolutionChainProps {
  evolutions: { name: string; id: number }[];
  isFavorite: (name: string) => boolean;
  onToggleFavorite: (name: string) => void;
}

export default function EvolutionChain({
  evolutions,
  isFavorite,
  onToggleFavorite,
}: EvolutionChainProps) {
  if (evolutions.length <= 1) return null;

  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold text-gray-800 mb-3">Evolutions</h2>
      <div className="flex flex-wrap gap-4">
        {evolutions.map((evo) => (
          <Link
            key={evo.name}
            href={`/pokemon/${evo.name}`}
            className="flex flex-col items-center bg-gray-50 rounded-lg p-3 border border-gray-200 hover:shadow-md transition-shadow"
          >
            <Image
              src={getPokemonImageUrl(evo.id)}
              alt={evo.name}
              width={80}
              height={80}
              className="w-20 h-20 object-contain"
            />
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm font-medium capitalize text-gray-700">
                {evo.name}
              </span>
              <FavoriteButton
                isFavorite={isFavorite(evo.name)}
                onToggle={() => onToggleFavorite(evo.name)}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
