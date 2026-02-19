"use client";

import { typeColors } from "@/lib/typeColors";

interface TypeFilterProps {
  types: string[];
  selectedType: string;
  onSelectType: (type: string) => void;
}

export default function TypeFilter({
  types,
  selectedType,
  onSelectType,
}: TypeFilterProps) {
  return (
    <select
      value={selectedType}
      onChange={(e) => onSelectType(e.target.value)}
      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-800 capitalize"
      style={
        selectedType
          ? { backgroundColor: typeColors[selectedType] || undefined, color: "white" }
          : undefined
      }
    >
      <option value="">All Types</option>
      {types.map((type) => (
        <option key={type} value={type} className="capitalize">
          {type}
        </option>
      ))}
    </select>
  );
}
