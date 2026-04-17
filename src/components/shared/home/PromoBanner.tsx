"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function PromoBanner() {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative rounded-3xl overflow-hidden"
    >
      <div className="bg-linear-to-r from-green-600 to-green-900 px-8 py-12 md:py-20 text-white relative">
        {/* أشكال هندسية للتزيين */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />

        <div className="max-w-2xl relative z-10">
          <div className="flex items-center gap-2 mb-4 bg-white/20 w-fit px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
            <Zap size={14} className="fill-current" /> Limited Time Offer
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            Weekly Super Sale! <br />
            Up to <span className="text-yellow-400">50% Off</span> on Fruits
          </h2>
          <p className="text-green-50 text-lg mb-8 opacity-90">
            Stock up your fridge with fresh organic fruits and vegetables at
            unbeatable prices. Only this week!
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-white text-green-700 px-8 py-4 rounded-2xl font-bold hover:bg-yellow-400 hover:text-green-900 transition-all shadow-xl active:scale-95"
          >
            Claim Discount <ArrowRight size={20} />
          </Link>
        </div>

        {/* صورة وهمية أو شكل جمالي على اليمين */}
        <div className="lg:flex hidden absolute right-20 top-1/2 -translate-y-1/2 w-80 h-80 bg-white/10 rounded-3xl rotate-12 backdrop-blur-sm border border-white/20  items-center justify-center">
          <Image
            src="/image/promo.png"
            alt="Login"
            fill
            className="w-full h-125 object-cover rounded-2xl shadow-lg"
          />
        </div>
      </div>
    </motion.section>
  );
}
