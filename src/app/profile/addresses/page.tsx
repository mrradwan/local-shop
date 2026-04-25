"use client";

import PageHeader from "@/components/shared/PageHeader";
import { User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FaLocationDot, FaPlus } from "react-icons/fa6";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import {
  getUserAddressesAction,
  addAddressAction,
  removeAddressAction,
} from "@/actions/address.action";

import ProfileSidebar from "../_components/ProfileSidebar";
import AddressCard, { Address } from "./_components/AddressCard";
import AddressModal, { AddressFormData } from "./_components/AddressModal";
import { Spinner } from "@/components/ui/spinner";

/**
 * Extended Session interface to handle custom token placement
 */
interface CustomSession {
  user?: { token?: string };
  token?: string;
}

export default function AddressesPage() {
  // Authentication session hook
  const { data: session, status } = useSession();

  // Extract token from multiple possible session locations
  const token =
    (session as CustomSession)?.user?.token ||
    (session as CustomSession)?.token ||
    "";

  // Component State Management
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  /**
   * Fetch user addresses from the server once authenticated
   */
  useEffect(() => {
    const loadAddresses = async () => {
      if (!token) return;
      const res = await getUserAddressesAction(token);
      if (res?.status === "success") setAddresses(res.data);
      setIsLoading(false);
    };

    if (status === "authenticated" && token) {
      loadAddresses();
    } else if (status === "unauthenticated") {
      setTimeout(() => setIsLoading(false), 0);
    }
  }, [status, token]);

  /**
   * Opens the modal in edit mode with pre-filled address data
   */
  const handleEditClick = (address: Address) => {
    setEditingAddress(address);
    setIsModalOpen(true);
  };

  /**
   * Handles saving new address or updating an existing one
   * @param formData - Validated data from the modal form
   */
  const handleSaveAddress = async (formData: AddressFormData) => {
    if (!token) {
      toast.error("You must be logged in");
      return;
    }

    setIsAdding(true);

    try {
      // If editing, remove the old one first (API logic requirement)
      if (editingAddress) {
        await removeAddressAction(token, editingAddress._id);
      }

      const res = await addAddressAction(token, formData);

      if (res?.status === "success") {
        toast.success(
          editingAddress
            ? "Address updated successfully!"
            : "Address added successfully!",
        );
        setAddresses(res.data);
        setIsModalOpen(false);
        setEditingAddress(null);
      } else {
        toast.error(res?.message || "Failed to save address");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }

    setIsAdding(false);
  };

  /**
   * Deletes a specific address after confirmation
   */
  const handleDeleteAddress = async (id: string) => {
    if (!token) return;
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this address?",
    );
    if (!confirmDelete) return;

    const res = await removeAddressAction(token, id);
    if (res?.status === "success") {
      toast.success("Address removed successfully!");
      setAddresses(res.data);
    } else {
      toast.error(res?.message || "Failed to remove address");
    }
  };

  // Header metadata configuration
  const pageDetails = {
    title: "My Account",
    parentName: "",
    parentLink: "",
    image: null,
    icon: <User size={28} className="text-white" />,
    description: "Manage your addresses and account settings",
  };

  return (
    <>
      <PageHeader details={pageDetails} hasFilters={false} />

      <div className="container mx-auto px-4 py-8 relative">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Sidebar Navigation */}
          <ProfileSidebar />

          <main className="flex-1 min-w-0">
            {/* Main Header and Action Button */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  My Addresses
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  Manage your saved delivery addresses
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex cursor-pointer items-center gap-2 px-5 py-2.5 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors shadow-lg shadow-green-600/25 border-none outline-none"
              >
                <FaPlus /> Add Address
              </button>
            </div>

            {/* Dynamic Content Display */}
            {isLoading ? (
              /* Loading State */
              <div className="flex flex-col items-center justify-center py-20">
                <Spinner className="text-green-600 size-10" />
              </div>
            ) : addresses.length === 0 ? (
              /* Empty State */
              <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5">
                  <FaLocationDot className="text-3xl text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  No Addresses Yet
                </h3>
                <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                  Add your first delivery address to make checkout faster and
                  easier.
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex cursor-pointer items-center gap-2 px-5 py-2.5 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors shadow-lg shadow-green-600/25 border-none outline-none"
                >
                  <FaPlus /> Add Your First Address
                </button>
              </div>
            ) : (
              /* Address Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((address) => (
                  <AddressCard
                    key={address._id}
                    address={address}
                    onDelete={handleDeleteAddress}
                    onEdit={handleEditClick}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Global Add/Edit Address Modal */}
      <AddressModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingAddress(null);
        }}
        onSave={handleSaveAddress}
        isAdding={isAdding}
        initialData={editingAddress}
      />
    </>
  );
}
