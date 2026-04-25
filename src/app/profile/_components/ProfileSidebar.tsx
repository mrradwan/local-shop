"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaLocationDot, FaGear } from "react-icons/fa6";
import { GoChevronRight } from "react-icons/go";

export default function ProfileSidebar() {
  // Get current path to determine active link styling
  const pathname = usePathname();

  // Define navigation menu items for cleaner maintenance
  const menuItems = [
    {
      name: "My Addresses",
      href: "/profile/addresses",
      icon: <FaLocationDot className="text-sm" />,
    },
    {
      name: "Settings",
      href: "/profile/settings",
      icon: <FaGear className="text-sm" />,
    },
  ];

  return (
    <aside className="w-full lg:w-72 shrink-0">
      <nav className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">My Account</h2>
        </div>

        {/* Navigation List */}
        <ul className="p-2 space-y-1">
          {menuItems.map((item) => {
            // Check if the current menu item is active
            const isActive = pathname === item.href;

            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  // Dynamic class assignment based on isActive state
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? "bg-green-50 text-green-700 font-semibold"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium"
                  }`}
                >
                  {/* Icon Container with dynamic background/color */}
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                      isActive
                        ? "bg-green-500 text-white"
                        : "bg-gray-100 text-gray-400 group-hover:bg-green-100 group-hover:text-green-600"
                    }`}
                  >
                    {item.icon}
                  </div>

                  <span className="flex-1">{item.name}</span>

                  {/* Right Arrow Indicator */}
                  <GoChevronRight
                    className={`transition-colors ${isActive ? "text-green-600" : "text-gray-400"}`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
