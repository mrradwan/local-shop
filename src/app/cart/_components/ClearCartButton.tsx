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
        const {getCartData} = useContext(CartContext)
    
  // 1. للتحكم في فتح وقفل المودال
  const [isOpen, setIsOpen] = useState(false);
  // 2. للتحكم في اللودر
  const [isClearing, setIsClearing] = useState(false);
  // 3. للتحكم في إظهار رسالة النجاح
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleClearCart(e: React.MouseEvent) {
    // 👈 السطر ده هو السحر: بيمنع المودال إنه يقفل أوتوماتيك أول ما تدوس
    e.preventDefault();

    try {
      setIsClearing(true);
      const response = await clearCart();

      if (response.status === "success") {
        setIsSuccess(true); // نقلب شكل المودال لرسالة النجاح
          getCartData()
        // نستنى ثانية ونص عشان اليوزر يشوف النجاح، وبعدين نقفل المودال ونعمل ريفرش للسلة
        setTimeout(() => {
          setIsOpen(false);
          setIsSuccess(false); // نرجعه لحالته الأصلية للمرات الجاية
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
        className="group flex items-center text-sm text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50 cursor-pointer"
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
          // 🌟 حالة النجاح (بعد ما يتم المسح)
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
          // 🌟 الحالة العادية (تأكيد المسح)
          <>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete all items from your shopping cart.
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isClearing}>
                Cancel
              </AlertDialogCancel>

              <AlertDialogAction
                onClick={handleClearCart}
                disabled={isClearing}
                className="bg-red-600 hover:bg-red-700 text-white w-32 flex justify-center transition-all"
              >
                {/* 👇 لو بيحمل، هنعرض سبينر، لو لأ هنعرض النص العادي 👇 */}
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
