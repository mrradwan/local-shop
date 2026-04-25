import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/commons/navbar";
import Footer from "@/components/commons/footer";
import { Toaster } from "@/components/ui/sonner";
import AuthProvider from "./../provider/auth-provider";
import CartContextProvider from "@/provider/cart-provider";
import WishlistContextProvider from "@/provider/wishlist-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";

// --- Font Configurations ---
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// --- SEO Metadata ---
export const metadata: Metadata = {
  title: "FreshCart",
  description:
    "Offering a seamless shopping experience with a wide range of products and features.",
};

/**
 * Root Layout Component
 * Serves as the base structure for the entire application, wrapping it with
 * necessary providers for Auth, Cart, Wishlist, and Query state management.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Global Application Providers Tree */}
        <AuthProvider>
          <CartContextProvider>
            <WishlistContextProvider>
              {/* NuqsAdapter for advanced search-param state management */}
              <NuqsAdapter>
                {/* Global Navigation Component */}
                <Navbar />

                {/* Main Page Content */}
                {children}

                {/* Toast Notification System */}
                <Toaster position="top-left" richColors />

                {/* Global Footer Component */}
                <Footer />
              </NuqsAdapter>
            </WishlistContextProvider>
          </CartContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
