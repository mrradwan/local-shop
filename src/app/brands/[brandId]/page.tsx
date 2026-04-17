import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { HomeIcon, ArrowLeft } from "lucide-react"; // 👈 نضفنا الأيقونات
import Link from "next/link";
import React from "react";
import Image from "next/image";

import { getAllProducts } from "@/services/product.service";
import ProductCard from "@/components/shared/ProductCard";
import EmptyState from "@/components/shared/EmptyState"; // 👈 ضفنا ده

interface BrandPageProps {
  params: Promise<{ brandId: string }>;
}

async function getBrandById(id: string) {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
    if (!res.ok) return null;
    const data = await res.json();
    return data.data;
  } catch (error) {
    return null;
  }
}

export default async function SpecificBrandPage({ params }: BrandPageProps) {
  const resolvedParams = await params;
  const brandId = resolvedParams.brandId;

  const [brand, products] = await Promise.all([
    getBrandById(brandId),
    getAllProducts({ brand: brandId }),
  ]);

  if (!brand) {
    return (
      <div className="text-center py-20 text-xl font-bold">Brand not found</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* الهيدر البنفسجي */}
      <div className="bg-linear-to-br from-violet-600 via-violet-500 to-purple-400 text-white">
        <div className="container mx-auto px-4 py-12 sm:py-16">
          <nav className="flex items-center gap-2 text-sm text-white/80 mb-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <Link href="/" className="text-gray-300 hover:text-white transition-colors flex items-center gap-1.5">
                    <HomeIcon size={16} />
                    <span>Home</span>
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-white/40" />
                <BreadcrumbItem>
                  <Link href="/brands" className="text-gray-300 hover:text-white transition-colors flex items-center gap-1.5">
                    <span>Brands</span>
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-white/40" />
                <BreadcrumbItem>
                  <span className="font-semibold text-white">
                    {brand.name}
                  </span>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </nav>

          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-white p-3 shadow-xl shrink-0 flex items-center justify-center">
              <div className="relative w-full h-full">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-2">
                {brand.name}
              </h1>
              <p className="text-violet-100 text-lg">
                Explore all products by {brand.name}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/brands"
            className="group inline-flex items-center gap-2 text-gray-600 hover:text-violet-600 transition-colors"
          >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 duration-300 ease-in-out"
            />
            <span>Back to Brands</span>
          </Link>
          <div className="text-sm font-medium text-gray-500">
            {products.length} Products Found
          </div>
        </div>

        {/* 🌟 استخدام الـ Components بذكاء */}
        {products.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}