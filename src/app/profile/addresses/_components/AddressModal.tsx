"use client";

import { X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Address } from "./AddressCard";

/**
 * Interface for the data structure sent to the API (Address without ID)
 */
export interface AddressFormData {
  name: string;
  details: string;
  phone: string;
  city: string;
}

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (formData: AddressFormData) => Promise<void>;
  isAdding: boolean;
  initialData?: Address | null;
}

export default function AddressModal({
  isOpen,
  onClose,
  onSave,
  isAdding,
  initialData,
}: AddressModalProps) {
  // Local state to manage form input values
  const [formData, setFormData] = useState<AddressFormData>({
    name: "",
    details: "",
    phone: "",
    city: "",
  });

  /**
   * Sync form data with initialData when modal opens or initialData changes.
   * Uses setTimeout(0) to ensure updates happen outside the render cycle,
   * keeping ESLint and the React lifecycle happy.
   */
  useEffect(() => {
    if (isOpen && initialData) {
      setTimeout(() => {
        setFormData({
          name: initialData.name,
          details: initialData.details,
          phone: initialData.phone,
          city: initialData.city,
        });
      }, 0);
    } else if (!isOpen) {
      // Reset form fields when the modal is closed
      setTimeout(() => {
        setFormData({ name: "", details: "", phone: "", city: "" });
      }, 0);
    }
  }, [isOpen, initialData]);

  // Early return if modal is not active
  if (!isOpen) return null;

  /**
   * Form submission handler
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h3 className="font-bold text-lg text-gray-900">
            {initialData ? "Edit Address" : "Add New Address"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 cursor-pointer border-none outline-none bg-transparent"
          >
            <X size={20} />
          </button>
        </div>

        {/* Address Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Label Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address Name
            </label>
            <input
              required
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
              placeholder="e.g., Home, Work"
            />
          </div>

          {/* Details Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Details
            </label>
            <textarea
              required
              value={formData.details}
              onChange={(e) =>
                setFormData({ ...formData, details: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 resize-none outline-none transition-all"
              rows={3}
              placeholder="Street, Building, Flat"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* City Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                required
                type="text"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
                placeholder="Cairo"
              />
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                required
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
                placeholder="010..."
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl font-medium text-gray-600 hover:bg-gray-50 cursor-pointer border-none outline-none transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isAdding}
              className="px-5 py-2.5 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 disabled:opacity-50 cursor-pointer border-none outline-none transition-all shadow-md shadow-green-600/20"
            >
              {isAdding
                ? "Saving..."
                : initialData
                  ? "Update Address"
                  : "Save Address"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
