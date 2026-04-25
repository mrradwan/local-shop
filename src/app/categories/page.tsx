import { ArrowRight, Layers } from "lucide-react";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { getCategories } from "@/services/category.service";
import PageHeader from "@/components/shared/PageHeader";

export default async function Categories() {
  // Fetch categories data directly on the server
  const response = await getCategories();
  const categories = response.data || [];

  // Configuration for the shared PageHeader component
  const pageDetails = {
    title: "All Categories",
    parentName: "",
    parentLink: "",
    image: null,
    icon: <Layers size={28} className="text-white" />,
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Page Header without filters */}
      <PageHeader details={pageDetails} hasFilters={false} />

      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {/* Map through categories retrieved from the API */}
          {categories.map((category) => (
            <Link
              key={category._id}
              href={`/categories/${category._id}`}
              className="group bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 shadow-sm hover:shadow-xl hover:border-green-200 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Category Image Container */}
              <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 mb-4 relative">
                <Image
                  src={category.image}
                  alt={category.name}
                  sizes="(max-width: 768px) 50vw, 20vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  fill
                />
              </div>

              {/* Category Title */}
              <h3 className="font-bold text-gray-900 text-center group-hover:text-green-600 transition-colors line-clamp-1">
                {category.name}
              </h3>

              {/* Hover Action Indicator */}
              <div className="flex justify-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs text-green-600 flex items-center gap-1 font-medium">
                  View Subcategories
                  <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
