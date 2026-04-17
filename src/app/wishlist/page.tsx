"use client";
import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  Home,
} from "lucide-react";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import { getWishlist } from "@/actions/wishlist.action";
import { WishlistProduct, WishlistResponse } from "@/types/wishlist.type";
import WishlistItem from "./_components/WishlistItem";
import Loading from './../loading';

export default function Wishlist() {
  const [products, setProducts] = useState<WishlistProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [wishlistCount, setWishlistCount] = useState(0);

  async function fetchWishlist() {
    try {
      setLoading(true);
      const response: WishlistResponse = await getWishlist();
      if (response.status === "success") {
        setProducts(response.data);
        setWishlistCount(response.count);
      }
    } catch (error) {
      console.error("Failed to fetch wishlist:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchWishlist();
  }, []);

  // 🌟 سطر واحد بس للتحميل! 🌟
  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* 🌟 حالة السلة الفارغة 🌟 */}
      {products.length === 0 ? (
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-sm mx-auto text-center">
            <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-6">
              <Heart className="text-gray-400" size={30} />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Browse products and save your favorites here.
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href="/products"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors"
              >
                Browse Products
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 duration-300"
                />
              </Link>
            </div>
          </div>
        </div>
      ) : (
        /* 🌟 حالة وجود منتجات 🌟 */
        <>
          <div className="bg-white border-b border-gray-100">
            <div className="container mx-auto px-4 py-8">
              <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <Link
                        href="/"
                        className="flex items-center gap-1.5 hover:text-green-600 transition-colors"
                      >
                        <Home size={16} />
                        <span>Home</span>
                      </Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <div className="flex items-center gap-1.5 text-green-600 font-medium">
                        <Heart size={16} />
                        <span>Wishlist</span>
                      </div>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </nav>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                    <FaHeart className="text-xl text-red-500" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      My Wishlist
                    </h1>
                    <p className="text-gray-500 text-sm">{wishlistCount} items saved</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-100 text-sm font-medium text-gray-500">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Status</div>
                <div className="col-span-2 text-center">Actions</div>
              </div>
              <div className="divide-y divide-gray-100">
                {products.map((item) => (
                  <WishlistItem 
                    key={item.id} 
                    item={item} 
                    onUpdate={fetchWishlist} 
                  />
                ))}
              </div>
            </div>
            
            <div className="mt-8 flex items-center justify-between">
              <Link
                href="/products"
                className="group text-gray-500 hover:text-green-700 font-medium text-sm flex items-center gap-2"
              >
                <ArrowLeft
                  size={16}
                  className="group-hover:-translate-x-1 duration-300 ease-in-out"
                />{" "}
                Continue Shopping
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}