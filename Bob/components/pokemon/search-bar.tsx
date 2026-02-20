"use client";

import { Input } from "@/components/ui/input";
import { usePokemonStore } from "@/lib/store";
import { debounce } from "@/lib/utils";
import { Search, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export function SearchBar() {
  const { filters, setQuery } = usePokemonStore();
  const [localQuery, setLocalQuery] = useState(filters.query);

  // Debounced search to avoid excessive API calls
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetQuery = useCallback(
    debounce((value: string) => {
      setQuery(value);
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSetQuery(localQuery);
  }, [localQuery, debouncedSetQuery]);

  const handleClear = () => {
    setLocalQuery("");
    setQuery("");
  };

  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search Pokemon..."
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        className="pl-10 pr-10"
        aria-label="Search Pokemon"
      />
      {localQuery && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

// Made with Bob
