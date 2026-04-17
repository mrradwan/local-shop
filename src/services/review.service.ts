import { Review } from "@/types/review.type";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getReviews = async (): Promise<Review[]> => {
  try {
    const response = await fetch(`${API_URL}/reviews`);
    
    if (!response.ok) {
      throw new Error("Failed to fetch reviews");
    }

    const data = await response.json();
    return data.data; 
  } catch (error) {
    console.error("API Error (getReviews):", error);
    return []; 
  }
};