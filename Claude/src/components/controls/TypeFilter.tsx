"use client";

import { useQuery } from "@apollo/client/react";
import { ChevronDown, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GET_POKEMON_TYPES } from "@/lib/graphql/queries";
import type { GetPokemonTypesData } from "@/lib/graphql/types";
import { getTypeColor } from "@/lib/type-colors";
import { cn } from "@/lib/utils";

interface TypeFilterProps {
  value: string | null;
  onChange: (type: string | null) => void;
}

export function TypeFilter({ value, onChange }: TypeFilterProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { data } = useQuery<GetPokemonTypesData>(GET_POKEMON_TYPES);
  const types: string[] = data?.pokemonTypes ?? [];

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selectedColor = value ? getTypeColor(value) : null;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-medium",
          "border transition-all duration-200 min-w-[140px]",
          open || value
            ? "border-indigo-500/50 bg-indigo-500/10"
            : "border-[var(--border-subtle)] bg-white/5 hover:bg-white/8"
        )}
      >
        {value && selectedColor ? (
          <>
            <span className={cn("w-2 h-2 rounded-full", selectedColor.bg)} />
            <span className="text-[var(--text-primary)] flex-1 text-left">{value}</span>
          </>
        ) : (
          <span className="text-[var(--text-muted)] flex-1 text-left">All Types</span>
        )}
        <div className="flex items-center gap-1 ml-auto">
          {value && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onChange(null);
              }}
              className="p-0.5 rounded hover:bg-white/10"
              aria-label="Clear type filter"
            >
              <X size={12} className="text-[var(--text-muted)]" />
            </button>
          )}
          <ChevronDown
            size={14}
            className={cn(
              "text-[var(--text-muted)] transition-transform duration-200",
              open && "rotate-180"
            )}
          />
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 left-0 z-30 rounded-xl overflow-hidden shadow-2xl"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-subtle)",
              minWidth: "160px",
              maxHeight: "320px",
              overflowY: "auto",
            }}
          >
            <button
              onClick={() => { onChange(null); setOpen(false); }}
              className={cn(
                "w-full text-left px-4 py-2.5 text-sm transition-colors",
                !value
                  ? "bg-indigo-500/20 text-indigo-300"
                  : "text-[var(--text-secondary)] hover:bg-white/5"
              )}
            >
              All Types
            </button>
            {types.map((type) => {
              const color = getTypeColor(type);
              return (
                <button
                  key={type}
                  onClick={() => { onChange(type); setOpen(false); }}
                  className={cn(
                    "w-full text-left px-4 py-2.5 text-sm flex items-center gap-2.5 transition-colors",
                    value === type
                      ? "bg-white/10 text-[var(--text-primary)]"
                      : "text-[var(--text-secondary)] hover:bg-white/5"
                  )}
                >
                  <span className={cn("w-2 h-2 rounded-full shrink-0", color.bg)} />
                  {type}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
