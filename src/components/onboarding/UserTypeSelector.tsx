"use client";
import { Button } from "@/components/common/Button";
import { RadioGroup } from "@/components/ui/radio-group";
import Image from "next/image";
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
            className={`relative flex items-center justify-between p-6 rounded-2xl transition-all cursor-pointer ${
              userType === "client"
                ? "bg-cobalt-blue"
                : "bg-snow-blue border border-gray-200 hover:border-cobalt-blue"
            }`}
            onClick={() => onUserTypeChange("client")}
          >
            <label
              className={`text-lg font-bold cursor-pointer ${
                userType === "client" ? "text-white" : "text-exford-blue"
              }`}
            >
              Je cherche un expert
            </label>
            <Image
              src="/assets/logo_check.svg"
              alt="arrow-right"
              width={100}
              height={100}
              className="absolute right-0 top-1/2 transform -translate-y-1/2"
            />
            <div className="flex-shrink-0">
              {userType === "client" ? (
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <svg
                    width="12"
                    height="9"
                    viewBox="0 0 12 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.5 1.5L4.5 7.5L1.5 4.5"
                      stroke="#2563EB"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              ) : (
                <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
              )}
            </div>
          </div>
          <div
            className={`relative flex items-center justify-between p-6 rounded-2xl transition-all cursor-pointer ${
              userType === "expert"
                ? "bg-cobalt-blue"
                : "bg-snow-blue border border-gray-200 hover:border-cobalt-blue"
            }`}
            onClick={() => onUserTypeChange("expert")}
          >
            <Image
              src="/assets/logo_check.svg"
              alt="arrow-right"
              width={100}
              height={100}
              className="absolute right-0 top-1/2 transform -translate-y-1/2"
            />
            <label
              className={`text-lg font-bold cursor-pointer ${
                userType === "expert" ? "text-white" : "text-exford-blue"
              }`}
            >
              Je suis un expert
            </label>
            <div className="flex-shrink-0">
              {userType === "expert" ? (
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <svg
                    width="12"
                    height="9"
                    viewBox="0 0 12 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.5 1.5L4.5 7.5L1.5 4.5"
                      stroke="#2563EB"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              ) : (
                <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
              )}
            </div>
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
