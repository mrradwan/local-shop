import { cn } from "@/lib/utils";
import { ImSpinner } from "react-icons/im";
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
export default function Loading() {
  return (
    <div className="flex flex-col h-screen w-full items-center justify-center">
      <Spinner className="text-green-600 size-10" />
      <span className="mt-4 ms-3 text-lg font-medium">Loading...</span>
    </div>
  );
}
