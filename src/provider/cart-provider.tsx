"use client";

import React, { createContext, useEffect, useState, useCallback } from "react";
import { getCart } from "@/actions/cart.action";
import { useSession } from "next-auth/react";
import { CartData, CartItem } from "@/types/cart.type";

/**
 * Interface for Cart Context State
 * Manages global cart information, item counts, and unique product IDs
 * to handle "Add to Cart" toggles efficiently across the app.
 */
interface CartContextI {
  numOfCartItems: number;
  cartItemIds: string[]; // List of IDs used to check if a product is already in cart
  cartData: CartData | null;
  loading: boolean;
  getCartData: () => Promise<void>;
}

// Initialize Context with default values
export const CartContext = createContext<CartContextI>({
  numOfCartItems: 0,
  cartItemIds: [],
  cartData: null,
  loading: true,
  getCartData: async () => {},
});

/**
 * CartContextProvider Component
 * Syncs cart data with the server whenever the authentication status changes.
 */
export default function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [cartItemIds, setCartItemIds] = useState<string[]>([]);
  const [cartData, setCartData] = useState<CartData | null>(null);
  const [loading, setLoading] = useState(true);

  // Access authentication status to prevent unauthorized API calls
  const { status } = useSession();

  /**
   * getCartData - Memoized function to fetch and sync cart state.
   * Extracts product IDs into a standalone array (cartItemIds)
   * for O(1) or O(n) lookups in ProductCards.
   */
  const getCartData = useCallback(async () => {
    if (status !== "authenticated") return;

    try {
      setLoading(true);
      const response = await getCart();

      if (response?.status === "success") {
        setCartData(response.data);
        setNumOfCartItems(response.numOfCartItems || 0);

        // Map through products to store only IDs for global UI checks
        const ids = response.data.products.map(
          (item: CartItem) => item.product.id || item.product._id || "",
        );
        setCartItemIds(ids);
      }
    } catch (error) {
      console.error("Cart fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, [status]);

  /**
   * Effect: Trigger cart synchronization upon successful authentication
   */
  useEffect(() => {
    if (status === "authenticated") {
      getCartData();
    }
  }, [status, getCartData]);

  return (
    <CartContext.Provider
      value={{ numOfCartItems, getCartData, cartItemIds, cartData, loading }}
    >
      {children}
    </CartContext.Provider>
  );
}
