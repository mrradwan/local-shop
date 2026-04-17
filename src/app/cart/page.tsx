"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getCart } from "@/actions/cart.action";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { CartItem as CartItemType, CartResponse } from "@/types/cart.type";
import { ArrowLeft, ArrowRight, Home, ShoppingCart } from "lucide-react";
import { FaBoxOpen } from "react-icons/fa6";
import CartItem from "@/app/cart/_components/CartItem";
import ClearCartButton from "@/app/cart/_components/ClearCartButton";
import Loading from "../loading";
import OrderSummary from "@/components/shared/OrderSummary";

export default function Cart() {
  const [products, setProducts] = useState<CartItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartId, setCartId] = useState("");
  async function getAllProductCart() {
    try {
      setLoading(true);
      const response: CartResponse = await getCart();
      if (response.status === "success") {
        setProducts(response.data.products);
        setCartCount(response.numOfCartItems);
        setCartTotal(response.data.totalCartPrice || 0);
        setCartId(response.cartId);
      }
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllProductCart();
  }, []);
  if (loading) {
    return <Loading />;
  }
  if (products.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="relative mb-8">
            <div className="w-32 h-32 rounded-full bg-linear-to-br from-gray-100 to-gray-50 flex items-center justify-center mx-auto shadow-sm border border-gray-100">
              <FaBoxOpen className="text-5xl text-gray-300" />
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-gray-200/50 rounded-full blur-md"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Looks like you haven&apos;t added anything to your cart yet. <br />
            Start exploring our products!
          </p>
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 bg-linear-to-r from-green-600 to-green-700 text-white py-3.5 px-8 rounded-xl font-semibold hover:scale-[1.02] transition-all shadow-lg shadow-green-600/20 active:scale-[0.98]"
          >
            Start Shopping
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 duration-300"
            />
          </Link>
        </div>
      </div>
    );
  }

  // حالة عرض المنتجات
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
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
                  <ShoppingCart size={16} />
                  <span>Shopping Cart</span>
                </div>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </nav>

        {/* Title Section */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <span className="bg-linear-to-r from-green-600 to-green-700 text-white w-12 h-12 rounded-xl flex items-center justify-center">
                <ShoppingCart size={24} />
              </span>
              Shopping Cart
            </h1>
            <p className="text-gray-500 mt-2">
              You have{" "}
              <span className="font-semibold text-green-600">
                {cartCount} items
              </span>{" "}
              in your cart
            </p>
          </div>
        </div>

        {/* Products List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {products.map((item) => (
                <CartItem
                  key={item._id}
                  item={item}
                  onUpdate={getAllProductCart}
                />
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between">
              <Link
                href="/"
                className="group text-gray-500 hover:text-green-700 font-medium text-sm flex items-center gap-2"
              >
                <ArrowLeft
                  size={16}
                  className="group-hover:-translate-x-1 duration-300 ease-in-out"
                />{" "}
                Continue Shopping
              </Link>
              <ClearCartButton onUpdate={getAllProductCart} />
            </div>
          </div>
          <div className="lg:col-span-1">
            <OrderSummary
              itemCount={cartCount}
              subtotal={cartTotal}
              baseShippingFee={50}
              cartId={cartId}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
