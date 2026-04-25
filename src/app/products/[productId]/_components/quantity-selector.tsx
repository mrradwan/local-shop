"use client";

import { Minus, Plus } from "lucide-react";
import React, { useState } from "react";

interface QuantitySelectorProps {
  stockQuantity: number;
  price: number;
  priceAfterDiscount?: number;
}

export default function QuantitySelector({
  stockQuantity,
  price,
  priceAfterDiscount,
}: QuantitySelectorProps) {
  // Local state to track the selected quantity
  const [quantity, setQuantity] = useState(1);

  // Determine the effective price based on discount availability
  const currentPrice = priceAfterDiscount ? priceAfterDiscount : price;

  // Calculate the live total price based on selection
  const totalPrice = currentPrice * quantity;

  /**
   * Increase quantity if it's below the available stock
   */
  const increase = () => {
    if (quantity < stockQuantity) {
      setQuantity((prev) => prev + 1);
    }
  };

  /**
   * Decrease quantity if it's above the minimum (1)
   */
  const decrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // Guard clause: Hide selector if product is out of stock
  if (stockQuantity === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-5 mt-6">
      {/* Selector Controls */}
      <div className="flex items-center gap-4">
        <span className="text-gray-700 font-medium">Quantity:</span>

        <div className="flex items-center justify-between border border-gray-300 rounded-full w-32 h-10 px-2 bg-white shadow-sm">
          <button
            type="button"
            onClick={decrease}
            disabled={quantity === 1}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600 disabled:opacity-50 disabled:hover:bg-transparent transition-colors cursor-pointer"
          >
            <Minus size={16} />
          </button>

          <span className="font-semibold text-gray-900 select-none">
            {quantity}
          </span>

          <button
            type="button"
            onClick={increase}
            disabled={quantity === stockQuantity}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600 disabled:opacity-50 disabled:hover:bg-transparent transition-colors cursor-pointer"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Dynamic Pricing Summary */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">
            Total Price:
          </span>
          <span className="text-2xl font-bold text-green-600">
            {totalPrice.toLocaleString()} EGP
          </span>
        </div>
      </div>
    </div>
  );
}