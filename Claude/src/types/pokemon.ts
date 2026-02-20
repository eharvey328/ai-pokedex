export interface PokemonDimension {
  minimum: string;
  maximum: string;
}

export interface PokemonEvolution {
  id: string;
  name: string;
  image: string;
  types: string[];
  isFavorite: boolean;
}

export interface Pokemon {
  id: string;
  number: number;
  name: string;
  image: string;
  sound?: string;
  types: string[];
  isFavorite: boolean;
  maxCP: number;
  maxHP: number;
  weight?: PokemonDimension;
  height?: PokemonDimension;
  evolutions?: PokemonEvolution[];
  previousEvolutions?: PokemonEvolution[];
}

export interface PokemonConnection {
  limit: number;
  offset: number;
  count: number;
  edges: Pokemon[];
}

export interface PokemonsQueryInput {
  limit?: number;
  offset?: number;
  search?: string;
  filter?: {
    type?: string;
    isFavorite?: boolean;
  };
}

export type ViewMode = "grid" | "list";
export type TabMode = "all" | "favorites";
