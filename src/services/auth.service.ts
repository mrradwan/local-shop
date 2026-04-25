import { LoginFormData, RegisterFormValues } from "@/schemas/auth.schemas";

/**
 * AuthResponse Interface
 * Standardizes the expected response structure from the RouteMisr Auth API.
 */
interface AuthResponse {
  message?: string;
  statusMsg?: string;
  status?: string;
  token?: string;
}

/**
 * registerUser - Service to create a new user account.
 * Note: We destructure 'terms' to avoid sending non-API fields to the backend.
 */
export async function registerUser(data: RegisterFormValues) {
  const { terms, ...apiData } = data;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData),
      },
    );
    return await response.json();
  } catch (error) {
    console.error("Register Error:", error);
    return { message: "Network error. Please check your internet connection." };
  }
}

/**
 * loginUser - Service to authenticate existing users.
 * Destructures 'rememberMe' as it's handled locally, not by the external API.
 */
export async function loginUser(data: LoginFormData) {
  const { rememberMe, ...apiData } = data;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/signin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData),
      },
    );
    return await response.json();
  } catch (error) {
    console.error("Login Error:", error);
    return { message: "Network error. Please check your internet connection." };
  }
}

/**
 * forgotPasswordApi - Initiates the password recovery process.
 * Sends a reset code to the provided email address.
 */
export const forgotPasswordApi = async (
  email: string,
): Promise<AuthResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/forgotPasswords`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    },
  );
  const data = (await response.json()) as AuthResponse;

  if (!response.ok)
    throw new Error(data.message || "Failed to send reset code");
  return data;
};

/**
 * verifyResetCodeApi - Validates the OTP sent to the user's email.
 */
export const verifyResetCodeApi = async (
  resetCode: string,
): Promise<AuthResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verifyResetCode`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resetCode }),
    },
  );
  const data = (await response.json()) as AuthResponse;

  // Note: API might return status 'Success' even for some 4xx responses, so we check both.
  if (!response.ok && data.status !== "Success")
    throw new Error(data.message || "Invalid or expired code");
  return data;
};

/**
 * resetPasswordApi - Finalizes the password reset using the verified identity.
 * Updates the user's password in the database.
 */
export const resetPasswordApi = async (
  email: string,
  newPassword: string,
): Promise<AuthResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/resetPassword`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, newPassword }),
    },
  );
  const data = (await response.json()) as AuthResponse;

  if (!response.ok) throw new Error(data.message || "Failed to reset password");
  return data;
};
