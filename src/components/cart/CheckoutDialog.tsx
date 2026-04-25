"use client";

import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FaLock, FaTruck } from "react-icons/fa";
import { CartContext } from "@/provider/cart-provider";

// UI Components Imports
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Server Actions and Schema Imports
import { createCashOrder } from "@/actions/order.action";
import { checkoutSchema, CheckoutFormData } from "@/schemas/order.schema";

interface CheckoutDialogProps {
  cartId: string;
  buttonText?: string;
}

export default function CheckoutDialog({
  cartId,
  buttonText = "Secure Checkout",
}: CheckoutDialogProps) {
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const { getCartData } = useContext(CartContext);

  /**
   * Initialize React Hook Form with Zod validation
   * Using centralized schema for consistency across the app
   */
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      details: "",
      phone: "",
      city: "",
      postalCode: "",
    },
  });

  /**
   * Form Submission Handler
   * Handles cash-on-delivery order creation and UI feedback
   */
  async function onSubmit(values: CheckoutFormData) {
    if (!cartId) {
      toast.error("Cart ID is missing! Please refresh the page.");
      return;
    }

    try {
      setIsPending(true);
      const result = await createCashOrder(cartId, values);

      if (result.status === "success") {
        toast.success("Order Placed Successfully! 🎉");
        setOpen(false);
        reset(); // Clear form fields
        getCartData(); // Sync global cart state

        // Navigate to home or a dedicated success page
        router.push("/");
      } else {
        toast.error(result.message || "Failed to place order.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
      console.error(error);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <>
      {/* Trigger Button: Styled as a prominent primary action */}
      <Button
        onClick={() => setOpen(true)}
        className="w-full h-14 text-base bg-linear-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all flex items-center justify-center gap-3 shadow-lg shadow-green-600/20 active:scale-[0.98] border-none outline-none cursor-pointer"
      >
        <FaLock />
        <span>{buttonText}</span>
      </Button>

      {/* Checkout Dialog Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-106.25 bg-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <FaTruck className="text-green-600" />
              Shipping Details
            </DialogTitle>
            <DialogDescription>
              Enter your delivery address to complete your cash order.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
            {/* Address Details Input */}
            <div className="space-y-1.5">
              <label
                htmlFor="details"
                className="text-sm font-medium text-gray-700"
              >
                Street Address
              </label>
              <Input
                id="details"
                placeholder="123 Main St, Apartment 4B"
                {...register("details")}
                className={
                  errors.details
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }
              />
              {errors.details && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.details.message}
                </p>
              )}
            </div>

            {/* Phone Number Input */}
            <div className="space-y-1.5">
              <label
                htmlFor="phone"
                className="text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <Input
                id="phone"
                placeholder="01xxxxxxxxx"
                {...register("phone")}
                className={
                  errors.phone
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }
              />
              {errors.phone && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* City Input */}
              <div className="space-y-1.5">
                <label
                  htmlFor="city"
                  className="text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <Input
                  id="city"
                  placeholder="Cairo"
                  {...register("city")}
                  className={
                    errors.city
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }
                />
                {errors.city && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.city.message}
                  </p>
                )}
              </div>

              {/* Postal Code Input */}
              <div className="space-y-1.5">
                <label
                  htmlFor="postalCode"
                  className="text-sm font-medium text-gray-700"
                >
                  Postal Code
                </label>
                <Input
                  id="postalCode"
                  placeholder="12345"
                  {...register("postalCode")}
                  className={
                    errors.postalCode
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }
                />
                {errors.postalCode && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.postalCode.message}
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons: Cancel and Submit */}
            <div className="pt-4 flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isPending}
                className="cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white cursor-pointer border-none outline-none shadow-md"
                disabled={isPending}
              >
                {isPending ? "Processing..." : "Place Order"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
