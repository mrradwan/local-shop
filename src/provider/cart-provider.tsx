"use client";
import React, { createContext, useEffect, useState } from "react";
import { getCart } from "@/actions/cart.action";
import { useSession } from "next-auth/react";

interface CartContextI {
  numOfCartItems: number;
  cartItemIds: string[]; // 🌟 1. ضفنا مصفوفة الآيديهات هنا
  getCartData: () => Promise<void>;
}

export const CartContext = createContext<CartContextI>({
  numOfCartItems: 0,
  cartItemIds: [], // 🌟 2. قيمة مبدئية فاضية
  getCartData: async () => {},
});

export default function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [cartItemIds, setCartItemIds] = useState<string[]>([]); // 🌟 3. الـ State اللي هتشيل الآيديهات
  const { data: session, status } = useSession();
  async function getCartData() {
    try {
      const response = await getCart();

      if (response?.status === "success" && response?.data?.products) {
        const totalItems = response.data.products.reduce(
          (acc: number, counter: { count: number }) => acc + counter.count,
          0,
        );
        setNumOfCartItems(totalItems);

        // 🌟 4. السطر السحري: بناخد الـ IDs ونحفظها (وحددنا النوع عشان ESLint ميزعلش)
        const ids = response.data.products.map(
          (item: { product: { id?: string; _id?: string } }) =>
            item.product.id || item.product._id || "",
        );
        setCartItemIds(ids);
      } else {
        // لو مفيش منتجات أو اليوزر عمل لوج أوت، نصفر السلة والآيديهات
        setNumOfCartItems(0);
        setCartItemIds([]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const initCart = async () => {
      if (status === "unauthenticated") return;
      if (status === "authenticated") {
        await getCartData();
      }
    };

    initCart();
  }, [status]);

  return (
    <>
      {/* 🌟 5. مررنا الـ cartItemIds للـ Provider عشان زرار الإضافة يقدر يقرأها */}
      <CartContext.Provider
        value={{ numOfCartItems, getCartData, cartItemIds }}
      >
        {children}
      </CartContext.Provider>
    </>
  );
}
