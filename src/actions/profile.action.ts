"use server";

import { revalidatePath } from "next/cache";

/**
 * Base URL for User Profile and Password API
 */
const BASE_URL = "https://ecommerce.routemisr.com/api/v1/users";

export interface UpdateProfileData {
  name: string;
  email: string;
  phone: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  password: string; 
  rePassword: string; 
}

/**
 * Update user basic profile information (name, email, phone)
 * @param token - User authentication token
 * @param data - Updated profile details
 */
export const updateProfileAction = async (token: string, data: UpdateProfileData) => {
  if (!token) return { message: "No token provided" };

  try {
    const res = await fetch(`${BASE_URL}/updateMe`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token, // Explicitly sending the user token
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    // Refresh the profile settings page to show updated data
    revalidatePath("/profile/settings");
    return result;
  } catch (error) {
    return { message: "Failed to update profile" };
  }
};

/**
 * Change the user's password
 * @param token - User authentication token
 * @param data - Current and new password details
 */
export const changePasswordAction = async (token: string, data: ChangePasswordData) => {
  if (!token) return { message: "No token provided" };

  try {
    const res = await fetch(`${BASE_URL}/changeMyPassword`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token, // Explicitly sending the user token
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    return result;
  } catch (error) {
    return { message: "Failed to change password" };
  }
};