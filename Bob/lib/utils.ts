import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { PokemonType } from "./types";

/**
 * Merge Tailwind CSS classes with proper precedence
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Debounce function for search input
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Format Pokemon number with leading zeros
 */
export function formatPokemonNumber(num: number): string {
  return `#${num.toString().padStart(3, "0")}`;
}

/**
 * Get color for Pokemon type
 */
export function getTypeColor(type: PokemonType): string {
  const colors: Record<PokemonType, string> = {
    Normal: "bg-gray-400",
    Fire: "bg-red-500",
    Water: "bg-blue-500",
    Electric: "bg-yellow-400",
    Grass: "bg-green-500",
    Ice: "bg-cyan-400",
    Fighting: "bg-orange-700",
    Poison: "bg-purple-500",
    Ground: "bg-yellow-600",
    Flying: "bg-indigo-400",
    Psychic: "bg-pink-500",
    Bug: "bg-lime-500",
    Rock: "bg-yellow-700",
    Ghost: "bg-purple-700",
    Dragon: "bg-indigo-600",
    Dark: "bg-gray-700",
    Steel: "bg-gray-500",
    Fairy: "bg-pink-400",
  };
  return colors[type];
}

/**
 * Get gradient for Pokemon type
 */
export function getTypeGradient(types: PokemonType[]): string {
  if (types.length === 1) {
    return getTypeColor(types[0]);
  }
  const color1 = getTypeColor(types[0]);
  const color2 = getTypeColor(types[1]);
  return `bg-gradient-to-br from-${color1.replace("bg-", "")} to-${color2.replace("bg-", "")}`;
}

/**
 * Capitalize first letter
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Format weight/height range
 */
export function formatRange(min: string, max: string): string {
  return `${min} - ${max}`;
}

/**
 * Get all Pokemon types for filter
 */
export function getAllPokemonTypes(): (PokemonType | "All")[] {
  return [
    "All",
    "Normal",
    "Fire",
    "Water",
    "Electric",
    "Grass",
    "Ice",
    "Fighting",
    "Poison",
    "Ground",
    "Flying",
    "Psychic",
    "Bug",
    "Rock",
    "Ghost",
    "Dragon",
    "Dark",
    "Steel",
    "Fairy",
  ];
}

// Made with Bob
