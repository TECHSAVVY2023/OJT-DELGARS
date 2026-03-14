/**
 * Shared category styling and validation for client (catalog, product modal, etc.).
 */

export const VALID_CATEGORIES = ["All", "Pork", "Chicken", "Beef", "Seafood", "Others"] as const;
export type CategoryName = (typeof VALID_CATEGORIES)[number];

const CATEGORY_CLASSES: Record<string, string> = {
  Pork: "bg-amber-100 text-amber-900",
  Chicken: "bg-yellow-400 text-gray-900",
  Beef: "bg-green-700 text-white",
  Seafood: "bg-blue-400 text-white",
  Others: "bg-gray-500 text-white",
};

const DEFAULT_CATEGORY_CLASS = "bg-blue-400 text-white";

/** Tailwind classes for category badge (landing/catalog/modal). */
export function getCategoryClass(category: string): string {
  return CATEGORY_CLASSES[category] ?? DEFAULT_CATEGORY_CLASS;
}

/** Check if a query string is a valid catalog category. */
export function categoryFromQuery(q: string | undefined): string {
  if (!q || !VALID_CATEGORIES.includes(q as CategoryName)) return "All";
  return q;
}
