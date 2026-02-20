import { Pokemon, PokemonConnection } from "@/types/pokemon";

// Query Result Types
export interface GetPokemonsData {
  pokemons: PokemonConnection;
}

export interface GetPokemonByNameData {
  pokemonByName: Pokemon;
}

export interface GetPokemonTypesData {
  pokemonTypes: string[];
}

// Mutation Result Types
export interface FavoritePokemonData {
  favoritePokemon: { id: string; name: string; isFavorite: boolean };
}

export interface UnfavoritePokemonData {
  unFavoritePokemon: { id: string; name: string; isFavorite: boolean };
}
