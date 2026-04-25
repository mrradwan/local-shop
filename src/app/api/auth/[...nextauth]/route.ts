import { authOptions } from "@/lib/authOptions"
import NextAuth from "next-auth"

/**
 * Initialize NextAuth handler with the configured options
 */
const handler = NextAuth(authOptions)

/**
 * Export the handler for both GET and POST requests
 * required for NextAuth REST API routes
 */
export { handler as GET, handler as POST }