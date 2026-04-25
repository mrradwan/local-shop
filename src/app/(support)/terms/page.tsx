import React from "react";
import PageHeader from "@/components/shared/PageHeader";
import {
  FaArrowRotateLeft,
  FaCreditCard,
  FaFileContract,
  FaHandshake,
  FaIdCard,
  FaScaleBalanced,
  FaTruck,
  FaUserCheck,
} from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function Terms() {
  // Page Header Configuration
  const pageDetails = {
    title: "Terms of Service",
    parentName: "",
    parentLink: "",
    image: null,
    icon: <FaFileContract size={28} className="text-white" />,
    description: "Last updated: February 2026",
  };

  return (
    <>
      <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
        {/* Reusable Page Header */}
        <PageHeader details={pageDetails} hasFilters={false} />

        <div className="container mx-auto px-4 py-12">
          {/* Important Notice Highlight */}
          <div className="bg-linear-to-r from-amber-50 to-amber-100/50 border border-amber-200 rounded-3xl p-6 sm:p-8 mb-12 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/25">
                <FaFileContract className="text-xl text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-amber-900 mb-2">
                  Important Notice
                </h2>
                <p className="text-amber-800 leading-relaxed">
                  By accessing and using FreshCart, you accept and agree to be
                  bound by the terms and provisions of this agreement. Please
                  read these terms carefully before using our services.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Article 1: Acceptance of Terms */}
            <section className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm hover:shadow-lg hover:border-green-100 transition-all duration-300 group">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-green-100 to-green-50 flex items-center justify-center shrink-0 group-hover:from-green-500 group-hover:to-green-400 transition-all duration-300">
                  <FaHandshake className="text-xl text-green-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <span className="text-xs font-bold text-green-600 uppercase tracking-wider">
                    Article 1
                  </span>
                  <h2 className="text-xl font-bold text-gray-900">
                    Acceptance of Terms
                  </h2>
                </div>
              </div>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start gap-3">
                  <span className="font-bold text-green-500">1.1</span>
                  <p>
                    By using the Service, you agree to be bound by these Terms.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-bold text-green-500">1.2</span>
                  <p>
                    If you disagree with any part of the terms, you may not
                    access the service.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-bold text-green-500">1.3</span>
                  <p>
                    We may modify these terms at any time without prior notice.
                  </p>
                </div>
              </div>
            </section>

            {/* Article 2: User Eligibility */}
            <section className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm hover:shadow-lg hover:border-green-100 transition-all duration-300 group">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-green-100 to-green-50 flex items-center justify-center shrink-0 group-hover:from-green-500 group-hover:to-green-400 transition-all duration-300">
                  <FaUserCheck className="text-xl text-green-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <span className="text-xs font-bold text-green-600 uppercase tracking-wider">
                    Article 2
                  </span>
                  <h2 className="text-xl font-bold text-gray-900">
                    User Eligibility
                  </h2>
                </div>
              </div>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start gap-3">
                  <span className="font-bold text-green-500">2.1</span>
                  <p>
                    Users must be at least 18 years old to use this service.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-bold text-green-500">2.2</span>
                  <p>
                    You warrant that you have the legal capacity to enter into
                    this agreement.
                  </p>
                </div>
              </div>
            </section>

            {/* Article 3: Account Registration */}
            <section className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm hover:shadow-lg hover:border-green-100 transition-all duration-300 group">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-green-100 to-green-50 flex items-center justify-center shrink-0 group-hover:from-green-500 group-hover:to-green-400 transition-all duration-300">
                  <FaIdCard className="text-xl text-green-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <span className="text-xs font-bold text-green-600 uppercase tracking-wider">
                    Article 3
                  </span>
                  <h2 className="text-xl font-bold text-gray-900">
                    Account Registration
                  </h2>
                </div>
              </div>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start gap-3">
                  <span className="font-bold text-green-500">3.1</span>
                  <p>Accurate registration information is required.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-bold text-green-500">3.2</span>
                  <p>
                    You are responsible for maintaining account confidentiality.
                  </p>
                </div>
              </div>
            </section>

            {/* Article 4: Orders and Payments */}
            <section className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm hover:shadow-lg hover:border-green-100 transition-all duration-300 group">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-green-100 to-green-50 flex items-center justify-center shrink-0 group-hover:from-green-500 group-hover:to-green-400 transition-all duration-300">
                  <FaCreditCard className="text-xl text-green-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <span className="text-xs font-bold text-green-600 uppercase tracking-wider">
                    Article 4
                  </span>
                  <h2 className="text-xl font-bold text-gray-900">
                    Orders and Payments
                  </h2>
                </div>
              </div>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start gap-3">
                  <span className="font-bold text-green-500">4.1</span>
                  <p>All orders are subject to availability and acceptance.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-bold text-green-500">4.2</span>
                  <p>
                    Payment must be completed through approved payment methods.
                  </p>
                </div>
              </div>
            </section>

            {/* Article 5: Shipping and Delivery */}
            <section className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm hover:shadow-lg hover:border-green-100 transition-all duration-300 group">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-green-100 to-green-50 flex items-center justify-center shrink-0 group-hover:from-green-500 group-hover:to-green-400 transition-all duration-300">
                  <FaTruck className="text-xl text-green-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <span className="text-xs font-bold text-green-600 uppercase tracking-wider">
                    Article 5
                  </span>
                  <h2 className="text-xl font-bold text-gray-900">
                    Shipping and Delivery
                  </h2>
                </div>
              </div>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start gap-3">
                  <span className="font-bold text-green-500">5.1</span>
                  <p>Estimated delivery times are not guaranteed.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-bold text-green-500">5.2</span>
                  <p>
                    We are not liable for carrier delays beyond our control.
                  </p>
                </div>
              </div>
            </section>

            {/* Article 6: Returns and Refunds */}
            <section className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm hover:shadow-lg hover:border-green-100 transition-all duration-300 group">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-green-100 to-green-50 flex items-center justify-center shrink-0 group-hover:from-green-500 group-hover:to-green-400 transition-all duration-300">
                  <FaArrowRotateLeft className="text-xl text-green-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <span className="text-xs font-bold text-green-600 uppercase tracking-wider">
                    Article 6
                  </span>
                  <h2 className="text-xl font-bold text-gray-900">
                    Returns and Refunds
                  </h2>
                </div>
              </div>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start gap-3">
                  <span className="font-bold text-green-500">6.1</span>
                  <p>
                    Returns are accepted within 14 days of delivery for most
                    items.
                  </p>
                </div>
              </div>
            </section>

            {/* Article 7: Limitation of Liability */}
            <section className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm hover:shadow-lg hover:border-green-100 transition-all duration-300 group">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-green-100 to-green-50 flex items-center justify-center shrink-0 group-hover:from-green-500 group-hover:to-green-400 transition-all duration-300">
                  <FaScaleBalanced className="text-xl text-green-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <span className="text-xs font-bold text-green-600 uppercase tracking-wider">
                    Article 7
                  </span>
                  <h2 className="text-xl font-bold text-gray-900">
                    Limitation of Liability
                  </h2>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                FreshCart shall not be liable for any indirect, incidental, or
                consequential damages resulting from the use of our services.
              </p>
            </section>

            {/* Article 8: Contact Section */}
            <section className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm hover:shadow-lg hover:border-green-100 transition-all duration-300 group">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-green-100 to-green-50 flex items-center justify-center shrink-0 group-hover:from-green-500 group-hover:to-green-400 transition-all duration-300">
                  <IoIosMail className="text-xl text-green-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <span className="text-xs font-bold text-green-600 uppercase tracking-wider">
                    Article 8
                  </span>
                  <h2 className="text-xl font-bold text-gray-900">
                    Contact Us
                  </h2>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                For questions regarding these terms, please contact us at:
                <a
                  href="mailto:support@freshcart.com"
                  className="text-green-600 hover:text-green-700 font-semibold hover:underline ms-1"
                >
                  support@freshcart.com
                </a>
              </p>
            </section>
          </div>

          {/* Footer Navigation Links */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href="/"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium transition-all duration-200"
              >
                <ArrowLeft
                  size={14}
                  className="group-hover:-translate-x-2 duration-300 ease-in-out"
                />
                Back to Home
              </Link>
              <Link
                href="/privacy"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-500 text-white hover:bg-green-600 font-medium shadow-lg shadow-green-500/25 transition-all duration-200"
              >
                View Privacy Policy
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-2 duration-300 ease-in-out"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
