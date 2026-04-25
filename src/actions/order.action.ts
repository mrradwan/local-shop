"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

/**
 * Address details required for shipping the order
 */
interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
  postalCode: string;
}

/**
 * Extended NextAuth session to include the authentication token
 */
interface CustomSession {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
  };
  token?: string;
}

/**
 * Base URLs for Orders API
 */
const ORDERS_API = "https://ecommerce.routemisr.com/api/v2/orders";
const USER_ORDERS_API = "https://ecommerce.routemisr.com/api/v1/orders/user";

/**
 * Create a cash-on-delivery (COD) order
 * @param cartId - The unique identifier of the user's cart
 * @param shippingAddress - The delivery address information
 */
export async function createCashOrder(cartId: string, shippingAddress: ShippingAddress) {
  try {
    // 1. Retrieve the current user session and token
    const session = await getServerSession(authOptions) as CustomSession | null;
    const token = session?.token;

    // 2. Validate authentication
    if (!token) {
      return { 
        status: "error", 
        message: "Your session has expired. Please log in again." 
      };
    }

    // 3. Validate cart existence
    if (!cartId) {
      return { 
        status: "error", 
        message: "Your cart is empty or invalid." 
      };
    }

    // 4. Execute the order creation request
    const response = await fetch(`${ORDERS_API}/${cartId}`, {
      method: "POST",
      headers: {
        "token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ shippingAddress }),
    });

    const result = await response.json();

    // 5. Handle API errors
    if (!response.ok) {
      return { 
        status: "error", 
        message: result.message || "Something went wrong while placing your order." 
      };
    }

    return { 
      status: "success", 
      data: result 
    };

  } catch (error) {
    console.error("Order Action Error:", error);
    return { 
      status: "error", 
      message: "Server error occurred. Please try again later." 
    };
  }
}

/**
 * Retrieve all orders associated with a specific user ID
 * @param userId - The unique identifier of the user
 */
export async function getUserOrders(userId: string) {
  if (!userId) return [];

  try {
    const res = await fetch(`${USER_ORDERS_API}/${userId}`, { 
      cache: "no-store" // Ensure we always fetch the latest orders
    });
    
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
}