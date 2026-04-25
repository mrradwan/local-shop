"use client";

import React, { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { addProductToCart } from "@/actions/cart.action";
import { CartContext } from "@/provider/cart-provider";
import { toast } from "sonner";
import { Zap } from "lucide-react"; // Quick action indicator

export default function BuyNowBtn({ prodId }: { prodId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { getCartData } = useContext(CartContext);

  /**
   * Handles the "Buy Now" flow: adds to cart, updates context, and redirects
   */
  const handleBuyNow = async () => {
    setIsLoading(true);
    try {
      // 1. Add the product to the cart
      const res = await addProductToCart(prodId);

      if (res?.status === "success") {
        // 2. Update the cart counter in the navbar
        await getCartData();

        // 3. Redirect user directly to the cart page for checkout
        router.push("/cart");
      } else {
        toast.error(res?.message || "Failed to process your request.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleBuyNow}
      disabled={isLoading}
      // Distinctive dark styling to emphasize the primary action
      className="flex-1 bg-gray-900 text-white py-3.5 px-6 rounded-xl font-medium hover:bg-gray-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
    >
      <Zap size={18} />
      {isLoading ? "Processing..." : "Buy Now"}
    </Button>
  );
}
