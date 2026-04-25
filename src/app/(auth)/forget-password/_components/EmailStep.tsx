"use client";

import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import Link from "next/link";
import { forgotPasswordApi } from "@/services/auth.service";

/**
 * Type definition for the email form data
 */
type EmailFormData = {
  email: string;
};

/**
 * Step 1: User enters email to receive reset code
 * @param onSuccess - Callback function to move to the next step
 */
export default function EmailStep({
  onSuccess,
}: {
  onSuccess: (email: string) => void;
}) {
  // State management for loading and API errors
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  // Initialize form with default values and types
  const form = useForm<EmailFormData>({ defaultValues: { email: "" } });

  /**
   * Handles form submission and API call
   */
  const onSubmit = async (data: EmailFormData) => {
    setIsLoading(true);
    setApiError("");
    try {
      // Call the forgot password API service
      await forgotPasswordApi(data.email);
      onSuccess(data.email);
    } catch (error: unknown) {
      // Handle different types of errors safely in TypeScript
      if (error instanceof Error) {
        setApiError(error.message);
      } else {
        setApiError("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Forgot Password?
        </h1>
        <p className="text-gray-600">
          No worries, we&apos;ll send you a reset code to your email.
        </p>
      </div>

      {/* Global API Error Display */}
      {apiError && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm text-center font-medium">
          {apiError}
        </div>
      )}

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Email Input Field */}
        <Controller
          name="email"
          control={form.control}
          rules={{
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" },
          }}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Email*</FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="email"
                placeholder="mohamed@example.com"
                className="text-lg focus-visible:ring-green-600"
              />
              {fieldState.invalid && (
                <FieldError>{fieldState.error?.message}</FieldError>
              )}
            </Field>
          )}
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-600 text-white py-3 px-4 rounded-xl hover:bg-green-700 transition-all font-semibold shadow-lg disabled:opacity-50"
        >
          {isLoading ? "Sending..." : "Send Reset Code"}
        </button>

        {/* Navigation Link */}
        <div className="text-center mt-6">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm text-green-600 hover:text-green-700 font-medium"
          >
            <FaArrowLeft className="text-xs" /> Back to Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}
