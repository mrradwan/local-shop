import { BrandsResponse } from "@/types/brand.type";

/**
 * getBrands - Server-side Service
 * Fetches all product brands from the API.
 * Uses Next.js Data Fetching features for performance optimization.
 */
export async function getBrands(): Promise<BrandsResponse> {
  // Use the internal environment variable for server-side requests
  const API_URL =
    process.env.NEXT_PUBLIC_BASE_URL ||
    "https://ecommerce.routemisr.com/api/v1";
  try {
    const response = await fetch(`${API_URL}/brands`, {
      /**
       * ISR (Incremental Static Regeneration):
       * Revalidates the data every 3600 seconds (1 hour).
       * This ensures the page stays fast (static) but stays updated.
       */
      next: { revalidate: 3600 },
    });

    // Error Handling: Ensure the response is successful before parsing
    if (!response.ok) {
      throw new Error("Failed to fetch brands from the server");
    }

    return await response.json();
  } catch (error) {
    // Log the error for server-side debugging
    console.error("Error fetching brands:", error);
    throw error;
  }
}
