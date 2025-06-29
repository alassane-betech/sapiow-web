"use client";
import { Button } from "@/components/common/Button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";

interface UserTypeSelectorProps {
  userType: string;
  onUserTypeChange: (type: string) => void;
  onContinue: () => void;
}

export const UserTypeSelector: React.FC<UserTypeSelectorProps> = ({
  userType,
  onUserTypeChange,
  onContinue,
}) => {
  return (
    <div className="w-full max-w-[350px] sm:max-w-[380px] lg:max-w-[391px]">
      <h1 className="text-2xl sm:text-[26px] lg:text-[28px] leading-[32px] sm:leading-[34px] lg:leading-[36px] font-bold text-center lg:text-left mb-14">
        Que voulez-vous faire sur Sapiow ?
      </h1>
      <div className="space-y-4 mb-6">
        <RadioGroup
          value={userType}
          onValueChange={onUserTypeChange}
          className="space-y-4"
        >
          <div
            className={`flex items-center space-x-4 p-4 border-2 rounded-2xl transition-all cursor-pointer border-none ${
              userType === "client"
                ? "bg-snow-blue"
                : "hover:border-cobalt-blue"
            }`}
            onClick={() => onUserTypeChange("client")}
          >
            <RadioGroupItem value="client" id="client" />
            <label
              htmlFor="client"
              className="text-lg font-bold text-exford-blue cursor-pointer flex-1"
            >
              Je cherche un expert
            </label>
          </div>
          <div
            className={`flex items-center space-x-4 p-4 border-2 rounded-2xl transition-all cursor-pointer border-none ${
              userType === "expert"
                ? "bg-snow-blue"
                : "hover:border-cobalt-blue"
            }`}
            onClick={() => onUserTypeChange("expert")}
          >
            <RadioGroupItem value="expert" id="expert" />
            <label
              htmlFor="expert"
              className="text-lg font-bold text-exford-blue cursor-pointer flex-1"
            >
              Je suis un expert
            </label>
          </div>
        </RadioGroup>
      </div>
      <Button
        label="Continuer"
        className="w-full rounded-[8px] h-[56px] text-base font-medium"
        onClick={onContinue}
      />
    </div>
  );
};
