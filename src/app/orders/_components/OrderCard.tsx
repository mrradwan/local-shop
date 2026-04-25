"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  FaBoxArchive,
  FaCalendarDays,
  FaChevronDown,
  FaChevronUp,
  FaClock,
  FaHashtag,
  FaLocationDot,
  FaMoneyBill,
  FaReceipt,
} from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";

/**
 * Interface representing the Order structure from the API
 */
export interface RouteOrder {
  _id: string;
  id: number;
  isPaid: boolean;
  isDelivered: boolean;
  totalOrderPrice: number;
  shippingPrice: number;
  taxPrice: number;
  createdAt: string;
  shippingAddress: {
    details: string;
    phone: string;
    city: string;
  };
  cartItems: {
    _id: string;
    count: number;
    price: number;
    product: {
      title: string;
      imageCover: string;
    };
  }[];
}

interface OrderCardProps {
  order: RouteOrder;
}

export default function OrderCard({ order }: OrderCardProps) {
  // State to toggle detailed view
  const [isExpanded, setIsExpanded] = useState(false);

  // Format creation date for display
  const orderDate = new Date(order.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // Calculate total item count and price subtotal
  const totalItems = order.cartItems.reduce((acc, item) => acc + item.count, 0);
  const subtotal =
    order.totalOrderPrice - (order.shippingPrice || 0) - (order.taxPrice || 0);

  return (
    <div className="bg-white rounded-2xl border transition-all duration-300 overflow-hidden border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200">
      <div className="p-5 sm:p-6">
        <div className="flex gap-5">
          {/* Order Cover Image */}
          <div className="relative shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 p-2.5 overflow-hidden relative">
              <Image
                src={
                  order.cartItems[0]?.product.imageCover || "/placeholder.jpg"
                }
                alt="Order Cover"
                fill
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Basic Order Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-100 rounded-lg mb-2">
                  <FaClock className="text-xs text-amber-600" />
                  <span className="text-xs font-semibold text-amber-600">
                    {order.isDelivered ? "Delivered" : "Processing"}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                  <FaHashtag className="text-xs text-gray-400" />
                  {order.id}
                </h3>
              </div>
              <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-gray-100">
                <FaMoneyBill className="text-gray-600" />
              </div>
            </div>

            {/* Meta Information Tags */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-4">
              <span className="flex items-center gap-1.5">
                <FaCalendarDays className="text-xs text-gray-400" />
                {orderDate}
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
              <span className="flex items-center gap-1.5">
                <FaBoxArchive /> {totalItems} item{totalItems > 1 ? "s" : ""}
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
              <span className="flex items-center gap-1.5">
                <FaLocationDot className="text-xs text-gray-400" />
                {order.shippingAddress?.city || "N/A"}
              </span>
            </div>

            {/* Price and Details Toggle Button */}
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="text-2xl font-bold text-gray-900">
                  {order.totalOrderPrice}
                </span>
                <span className="text-sm font-medium text-gray-400 ml-1">
                  EGP
                </span>
              </div>
              <Button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer border-none outline-none shadow-none"
              >
                {isExpanded ? "Hide" : "Details"}
                {isExpanded ? (
                  <FaChevronUp className="text-xs transition-transform duration-300" />
                ) : (
                  <FaChevronDown className="text-xs transition-transform duration-300" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Details Section */}
      {isExpanded && (
        <div className="border-t border-gray-100 bg-gray-50/50">
          <div className="p-5 sm:p-6">
            <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-lg bg-green-100 flex items-center justify-center">
                <FaReceipt className="text-xs text-green-600" />
              </div>
              Order Items
            </h4>

            {/* List of Products in Order */}
            <div className="space-y-3">
              {order.cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100"
                >
                  <div className="w-16 h-16 rounded-xl bg-gray-50 p-2 shrink-0 relative">
                    <Image
                      src={item.product.imageCover}
                      alt={item.product.title}
                      fill
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">
                      {item.product.title}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      <span className="font-medium text-gray-700">
                        {item.count}
                      </span>{" "}
                      × {item.price} EGP
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-lg font-bold text-gray-900">
                      {item.count * item.price}
                    </p>
                    <p className="text-xs text-gray-400">EGP</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping and Financial Summary */}
          <div className="px-5 sm:px-6 pb-5 sm:pb-6 grid sm:grid-cols-2 gap-4">
            {/* Shipping Details */}
            <div className="p-4 bg-white rounded-xl border border-gray-100">
              <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center">
                  <FaLocationDot className="text-xs text-blue-600" />
                </div>
                Delivery Address
              </h4>
              <div className="space-y-2">
                <p className="font-medium text-gray-900">
                  {order.shippingAddress?.city}
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {order.shippingAddress?.details}
                </p>
                <p className="text-sm text-gray-600 flex items-center gap-2 pt-1">
                  <FaPhoneAlt className="text-xs text-gray-400" />
                  {order.shippingAddress?.phone}
                </p>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="p-4 rounded-xl bg-amber-100 border border-amber-200">
              <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-3">
                <FaClock className="text-xs text-amber-600" />
                Order Summary
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium">{subtotal} EGP</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-medium">{order.shippingPrice} EGP</span>
                </div>
                {order.taxPrice > 0 && (
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span className="font-medium">{order.taxPrice} EGP</span>
                  </div>
                )}
                <hr className="border-amber-200/50 my-2" />
                <div className="flex justify-between pt-1">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="font-bold text-lg text-gray-900">
                    {order.totalOrderPrice} EGP
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
