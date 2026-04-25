"use client";

import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

/**
 * Hero Component
 * The main introductory section of the home page.
 * Uses Framer Motion for entrance animations and Tailwind for decorative backgrounds.
 */
export default function Hero() {
  return (
    <section className="relative h-[80vh] flex items-center bg-gray-50 overflow-hidden">
      
      {/* Decorative Background: Animated blurred shapes for visual depth */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-125 h-125 bg-green-100 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-10">
        
        {/* Content Side: Text and Calls to Action (CTA) */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-green-600 font-bold tracking-wider uppercase text-sm mb-4 block">
            Exclusive Offer - 30% Off
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight mb-6">
            Fresh Grocery <br />
            <span className="text-green-600">Delivered</span> to You
          </h1>
          <p className="text-gray-500 text-lg mb-8 max-w-md">
            Get your daily needs from our store with the best quality and
            fastest delivery in town.
          </p>
          
          <div className="flex flex-wrap gap-4">
            {/* Primary Action */}
            <Link
              href="/products"
              className="bg-green-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-green-700 transition-all hover:shadow-lg hover:shadow-green-200 border-none outline-none"
            >
              Shop Now <ShoppingBag size={20} />
            </Link>
            
            {/* Secondary Action */}
            <Link
              href="/categories"
              className="bg-white text-gray-800 border border-gray-200 px-8 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all shadow-sm"
            >
              View Categories
            </Link>
          </div>
        </motion.div>

        {/* Visual Side: Hero Image with decorative borders and animations */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden md:block relative"
        >
          <div className="relative w-full h-125">
            {/* Decorative offset background card */}
            <div className="absolute inset-0 bg-green-600/5 rounded-3xl rotate-3" />
            
            {/* Main Image Container */}
            <div className="absolute inset-0 bg-white border border-gray-100 rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden">
              <Image
                src="/image/hero.png"
                alt="Fresh Grocery Delivery"
                width={600} // Optimized dimensions
                height={600}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                priority // Load immediately as it's the LCP element
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}