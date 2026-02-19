import {
  Pokemon,
  PokemonListItem,
  PokemonSpecies,
  EvolutionChainData,
  PokemonCardData,
} from "@/types/pokemon";

const BASE_URL = "https://pokeapi.co/api/v2";

export async function getPokemonList(
  offset = 0,
  limit = 20
): Promise<{ results: PokemonListItem[]; count: number }> {
  const res = await fetch(`${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`);
  if (!res.ok) throw new Error("Failed to fetch Pokemon list");
  return res.json();
}

export async function getPokemon(name: string): Promise<Pokemon> {
  const res = await fetch(`${BASE_URL}/pokemon/${name}`);
  if (!res.ok) throw new Error(`Failed to fetch Pokemon: ${name}`);
  return res.json();
}

export async function getPokemonSpecies(name: string): Promise<PokemonSpecies> {
  const res = await fetch(`${BASE_URL}/pokemon-species/${name}`);
  if (!res.ok) throw new Error(`Failed to fetch species: ${name}`);
  return res.json();
}

export async function getEvolutionChain(url: string): Promise<EvolutionChainData> {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch evolution chain");
  return res.json();
}

export async function getAllPokemonTypes(): Promise<string[]> {
  const res = await fetch(`${BASE_URL}/type`);
  if (!res.ok) throw new Error("Failed to fetch types");
  const data = await res.json();
  return data.results
    .map((t: { name: string }) => t.name)
    .filter((name: string) => name !== "unknown" && name !== "shadow");
}

export async function getPokemonByType(type: string): Promise<string[]> {
  const res = await fetch(`${BASE_URL}/type/${type}`);
  if (!res.ok) throw new Error(`Failed to fetch type: ${type}`);
  const data = await res.json();
  return data.pokemon.map((p: { pokemon: { name: string } }) => p.pokemon.name);
}

export function getPokemonCardData(pokemon: Pokemon): PokemonCardData {
  return {
    id: pokemon.id,
    name: pokemon.name,
    types: pokemon.types.map((t) => t.type.name),
    imageUrl:
      pokemon.sprites.other["official-artwork"].front_default,
  };
}

export function getPokemonImageUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

export function getPokemonIdFromSpeciesUrl(url: string): number {
  const parts = url.replace(/\/$/, "").split("/");
  return parseInt(parts[parts.length - 1], 10);
}

export function flattenEvolutionChain(
  chain: EvolutionChainData["chain"]
): { name: string; id: number }[] {
  const result: { name: string; id: number }[] = [];

  function traverse(node: EvolutionChainData["chain"]) {
    result.push({
      name: node.species.name,
      id: getPokemonIdFromSpeciesUrl(node.species.url),
    });
    for (const next of node.evolves_to) {
      traverse(next);
    }
  }

  traverse(chain);
  return result;
}
