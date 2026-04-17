"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { CustomSession } from "@/types/order.type"; // Ensure this contains your extended session type

const CART_API_URL = "https://ecommerce.routemisr.com/api/v2/cart";

/**
 * Add a specific product to the user's cart
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
 * Retrieve all products currently in the user's cart
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
    cache: "no-store", // Ensure we always get the latest cart data
  });

  return await response.json();
}

/**
 * Update the quantity (count) of a specific item in the cart
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
 * Remove a single item from the cart using its product ID
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
 * Completely clear all items from the user's cart
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