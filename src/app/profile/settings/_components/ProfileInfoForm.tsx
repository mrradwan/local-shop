"use client";

import React, { useState } from "react";
import { FaSave } from "react-icons/fa";
import {
  updateProfileAction,
  UpdateProfileData,
} from "@/actions/profile.action";
import { toast } from "sonner";

interface ProfileInfoFormProps {
  token: string; // Authentication token passed from the session
  initialData: {
    name: string;
    email: string;
    phone?: string;
  };
}

export default function ProfileInfoForm({
  token,
  initialData,
}: ProfileInfoFormProps) {
  // Initialize form state with data provided by the session/parent
  const [formData, setFormData] = useState<UpdateProfileData>({
    name: initialData.name || "",
    email: initialData.email || "",
    phone: initialData.phone || "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * Sync input changes with local state
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * Handle profile update request
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Security check for the auth token
    if (!token) {
      toast.error("Authentication error");
      return;
    }

    setIsLoading(true);

    // Call the server action with token and updated data
    const res = await updateProfileAction(token, formData);

    if (res.message === "success") {
      toast.success("Profile updated successfully!");
    } else {
      // Catch specific API errors or display fallback message
      toast.error(res.message || res.errors?.msg || "Failed to update profile");
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      {/* Name Input Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Full Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          required
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all outline-none"
        />
      </div>

      {/* Email Input Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all outline-none"
        />
      </div>

      {/* Phone Number Input Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Phone Number
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="01xxxxxxxxx"
          required
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all outline-none"
        />
      </div>

      {/* Action Buttons */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex cursor-pointer items-center gap-2 px-6 py-2.5 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 transition-colors shadow-sm disabled:opacity-50 border-none outline-none"
        >
          <FaSave className="text-lg" />
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
