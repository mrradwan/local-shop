import { PackageOpen } from "lucide-react";
import Link from "next/link";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
        <PackageOpen size={36} className="text-gray-400" />
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">No Products Found</h2>
      <p className="text-gray-500 mb-8 text-center text-sm">
        We couldnabos;t find any products here right now.
      </p>
      <Link
        href="/products"
        className="bg-[#28c76f] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#23af61] transition-colors shadow-sm"
      >
        View All Products
      </Link>
    </div>
  );
}