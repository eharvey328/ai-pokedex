"use client";

import { LayoutGrid, LayoutList } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ViewMode } from "@/types/pokemon";

interface ViewToggleProps {
  value: ViewMode;
  onChange: (mode: ViewMode) => void;
}

export function ViewToggle({ value, onChange }: ViewToggleProps) {
  return (
    <div className="flex rounded-xl overflow-hidden border border-[var(--border-subtle)] bg-white/5 p-1 gap-1">
      {(["grid", "list"] as ViewMode[]).map((mode) => {
        const Icon = mode === "grid" ? LayoutGrid : LayoutList;
        const active = value === mode;
        return (
          <motion.button
            key={mode}
            onClick={() => onChange(mode)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "relative p-2 rounded-lg transition-colors duration-200",
              active ? "text-white" : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
            )}
            aria-label={`${mode} view`}
          >
            {active && (
              <motion.div
                layoutId="view-toggle-indicator"
                className="absolute inset-0 rounded-lg bg-indigo-600"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
            <Icon size={16} className="relative z-10" />
          </motion.button>
        );
      })}
    </div>
  );
}
