"use client";

import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Home } from "lucide-react";
import { FaBoxArchive } from "react-icons/fa6";
import { FaShoppingBag } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { getUserOrders } from "@/actions/order.action";
import OrderCard, { RouteOrder } from "@/app/orders/_components/OrderCard";
import { Spinner } from "@/components/ui/spinner";

/**
 * Extended Session interface to include user ID
 */
interface CustomSession {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    id?: string;
  };
}

export default function Orders() {
  // Authentication session data
  const { data: session } = useSession();
  const userId = (session as CustomSession)?.user?.id;

  // Local state for orders data and loading status
  const [orders, setOrders] = useState<RouteOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Fetch user orders from the server action when userId is available
   */
  useEffect(() => {
    const fetchOrders = async () => {
      if (userId) {
        const data = await getUserOrders(userId);
        setOrders(data);
      }
      setIsLoading(false);
    };
    fetchOrders();
  }, [userId]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        {/* Navigation Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link
                  href="/"
                  className="hover:text-green-600 transition-colors flex items-center gap-1.5"
                >
                  <Home size={16} />
                  <span>Home</span>
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>My Orders</BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </nav>

        {/* Page Header and Statistics */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/25">
              <FaBoxArchive className="text-2xl text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                My Orders
              </h1>
              <p className="text-gray-500 text-sm mt-0.5">
                Track and manage your {orders.length} order
                {orders.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <Link
            href="/"
            className="self-start sm:self-auto text-green-600 hover:text-green-700 font-medium flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-green-50 transition-all text-sm"
          >
            <FaShoppingBag className="text-xs" />
            Continue Shopping
          </Link>
        </div>
      </div>

      {/* Orders List Rendering */}
      <div className="space-y-4">
        {isLoading ? (
          /* Loading Indicator */
          <div className="flex flex-col items-center justify-center py-10">
            <Spinner className="text-green-600 size-10" />
          </div>
        ) : orders.length === 0 ? (
          /* Empty State View */
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-gray-500">You don&apos;t have any orders yet.</p>
          </div>
        ) : (
          /* Map through orders and render OrderCard for each */
          orders.map((order) => <OrderCard key={order._id} order={order} />)
        )}
      </div>
    </div>
  );
}
