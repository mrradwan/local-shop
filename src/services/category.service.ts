import { CategoriesResponse } from "@/types/category.type";
import { SubCategoriesResponse } from "@/types/subcategory.type";

/**
 * getCategories - Server-side Service
 * Fetches all top-level categories.
 * Optimized with Next.js ISR for efficient caching.
 */
export async function getCategories(): Promise<CategoriesResponse> {
  const API_URL =
    process.env.NEXT_PUBLIC_BASE_URL ||
    "https://ecommerce.routemisr.com/api/v1";
  try {
    const response = await fetch(`${API_URL}/categories`, {
      // Revalidate every hour to balance performance and fresh data
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error; // Propagate error for the error.tsx boundary to handle
  }
}

/**
 * getCategoryById
 * Fetches a single category's details by its unique ID.
 */
export async function getCategoryById(id: string) {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}`,
      {
        next: { revalidate: 3600 },
      },
    );

    if (!response.ok) throw new Error("Failed to fetch category details");
    return await response.json();
  } catch (error) {
    console.error(`Error fetching category ${id}:`, error);
    return null;
  }
}

/**
 * getSubcategoriesOnCategory
 * Fetches the subcategories associated with a specific parent category.
 * Essential for nested navigation or filter sidebars.
 */
export async function getSubcategoriesOnCategory(
  categoryId: string,
): Promise<SubCategoriesResponse | null> {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`,
      {
        next: { revalidate: 3600 },
      },
    );

    if (!response.ok) throw new Error("Failed to fetch subcategories");
    return await response.json();
  } catch (error) {
    console.error(
      `Error fetching subcategories for category ${categoryId}:`,
      error,
    );
    return null;
  }
}
