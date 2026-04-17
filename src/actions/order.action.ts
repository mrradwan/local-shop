"use server";

import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/lib/authOptions";

interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
  postalCode: string;
}

interface CustomSession {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
  };
  token?: string;
}

const BASE_URL = "https://ecommerce.routemisr.com/api/v2/orders";

export async function createCashOrder(cartId: string, shippingAddress: ShippingAddress) {
  try {
const session = await getServerSession(authOptions) as CustomSession | null;
const token = session?.token;

    if (!token) {
      return { 
        status: "error", 
        message: "Your session has expired. Please log in again." 
      };
    }

    if (!cartId) {
      return { 
        status: "error", 
        message: "Your cart is empty or invalid." 
      };
    }

    const response = await fetch(`${BASE_URL}/${cartId}`, {
      method: "POST",
      headers: {
        "token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ shippingAddress }),
    });

    const result = await response.json();

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