"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import * as React from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          type="checkbox"
          ref={ref}
          className={cn(
            "peer appearance-none cursor-pointer border rounded-[8px] focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 checked:bg-exford-blue",
            className
          )}
          {...props}
        />
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <Check className="h-3 w-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
        </div>
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
