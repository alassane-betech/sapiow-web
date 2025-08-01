"use client";

import Image from "next/image";
import React from "react";

interface SessionPreviewCardProps {
  date: string;
  time: string;
  visioDuration: string;
  participantName: string;
  participantAvatar: string;
  sessionDescription: string;
  className?: string;
}

export const SessionPreviewCard: React.FC<SessionPreviewCardProps> = ({
  date,
  time,
  visioDuration,
  participantName,
  participantAvatar,
  sessionDescription,
  className = "",
}) => {
  return (
    <div
      className={`w-full bg-soft-ice-gray rounded-lg border border-gray-200 p-4 ${className}`}
    >
      {/* En-tête avec date/heure et durée visio */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 flex items-center justify-center">
            <Image
              src="/assets/icons/calendar.svg"
              alt="calendar"
              width={20}
              height={20}
              className="text-gray-600"
            />
          </div>
          <span className="text-sm font-medium text-charcoal-blue font-outfit">
            {date.charAt(0).toUpperCase() + date.slice(1)}, {time}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-5 h-5 flex items-center justify-center">
            <Image
              src="/assets/icons/clock.svg"
              alt="clock"
              width={20}
              height={20}
              className="text-gray-600"
            />
          </div>
          <span className="text-xs font-medium text-gunmetal-gray font-outfit">
            Visio de {visioDuration}
          </span>
        </div>
      </div>

      {/* Informations du participant */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200">
          <Image
            src={participantAvatar}
            alt={participantName}
            width={48}
            height={48}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="text-sm font-bold text-gunmetal-gray mb-1">
            {participantName}
          </h3>
          <p className="text-xs text-bluish-gray font-medium">
            {sessionDescription}
          </p>
        </div>
      </div>
    </div>
  );
};
