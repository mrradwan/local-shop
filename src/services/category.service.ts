import { CategoriesResponse } from "@/types/category.type";
import { SubCategoriesResponse } from "@/types/subcategory.type";

export async function getCategories(): Promise<CategoriesResponse> {
    const API_URL = process.env.BASE_URL

  try {
    const response = await fetch(`${API_URL}/categories`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error; // بنرمي الإيرور عشان الـ UI يتعامل معاه
  }
}

export async function getCategoryById(id: string) {
  try {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) throw new Error("Failed to fetch category");
    return await response.json();
  } catch (error) {
    console.error(`Error fetching category ${id}:`, error);
    return null;
  }
}

// 🌟 2. دالة بتجيب الأقسام الفرعية المرتبطة بالقسم الرئيسي ده
export async function getSubcategoriesOnCategory(categoryId: string): Promise<SubCategoriesResponse | null> {
  try {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) throw new Error("Failed to fetch subcategories");
    return await response.json();
  } catch (error) {
    console.error(`Error fetching subcategories for category ${categoryId}:`, error);
    return null;
  }
}