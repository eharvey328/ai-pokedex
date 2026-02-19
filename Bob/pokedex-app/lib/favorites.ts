"use client";

const FAVORITES_KEY = "pokemon-favorites";

export function getFavorites(): number[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function addFavorite(pokemonId: number): void {
  const favorites = getFavorites();
  if (!favorites.includes(pokemonId)) {
    favorites.push(pokemonId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
}

export function removeFavorite(pokemonId: number): void {
  const favorites = getFavorites();
  const updated = favorites.filter((id) => id !== pokemonId);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
}

export function isFavorite(pokemonId: number): boolean {
  return getFavorites().includes(pokemonId);
}

export function toggleFavorite(pokemonId: number): boolean {
  const favorites = getFavorites();
  const isFav = favorites.includes(pokemonId);

  if (isFav) {
    removeFavorite(pokemonId);
    return false;
  } else {
    addFavorite(pokemonId);
    return true;
  }
}

// Made with Bob
