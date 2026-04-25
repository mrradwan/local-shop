import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

/**
 * getUserToken - Server-side utility
 * Retrieves and decodes the NextAuth session token directly from cookies.
 * Useful for accessing the raw API token in Server Actions or Metadata.
 */
export async function getUserToken() {
  // Await cookie store access (required in Next.js 15+)
  const cookieStore = await cookies();

  /**
   * Determine the session token name based on the environment.
   * Production uses '__Secure-' prefix for enhanced security over HTTPS.
   */
  const tokenName =
    process.env.NODE_ENV === "production"
      ? "__Secure-next-auth.session-token"
      : "next-auth.session-token";

  // Attempt to retrieve the raw encrypted token value from cookies
  const decodedToken = cookieStore.get(tokenName)?.value;

  // Early return if no session cookie exists
  if (!decodedToken) return null;

  /**
   * Decode the JWT token using the NextAuth secret.
   * This decrypts the payload and returns the session object/token.
   */
  const token = await decode({
    token: decodedToken,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  // Return the specific API token string if available
  return token?.token;
}
