"use server";

import { revalidatePath } from "next/cache";

/**
 * Base URL for RouteMisr Addresses API
 */
const BASE_URL = "https://ecommerce.routemisr.com/api/v1/addresses";

/**
 * Fetch all addresses for the logged-in user
 * @param token - User authentication token
 */
export const getUserAddressesAction = async (token: string) => {
  if (!token) return { status: "error", message: "No token provided" };

  try {
    const res = await fetch(BASE_URL, {
      method: "GET",
      headers: { token },
      cache: "no-store", // Ensure fresh data on every request
    });
    return await res.json();
  } catch (error) {
    console.error("Error fetching addresses:", error);
    return { status: "error", message: "Failed to fetch addresses" };
  }
};

/**
 * Add a new address to the user's profile
 * @param token - User authentication token
 * @param addressData - Address details (name, details, phone, city)
 */
export const addAddressAction = async (
  token: string, 
  addressData: { name: string; details: string; phone: string; city: string }
) => {
  if (!token) return { status: "error", message: "No token provided" };

  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token,
      },
      body: JSON.stringify(addressData),
    });
    const data = await res.json();

    // Refresh the addresses page to show updated list
    revalidatePath("/profile/addresses");
    return data;
  } catch (error) {
    console.error("Error adding address:", error);
    return { status: "error", message: "Failed to add address" };
  }
};

/**
 * Delete a specific address by ID
 * @param token - User authentication token
 * @param addressId - Unique ID of the address to be removed
 */
export const removeAddressAction = async (token: string, addressId: string) => {
  if (!token) return { status: "error", message: "No token provided" };

  try {
    const res = await fetch(`${BASE_URL}/${addressId}`, {
      method: "DELETE",
      headers: { token },
    });
    const data = await res.json();

    // Refresh the addresses page to update the UI after deletion
    revalidatePath("/profile/addresses");
    return data;
  } catch (error) {
    console.error("Error removing address:", error);
    return { status: "error", message: "Failed to remove address" };
  }
};