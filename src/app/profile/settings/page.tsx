"use client";

import PageHeader from "@/components/shared/PageHeader";
import { User } from "lucide-react";
import React from "react";
import ProfileSidebar from "@/app/profile/_components/ProfileSidebar";
import { FaLock } from "react-icons/fa6";
import { useSession } from "next-auth/react";

import ProfileInfoForm from "@/app/profile/settings/_components/ProfileInfoForm";
import ChangePasswordForm from "@/app/profile/settings/_components/ChangePasswordForm";

/**
 * Professional session interface extension to handle specific token
 * and user property structures.
 */
interface CustomSession {
  user?: {
    id?: string;
    name?: string | null;
    email?: string | null;
    role?: string;
    token?: string;
  };
  token?: string;
}

export default function SettingsPage() {
  // Authentication session data
  const { data: session } = useSession();

  // Safe extraction of user data and authentication token
  const userData = (session as CustomSession)?.user;
  const token =
    (session as CustomSession)?.user?.token ||
    (session as CustomSession)?.token ||
    "";

  // Configuration for the reusable PageHeader component
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
      {/* Global Page Header */}
      <PageHeader details={pageDetails} hasFilters={false} />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Dashboard Sidebar Navigation */}
          <ProfileSidebar />

          <main className="flex-1 min-w-0">
            <div className="space-y-6">
              {/* Settings Section Title */}
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Account Settings
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  Update your profile information and change your password
                </p>
              </div>

              {/* Profile Information Management Section */}
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 sm:p-8 border-b border-gray-100">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">
                      <User className="text-2xl text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">
                        Profile Information
                      </h3>
                      <p className="text-sm text-gray-500">
                        Update your personal details
                      </p>
                    </div>
                  </div>

                  {/* Profile Update Form with initial user data */}
                  <ProfileInfoForm
                    token={token}
                    initialData={{
                      name: userData?.name || "",
                      email: userData?.email || "",
                      phone: "",
                    }}
                  />
                </div>

                {/* Read-only Administrative Information */}
                <div className="p-6 sm:p-8 bg-gray-50">
                  <h3 className="font-bold text-gray-900 mb-4">
                    Account Information
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">User ID</span>
                      <span className="font-mono text-gray-700 text-xs sm:text-sm">
                        {userData?.id || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Role</span>
                      <span className="px-3 py-1 rounded-lg bg-green-100 text-green-700 font-medium capitalize">
                        {userData?.role || "user"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security: Password Management Section */}
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center">
                      <FaLock className="text-2xl text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">
                        Change Password
                      </h3>
                      <p className="text-sm text-gray-500">
                        Update your account password
                      </p>
                    </div>
                  </div>

                  {/* Secure Password Update Form */}
                  <ChangePasswordForm token={token} />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
