"use client";

import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { resetPasswordApi } from "@/services/auth.service";

/**
 * Define form data type for password reset
 */
type PasswordFormData = {
  newPassword: string;
  confirmPassword: string;
};

/**
 * Step 3: Setting the new password
 * @param email - User's email required for the reset API
 * @param onSuccess - Callback to show the success screen
 */
export default function PasswordStep({
  email,
  onSuccess,
}: {
  email: string;
  onSuccess: () => void;
}) {
  // State management for UI feedback
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Initialize react-hook-form with types
  const form = useForm<PasswordFormData>({
    defaultValues: { newPassword: "", confirmPassword: "" },
  });

  /**
   * Handle the password update process
   */
  const onSubmit = async (data: PasswordFormData) => {
    // Client-side validation for password matching
    if (data.newPassword !== data.confirmPassword) {
      form.setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }

    setIsLoading(true);
    setApiError("");
    try {
      // Call the password reset API service
      await resetPasswordApi(email, data.newPassword);
      onSuccess();
    } catch (error: unknown) {
      // Handle API or network errors safely
      if (error instanceof Error) {
        setApiError(error.message);
      } else {
        setApiError("Failed to reset password");
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
          Create New Password
        </h1>
        <p className="text-gray-600">
          Your new password must be different from previous passwords.
        </p>
      </div>

      {/* Global API Error Feedback */}
      {apiError && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm text-center font-medium">
          {apiError}
        </div>
      )}

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* New Password Input */}
        <Controller
          name="newPassword"
          control={form.control}
          rules={{
            required: "New password is required",
            minLength: { value: 6, message: "Min 6 characters" },
          }}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>New Password</FieldLabel>
              <div className="relative">
                <Input
                  {...field}
                  id={field.name}
                  type={showPassword ? "text" : "password"}
                  className="text-lg pr-10 focus-visible:ring-green-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {fieldState.invalid && (
                <FieldError>{fieldState.error?.message}</FieldError>
              )}
            </Field>
          )}
        />

        {/* Confirm Password Input */}
        <Controller
          name="confirmPassword"
          control={form.control}
          rules={{ required: "Please confirm password" }}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
              <Input
                {...field}
                id={field.name}
                type={showPassword ? "text" : "password"}
                className="text-lg pr-10 focus-visible:ring-green-600"
              />
              {fieldState.invalid && (
                <FieldError>{fieldState.error?.message}</FieldError>
              )}
            </Field>
          )}
        />

        {/* Action Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-600 text-white py-3 px-4 rounded-xl hover:bg-green-700 transition-all font-semibold shadow-lg disabled:opacity-50 cursor-pointer"
        >
          {isLoading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}
