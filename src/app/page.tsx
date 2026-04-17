import Hero from "@/components/shared/home/Hero";
import CategorySlider from "@/components/shared/home/CategorySlider";
import FeaturedProducts from "@/components/shared/home/FeaturedProducts";
import PromoBanner from "@/components/shared/home/PromoBanner";
import { getCategories } from "@/services/category.service";
import { getAllProducts } from "@/services/product.service";

export default async function HomePage() {
  // بنجيب كل الداتا اللي محتاجينها للهوم في خبطة واحدة
  const [categoriesRes, products] = await Promise.all([
    getCategories(),
    getAllProducts(), // ممكن تبعت ليميت هنا مثلا { limit: 10 }
  ]);

  const categories = categoriesRes?.data || [];

  return (
    <main className="min-h-screen bg-white overflow-hidden">
      {/* 1. السكشن الرئيسي (Entrance) */}
      <Hero />

      <div className="container mx-auto px-4 space-y-20 py-16">
        {/* 2. سلايدر الأقسام (Smooth Scroll) */}
        <CategorySlider categories={categories} />

        {/* 3. سكشن المنتجات المميزة (Reusing ProductCard) */}
        <FeaturedProducts products={products.slice(0, 10)} />

        {/* 4. بانر إعلاني شيك */}
        <PromoBanner />
        
        {/* 5. سكشن أحدث المنتجات */}
        <FeaturedProducts 
          title="New Arrivals" 
          subtitle="Be the first to get our latest items" 
          products={products.slice(10, 20)} 
        />
      </div>
    </main>
  );
}