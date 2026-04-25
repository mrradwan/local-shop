"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

/**
 * PromoBanner Component
 * A high-conversion marketing section featuring animated entry,
 * bold typography, and a glassmorphism-styled image container.
 */
export default function PromoBanner() {
  return (
    <motion.section
      /* Entry Animation: Subtle scale-up and fade-in when the section enters the viewport */
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative rounded-3xl overflow-hidden"
    >
      <div className="bg-linear-to-r from-green-600 to-green-900 px-8 py-12 md:py-20 text-white relative">
        {/* Decorative Element: Abstract blurred circle for background texture */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />

        <div className="max-w-2xl relative z-10">
          {/* Badge: Limited time indicator with animated pulse-like feel */}
          <div className="flex items-center gap-2 mb-4 bg-white/20 w-fit px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
            <Zap size={14} className="fill-current text-yellow-400" /> Limited
            Time Offer
          </div>

          <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            Weekly Super Sale! <br />
            Up to <span className="text-yellow-400">50% Off</span> on Fruits
          </h2>

          <p className="text-green-50 text-lg mb-8 opacity-90">
            Stock up your fridge with fresh organic fruits and vegetables at
            unbeatable prices. Only this week!
          </p>

          {/* Primary Call to Action: Features active-scale feedback for better UX */}
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-white text-green-700 px-8 py-4 rounded-2xl font-bold hover:bg-yellow-400 hover:text-green-900 transition-all shadow-xl active:scale-95 border-none outline-none cursor-pointer"
          >
            Claim Discount <ArrowRight size={20} />
          </Link>
        </div>

        {/* Visual Side Content: 
            Glassmorphism effect container (backdrop-blur) visible only on larger screens.
        */}
        <div className="lg:flex hidden absolute right-20 top-1/2 -translate-y-1/2 w-80 h-80 bg-white/10 rounded-3xl rotate-12 backdrop-blur-sm border border-white/20 items-center justify-center shadow-2xl">
          <Image
            src="/image/promo.png"
            alt="Promotion Illustration"
            fill
            className="object-cover rounded-2xl p-4 drop-shadow-2xl"
          />
        </div>
      </div>
    </motion.section>
  );
}
