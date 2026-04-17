import { BrandsResponse } from "@/types/brand.type";

export async function getBrands(): Promise<BrandsResponse> {

    const API_URL = process.env.BASE_URL

  try {
    const response = await fetch(`${API_URL}/brands`, {
      next: { revalidate: 3600 }, 
    });

    if (!response.ok) {
      throw new Error("Failed to fetch brands");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching brands:", error);
    throw error;
  }
}