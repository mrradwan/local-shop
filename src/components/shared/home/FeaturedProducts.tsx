import ProductCard from "../ProductCard";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Product } from "@/types/product.type";

interface FeaturedProductsProps {
  products: Product[];
  title?: string;
  subtitle?: string;
}

/**
 * FeaturedProducts Component
 * A flexible grid layout designed to showcase a collection of products.
 * Can be reused for "New Arrivals", "Best Sellers", or general featured items.
 */
export default function FeaturedProducts({
  products,
  title = "Featured Products",
  subtitle = "Check out our top picks for you",
}: FeaturedProductsProps) {
  return (
    <section>
      {/* Section Header: Dynamic Title, Subtitle and "View All" redirection */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
          <p className="text-gray-500 mt-2">{subtitle}</p>
        </div>
        <Link
          href="/products"
          className="text-green-600 font-bold flex items-center gap-1 hover:underline transition-all border-none outline-none"
        >
          View All <ArrowRight size={18} />
        </Link>
      </div>

      {/* Responsive Product Grid:
          - Mobile: 2 Columns
          - Tablet: 4 Columns
          - Desktop: 5 Columns
          Optimized for varied screen sizes while maintaining consistent spacing.
      */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </section>
  );
}
