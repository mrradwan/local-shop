import { Product } from "@/types/product.type";

/**
 * API Base Configuration
 * Uses an environment variable for flexibility across dev/prod environments.
 */
const API_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://ecommerce.routemisr.com/api/v1";

/**
 * getAllProducts - Advanced Fetching Utility
 * Supports complex filtering, sorting, pagination, and keyword searching.
 */
export const getAllProducts = async (queryParams?: {
  "category[in]"?: string | undefined;
  "brand[in]"?: string | undefined;
  subcategory?: string | undefined;
  keyword?: string | undefined;
  "price[gte]"?: string | undefined;
  "price[lte]"?: string | undefined;
  sort?: string | undefined;
  page?: string | undefined;
  limit?: string | undefined;
}): Promise<Product[]> => {
  try {
    let url = `${API_URL}/products`;

    if (queryParams) {
      const params = new URLSearchParams();

      /**
       * Dynamic Query Parameter Builder:
       * Iterates through params and formats them for the RouteMisr API.
       */
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value != null && value !== "") {
          /* * Array Filter Logic:
           * If categories or brands are sent as comma-separated strings (e.g., "id1,id2"),
           * we append them individually to match the API's expected format.
           */
          if (key === "category[in]" || key === "brand[in]") {
            if (typeof value === "string" && value.includes(",")) {
              value.split(",").forEach((v) => params.append(key, v.trim()));
            } else {
              params.append(key, String(value));
            }
          } else {
            /* Standard parameters (Search, Price, Sort) are appended directly */
            params.append(key, String(value));
          }
        }
      });

      const queryString = params.toString();
      if (queryString) {
        url = `${url}?${queryString}`;
      }
    }

    // Debugging: Log the final URL to the console for easier troubleshooting
    console.log("🚀 Firing API Request to:", url);

    const response = await fetch(url, {
      method: "GET",
      // Performance: 'no-store' ensures fresh data on every request, bypassing the cache
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      const errDetails = await response.text();
      console.error("❌ RouteMisr API Error:", errDetails);
      return [];
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("❌ API Error (getAllProducts):", error);
    return [];
  }
};

/**
 * getProductById
 * Fetches a single product's full details.
 * Optimized with Next.js revalidation (60 seconds) for faster repetitive access.
 */
export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: "GET",
      next: { revalidate: 60 },
    });

    if (!response.ok) throw new Error("Failed to fetch product details");

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(`API Error (getProductById for ${id}):`, error);
    return null;
  }
};
