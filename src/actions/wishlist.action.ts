"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

/**
 * Wishlist API endpoint from environment variables
 */
const WISHLIST_API_URL = process.env.BASE_URL;

/**
 * Add a specific product to the user's wishlist
 * @param productId - ID of the product to be added
 */
export async function addProductToWishlist(productId: string) {
  const session = await getServerSession(authOptions);

  if (!session || !session.token) {
    throw new Error("Unauthenticated User");
  }

  const response = await fetch(`${WISHLIST_API_URL}/wishlist`, {
    method: "POST",
    body: JSON.stringify({ productId }),
    headers: {
      token: session.token as string,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
}

/**
 * Retrieve all items currently in the user's wishlist
 */
export async function getWishlist() {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.token) {
    return { status: "fail", message: "Unauthenticated" };
  }

  const response = await fetch(`${WISHLIST_API_URL}/wishlist`, {
    method: "GET",
    headers: { token: session.token as string },
  });

  return await response.json();
}

/**
 * Remove a specific product from the user's wishlist
 * @param productId - ID of the product to be removed
 */
export async function removeWishlistItem(productId: string) {
  const session = await getServerSession(authOptions);

  if (!session || !session.token) {
    throw new Error("Unauthenticated");
  }

  const response = await fetch(`${WISHLIST_API_URL}/wishlist/${productId}`, {
    method: "DELETE",
    headers: { token: session.token as string },
  });

  return await response.json();
}