"use client";

import { FavoritesToggle } from "@/components/pokemon/favorites-toggle";
import { SearchBar } from "@/components/pokemon/search-bar";
import { TypeFilter } from "@/components/pokemon/type-filter";
import { ViewModeToggle } from "@/components/pokemon/view-mode-toggle";
import { motion } from "framer-motion";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col gap-4">
          {/* Logo and Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3"
          >
            <div className="text-4xl">⚡</div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Pokédex</h1>
              <p className="text-sm text-muted-foreground">
                Gotta catch 'em all!
              </p>
            </div>
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between"
          >
            <div className="flex flex-col sm:flex-row gap-3 flex-1">
              <SearchBar />
              <TypeFilter />
            </div>
            <div className="flex gap-3 justify-between sm:justify-end">
              <FavoritesToggle />
              <ViewModeToggle />
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
}

// Made with Bob
