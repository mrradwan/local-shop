"use client";

import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { verifyResetCodeApi, forgotPasswordApi } from "@/services/auth.service";

/**
 * Define form data type for the reset code
 */
type CodeFormData = {
  resetCode: string;
};

/**
 * Step 2: Verification code entry
 * @param email - User's email to display
 * @param onSuccess - Callback to move to the next step
 * @param onBack - Callback to return to the email entry step
 */
export default function CodeStep({
  email,
  onSuccess,
  onBack,
}: {
  email: string;
  onSuccess: () => void;
  onBack: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  // Initialize form with TypeScript type
  const form = useForm<CodeFormData>({ defaultValues: { resetCode: "" } });

  /**
   * Handle code verification request
   */
  const onSubmit = async (data: CodeFormData) => {
    setIsLoading(true);
    setApiError("");
    try {
      await verifyResetCodeApi(data.resetCode);
      onSuccess();
    } catch (error: unknown) {
      if (error instanceof Error) {
        setApiError(error.message);
      } else {
        setApiError("Invalid code");
      }
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle resending the verification code
   */
  const handleResend = async () => {
    try {
      await forgotPasswordApi(email);
      alert("Code resent successfully!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setApiError(error.message);
      } else {
        setApiError("Failed to resend code");
      }
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Check Your Email
        </h1>
        <p className="text-gray-600">
          Enter the 6-digit code sent to{" "}
          <span className="font-semibold text-gray-800">{email}</span>
        </p>
      </div>

      {/* Error Feedback */}
      {apiError && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm text-center font-medium">
          {apiError}
        </div>
      )}

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Verification Code Input */}
        <Controller
          name="resetCode"
          control={form.control}
          rules={{ required: "Verification code is required" }}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Verification Code</FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="text"
                maxLength={6}
                placeholder="••••••"
                className="text-lg tracking-[0.5em] text-center font-bold focus-visible:ring-green-600"
              />
              {fieldState.invalid && (
                <FieldError>{fieldState.error?.message}</FieldError>
              )}
            </Field>
          )}
        />

        {/* Resend Action */}
        <div className="text-sm text-center text-gray-500">
          Didn&apos;t receive the code?{" "}
          <button
            type="button"
            onClick={handleResend}
            className="text-green-600 hover:underline font-semibold cursor-pointer"
          >
            Resend Code
          </button>
        </div>

        {/* Action Buttons */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-600 text-white py-3 px-4 rounded-xl hover:bg-green-700 transition-all font-semibold shadow-lg disabled:opacity-50"
        >
          {isLoading ? "Verifying..." : "Verify Code"}
        </button>

        <div className="text-center mt-6">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 font-medium"
          >
            <FaArrowLeft className="text-xs" /> Change email address
          </button>
        </div>
      </form>
    </div>
  );
}
