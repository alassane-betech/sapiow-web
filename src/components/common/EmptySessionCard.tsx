"use client";

import Image from "next/image";
import React from "react";

interface EmptySessionCardProps {
  message?: string | React.ReactNode;
  buttonLabel?: string;
  onAdd?: () => void;
  className?: string;
}

export const EmptySessionCard: React.FC<EmptySessionCardProps> = ({
  message = "Aucune session n'est prévue pour aujourd'hui.",
  buttonLabel = "Ajouter une disponibilité",
  onAdd,
  className = "",
}) => {
  return (
    <div
      className={`w-full h-[172px] bg-white rounded-2xl border border-gray-200 px-8 flex flex-col items-center justify-center gap-4 ${className}`}
    >
      <div className="flex flex-col items-center">
        <Image
          src="/assets/icons/videorecord.svg"
          alt="camera"
          width={36}
          height={36}
          className="opacity-60 mt-5"
        />
        <p className="text-sm font-medium text-center text-slate-gray my-3">
          {message}
        </p>
        <button
          type="button"
          onClick={onAdd}
          className="flex items-center gap-2 border border-[#E3E8EF] rounded-xl px-5 py-2 mb-10 bg-white hover:bg-gray-50 transition"
        >
          <span className="text-xl font-bold text-gunmetal-gray">+</span>
          <span className="font-bold text-base text-gunmetal-gray cursor-pointer">
            {buttonLabel}
          </span>
        </button>
      </div>
    </div>
  );
};
