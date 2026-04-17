import { ChevronRight, ArrowLeft, FolderOpen, Folder } from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  getCategoryById,
  getSubcategoriesOnCategory,
} from "@/services/category.service";
import { SubCategory } from "@/types/subcategory.type";
import PageHeader from "@/components/shared/PageHeader"; // 🌟 استدعينا الهيدر بتاعنا

interface CategoryPageProps {
  params: Promise<{ categoryId: string }>; // 👈 ظبطنا التايب بتاع Promise
}

export default async function SpecificCategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const categoryId = resolvedParams.categoryId;

  // بنطلب الداتا في نفس اللحظة
  const [categoryRes, subcategoriesRes] = await Promise.all([
    getCategoryById(categoryId),
    getSubcategoriesOnCategory(categoryId),
  ]);

  const category = categoryRes?.data;
  const subcategories = subcategoriesRes?.data || [];

  if (!category) {
    return (
      <div className="text-center py-20 text-xl font-bold">
        Category not found
      </div>
    );
  }

  // 🌟 بنجهز الداتا اللي الـ PageHeader محتاجها
  const pageDetails = {
    title: category.name,
    parentName: "Categories",
    parentLink: "/categories",
    image: category.image,
    icon: <Folder size={28} className="text-white" />,
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      
      {/* 🌟 1. الهيدر في سطر واحد بس! بدل 50 سطر */}
      <PageHeader details={pageDetails} hasFilters={true} />

      <div className="container mx-auto px-4 py-10">
        
        {/* زرار الرجوع والعدد */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/categories"
            className="group inline-flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 duration-300 ease-in-out" />
            <span>Back to Categories</span>
          </Link>
          <div className="text-sm font-medium text-gray-500">
            {subcategories.length} Subcategories
          </div>
        </div>

        {/* 🌟 عرض الأقسام الفرعية */}
        {subcategories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {subcategories.map((sub: SubCategory) => (
              <Link
                key={sub._id}
                href={`/products?category=${categoryId}&subcategory=${sub._id}`}
                className="group flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-green-200 transition-all duration-300 hover:-translate-y-1"
              >
                {/* 🌟 ظبطتلك الـ Layout بتاع الكارت عشان يبقى الفولدر والاسم جنب بعض شكلهم احترافي */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center group-hover:bg-green-100 transition-colors shrink-0">
                    <FolderOpen className="text-green-600" size={24} />
                  </div>
                  <span className="font-semibold text-gray-800 group-hover:text-green-600 transition-colors line-clamp-1">
                    {sub.name}
                  </span>
                </div>
                
                <div className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-colors shrink-0">
                  <ChevronRight size={16} />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <FolderOpen size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium">
              No subcategories found for this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}