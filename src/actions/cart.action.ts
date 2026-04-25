"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { CustomSession } from "@/types/order.type";

/**
 * Base URL for Cart API
 */
const CART_API_URL = "https://ecommerce.routemisr.com/api/v2/cart";

/**
 * Add a new product to the authenticated user's cart
 * @param productId - ID of the product to add
 */
export async function addProductToCart(productId: string) {
  const session = (await getServerSession(authOptions)) as CustomSession | null;

  if (!session?.token) {
    return { status: "error", message: "Unauthenticated User" };
  }

  const response = await fetch(`${CART_API_URL}`, {
    method: "POST",
    headers: {
      "token": session.token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId }),
  });

  return await response.json();
}

/**
 * Fetch all items currently in the user's cart
 */
export async function getCart() {
  const session = (await getServerSession(authOptions)) as CustomSession | null;

  if (!session?.token) {
    return { status: "fail", message: "Unauthenticated" };
  }

  const response = await fetch(`${CART_API_URL}`, {
    method: "GET",
    headers: { 
      "token": session.token 
    },
    cache: "no-store", // Bypass cache to ensure data accuracy
  });

  return await response.json();
}

/**
 * Update the quantity of a specific product in the cart
 * @param productId - Target product ID
 * @param count - New quantity to set
 */
export async function updateCartItemQuantity(productId: string, count: number) {
  const session = (await getServerSession(authOptions)) as CustomSession | null;

  if (!session?.token) {
    return { status: "error", message: "Unauthenticated" };
  }

  const response = await fetch(`${CART_API_URL}/${productId}`, {
    method: "PUT",
    headers: {
      "token": session.token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ count }),
  });

  return await response.json();
}

/**
 * Delete a single product from the cart
 * @param productId - ID of the product to remove
 */
export async function removeCartItem(productId: string) {
  const session = (await getServerSession(authOptions)) as CustomSession | null;

  if (!session?.token) {
    return { status: "error", message: "Unauthenticated" };
  }

  const response = await fetch(`${CART_API_URL}/${productId}`, {
    method: "DELETE",
    headers: { 
      "token": session.token 
    },
  });

  return await response.json();
}

/**
 * Clear the entire cart by removing all products
 */
export async function clearCart() {
  const session = (await getServerSession(authOptions)) as CustomSession | null;

  if (!session?.token) {
    return { status: "error", message: "Unauthenticated" };
  }

  const response = await fetch(`${CART_API_URL}`, {
    method: "DELETE",
    headers: { 
      "token": session.token 
    },
    cache: "no-store",
  });

  return await response.json();
}