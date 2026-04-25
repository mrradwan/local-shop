import React from "react";
import { getAllProducts } from "@/services/product.service";
import RelatedSwiper from "./RelatedSwiper";

interface RelatedProductsProps {
  categoryId: string;
  currentProductId: string;
}

/**
 * RelatedProducts - Server Component
 * Fetches and displays products within the same category to encourage cross-selling.
 */
export default async function RelatedProducts({
  categoryId,
  currentProductId,
}: RelatedProductsProps) {
  // Fetch products filtered by the current category ID
  const products = await getAllProducts({ "category[in]": categoryId });

  /**
   * Filter Logic:
   * Exclude the product currently being viewed from the related list.
   */
  const relatedProducts = products.filter(
    (product) => product.id !== currentProductId,
  );

  // Early return if no related products are found to keep the UI clean
  if (!relatedProducts || relatedProducts.length === 0) return null;

  return (
    <section className="py-12 border-t border-gray-100 mt-10">
      <div className="container mx-auto px-4">
        {/* Section Heading with Brand Indicator */}
        <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-green-600 rounded-full inline-block"></span>
          Related Products
        </h2>

        {/* Passing filtered data to a Client Component (Swiper) 
            for interactive touch/swipe functionality.
        */}
        <RelatedSwiper products={relatedProducts} />
      </div>
    </section>
  );
}
