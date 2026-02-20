import { describe, it, expect } from "vitest";
import {
  cn,
  formatPokemonNumber,
  getTypeColor,
  capitalize,
  formatRange,
  getAllPokemonTypes,
} from "../utils";

describe("Utils", () => {
  describe("cn", () => {
    it("should merge class names correctly", () => {
      expect(cn("text-red-500", "bg-blue-500")).toBe("text-red-500 bg-blue-500");
    });

    it("should handle conditional classes", () => {
      expect(cn("base", true && "active", false && "inactive")).toBe("base active");
    });

    it("should handle Tailwind conflicts", () => {
      expect(cn("p-4", "p-8")).toBe("p-8");
    });
  });

  describe("formatPokemonNumber", () => {
    it("should format single digit numbers", () => {
      expect(formatPokemonNumber(1)).toBe("#001");
    });

    it("should format double digit numbers", () => {
      expect(formatPokemonNumber(25)).toBe("#025");
    });

    it("should format triple digit numbers", () => {
      expect(formatPokemonNumber(151)).toBe("#151");
    });
  });

  describe("getTypeColor", () => {
    it("should return correct color for Fire type", () => {
      expect(getTypeColor("Fire")).toBe("bg-red-500");
    });

    it("should return correct color for Water type", () => {
      expect(getTypeColor("Water")).toBe("bg-blue-500");
    });

    it("should return correct color for Grass type", () => {
      expect(getTypeColor("Grass")).toBe("bg-green-500");
    });
  });

  describe("capitalize", () => {
    it("should capitalize first letter", () => {
      expect(capitalize("pikachu")).toBe("Pikachu");
    });

    it("should handle already capitalized strings", () => {
      expect(capitalize("Pikachu")).toBe("Pikachu");
    });

    it("should handle all caps", () => {
      expect(capitalize("PIKACHU")).toBe("Pikachu");
    });
  });

  describe("formatRange", () => {
    it("should format range correctly", () => {
      expect(formatRange("5kg", "10kg")).toBe("5kg - 10kg");
    });
  });

  describe("getAllPokemonTypes", () => {
    it("should return all types including All", () => {
      const types = getAllPokemonTypes();
      expect(types).toContain("All");
      expect(types).toContain("Fire");
      expect(types).toContain("Water");
      expect(types.length).toBeGreaterThan(15);
    });
  });
});

// Made with Bob
