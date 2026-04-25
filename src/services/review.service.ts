import { Review } from "@/types/review.type";

/**
 * API Base Configuration
 * Accessed via environment variables for client-side or server-side fetch compatibility.
 */
const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

/**
 * getReviews - Data Fetching Service
 * Retrieves user feedback and ratings from the external API.
 * Returns an empty array in case of failure to maintain UI stability.
 */
export const getReviews = async (): Promise<Review[]> => {
  try {
    const response = await fetch(`${API_URL}/reviews`);

    // Validate response status before parsing JSON
    if (!response.ok) {
      throw new Error("Failed to fetch reviews from the API");
    }

    const data = await response.json();

    /**
     * Return logic:
     * Accesses the 'data' property of the response object,
     * assuming the API wraps the array in a standard data envelope.
     */
    return data.data;
  } catch (error) {
    // Log error for debugging and return fallback empty state
    console.error("API Error (getReviews):", error);
    return [];
  }
};
