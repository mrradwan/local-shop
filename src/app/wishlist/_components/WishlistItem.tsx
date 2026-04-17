"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Loader2, CheckCircle2 } from "lucide-react";
import { WishlistProduct } from "@/types/wishlist.type";
import { removeWishlistItem } from "@/actions/wishlist.action";
import AddToCartBtn from "@/components/cart/AddToCartBtn";
import { WishlistContext } from "@/provider/wishlist-provider";
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

interface WishlistItemProps {
  item: WishlistProduct;
  onUpdate: () => void;
}

export default function WishlistItem({ item, onUpdate }: WishlistItemProps) {
  const { refreshWishlist } = useContext(WishlistContext);
  const [isRemoving, setIsRemoving] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isRemoveSuccess, setIsRemoveSuccess] = useState(false);

  async function handleRemove(e: React.MouseEvent) {
    e.preventDefault();
    try {
      setIsRemoving(true);
      await removeWishlistItem(item.id);
      await refreshWishlist();
      setIsRemoveSuccess(true);

      setTimeout(() => {
        setIsDialogOpen(false);
        setIsRemoveSuccess(false);
        onUpdate();
      }, 1500);
    } catch (error) {
      console.error("Failed to remove item:", error);
    } finally {
      setIsRemoving(false);
    }
  }

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:px-6 md:py-5 items-center hover:bg-gray-50/50 transition-colors ${isRemoving ? "opacity-60 pointer-events-none" : ""}`}
    >
      {/* المنتج */}
      <div className="md:col-span-6 flex items-center gap-4">
        <Link
          href={`/products/${item.id}`}
          className="w-20 h-20 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden shrink-0"
        >
          <Image
            src={item.imageCover}
            alt={item.title}
            width={200}
            height={200}
            className="w-full h-full object-contain p-2"
          />
        </Link>
        <div className="min-w-0">
          <Link href={`/products/${item.id}`} className="group/title">
            <h3 className="font-semibold text-gray-900 group-hover/title:text-green-600 transition-colors text-base sm:text-lg truncate">
              {item.title}
            </h3>
          </Link>
          <p className="text-sm text-gray-400 mt-1">{item.category.name}</p>
        </div>
      </div>

      {/* السعر */}
      <div className="md:col-span-2 flex md:justify-center items-center gap-2">
        <span className="md:hidden text-sm text-gray-500">Price:</span>
        <div className="text-right md:text-center">
          <div className="font-semibold text-gray-900">{item.price} EGP</div>
        </div>
      </div>

      {/* الحالة (Stock) */}
      <div className="md:col-span-2 flex md:justify-center">
        <span className="md:hidden text-sm text-gray-500 mr-2">Status:</span>
        {item.quantity > 0 ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
            In Stock
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
            Out of Stock
          </span>
        )}
      </div>

      {/* الأكشنز (Add to Cart + Remove) */}
      <div className="md:col-span-2 flex items-center gap-2 md:justify-center">
        <AddToCartBtn prodId={item.id} variant="text" />

        {/* مودال المسح */}
        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogTrigger className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all disabled:opacity-50 bg-white p-0 cursor-pointer">
            <Trash2 size={18} />
          </AlertDialogTrigger>

          <AlertDialogContent>
            {isRemoveSuccess ? (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <CheckCircle2 className="w-16 h-16 text-green-500 mb-4 animate-bounce" />
                <AlertDialogTitle className="text-xl">
                  Item Removed!
                </AlertDialogTitle>
                <AlertDialogDescription className="mt-2 text-base">
                  <span className="font-semibold">{item.title}</span> has been
                  removed from your wishlist.
                </AlertDialogDescription>
              </div>
            ) : (
              <>
                <AlertDialogHeader>
                  <AlertDialogTitle>Remove from Wishlist</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to remove{" "}
                    <span className="font-semibold text-gray-800">
                      {item.title}
                    </span>{" "}
                    from your wishlist?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={isRemoving}>
                    Keep it
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleRemove}
                    disabled={isRemoving}
                    className="bg-red-600 hover:bg-red-700 text-white w-28 flex justify-center transition-all"
                  >
                    {isRemoving ? (
                      <Loader2 className="animate-spin" size={18} />
                    ) : (
                      "Remove"
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </>
            )}
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
