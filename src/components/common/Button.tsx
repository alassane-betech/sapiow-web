import { Button as ButtonUI } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ComponentProps<typeof ButtonUI> {
  label: string;
  className?: string;
}

export const Button = ({
  label,
  className,
  disabled,
  ...props
}: ButtonProps) => {
  const baseStyles = "px-6 py-4 transition-all";

  const defaultStyles = disabled
    ? "bg-soft-ice-gray text-pale-blue-gray hover:bg-soft-ice-gray cursor-not-allowed"
    : "bg-cobalt-blue text-white hover:bg-blue-700 cursor-pointer";

  return (
    <ButtonUI
      className={cn(baseStyles, defaultStyles, className)}
      // disabled={disabled}
      {...props}
    >
      {label}
    </ButtonUI>
  );
};
