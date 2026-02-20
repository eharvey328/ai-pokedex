"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePokemonStore } from "@/lib/store";
import { PokemonType } from "@/lib/types";
import { getAllPokemonTypes } from "@/lib/utils";

export function TypeFilter() {
  const { filters, setType } = usePokemonStore();
  const types = getAllPokemonTypes();

  return (
    <Select
      value={filters.type}
      onValueChange={(value) => setType(value as PokemonType | "All")}
    >
      <SelectTrigger className="w-[180px]" aria-label="Filter by type">
        <SelectValue placeholder="Filter by type" />
      </SelectTrigger>
      <SelectContent>
        {types.map((type) => (
          <SelectItem key={type} value={type}>
            {type}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

// Made with Bob
