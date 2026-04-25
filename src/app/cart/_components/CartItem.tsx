"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  Loader2,
  Minus,
  Plus,
  Trash2,
  CheckCircle2,
} from "lucide-react";
import { CartItem as CartItemType } from "@/types/cart.type";
import { updateCartItemQuantity, removeCartItem } from "@/actions/cart.action";
import { Button } from "../../../components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../components/ui/alert-dialog";
import { CartContext } from "@/provider/cart-provider";

interface CartItemProps {
  item: CartItemType;
  onUpdate: () => void;
}

export default function CartItem({ item, onUpdate }: CartItemProps) {
  const { product, count, price } = item;
  const { getCartData } = useContext(CartContext);

  // Loading state for quantity updates (plus/minus buttons)
  const [isLoading, setIsLoading] = useState(false);

  // States for item removal process and confirmation dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [isRemoveSuccess, setIsRemoveSuccess] = useState(false);

  // Calculate total price for this specific item
  const totalPrice = price * count;

  /**
   * Increments product quantity by 1
   */
  async function handleIncrease() {
    setIsLoading(true);
    await updateCartItemQuantity(product.id, count + 1);
    await onUpdate(); // Refresh cart page data
    getCartData(); // Refresh navbar badge count
    setIsLoading(false);
  }

  /**
   * Decrements product quantity or triggers removal dialog if count is 1
   */
  async function handleDecrease() {
    setIsLoading(true);
    if (count > 1) {
      await updateCartItemQuantity(product.id, count - 1);
      await onUpdate();
      getCartData();
    } else {
      // Open removal confirmation if trying to decrease below 1
      setIsDialogOpen(true);
    }
    setIsLoading(false);
  }

  /**
   * Handles the actual item removal from the API
   * @param e - Mouse event to prevent default behavior
   */
  async function handleRemove(e: React.MouseEvent) {
    e.preventDefault();

    try {
      setIsRemoving(true);
      await removeCartItem(product.id);
      getCartData(); // Sync navbar count

      setIsRemoveSuccess(true); // Show success animation

      // Close dialog and refresh UI after a brief delay
      setTimeout(() => {
        setIsDialogOpen(false);
        setIsRemoveSuccess(false);
        onUpdate();
      }, 1500);
    } catch (error) {
      console.error("Failed to remove item:", error);
    } finally {
      setIsRemoving(false);
    }
  }

  return (
    <div
      className={`relative bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300 ${isLoading ? "opacity-60 pointer-events-none" : ""}`}
    >
      <div className="p-4 sm:p-5">
        <div className="flex gap-4 sm:gap-6">
          {/* Product Thumbnail Section */}
          <Link
            href={`/products/${product.id}`}
            className="relative shrink-0 group"
          >
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl bg-gray-50 p-2 border border-gray-100 overflow-hidden">
              <Image
                src={product.imageCover}
                alt={product.slug}
                width={200}
                height={200}
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-green-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
              <Check size={8} /> In Stock
            </div>
          </Link>

          {/* Product Info Section */}
          <div className="flex-1 min-w-0 flex flex-col">
            <div className="mb-3">
              <Link href={`/products/${product.id}`} className="group/title">
                <h3 className="font-semibold text-gray-900 group-hover/title:text-green-600 transition-colors text-base sm:text-lg truncate">
                  {product.title}
                </h3>
              </Link>
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-block px-2.5 py-1 bg-linear-to-r from-green-50 to-emerald-50 text-green-700 text-xs font-medium rounded-full">
                  {product.category.name}
                </span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-500">
                  SKU: {product.id.slice(-6).toUpperCase()}
                </span>
              </div>
            </div>

            {/* Price Display */}
            <div className="mb-4">
              <div className="flex items-baseline gap-2">
                <span className="text-green-600 font-bold text-lg">
                  {price} EGP
                </span>
                <span className="text-xs text-gray-500">
                  {product.quantity} available
                </span>
              </div>
            </div>

            {/* Controls Bar */}
            <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
              {/* Quantity Selector */}
              <div className="flex items-center justify-between border border-gray-200 rounded-full w-28 h-9 px-1 bg-white shadow-sm">
                <Button
                  onClick={handleDecrease}
                  disabled={isLoading}
                  className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600 transition-colors disabled:opacity-50 bg-white"
                >
                  <Minus size={14} />
                </Button>
                <span className="font-semibold text-gray-900 text-sm w-6 text-center select-none">
                  {isLoading ? (
                    <Loader2
                      size={14}
                      className="animate-spin mx-auto text-green-600"
                    />
                  ) : (
                    count
                  )}
                </span>
                <Button
                  onClick={handleIncrease}
                  disabled={isLoading || count >= product.quantity}
                  className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600 transition-colors disabled:opacity-50 bg-white"
                >
                  <Plus size={14} />
                </Button>
              </div>

              {/* Total and Delete Action */}
              <div className="flex items-center gap-4">
                <div className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1.5 rounded-lg">
                  Total: {totalPrice} EGP
                </div>

                {/* Removal Confirmation Dialog */}
                <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <AlertDialogTrigger className="text-gray-400 hover:text-red-500 transition-colors p-1 cursor-pointer border-none outline-none bg-transparent">
                    <Trash2 size={18} />
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    {isRemoveSuccess ? (
                      /* Removal Success UI */
                      <div className="flex flex-col items-center justify-center py-6 text-center">
                        <CheckCircle2 className="w-16 h-16 text-green-500 mb-4 animate-bounce" />
                        <AlertDialogTitle className="text-xl">
                          Item Removed!
                        </AlertDialogTitle>
                        <AlertDialogDescription className="mt-2 text-base">
                          <span className="font-semibold">{product.title}</span>{" "}
                          has been removed from your cart.
                        </AlertDialogDescription>
                      </div>
                    ) : (
                      /* Confirmation UI */
                      <>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Remove Product</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to remove{" "}
                            <span className="font-semibold text-gray-800">
                              {product.title}
                            </span>{" "}
                            from your cart?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel
                            disabled={isRemoving}
                            className="cursor-pointer"
                          >
                            Keep it
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleRemove}
                            disabled={isRemoving}
                            className="bg-red-600 hover:bg-red-700 text-white w-28 flex justify-center transition-all cursor-pointer"
                          >
                            {isRemoving ? (
                              <Loader2 className="animate-spin" size={18} />
                            ) : (
                              "Remove"
                            )}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </>
                    )}
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
