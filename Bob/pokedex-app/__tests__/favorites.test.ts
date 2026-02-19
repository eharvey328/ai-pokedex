import {
  getFavorites,
  addFavorite,
  removeFavorite,
  isFavorite,
  toggleFavorite,
} from "@/lib/favorites";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("Favorites Management", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("getFavorites", () => {
    it("should return empty array when no favorites exist", () => {
      expect(getFavorites()).toEqual([]);
    });

    it("should return favorites from localStorage", () => {
      localStorage.setItem("pokemon-favorites", JSON.stringify([1, 25, 150]));
      expect(getFavorites()).toEqual([1, 25, 150]);
    });
  });

  describe("addFavorite", () => {
    it("should add a Pokemon to favorites", () => {
      addFavorite(25);
      expect(getFavorites()).toContain(25);
    });

    it("should not add duplicate favorites", () => {
      addFavorite(25);
      addFavorite(25);
      expect(getFavorites()).toEqual([25]);
    });

    it("should add multiple different Pokemon", () => {
      addFavorite(1);
      addFavorite(25);
      addFavorite(150);
      expect(getFavorites()).toEqual([1, 25, 150]);
    });
  });

  describe("removeFavorite", () => {
    it("should remove a Pokemon from favorites", () => {
      addFavorite(25);
      addFavorite(150);
      removeFavorite(25);
      expect(getFavorites()).toEqual([150]);
    });

    it("should handle removing non-existent favorite", () => {
      addFavorite(25);
      removeFavorite(150);
      expect(getFavorites()).toEqual([25]);
    });
  });

  describe("isFavorite", () => {
    it("should return true for favorited Pokemon", () => {
      addFavorite(25);
      expect(isFavorite(25)).toBe(true);
    });

    it("should return false for non-favorited Pokemon", () => {
      expect(isFavorite(25)).toBe(false);
    });
  });

  describe("toggleFavorite", () => {
    it("should add Pokemon if not favorited", () => {
      const result = toggleFavorite(25);
      expect(result).toBe(true);
      expect(isFavorite(25)).toBe(true);
    });

    it("should remove Pokemon if already favorited", () => {
      addFavorite(25);
      const result = toggleFavorite(25);
      expect(result).toBe(false);
      expect(isFavorite(25)).toBe(false);
    });

    it("should toggle multiple times correctly", () => {
      toggleFavorite(25); // Add
      expect(isFavorite(25)).toBe(true);

      toggleFavorite(25); // Remove
      expect(isFavorite(25)).toBe(false);

      toggleFavorite(25); // Add again
      expect(isFavorite(25)).toBe(true);
    });
  });
});

// Made with Bob
