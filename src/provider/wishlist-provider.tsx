"use client";

import React, { createContext, useEffect, useState } from "react";
import { getWishlist } from "@/actions/wishlist.action";
import { useSession } from "next-auth/react";

/**
 * Interface for Wishlist Context State
 * Provides global access to the wishlist count and a list of product IDs
 * currently saved by the user for real-time UI updates (e.g., heart icon state).
 */
interface WishlistContextI {
  wishlistCount: number;
  wishlistItems: string[]; // Stores only IDs for efficient lookup across components
  refreshWishlist: () => Promise<void>;
}

// Initialize Context with default values
export const WishlistContext = createContext<WishlistContextI>({
  wishlistCount: 0,
  wishlistItems: [],
  refreshWishlist: async () => {},
});

/**
 * WishlistContextProvider Component
 * Manages the global state of the user's wishlist and ensures data is synced
 * with the server upon successful authentication.
 */
export default function WishlistContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [wishlistCount, setWishlistCount] = useState(0);
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  const { status } = useSession();

  /**
   * getWishlistData - Fetches current wishlist from the server.
   * Maps the response data to extract unique IDs for global state availability.
   */
  async function getWishlistData() {
    try {
      const response = await getWishlist();

      // Safety Check: Ensure response is successful and contains valid data
      if (response?.status === "success" && response?.data) {
        setWishlistCount(response.count);

        /**
         * Extracting IDs from the wishlist items.
         * Handles both 'id' and '_id' formats depending on the API schema.
         */
        const ids = response.data.map(
          (item: { _id?: string; id?: string }) => item.id || item._id || "",
        );
        setWishlistItems(ids);
      } else {
        // Fallback: Clear state if wishlist is empty or response fails
        setWishlistCount(0);
        setWishlistItems([]);
      }
    } catch (error) {
      console.error("Failed to fetch wishlist data:", error);
    }
  }

  /**
   * Effect Hook: Synchronizes wishlist data whenever the auth status changes.
   * Prevents unnecessary API calls for unauthenticated users.
   */
  useEffect(() => {
    const initWishlist = async () => {
      // Early return if user is not logged in
      if (status === "unauthenticated") return;

      if (status === "authenticated") {
        await getWishlistData();
      }
    };

    initWishlist();
  }, [status]);

  return (
    <WishlistContext.Provider
      value={{ wishlistCount, wishlistItems, refreshWishlist: getWishlistData }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
