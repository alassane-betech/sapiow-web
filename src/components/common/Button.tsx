import { Button as ButtonUI } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ButtonProps extends React.ComponentProps<typeof ButtonUI> {
  label: string;
  className?: string;
  icon?: string | React.ReactNode;
  iconSize?: number;
}

export const Button = ({
  label,
  className,
  disabled,
  icon,
  iconSize = 24,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "px-6 py-4 transition-all flex items-center justify-center gap-2";

  const defaultStyles = disabled
    ? "bg-soft-ice-gray text-pale-blue-gray hover:bg-soft-ice-gray cursor-not-allowed"
    : "bg-cobalt-blue text-white hover:bg-cobalt-blue/80 cursor-pointer";

  return (
    <ButtonUI
      className={cn(baseStyles, defaultStyles, className)}
      // disabled={disabled}
      {...props}
    >
      {icon && (
        typeof icon === 'string' ? (
          <Image src={icon} alt="icon" width={iconSize} height={iconSize} />
        ) : (
          icon
        )
      )}
      {label}
    </ButtonUI>
  );
};
