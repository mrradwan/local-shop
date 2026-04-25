"use client";

import React, { useContext, useState } from "react";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import {
  addProductToWishlist,
  removeWishlistItem,
} from "@/actions/wishlist.action";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { WishlistContext } from "@/provider/wishlist-provider";

interface AddToWishlistBtnProps {
  prodId: string;
  variant?: "icon" | "text" | "outlineText";
}

/**
 * AddToWishlistBtn Component
 * Provides a dynamic button to add or remove products from the user's wishlist.
 * Synchronizes with WishlistContext to reflect real-time changes across the UI.
 */
export default function AddToWishlistBtn({
  prodId,
  variant = "icon",
}: AddToWishlistBtnProps) {
  // Access global wishlist state and refresh function from context
  const { wishlistItems, refreshWishlist } = useContext(WishlistContext);
  const [isloading, setIsloading] = useState(false);

  // Determine if the product ID exists in the global wishlist array
  const isAlreadyInWishlist = wishlistItems.includes(prodId);

  /**
   * Main handler for Wishlist interactions:
   * Triggers a Toggle logic (Removes if present, Adds if absent).
   */
  async function handleWishlistAction() {
    // Logic: If item is in wishlist, trigger removal action
    if (isAlreadyInWishlist) {
      try {
        setIsloading(true);
        await removeWishlistItem(prodId);
        toast.success("Product removed from wishlist");
        await refreshWishlist(); // Sync global state and update counters
      } catch (error) {
        toast.error("Error removing item");
      } finally {
        setIsloading(false);
      }
      return; // Exit function after removal
    }

    // Logic: If item is not in wishlist, trigger addition action
    try {
      setIsloading(true);
      const response = await addProductToWishlist(prodId);
      if (response.status === "success") {
        toast.success(response.message);
        await refreshWishlist(); // Sync global state
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsloading(false);
    }
  }

  // View: Detailed Button with Text Label
  if (variant === "text") {
    return (
      <Button
        disabled={isloading}
        className={`flex-1 py-3.5 px-6 rounded-xl font-medium transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer border-none outline-none
          ${
            isAlreadyInWishlist
              ? "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
              : "bg-white text-black hover:text-red-500 hover:bg-gray-100"
          }`}
        onClick={handleWishlistAction}
      >
        {isloading ? (
          <Spinner className="text-green" />
        ) : (
          <Heart
            size={20}
            /* Fill heart icon if item is already saved */
            fill={isAlreadyInWishlist ? "currentColor" : "none"}
          />
        )}
        <span>
          {isAlreadyInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
        </span>
      </Button>
    );
  }

  // View: Compact Icon-only Button (Ideal for Product Cards)
  return (
    <Button
      disabled={isloading}
      variant="outline"
      size="icon"
      className={`transition-colors rounded-full shrink-0 shadow-sm border-none outline-none cursor-pointer
        ${
          isAlreadyInWishlist
            ? "bg-red-50 text-red-500 border-red-200 hover:bg-red-100"
            : "text-gray-400 hover:text-red-500 hover:bg-red-50 hover:border-red-200"
        }`}
      onClick={handleWishlistAction}
    >
      {isloading ? (
        <Spinner className="text-red-500" />
      ) : (
        <Heart size={18} fill={isAlreadyInWishlist ? "currentColor" : "none"} />
      )}
    </Button>
  );
}
