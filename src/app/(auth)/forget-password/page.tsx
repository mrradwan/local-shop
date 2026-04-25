"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FaEnvelope,
  FaKey,
  FaLock,
  FaShieldHalved,
  FaCheck,
} from "react-icons/fa6";
import EmailStep from "./_components/EmailStep";
import CodeStep from "./_components/CodeStep";
import PasswordStep from "./_components/PasswordStep";

export default function ForgotPasswordPage() {
  // State to manage current step and user data
  const [step, setStep] = useState(1);
  const [savedEmail, setSavedEmail] = useState("");

  /**
   * Renders the multi-step progress indicator
   */
  const renderProgressBar = () => (
    <div className="flex items-center justify-center mb-8">
      {/* Step 1 Indicator */}
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 bg-green-600 text-white ring-4 ring-green-100">
          <FaCheck className="text-xs" />
        </div>
        <div
          className={`w-16 h-0.5 mx-2 transition-all duration-300 ${step >= 2 ? "bg-green-600" : "bg-gray-200"}`}
        ></div>
      </div>

      {/* Step 2 Indicator */}
      <div className="flex items-center">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${step >= 2 ? "bg-green-600 text-white ring-4 ring-green-100" : "bg-gray-100 text-gray-400"}`}
        >
          {step >= 3 ? (
            <FaCheck className="text-xs" />
          ) : (
            <FaKey className="text-xs" />
          )}
        </div>
        <div
          className={`w-16 h-0.5 mx-2 transition-all duration-300 ${step >= 3 ? "bg-green-600" : "bg-gray-200"}`}
        ></div>
      </div>

      {/* Step 3 Indicator */}
      <div className="flex items-center">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${step >= 3 ? "bg-green-600 text-white ring-4 ring-green-100" : "bg-gray-100 text-gray-400"}`}
        >
          <FaLock className="text-xs" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="container py-16 mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
        {/* Left Side: Decorative Branding Section */}
        <div className="hidden lg:block">
          <div className="text-center space-y-6">
            <div className="w-full h-96 bg-linear-to-br from-green-50 via-green-50 to-emerald-50 rounded-2xl shadow-lg flex items-center justify-center relative overflow-hidden">
              <div className="absolute top-8 left-8 w-24 h-24 rounded-full bg-green-100/50"></div>
              <div className="absolute bottom-12 right-10 w-32 h-32 rounded-full bg-green-100/50"></div>
              <div className="absolute top-20 right-20 w-16 h-16 rounded-full bg-emerald-100/50"></div>
              <div className="relative flex flex-col items-center gap-6 z-10">
                <div className="w-28 h-28 rounded-3xl bg-white shadow-xl flex items-center justify-center rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="w-20 h-20 rounded-2xl bg-green-100 flex items-center justify-center">
                    <FaLock className="text-green-600 text-4xl" />
                  </div>
                </div>
                <div className="absolute -left-16 top-4 w-14 h-14 rounded-xl bg-white shadow-lg flex items-center justify-center -rotate-12">
                  <FaEnvelope className="text-green-500 text-xl" />
                </div>
                <div className="absolute -right-16 top-8 w-14 h-14 rounded-xl bg-white shadow-lg flex items-center justify-center rotate-12">
                  <FaShieldHalved className="text-green-500 text-xl" />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-800">
                Secure Account Recovery
              </h2>
              <p className="text-lg text-gray-600">
                Follow the secure steps to regain access to your account.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Dynamic Form Container */}
        <div className="w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 min-h-[500px]">
            {/* Main Brand Logo */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <span className="text-3xl font-bold text-green-600">
                  Fresh<span className="text-gray-800">Cart</span>
                </span>
              </div>
            </div>

            {/* Display progress for active steps */}
            {step < 4 && renderProgressBar()}

            {/* Step Navigation Logic */}
            {step === 1 && (
              <EmailStep
                onSuccess={(email) => {
                  setSavedEmail(email);
                  setStep(2);
                }}
              />
            )}
            {step === 2 && (
              <CodeStep
                email={savedEmail}
                onSuccess={() => setStep(3)}
                onBack={() => setStep(1)}
              />
            )}
            {step === 3 && (
              <PasswordStep email={savedEmail} onSuccess={() => setStep(4)} />
            )}

            {/* Final Success View */}
            {step === 4 && (
              <div className="animate-in zoom-in duration-500 text-center py-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaCheck className="text-4xl text-green-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                  Password Reset!
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  Your password has been successfully reset. You can now sign
                  in.
                </p>
                <Link
                  href="/login"
                  className="block w-full bg-green-600 text-white py-3 px-4 rounded-xl hover:bg-green-700 font-semibold text-lg shadow-lg"
                >
                  Back to Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
