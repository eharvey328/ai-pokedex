import {
  getPokemonId,
  formatPokemonName,
  formatPokemonId,
  getTypeColor,
  getStatName,
} from "@/lib/utils";

describe("Utility Functions", () => {
  describe("getPokemonId", () => {
    it("should extract Pokemon ID from URL", () => {
      const url = "https://pokeapi.co/api/v2/pokemon/25/";
      expect(getPokemonId(url)).toBe(25);
    });

    it("should handle URLs without trailing slash", () => {
      const url = "https://pokeapi.co/api/v2/pokemon/1";
      expect(getPokemonId(url)).toBe(1);
    });
  });

  describe("formatPokemonName", () => {
    it("should capitalize single word names", () => {
      expect(formatPokemonName("pikachu")).toBe("Pikachu");
    });

    it("should capitalize hyphenated names", () => {
      expect(formatPokemonName("mr-mime")).toBe("Mr Mime");
    });

    it("should handle multiple hyphens", () => {
      expect(formatPokemonName("tapu-koko")).toBe("Tapu Koko");
    });
  });

  describe("formatPokemonId", () => {
    it("should format single digit IDs", () => {
      expect(formatPokemonId(1)).toBe("#001");
    });

    it("should format double digit IDs", () => {
      expect(formatPokemonId(25)).toBe("#025");
    });

    it("should format triple digit IDs", () => {
      expect(formatPokemonId(150)).toBe("#150");
    });

    it("should handle IDs over 999", () => {
      expect(formatPokemonId(1000)).toBe("#1000");
    });
  });

  describe("getTypeColor", () => {
    it("should return correct color for fire type", () => {
      expect(getTypeColor("fire")).toBe("bg-red-500");
    });

    it("should return correct color for water type", () => {
      expect(getTypeColor("water")).toBe("bg-blue-500");
    });

    it("should return correct color for grass type", () => {
      expect(getTypeColor("grass")).toBe("bg-green-500");
    });

    it("should return default color for unknown type", () => {
      expect(getTypeColor("unknown")).toBe("bg-gray-400");
    });
  });

  describe("getStatName", () => {
    it("should format HP correctly", () => {
      expect(getStatName("hp")).toBe("HP");
    });

    it("should format attack correctly", () => {
      expect(getStatName("attack")).toBe("Attack");
    });

    it("should format special-attack correctly", () => {
      expect(getStatName("special-attack")).toBe("Sp. Atk");
    });

    it("should format special-defense correctly", () => {
      expect(getStatName("special-defense")).toBe("Sp. Def");
    });

    it("should return original name for unknown stat", () => {
      expect(getStatName("unknown-stat")).toBe("unknown-stat");
    });
  });
});

// Made with Bob
