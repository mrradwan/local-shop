import { cn } from "@/lib/utils";
import { ImSpinner } from "react-icons/im";

/**
 * Spinner Component
 * A reusable SVG-based loading indicator with built-in accessibility
 */
function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <ImSpinner
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  );
}

/**
 * Global Loading UI
 * Next.js automatically renders this component as a fallback during page transitions
 * or while server components are being fetched.
 */
export default function Loading() {
  return (
    <div className="flex flex-col h-screen w-full items-center justify-center">
      {/* Centered Green Spinner */}
      <Spinner className="text-green-600 size-10" />

      {/* Loading Text with accessible styling */}
      <span className="mt-4 ms-3 text-lg font-medium text-gray-700">
        Loading...
      </span>
    </div>
  );
}
