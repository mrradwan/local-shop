"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ProductCard from "@/components/shared/ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/types/product.type";

// Import Swiper essential styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

/**
 * RelatedSwiper Component
 * Client-side carousel for displaying related products using Swiper.js.
 * Features custom navigation buttons and responsive breakpoints.
 */
export default function RelatedSwiper({ products }: { products: Product[] }) {
  return (
    <div className="relative px-2 md:px-4">
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        /* * Custom Navigation:
         * Linked to external button classes (.next-btn, .prev-btn)
         */
        navigation={{
          nextEl: ".next-btn",
          prevEl: ".prev-btn",
        }}
        // Responsive Layout Configuration
        slidesPerView={1}
        slidesPerGroup={1}
        breakpoints={{
          // Mobile: 2 slides
          640: { slidesPerView: 2, slidesPerGroup: 2 },
          // Desktop: 4 slides
          1024: { slidesPerView: 4, slidesPerGroup: 4 },
          // Large Desktop: 5 slides
          1280: { slidesPerView: 5, slidesPerGroup: 5 },
        }}
        // Loop only if there are enough items to prevent visual glitches
        loop={products.length >= 5}
        className="pb-14"
      >
        {products.map((product, index) => (
          <SwiperSlide key={product.id}>
            <div className="h-full py-2">
              {/* Reusing ProductCard for consistent UI */}
              <ProductCard product={product} index={index} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* --- Custom Navigation Buttons with Hover Effects --- */}

      {/* Previous Slide Button */}
      <button className="prev-btn absolute -left-14 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white border border-gray-100 rounded-full flex items-center justify-center text-gray-600 shadow-lg cursor-pointer hover:bg-green-600 hover:text-white hover:scale-110 active:scale-95 transition-all duration-300 -translate-x-1/2 md:translate-x-0 outline-none">
        <ChevronLeft size={24} strokeWidth={2.5} />
      </button>

      {/* Next Slide Button */}
      <button className="next-btn absolute -right-14 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white border border-gray-100 rounded-full flex items-center justify-center text-gray-600 shadow-lg cursor-pointer hover:bg-green-600 hover:text-white hover:scale-110 active:scale-95 transition-all duration-300 translate-x-1/2 md:translate-x-0 outline-none">
        <ChevronRight size={24} strokeWidth={2.5} />
      </button>
    </div>
  );
}
