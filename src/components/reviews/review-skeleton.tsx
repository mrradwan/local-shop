import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * ReviewSkeleton Component
 * Provides a loading placeholder for the ReviewCarousel or individual reviews.
 * Mimics the layout of the actual Review item to prevent layout shifts.
 */
export function ReviewSkeleton() {
  return (
    <div className="flex flex-col gap-3 w-full p-2">
      {/* Skeleton for User Avatar and Name Metadata */}
      <div className="author flex items-center gap-4">
        {/* Avatar Circle */}
        <Skeleton className="w-12 h-12 rounded-full shrink-0" />

        <div className="space-y-2 flex-1">
          {/* User Name Placeholder */}
          <Skeleton className="h-4 w-32" />
          {/* Star Rating Placeholder */}
          <Skeleton className="h-3 w-24" />
        </div>
      </div>

      {/* Skeleton for Review Text Content */}
      <div className="space-y-2 mt-2">
        {/* Multi-line text effect */}
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
      </div>
    </div>
  );
}
