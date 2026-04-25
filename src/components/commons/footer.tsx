import {
  Headset,
  Mail,
  MapPin,
  Phone,
  RotateCcw,
  ShieldHalf,
  Van,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  FaCcMastercard,
  FaCcVisa,
  FaFacebookF,
  FaInstagram,
  FaPaypal,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { TfiShoppingCart } from "react-icons/tfi";

export default function Footer() {
  return (
    <>
      {/* --- Trust Badges & Service Features Section --- */}
      <div className="bg-green-50 border-y border-green-100">
        <div className="container mx-auto px-4 py-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Free Shipping Badge */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                <Van size={26} className="text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">
                  Free Shipping
                </h4>
                <p className="text-gray-500 text-xs">On orders over 500 EGP</p>
              </div>
            </div>
            {/* Returns Badge */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                <RotateCcw size={26} className="text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">
                  Easy Returns
                </h4>
                <p className="text-gray-500 text-xs">14-day return policy</p>
              </div>
            </div>
            {/* Security Badge */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                <ShieldHalf size={26} className="text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">
                  Secure Payment
                </h4>
                <p className="text-gray-500 text-xs">100% secure checkout</p>
              </div>
            </div>
            {/* Support Badge */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                <Headset size={26} className="text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">
                  24/7 Support
                </h4>
                <p className="text-gray-500 text-xs">Contact us anytime</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* --- Brand Profile & Contact Info --- */}
            <div className="md:col-span-2 lg:col-span-4">
              <Link href="/" className="inline-block mb-6">
                <div className="bg-white rounded-lg px-4 py-2 inline-block">
                  <div className="shrink-0 flex items-center gap-2 text-2xl font-bold">
                    <TfiShoppingCart className="text-green-600" />
                    <h1 className="text-black">FreshCart</h1>
                  </div>
                </div>
              </Link>
              <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                FreshCart is your one-stop destination for quality products.
                From fashion to electronics, we bring you the best brands at
                competitive prices with a seamless shopping experience.
              </p>
              {/* Contact Details */}
              <div className="space-y-3 mb-6">
                <a
                  href="tel:+18001234567"
                  className="flex items-center gap-3 text-gray-400 hover:text-green-400 transition-colors text-sm"
                >
                  <Phone size={16} className="text-green-500 shrink-0" />
                  <span>+1 (800) 123-4567</span>
                </a>
                <a
                  href="mailto:support@freshcart.com"
                  className="flex items-center gap-3 text-gray-400 hover:text-green-400 transition-colors text-sm"
                >
                  <Mail size={16} className="text-green-500 shrink-0" />
                  <span>support@freshcart.com</span>
                </a>
                <div className="flex items-start gap-3 text-gray-400 text-sm">
                  <MapPin
                    size={16}
                    className="text-green-500 shrink-0 mt-0.5"
                  />
                  <span>123 Commerce Street, New York, NY 10001</span>
                </div>
              </div>
              {/* Social Media Links */}
              <div className="flex items-center gap-3">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-green-600 hover:text-white transition-colors"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-green-600 hover:text-white transition-colors"
                >
                  <FaTwitter />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-green-600 hover:text-white transition-colors"
                >
                  <FaInstagram />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-green-600 hover:text-white transition-colors"
                >
                  <FaYoutube />
                </a>
              </div>
            </div>

            {/* --- Shop Quick Links --- */}
            <div className="lg:col-span-2">
              <h3 className="font-semibold text-lg mb-5 border-b border-gray-800 pb-2">
                Shop
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/products"
                    className="text-gray-400 hover:text-green-400 transition-colors text-sm"
                  >
                    All Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="/categories"
                    className="text-gray-400 hover:text-green-400 transition-colors text-sm"
                  >
                    Categories
                  </Link>
                </li>
                <li>
                  <Link
                    href="/brands"
                    className="text-gray-400 hover:text-green-400 transition-colors text-sm"
                  >
                    Brands
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products?category=6439d58a0049ad0b52b9003f"
                    className="text-gray-400 hover:text-green-400 transition-colors text-sm"
                  >
                    Electronics
                  </Link>
                </li>
              </ul>
            </div>

            {/* --- Account Management Links --- */}
            <div className="lg:col-span-2">
              <h3 className="font-semibold text-lg mb-5 border-b border-gray-800 pb-2">
                Account
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/profile"
                    className="text-gray-400 hover:text-green-400 transition-colors text-sm"
                  >
                    My Account
                  </Link>
                </li>
                <li>
                  <Link
                    href="/wishlist"
                    className="text-gray-400 hover:text-green-400 transition-colors text-sm"
                  >
                    Wishlist
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cart"
                    className="text-gray-400 hover:text-green-400 transition-colors text-sm"
                  >
                    Shopping Cart
                  </Link>
                </li>
              </ul>
            </div>

            {/* --- Support & Help Links --- */}
            <div className="lg:col-span-2">
              <h3 className="font-semibold text-lg mb-5 border-b border-gray-800 pb-2">
                Support
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-400 hover:text-green-400 transition-colors text-sm"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shipping"
                    className="text-gray-400 hover:text-green-400 transition-colors text-sm"
                  >
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link
                    href="/returns"
                    className="text-gray-400 hover:text-green-400 transition-colors text-sm"
                  >
                    Returns & Refunds
                  </Link>
                </li>
              </ul>
            </div>

            {/* --- Legal & Policy Links --- */}
            <div className="lg:col-span-2">
              <h3 className="font-semibold text-lg mb-5 border-b border-gray-800 pb-2">
                Legal
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/privacy"
                    className="text-gray-400 hover:text-green-400 transition-colors text-sm"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-gray-400 hover:text-green-400 transition-colors text-sm"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* --- Copyright & Payment Gateway Icons --- */}
        <div className="border-t border-gray-800">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-sm text-center md:text-left">
                © 2026 FreshCart. All rights reserved.
              </p>
              <div className="flex items-center gap-4 text-gray-500">
                <FaCcVisa
                  className="text-3xl hover:text-green-400 transition-colors"
                  title="Visa"
                />
                <FaCcMastercard
                  className="text-3xl hover:text-green-400 transition-colors"
                  title="Mastercard"
                />
                <FaPaypal
                  className="text-3xl hover:text-green-400 transition-colors"
                  title="PayPal"
                />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
