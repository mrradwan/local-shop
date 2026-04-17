"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Category } from "@/types/category.type";

export default function CategorySlider({ categories }: { categories: Category[] }) {
  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Shop by Category</h2>
          <p className="text-gray-500 text-sm">Explore our wide range of products</p>
        </div>
        <Link href="/categories" className="text-green-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
          All Categories <ChevronRight size={18} />
        </Link>
      </div>

      {/* 🌟 السلايدر (استخدمنا flex-nowrap مع overflow-x-auto لسرعة ونعومة الـ Scroll) */}
      <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
        {categories.map((category, index) => (
          <motion.div
            key={category._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="shrink-0"
          >
            <Link href={`/categories/${category._id}`} className="group flex flex-col items-center">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-50 border border-gray-100 p-4 mb-3 group-hover:border-green-200 group-hover:shadow-md transition-all duration-300 relative overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <span className="text-sm font-bold text-gray-700 group-hover:text-green-600 transition-colors">
                {category.name}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}