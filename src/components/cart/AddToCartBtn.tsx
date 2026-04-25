"use client";

import React, { useContext, useState } from "react";
import { Button } from "../ui/button";
import { ShoppingCart, Check, Trash2 } from "lucide-react";
import { addProductToCart, removeCartItem } from "@/actions/cart.action";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { CartContext } from "@/provider/cart-provider";
import { redirect } from "next/navigation";

interface AddToCartBtnProps {
  prodId: string;
  variant?: "icon" | "text";
}

export default function AddToCartBtn({
  prodId,
  variant = "icon",
}: AddToCartBtnProps) {
  // Access cart data and sync with the global cart item IDs list
  const { getCartData, cartItemIds = [] } = useContext(CartContext);
  const [isloading, setIsloading] = useState(false);

  // Check if the current product already exists in the cart
  const isAlreadyInCart = cartItemIds.includes(prodId);

  /**
   * Main handler for cart interactions:
   * Performs a Toggle logic (Removes if exists, Adds if not).
   */
  async function handleCartAction() {
    // Logic: If item is already in cart, trigger removal
    if (isAlreadyInCart) {
      try {
        setIsloading(true);
        await removeCartItem(prodId);
        toast.success("Product removed from cart");
        await getCartData(); // Refresh global cart state and Navbar counter
      } catch (error) {
        toast.error("Error removing item");
      } finally {
        setIsloading(false);
      }
      return; // Exit function after removal
    }

    // Logic: If item is not in cart, trigger addition
    try {
      setIsloading(true);
      const response = await addProductToCart(prodId);
      toast.success(response.message || "Added to cart successfully");
      await getCartData(); // Sync global state
    } catch (error) {
      // Redirect to login if user is unauthenticated during cart action
      toast.error((error as Error).message);
      redirect("/login");
    } finally {
      setIsloading(false);
    }
  }

  // View: Detailed Button with Text
  if (variant === "text") {
    return (
      <Button
        disabled={isloading}
        className={`flex-1 py-3.5 px-6 rounded-xl font-medium transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer border-none outline-none
          ${
            isAlreadyInCart
              ? "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200" // Styled for "Remove" action
              : "bg-green-600 text-white hover:bg-green-700 shadow-green-600/25 active:scale-[0.98]" // Styled for "Add" action
          }`}
        onClick={handleCartAction}
      >
        {isloading ? (
          <Spinner
            className={isAlreadyInCart ? "text-red-600" : "text-white"}
          />
        ) : isAlreadyInCart ? (
          <Trash2 size={20} />
        ) : (
          <ShoppingCart size={20} />
        )}
        <span>{isAlreadyInCart ? "Remove from Cart" : "Add to Cart"}</span>
      </Button>
    );
  }

  // View: Compact Icon-only Button
  return (
    <Button
      disabled={isloading}
      variant="outline"
      size="icon"
      className={`transition-colors rounded-full shrink-0 shadow-sm border-none outline-none cursor-pointer
        ${
          isAlreadyInCart
            ? "bg-green-50 text-green-600 border-green-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
            : "text-gray-600 hover:text-white hover:bg-green-600 hover:border-green-600"
        }`}
      onClick={handleCartAction}
    >
      {isloading ? (
        <Spinner className={isAlreadyInCart ? "text-green-600" : ""} />
      ) : isAlreadyInCart ? (
        <Check size={18} /> // Checkmark indicating item is saved in cart
      ) : (
        <ShoppingCart size={18} />
      )}
    </Button>
  );
}
