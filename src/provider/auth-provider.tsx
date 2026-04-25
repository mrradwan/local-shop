"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";

/**
 * AuthProvider Component
 * A Client-side wrapper that enables the use of NextAuth hooks (like useSession).
 * It provides the session context to all descendant components,
 * allowing them to access user authentication state globally.
 */
export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* SessionProvider: Syncs the session state across the app 
          and ensures that the UI re-renders when the session expires or changes.
      */}
      <SessionProvider>{children}</SessionProvider>
    </>
  );
}
