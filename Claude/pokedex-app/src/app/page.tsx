"use client";

import { useState, useEffect, useCallback } from "react";
import SearchBar from "@/components/SearchBar";
import TypeFilter from "@/components/TypeFilter";
import ViewToggle from "@/components/ViewToggle";
import TabSwitcher from "@/components/TabSwitcher";
import PokemonGrid from "@/components/PokemonGrid";
import { useFavorites } from "@/hooks/useFavorites";
import {
  getPokemonList,
  getPokemon,
  getAllPokemonTypes,
  getPokemonByType,
  getPokemonCardData,
} from "@/lib/pokeapi";
import { PokemonCardData } from "@/types/pokemon";

const PAGE_SIZE = 20;

export default function Home() {
  const [allPokemon, setAllPokemon] = useState<PokemonCardData[]>([]);
  const [displayPokemon, setDisplayPokemon] = useState<PokemonCardData[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "favorites">("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [typeFilteredNames, setTypeFilteredNames] = useState<Set<string> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { favorites, toggleFavorite, isFavorite, loaded: favoritesLoaded } = useFavorites();

  // Load types on mount
  useEffect(() => {
    getAllPokemonTypes().then(setTypes).catch(console.error);
  }, []);

  // Load type filter
  useEffect(() => {
    if (!selectedType) {
      setTypeFilteredNames(null);
      return;
    }
    getPokemonByType(selectedType)
      .then((names) => setTypeFilteredNames(new Set(names)))
      .catch(console.error);
  }, [selectedType]);

  // Fetch Pokemon page
  const fetchPage = useCallback(async (currentOffset: number) => {
    setLoading(true);
    setError(null);
    try {
      const { results, count } = await getPokemonList(currentOffset, PAGE_SIZE);
      const details = await Promise.all(
        results.map((p) => getPokemon(p.name).then(getPokemonCardData))
      );
      setAllPokemon((prev) =>
        currentOffset === 0 ? details : [...prev, ...details]
      );
      setOffset(currentOffset + PAGE_SIZE);
      setHasMore(currentOffset + PAGE_SIZE < count);
    } catch (err) {
      setError("Failed to load Pokémon. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchPage(0);
  }, [fetchPage]);

  // Filter and search
  useEffect(() => {
    let filtered = allPokemon;

    if (activeTab === "favorites") {
      filtered = filtered.filter((p) => favorites.has(p.name));
    }

    if (typeFilteredNames) {
      filtered = filtered.filter((p) => typeFilteredNames.has(p.name));
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter((p) => p.name.toLowerCase().includes(q));
    }

    setDisplayPokemon(filtered);
  }, [allPokemon, activeTab, favorites, typeFilteredNames, searchQuery]);

  const handleLoadMore = useCallback(() => {
    if (!loading && hasMore) {
      fetchPage(offset);
    }
  }, [loading, hasMore, offset, fetchPage]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error && allPokemon.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => fetchPage(0)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Pokédex</h1>

      <TabSwitcher activeTab={activeTab} onSwitch={setActiveTab} />

      <div className="flex flex-col sm:flex-row gap-3 mt-4 mb-4">
        <div className="flex-1">
          <SearchBar onSearch={handleSearch} />
        </div>
        <TypeFilter
          types={types}
          selectedType={selectedType}
          onSelectType={setSelectedType}
        />
        <ViewToggle viewMode={viewMode} onToggle={setViewMode} />
      </div>

      <PokemonGrid
        pokemon={displayPokemon}
        viewMode={viewMode}
        isFavorite={isFavorite}
        onToggleFavorite={toggleFavorite}
        onLoadMore={activeTab === "all" && !selectedType && !searchQuery ? handleLoadMore : undefined}
        hasMore={activeTab === "all" && !selectedType && !searchQuery && hasMore}
        loading={loading}
      />

      {!favoritesLoaded && activeTab === "favorites" && (
        <div className="text-center py-8 text-gray-500">Loading favorites...</div>
      )}
    </main>
  );
}
