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

export default function AddToWishlistBtn({
  prodId,
  variant = "icon",
}: AddToWishlistBtnProps) {
  // بنجيب الداتا من الكونتكست
  const { wishlistItems, refreshWishlist } = useContext(WishlistContext);
  const [isloading, setIsloading] = useState(false);

  // السطر السحري: هل الـ ID ده موجود جوه المصفوفة؟
  const isAlreadyInWishlist = wishlistItems.includes(prodId);

  async function handleWishlistAction() {
    // 🌟 اللوجيك الجديد: لو المنتج موجود، امسحه
    if (isAlreadyInWishlist) {
      try {
        setIsloading(true);
        await removeWishlistItem(prodId);
        toast.success("Product removed from wishlist");
        await refreshWishlist(); // تحديث الرقم والمصفوفة
      } catch (error) {
        toast.error("Error removing item");
      } finally {
        setIsloading(false);
      }
      return; // بنوقف الفانكشن هنا عشان ميكملش ويضيفه تاني
    }

    // 🌟 لو المنتج مش موجود، ضيفه
    try {
      setIsloading(true);
      const response = await addProductToWishlist(prodId);
      if (response.status === "success") {
        toast.success(response.message);
        await refreshWishlist(); // تحديث الرقم والمصفوفة
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error((error as Error).message);
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
            fill={isAlreadyInWishlist ? "currentColor" : "none"}
          />
        )}
        <span>
          {isAlreadyInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
        </span>
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
