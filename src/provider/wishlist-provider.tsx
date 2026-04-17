"use client";
import React, { createContext, useEffect, useState } from "react";
import { getWishlist } from "@/actions/wishlist.action";
import { useSession } from "next-auth/react";

interface WishlistContextI {
  wishlistCount: number;
  wishlistItems: string[];
  refreshWishlist: () => Promise<void>;
}

export const WishlistContext = createContext<WishlistContextI>({
  wishlistCount: 0,
  wishlistItems: [],
  refreshWishlist: async () => {},
});

export default function WishlistContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [wishlistCount, setWishlistCount] = useState(0);
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  const { data: session, status } = useSession();

  async function getWishlistData() {
    try {
      const response = await getWishlist();
      // 🛡️ زيادة أمان: اتأكدنا إن الداتا موجودة
      if (response?.status === "success" && response?.data) {
        setWishlistCount(response.count);

        // ✨ شيلنا any وحطينا نوع الأوبجيكت عشان ESLint يفرح بيك
        const ids = response.data.map(
          (item: { _id?: string; id?: string }) => item.id || item._id || "",
        );
        setWishlistItems(ids);
      } else {
        setWishlistCount(0);
        setWishlistItems([]);
      }
    } catch (error) {
      console.error("Failed to fetch wishlist data:", error);
    }
  }

  useEffect(() => {
    // ✨ الحل القياسي بتاع رياكت للـ Cascading Renders
    const initWishlist = async () => {
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
