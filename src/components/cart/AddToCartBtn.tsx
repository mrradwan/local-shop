"use client";
import React, { useContext, useState } from "react";
import { Button } from "../ui/button";
import { ShoppingCart, Check, Trash2 } from "lucide-react";
// 🌟 استدعينا الدالة الأصلية بتاعتك بالظبط زي ما هي في الـ CartItem
import { addProductToCart, removeCartItem } from "@/actions/cart.action"; 
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { CartContext } from "@/provider/cart-provider";
import { redirect } from "next/navigation";

interface AddToCartBtnProps {
  prodId: string;
  variant?: "icon" | "text";
}

export default function AddToCartBtn({ prodId, variant = "icon" }: AddToCartBtnProps) {
  // 🌟 تأكد إنك ضفت cartItemIds جوه الـ cart-provider زي ما اتفقنا
  const { getCartData, cartItemIds = [] } = useContext(CartContext);
  const [isloading, setIsloading] = useState(false);

  // السطر السحري: هل المنتج ده موجود في السلة؟
  const isAlreadyInCart = cartItemIds.includes(prodId);

  async function handleCartAction() {
    // 🌟 اللوجيك الجديد: لو المنتج في السلة، امسحه
    if (isAlreadyInCart) {
      try {
        setIsloading(true);
        // 🌟 استخدمنا الدالة بتاعتك بالظبط
        await removeCartItem(prodId); 
        toast.success("Product removed from cart");
        await getCartData(); // تحديث السلة والناف بار
      } catch (error) {
        toast.error("Error removing item");
      } finally {
        setIsloading(false);
      }
      return; // بنوقف الفانكشن هنا عشان ميكملش ويضيفه تاني
    }

    // 🌟 لو مش في السلة، ضيفه
    try {
      setIsloading(true);
      const response = await addProductToCart(prodId);
      toast.success(response.message || "Added to cart successfully");
      await getCartData(); // تحديث السلة والناف بار
    } catch (error) {
      toast.error((error as Error).message);
      redirect("/login")
    } finally {
      setIsloading(false);
    }
  }

  // 🌟 لو الزرار نص كبير
  if (variant === "text") {
    return (
      <Button
        disabled={isloading}
        className={`flex-1 py-3.5 px-6 rounded-xl font-medium transition-all flex items-center justify-center gap-2 shadow-sm
          ${
            isAlreadyInCart
              ? "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200" // شكل الزرار لو المنتج متضاف (أحمر عشان يمسح)
              : "bg-green-600 text-white hover:bg-green-700 shadow-green-600/25 active:scale-[0.98]" // الشكل العادي الأخضر
          }`}
        onClick={handleCartAction}
      >
        {isloading ? (
          <Spinner className={isAlreadyInCart ? "text-red-600" : "text-white"} />
        ) : isAlreadyInCart ? (
          <Trash2 size={20} /> // أيقونة المسح
        ) : (
          <ShoppingCart size={20} /> // أيقونة الإضافة
        )}
        <span>{isAlreadyInCart ? "Remove from Cart" : "Add to Cart"}</span>
      </Button>
    );
  }

  // 🌟 لو الزرار أيقونة بس
  return (
    <Button
      disabled={isloading}
      variant="outline"
      size="icon"
      className={`transition-colors rounded-full shrink-0 shadow-sm
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
        <Check size={18} /> // علامة صح لو متضاف
      ) : (
        <ShoppingCart size={18} />
      )}
    </Button>
  );
}