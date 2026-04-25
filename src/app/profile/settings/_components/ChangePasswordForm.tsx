"use client";

import React, { useState } from "react";
import { Lock } from "lucide-react";
import { PasswordInput } from "@/components/password/password-input"; 
import { changePasswordAction, ChangePasswordData } from "@/actions/profile.action";
import { toast } from "sonner";

interface ChangePasswordFormProps {
  token: string; // Authentication token passed from the parent settings page
}

export default function ChangePasswordForm({ token }: ChangePasswordFormProps) {
  // Form state management using the ChangePasswordData interface
  const [formData, setFormData] = useState<ChangePasswordData>({
    currentPassword: "",
    password: "", 
    rePassword: "", 
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * Generic input change handler
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * Form submission logic including validation and server action call
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Security guard for missing token
    if (!token) { 
      toast.error("Authentication error"); 
      return; 
    } 
    
    // Client-side validation: Matching passwords
    if (formData.password !== formData.rePassword) {
      toast.error("New passwords do not match!");
      return;
    }

    setIsLoading(true);
    
    // Execute the server action with the provided token and form data
    const res = await changePasswordAction(token, formData);

    if (res.message === "success") {
      toast.success("Password changed successfully!");
      // Reset form fields upon success
      setFormData({ currentPassword: "", password: "", rePassword: "" });
    } else {
      // Display error from API response or fallback message
      toast.error(res.message || res.errors?.msg || "Failed to change password");
    }
    
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      
      {/* Current Password Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Current Password
        </label>
        <PasswordInput 
          name="currentPassword" 
          value={formData.currentPassword} 
          onChange={handleChange} 
          placeholder="Enter your current password" 
          required 
          className="py-2.5" 
        />
      </div>

      {/* New Password Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          New Password
        </label>
        <PasswordInput 
          name="password" 
          value={formData.password} 
          onChange={handleChange} 
          placeholder="Enter your new password" 
          required 
          minLength={6} 
          className="py-2.5" 
        />
        <p className="text-xs text-gray-500 mt-1.5">Must be at least 6 characters</p>
      </div>

      {/* Confirmation Password Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Confirm New Password
        </label>
        <PasswordInput 
          name="rePassword" 
          value={formData.rePassword} 
          onChange={handleChange} 
          placeholder="Confirm your new password" 
          required 
          minLength={6} 
          className="py-2.5" 
        />
      </div>

      {/* Submit Action */}
      <div className="pt-2">
        <button 
          type="submit" 
          disabled={isLoading} 
          className="inline-flex cursor-pointer items-center gap-2 px-6 py-2.5 bg-[#ea580c] text-white font-medium rounded-xl hover:bg-orange-700 transition-colors shadow-sm disabled:opacity-50 border-none outline-none"
        >
          <Lock size={18} />
          {isLoading ? "Changing..." : "Change Password"}
        </button>
      </div>
    </form>
  );
}