"use client";

import React, { useState, forwardRef } from "react";
import { Eye, EyeOff } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";

export const PasswordInput = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <InputGroup className="bg-gray-50 border border-gray-200 rounded-md  overflow-hidden flex items-center">
        <InputGroupInput
          {...props}
          ref={ref}
          type={showPassword ? "text" : "password"}
          autoComplete="off"
          className="bg-transparent border-none shadow-none focus-visible:ring-0 flex-1"
        />
        <InputGroupAddon align="inline-end">
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-500 hover:text-green-600 focus:outline-none transition-colors cursor-pointer pe-3 flex items-center justify-center h-full"
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </InputGroupAddon>
      </InputGroup>
    );
  }
);

PasswordInput.displayName = "PasswordInput";