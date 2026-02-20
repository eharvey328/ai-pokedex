import { Pokemon, PokemonDetail, PokemonListResponse, PokemonType } from "./types";

const API_BASE_URL = "https://quantum-coding-excercise-api.vercel.app/api/rest";

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public data?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Fetch wrapper with error handling
 */
async function fetchApi<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new ApiError(
        `API request failed: ${response.statusText}`,
        response.status
      );
    }

    return response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
  }
}

/**
 * Get paginated list of Pokemon with optional filters
 */
export async function getPokemon(params: {
  limit?: number;
  offset?: number;
  query?: string;
  type?: PokemonType;
}): Promise<PokemonListResponse> {
  const searchParams = new URLSearchParams();
  
  if (params.limit) searchParams.append("limit", params.limit.toString());
  if (params.offset) searchParams.append("offset", params.offset.toString());
  if (params.query) searchParams.append("query", params.query);
  if (params.type) searchParams.append("type", params.type);

  const url = `${API_BASE_URL}/pokemon?${searchParams.toString()}`;
  return fetchApi<PokemonListResponse>(url);
}

/**
 * Get detailed information about a specific Pokemon
 */
export async function getPokemonById(id: string): Promise<PokemonDetail> {
  const url = `${API_BASE_URL}/pokemon/${id}`;
  return fetchApi<PokemonDetail>(url);
}

/**
 * Toggle favorite status of a Pokemon
 */
export async function toggleFavorite(
  id: string,
  isFavorite: boolean
): Promise<PokemonDetail> {
  const url = `${API_BASE_URL}/pokemon/${id}/${isFavorite ? "unfavorite" : "favorite"}`;
  return fetchApi<PokemonDetail>(url, {
    method: "POST",
  });
}

/**
 * Prefetch Pokemon data for better performance
 */
export function prefetchPokemon(id: string): void {
  // This will be used with React Query's prefetch
  const url = `${API_BASE_URL}/pokemon/${id}`;
  fetch(url).catch(() => {
    // Silently fail prefetch
  });
}

// Made with Bob
