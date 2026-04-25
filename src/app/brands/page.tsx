import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ArrowRight, HomeIcon, Layers } from "lucide-react";
import Link from "next/link";
import React from "react";
import { TbBrandSketch } from "react-icons/tb";
import Image from "next/image";
import { getBrands } from "@/services/brand.service";

export default async function Brands() {
  // Fetch brands data from the service
  const response = await getBrands();
  const brands = response.data || [];

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header Section with Purple Gradient */}
      <div className="bg-linear-to-br from-violet-600 via-violet-500 to-purple-400 text-white">
        <div className="container mx-auto px-4 py-12 sm:py-16">
          {/* Navigation Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-white/80 mb-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <Link
                    href="/"
                    className="text-gray-300 hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <HomeIcon size={16} />
                    <span>Home</span>
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-white/40" />
                <BreadcrumbItem>
                  <div className="text-white font-medium flex items-center gap-1.5">
                    <TbBrandSketch size={16} />
                    <span>Brands</span>
                  </div>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </nav>

          {/* Page Title and Icon */}
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30">
              <Layers size={30} />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Top Brands
              </h1>
              <p className="text-white/80 mt-1">
                Browse our wide range of partner brands
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Brands Grid Section */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
          {brands.map((brand) => (
            <Link
              key={brand._id}
              href={`/brands/${brand._id}`} // Dynamic route for each brand
              className="group bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-sm hover:shadow-xl hover:border-violet-200 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Brand Logo Container */}
              <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 mb-3 relative flex items-center justify-center p-4">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 16vw"
                  className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Brand Name */}
              <h3 className="font-semibold text-gray-900 text-center text-sm group-hover:text-violet-600 transition-colors truncate">
                {brand.name}
              </h3>

              {/* Hover Action Indicator */}
              <div className="flex justify-center mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs text-violet-600 flex items-center gap-1 font-medium">
                  View Products
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
