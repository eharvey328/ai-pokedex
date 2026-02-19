export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface Pokemon {
  id: number;
  name: string;
  types: PokemonType[];
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  stats: PokemonStat[];
  weight: number;
  height: number;
  cries: {
    latest: string;
  };
}

export interface PokemonSpecies {
  evolution_chain: {
    url: string;
  };
}

export interface EvolutionDetail {
  species: {
    name: string;
    url: string;
  };
  evolves_to: EvolutionDetail[];
}

export interface EvolutionChainData {
  chain: EvolutionDetail;
}

export interface PokemonCardData {
  id: number;
  name: string;
  types: string[];
  imageUrl: string;
}
