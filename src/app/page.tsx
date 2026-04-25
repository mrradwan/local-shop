import Hero from "@/components/shared/home/Hero";
import CategorySlider from "@/components/shared/home/CategorySlider";
import FeaturedProducts from "@/components/shared/home/FeaturedProducts";
import PromoBanner from "@/components/shared/home/PromoBanner";
import { getCategories } from "@/services/category.service";
import { getAllProducts } from "@/services/product.service";

/**
 * HomePage - Server Component
 * Serves as the main landing page, fetching all essential data in parallel
 * to ensure fast Time to First Byte (TTFB).
 */
export default async function HomePage() {
  // Execute category and product fetching concurrently
  const [categoriesRes, products] = await Promise.all([
    getCategories(),
    getAllProducts(), // Add params like { limit: 20 } if needed for optimization
  ]);

  const categories = categoriesRes?.data || [];

  return (
    <main className="min-h-screen bg-white overflow-hidden">
      {/* 1. Hero Section: Main entrance with primary CTA */}
      <Hero />

      <div className="container mx-auto px-4 space-y-20 py-16">
        {/* 2. Category Navigation: Smooth horizontal scroll slider */}
        <CategorySlider categories={categories} />

        {/* 3. Featured Collection: Highlighted top-selling products */}
        <FeaturedProducts products={products.slice(0, 10)} />

        {/* 4. Marketing Promo Banner: Visual break with special offers */}
        <PromoBanner />

        {/* 5. New Arrivals Section: Reusing FeaturedProducts for consistent UI */}
        <FeaturedProducts
          title="New Arrivals"
          subtitle="Be the first to get our latest items"
          products={products.slice(10, 20)}
        />
      </div>
    </main>
  );
}
