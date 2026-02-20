"use client";

import { useState, useDeferredValue, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pokemon, ViewMode, TabMode } from "@/types/pokemon";
import { PokemonGrid } from "./pokemon/PokemonGrid";
import { PokemonDetail } from "./pokemon/PokemonDetail";
import { SearchBar } from "./controls/SearchBar";
import { TypeFilter } from "./controls/TypeFilter";
import { ViewToggle } from "./controls/ViewToggle";
import { useKeyboard } from "@/hooks/useKeyboard";

export function Pokedex() {
  const [tab, setTab] = useState<TabMode>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchInput, setSearchInput] = useState("");
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const deferredSearch = useDeferredValue(searchInput);

  const queryInput = {
    search: deferredSearch || undefined,
    filter: {
      ...(typeFilter ? { type: typeFilter } : {}),
      ...(tab === "favorites" ? { isFavorite: true } : {}),
    },
  };

  const handlePokemonClick = useCallback((pokemon: Pokemon) => {
    setSelectedPokemon(pokemon.name);
  }, []);

  const handleCloseDetail = useCallback(() => {
    setSelectedPokemon(null);
  }, []);

  const handleNavigate = useCallback((name: string) => {
    setSelectedPokemon(name);
  }, []);

  useKeyboard({
    key: "k",
    meta: true,
    onPress: () => searchInputRef.current?.focus(),
  });

  useKeyboard({
    key: "Escape",
    onPress: handleCloseDetail,
  });

  const tabs: { id: TabMode; label: string; emoji: string }[] = [
    { id: "all", label: "All Pokémon", emoji: "⚡" },
    { id: "favorites", label: "Favorites", emoji: "❤️" },
  ];

  return (
    <div className="min-h-dvh flex flex-col">
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.025) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      <header
        className="sticky top-0 z-40 border-b border-[var(--border-subtle)]"
        style={{ background: "rgba(8,8,15,0.88)", backdropFilter: "blur(20px)" }}
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
              className="flex items-center gap-3"
            >
              <motion.div
                className="relative w-10 h-10"
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
                  <defs>
                    <linearGradient id="pb-top" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#f87171" />
                      <stop offset="100%" stopColor="#dc2626" />
                    </linearGradient>
                  </defs>
                  <path d="M50 2a48 48 0 0 1 48 48H2A48 48 0 0 1 50 2z" fill="url(#pb-top)" />
                  <path d="M2 50a48 48 0 0 0 96 0z" fill="#e5e7eb" />
                  <line x1="2" y1="50" x2="98" y2="50" stroke="#111827" strokeWidth="7" />
                  <circle cx="50" cy="50" r="14" fill="#111827" />
                  <circle cx="50" cy="50" r="8" fill="white" />
                </svg>
              </motion.div>
              <div>
                <h1 className="text-xl font-bold gradient-text leading-none tracking-tight">Pokédex</h1>
                <p className="text-[var(--text-muted)] text-[10px] mt-0.5 tracking-widest uppercase">Gotta catch ʼem all</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <ViewToggle value={viewMode} onChange={setViewMode} />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="flex items-center gap-1 mb-4"
          >
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className="relative px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200"
                style={{ color: tab === t.id ? "var(--text-primary)" : "var(--text-muted)" }}
              >
                {tab === t.id && (
                  <motion.div
                    layoutId="tab-pill"
                    className="absolute inset-0 rounded-xl"
                    style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <span>{t.emoji}</span>
                  {t.label}
                </span>
              </button>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex gap-2"
          >
            <SearchBar
              value={searchInput}
              onChange={setSearchInput}
              placeholder="Search Pokémon… (⌘K)"
              inputRef={searchInputRef}
              className="flex-1"
            />
            <TypeFilter value={typeFilter} onChange={setTypeFilter} />
          </motion.div>
        </div>
      </header>

      <main className="relative flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${tab}-${deferredSearch}-${typeFilter}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <PokemonGrid
              queryInput={queryInput}
              onPokemonClick={handlePokemonClick}
              viewMode={viewMode}
            />
          </motion.div>
        </AnimatePresence>
      </main>

      <PokemonDetail
        pokemonName={selectedPokemon}
        onClose={handleCloseDetail}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
