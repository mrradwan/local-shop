import { Product } from "@/types/product.type";

// تأكد إن المتغير ده بيقرا صح، يفضل تستخدم NEXT_PUBLIC_BASE_URL دايماً في الـ frontend
const API_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://ecommerce.routemisr.com/api/v1";

export const getAllProducts = async (queryParams?: { category?: string; subcategory?: string; brand?: string }): Promise<Product[]> => {
  try {
    // 1. بنجهز الرابط الأساسي
    let url = `${API_URL}/products`;

    // 2. لو في فلاتر مبعوتة، بنحولها لـ Query String (زي ?category=123&brand=456)
    if (queryParams) {
      // بنشيل أي قيمة فاضية (undefined) عشان منبعتهاش للـ API
      const filteredParams = Object.fromEntries(Object.entries(queryParams).filter(([_, v]) => v != null));
      const queryString = new URLSearchParams(filteredParams as Record<string, string>).toString();
      
      if (queryString) {
        url = `${url}?${queryString}`;
      }
    }

    // 3. بنبعت الطلب للرابط الجديد المفلتر
    const response = await fetch(url, {
      method: "GET",
      next: { revalidate: 60 },
    });
    
    if (!response.ok) throw new Error("Failed to fetch products");
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("API Error (getAllProducts):", error);
    return [];
  }
};

export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: "GET",
      // 🌟 نفس الكلام، تفاصيل المنتج تتحدث كل 60 ثانية عشان لو السعر أو المخزون اتغير
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