"use client";
import React, { useContext, useState } from "react";
import { Trash2, Loader2, CheckCircle2 } from "lucide-react";
import { clearCart } from "@/actions/cart.action";
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
} from "@/components/ui/alert-dialog";
import { CartContext } from "@/provider/cart-provider";

interface ClearCartButtonProps {
  onUpdate: () => void;
}

export default function ClearCartButton({ onUpdate }: ClearCartButtonProps) {
  const { getCartData } = useContext(CartContext);

  // Modal open/close state
  const [isOpen, setIsOpen] = useState(false);
  // Loading state for the clearing process
  const [isClearing, setIsClearing] = useState(false);
  // Success state to show the confirmation message
  const [isSuccess, setIsSuccess] = useState(false);

  /**
   * Handles the request to clear all items from the cart
   * @param e - Mouse event to manage modal behavior
   */
  async function handleClearCart(e: React.MouseEvent) {
    // Prevent the modal from closing automatically upon clicking
    e.preventDefault();

    try {
      setIsClearing(true);
      const response = await clearCart();

      if (response.status === "success") {
        setIsSuccess(true); // Switch modal view to success state
        getCartData(); // Sync navbar cart count

        // Wait for 1.5s so the user sees the success message, then close and refresh
        setTimeout(() => {
          setIsOpen(false);
          setIsSuccess(false); // Reset for future use
          onUpdate();
        }, 1500);
      }
    } catch (error) {
      console.error("Failed to clear cart:", error);
    } finally {
      setIsClearing(false);
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger
        disabled={isClearing}
        className="group flex items-center text-sm text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50 cursor-pointer border-none outline-none bg-transparent"
      >
        {isClearing ? (
          <Loader2 className="animate-spin mr-2" size={16} />
        ) : (
          <Trash2 className="mr-2" size={16} />
        )}
        Clear Cart
      </AlertDialogTrigger>

      <AlertDialogContent>
        {isSuccess ? (
          /* Success View: Displayed after cart is successfully cleared */
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <CheckCircle2 className="w-16 h-16 text-green-500 mb-4 animate-bounce" />
            <AlertDialogTitle className="text-xl">
              Cart Cleared!
            </AlertDialogTitle>
            <AlertDialogDescription className="mt-2 text-base">
              All items have been successfully removed.
            </AlertDialogDescription>
          </div>
        ) : (
          /* Confirmation View: Initial state before clearing */
          <>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete all items from your shopping cart.
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                disabled={isClearing}
                className="cursor-pointer"
              >
                Cancel
              </AlertDialogCancel>

              <AlertDialogAction
                onClick={handleClearCart}
                disabled={isClearing}
                className="bg-red-600 hover:bg-red-700 text-white w-32 flex justify-center transition-all cursor-pointer"
              >
                {/* Show spinner during API call, otherwise show text */}
                {isClearing ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  "Yes, clear cart"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
