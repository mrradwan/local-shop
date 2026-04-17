"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FaLock, FaTruck } from "react-icons/fa";

// استدعاء مكونات Shadcn الأساسية بس
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createCashOrder } from "@/actions/order.action";

// 🌟 1. تعريف الـ Schema
const formSchema = z.object({
  details: z.string().min(5, "Address details must be at least 5 characters"),
  phone: z.string().regex(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number"),
  city: z.string().min(2, "City is required"),
  postalCode: z.string().min(2, "Postal code is required"),
});

type FormData = z.infer<typeof formSchema>;

interface CheckoutDialogProps {
  cartId: string;
  buttonText?: string;
}

export default function CheckoutDialog({ cartId, buttonText = "Secure Checkout" }: CheckoutDialogProps) {
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  // 🌟 2. تهيئة React Hook Form بدون زحمة Shadcn
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  // 🌟 3. دالة الـ Submit
  async function onSubmit(values: FormData) {
    if (!cartId) {
      toast.error("Cart ID is missing!");
      return;
    }

    setIsPending(true);
    const result = await createCashOrder(cartId, values);
    setIsPending(false);

    if (result.status === "success") {
      toast.success("Order Placed Successfully! 🎉");
      setOpen(false);
      reset();
      router.push("/orders"); // أو صفحة النجاح
    } else {
      toast.error(result.message || "Failed to place order.");
    }
  }

  return (
<>
      {/* 🌟 1. الزرار العادي جداً اللي هيفتح الـ Dialog */}
      <Button 
        onClick={() => setOpen(true)}
        className="w-full h-14 text-base bg-linear-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all flex items-center justify-center gap-3 shadow-lg shadow-green-600/20 active:scale-[0.98]"
      >
        <FaLock />
        <span>{buttonText}</span>
      </Button>

      {/* 🌟 2. الـ Dialog بتاعنا مستقل بذاته */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <FaTruck className="text-green-600" />
              Shipping Details
            </DialogTitle>
            <DialogDescription>
              Enter your delivery address to complete your cash order.
            </DialogDescription>
          </DialogHeader>

          {/* الفورم زي ما هي متغيرة فيها حاجة */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
            
            <div className="space-y-1.5">
              <label htmlFor="details" className="text-sm font-medium text-gray-700">
                Street Address
              </label>
              <Input 
                id="details" 
                placeholder="123 Main St, Apartment 4B" 
                {...register("details")} 
                className={errors.details ? "border-red-500 focus-visible:ring-red-500" : ""}
              />
              {errors.details && (
                <p className="text-xs text-red-500 mt-1">{errors.details.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <Input 
                id="phone" 
                placeholder="01xxxxxxxxx" 
                {...register("phone")} 
                className={errors.phone ? "border-red-500 focus-visible:ring-red-500" : ""}
              />
              {errors.phone && (
                <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="city" className="text-sm font-medium text-gray-700">
                  City
                </label>
                <Input 
                  id="city" 
                  placeholder="Cairo" 
                  {...register("city")} 
                  className={errors.city ? "border-red-500 focus-visible:ring-red-500" : ""}
                />
                {errors.city && (
                  <p className="text-xs text-red-500 mt-1">{errors.city.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="postalCode" className="text-sm font-medium text-gray-700">
                  Postal Code
                </label>
                <Input 
                  id="postalCode" 
                  placeholder="12345" 
                  {...register("postalCode")} 
                  className={errors.postalCode ? "border-red-500 focus-visible:ring-red-500" : ""}
                />
                {errors.postalCode && (
                  <p className="text-xs text-red-500 mt-1">{errors.postalCode.message}</p>
                )}
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setOpen(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-green-600 hover:bg-green-700"
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