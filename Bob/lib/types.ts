// Core Pokemon types based on API structure
export interface Pokemon {
  id: string;
  number: number;
  name: string;
  image: string;
  isFavorite: boolean;
  types: PokemonType[];
}

export interface PokemonDetail extends Pokemon {
  weight: {
    minimum: string;
    maximum: string;
  };
  height: {
    minimum: string;
    maximum: string;
  };
  evolutions: Pokemon[];
  previousEvolutions: Pokemon[];
  maxCP: number;
  maxHP: number;
  sound: string;
}

export type PokemonType =
  | "Normal"
  | "Fire"
  | "Water"
  | "Electric"
  | "Grass"
  | "Ice"
  | "Fighting"
  | "Poison"
  | "Ground"
  | "Flying"
  | "Psychic"
  | "Bug"
  | "Rock"
  | "Ghost"
  | "Dragon"
  | "Dark"
  | "Steel"
  | "Fairy";

export interface PokemonListResponse {
  limit: number;
  offset: number;
  count: number;
  items: Pokemon[];
}

export interface PokemonFilters {
  query: string;
  type: PokemonType | "All";
  showFavorites: boolean;
}

export type ViewMode = "grid" | "list";

export interface PokemonStore {
  filters: PokemonFilters;
  viewMode: ViewMode;
  setQuery: (query: string) => void;
  setType: (type: PokemonType | "All") => void;
  setShowFavorites: (show: boolean) => void;
  setViewMode: (mode: ViewMode) => void;
  resetFilters: () => void;
}

// Made with Bob
