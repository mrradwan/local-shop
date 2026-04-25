import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn (Class Name) Utility Function
 * Combines multiple class names and intelligently merges Tailwind CSS classes.
 * * Why use this?
 * 1. clsx: Allows conditional class rendering (e.g., { 'bg-red-500': hasError }).
 * 2. twMerge: Solves Tailwind class conflicts (e.g., if 'px-2' and 'px-4' are both provided,
 * it ensures only the last one prevails instead of having both in the DOM).
 * * @param inputs - Array of class values, objects, or strings.
 * @returns A single string of merged, conflict-free Tailwind classes.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
