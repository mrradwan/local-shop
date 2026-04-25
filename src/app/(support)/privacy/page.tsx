import React from "react";
import PageHeader from "@/components/shared/PageHeader";
import {
  FaDatabase,
  FaLock,
  FaShareNodes,
  FaShieldHalved,
  FaUserCheck,
  FaUserShield,
} from "react-icons/fa6";
import { FaClock, FaCookie } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function Privacy() {
  // Page Header Configuration
  const pageDetails = {
    title: "Privacy Policy",
    parentName: "",
    parentLink: "",
    image: null,
    icon: <FaShieldHalved size={28} className="text-white" />,
    description: "Last updated: February 2026",
  };

  return (
    <>
      <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
        {/* Reusable Page Header */}
        <PageHeader details={pageDetails} hasFilters={false} />

        <div className="container mx-auto px-4 py-12">
          {/* Commitment Highlight Box */}
          <div className="bg-linear-to-r from-green-50 to-green-100/50 border border-green-200 rounded-3xl p-6 sm:p-8 mb-12 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-green-500 flex items-center justify-center shrink-0 shadow-lg shadow-green-500/25">
                <FaShieldHalved className="text-xl text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-green-900 mb-2">
                  Your Privacy Matters
                </h2>
                <p className="text-green-800 leading-relaxed">
                  This Privacy Policy describes how FreshCart collects, uses,
                  and protects your personal information when you use our
                  services. We are committed to ensuring that your privacy is
                  protected.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Article 1: Data Collection */}
            <section className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm hover:shadow-lg hover:border-green-100 transition-all duration-300 group">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-green-100 to-green-50 flex items-center justify-center shrink-0 group-hover:from-green-500 group-hover:to-green-400 transition-all duration-300">
                  <FaDatabase className="text-xl text-green-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <span className="text-xs font-bold text-green-600 uppercase tracking-wider">
                    Article 1
                  </span>
                  <h2 className="text-xl font-bold text-gray-900">
                    Information We Collect
                  </h2>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
                  <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-0.5 rounded-md mt-0.5 shrink-0">
                    1.1
                  </span>
                  <p className="text-sm">
                    <strong className="text-gray-800">Personal Data :</strong>{" "}
                    Name, email address, phone number, and shipping address.
                  </p>
                </div>
                <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
                  <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-0.5 rounded-md mt-0.5 shrink-0">
                    1.2
                  </span>
                  <p className="text-sm">
                    <strong className="text-gray-800">Payment Data :</strong>{" "}
                    Credit card information processed securely through our
                    payment providers.
                  </p>
                </div>
                <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
                  <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-0.5 rounded-md mt-0.5 shrink-0">
                    1.3
                  </span>
                  <p className="text-sm">
                    <strong className="text-gray-800">Technical Data:</strong>{" "}
                    IP address, browser type, device information, and access
                    times.
                  </p>
                </div>
                <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
                  <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-0.5 rounded-md mt-0.5 shrink-0">
                    1.4
                  </span>
                  <p className="text-sm">
                    <strong className="text-gray-800">Usage Data :</strong>{" "}
                    Pages viewed, products browsed, and actions taken within our
                    platform.
                  </p>
                </div>
              </div>
            </section>

            {/* Article 2: Usage of Information */}
            <section className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm hover:shadow-lg hover:border-green-100 transition-all duration-300 group">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-green-100 to-green-50 flex items-center justify-center shrink-0 group-hover:from-green-500 group-hover:to-green-400 transition-all duration-300">
                  <FaUserShield className="text-xl text-green-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <span className="text-xs font-bold text-green-600 uppercase tracking-wider">
                    Article 2
                  </span>
                  <h2 className="text-xl font-bold text-gray-900">
                    How We Use Your Information
                  </h2>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { id: "2.1", text: "To process and fulfill your orders." },
                  {
                    id: "2.2",
                    text: "To send order confirmations and shipping updates.",
                  },
                  {
                    id: "2.3",
                    text: "To provide customer support and respond to inquiries.",
                  },
                  {
                    id: "2.4",
                    text: "To improve our products, services, and user experience.",
                  },
                  {
                    id: "2.5",
                    text: "To send promotional communications (with your consent).",
                  },
                ].map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 text-gray-600 leading-relaxed"
                  >
                    <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-0.5 rounded-md mt-0.5 shrink-0">
                      {item.id}
                    </span>
                    <p className="text-sm">{item.text}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Article 3: Security Measures */}
            <section className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm hover:shadow-lg hover:border-green-100 transition-all duration-300 group">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-green-100 to-green-50 flex items-center justify-center shrink-0 group-hover:from-green-500 group-hover:to-green-400 transition-all duration-300">
                  <FaLock className="text-xl text-green-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <span className="text-xs font-bold text-green-600 uppercase tracking-wider">
                    Article 3
                  </span>
                  <h2 className="text-xl font-bold text-gray-900">
                    Data Protection
                  </h2>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  {
                    id: "3.1",
                    text: "We implement industry-standard encryption (SSL/TLS) for all data transfers.",
                  },
                  {
                    id: "3.2",
                    text: "Payment information is processed by PCI-compliant payment providers.",
                  },
                  {
                    id: "3.3",
                    text: "We conduct regular security audits and vulnerability assessments.",
                  },
                  {
                    id: "3.4",
                    text: "Access to personal data is restricted to authorized personnel only.",
                  },
                ].map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 text-gray-600 leading-relaxed"
                  >
                    <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-0.5 rounded-md mt-0.5 shrink-0">
                      {item.id}
                    </span>
                    <p className="text-sm">{item.text}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Article 4: Information Sharing Policy */}
            <section className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm hover:shadow-lg hover:border-green-100 transition-all duration-300 group">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-green-100 to-green-50 flex items-center justify-center shrink-0 group-hover:from-green-500 group-hover:to-green-400 transition-all duration-300">
                  <FaShareNodes className="text-xl text-green-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <span className="text-xs font-bold text-green-600 uppercase tracking-wider">
                    Article 4
                  </span>
                  <h2 className="text-xl font-bold text-gray-900">
                    Information Sharing
                  </h2>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  {
                    id: "4.1",
                    text: "We do not sell, trade, or rent your personal information to third parties.",
                  },
                  {
                    id: "4.2",
                    text: "We may share data with trusted service providers who assist in our operations.",
                  },
                  {
                    id: "4.3",
                    text: "We may disclose information when required by law or to protect our rights.",
                  },
                ].map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 text-gray-600 leading-relaxed"
                  >
                    <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-0.5 rounded-md mt-0.5 shrink-0">
                      {item.id}
                    </span>
                    <p className="text-sm">{item.text}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Article 5: User Rights */}
            <section className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm hover:shadow-lg hover:border-green-100 transition-all duration-300 group">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-green-100 to-green-50 flex items-center justify-center shrink-0 group-hover:from-green-500 group-hover:to-green-400 transition-all duration-300">
                  <FaUserCheck className="text-xl text-green-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <span className="text-xs font-bold text-green-600 uppercase tracking-wider">
                    Article 5
                  </span>
                  <h2 className="text-xl font-bold text-gray-900">
                    Your Rights
                  </h2>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  {
                    id: "5.1",
                    label: "Access",
                    text: "Request a copy of your personal data.",
                  },
                  {
                    id: "5.2",
                    label: "Rectification",
                    text: "Request correction of inaccurate data.",
                  },
                  {
                    id: "5.3",
                    label: "Erasure",
                    text: "Request deletion of your personal data.",
                  },
                  {
                    id: "5.4",
                    label: "Portability",
                    text: "Request your data in a portable format.",
                  },
                  {
                    id: "5.5",
                    label: "Opt-out",
                    text: "Unsubscribe from marketing communications at any time.",
                  },
                ].map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 text-gray-600 leading-relaxed"
                  >
                    <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-0.5 rounded-md mt-0.5 shrink-0">
                      {item.id}
                    </span>
                    <p className="text-sm">
                      <strong className="text-gray-800">{item.label} :</strong>{" "}
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Article 6: Cookie Policy */}
            <section className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm hover:shadow-lg hover:border-green-100 transition-all duration-300 group">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-green-100 to-green-50 flex items-center justify-center shrink-0 group-hover:from-green-500 group-hover:to-green-400 transition-all duration-300">
                  <FaCookie className="text-xl text-green-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <span className="text-xs font-bold text-green-600 uppercase tracking-wider">
                    Article 6
                  </span>
                  <h2 className="text-xl font-bold text-gray-900">Cookies</h2>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  {
                    id: "6.1",
                    text: "We use cookies to enhance your browsing experience and remember preferences.",
                  },
                  {
                    id: "6.2",
                    text: "You can control cookie settings through your browser preferences.",
                  },
                  {
                    id: "6.3",
                    text: "Disabling cookies may affect the functionality of certain features.",
                  },
                ].map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 text-gray-600 leading-relaxed"
                  >
                    <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-0.5 rounded-md mt-0.5 shrink-0">
                      {item.id}
                    </span>
                    <p className="text-sm">{item.text}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Article 7: Data Retention Policy */}
            <section className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm hover:shadow-lg hover:border-green-100 transition-all duration-300 group">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-green-100 to-green-50 flex items-center justify-center shrink-0 group-hover:from-green-500 group-hover:to-green-400 transition-all duration-300">
                  <FaClock className="text-xl text-green-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <span className="text-xs font-bold text-green-600 uppercase tracking-wider">
                    Article 7
                  </span>
                  <h2 className="text-xl font-bold text-gray-900">
                    Data Retention
                  </h2>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                We retain your personal information only for as long as
                necessary to fulfill the purposes outlined in this policy, or as
                required by law. Account data is deleted within 30 days of
                account closure upon request.
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
                For questions about this Privacy Policy or to exercise your
                rights, contact our Data Protection Officer at
                <a
                  href="mailto:privacy@freshcart.com"
                  className="text-green-600 hover:text-green-700 font-semibold hover:underline"
                >
                  {" "}
                  privacy@freshcart.com
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
                href="/terms"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-500 text-white hover:bg-green-600 font-medium shadow-lg shadow-green-500/25 transition-all duration-200"
              >
                View Terms of Service
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
