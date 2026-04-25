import { PackageOpen } from "lucide-react";
import Link from "next/link";

/**
 * EmptyState Component
 * Displays a fallback UI when a product search or category filter returns no results.
 */
export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      {/* Icon Wrapper: Visual indicator for an empty collection */}
      <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
        <PackageOpen size={36} className="text-gray-400" />
      </div>

      {/* Main Feedback Message */}
      <h2 className="text-xl font-bold text-gray-900 mb-2">
        No Products Found
      </h2>

      <p className="text-gray-500 mb-8 text-center text-sm">
        We couldn&apos;t find any products here right now. Try adjusting your
        filters.
      </p>

      {/* Call to Action: Redirect users back to the full product catalog */}
      <Link
        href="/products"
        className="bg-[#28c76f] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#23af61] transition-colors shadow-sm outline-none border-none cursor-pointer"
      >
        View All Products
      </Link>
    </div>
  );
}
