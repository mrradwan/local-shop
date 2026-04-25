import { NextAuthOptions, DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode, JwtPayload } from "jwt-decode";

/**
 * --- Module Augmentation ---
 * Extending the built-in NextAuth types to include custom properties
 * like 'id', 'role', and the API 'token' in the session object.
 */
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"]; // Merges custom fields with default name/email/image
    token: string;
  }
}

/**
 * Custom Interfaces for API response and JWT payload mapping
 */
interface AuthUser {
  id: string;
  user: {
    name: string;
    email: string;
    role: string;
  };
  token: string;
}

interface CustomJwtPayload extends JwtPayload {
  id: string;
}

/**
 * NextAuth Configuration Options
 */
export const authOptions: NextAuthOptions = {
  // Define custom authentication pages
  pages: {
    signIn: "/login",
  },

  // Configure Authentication Providers
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      /**
       * Authorize Logic:
       * Validates credentials against the external RouteMisr API.
       */
      async authorize(credentials) {
        const res = await fetch(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          },
        );

        const data = await res.json();

        // On successful login, decode the token to extract the user ID
        if (data.message === "success") {
          const decodedToken = jwtDecode<CustomJwtPayload>(data.token);
          return {
            id: decodedToken.id,
            user: data.user,
            token: data.token,
          };
        } else {
          // Reject with API error message
          throw new Error(
            data.message || "Something went wrong during authentication",
          );
        }
      },
    }),
  ],

  /**
   * NextAuth Callbacks:
   * Used to persist data from the 'authorize' function into the JWT and Session.
   */
  callbacks: {
    /**
     * JWT Callback:
     * Runs whenever a JWT is created or updated.
     * Persists user data and API token into the encrypted JWT cookie.
     */
    async jwt({ token, user }) {
      if (user) {
        const myUser = user as unknown as AuthUser;
        token.id = myUser.id;
        token.userData = myUser.user;
        token.rawToken = myUser.token;
      }
      return token;
    },

    /**
     * Session Callback:
     * Runs whenever a session is checked (e.g., via useSession or getServerSession).
     * Maps the data stored in the JWT into the session object accessible by the UI.
     */
    async session({ session, token }) {
      if (token && session.user) {
        const userData = token.userData as AuthUser["user"];

        // Inject custom properties into the session object
        session.user.id = token.id as string;
        session.user.role = userData?.role;
        session.user.name = userData?.name;
        session.user.email = userData?.email;

        // Inject the raw API token for use in subsequent Server Actions/API calls
        session.token = token.rawToken as string;
      }
      return session;
    },
  },
};
