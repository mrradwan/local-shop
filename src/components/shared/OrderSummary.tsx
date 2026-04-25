"use client";

import React from "react";
import Link from "next/link";
import { FaShoppingBag, FaTruck, FaTag } from "react-icons/fa";
import { FaShieldHalved } from "react-icons/fa6";
import { ArrowLeft } from "lucide-react";
import CheckoutDialog from "@/components/cart/CheckoutDialog";
import { Button } from "../ui/button";

interface OrderSummaryProps {
  itemCount: number;
  subtotal: number;
  baseShippingFee?: number; // Optional: Defaults to 50
  showShippingPromo?: boolean;
  buttonText?: string;
  buttonLink?: string;
  showContinueShopping?: boolean;
  cartId?: string;
}

export default function OrderSummary({
  itemCount,
  subtotal,
  baseShippingFee = 50,
  showShippingPromo = true,
  buttonText = "Secure Checkout",
  buttonLink = "/checkout",
  showContinueShopping = true,
  cartId,
}: OrderSummaryProps) {
  // --- Dynamic Business Logic ---
  const FREE_SHIPPING_THRESHOLD = 500; // Minimum order value for free shipping
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;

  // Calculate remaining amount needed for free shipping eligibility
  const remainingForFreeShipping = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - subtotal,
  );

  // Calculate percentage for the progress bar (Clamped at 100%)
  const progressPercentage = Math.min(
    100,
    (subtotal / FREE_SHIPPING_THRESHOLD) * 100,
  );

  // Determine effective shipping fee and final total
  const effectiveShippingFee = isFreeShipping ? 0 : baseShippingFee;
  const total = subtotal + effectiveShippingFee;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden sticky top-24 shadow-sm">
      {/* Header Section */}
      <div className="bg-linear-to-r from-green-600 to-green-700 px-6 py-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <FaShoppingBag />
          Order Summary
        </h2>
        <p className="text-green-100 text-sm mt-1">
          {itemCount} items in your cart
        </p>
      </div>

      <div className="p-6 space-y-5">
        {/* --- Dynamic Shipping Promo Section --- */}
        {showShippingPromo && (
          <>
            {isFreeShipping ? (
              /* Success State: Free Shipping Qualified */
              <div className="bg-linear-to-r from-green-50 to-emerald-50 rounded-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <FaTruck className="text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-green-700">Free Shipping!</p>
                  <p className="text-sm text-green-600">
                    You qualify for free delivery
                  </p>
                </div>
              </div>
            ) : (
              /* Progress State: Encouraging upsell to reach free shipping */
              <div className="bg-linear-to-r from-orange-50 to-amber-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <FaTruck className="text-orange-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Add {remainingForFreeShipping} EGP for free shipping
                  </span>
                </div>
                <div className="h-2 bg-orange-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-orange-400 to-amber-400 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>
            )}
          </>
        )}

        {/* --- Pricing Breakdown --- */}
        <div className="space-y-3">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span className="font-medium text-gray-900">{subtotal} EGP</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span className="font-medium text-gray-900">
              {isFreeShipping ? (
                <span className="text-green-600 font-bold">Free</span>
              ) : (
                `${effectiveShippingFee} EGP`
              )}
            </span>
          </div>

          {/* Final Total Calculation */}
          <div className="border-t border-dashed border-gray-200 pt-3 mt-3">
            <div className="flex justify-between items-baseline">
              <span className="text-gray-900 font-semibold">Total</span>
              <div className="text-right">
                <span className="text-2xl font-bold text-gray-900">
                  {total}
                </span>
                <span className="text-sm text-gray-500 ml-1">EGP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Promo Code Trigger */}
        <button className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-green-400 hover:text-green-600 hover:bg-green-50/50 transition-all cursor-pointer">
          <FaTag />
          <span className="text-sm font-medium">Apply Promo Code</span>
        </button>

        {/* Checkout Primary Action */}
        {cartId ? (
          <CheckoutDialog cartId={cartId} buttonText={buttonText} />
        ) : (
          <Button disabled className="w-full h-14 rounded-xl">
            Loading Checkout...
          </Button>
        )}

        {/* Trust & Policy Micro-copy */}
        <div className="flex items-center justify-center gap-4 py-2 border-t border-gray-50 mt-2">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <FaShieldHalved className="text-green-500" />
            <span>Secure Payment</span>
          </div>
          <div className="w-px h-4 bg-gray-200"></div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <FaTruck className="text-blue-500" />
            <span>Fast Delivery</span>
          </div>
        </div>

        {/* Back-to-Shopping Navigation */}
        {showContinueShopping && (
          <Link
            href="/"
            className="group text-gray-500 hover:text-green-700 font-medium text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 duration-300 ease-in-out"
            />
            Continue Shopping
          </Link>
        )}
      </div>
    </div>
  );
}
