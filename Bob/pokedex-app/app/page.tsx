"use client";

import { useState, useEffect, useCallback } from "react";
import { Pokemon } from "@/types/pokemon";
import {
  fetchPokemonList,
  fetchPokemon,
  fetchTypes,
  fetchPokemonByType,
} from "@/lib/api";
import { getFavorites } from "@/lib/favorites";
import { getPokemonId } from "@/lib/utils";
import PokemonCard from "@/components/PokemonCard";
import SearchBar from "@/components/SearchBar";
import TypeFilter from "@/components/TypeFilter";
import Loading from "@/components/Loading";

export default function Home() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [types, setTypes] = useState<string[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const ITEMS_PER_PAGE = 20;

  // Load types on mount
  useEffect(() => {
    const loadTypes = async () => {
      try {
        const typesData = await fetchTypes();
        const typeNames = typesData.results
          .map((t) => t.name)
          .filter((name) => !["unknown", "shadow"].includes(name));
        setTypes(typeNames);
      } catch (err) {
        console.error("Failed to load types:", err);
      }
    };
    loadTypes();
  }, []);

  // Load Pokemon
  const loadPokemon = useCallback(async (pageNum: number) => {
    try {
      setLoading(true);
      const offset = pageNum * ITEMS_PER_PAGE;
      const data = await fetchPokemonList(ITEMS_PER_PAGE, offset);

      const pokemonDetails = await Promise.all(
        data.results.map((p) => fetchPokemon(p.name)),
      );

      setPokemon((prev) => {
        const newPokemon =
          pageNum === 0 ? pokemonDetails : [...prev, ...pokemonDetails];
        return newPokemon;
      });

      setHasMore(data.next !== null);
      setError(null);
    } catch (err) {
      setError("Failed to load Pokemon. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadPokemon(0);
  }, [loadPokemon]);

  // Filter Pokemon based on search, type, and favorites
  useEffect(() => {
    let filtered = [...pokemon];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.id.toString() === searchQuery,
      );
    }

    // Filter by type
    if (selectedType) {
      filtered = filtered.filter((p) =>
        p.types.some((t) => t.type.name === selectedType),
      );
    }

    // Filter by favorites
    if (showFavorites) {
      const favorites = getFavorites();
      filtered = filtered.filter((p) => favorites.includes(p.id));
    }

    setFilteredPokemon(filtered);
  }, [pokemon, searchQuery, selectedType, showFavorites]);

  // Listen for favorites changes
  useEffect(() => {
    const handleFavoritesChange = () => {
      if (showFavorites) {
        const favorites = getFavorites();
        setFilteredPokemon((prev) =>
          prev.filter((p) => favorites.includes(p.id)),
        );
      }
    };

    window.addEventListener("favoritesChanged", handleFavoritesChange);
    return () => {
      window.removeEventListener("favoritesChanged", handleFavoritesChange);
    };
  }, [showFavorites]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleTypeChange = async (type: string) => {
    setSelectedType(type);
    if (type && pokemon.length < 200) {
      // Load more Pokemon if filtering by type and we don't have enough
      try {
        setLoading(true);
        const typeData = await fetchPokemonByType(type);
        const pokemonUrls = typeData.pokemon
          .slice(0, 50)
          .map((p) => p.pokemon.name);
        const pokemonDetails = await Promise.all(
          pokemonUrls.map((name) => fetchPokemon(name)),
        );

        // Merge with existing pokemon, avoiding duplicates
        setPokemon((prev) => {
          const existingIds = new Set(prev.map((p) => p.id));
          const newPokemon = pokemonDetails.filter(
            (p) => !existingIds.has(p.id),
          );
          return [...prev, ...newPokemon];
        });
      } catch (err) {
        console.error("Failed to load Pokemon by type:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  const loadMore = () => {
    if (!loading && hasMore && !selectedType && !searchQuery) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadPokemon(nextPage);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-2">Pokédex</h1>
          <p className="text-gray-600">Search and explore Pokemon</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <SearchBar onSearch={handleSearch} />
            </div>
            <TypeFilter
              types={types}
              selectedType={selectedType}
              onTypeChange={handleTypeChange}
            />
          </div>

          {/* View Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setShowFavorites(false)}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                !showFavorites
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              All Pokemon
            </button>
            <button
              onClick={() => setShowFavorites(true)}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                showFavorites
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Favorites
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Pokemon Grid */}
        {filteredPokemon.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {filteredPokemon.map((p) => (
                <PokemonCard key={p.id} pokemon={p} />
              ))}
            </div>

            {/* Load More Button */}
            {!showFavorites && !selectedType && !searchQuery && hasMore && (
              <div className="flex justify-center">
                <button
                  onClick={loadMore}
                  disabled={loading}
                  className="px-8 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </>
        ) : loading ? (
          <Loading />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              {showFavorites
                ? "No favorite Pokemon yet. Click the heart icon on any Pokemon to add them to your favorites!"
                : "No Pokemon found. Try adjusting your search or filters."}
            </p>
          </div>
        )}

        {loading && filteredPokemon.length > 0 && <Loading />}
      </div>
    </main>
  );
}

// Made with Bob
