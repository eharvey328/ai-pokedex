import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PokemonStore, PokemonType, ViewMode } from "./types";

/**
 * Global store for Pokemon app state
 * Uses Zustand for lightweight state management
 * Persists view mode preference to localStorage
 */
export const usePokemonStore = create<PokemonStore>()(
  persist(
    (set) => ({
      filters: {
        query: "",
        type: "All",
        showFavorites: false,
      },
      viewMode: "grid",
      
      setQuery: (query: string) =>
        set((state) => ({
          filters: { ...state.filters, query },
        })),
      
      setType: (type: PokemonType | "All") =>
        set((state) => ({
          filters: { ...state.filters, type },
        })),
      
      setShowFavorites: (showFavorites: boolean) =>
        set((state) => ({
          filters: { ...state.filters, showFavorites },
        })),
      
      setViewMode: (viewMode: ViewMode) =>
        set({ viewMode }),
      
      resetFilters: () =>
        set((state) => ({
          filters: {
            query: "",
            type: "All",
            showFavorites: false,
          },
        })),
    }),
    {
      name: "pokemon-storage",
      partialize: (state) => ({ viewMode: state.viewMode }),
    }
  )
);

// Made with Bob
