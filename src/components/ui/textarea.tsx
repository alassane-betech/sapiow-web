import { cn } from "@/lib/utils";
import * as React from "react";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[120px] w-full rounded-[12px] border border-light-blue-gray bg-white px-5 py-4 text-base text-slate-gray font-sf-pro-rounded placeholder:text-slate-gray focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt-blue/20 transition-all resize-none",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
