import {
  Pokemon,
  PokemonListResponse,
  PokemonSpecies,
  EvolutionChain,
  TypeResponse,
} from "@/types/pokemon";

const BASE_URL = "https://pokeapi.co/api/v2";

export async function fetchPokemonList(
  limit: number = 20,
  offset: number = 0,
): Promise<PokemonListResponse> {
  const response = await fetch(
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch Pokemon list");
  }
  return response.json();
}

export async function fetchPokemon(
  nameOrId: string | number,
): Promise<Pokemon> {
  const response = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon: ${nameOrId}`);
  }
  return response.json();
}

export async function fetchPokemonSpecies(id: number): Promise<PokemonSpecies> {
  const response = await fetch(`${BASE_URL}/pokemon-species/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon species: ${id}`);
  }
  return response.json();
}

export async function fetchEvolutionChain(
  url: string,
): Promise<EvolutionChain> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch evolution chain");
  }
  return response.json();
}

export async function fetchTypes(): Promise<TypeResponse> {
  const response = await fetch(`${BASE_URL}/type`);
  if (!response.ok) {
    throw new Error("Failed to fetch types");
  }
  return response.json();
}

export async function fetchPokemonByType(type: string): Promise<{
  pokemon: Array<{ pokemon: { name: string; url: string } }>;
}> {
  const response = await fetch(`${BASE_URL}/type/${type}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon by type: ${type}`);
  }
  return response.json();
}

export async function searchPokemon(query: string): Promise<Pokemon | null> {
  try {
    const pokemon = await fetchPokemon(query.toLowerCase());
    return pokemon;
  } catch (error) {
    return null;
  }
}

// Made with Bob
