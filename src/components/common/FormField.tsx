import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import * as React from "react";

interface FormFieldProps extends React.ComponentProps<"input"> {
  label?: string;
  error?: string;
  helperText?: string;
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  helperClassName?: string;
  required?: boolean;
}

const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  (
    {
      label,
      error,
      helperText,
      containerClassName,
      labelClassName,
      errorClassName,
      helperClassName,
      required,
      className,
      id,
      value,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const errorId = error ? `${inputId}-error` : undefined;
    const helperId = helperText ? `${inputId}-helper` : undefined;

    // Vérifier si le champ a du contenu (valeur ou focus)
    const [isFocused, setIsFocused] = React.useState(false);
    console.log(isFocused);
    const hasContent = Boolean(value);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      props.onBlur?.(e);
    };

    return (
      <div className={cn("space-y-2", containerClassName)}>
        <div className="relative">
          {/* Label flottant - apparaît quand il y a du contenu */}
          {label && hasContent && (
            <label
              htmlFor={inputId}
              className={cn(
                "absolute top-[5px] left-[16px] text-[11px] font-normal text-slate-gray bg-transparent px-1 transition-all duration-200 pointer-events-none z-10",
                required &&
                  "after:content-['*'] after:ml-0.5 after:text-destructive",
                labelClassName
              )}
            >
              {label}
            </label>
          )}

          <Input
            ref={ref}
            id={inputId}
            value={value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={cn(
              error &&
                "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20",
              "placeholder:text-slate-gray placeholder:text-base placeholder:font-normal placeholder:font-sf-pro-rounded border-1 border-light-blue-gray rounded-[8px] focus:border-cobalt-blue focus:outline-none focus:ring-2 focus:ring-cobalt-blue/20 transition-all focus-visible:border-cobalt-blue focus-visible:ring-cobalt-blue/20",
              hasContent ? "pt-6 pb-3" : "py-3",
              className
            )}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={cn(errorId, helperId).trim() || undefined}
            {...props}
          />
        </div>

        {error && (
          <p
            id={errorId}
            className={cn("text-sm text-destructive", errorClassName)}
          >
            {error}
          </p>
        )}

        {helperText && !error && (
          <p
            id={helperId}
            className={cn("text-sm text-muted-foreground", helperClassName)}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

FormField.displayName = "FormField";

export { FormField };
export type { FormFieldProps };
