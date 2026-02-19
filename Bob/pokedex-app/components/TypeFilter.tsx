"use client";

import { formatPokemonName } from "@/lib/utils";

interface TypeFilterProps {
  types: string[];
  selectedType: string;
  onTypeChange: (type: string) => void;
}

export default function TypeFilter({
  types,
  selectedType,
  onTypeChange,
}: TypeFilterProps) {
  return (
    <div className="w-full sm:w-auto">
      <select
        value={selectedType}
        onChange={(e) => onTypeChange(e.target.value)}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white cursor-pointer"
      >
        <option value="">All Types</option>
        {types.map((type) => (
          <option key={type} value={type}>
            {formatPokemonName(type)}
          </option>
        ))}
      </select>
    </div>
  );
}

// Made with Bob
