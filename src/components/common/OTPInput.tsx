"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import React from "react";

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  disabled?: boolean;
  className?: string;
}

const OTPInput: React.FC<OTPInputProps> = ({
  value,
  onChange,
  maxLength = 6,
  disabled = false,
  className = "",
}) => {
  return (
    <InputOTP
      maxLength={maxLength}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`gap-3 ${className}`}
    >
      <InputOTPGroup>
        {Array.from({ length: maxLength }, (_, index) => (
          <InputOTPSlot
            key={index}
            index={index}
            className="mr-3 otp-slot-custom text-center text-2xl font-bold bg-white border-2 border-gray-300 text-exford-blue data-[active=true]:!border-cobalt-blue transition-all disabled:bg-gray-50 disabled:text-gray-500 flex items-center justify-center"
          />
        ))}
      </InputOTPGroup>
    </InputOTP>
  );
};

export default OTPInput;
